import { useState, type ReactNode } from 'react'
import {
  Activity,
  BellRing,
  ClipboardCheck,
  Gauge as GaugeIcon,
  LayoutDashboard,
  Network,
  ScanSearch,
  Settings,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import BrowserFrame, { SampleDataTag } from '../BrowserFrame'
import { AreaChart, BarList, Gauge, ScorePill, StatusRing, TierBadge } from './charts'
import { toneClasses } from './tones'
import {
  attackTrends,
  endpointStatus,
  eventsPerHour,
  incidentStatus,
  prioritizedPerDay,
  sampleAlerts,
  timeline,
  vulnerabilityOverview,
} from '../../data/demoTelemetry'

const SIDEBAR = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: BellRing, label: 'Alerts' },
  { icon: Workflow, label: 'Incidents' },
  { icon: Network, label: 'Network' },
  { icon: ScanSearch, label: 'Vulnerabilities' },
  { icon: ClipboardCheck, label: 'Compliance' },
  { icon: Settings, label: 'Settings' },
]

type Range = '24h' | '14d'

function Panel({ title, meta, children, className = '' }: { title: string; meta?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-slate-800 bg-slate-950/40 p-4 ${className}`} aria-label={title}>
      <header className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-medium text-slate-300">{title}</h3>
        {meta && <span className="font-mono text-[10px] text-slate-500">{meta}</span>}
      </header>
      <div className="mt-3">{children}</div>
    </section>
  )
}

// The large, "real product" dashboard. Every panel answers an operational
// question (How exposed are we? What needs action now? Is it getting better?)
// rather than decorating the page. Sample data, labelled in the title bar.
export default function PlatformDashboard() {
  const [range, setRange] = useState<Range>('24h')
  const totalEndpoints = endpointStatus.healthy + endpointStatus.atRisk + endpointStatus.offline

  return (
    <BrowserFrame url="console.medisiem.app/soc/overview" aside={<SampleDataTag />}>
      <div className="flex">
        {/* Sidebar */}
        <nav aria-label="Console navigation (illustrative)" className="hidden w-48 shrink-0 border-r border-slate-800 bg-slate-950/40 p-3 lg:block">
          <ul className="space-y-0.5">
            {SIDEBAR.map(({ icon: Icon, label, active }) => (
              <li key={label}>
                <span
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] ${
                    active ? 'bg-cyan-400/10 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border border-slate-800 p-3">
            <p className="text-[11px] text-slate-500">Data sources</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">14 connected</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              All healthy
            </p>
          </div>
        </nav>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <GaugeIcon className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] text-slate-500">Risk score</p>
                <p className="text-lg font-semibold text-slate-50 tabular-nums">
                  32<span className="text-xs font-normal text-slate-500"> /100 · Low</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <BellRing className="h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] text-slate-500">Immediate alerts</p>
                <p className="text-lg font-semibold text-slate-50 tabular-nums">
                  2<span className="text-xs font-normal text-slate-500"> of 13,628 events</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <Activity className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] text-slate-500">Security events · 24h</p>
                <p className="text-lg font-semibold text-slate-50 tabular-nums">13,628</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
              <div>
                <p className="text-[11px] text-slate-500">Compliance score</p>
                <p className="text-lg font-semibold text-slate-50 tabular-nums">
                  94%<span className="text-xs font-normal text-slate-500"> HIPAA</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            {/* Trend */}
            <Panel title={range === '24h' ? 'Security events per hour' : 'Prioritized alerts per day'} className="xl:col-span-2">
              <div className="-mt-9 mb-4 flex justify-end">
                <div role="tablist" aria-label="Time range" className="inline-flex rounded-lg border border-slate-800 p-0.5">
                  {(['24h', '14d'] as Range[]).map((r) => (
                    <button
                      key={r}
                      role="tab"
                      aria-selected={range === r}
                      onClick={() => setRange(r)}
                      className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                        range === r ? 'bg-slate-800 text-slate-50' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <AreaChart
                key={range}
                data={range === '24h' ? eventsPerHour : prioritizedPerDay}
                label={range === '24h' ? 'Security events per hour, last 24 hours' : 'Prioritized alerts per day, last 14 days'}
                height={150}
                className="animate-fade-up h-40"
                formatPoint={(v, i) => (range === '24h' ? `${String(i).padStart(2, '0')}:00 · ${v} events` : `Day ${i + 1} · ${v} alerts`)}
              />
              <p className="mt-2 text-[11px] text-slate-500">
                {range === '24h'
                  ? 'Spike at 23:00 correlated into 1 incident — not 1,180 separate alerts.'
                  : 'Prioritized volume trending down as asset criticality is tuned.'}
              </p>
            </Panel>

            {/* Risk */}
            <Panel title="Organizational risk" meta="Updated 1 min ago">
              <div className="flex flex-col items-center">
                <Gauge value={32} label="Organizational risk score" status="Low · down 9 in 7 days" />
              </div>
              <ul className="mt-4 space-y-2 text-xs">
                {vulnerabilityOverview.slice(0, 2).map((v) => (
                  <li key={v.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className={`h-1.5 w-1.5 rounded-full ${toneClasses[v.tone].dot}`} aria-hidden="true" />
                      {v.label} vulnerabilities
                    </span>
                    <span className="font-mono text-slate-400 tabular-nums">{v.value}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            {/* Alerts table */}
            <Panel title="Prioritized alert queue" meta="Ranked by Alert Score" className="xl:col-span-2">
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-xs">
                  <thead className="text-[10px] tracking-wide text-slate-500 uppercase">
                    <tr>
                      <th scope="col" className="px-1 pb-2 font-medium">Score</th>
                      <th scope="col" className="px-1 pb-2 font-medium">Alert</th>
                      <th scope="col" className="px-1 pb-2 font-medium">ATT&amp;CK</th>
                      <th scope="col" className="px-1 pb-2 font-medium">Action</th>
                      <th scope="col" className="px-1 pb-2 text-right font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {sampleAlerts.map((a) => (
                      <tr key={a.id}>
                        <td className="px-1 py-2">
                          <ScorePill score={a.score} />
                        </td>
                        <td className="px-1 py-2">
                          <p className="font-medium text-slate-100">{a.title}</p>
                          <p className="text-[11px] text-slate-500">{a.asset}</p>
                        </td>
                        <td className="px-1 py-2 font-mono text-slate-400">{a.technique}</td>
                        <td className="px-1 py-2">
                          <TierBadge tier={a.tier} />
                        </td>
                        <td className="px-1 py-2 text-right font-mono text-slate-500">{a.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* Endpoints */}
            <Panel title="Endpoint status" meta={`${totalEndpoints.toLocaleString()} assets`}>
              <div className="flex items-center gap-5">
                <StatusRing
                  label="Endpoint status"
                  segments={[
                    { label: 'Healthy', value: endpointStatus.healthy, tone: 'success' },
                    { label: 'At risk', value: endpointStatus.atRisk, tone: 'warning' },
                    { label: 'Offline', value: endpointStatus.offline, tone: 'neutral' },
                  ]}
                />
                <ul className="space-y-2 text-xs">
                  {(
                    [
                      ['Healthy', endpointStatus.healthy, 'success'],
                      ['At risk', endpointStatus.atRisk, 'warning'],
                      ['Offline', endpointStatus.offline, 'neutral'],
                    ] as const
                  ).map(([label, value, tone]) => (
                    <li key={label} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${toneClasses[tone].dot}`} aria-hidden="true" />
                      <span className="w-14 text-slate-300">{label}</span>
                      <span className="font-mono text-slate-400 tabular-nums">{value.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 border-t border-slate-800 pt-3">
                <p className="text-[10px] tracking-wide text-slate-500 uppercase">Needs attention</p>
                <ul className="mt-2 space-y-2 text-xs">
                  {[
                    ['vent-icu-3b-07', 'Under active DoS', 'critical'],
                    ['pacs-rad-01', 'Ransomware signature', 'critical'],
                    ['lab-path-04', 'Agent outdated', 'warning'],
                  ].map(([host, issue, tone]) => (
                    <li key={host} className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-slate-300">{host}</span>
                      <span className={`shrink-0 ${toneClasses[tone as 'critical' | 'warning'].text}`}>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>

            {/* Attack trends */}
            <Panel title="Attack trends" meta="Share of incidents · 30d">
              <BarList items={attackTrends} label="Attack trends by category" />
            </Panel>

            {/* Incident timeline */}
            <Panel title="Incident timeline" meta="INC-0193">
              <ol className="relative space-y-3 border-l border-slate-800 pl-4">
                {timeline.map((t) => (
                  <li key={t.time} className="relative">
                    <span
                      className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-card ${toneClasses[t.tone].dot}`}
                      aria-hidden="true"
                    />
                    <p className="font-mono text-[10px] text-slate-500">{t.time}</p>
                    <p className="text-xs leading-snug text-slate-300">{t.label}</p>
                  </li>
                ))}
              </ol>
            </Panel>

            {/* Incident status + vulns */}
            <Panel title="Incident status" meta="All sites">
              <dl className="grid grid-cols-2 gap-2">
                {incidentStatus.map((s) => (
                  <div key={s.label} className="rounded-lg border border-slate-800 p-2.5">
                    <dt className="text-[10px] text-slate-500">{s.label}</dt>
                    <dd className="mt-0.5 text-base font-semibold text-slate-50 tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3">
                <p className="text-[10px] tracking-wide text-slate-500 uppercase">Open vulnerabilities</p>
                <div className="mt-1.5 flex h-2 gap-0.5 overflow-hidden rounded-full" role="img" aria-label={vulnerabilityOverview.map((v) => `${v.label} ${v.value}`).join(', ')}>
                  {vulnerabilityOverview.map((v) => (
                    <span
                      key={v.label}
                      title={`${v.label}: ${v.value}`}
                      className={v.tone === 'neutral' ? (v.label === 'Medium' ? 'bg-slate-500' : 'bg-slate-700') : toneClasses[v.tone].dot}
                      style={{ flexGrow: v.value }}
                    />
                  ))}
                </div>
                <p className="mt-1.5 font-mono text-[10px] text-slate-500">
                  {vulnerabilityOverview.map((v) => `${v.label} ${v.value}`).join(' · ')}
                </p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}
