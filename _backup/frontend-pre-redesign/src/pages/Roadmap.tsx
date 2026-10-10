import { CheckCircle2, Circle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { fetchMilestones } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePageSeo } from '../hooks/usePageSeo'

export default function Roadmap() {
  usePageSeo({
    title: 'Roadmap | MediSIEM',
    description: 'The MediSIEM product roadmap, from the core scoring engine to general availability.',
    path: '/roadmap',
  })

  const { data: milestones, loading } = useAsyncData(fetchMilestones, [])

  return (
    <div>
      <PageHeader title="Roadmap" subtitle="Where MediSIEM is today, and what's coming next." />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-sm text-slate-500">Loading roadmap&hellip;</p>
        ) : (
          <ol className="space-y-4">
            {milestones.map((milestone) => (
              <li key={milestone._id}>
                <Card className="flex items-start gap-4">
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  ) : (
                    <Circle className="mt-1 h-5 w-5 flex-shrink-0 text-slate-500" />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-semibold text-white">{milestone.title}</h3>
                      <span className="text-xs text-slate-500">{milestone.dateLabel}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          milestone.status === 'completed'
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'bg-slate-700/50 text-slate-400'
                        }`}
                      >
                        {milestone.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{milestone.description}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
