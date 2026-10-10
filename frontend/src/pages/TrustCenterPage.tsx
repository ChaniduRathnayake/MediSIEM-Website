import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { ComplianceList } from '../components/sections/SecurityCompliance'
import ScreenshotTabs from '../components/ScreenshotTabs'
import { trustTopics } from '../data/trust'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

export default function TrustCenterPage({ securityFocus = false }: { securityFocus?: boolean }) {
  usePageSeo({
    ...pageMeta[securityFocus ? '/security' : '/trust'],
    path: securityFocus ? '/security' : '/trust',
  })

  return (
    <>
      <PageHero
        eyebrow={securityFocus ? 'Security' : 'Trust Center'}
        title="Transparency is part of the product."
        lead="Everything you need to evaluate MediSIEM as a vendor: how the platform is secured, how your data is handled, and exactly where we stand on compliance."
        actions={
          <>
            <Link to="/contact?intent=security" className="btn-primary">
              Contact security team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/status" className="btn-secondary">
              System status
            </Link>
          </>
        }
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[220px_1fr] lg:py-24">
        <nav aria-label="Trust Center sections" className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 border-l border-slate-800">
            {trustTopics.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-slate-400 hover:border-cyan-400 hover:text-slate-50">
                  {t.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#compliance" className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-slate-400 hover:border-cyan-400 hover:text-slate-50">
                Compliance status
              </a>
            </li>
          </ul>
        </nav>

        <div className="space-y-6">
          {trustTopics.map((t) => {
            const Icon = t.icon
            return (
              <Reveal key={t.id}>
                <section id={t.id} className="card scroll-mt-28 p-7 sm:p-8" aria-labelledby={`${t.id}-h`}>
                  <div className="flex items-start gap-4">
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 id={`${t.id}-h`} className="text-xl font-semibold tracking-tight text-slate-50">
                        {t.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">{t.summary}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-slate-800 pt-6">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {t.id === 'access-control' && (
                    <ScreenshotTabs ids={['analyst-workspace']} label="Access control" className="mt-7" />
                  )}
                  {t.id === 'vulnerability-disclosure' && (
                    <Link to="/contact?intent=security" className="link-arrow mt-6">
                      Report a vulnerability <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                  {t.id === 'privacy' && (
                    <Link to="/privacy" className="link-arrow mt-6">
                      Read the Privacy Policy <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </section>
              </Reveal>
            )
          })}

          <section id="compliance" className="scroll-mt-28 pt-10" aria-labelledby="compliance-h">
            <h2 id="compliance-h" className="section-title">
              Compliance status
            </h2>
            <p className="lead mt-4 max-w-2xl">
              MediSIEM maps its detections and reporting to these frameworks so you can use it as evidence for your own programs.{' '}
              <strong className="font-semibold text-slate-200">MediSIEM does not currently hold a third-party certification or attestation.</strong>{' '}
              We’ll update this page — with the report available on request — when that changes.
            </p>
            <div className="mt-8">
              <ComplianceList />
            </div>
          </section>
        </div>
      </div>

      <CTABanner
        title="Running a vendor security review?"
        lead="Our team can walk you through architecture, data handling and our security questionnaire responses."
        primary={{ label: 'Contact security team', to: '/contact?intent=security' }}
        secondary={{ label: 'Talk to Sales', to: '/contact?intent=sales' }}
      />
    </>
  )
}
