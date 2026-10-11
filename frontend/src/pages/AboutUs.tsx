import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, Eye, Microscope, Scale, User } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { fetchTeam } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const PRINCIPLES = [
  { icon: Scale, title: 'Impact over noise', body: 'Security effort should follow real-world consequences, not whichever tool shouts loudest.' },
  { icon: Eye, title: 'Explainable by default', body: 'If a model ranks an alert, an analyst should be able to see why, and disagree.' },
  { icon: Microscope, title: 'Evidence, not hype', body: 'We publish numbers only when they’re measured and verified. No invented statistics.' },
]

export default function AboutUs() {
  usePageSeo({
    ...pageMeta['/about'],
    path: '/about',
  })

  const { data: team, loading } = useAsyncData(fetchTeam, [])

  return (
    <>
      <PageHero
        eyebrow="About"
        title="We started where the stakes are highest: hospitals."
        lead="In a hospital, the wrong alert at the top of the queue can affect patient care. MediSIEM was built to rank threats by what they actually put at risk, and every part of the platform is built for the realities of healthcare."
      />

      <section className="section" aria-labelledby="principles-heading">
        <div className="container-page">
          <h2 id="principles-heading" className="section-title">
            What we believe
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delayMs={i * 80} className="card h-full p-7">
                <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-slate-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="team-heading">
        <div className="container-page">
          <h2 id="team-heading" className="section-title">
            The team
          </h2>
          <p className="lead mt-4 max-w-2xl">Security engineers and data scientists building MediSIEM.</p>
          {loading ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="card h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <li key={member._id} className="card p-6">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-950">
                      <User className="h-6 w-6 text-slate-500" aria-hidden="true" />
                    </div>
                  )}
                  <h3 className="mt-5 text-base font-semibold text-slate-50">{member.name}</h3>
                  <p className="text-sm text-cyan-400">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-400">{member.component}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-cyan-400"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/careers" className="btn-secondary">
              Careers <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/roadmap" className="btn-secondary">
              Our roadmap
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
