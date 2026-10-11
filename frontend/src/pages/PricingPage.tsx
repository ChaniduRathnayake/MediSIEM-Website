import { PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import { EngagementCards } from '../components/sections/EngagementSection'
import LeadForm from '../components/LeadForm'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

// Engagement model. MediSIEM publishes no prices while it is a research-stage
// product: every option is "Contact us". Served at /pricing (and /engagement).
export default function PricingPage() {
  usePageSeo({
    ...pageMeta['/pricing'],
    path: '/pricing',
  })

  return (
    <>
      <PageHero
        eyebrow="Engagement model"
        title="Start with a conversation, not a price list."
        lead="MediSIEM is a research-stage product. Choose how you would like to work with us, and we will scope it around your network, your devices and what you need validated."
      />
      <section className="section" aria-label="Engagement options">
        <div className="container-page">
          <EngagementCards />
        </div>
      </section>

      <section id="request" className="section scroll-mt-20 border-t border-slate-800/70 bg-slate-900/25" aria-labelledby="request-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Pilot request</p>
            <h2 id="request-heading" className="section-title mt-4">
              Request a pilot.
            </h2>
            <p className="lead mt-5">
              Tell us about your hospital and its connected devices. A pilot starts by building the device registry with life-sustaining
              designations and connecting to your Wazuh pipeline.
            </p>
            <p className="mt-4 text-sm text-slate-500">[PLACEHOLDER: pilot duration, scope and success criteria]</p>
          </Reveal>
          <div className="card p-6 sm:p-10">
            <LeadForm intent="pilot" submitLabel="Request a pilot" />
          </div>
        </div>
      </section>
    </>
  )
}
