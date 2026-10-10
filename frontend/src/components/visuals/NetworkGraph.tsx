interface Node {
  id: string
  x: number
  y: number
  label?: string
  kind: 'external' | 'gateway' | 'core' | 'asset' | 'critical'
}

const NODES: Node[] = [
  { id: 'ext', x: 40, y: 150, label: 'External', kind: 'external' },
  { id: 'fw', x: 130, y: 150, label: 'Gateway', kind: 'gateway' },
  { id: 'core', x: 240, y: 150, label: 'MediSIEM', kind: 'core' },
  { id: 'srv1', x: 330, y: 62, label: 'EHR', kind: 'asset' },
  { id: 'srv2', x: 352, y: 128, kind: 'asset' },
  { id: 'pacs', x: 340, y: 205, label: 'PACS', kind: 'asset' },
  { id: 'ep1', x: 210, y: 52, kind: 'asset' },
  { id: 'ep2', x: 160, y: 238, kind: 'asset' },
  { id: 'ep3', x: 262, y: 252, kind: 'asset' },
  { id: 'icu', x: 440, y: 160, label: 'ICU device', kind: 'critical' },
  { id: 'lab', x: 448, y: 72, kind: 'asset' },
  { id: 'adm', x: 430, y: 248, kind: 'asset' },
]

const EDGES: [string, string][] = [
  ['ext', 'fw'],
  ['fw', 'core'],
  ['core', 'srv1'],
  ['core', 'srv2'],
  ['core', 'pacs'],
  ['core', 'ep1'],
  ['core', 'ep2'],
  ['core', 'ep3'],
  ['srv1', 'lab'],
  ['srv2', 'icu'],
  ['pacs', 'adm'],
  ['ep1', 'srv1'],
  ['ep3', 'pacs'],
]

/** Edges that carry animated telemetry flow toward the core. */
const FLOWS: [string, string][] = [
  ['srv1', 'core'],
  ['pacs', 'core'],
  ['ep2', 'core'],
  ['lab', 'srv1'],
]

/** The detected threat path, external → critical device. */
const THREAT_PATH = ['ext', 'fw', 'srv2', 'icu']

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

interface NetworkGraphProps {
  className?: string
  /** Show the highlighted threat path. */
  showThreat?: boolean
  showLabels?: boolean
}

// Sophisticated-but-restrained topology: static nodes, slow dashed telemetry
// flows, and one highlighted threat path with a soft pulse on the target.
// All motion is CSS and is disabled under prefers-reduced-motion.
export default function NetworkGraph({ className = '', showThreat = true, showLabels = true }: NetworkGraphProps) {
  const threatD = THREAT_PATH.map((id, i) => `${i === 0 ? 'M' : 'L'}${byId[id].x},${byId[id].y}`).join(' ')

  return (
    <svg
      viewBox="0 0 490 300"
      className={className}
      role="img"
      aria-label="Network topology: telemetry from servers, endpoints and devices flows to MediSIEM; a threat path from an external host toward an ICU device is highlighted."
    >
      <defs>
        <radialGradient id="ng-core" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--color-cyan-400)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--color-cyan-400)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {EDGES.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} stroke="var(--color-slate-800)" strokeWidth="1.2" />
      ))}

      {FLOWS.map(([a, b]) => (
        <line
          key={`flow-${a}-${b}`}
          x1={byId[a].x}
          y1={byId[a].y}
          x2={byId[b].x}
          y2={byId[b].y}
          stroke="var(--color-cyan-400)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="3 17"
          strokeLinecap="round"
          className="animate-dash"
        />
      ))}

      {showThreat && (
        <>
          <path d={threatD} fill="none" stroke="var(--color-amber-500)" strokeOpacity="0.25" strokeWidth="6" strokeLinejoin="round" />
          <path
            d={threatD}
            fill="none"
            stroke="var(--color-amber-500)"
            strokeWidth="1.6"
            strokeDasharray="5 5"
            strokeLinejoin="round"
            className="animate-dash"
          />
        </>
      )}

      <circle cx={byId.core.x} cy={byId.core.y} r="46" fill="url(#ng-core)" />

      {NODES.map((n) => {
        const isCore = n.kind === 'core'
        const isCritical = n.kind === 'critical'
        const isExternal = n.kind === 'external'
        const r = isCore ? 13 : isCritical ? 8 : n.kind === 'gateway' ? 7 : 5
        return (
          <g key={n.id}>
            {isCritical && showThreat && (
              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill="none"
                stroke="var(--color-red-500)"
                strokeWidth="1.5"
                className="animate-pulse-ring"
                style={{ transformOrigin: `${n.x}px ${n.y}px`, transformBox: 'view-box' }}
              />
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={isCore ? 'var(--color-slate-950)' : 'var(--color-card)'}
              stroke={isCore ? 'var(--color-cyan-400)' : isCritical && showThreat ? 'var(--color-red-500)' : isExternal ? 'var(--color-amber-500)' : 'var(--color-slate-600)'}
              strokeWidth={isCore ? 2 : 1.4}
            />
            {isCore && <circle cx={n.x} cy={n.y} r="4" fill="var(--color-cyan-400)" />}
            {showLabels && n.label && (
              <text
                x={n.x}
                y={n.y + r + 14}
                textAnchor="middle"
                className="fill-slate-400 font-mono"
                style={{ fontSize: 10, letterSpacing: '0.04em' }}
              >
                {n.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
