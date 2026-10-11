import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABanner, PageHero, SectionHeader } from '../components/ui'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import ScreenshotTabs from '../components/ScreenshotTabs'
import { getScreenshots, productScreenshots } from '../data/screenshots'
import { getProduct, products } from '../data/products'
import { getSolution } from '../data/solutions'
import { breadcrumbJsonLd, usePageSeo } from '../hooks/usePageSeo'
import { productMeta } from '../seo/pageMeta'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProduct(slug)

  usePageSeo({
    ...(product ? productMeta(product) : { title: 'Product not found | MediSIEM', description: 'This product could not be found.' }),
    path: product ? `/products/${product.slug}` : undefined,
    noindex: !product,
    jsonLd: product
      ? breadcrumbJsonLd([
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])
      : undefined,
  })

  if (!product) return <NotFound />

  const related = product.relatedSolutions.map(getSolution).filter((s) => s !== undefined)
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3)
  const shotIds = productScreenshots[product.slug] ?? []

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Products', to: '/products' }, { label: product.shortName }]}
        eyebrow={product.name}
        title={product.tagline}
        lead={product.summary}
        actions={
          <>
            <Link to={`/contact?intent=pilot&product=${product.slug}`} className="btn-primary">
              Request a pilot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/research#paper" className="btn-secondary">
              Read the research paper
            </Link>
          </>
        }
      />

      {getScreenshots(shotIds).length > 0 && (
        <section className="pt-16 sm:pt-20" aria-label={`${product.name} in the console`}>
          <div className="container-page">
            <Reveal>
              <ScreenshotTabs key={product.slug} ids={shotIds} label={`${product.shortName} views`} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="capabilities-heading">
        <div className="container-page">
          <SectionHeader align="left" eyebrow="Capabilities" title={<span id="capabilities-heading">What {product.shortName} does</span>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {product.capabilities.map((c, i) => (
              <Reveal key={c.title} delayMs={(i % 2) * 80} className="h-full">
                <div className="card h-full p-7">
                  <p className="font-mono text-[11px] text-cyan-400">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-50">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="outcomes-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <SectionHeader align="left" eyebrow="Outcomes" title={<span id="outcomes-heading">Why teams choose it</span>} />
          <Reveal>
            <ul className="space-y-4">
              {product.outcomes.map((o) => (
                <li key={o} className="card flex gap-3 p-5 text-[15px] text-slate-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="related-heading">
        <div className="container-page">
          <h2 id="related-heading" className="text-xl font-semibold text-slate-50">
            Related solutions
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`} className="card-interactive flex h-full items-center justify-between gap-3 p-5">
                  <span className="text-sm font-medium text-slate-100">{s.title}</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-14 text-xl font-semibold text-slate-50">Explore other products</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="card-interactive block h-full p-5">
                  <span className="text-sm font-semibold text-slate-100">{p.name}</span>
                  <span className="mt-1 block text-[13px] text-slate-400">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner title={`See ${product.shortName} on your own data.`} />
    </>
  )
}
