import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Check, ExternalLink } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'
import { getIndustry, industries } from '../data/industries'
import { statistics } from '../data/statistics'
import { breadcrumbJsonLd, usePageSeo } from '../hooks/usePageSeo'
import { industryMeta } from '../seo/pageMeta'

export default function IndustryDetailPage() {
  const { slug } = useParams()
  const industry = getIndustry(slug)

  usePageSeo({
    ...(industry ? industryMeta(industry) : { title: 'Page not found | MediSIEM', description: 'This care setting page could not be found.' }),
    path: industry ? `/industries/${industry.slug}` : undefined,
    noindex: !industry,
    jsonLd: industry
      ? breadcrumbJsonLd([
          { name: 'Healthcare', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])
      : undefined,
  })

  if (!industry) return <NotFound />

  const others = industries.filter((i) => i.slug !== industry.slug)
  // The cited statistics are healthcare-wide, so they apply to every care setting.
  const stats = statistics

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Healthcare', to: '/industries' }, { label: industry.name }]}
        eyebrow={`MediSIEM for ${industry.name}`}
        title={industry.headline}
        lead={industry.description}
        actions={
          <>
            <Link to="/contact?intent=demo" className="btn-primary">
              Book a Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact?intent=expert" className="btn-secondary">
              Talk to a Security Expert
            </Link>
          </>
        }
      />

      {stats.length > 0 && (
        <section className="border-b border-slate-800/70 py-14" aria-label="Healthcare statistics">
          <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.id}>
                <p className="text-3xl font-semibold tracking-tight text-slate-50">{s.value}</p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
                <a
                  href={s.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 underline decoration-slate-700 underline-offset-2 hover:text-cyan-300"
                >
                  {s.source}, {s.year} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <Reveal>
            <h2 className="text-xl font-semibold text-slate-50">Top risks we see</h2>
            <ul className="mt-5 space-y-3">
              {industry.risks.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] text-slate-300">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="text-xl font-semibold text-slate-50">How MediSIEM helps</h2>
            <ul className="mt-5 space-y-3">
              {industry.value.map((v) => (
                <li key={v} className="flex gap-3 text-[15px] text-slate-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={160}>
            <h2 className="text-xl font-semibold text-slate-50">Relevant frameworks</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {industry.frameworks.map((f) => (
                <li key={f} className="chip">
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              MediSIEM helps you produce evidence for these frameworks; it doesn’t certify your organization against them.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-800/70 py-16">
        <div className="container-page">
          <h2 className="text-xl font-semibold text-slate-50">Other care settings</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/industries/${o.slug}`} className="chip px-4 py-2 text-[13px] hover:border-cyan-400/40 hover:text-slate-50">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner title={`Protect what matters most in ${industry.name.toLowerCase()}.`} />
    </>
  )
}
