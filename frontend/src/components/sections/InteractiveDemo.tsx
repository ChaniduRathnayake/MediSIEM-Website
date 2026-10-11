import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  Gauge,
  Pause,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { SampleDataTag } from '../BrowserFrame'
import { TierBadge } from '../visuals/charts'

interface Stage {
  id: string
  label: string
  icon: LucideIcon
  headline: string
  body: string
}

const STAGES: Stage[] = [
  { id: 'detected', label: 'Threat detected', icon: Radar, headline: 'An anomaly appears at 02:14', body: 'Traffic to an ICU ventilator spikes 40× above its learned baseline. The classifier flags it as a denial-of-service flood.' },
  { id: 'prioritized', label: 'Alert prioritized', icon: Gauge, headline: 'Ranked by impact, not just severity', body: 'CVSS alone rates this 6.8, below a trojan on a billing PC. MediSIEM scores it 9.1 because a life-critical device is at risk.' },
  { id: 'investigation', label: 'Investigation', icon: FileSearch, headline: 'Context arrives with the alert', body: 'Related events, asset details and threat-intelligence matches are attached automatically. No tab-hopping.' },
  { id: 'analysis', label: 'Risk analysis', icon: Sparkles, headline: 'Every score is explainable', body: 'The analyst sees exactly which factors drove the score, and can challenge any of them.' },
  { id: 'response', label: 'Recommended response', icon: ShieldCheck, headline: 'A clear next step, with a human in control', body: 'MediSIEM proposes rate-limiting the segment. Because the device is life-critical, a clinical lead must approve first.' },
  { id: 'resolved', label: 'Incident resolved', icon: CheckCircle2, headline: 'Contained in 7 minutes, fully evidenced', body: 'Traffic normalizes. Every decision is written to the tamper-evident audit ledger for review and compliance.' },
]

// CAS = (0.25·TR + 0.30·CC + 0.25·TS + 0.10·AE + 0.10·TC) × 2, with
// TR=4, CC=5, TS=5, AE=4, TC=4 → 9.1. Contributions below are each term × 2.
const FACTORS = [
  { label: 'Clinical criticality', value: 3.0 },
  { label: 'Time sensitivity', value: 2.5 },
  { label: 'Threat risk', value: 2.0 },
  { label: 'Active exploitation', value: 0.8 },
  { label: 'Temporal context', value: 0.8 },
]

