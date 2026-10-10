import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import { ProductCards } from '../components/sections/ProductsGrid'
import PricingSection from '../components/sections/PricingSection'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function ProductsPage() {
  usePageSeo({
    ...pageMeta['/products'],
    path: '/products',
  })

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A complete security operations platform, one module at a time."
        lead="Every MediSIEM product shares the same data, the same Alert Score and the same console — so adding a capability never means adding another silo."
        actions={
          <>
            <Link to="/signup" className="btn-primary">
              Start Free Trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View Pricing
            </Link>
          </>
        }
      />
      <section className="section">
        <div className="container-page">
          <ProductCards />
        </div>
      </section>
      <PricingSection />
      <CTABanner />
    </>
  )
}
