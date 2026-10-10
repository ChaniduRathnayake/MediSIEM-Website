import { Link } from 'react-router-dom'
import { ArrowRight, Cloud, Cpu, HardDrive, Laptop, Network } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { pillars } from '../../data/marketing'

const SOURCES = [
  { icon: Laptop, label: 'Endpoints' },
  { icon: HardDrive, label: 'Servers' },
  { icon: Network, label: 'Network flows' },
  { icon: Cpu, label: 'Connected devices' },
  { icon: Cloud, label: 'Cloud workloads' },
]

const ENGINE = [
  { label: 'Collect & correlate', meta: 'Wazuh · Elasticsearch' },
  { label: 'Detect', meta: 'Classification · Anomaly' },
  { label: 'Enrich', meta: 'MISP threat intel' },
  { label: 'Score impact', meta: 'CAAP Alert Score 0–10' },
]

const OUTCOMES = [
  { label: 'Prioritized queue', tone: 'bg-red-500', meta: 'Immediate · Investigate · Monitor' },
  { label: 'Guided response', tone: 'bg-amber-500', meta: 'Approvals for critical systems' },
  { label: 'Audit evidence', tone: 'bg-emerald-500', meta: 'Tamper-evident ledger' },
]

function Connector() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-1 lg:py-0" aria-hidden="true">
      <svg className="h-8 w-3 lg:h-3 lg:w-10" viewBox="0 0 40 12" preserveAspectRatio="none">
        <line x1="0" y1="6" x2="40" y2="6" stroke="#00D9FF" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 7" className="animate-dash" />
      </svg>
    </div>
  )
}

/** Architecture diagram: sources → MediSIEM → outcomes. */
export function PlatformDiagram() {
  return (
    <figure className="card relative overflow-hidden p-5 sm:p-7">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <figcaption className="sr-only">
        Telemetry from endpoints, servers, network flows, connected devices and cloud workloads flows into MediSIEM, which collects,
        detects, enriches and scores each alert, producing a prioritized queue, guided response and audit evidence.
      </figcaption>
      <div className="relative flex flex-col items-stretch lg:flex-row lg:items-center">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:w-40 lg:grid-cols-1">
          {SOURCES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300">
              <Icon className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <Connector />
        <div className="flex-1 rounded-xl border border-cyan-400/30 bg-slate-950/80 p-4 shadow-[0_0_60px_-20px_rgb(0_217_255/0.35)]">
          <p className="font-mono text-[10px] tracking-[0.16em] text-cyan-300 uppercase">MediSIEM platform</p>
          <ol className="mt-3 space-y-2">
            {ENGINE.map((e, i) => (
              <li key={e.label} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-card px-3 py-2">
                <span className="font-mono text-[10px] text-slate-500">0{i + 1}</span>
                <span className="flex-1 text-[13px] font-medium text-slate-100">{e.label}</span>
                <span className="hidden font-mono text-[10px] text-slate-500 sm:inline">{e.meta}</span>
              </li>
            ))}
          </ol>
        </div>
        <Connector />
        <ul className="grid gap-2 lg:w-48">
          {OUTCOMES.map((o) => (
            <li key={o.label} className="rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2">
              <p className="flex items-center gap-2 text-[13px] font-medium text-slate-100">
                <span className={`h-1.5 w-1.5 rounded-full ${o.tone}`} aria-hidden="true" />
                {o.label}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">{o.meta}</p>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

export default function SolutionSection() {
  return (
    <section className="section relative border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="solution-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="The platform"
          title={<span id="solution-heading">One platform that knows what’s critical — and acts on it.</span>}
          lead="MediSIEM brings detection, prioritization, response and compliance into a single workflow, built around one question: what does this alert put at risk?"
        />

        <Reveal className="mt-16">
          <PlatformDiagram />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} delayMs={(i % 3) * 80} className="flex gap-4">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-slate-50">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link to="/platform" className="btn-secondary">
            Explore the Platform <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
