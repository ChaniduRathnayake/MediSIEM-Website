import { useMemo, useState } from 'react'
import { getCASAction } from '../utils/casAction'

interface Dimension {
  key: 'tr' | 'cc' | 'ts' | 'ae' | 'tc'
  code: string
  label: string
  weight: number
  min: number
  max: number
}

// Weights match the CAS formula: CAS = (0.25TR + 0.30CC + 0.25TS + 0.10AE + 0.10TC) x 2
const DIMENSIONS: Dimension[] = [
  { key: 'tr', code: 'TR', label: 'Threat Risk', weight: 0.25, min: 1, max: 5 },
  { key: 'cc', code: 'CC', label: 'Clinical Criticality', weight: 0.3, min: 1, max: 5 },
  { key: 'ts', code: 'TS', label: 'Time Sensitivity', weight: 0.25, min: 1, max: 5 },
  { key: 'ae', code: 'AE', label: 'Active Exploitation', weight: 0.1, min: 0, max: 5 },
  { key: 'tc', code: 'TC', label: 'Temporal Context', weight: 0.1, min: 1, max: 5 },
]

type Values = Record<Dimension['key'], number>

const DEFAULT_VALUES: Values = { tr: 3, cc: 3, ts: 3, ae: 2, tc: 3 }

// Standalone and stateful on purpose: used on the Home page CAS spotlight
// and reusable as-is on the Domain page.
export default function CASCalculator() {
  const [values, setValues] = useState<Values>(DEFAULT_VALUES)

  const cas = useMemo(() => {
    const weightedSum = DIMENSIONS.reduce((sum, dim) => sum + dim.weight * values[dim.key], 0)
    return Math.round(weightedSum * 2 * 10) / 10
  }, [values])

  const action = getCASAction(cas)

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">Try the CAS calculator</h3>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-white">{cas.toFixed(1)}</span>
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${action.classes}`}>
            {action.label}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {DIMENSIONS.map((dim) => (
          <label key={dim.key} className="block">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-300">
                <span className="text-slate-500">{dim.code}</span> &middot; {dim.label}
              </span>
              <span className="tabular-nums text-slate-400">{values[dim.key]}</span>
            </div>
            <input
              type="range"
              min={dim.min}
              max={dim.max}
              step={1}
              value={values[dim.key]}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [dim.key]: Number(event.target.value) }))
              }
              className="mt-2 w-full accent-cyan-500"
              aria-label={`${dim.label} (${dim.code})`}
            />
          </label>
        ))}
      </div>
    </div>
  )
}
