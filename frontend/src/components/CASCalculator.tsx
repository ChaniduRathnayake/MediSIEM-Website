import { useId, useMemo, useState } from 'react'
import { getCASAction } from '../utils/casAction'
import { TierBadge } from './visuals/charts'

interface Dimension {
  key: 'tr' | 'cc' | 'ts' | 'ae' | 'tc'
  code: string
  label: string
  hint: string
  weight: number
  min: number
  max: number
}

// Weights match the CAS formula: CAS = (0.25TR + 0.30CC + 0.25TS + 0.10AE + 0.10TC) x 2
const DIMENSIONS: Dimension[] = [
  { key: 'tr', code: 'TR', label: 'Threat risk', hint: 'How dangerous is the attack type?', weight: 0.25, min: 1, max: 5 },
  { key: 'cc', code: 'CC', label: 'Asset criticality', hint: 'How critical is the affected system?', weight: 0.3, min: 1, max: 5 },
  { key: 'ts', code: 'TS', label: 'Time sensitivity', hint: 'How fast could harm occur?', weight: 0.25, min: 1, max: 5 },
  { key: 'ae', code: 'AE', label: 'Active exploitation', hint: 'Is this being exploited in the wild?', weight: 0.1, min: 0, max: 5 },
  { key: 'tc', code: 'TC', label: 'Temporal context', hint: 'Is the timing unusual (night, weekend)?', weight: 0.1, min: 1, max: 5 },
]

type Values = Record<Dimension['key'], number>

const DEFAULT_VALUES: Values = { tr: 3, cc: 4, ts: 3, ae: 2, tc: 3 }

export default function CASCalculator() {
  const uid = useId()
  const [values, setValues] = useState<Values>(DEFAULT_VALUES)

  const cas = useMemo(() => {
    const weightedSum = DIMENSIONS.reduce((sum, dim) => sum + dim.weight * values[dim.key], 0)
    return Math.round(weightedSum * 2 * 10) / 10
  }, [values])

  const action = getCASAction(cas)

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-400">Alert Score</p>
          <p className="mt-1 text-5xl font-semibold tracking-tight text-slate-50 tabular-nums" aria-live="polite">
            {cas.toFixed(1)}
            <span className="text-lg font-normal text-slate-500"> / 10</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-400">Recommended action</p>
          <div className="mt-2">
            <TierBadge tier={action.label} />
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800" aria-hidden="true">
          <div className="h-full rounded-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${cas * 10}%` }} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {DIMENSIONS.map((dim) => (
          <div key={dim.key}>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor={`${uid}-${dim.key}`} className="font-medium text-slate-200">
                {dim.label} <span className="font-mono text-[11px] text-slate-500">×{dim.weight}</span>
              </label>
              <span className="font-mono text-slate-400 tabular-nums">{values[dim.key]}</span>
            </div>
            <input
              id={`${uid}-${dim.key}`}
              type="range"
              min={dim.min}
              max={dim.max}
              step={1}
              value={values[dim.key]}
              onChange={(event) => setValues((prev) => ({ ...prev, [dim.key]: Number(event.target.value) }))}
              className="mt-2 w-full accent-cyan-400"
              aria-describedby={`${uid}-${dim.key}-hint`}
            />
            <p id={`${uid}-${dim.key}-hint`} className="mt-1 text-xs text-slate-500">
              {dim.hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
