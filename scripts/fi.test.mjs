import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultAssumptions, simulateFI, validateAssumptions } from '../utils/fi.js';

const start = '2026-11-01';
const assumptions = (overrides = {}) => ({
  ...defaultAssumptions,
  age: 40,
  endAge: 42,
  balance: 1000,
  monthlyIncome: 1000,
  monthlyExpenses: 100,
  expenseDrop: 0,
  inflation: 0,
  annualReturn: 0,
  volatility: 0,
  ...overrides,
});

test('working cash flow subtracts expenses exactly once', () => {
  const { rows } = simulateFI(assumptions(), start);
  assert.equal(rows[1].balance, 1900);
  assert.equal(rows[1].expenses, 100);
  assert.equal(rows[1].income, 1000);
});

test('zero-volatility returns compound to the selected annual growth', () => {
  const { rows } = simulateFI(assumptions({ monthlyIncome: 100, annualReturn: 7 }), start);
  assert.ok(Math.abs(rows[12].balance - 1070) < 1e-8);
});

test('uses actual calendar months and annual checkpoints', () => {
  const { rows, yearly } = simulateFI(assumptions(), start);
  assert.equal(rows.length, 25);
  assert.equal(rows[1].date, '2026-12-01');
  assert.equal(rows[3].date, '2027-02-01');
  assert.deepEqual(yearly.map((row) => row.month), [0, 12, 24]);
});

test('inflation compounds budgets and the FI target', () => {
  const { rows, fiNumber } = simulateFI(assumptions({ inflation: 12 }), start);
  assert.ok(Math.abs(rows[12].expenses - 112) < 1e-8);
  assert.ok(Math.abs(rows[12].target - fiNumber * 1.12) < 1e-8);
});

test('debt payoff changes spending at the selected month', () => {
  const { rows } = simulateFI(assumptions({ expenseDrop: 25, payoffMonths: 2 }), start);
  assert.equal(rows[1].expenses, 100);
  assert.equal(rows[2].expenses, 75);
});

test('recognizes existing FI and stops work immediately', () => {
  const { rows, fiHit } = simulateFI(assumptions({ balance: 30000 }), start);
  assert.equal(fiHit.month, 0);
  assert.equal(rows[1].income, 0);
  assert.equal(rows[1].balance, 29900);
});

test('stops earned income the month after crossing FI', () => {
  const { rows, fiHit } = simulateFI(assumptions({ balance: 29900 }), start);
  assert.equal(fiHit.month, 1);
  assert.equal(rows[1].income, 1000);
  assert.equal(rows[2].income, 0);
});

test('returns an explicit not-reached result', () => {
  const { fiHit, depletion } = simulateFI(assumptions({ monthlyIncome: 100 }), start);
  assert.equal(fiHit, null);
  assert.equal(depletion, null);
});

test('extra spending increases the retirement budget while leaving the FI target unchanged', () => {
  const { fiNumber, rows, fiHit } = simulateFI(assumptions({ balance: 60000, extraSpending: 50 }), start);
  assert.equal(fiNumber, 30000);
  assert.equal(fiHit.month, 0);
  assert.equal(rows[1].expenses, 150);
  assert.equal(rows[1].extraSpend, 50);
});

test('extra spending preserves the target, FI date, and entire accumulation path', () => {
  for (const volatility of [0, 15]) {
    const inputs = assumptions({ balance: 29000, inflation: 3, volatility });
    const baseline = simulateFI(inputs, start, 4);
    const extra = simulateFI({ ...inputs, extraSpending: 50 }, start, 4);
    assert.ok(baseline.fiHit);
    assert.equal(extra.fiNumber, baseline.fiNumber);
    assert.deepEqual(extra.fiHit, baseline.fiHit);
    assert.deepEqual(extra.rows.map((row) => row.target), baseline.rows.map((row) => row.target));
    assert.deepEqual(extra.rows.slice(0, extra.fiHit.month + 1), baseline.rows.slice(0, baseline.fiHit.month + 1));
    const nextMonth = extra.fiHit.month + 1;
    assert.equal(extra.rows[nextMonth].extraSpend, baseline.rows[nextMonth].expenses * 0.5);
    assert.ok(extra.rows[nextMonth].balance < baseline.rows[nextMonth].balance);
  }
});

test('a depleted portfolio records unfunded spending without negative investments', () => {
  const { rows, depletion } = simulateFI(assumptions({ balance: 30000, annualReturn: -50, endAge: 60 }), start);
  assert.ok(depletion);
  assert.ok(rows.some((row) => row.shortfall > 0));
  assert.ok(rows.every((row) => row.balance >= 0));
  assert.ok(rows.slice(depletion.month).every((row) => row.retired));
});

test('optional benefits begin at the selected age', () => {
  const { rows } = simulateFI(assumptions({ benefitAge: 41, monthlyBenefit: 50 }), start);
  assert.equal(rows[11].benefit, 0);
  assert.equal(rows[12].benefit, 50);
});

test('monthly portfolio withdrawals reflect extra spending and retirement benefits', () => {
  const { rows } = simulateFI(assumptions({ balance: 30000, extraSpending: 50, benefitAge: 40, monthlyBenefit: 40 }), start);
  assert.equal(rows[1].expenses, 150);
  assert.equal(rows[1].benefit, 40);
  assert.equal(rows[1].withdrawal, 110);
  assert.equal(rows[1].shortfall, 0);
  const saving = simulateFI(assumptions(), start);
  assert.equal(saving.rows[1].withdrawal, 0);
});

test('withdrawals stop at available investments and spending gaps remain separate', () => {
  const { rows } = simulateFI(assumptions({ balance: 30000, annualReturn: -50, endAge: 60 }), start);
  const depleted = rows.find((row) => row.shortfall > 0);
  assert.ok(depleted);
  assert.ok(depleted.withdrawal < depleted.expenses);
  assert.ok(Math.abs(depleted.withdrawal + depleted.shortfall - depleted.expenses) < 1e-8);
  assert.equal(rows[depleted.month + 1].withdrawal, 0);
});

test('random paths are reproducible and rerolling changes them', () => {
  const inputs = assumptions({ volatility: 20 });
  assert.deepEqual(simulateFI(inputs, start, 1), simulateFI(inputs, start, 1));
  assert.notEqual(simulateFI(inputs, start, 1).rows[1].balance, simulateFI(inputs, start, 2).rows[1].balance);
  assert.ok(simulateFI(inputs, start, 2).rows.every((row) => Object.values(row).every((value) => typeof value !== 'number' || Number.isFinite(value))));
});

test('rejects incomplete, impossible, and invalid-date inputs', () => {
  assert.ok(validateAssumptions(assumptions({ monthlyExpenses: '' })).length);
  assert.ok(validateAssumptions(assumptions({ age: 50, endAge: 40 })).length);
  assert.ok(validateAssumptions(assumptions({ expenseDrop: 100 })).length);
  assert.throws(() => simulateFI(assumptions({ inflation: -10 }), start));
  assert.throws(() => simulateFI(assumptions(), 'invalid'));
});
