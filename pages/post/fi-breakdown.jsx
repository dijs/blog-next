import { useMemo, useState } from 'react';
import PostContainer from '../../components/PostContainer';
import { defaultAssumptions, fiMetadata, simulateFI, validateAssumptions } from '../../utils/fi';
import styles from '../../styles/fi-breakdown.module.css';

const dollars = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const compactDollars = (value) => `$${new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)}`;
const monthLabel = (date) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function Section({ number, title, children }) {
  return <section className={styles.section}>
    <h2><span className={styles.sectionNumber}>{number.toString().padStart(2, '0')}</span><span className={styles.diamond}>❖</span> {title}</h2>
    {children}
  </section>;
}

function NumberInput({ name, label, values, onChange, min = 0, max, step = 1 }) {
  return <label className={styles.field}>
    <span>{label}</span>
    <input type="number" name={name} min={min} max={max} step={step} value={values[name]} onChange={(event) => onChange(name, event.target.value === '' ? '' : Number(event.target.value))} />
  </label>;
}

function Slider({ name, label, values, onChange, min = 0, max = 100 }) {
  return <label className={styles.slider}>
    <span>{label}<output>{values[name]}%</output></span>
    <input type="range" name={name} min={min} max={max} step="1" value={values[name]} onChange={(event) => onChange(name, Number(event.target.value))} />
    <span className={styles.rangeEnds}><span>{min}%</span><span>{max}%</span></span>
  </label>;
}

