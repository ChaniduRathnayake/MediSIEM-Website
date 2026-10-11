import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import CustomerResults from '../components/sections/CustomerResults'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const PARTNER_BENEFITS = [
  'Hands-on onboarding with our engineering team',
  'Direct input into the product roadmap',
  'A before-and-after measurement report for your leadership',
]

const PARTNER_FIT = [
  'A security or IT team handling daily alerts',
  'Willingness to share anonymized feedback and outcomes',
  'A test or production segment we can connect within weeks',
]

export default function CustomersPage({ caseStudies = false }: { caseStudies?: boolean }) {
  usePageSeo({
    ...pageMeta[caseStudies ? '/case-studies' : '/customers'],
    path: caseStudies ? '/case-studies' : '/customers',
  })

  return (
    <>
      <PageHero
        eyebrow={caseStudies ? 'Case studies' : 'Customers'}
        title="Proof you can verify."
        lead="We publish customer results only when they’re measured and approved by the customer. While we onboard our first design partners, here’s exactly what we measure and how you can be among the first."
        actions={
          <Link to="/contact?intent=partner" className="btn-primary">
            Become a design partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <CustomerResults />
      <section className="section border-t border-slate-800/70" aria-labelledby="partner-heading">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="card h-full p-8">
            <h2 id="partner-heading" className="text-2xl font-semibold tracking-tight text-slate-50">
              What design partners get
            </h2>
            <ul className="mt-6 space-y-3">
              {PARTNER_BENEFITS.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] text-slate-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={100} className="card h-full p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">Who it’s a fit for</h2>
            <ul className="mt-6 space-y-3">
              {PARTNER_FIT.map((b) => (
                <li key={b} className="flex gap-3 text-[15px] text-slate-200">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <CTABanner primary={{ label: 'Become a design partner', to: '/contact?intent=partner' }} />
    </>
  )
}
