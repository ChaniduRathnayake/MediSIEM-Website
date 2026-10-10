import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { getSolution, solutions } from '../data/solutions'
import { getProduct } from '../data/products'
import { breadcrumbJsonLd, usePageSeo } from '../hooks/usePageSeo'
import { solutionMeta } from '../seo/pageMeta'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const solution = getSolution(slug)

  usePageSeo({
    ...(solution ? solutionMeta(solution) : { title: 'Solution not found | MediSIEM', description: 'This solution could not be found.' }),
    path: solution ? `/solutions/${solution.slug}` : undefined,
    noindex: !solution,
    jsonLd: solution
      ? breadcrumbJsonLd([
          { name: 'Solutions', path: '/solutions' },
          { name: solution.title, path: `/solutions/${solution.slug}` },
        ])
      : undefined,
  })

  if (!solution) return <NotFound />

  const productList = solution.products.map(getProduct).filter((p) => p !== undefined)
  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 4)

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Solutions', to: '/solutions' }, { label: solution.title }]}
        eyebrow={solution.title}
        title={solution.approach}
        lead={solution.challenge}
        actions={
          <>
            <Link to="/contact?intent=demo" className="btn-primary">
              Book a Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/platform" className="btn-secondary">
              Explore Platform
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">What you get</h2>
            <ul className="mt-6 space-y-3">
              {solution.benefits.map((b) => (
                <li key={b} className="card flex gap-3 p-5 text-[15px] text-slate-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={100}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">Powered by</h2>
            <ul className="mt-6 space-y-3">
              {productList.map((p) => {
                const Icon = p.icon
                return (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className="card-interactive flex items-start gap-4 p-5">
                      <span className="icon-tile">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-slate-50">{p.name}</span>
                        <span className="mt-1 block text-sm text-slate-400">{p.tagline}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-800/70 py-16">
        <div className="container-page">
          <h2 className="text-xl font-semibold text-slate-50">More solutions</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`} className="card-interactive flex h-full items-center justify-between gap-3 p-5">
                  <span className="text-sm font-medium text-slate-100">{s.title}</span>
                  <ArrowRight className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
