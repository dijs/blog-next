export const fiMetadata = {
  published: true,
  title: 'FI Breakdown',
  blurb: 'An interactive exploration of the road to financial independence and what comes after.',
  layout: 'post',
  tags: ['finance', 'simulation', 'visualization'],
  date: 'Mar 13, 2026',
};

// U.S. household benchmarks, using 2025 dollars. The page documents the sources
// and adjustments; age, horizon, growth, and volatility remain scenario choices.
// BLS 2025 CE: https://www.bls.gov/news.release/cesan.nr0.htm
// Fed 2025 SCF, table 3: https://www.federalreserve.gov/publications/files/scf26.pdf
const averageAnnualIncome = 110847;
const averageAnnualExpenditures = 81905;
const personalInsuranceAndPensions = 10175;
const assumedTaxRate = 0.20;

export const defaultAssumptions = {
  age: 40,
  endAge: 80,
  balance: 44200,
  monthlyIncome: Math.round(averageAnnualIncome * (1 - assumedTaxRate) / 12),
  monthlyExpenses: Math.round((averageAnnualExpenditures - personalInsuranceAndPensions) / 12),
  expenseDrop: 0,
  payoffMonths: 0,
  annualReturn: 7,
  inflation: 3,
  volatility: 15,
  extraSpending: 0,
  benefitAge: 67,
  monthlyBenefit: 0,
};

export function validateAssumptions(input) {
  const errors = [];
  if (Object.keys(defaultAssumptions).some((key) => !Number.isFinite(input[key]))) {
    return ['Enter a number in every assumption field.'];
  }
  if (input.age < 18 || input.endAge > 110 || input.endAge <= input.age) {
    errors.push('Use a starting age of at least 18 and an ending age above it, up to 110.');
  }
  if (['balance', 'monthlyIncome', 'expenseDrop', 'payoffMonths', 'monthlyBenefit'].some((key) => input[key] < 0)) {
    errors.push('Dollar amounts and months until payoff cannot be negative.');
  }
  if (input.monthlyExpenses <= 0 || input.expenseDrop >= input.monthlyExpenses) {
    errors.push('Monthly expenses must be positive, and the expense drop must be smaller than expenses.');
  }
  if (input.annualReturn < -50 || input.annualReturn > 20 || input.inflation < 0 || input.inflation > 20 || input.volatility < 0 || input.volatility > 100 || input.extraSpending < 0 || input.extraSpending > 100) {
    errors.push('Keep growth between −50% and 20%, inflation between 0% and 20%, and volatility and extra spending between 0% and 100%.');
  }
  if (input.benefitAge < 18 || input.benefitAge > 110) {
    errors.push('Benefit start age must be between 18 and 110.');
  }
  return errors;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function simulateFI(input, startMonth, seed = 1) {
  const errors = validateAssumptions(input);
  if (errors.length) throw new Error(errors.join(' '));
  const start = new Date(`${startMonth}T00:00:00Z`);
  if (!Number.isFinite(+start)) throw new Error('Use a valid simulation start date.');
  const random = seededRandom(seed);
  const normal = () => Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
  const monthlyTrend = Math.log1p(input.annualReturn / 100) / 12;
  const monthlyVolatility = input.volatility / 100 / Math.sqrt(12);
  const baseRetirementExpenses = input.monthlyExpenses - input.expenseDrop;
  const fiNumber = baseRetirementExpenses * 12 * 25;
  let balance = input.balance;
  let totalGrowth = 0;
  const dateAt = (month) => new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + month, 1)).toISOString().slice(0, 10);
  const rows = [{ month: 0, date: dateAt(0), age: input.age, balance, target: fiNumber, growth: 0, totalGrowth: 0, income: 0, benefit: 0, expenses: 0, extraSpend: 0, withdrawal: 0, shortfall: 0, retired: balance >= fiNumber }];
  let fiHit = rows[0].retired ? rows[0] : null;
  let depletion = null;

  for (let month = 1; month <= Math.round((input.endAge - input.age) * 12); month++) {
    const inflationFactor = (1 + input.inflation / 100) ** (month / 12);
    const age = input.age + month / 12;
    const retired = fiHit !== null;
    const expensesBeforeExtra = (input.monthlyExpenses - (month >= input.payoffMonths ? input.expenseDrop : 0)) * inflationFactor;
    const extraSpend = retired ? expensesBeforeExtra * input.extraSpending / 100 : 0;
    const expenses = expensesBeforeExtra + extraSpend;
    const income = retired ? 0 : input.monthlyIncome * inflationFactor;
    const benefit = age >= input.benefitAge ? input.monthlyBenefit * inflationFactor : 0;
    const growth = balance * Math.expm1(monthlyTrend + monthlyVolatility * normal());
    totalGrowth += growth;
    const withdrawalNeeded = Math.max(0, expenses - income - benefit);
    const withdrawal = Math.min(balance + growth, withdrawalNeeded);
    const available = balance + growth + income + benefit;
    const shortfall = Math.max(0, expenses - available);
    balance = Math.max(0, available - expenses);
    const row = { month, date: dateAt(month), age, balance, target: fiNumber * inflationFactor, growth, totalGrowth, income, benefit, expenses, extraSpend, withdrawal, shortfall, retired };
    rows.push(row);
    if (!fiHit && balance >= row.target) fiHit = row;
    if (retired && !depletion && balance === 0) depletion = row;
  }

  return { rows, fiNumber, fiHit, depletion, yearly: rows.filter((row, index) => row.month % 12 === 0 || index === rows.length - 1) };
}
