import { BrainCircuit, Database, Layers, ShieldAlert } from 'lucide-react'
import Reveal from '../Reveal'

const STATS = [
  { value: '3', label: 'Machine Learning Models', icon: BrainCircuit },
  { value: '5', label: 'CAS Scoring Dimensions', icon: Layers },
  { value: '2', label: 'Benchmark Datasets', icon: Database },
  { value: '6', label: 'IoMT Attack Types Detected', icon: ShieldAlert },
]

export default function HighlightsStrip() {
  return (
    <section className="border-b border-slate-800 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <Reveal key={stat.label} delayMs={i * 75}>
                <div className="flex h-full flex-col items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-center sm:p-6">
                  <Icon className="h-6 w-6 text-cyan-400" />
                  <span className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</span>
                  <span className="text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
