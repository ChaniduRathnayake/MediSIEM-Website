import { Radar, ListOrdered, Siren } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { ResearchFootnote } from '../research'
import { contextStat, gaps } from '../../data/research'

const ICONS = [Radar, ListOrdered, Siren]

export default function ProblemSection() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="The problem"
          title={<span id="problem-heading">A weak link at any stage still reaches the patient.</span>}
          lead="Detection, prioritization and response all have to be clinically aware. Today, each one has a gap."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {gaps.map((g, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={g.stage} delayMs={i * 80} className="h-full">
                <article className="card flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">
                      Gap {i + 1} · {g.stage}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-balance text-slate-50">{g.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-400">{g.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
        <ResearchFootnote className="mt-5" />

        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-balance text-slate-200">{contextStat.text}</p>
          <p className="mt-2 text-xs text-slate-500">Source: {contextStat.source}</p>
        </Reveal>
      </div>
    </section>
  )
}
