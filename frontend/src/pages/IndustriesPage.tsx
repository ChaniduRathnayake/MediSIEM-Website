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
        eyebrow="Healthcare"
        title="Security built for every place care happens."
        lead="From large public hospitals to small clinics and diagnostic centres, MediSIEM ranks every alert by what it puts at risk for patients, and never lets automation cut off a life-critical device."
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
