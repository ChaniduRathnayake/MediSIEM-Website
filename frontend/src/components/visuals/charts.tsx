import { useId, useMemo, useState, type MouseEvent } from 'react'
import type { Tier } from '../../data/demoTelemetry'
import { tierTone, toneClasses, type Tone } from './tones'

/* ------------------------------------------------------------------ */
/* Area chart — single series, cyan, with crosshair + tooltip on hover */
/* ------------------------------------------------------------------ */

interface AreaChartProps {
  data: number[]
  /** Accessible name — the chart title. */
  label: string
  height?: number
  /** Formats the tooltip for point i. */
  formatPoint?: (value: number, index: number) => string
  className?: string
  showBaseline?: boolean
}

export function AreaChart({ data, label, height = 120, formatPoint, className = '', showBaseline = true }: AreaChartProps) {
  const gradientId = useId()
  const [hover, setHover] = useState<number | null>(null)
  const width = 600
  const padTop = 10

  const { points, max } = useMemo(() => {
    const max = Math.max(...data) * 1.08
    const step = width / (data.length - 1)
    const points = data.map((v, i) => [i * step, padTop + (height - padTop) * (1 - v / max)] as const)
    return { points, max }
  }, [data, height])

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`

  function onMove(e: MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    setHover(Math.max(0, Math.min(data.length - 1, Math.round(ratio * (data.length - 1)))))
  }

  const hp = hover !== null ? points[hover] : null

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="block h-full w-full overflow-visible"
        role="img"
        aria-label={`${label}. Peak ${Math.max(...data)}, latest ${data[data.length - 1]}.`}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-cyan-400)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--color-cyan-400)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1="0"
            x2={width}
            y1={padTop + (height - padTop) * r}
            y2={padTop + (height - padTop) * r}
            stroke="var(--color-slate-800)"
            strokeWidth="1"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke="var(--color-cyan-400)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {showBaseline && (
          <line x1="0" x2={width} y1={height} y2={height} stroke="var(--color-slate-700)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        )}
        {hp && (
          <line x1={hp[0]} x2={hp[0]} y1={0} y2={height} stroke="var(--color-slate-400)" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        )}
      </svg>
      {hp && hover !== null && (
        <>
          <span
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-cyan-400"
            style={{ left: `${(hp[0] / width) * 100}%`, top: `${(hp[1] / height) * 100}%` }}
          />
          <span
            className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full rounded-md border border-slate-700 bg-slate-950/95 px-2 py-1 font-mono text-[11px] whitespace-nowrap text-slate-200 shadow-lg"
            style={{ left: `${Math.min(88, Math.max(12, (hp[0] / width) * 100))}%` }}
          >
            {formatPoint ? formatPoint(data[hover], hover) : data[hover]}
          </span>
        </>
      )}
      <span className="sr-only">Maximum on scale {Math.round(max)}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Gauge — a single headline score on a 0–max arc                       */
/* ------------------------------------------------------------------ */

interface GaugeProps {
  value: number
  max?: number
  label: string
  size?: number
  /** Short status text under the number, e.g. "Moderate". */
  status?: string
}

export function Gauge({ value, max = 100, label, size = 148, status }: GaugeProps) {
  const r = 52
  const circumference = Math.PI * r
  const ratio = Math.max(0, Math.min(1, value / max))
  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 128 72" className="w-full" role="img" aria-label={`${label}: ${value} of ${max}${status ? `, ${status}` : ''}`}>
        <path d="M12 66a52 52 0 0 1 104 0" fill="none" stroke="var(--color-slate-800)" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M12 66a52 52 0 0 1 104 0"
          fill="none"
          stroke="var(--color-cyan-400)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference * ratio} ${circumference}`}
          className="transition-[stroke-dasharray] duration-1000 ease-out"
        />
      </svg>
      <div className="-mt-9 text-center">
        <div className="text-3xl font-semibold tracking-tight text-slate-50 tabular-nums">{value}</div>
        {status && <div className="mt-0.5 text-[11px] font-medium text-slate-400">{status}</div>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Horizontal bars — magnitude by category, single hue                 */
/* ------------------------------------------------------------------ */

interface BarListProps {
  items: { label: string; value: number }[]
  unit?: string
  label: string
}

export function BarList({ items, unit = '%', label }: BarListProps) {
  const max = Math.max(...items.map((i) => i.value))
  return (
    <ul className="space-y-2.5" aria-label={label}>
      {items.map((item) => (
        <li key={item.label} title={`${item.label}: ${item.value}${unit}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">{item.label}</span>
            <span className="font-mono text-slate-400 tabular-nums">
              {item.value}
              {unit}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-slate-800/70">
            <div className="h-full rounded-full bg-cyan-400/80" style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Status primitives — color always paired with a text label           */
/* ------------------------------------------------------------------ */

export function TierBadge({ tier }: { tier: Tier }) {
  const t = toneClasses[tierTone[tier]]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${t.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden="true" />
      {tier}
    </span>
  )
}

export function ScorePill({ score }: { score: number }) {
  const tone: Tone = score >= 8 ? 'critical' : score >= 5 ? 'warning' : 'success'
  return (
    <span className={`inline-flex min-w-[2.75rem] justify-center rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums ${toneClasses[tone].badge}`}>
      {score.toFixed(1)}
    </span>
  )
}

/** Segmented ring for a part-of-whole with ≤ 3 states. */
export function StatusRing({
  segments,
  label,
  size = 96,
}: {
  segments: { value: number; tone: Tone; label: string }[]
  label: string
  size?: number
}) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const r = 40
  const c = 2 * Math.PI * r
  const gap = 3
  const strokes: Record<Tone, string> = {
    critical: 'var(--color-red-500)',
    warning: 'var(--color-amber-500)',
    success: 'var(--color-emerald-500)',
    info: 'var(--color-cyan-400)',
    neutral: 'var(--color-slate-600)',
  }
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${label}: ${segments.map((s) => `${s.label} ${s.value}`).join(', ')}`}
      className="-rotate-90"
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-slate-800)" strokeWidth="9" />
      {segments.map((s, i) => {
        const len = Math.max(0, (s.value / total) * c - gap)
        const offset = segments.slice(0, i).reduce((sum, prev) => sum + (prev.value / total) * c, 0)
        return (
          <circle
            key={s.label}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={strokes[s.tone]}
            strokeWidth="9"
            strokeDasharray={`${len} ${c}`}
            strokeDashoffset={-offset}
          >
            <title>{`${s.label}: ${s.value}`}</title>
          </circle>
        )
      })}
    </svg>
  )
}
