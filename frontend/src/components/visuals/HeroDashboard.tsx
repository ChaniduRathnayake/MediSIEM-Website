import { CheckCircle2, ShieldAlert } from 'lucide-react'
import BrowserFrame, { SampleDataTag } from '../BrowserFrame'
import NetworkGraph from './NetworkGraph'
import { AreaChart, Gauge, ScorePill, TierBadge } from './charts'
import { eventsPerHour, sampleAlerts } from '../../data/demoTelemetry'

const KPIS = [
  { label: 'Protected endpoints', value: '1,268', note: '98.3% healthy' },
  { label: 'Compliance score', value: '94%', note: 'HIPAA mapping' },
  { label: 'Intel matches (24h)', value: '12', note: 'MISP indicators' },
]

// The hero's product visualization: a compact, realistic console view.
// Illustrative sample data, labelled as such in the title bar.
export default function HeroDashboard() {
  return (
    <div className="relative">
      <BrowserFrame url="console.medisiem.app/overview" aside={<SampleDataTag />}>
        <div className="grid gap-px bg-slate-800/60 sm:grid-cols-[1fr_1.35fr]">
          {/* Posture */}
          <div className="flex flex-col items-center justify-center bg-card p-5">
            <p className="self-start text-xs font-medium text-slate-400">Security posture</p>
            <div className="mt-3">
              <Gauge value={78} label="Security posture score" status="Good · up 6 this week" />
            </div>
            <dl className="mt-5 grid w-full grid-cols-3 gap-2 border-t border-slate-800 pt-4 text-center sm:grid-cols-1 sm:text-left lg:grid-cols-3 lg:text-center">
              {KPIS.map((k) => (
                <div key={k.label}>
                  <dt className="text-[10px] leading-tight text-slate-500">{k.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-50 tabular-nums">{k.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Topology */}
          <div className="relative bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-400">Live topology</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                1 active threat path
              </span>
            </div>
            <NetworkGraph className="mt-1 h-auto w-full" />
          </div>
        </div>

        {/* Prioritized queue */}
        <div className="border-t border-slate-800 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">Prioritized alerts</p>
            <p className="font-mono text-[11px] text-slate-500">Ranked by Alert Score</p>
          </div>
          <ul className="mt-3 divide-y divide-slate-800/80">
            {sampleAlerts.slice(0, 3).map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-2.5">
                <ScorePill score={a.score} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-slate-100">{a.title}</p>
                  <p className="truncate text-[11px] text-slate-500">{a.asset}</p>
                </div>
                <span className="hidden sm:inline-flex">
                  <TierBadge tier={a.tier} />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Security events · 24h</span>
              <span className="font-mono text-slate-500">peak 1,180/h</span>
            </div>
            <AreaChart data={eventsPerHour} label="Security events per hour, last 24 hours" height={56} className="mt-2 h-14" formatPoint={(v, i) => `${String(i).padStart(2, '0')}:00 · ${v} events`} />
          </div>
        </div>
      </BrowserFrame>

      {/* Floating callouts: the two moments that sell the product */}
      <div className="animate-float-slow absolute -top-9 -left-4 hidden w-60 rounded-xl border border-slate-700/80 bg-slate-950/90 p-3.5 shadow-2xl shadow-black/50 backdrop-blur xl:-left-16 xl:block">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-slate-50">Alert prioritized · 9.1</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">DoS on ICU device ranked above a CVSS 8.1 trojan on a billing PC.</p>
          </div>
        </div>
      </div>
      <div className="animate-float-slow absolute -right-3 -bottom-6 hidden w-56 rounded-xl border border-slate-700/80 bg-slate-950/90 p-3.5 shadow-2xl shadow-black/50 backdrop-blur [animation-delay:-4s] lg:block xl:-right-8">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold text-slate-50">Contained in 7 min</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">Isolation approved by clinical lead, logged to audit ledger.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
