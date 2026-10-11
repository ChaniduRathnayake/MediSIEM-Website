import { Link } from 'react-router-dom'
import { ArrowRight, Code2 } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { IntegrationTile } from '../components/sections/IntegrationsShowcase'
import { availableIntegrations, roadmapIntegrations } from '../data/integrations'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function IntegrationsPage() {
  usePageSeo({
    ...pageMeta['/integrations'],
    path: '/integrations',
  })

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Open by design. Connected to your stack."
        lead="MediSIEM is built on open, widely deployed security technology and exposes a REST API. We only list an integration as available once it ships. Everything else is clearly marked as roadmap."
        actions={
          <>
            <Link to="/contact?intent=integration" className="btn-primary">
              Request an integration <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/api" className="btn-secondary">
              <Code2 className="h-4 w-4" aria-hidden="true" /> API documentation
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="available-heading">
        <div className="container-page">
          <h2 id="available-heading" className="text-2xl font-semibold tracking-tight text-slate-50">
            Available today
          </h2>
          <p className="mt-2 text-sm text-slate-400">Shipping with the platform.</p>
          <Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {availableIntegrations.map((i) => (
                <li key={i.name}>
                  <IntegrationTile integration={i} showDescription />
                </li>
              ))}
            </ul>
          </Reveal>

          <h2 className="mt-20 text-2xl font-semibold tracking-tight text-slate-50">On the roadmap</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Planned native connectors. These are not yet supported. If one matters to you, tell us and it helps us prioritize.
          </p>
          <Reveal>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {roadmapIntegrations.map((i) => (
                <li key={i.name}>
                  <IntegrationTile integration={i} showDescription />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Need a connector we don’t list?"
        lead="Tell us what you run. Integration requests from customers directly shape our roadmap."
        primary={{ label: 'Request an integration', to: '/contact?intent=integration' }}
        secondary={{ label: 'Book a Demo', to: '/contact?intent=demo' }}
      />
    </>
  )
}