function Chart({ rows, series, title, milestones = [] }) {
  const [selection, setSelection] = useState(null);
  const width = 900;
  const height = 340;
  const left = 82;
  const right = width - 24;
  const top = 24;
  const bottom = height - 42;
  const lastMonth = Math.max(rows[rows.length - 1].month, 1);
  const maxValue = Math.max(1, ...rows.flatMap((row) => series.map(({ key }) => row[key]))) * 1.12;
  const x = (month) => left + month / lastMonth * (right - left);
  const y = (value) => bottom - value / maxValue * (bottom - top);
  const path = (key) => rows.map((row, index) => `${index ? 'L' : 'M'}${x(row.month).toFixed(2)},${y(row[key]).toFixed(2)}`).join(' ');
  const selectedIndex = selection === null ? rows.length - 1 : Math.min(selection, rows.length - 1);
  const selected = rows[selectedIndex];
  return <figure className={styles.chart}>
    <figcaption className={styles.chartHeading}><strong>{title}</strong><span>Future dollars · one simulated path</span></figcaption>
    <div className={styles.legend}>{series.map(({ key, label, color, dashed }) => <span key={key}><i style={{ borderColor: color, borderTopStyle: dashed ? 'dashed' : 'solid' }} />{label}</span>)}</div>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title}. ${series.map((s) => `${s.label} ends at ${dollars(rows[rows.length - 1][s.key])}`).join('. ')}. Use the month slider below to inspect values.`}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const month = ((event.clientX - bounds.left) / bounds.width * width - left) / (right - left) * lastMonth;
        setSelection(Math.max(0, Math.min(rows.length - 1, Math.round(month))));
      }}>
      {Array.from({ length: 5 }, (_, index) => {
        const value = maxValue * index / 4;
        return <g key={index}><line x1={left} x2={right} y1={y(value)} y2={y(value)} className={styles.gridLine} /><text x={left - 12} y={y(value) + 4} textAnchor="end">{compactDollars(value)}</text></g>;
      })}
      {Array.from({ length: 6 }, (_, index) => {
        const row = rows[Math.round((rows.length - 1) * index / 5)];
        return <text key={index} x={x(lastMonth * index / 5)} y={bottom + 27} textAnchor="middle">{row.date.slice(0, 4)}</text>;
      })}
      {milestones.filter((m) => m.month <= lastMonth).map(({ month, label }, index) => <g key={label}>
        <line x1={x(month)} x2={x(month)} y1={top} y2={bottom} className={styles.milestone} />
        <text x={Math.min(right - 6, Math.max(left + 6, x(month)))} y={top + 12 + index * 18} textAnchor={x(month) > width / 2 ? 'end' : 'start'}>{label}</text>
      </g>)}
      <path d={`${path(series[0].key)} L${x(rows[rows.length - 1].month)},${bottom} L${left},${bottom} Z`} fill={series[0].color} opacity="0.07" />
      {series.map(({ key, color, dashed }) => <path key={key} d={path(key)} fill="none" stroke={color} strokeWidth={dashed ? 2 : 2.5} strokeDasharray={dashed ? '6 5' : undefined} />)}
      <line x1={x(selected.month)} x2={x(selected.month)} y1={top} y2={bottom} className={styles.cursorLine} />
      {series.map(({ key, color }) => <circle key={key} cx={x(selected.month)} cy={y(selected[key])} r="4" fill={color} />)}
    </svg>
    <div className={styles.chartReadout} aria-live="polite"><strong>{monthLabel(selected.date)}</strong>{series.map(({ key, label }) => <span key={key}>{label}: <b>{dollars(selected[key])}</b></span>)}</div>
    <label className={styles.scrubber}>Inspect month<input type="range" min="0" max={rows.length - 1} value={selectedIndex} onChange={(event) => setSelection(Number(event.target.value))} aria-valuetext={`${monthLabel(selected.date)}, ${series.map(({ key, label }) => `${label}: ${dollars(selected[key])}`).join(', ')}`} /></label>
  </figure>;
}

function DataTable({ rows, monthly = false }) {
  return <div className={styles.tableScroll} role="region" aria-label={monthly ? 'Monthly projection table' : 'Annual projection table'} tabIndex="0">
    <table><caption>{monthly ? 'Month-by-month cash flow' : 'Annual checkpoints'} · future dollars</caption>
      <thead><tr><th scope="col">Date</th><th scope="col">Age</th><th scope="col">Balance</th><th scope="col">FI target</th><th scope="col">Spending / month</th><th scope="col">Portfolio withdrawal / month</th>{!monthly && <th scope="col">Market growth to date</th>}<th scope="col">{monthly ? 'Spending gap / month' : 'Phase'}</th></tr></thead>
      <tbody>{rows.map((row) => <tr key={row.month}><th scope="row">{monthLabel(row.date)}</th><td>{Math.floor(row.age)}</td><td>{dollars(row.balance)}</td><td>{dollars(row.target)}</td><td>{row.month === 0 ? '—' : dollars(row.expenses)}</td><td>{row.month === 0 ? '—' : dollars(row.withdrawal)}</td>{!monthly && <td>{dollars(row.totalGrowth)}</td>}<td>{monthly ? dollars(row.shortfall) : row.retired ? 'Retired' : 'Saving'}</td></tr>)}</tbody>
    </table>
  </div>;
}

export default function FIBreakdown({ metadata, number, startMonth }) {
  const [values, setValues] = useState(defaultAssumptions);
  const [seed, setSeed] = useState(1);
  const errors = validateAssumptions(values);
  const result = useMemo(() => validateAssumptions(values).length ? null : simulateFI(values, startMonth, seed), [values, startMonth, seed]);
  const update = (name, value) => setValues((previous) => ({ ...previous, [name]: value }));
  const fiHit = result?.fiHit;
  const last = result?.rows[result.rows.length - 1];
  const milestones = [
    ...(values.expenseDrop > 0 ? [{ month: values.payoffMonths, label: 'Debt paid off' }] : []),
    ...(fiHit ? [{ month: fiHit.month, label: 'FI reached' }] : []),
    ...(values.monthlyBenefit > 0 ? [{ month: Math.max(0, Math.ceil((values.benefitAge - values.age) * 12)), label: 'Benefits begin' }] : []),
  ];

  function downloadCSV() {
    const fields = ['date', 'age', 'balance', 'target', 'income', 'benefit', 'growth', 'expenses', 'extraSpend', 'withdrawal', 'shortfall', 'retired'];
    const csv = [fields.join(','), ...result.rows.map((row) => fields.map((key) => typeof row[key] === 'number' ? row[key].toFixed(2) : row[key]).join(','))].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fi-breakdown.csv';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <PostContainer metadata={metadata} slug="fi-breakdown" number={number} skipMathJax>
    <main className={styles.root}>
      <div className={styles.intro}>
        <p className={styles.lead}>How long until financial independence (FI)? And how long does your money last after you get there?</p>
        <p>Financial independence means having enough savings, investments, or other income to cover your living expenses without needing a paycheck. Reaching it gives you the option to stop working.</p>
        <p>I wanted to look beyond a single retirement number: how soon could work become optional, and what kind of life could my savings support afterward?</p>
        <p>Explore your own timeline, from building savings and paying off debt to enjoying retirement through the market’s ups and downs.</p>
      </div>

      <Section number={1} title="Set the scene">
        <p>Start with your household’s savings, income, and monthly budget. The example uses U.S. household benchmarks; your own numbers will give you a more useful picture.</p>
        <div className={styles.assumptions}>
          <div className={styles.inputGrid}>
            <NumberInput name="balance" label="Invested balance ($)" values={values} onChange={update} />
            <NumberInput name="monthlyIncome" label="Monthly income after tax ($)" values={values} onChange={update} step={1} />
            <NumberInput name="monthlyExpenses" label="Monthly expenses ($)" values={values} onChange={update} min={1} />
            <NumberInput name="age" label="Current age" values={values} onChange={update} min={18} max={109} />
            <NumberInput name="endAge" label="Simulate through age" values={values} onChange={update} min={19} max={110} />
            <NumberInput name="inflation" label="Annual inflation (%)" values={values} onChange={update} max={20} step={0.5} />
          </div>
          <details className={styles.details}>
            <summary>Debt payoff &amp; future income</summary>
            <p>Include any pension or Social Security income you expect, in today’s dollars. Add the monthly savings from paying off debt if that payoff is funded separately from these investments.</p>
            <div className={styles.inputGrid}>
              <NumberInput name="expenseDrop" label="Expense drop after payoff ($/mo)" values={values} onChange={update} step={100} />
              <NumberInput name="payoffMonths" label="Months until debt payoff" values={values} onChange={update} />
              <NumberInput name="benefitAge" label="Benefits start at age" values={values} onChange={update} min={18} max={110} />
              <NumberInput name="monthlyBenefit" label="Monthly retirement benefits ($)" values={values} onChange={update} step={100} />
            </div>
          </details>
          <div className={styles.sliders}>
            <Slider name="annualReturn" label="Annual growth trend" values={values} onChange={update} min={-50} max={20} />
            <Slider name="volatility" label="Annual market volatility" values={values} onChange={update} />
            <Slider name="extraSpending" label="Extra retirement spending" values={values} onChange={update} />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={() => setSeed((previous) => previous + 1)}>Try another market path <span aria-hidden="true">↗</span></button>
            <button type="button" className={styles.secondary} onClick={() => { setValues(defaultAssumptions); setSeed(1); }}>Reset U.S. example</button>
            <span>Path {seed} · starts {monthLabel(startMonth)}</span>
          </div>
        </div>
        <details className={styles.details}>
          <summary>Where the U.S. defaults come from</summary>
          <p>The example combines household averages for income and spending with median financial assets, all in 2025 dollars.</p>
          <ul>
            <li><strong>Income: {dollars(defaultAssumptions.monthlyIncome)}/month.</strong> Based on the <a href="https://www.bls.gov/news.release/cesan.nr0.htm">2025 BLS Consumer Expenditure Survey</a> average of $110,847 a year, with an estimated 20% set aside for taxes. Use your actual after-tax income.</li>
            <li><strong>Expenses: {dollars(defaultAssumptions.monthlyExpenses)}/month.</strong> Based on the same survey’s $81,905 annual spending, excluding its $10,175 personal insurance and pensions category. Add any personal insurance costs to your own budget.</li>
            <li><strong>Starting balance: {dollars(defaultAssumptions.balance)}.</strong> The median for families with financial assets in the <a href="https://www.federalreserve.gov/publications/files/scf26.pdf#page=21">Federal Reserve’s 2025 Survey of Consumer Finances</a>. This includes cash and excludes home equity.</li>
          </ul>
          <p>The surveys cover different households. Age, investment returns, and inflation are assumptions you can adjust. Add debt-payoff savings and retirement benefits to match your circumstances.</p>
        </details>
        {errors.length > 0 && <div role="alert" className={styles.error}>{errors.map((error) => <p key={error}>{error}</p>)}</div>}
      </Section>

      {result && <>
        <div className={styles.metrics} aria-live="polite">
          <div><span>FI target · today’s dollars</span><strong>{dollars(result.fiNumber)}</strong><small>25 × regular annual retirement spending</small></div>
          <div><span>Time to FI</span><strong>{fiHit ? fiHit.month === 0 ? 'Already there' : `${(fiHit.month / 12).toFixed(1)} years` : 'Not reached'}</strong><small>{fiHit ? `${monthLabel(fiHit.date)} · age ${fiHit.age.toFixed(1)}` : `Within the simulation through age ${values.endAge}`}</small></div>
          <div><span>Portfolio after FI</span><strong>{!fiHit ? 'Still saving' : result.depletion ? `Empty at ${result.depletion.age.toFixed(1)}` : `Funded to ${values.endAge}`}</strong><small>{result.depletion ? monthLabel(result.depletion.date) : `${dollars(last.balance)} at the end of this path`}</small></div>
        </div>

        <Section number={2} title="The road to FI">
          <p>When could your savings cover your everyday expenses? Follow your progress toward a portfolio that could make work optional.</p>
          <Chart title="Road to FI" rows={fiHit ? result.rows.slice(0, fiHit.month + 1) : result.rows} series={[{ key: 'balance', label: 'Portfolio', color: '#bb4e75' }, { key: 'target', label: 'FI target', color: '#28796c', dashed: true }]} milestones={milestones.filter((m) => m.label === 'Debt paid off')} />
          <p className={styles.note}>{fiHit ? fiHit.month === 0 ? 'Your starting investments already cover your FI target.' : `You reach your FI target in ${monthLabel(fiHit.date)} with ${dollars(fiHit.balance)} invested.` : `Your savings stay below your FI target through age ${values.endAge} in this scenario.`}</p>
        </Section>

        <Section number={3} title="What happens after?">
          <p>Reaching FI opens up a new question: how long could your savings support the life you want? Explore retirement through rising prices, changing markets, and the arrival of any pension or Social Security income.</p>
          <Chart title="FI burndown" rows={result.rows} series={[{ key: 'balance', label: 'Portfolio', color: '#bb4e75' }, { key: 'target', label: 'FI target', color: '#28796c', dashed: true }]} milestones={milestones} />
          <p className={styles.note}>{!fiHit ? 'You are still building toward FI in this scenario.' : result.depletion ? `Your savings run out in ${monthLabel(result.depletion.date)}. The monthly table shows the remaining spending gap.` : `Your savings cover retirement spending through age ${values.endAge} in this scenario.`}</p>
          <h3>A little more room in the budget</h3>
          <p>Retirement might mean more travel, new hobbies, or a little more flexibility. See your monthly budget and how much you’d draw from investments to support it.</p>
          <Chart title="Monthly spending & withdrawals" rows={result.rows} series={[{ key: 'expenses', label: 'Total spending / month', color: '#28796c', dashed: true }, { key: 'withdrawal', label: 'Portfolio withdrawal / month', color: '#bb4e75' }, { key: 'extraSpend', label: 'Extra spending / month', color: '#ae623c' }]} milestones={fiHit ? [{ month: fiHit.month, label: 'FI reached' }] : []} />
        </Section>

        <Section number={4} title="Look at the numbers">
          <p>See how much you’d spend and withdraw from your portfolio each month at every annual checkpoint. Open the monthly table for a closer look at your budget and any spending gaps.</p>
          <DataTable rows={result.yearly} />
          <details className={styles.details}><summary>Explore all {result.rows.length - 1} months</summary><DataTable rows={result.rows.slice(1)} monthly /></details>
          <button type="button" className={styles.download} onClick={downloadCSV}>Download monthly data (.csv)</button>
        </Section>
      </>}

      <Section number={5} title="Room for uncertainty">
        <p>A comfortable retirement needs room for surprises. Explore a few market paths and spending levels to see where your budget has breathing room and where it starts to feel tight.</p>
        <p>Include taxes on withdrawals, investment fees, and unexpected expenses in your budget. The balances shown are future dollars, so keep inflation in mind when comparing them with what your money buys today.</p>
        <p>Each scenario is a possibility to explore, rather than a forecast of your retirement.</p>
      </Section>
    </main>
  </PostContainer>;
}

export async function getStaticProps() {
  const { default: buildPosts } = await import('../../scripts/build-posts');
  const posts = buildPosts();
  const index = posts.findIndex((post) => post.slug === 'fi-breakdown');
  const now = new Date();
  return { props: { metadata: { ...fiMetadata }, number: posts.length - index, startMonth: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10) } };
}
