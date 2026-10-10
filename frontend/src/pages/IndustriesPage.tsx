import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import { IndustryCards } from '../components/sections/IndustriesGrid'
import SecurityCompliance from '../components/sections/SecurityCompliance'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function IndustriesPage() {
  usePageSeo({
    ...pageMeta['/industries'],
    path: '/industries',
  })

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Security that understands what your organization can’t afford to lose."
        lead="Built first for hospitals, where the wrong priority can affect patient care. The same impact-aware approach protects banks, governments, manufacturers and growing businesses."
        actions={
          <Link to="/contact?intent=expert" className="btn-primary">
            Talk to a Security Expert <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <section className="section">
        <div className="container-page">
          <IndustryCards />
        </div>
      </section>
      <SecurityCompliance />
      <CTABanner />
    </>
  )
}
