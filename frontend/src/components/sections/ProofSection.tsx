import Reveal from '../Reveal'
import { CountUp, SectionHeader } from '../ui'
import { InfoTip, ResearchFootnote } from '../research'
import { proofMetrics } from '../../data/research'

export default function ProofSection() {
  return (
    <section id="results" className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="results-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Research results"
          title={<span id="results-heading">What the prototype showed.</span>}
          lead="Measured on the research prototype across all three modules. Hover or focus the info icon on any card for how it was measured."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofMetrics.map((m, i) => (
            <Reveal key={m.id} delayMs={(i % 4) * 60} className="h-full">
              <article className="card flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                    <CountUp to={m.value} decimals={m.decimals ?? 0} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <InfoTip text={m.tooltip} label={m.label} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-200">{m.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{m.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <ResearchFootnote className="mt-6" />
      </div>
    </section>
  )
}
