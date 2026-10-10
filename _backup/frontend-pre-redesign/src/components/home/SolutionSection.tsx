import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Globe, HeartPulse } from 'lucide-react'
import Reveal from '../Reveal'

const COMPONENTS = [
  {
    icon: BrainCircuit,
    title: 'Clinically Aware Alert Prioritization',
    description:
      'Scores every alert with a 5-dimension Clinical Alert Score using Random Forest, Isolation Forest and K-Means.',
    iconClasses: 'bg-cyan-500/10 text-cyan-400',
    hoverClasses: 'hover:border-cyan-500/40',
  },
  {
    icon: HeartPulse,
    title: 'Life-Critical Incident Response',
    description:
      'Human-in-the-loop orchestration that never disrupts life-critical devices without clinician approval, backed by a blockchain audit ledger.',
    iconClasses: 'bg-emerald-500/10 text-emerald-400',
    hoverClasses: 'hover:border-emerald-500/40',
  },
  {
    icon: Globe,
    title: 'Context-Aware IP Protection',
    description: 'Dynamic IP reputation scoring enriched with MISP threat intelligence for every SIEM alert.',
    iconClasses: 'bg-violet-500/10 text-violet-400',
    hoverClasses: 'hover:border-violet-500/40',
  },
]

export default function SolutionSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-900/20 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">The MediSIEM Platform</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Three Engines, One Clinically Aware Platform
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {COMPONENTS.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delayMs={i * 100}>
                <Link
                  to="/technology"
                  className={`group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors ${item.hoverClasses}`}
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconClasses}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-slate-400">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition-transform group-hover:translate-x-1">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
