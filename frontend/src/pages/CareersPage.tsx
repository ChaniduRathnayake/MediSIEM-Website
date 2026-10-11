import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, HeartPulse, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const WHY = [
  { icon: HeartPulse, title: 'Work that matters', body: 'Your code helps decide which threat gets stopped first, in places where that can affect patient care.' },
  { icon: BrainCircuit, title: 'Hard, real problems', body: 'Applied machine learning, detection engineering and explainability, on real security telemetry.' },
  { icon: ShieldCheck, title: 'Early and influential', body: 'Join before general availability and shape the product, the team and how we work.' },
]

// No open roles are listed until there are real ones. TODO(careers): add a
// roles list (title, location, team, apply link) when hiring opens.
export default function CareersPage() {
  usePageSeo({
    ...pageMeta['/careers'],
    path: '/careers',
  })

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help security teams stop the threats that matter."
        lead="We’re a small team building security software for hospitals and the patients who depend on them."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-4 md:grid-cols-3">
            {WHY.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delayMs={i * 80} className="card h-full p-7">
                <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-semibold text-slate-50">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="card mt-10 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-50">No open roles right now</h2>
              <p className="mt-1 text-sm text-slate-400">
                We’re not actively hiring, but we always want to hear from exceptional security and ML engineers.
              </p>
            </div>
            <Link to="/contact?intent=general&topic=careers" className="btn-primary shrink-0">
              Introduce yourself <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
