import CASCalculator from '../CASCalculator'
import Reveal from '../Reveal'

const DIMENSIONS = [
  {
    code: 'TR',
    label: 'Threat Risk',
    weight: '25%',
    description: 'Random Forest attack confidence',
    classes: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  },
  {
    code: 'CC',
    label: 'Clinical Criticality',
    weight: '30%',
    description: 'Device importance, from ICU ventilator down to admin PC',
    classes: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  },
  {
    code: 'TS',
    label: 'Time Sensitivity',
    weight: '25%',
    description: 'Isolation Forest anomaly score',
    classes: 'border-violet-500/30 bg-violet-500/10 text-violet-400',
  },
  {
    code: 'AE',
    label: 'Active Exploitation',
    weight: '10%',
    description: 'Known exploit severity of the attack type',
    classes: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  },
  {
    code: 'TC',
    label: 'Temporal Context',
    weight: '10%',
    description: 'Hospital shift (day / evening / night)',
    classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  },
]

const THRESHOLDS = [
  { range: 'CAS ≥ 8', action: 'Immediate', classes: 'border-red-500/30 bg-red-500/10 text-red-400' },
  { range: 'CAS ≥ 5', action: 'Investigate', classes: 'border-amber-500/30 bg-amber-500/10 text-amber-400' },
  { range: 'CAS < 5', action: 'Monitor', classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
]

export default function CASSpotlightSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">The Clinical Alert Score (CAS)</h2>
          <p className="mt-3 text-slate-400">
            Every alert is scored 0-10 across five weighted dimensions, then mapped to a recommended action.
          </p>
        </Reveal>

        <Reveal
          delayMs={100}
          className="mx-auto mt-8 max-w-3xl overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6"
        >
          <code className="block whitespace-pre text-center font-mono text-xs text-cyan-300 sm:text-sm">
            CAS = (0.25&middot;TR + 0.30&middot;CC + 0.25&middot;TS + 0.10&middot;AE + 0.10&middot;TC) &times; 2
          </code>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DIMENSIONS.map((dim, i) => (
            <Reveal key={dim.code} delayMs={i * 75}>
              <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold ${dim.classes}`}
                >
                  {dim.code}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">{dim.label}</h3>
                <p className="mt-1 text-xs font-medium text-slate-500">Weight: {dim.weight}</p>
                <p className="mt-2 text-sm text-slate-400">{dim.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {THRESHOLDS.map((threshold) => (
            <span
              key={threshold.action}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${threshold.classes}`}
            >
              {threshold.range} &rarr; {threshold.action}
            </span>
          ))}
        </Reveal>

        <Reveal delayMs={150} className="mt-10">
          <CASCalculator />
        </Reveal>
      </div>
    </section>
  )
}
