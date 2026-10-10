import { ExternalLink } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { getStatistic, problems } from '../../data/marketing'

export default function ProblemSection() {
  return (
    <section className="section" aria-labelledby="problem-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="The problem"
          title={<span id="problem-heading">Security teams aren’t short on alerts. They’re short on clarity.</span>}
          lead="Every tool reports its own severity. None of them know which system keeps the business — or a patient — running. So the alert that matters waits in line behind hundreds that don’t."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const stat = getStatistic(p.statId)
            const Icon = p.icon
            return (
              <Reveal key={p.title} delayMs={(i % 3) * 80} className="h-full">
                <article className="card flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/50 text-slate-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {stat && <span className="text-3xl font-semibold tracking-tight text-slate-50 tabular-nums">{stat.value}</span>}
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-slate-50">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  {stat && (
                    <p className="mt-5 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-500">
                      <span className="text-slate-400">{stat.value}</span> — {stat.label}.{' '}
                      <a
                        href={stat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-slate-400 underline decoration-slate-700 underline-offset-2 hover:text-cyan-300"
                      >
                        {stat.source}, {stat.year}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </p>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
