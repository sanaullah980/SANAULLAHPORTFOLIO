'use client';

import { useId, useMemo, useState } from 'react';
import { profile, type SanaModuleKey } from '@/content/profile';

/* ---------- small maths helpers (all client-side, standard formulas) ---------- */

function parseSeries(text: string): number[] {
  return text
    .split(/[\s,;]+/)
    .map((t) => Number(t.replace(/_/g, '')))
    .filter((n) => Number.isFinite(n))
    .slice(0, 36);
}

function regress(y: number[]) {
  const n = y.length;
  const xs = y.map((_, i) => i);
  const mx = (n - 1) / 2;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let sxy = 0;
  let sxx = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (y[i] - my);
    sxx += (x - mx) ** 2;
  });
  const slope = sxx === 0 ? 0 : sxy / sxx;
  const intercept = my - slope * mx;
  const sse = y.reduce((acc, v, i) => acc + (v - (intercept + slope * i)) ** 2, 0);
  const sigma = n > 2 ? Math.sqrt(sse / (n - 2)) : 0;
  return { slope, intercept, sigma, mean: my };
}

const fmt = (n: number, d = 0) =>
  Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d }) : '—';

/* ---------- charts ---------- */

const W = 520;
const H = 210;
const PAD = { l: 44, r: 14, t: 14, b: 28 };

function scaleFor(values: number[], count: number) {
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values, 1) * 1.08;
  const x = (i: number) => PAD.l + (i / Math.max(count - 1, 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => H - PAD.b - ((v - lo) / (hi - lo || 1)) * (H - PAD.t - PAD.b);
  return { x, y, lo, hi };
}

function Axes({ lo, hi, y }: { lo: number; hi: number; y: (v: number) => number }) {
  const ticks = [lo, lo + (hi - lo) / 2, hi];
  return (
    <g className="chart-axes">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} />
          <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end">
            {fmt(t)}
          </text>
        </g>
      ))}
    </g>
  );
}

