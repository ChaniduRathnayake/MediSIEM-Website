import { ShieldCheck, ShieldAlert } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { ResearchFootnote } from '../research'
import { scenarios } from '../../data/research'

export default function ScenarioSection() {
  return (
    <section id="use-cases" className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="use-cases-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Who it’s for"
          title={<span id="use-cases-heading">Same alert. Different device. Different right answer.</span>}
          lead="For hospital CISOs and security leads, clinical engineering heads, SOC managers and CIOs: what a traditional SIEM does, and what MediSIEM does instead."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {scenarios.map((s, i) => (
            <Reveal key={s.id} delayMs={i * 80} className="h-full">
              <article className="card flex h-full flex-col overflow-hidden" aria-labelledby={`scenario-${s.id}`}>
                <h3 id={`scenario-${s.id}`} className="p-6 pb-4 text-lg font-semibold text-balance text-slate-50">
                  {s.title}
                </h3>
                <div className="border-t border-slate-800 px-6 py-5">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-amber-400 uppercase">
                    <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" /> Traditional SIEM
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.traditional}</p>
                </div>
                <div className="mt-auto border-t border-slate-800 bg-cyan-400/[0.04] px-6 py-5">
                  <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-cyan-400 uppercase">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> MediSIEM
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">{s.medisiem}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <ResearchFootnote className="mt-6" />
      </div>
    </section>
  )
}
