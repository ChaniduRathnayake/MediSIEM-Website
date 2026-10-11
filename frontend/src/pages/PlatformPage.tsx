import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { CTABanner, PageHero, SectionHeader } from '../components/ui'
import Reveal from '../components/Reveal'
import ModulesSection from '../components/sections/ModulesSection'
import CasDemo from '../components/sections/CasDemo'
import ScenarioSection from '../components/sections/ScenarioSection'
import StandardsSection from '../components/sections/StandardsSection'
import DashboardShowcase from '../components/sections/DashboardShowcase'
import ScreenshotTabs from '../components/ScreenshotTabs'
import { getScreenshots } from '../data/screenshots'
import { TAGLINE } from '../data/research'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const COMPLIANCE = ['compliance-hipaa', 'compliance-gdpr', 'compliance-cis']

export default function PlatformPage() {
  usePageSeo({
    ...pageMeta['/platform'],
    path: '/platform',
  })

  return (
    <>
      <PageHero
        eyebrow="The MediSIEM platform"
        title="Clinically aware detection, prioritization and response."
        lead={`${TAGLINE} MediSIEM adds clinical context at every stage of the pipeline, on top of the Wazuh SIEM you already run.`}
        actions={
          <>
            <Link to="/contact?intent=pilot" className="btn-primary">
              Request a pilot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/research#paper" className="btn-secondary">
              <BookOpen className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Read the research paper
            </Link>
          </>
        }
      />

      <ModulesSection id="modules" />
      <CasDemo />
      <ScenarioSection />
      <StandardsSection />

      <DashboardShowcase />

      {getScreenshots(COMPLIANCE).length > 0 && (
        <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="compliance-heading">
          <div className="container-page">
            <SectionHeader
              eyebrow="Compliance views"
              title={<span id="compliance-heading">Framework mapping, per device.</span>}
              lead="The console maps alert activity to HIPAA and GDPR exposure, and shows CIS benchmark results from configuration scans. Mapping is a reporting aid, not a certification."
            />
            <Reveal className="mt-14">
              <ScreenshotTabs ids={COMPLIANCE} label="Compliance frameworks" />
            </Reveal>
          </div>
        </section>
      )}
      <CTABanner />
    </>
  )
}
