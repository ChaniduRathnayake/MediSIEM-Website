import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import { ProductCards } from '../components/sections/ProductsGrid'
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
        title="Three modules, one clinically aware pipeline."
        lead="MedShield detects, CAAP prioritizes and the response engine acts. All three share the same device registry and the same clinical criticality scores."
        actions={
          <>
            <Link to="/contact?intent=pilot" className="btn-primary">
              Request a pilot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/research#paper" className="btn-secondary">
              Read the research paper
            </Link>
          </>
        }
      />
      <section className="section">
        <div className="container-page">
          <ProductCards />
        </div>
      </section>
      <CTABanner />
    </>
  )
}