function StagePanel({ stage, approved, onApprove }: { stage: string; approved: boolean; onApprove: () => void }) {
  switch (stage) {
    case 'detected':
      return (
        <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-[12px] leading-relaxed text-slate-400">
          <span className="text-slate-500">{'// alert A-2041 · 02:14:07'}</span>
          {'\n'}
          {'{\n'}
          {'  '}<span className="text-cyan-300">"source"</span>: <span className="text-amber-300">"203.0.113.47"</span>,{'\n'}
          {'  '}<span className="text-cyan-300">"target"</span>: <span className="text-slate-200">"vent-icu-3b-07"</span>,{'\n'}
          {'  '}<span className="text-cyan-300">"classification"</span>: <span className="text-slate-200">"DoS / flood"</span>,{'\n'}
          {'  '}<span className="text-cyan-300">"anomaly_score"</span>: <span className="text-slate-200">0.97</span>,{'\n'}
          {'  '}<span className="text-cyan-300">"pkts_per_sec"</span>: <span className="text-slate-200">48210</span>{'\n'}
          {'}'}
        </pre>
      )
    case 'prioritized':
      return (
        <div className="space-y-5 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          {[
            { label: 'CVSS base severity', value: 6.8, cls: 'bg-slate-500' },
            { label: 'MediSIEM Alert Score', value: 9.1, cls: 'bg-cyan-400' },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{row.label}</span>
                <span className="font-mono font-semibold text-slate-50 tabular-nums">{row.value.toFixed(1)}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${row.cls} transition-[width] duration-700`} style={{ width: `${row.value * 10}%` }} />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-sm">
            <span className="text-slate-400">Queue position</span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-slate-50">#1 of 214</span>
              <TierBadge tier="Immediate" />
            </span>
          </div>
        </div>
      )
    case 'investigation':
      return (
        <ul className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950/60 text-sm">
          {[
            ['Asset', 'Ventilator · ICU Ward 3B · Criticality: life-critical'],
            ['Threat intel', 'Source IP matches 2 MISP indicators (botnet C2)'],
            ['IP reputation', '12 / 100, known malicious'],
            ['Related events', '38 flows from 3 external hosts in 4 min'],
            ['ATT&CK', 'T1498 · Network Denial of Service'],
          ].map(([k, v]) => (
            <li key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:gap-4">
              <span className="w-32 shrink-0 font-mono text-[11px] tracking-wide text-slate-500 uppercase">{k}</span>
              <span className="text-slate-200">{v}</span>
            </li>
          ))}
        </ul>
      )
    case 'analysis':
      return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs text-slate-500">Contribution to Alert Score (sum = 9.1)</p>
          <ul className="mt-4 space-y-3">
            {FACTORS.map((f) => (
              <li key={f.label} className="grid grid-cols-[9.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                <span className="text-slate-300">{f.label}</span>
                <span className="h-2 rounded-full bg-slate-800">
                  <span className="block h-full rounded-full bg-cyan-400/85" style={{ width: `${(f.value / 3) * 100}%` }} />
                </span>
                <span className="text-right font-mono text-slate-400 tabular-nums">+{f.value.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    case 'response':
      return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          <p className="text-xs text-slate-500">Recommended action</p>
          <p className="mt-1 text-base font-semibold text-slate-50">Rate-limit segment ICU-3B and block source hosts at gateway</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
            <span className="text-amber-200">Requires approval: life-critical device</span>
            <button
              type="button"
              onClick={onApprove}
              disabled={approved}
              className="btn-primary btn-sm ml-auto disabled:opacity-100"
              aria-live="polite"
            >
              {approved ? (
                <>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Approved
                </>
              ) : (
                'Approve as clinical lead'
              )}
            </button>
          </div>
        </div>
      )
    default:
      return (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-5">
          <ol className="space-y-2.5 text-sm">
            {[
              ['02:14', 'Detected and scored 9.1 (Immediate)'],
              ['02:15', 'Response proposed, approval requested'],
              ['02:17', 'Approved · segment rate-limited'],
              ['02:21', 'Traffic normal · incident closed'],
            ].map(([t, l]) => (
              <li key={t} className="flex gap-4">
                <span className="font-mono text-slate-500">{t}</span>
                <span className="text-slate-200">{l}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-emerald-500/20 pt-3 font-mono text-[11px] break-all text-slate-500">
            ledger · block 18,442 · sha256 9f2c…e71a
          </p>
        </div>
      )
  }
}

export default function InteractiveDemo() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [approved, setApproved] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver((e) => setInView(!!e[0]?.isIntersecting), { threshold: 0.35 })
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || !inView) return
    const t = window.setTimeout(() => {
      setIndex((i) => {
        const next = (i + 1) % STAGES.length
        if (STAGES[next].id === 'resolved') setApproved(true)
        if (next === 0) setApproved(false)
        return next
      })
    }, 4800)
    return () => window.clearTimeout(t)
  }, [index, playing, inView])

  const go = (i: number) => {
    setPlaying(false)
    setIndex(i)
    if (STAGES[i].id === 'resolved') setApproved(true)
  }

  const stage = STAGES[index]
  const StageIcon = stage.icon

  return (
    <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="demo-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Interactive demo"
          title={<span id="demo-heading">Follow one alert from detection to resolution.</span>}
          lead="A night-shift scenario: three alerts arrive at once. Here’s how MediSIEM makes sure the right one gets handled first."
        />

        <Reveal className="mt-14">
          <div ref={ref} className="card overflow-hidden">
            {/* Stepper */}
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/40 px-3 py-3 sm:px-5">
              <div role="tablist" aria-label="Demo stages" className="flex flex-1 gap-1 overflow-x-auto">
                {STAGES.map((s, i) => {
                  const Icon = s.icon
                  const done = i < index
                  const active = i === index
                  return (
                    <button
                      key={s.id}
                      role="tab"
                      id={`demo-tab-${s.id}`}
                      aria-selected={active}
                      aria-controls="demo-panel"
                      onClick={() => go(i)}
                      className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        active ? 'bg-cyan-400/10 text-cyan-300' : done ? 'text-slate-300 hover:bg-white/5' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden md:inline">{s.label}</span>
                      <span className="md:hidden">{i + 1}</span>
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-slate-50"
                aria-label={playing ? 'Pause demo' : 'Play demo'}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            {/* Progress */}
            <div className="h-0.5 bg-slate-800" aria-hidden="true">
              <div className="h-full bg-cyan-400 transition-[width] duration-500" style={{ width: `${((index + 1) / STAGES.length) * 100}%` }} />
            </div>

            <div
              id="demo-panel"
              role="tabpanel"
              aria-labelledby={`demo-tab-${stage.id}`}
              className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
            >
              <div key={stage.id} className="animate-fade-up">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-cyan-400 uppercase">
                  <StageIcon className="h-4 w-4" aria-hidden="true" />
                  Step {index + 1} of {STAGES.length} · {stage.label}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{stage.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{stage.body}</p>
                <div className="mt-7 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(Math.max(0, index - 1))}
                    disabled={index === 0}
                    className="btn-secondary btn-sm disabled:opacity-40"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {index < STAGES.length - 1 ? (
                    <button type="button" onClick={() => go(index + 1)} className="btn-secondary btn-sm">
                      Next step <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <Link to="/contact?intent=demo" className="btn-primary btn-sm">
                      See it on your data <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                  <span className="ml-auto">
                    <SampleDataTag />
                  </span>
                </div>
              </div>
              <div key={`${stage.id}-panel`} className="animate-fade-up [animation-delay:80ms]">
                <StagePanel
                  stage={stage.id}
                  approved={approved}
                  onApprove={() => {
                    setPlaying(false)
                    setApproved(true)
                    window.setTimeout(() => setIndex(STAGES.length - 1), 700)
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
