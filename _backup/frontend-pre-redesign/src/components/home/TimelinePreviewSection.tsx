import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { useAsyncData } from '../../hooks/useAsyncData'
import { fetchMilestones } from '../../services/api'
import Reveal from '../Reveal'
import Skeleton from '../Skeleton'

export default function TimelinePreviewSection() {
  const { data: milestones, loading } = useAsyncData(fetchMilestones, [])

  const total = milestones.length
  const completed = milestones.filter((m) => m.status === 'completed').length
  const next = milestones.find((m) => m.status === 'upcoming')
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <section className="border-b border-slate-800 bg-slate-900/20 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Product Roadmap</h2>
        </Reveal>

        <Reveal delayMs={100} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-300">
                  {completed} of {total} roadmap phases complete
                </span>
                <span className="font-semibold text-cyan-400">{progress}%</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {next && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Next up</p>
                    <p className="mt-1 text-sm font-semibold text-white">{next.title}</p>
                    <p className="text-xs text-slate-400">{next.dateLabel}</p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              View Full Roadmap &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
