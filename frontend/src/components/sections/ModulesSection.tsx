import { Check } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import ArchitectureFlow from './ArchitectureFlow'
import { modules } from '../../data/research'

/** "How it works": the architecture diagram plus the three product modules. */
export default function ModulesSection({ id = 'how-it-works' }: { id?: string }) {
  return (
    <section id={id} className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby={`${id}-heading`}>
      <div className="container-page">
        <SectionHeader
          eyebrow="How it works"
          title={<span id={`${id}-heading`}>Three modules. One clinically aware pipeline.</span>}
          lead="MediSIEM sits on your Wazuh SIEM and adds clinical context at detection, prioritization and response."
        />

        <Reveal className="mt-14">
          <ArchitectureFlow />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.id} delayMs={i * 80} className="h-full">
              <article className="card flex h-full flex-col p-6 sm:p-7" aria-labelledby={`module-${m.id}`}>
                <p className="font-mono text-xs text-cyan-400">Module {m.number}</p>
                <h3 id={`module-${m.id}`} className="mt-3 text-xl font-semibold text-slate-50">
                  {m.name}
                </h3>
                <p className="text-sm font-medium text-slate-300">{m.role}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{m.summary}</p>
                <ul className="mt-5 space-y-3 border-t border-slate-800 pt-5">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
