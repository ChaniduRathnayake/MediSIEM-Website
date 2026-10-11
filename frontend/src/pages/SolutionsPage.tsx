import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import { UseCaseCards } from '../components/sections/UseCasesGrid'
import IndustriesSpotlight from '../components/sections/IndustriesGrid'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function SolutionsPage() {
  usePageSeo({
    ...pageMeta['/solutions'],
    path: '/solutions',
  })

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built around the problems hospital security teams actually have."
        lead="Whether you’re drowning in alerts, preparing for a HIPAA audit or protecting devices that keep patients alive, MediSIEM gives you a clear next step."
        actions={
          <Link to="/contact?intent=expert" className="btn-primary">
            Talk to a Security Expert <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <section className="section">
        <div className="container-page">
          <UseCaseCards />
        </div>
      </section>
      <IndustriesSpotlight />
      <CTABanner />
    </>
  )
}