function BarChart({ data, best, worst }: { data: number[]; best: number; worst: number }) {
  const { y, lo, hi } = scaleFor(data, data.length);
  const slot = (W - PAD.l - PAD.r) / data.length;
  const bw = Math.min(46, slot * 0.62);
  return (
    <svg className="sana-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart of the entered figures">
      <Axes lo={lo} hi={hi} y={y} />
      {data.map((v, i) => {
        const cx = PAD.l + slot * i + slot / 2;
        const top = y(Math.max(v, 0));
        const base = y(0);
        const cls = i === best ? 'bar bar-best' : i === worst ? 'bar bar-worst' : 'bar';
        return (
          <g key={i}>
            <rect className={cls} x={cx - bw / 2} y={top} width={bw} height={Math.max(base - top, 1)} rx="3" />
            <text className="chart-x" x={cx} y={H - 9} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function ForecastChart({
  data,
  fit,
  horizon,
}: {
  data: number[];
  fit: { slope: number; intercept: number; sigma: number };
  horizon: number;
}) {
  const n = data.length;
  const total = n + horizon;
  const preds = Array.from({ length: horizon }, (_, k) => fit.intercept + fit.slope * (n + k));
  const upper = preds.map((p) => p + fit.sigma);
  const lower = preds.map((p) => p - fit.sigma);
  const { x, y, lo, hi } = scaleFor([...data, ...upper, ...lower.map((v) => Math.max(v, 0))], total);
  const actual = data.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const fcLine = [data[n - 1], ...preds].map((v, k) => `${x(n - 1 + k)},${y(v)}`).join(' ');
  const band =
    [...upper.map((v, k) => `${x(n + k)},${y(v)}`), ...lower.map((v, k) => `${x(n + k)},${y(v)}`).reverse()].join(' ');
  return (
    <svg className="sana-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Line chart with a three-period forecast">
      <Axes lo={lo} hi={hi} y={y} />
      <polygon className="fc-band" points={band} />
      <polyline className="fc-actual" points={actual} />
      <polyline className="fc-line" points={fcLine} />
      {data.map((v, i) => (
        <circle key={i} className="fc-dot" cx={x(i)} cy={y(v)} r="3.5" />
      ))}
      {preds.map((v, k) => (
        <circle key={k} className="fc-dot fc-dot-pred" cx={x(n + k)} cy={y(v)} r="4" />
      ))}
      {Array.from({ length: total }, (_, i) => (
        <text key={i} className="chart-x" x={x(i)} y={H - 9} textAnchor="middle">
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

/* ---------- the three engines ---------- */

function SeriesInput({ value, onChange, min }: { value: string; onChange: (v: string) => void; min: number }) {
  const id = useId();
  const count = parseSeries(value).length;
  return (
    <div className="sana-field sana-field-wide">
      <label htmlFor={id}>Monthly sales figures (comma separated)</label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} inputMode="decimal" spellCheck={false} />
      {count < min && <span className="sana-hint">Enter at least {min} figures.</span>}
    </div>
  );
}

function Analyzer({ series, setSeries }: { series: string; setSeries: (v: string) => void }) {
  const data = useMemo(() => parseSeries(series), [series]);
  const ok = data.length >= 2;
  const stats = useMemo(() => {
    if (!ok) return null;
    const n = data.length;
    const total = data.reduce((a, b) => a + b, 0);
    const mean = total / n;
    const best = data.indexOf(Math.max(...data));
    const worst = data.indexOf(Math.min(...data));
    const growth = data[0] !== 0 ? ((data[n - 1] - data[0]) / Math.abs(data[0])) * 100 : NaN;
    const sd = Math.sqrt(data.reduce((a, v) => a + (v - mean) ** 2, 0) / n);
    const cv = mean !== 0 ? (sd / Math.abs(mean)) * 100 : NaN;
    const rel = n > 1 && mean !== 0 ? regress(data).slope / Math.abs(mean) : 0;
    const trend = rel > 0.02 ? 'Upward' : rel < -0.02 ? 'Downward' : 'Stable';
    return { n, total, mean, best, worst, growth, cv, trend };
  }, [data, ok]);

  return (
    <div className="sana-demo">
      <SeriesInput value={series} onChange={setSeries} min={2} />
      {stats ? (
        <>
          <div className="sana-metrics">
            <Metric label="Total" value={fmt(stats.total)} />
            <Metric label="Average / period" value={fmt(stats.mean, 1)} />
            <Metric label="Growth, first → last" value={Number.isNaN(stats.growth) ? '—' : `${fmt(stats.growth, 1)}%`} />
            <Metric label="Trend" value={stats.trend} accent />
            <Metric label="Best period" value={`#${stats.best + 1} · ${fmt(data[stats.best])}`} />
            <Metric label="Weakest period" value={`#${stats.worst + 1} · ${fmt(data[stats.worst])}`} />
            <Metric label="Volatility (CV)" value={Number.isNaN(stats.cv) ? '—' : `${fmt(stats.cv, 1)}%`} />
          </div>
          <BarChart data={data} best={stats.best} worst={stats.worst} />
          <p className="sana-summary">
            <b>Summary —</b> Across {stats.n} periods the business shows a <b>{stats.trend.toLowerCase()}</b> trend,
            averaging {fmt(stats.mean, 1)} per period. Period {stats.best + 1} was the strongest and period{' '}
            {stats.worst + 1} the weakest.
          </p>
        </>
      ) : (
        <p className="sana-empty">Add at least two figures to run the analysis.</p>
      )}
    </div>
  );
}

function Predictor({ series, setSeries }: { series: string; setSeries: (v: string) => void }) {
  const data = useMemo(() => parseSeries(series), [series]);
  const ok = data.length >= 3;
  const fit = useMemo(() => (ok ? regress(data) : null), [data, ok]);
  const horizon = 3;
  return (
    <div className="sana-demo">
      <SeriesInput value={series} onChange={setSeries} min={3} />
      {fit ? (
        <>
          <ForecastChart data={data} fit={fit} horizon={horizon} />
          <div className="sana-forecast">
            {Array.from({ length: horizon }, (_, k) => {
              const p = fit.intercept + fit.slope * (data.length + k);
              return (
                <div className="sana-forecast-row" key={k}>
                  <span>Period {data.length + k + 1}</span>
                  <b>{fmt(Math.max(p, 0))}</b>
                  <em>
                    range {fmt(Math.max(p - fit.sigma, 0))} – {fmt(Math.max(p + fit.sigma, 0))}
                  </em>
                </div>
              );
            })}
          </div>
          <p className="sana-summary">
            <b>Method —</b> least-squares linear trend ({fit.slope >= 0 ? '+' : ''}
            {fmt(fit.slope, 1)} per period). The shaded range is ±1 standard error of the fit, so wider ranges signal
            less predictable sales.
          </p>
        </>
      ) : (
        <p className="sana-empty">Add at least three figures to generate a forecast.</p>
      )}
    </div>
  );
}

function Calculator() {
  const [v, setV] = useState({ cost: '650', price: '900', units: '240', fixed: '38000' });
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((p) => ({ ...p, [k]: e.target.value }));
  const cost = Number(v.cost);
  const price = Number(v.price);
  const units = Number(v.units);
  const fixed = Number(v.fixed);
  const valid = [cost, price, units, fixed].every((n) => Number.isFinite(n) && n >= 0) && price > 0;

  const out = useMemo(() => {
    if (!valid) return null;
    const unit = price - cost;
    const revenue = price * units;
    const profit = unit * units - fixed;
    const invested = cost * units + fixed;
    return {
      unit,
      margin: (unit / price) * 100,
      markup: cost > 0 ? (unit / cost) * 100 : NaN,
      revenue,
      profit,
      breakEven: unit > 0 ? Math.ceil(fixed / unit) : NaN,
      roi: invested > 0 ? (profit / invested) * 100 : NaN,
    };
  }, [valid, cost, price, units, fixed]);

  const fields: [keyof typeof v, string][] = [
    ['cost', 'Cost per unit (PKR)'],
    ['price', 'Selling price per unit (PKR)'],
    ['units', 'Units sold'],
    ['fixed', 'Fixed expenses (PKR)'],
  ];

  return (
    <div className="sana-demo">
      <div className="sana-fields">
        {fields.map(([k, label]) => (
          <div className="sana-field" key={k}>
            <label htmlFor={`calc-${k}`}>{label}</label>
            <input id={`calc-${k}`} value={v[k]} onChange={set(k)} inputMode="decimal" />
          </div>
        ))}
      </div>
      {out ? (
        <>
          <div className="sana-metrics">
            <Metric label="Profit per unit" value={`PKR ${fmt(out.unit)}`} />
            <Metric label="Margin" value={`${fmt(out.margin, 1)}%`} />
            <Metric label="Markup" value={Number.isNaN(out.markup) ? '—' : `${fmt(out.markup, 1)}%`} />
            <Metric label="Revenue" value={`PKR ${fmt(out.revenue)}`} />
            <Metric label="Net profit" value={`PKR ${fmt(out.profit)}`} accent={out.profit >= 0} />
            <Metric label="Break-even units" value={Number.isNaN(out.breakEven) ? 'Not reachable' : fmt(out.breakEven)} />
            <Metric label="Return on investment" value={Number.isNaN(out.roi) ? '—' : `${fmt(out.roi, 1)}%`} />
          </div>
          <p className="sana-summary">
            <b>Reading —</b>{' '}
            {out.profit >= 0
              ? `At ${fmt(units)} units the business covers its fixed costs and earns PKR ${fmt(out.profit)}.`
              : `At ${fmt(units)} units the business is below break-even and loses PKR ${fmt(Math.abs(out.profit))}.`}
          </p>
        </>
      ) : (
        <p className="sana-empty">Enter valid, non-negative numbers (selling price above zero).</p>
      )}
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="sana-metric">
      <span>{label}</span>
      <b className={accent ? 'is-accent' : undefined}>{value}</b>
    </div>
  );
}

/* ---------- section ---------- */

export function SanaAI() {
  const { sana } = profile;
  const [tab, setTab] = useState<SanaModuleKey>('analyzer');
  const [series, setSeries] = useState('120, 135, 128, 150, 162, 158, 176');
  const active = sana.modules.find((m) => m.key === tab)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    const next = sana.modules[(i + d + sana.modules.length) % sana.modules.length];
    setTab(next.key);
    document.getElementById(`sana-tab-${next.key}`)?.focus();
  };

  return (
    <section className="sana section-wrap" id={sana.id} aria-labelledby="sana-title">
      <div className="sana-shell">
        <header className="sana-head">
          <div className="sana-head-copy">
            <p className="sana-eyebrow">
              <span>{sana.eyebrow}</span>
              <span className="sana-status">
                <i /> {sana.status}
              </span>
            </p>
            <h2 id="sana-title">
              {sana.title} <span>{sana.titleAccent}</span>
            </h2>
            <p className="sana-lead">{sana.lead}</p>
          </div>
          <ul className="sana-langs" aria-label="Supported languages">
            {sana.languages.map((l) => (
              <li key={l} lang={l === 'اردو' ? 'ur' : 'en'}>
                {l}
              </li>
            ))}
          </ul>
        </header>

        <p className="sana-label">{sana.modulesLabel}</p>
        <div className="sana-workbench">
          <div className="sana-tabs" role="tablist" aria-label="Sana AI engines" aria-orientation="vertical">
            {sana.modules.map((m, i) => (
              <button
                key={m.key}
                id={`sana-tab-${m.key}`}
                role="tab"
                aria-selected={tab === m.key}
                aria-controls="sana-panel"
                tabIndex={tab === m.key ? 0 : -1}
                className="sana-tab"
                onClick={() => setTab(m.key)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="sana-tab-index">{m.index}</span>
                <span className="sana-tab-body">
                  <b>{m.name}</b>
                  <em>{m.tagline}</em>
                </span>
              </button>
            ))}
          </div>

          <div className="sana-panel" id="sana-panel" role="tabpanel" aria-labelledby={`sana-tab-${tab}`}>
            <div className="sana-panel-head">
              <h3>{active.name}</h3>
              <span className="sana-preview-tag">LIVE PREVIEW</span>
            </div>
            <ul className="sana-points">
              {active.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {tab === 'analyzer' && <Analyzer series={series} setSeries={setSeries} />}
            {tab === 'predictor' && <Predictor series={series} setSeries={setSeries} />}
            {tab === 'calculator' && <Calculator />}
            <p className="sana-note">{sana.demoNote}</p>
          </div>
        </div>

        <p className="sana-label">{sana.pipelineLabel}</p>
        <ol className="sana-pipeline">
          {sana.pipeline.map((s) => (
            <li key={s.step}>
              <span>{s.step}</span>
              <b>{s.title}</b>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <footer className="sana-foot">
          <div>
            <p className="sana-label">{sana.stackLabel}</p>
            <div className="sana-stack">
              {sana.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <a className="button sana-cta" href={sana.link.href} target="_blank" rel="noreferrer">
            {sana.link.label} <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
