import { ShieldCheck } from 'lucide-react'
import BrowserFrame from '../BrowserFrame'
import { comparisonAlerts } from '../../data/comparisonScenario'
import { getCASAction } from '../../utils/casAction'

// Reuses the same illustrative alert scenario shown (and labelled as such)
// elsewhere on the page — not a second, different set of invented numbers,
// and not a claim about live production telemetry.
const sortedAlerts = [...comparisonAlerts].sort((a, b) => b.cas - a.cas)

const DIMENSION_WEIGHTS = [
  { code: 'CC', weight: 30 },
  { code: 'TR', weight: 25 },
  { code: 'TS', weight: 25 },
  { code: 'AE', weight: 10 },
  { code: 'TC', weight: 10 },
]

export default function DashboardPreview() {
  const highestCas = sortedAlerts[0]?.cas ?? 0
  const immediateCount = sortedAlerts.filter((alert) => getCASAction(alert.cas).label === 'Immediate').length

  return (
    <BrowserFrame url="MediSIEM Console — Alert Triage" className="mx-auto max-w-xl text-left">
      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Platform Preview
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Monitoring
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="font-mono text-2xl font-bold text-white">{sortedAlerts.length}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Active Alerts</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="font-mono text-2xl font-bold text-red-400">{immediateCount}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Immediate Action</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <p className="font-mono text-2xl font-bold text-cyan-400">{highestCas.toFixed(1)}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Highest CAS</p>
          </div>
        </div>

        <div className="space-y-2">
          {sortedAlerts.map((alert) => {
            const action = getCASAction(alert.cas)
            return (
              <div
                key={alert.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2"
              >
                <p className="truncate text-xs font-medium text-slate-200">{alert.device}</p>
                <span
                  className={`flex-shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] font-semibold ${action.classes}`}
                >
                  {alert.cas.toFixed(1)} &middot; {action.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="space-y-1.5 border-t border-slate-800 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">CAS Weighting</p>
          {DIMENSION_WEIGHTS.map((dim) => (
            <div key={dim.code} className="flex items-center gap-2">
              <span className="w-7 flex-shrink-0 font-mono text-[10px] text-slate-500">{dim.code}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400"
                  style={{ width: `${(dim.weight / 30) * 100}%` }}
                />
              </div>
              <span className="w-8 flex-shrink-0 text-right font-mono text-[10px] text-slate-500">
                {dim.weight}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}
