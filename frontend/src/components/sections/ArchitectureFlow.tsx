// The MediSIEM pipeline as an animated diagram. Desktop shows an SVG with
// flowing connectors (the dash animation stops under prefers-reduced-motion);
// smaller screens get the same stages as a numbered list.

interface Node {
  id: string
  x: number
  y: number
  title: string
  sub: string
  accent?: boolean
}

const W = 200
const H = 76

const NODES: Node[] = [
  { id: 'traffic', x: 20, y: 92, title: 'Hospital IoMT traffic', sub: 'devices, flows and logs' },
  { id: 'medshield', x: 270, y: 30, title: 'MedShield', sub: 'DDoS layer: RF + IF to MIRS', accent: true },
  { id: 'caapml', x: 270, y: 154, title: 'CAAP ML layer', sub: 'RF, Isolation Forest, K-Means', accent: true },
  { id: 'wazuh', x: 520, y: 92, title: 'Wazuh SIEM', sub: 'aggregation and correlation' },
  { id: 'cas', x: 770, y: 92, title: 'CAS engine', sub: 'Clinical Alert Score + SHAP', accent: true },
  { id: 'response', x: 770, y: 330, title: 'Response engine', sub: 'criticality-gated tiers', accent: true },
  { id: 'soc', x: 520, y: 330, title: 'SOC dashboard', sub: '+ clinician Approve/Deny' },
  { id: 'audit', x: 270, y: 330, title: 'Audit log', sub: 'hash-chained record' },
  { id: 'retrain', x: 20, y: 330, title: 'Offline retraining', sub: 'analyst verdicts as labels' },
]

const FLOWS = [
  'M220 115 C245 115, 245 68, 266 68',
  'M220 145 C245 145, 245 192, 266 192',
  'M470 68 C495 68, 495 115, 516 115',
  'M470 192 C495 192, 495 145, 516 145',
  'M720 130 H766',
  'M870 168 V326',
  'M770 368 H724',
  'M520 368 H474',
  'M270 368 H224',
]

const FEEDBACK = 'M120 330 V292 H245 V214 H266'

const STEPS = [
  ['Hospital IoMT traffic', 'Devices, network flows and logs from the clinical network.'],
  ['MedShield and CAAP ML', 'DDoS detection (MIRS) and attack classification run side by side.'],
  ['Wazuh SIEM', 'Alerts are aggregated and correlated.'],
  ['CAS engine', 'Each alert gets a Clinical Alert Score and a SHAP explanation.'],
  ['Response engine', 'Criticality-gated tiers decide whether and how hard to respond.'],
  ['SOC dashboard', 'Analysts see the ranked queue; clinicians approve or deny disruption.'],
  ['Audit log', 'Every decision is written to a hash-chained record.'],
  ['Offline retraining', 'Analyst verdicts become labelled data and feed back into the models.'],
]

export default function ArchitectureFlow() {
  return (
    <div>
      <svg viewBox="0 0 990 430" className="hidden h-auto w-full lg:block" role="img" aria-labelledby="arch-title arch-desc">
        <title id="arch-title">MediSIEM architecture</title>
        <desc id="arch-desc">
          Hospital IoMT traffic flows into MedShield and the CAAP ML layer, then Wazuh SIEM aggregation, the Clinical Alert Score engine
          and the criticality-gated response engine, which feeds the SOC dashboard with clinician approval and a hash-chained audit log.
          Analyst verdicts drive offline retraining in a feedback loop.
        </desc>
        <defs>
          <marker id="arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="fill-cyan-400" />
          </marker>
          <marker id="arch-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="fill-slate-500" />
          </marker>
        </defs>

        {FLOWS.map((d) => (
          <path key={d} d={d} fill="none" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#arch-arrow)" className="animate-dash stroke-cyan-400" />
        ))}
        <path d={FEEDBACK} fill="none" strokeWidth="1.5" strokeDasharray="3 5" markerEnd="url(#arch-arrow-muted)" className="stroke-slate-500" />
        <text x="140" y="284" className="fill-slate-500 font-mono text-[11px]">
          feedback loop
        </text>

        {NODES.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={W}
              height={H}
              rx="14"
              strokeWidth="1.5"
              className={n.accent ? 'fill-card stroke-cyan-400/60' : 'fill-card stroke-slate-700'}
            />
            <text x={n.x + W / 2} y={n.y + 33} textAnchor="middle" className="fill-slate-50 text-[15px] font-semibold">
              {n.title}
            </text>
            <text x={n.x + W / 2} y={n.y + 54} textAnchor="middle" className="fill-slate-400 text-[12px]">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>

      <ol className="space-y-3 lg:hidden" aria-label="MediSIEM architecture, step by step">
        {STEPS.map(([title, body], i) => (
          <li key={title} className="flex gap-4 rounded-2xl border border-slate-800 bg-card p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 font-mono text-xs text-cyan-300">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-100">{title}</p>
              <p className="mt-0.5 text-sm text-slate-400">{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
