import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { ComparisonTable, PricingCards, RevenueModel } from '../components/sections/PricingSection'
import { pricingFaqs } from '../data/pricing'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function PricingPage() {
  usePageSeo({
    ...pageMeta['/pricing'],
    path: '/pricing',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pricingFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  })

  return (
    <>
      <PageHero
        eyebrow="Safety-as-a-Service"
        title="Enterprise-grade security, priced for hospitals."
        lead="Built for hospitals that can’t afford enterprise SOC tooling: a one-time setup fee for your hospital, then a flat monthly subscription that keeps the safety logic current."
      />
      <section className="section">
        <div className="container-page">
          <RevenueModel />
          <div className="mt-10">
            <PricingCards />
          </div>
        </div>
      </section>

      <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="compare-heading">
        <div className="container-page">
          <h2 id="compare-heading" className="section-title text-center">
            Compare plans
          </h2>
          <p className="mt-3 text-center text-xs text-slate-500 sm:hidden">Swipe the table sideways to compare all three plans.</p>
          <Reveal className="mt-12">
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="container-page max-w-3xl">
          <h2 id="faq-heading" className="section-title text-center">
            Frequently asked questions
          </h2>
          <div className="mt-12 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-card">
            {pricingFaqs.map((f) => (
              <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-slate-100">
                  {f.q}
                  <span className="text-xl leading-none text-cyan-400 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Get a setup quote for your hospital."
        lead="Tell us about your hospital and connected devices. We’ll scope the setup and recommend a plan, with no hard sell."
        primary={{ label: 'Get a setup quote', to: '/contact?intent=quote' }}
        secondary={{ label: 'Start a guided pilot', to: '/signup' }}
      />
    </>
  )
}
