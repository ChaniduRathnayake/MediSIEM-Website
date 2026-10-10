import { ArrowDown, ArrowRight, Calculator, CheckCircle2, Database, ScanSearch } from 'lucide-react'
import Reveal from '../Reveal'

const STEPS = [
  {
    icon: Database,
    title: 'Collect',
    description: 'Wazuh agents gather logs and network flows from hospital devices.',
  },
  {
    icon: ScanSearch,
    title: 'Detect',
    description: 'Random Forest classifies the attack, Isolation Forest flags anomalies, K-Means adds traffic context.',
  },
  {
    icon: Calculator,
    title: 'Score',
    description: 'The Clinical Alert Score combines threat, clinical and time factors into a 0-10 score.',
  },
  {
    icon: CheckCircle2,
    title: 'Act',
    description: 'Each alert gets an action — Immediate, Investigate or Monitor — with a SHAP-based explanation.',
  },
]

export default function HowItWorksSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">How CAAP Works</h2>
        </Reveal>

        <div className="mt-12 flex flex-col items-stretch lg:flex-row lg:items-start">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1
            return (
              <div key={step.title} className="flex flex-1 flex-col items-stretch lg:flex-row">
                <Reveal delayMs={i * 120} className="flex-1">
                  <div className="flex h-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                  </div>
                </Reveal>

                {!isLast && (
                  <div className="flex items-center justify-center py-2 text-slate-600 lg:px-2 lg:py-0">
                    <ArrowDown className="h-5 w-5 lg:hidden" />
                    <ArrowRight className="hidden h-5 w-5 lg:block" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
