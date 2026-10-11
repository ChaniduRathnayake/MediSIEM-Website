import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import DocumentList from '../components/DocumentList'
import { ResourceCards } from '../components/sections/ResourcesGrid'
import { resourceTypes, type ResourceTypeId } from '../data/resources'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta, type StaticPath } from '../seo/pageMeta'

const FOCUS_COPY: Partial<Record<ResourceTypeId, { title: string; lead: string; path: StaticPath }>> = {
  documentation: {
    title: 'Documentation',
    lead: 'Deployment, configuration and administration guides for MediSIEM. Full public documentation launches with general availability; early-access partners receive it during onboarding.',
    path: '/documentation',
  },
  api: {
    title: 'API documentation',
    lead: 'Programmatic access to alert scores, enrichment and cases. The API reference is shared with early-access partners during onboarding and will be published at general availability.',
    path: '/api',
  },
  blog: {
    title: 'Blog',
    lead: 'Product news, threat analysis and engineering notes from the MediSIEM team. Our first posts are on the way.',
    path: '/blog',
  },
}

export default function Resources({ focus }: { focus?: ResourceTypeId }) {
  const focused = focus ? FOCUS_COPY[focus] : undefined
  const focusType = resourceTypes.find((r) => r.id === focus)

  const seoPath = focused?.path ?? '/resources'
  usePageSeo({ ...pageMeta[seoPath], path: seoPath })

  return (
    <>
      <PageHero
        breadcrumb={focused ? [{ label: 'Resources', to: '/resources' }, { label: focused.title }] : undefined}
        eyebrow="Resources"
        title={focused?.title ?? 'Learn how impact-aware security works.'}
        lead={focused?.lead ?? 'Research, product collateral and guides for hospital security leaders and the engineers who run their platforms.'}
        actions={
          focused && focusType?.status === 'soon' ? (
            <Link to={`/contact?intent=resource&topic=${focus}`} className="btn-primary">
              Request early access <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : undefined
        }
      />

      <section className="section">
        <div className="container-page">
          <ResourceCards highlight={focus} />
        </div>
      </section>

      <section id="library" className="section border-t border-slate-800/70 bg-slate-900/25" aria-labelledby="library-heading">
        <div className="container-page">
          <h2 id="library-heading" className="section-title">
            Library
          </h2>
          <p className="lead mt-4 max-w-2xl">Product overviews, technical whitepapers and briefs.</p>
          <div id="research" className="mt-10">
            <DocumentList emptyLabel="No resources published yet." />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
