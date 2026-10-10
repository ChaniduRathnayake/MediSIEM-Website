import { CheckCircle2, CircleDashed } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { fetchMilestones } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function Roadmap() {
  usePageSeo({
    ...pageMeta['/roadmap'],
    path: '/roadmap',
  })

  const { data: milestones, loading } = useAsyncData(fetchMilestones, [])

  return (
    <>
      <PageHero eyebrow="Roadmap" title="Where MediSIEM is today — and what’s next." lead="We build in the open with our design partners. Here’s the path to general availability." />
      <section className="section pt-12">
        <div className="container-page max-w-3xl">
          {loading ? (
            <div className="space-y-4" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="card h-24 animate-pulse" />
              ))}
            </div>
          ) : (
            <ol className="relative space-y-4 border-l border-slate-800 pl-8">
              {milestones.map((m, i) => {
                const done = m.status === 'completed'
                return (
                  <li key={m._id} className="relative">
                    <span className="absolute top-6 -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-950">
                      {done ? <CheckCircle2 className="h-5 w-5 text-cyan-400" aria-hidden="true" /> : <CircleDashed className="h-5 w-5 text-slate-500" aria-hidden="true" />}
                    </span>
                    <Reveal delayMs={i * 60} className={`card p-6 ${done ? '' : 'border-dashed'}`}>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-slate-500">{m.dateLabel}</span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                            done ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300' : 'border-slate-700 text-slate-400'
                          }`}
                        >
                          {done ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-slate-50">{m.title}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{m.description}</p>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </section>
      <CTABanner primary={{ label: 'Apply for early access', to: '/contact?intent=partner' }} />
    </>
  )
}
