import { AlertTriangle, EyeOff, HeartOff, PowerOff } from 'lucide-react'
import Reveal from '../Reveal'

const PROBLEMS = [
  {
    icon: AlertTriangle,
    title: 'Alert Fatigue',
    description: 'SOC analysts face thousands of low-context alerts daily, so critical threats get buried and missed.',
  },
  {
    icon: HeartOff,
    title: 'No Clinical Awareness',
    description: 'CVSS-based scoring treats an ICU ventilator and an office printer as equally important.',
  },
  {
    icon: PowerOff,
    title: 'Dangerous Auto-Responses',
    description: 'Automated playbooks can isolate life-sustaining devices, putting patients directly at risk.',
  },
  {
    icon: EyeOff,
    title: 'Missing IP Context',
    description: "Without reputation intelligence, analysts can't tell a known malicious source from routine traffic.",
  },
]

export default function ProblemSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Why Traditional SIEM Fails Hospitals</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon
            return (
              <Reveal key={problem.title} delayMs={i * 75}>
                <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{problem.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{problem.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
