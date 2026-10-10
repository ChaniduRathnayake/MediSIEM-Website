import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero, SectionHeader } from '../components/ui'
import Reveal from '../components/Reveal'
import CASCalculator from '../components/CASCalculator'
import { PlatformDiagram } from '../components/sections/SolutionSection'
import DashboardShowcase from '../components/sections/DashboardShowcase'
import HowItWorks from '../components/sections/HowItWorks'
import FeaturesGrid from '../components/sections/FeaturesGrid'
import InteractiveDemo from '../components/sections/InteractiveDemo'
import { ScorePill, TierBadge } from '../components/visuals/charts'
import { comparisonAlerts } from '../data/comparisonScenario'
import { getCASAction } from '../utils/casAction'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'
import ScreenshotTabs from '../components/ScreenshotTabs'
import { getScreenshots } from '../data/screenshots'

const COMPLIANCE = ['compliance-hipaa', 'compliance-gdpr', 'compliance-cis']

export default function PlatformPage() {
  usePageSeo({
    ...pageMeta['/platform'],
    path: '/platform',
  })

  const byCvss = [...comparisonAlerts].sort((a, b) => b.cvss - a.cvss)
  const byCas = [...comparisonAlerts].sort((a, b) => b.cas - a.cas)

  return (
    <>
      <PageHero
        eyebrow="The MediSIEM platform"
        title="One platform. Every signal. Ranked by what’s at stake."
        lead="MediSIEM combines a modern SIEM with the CAAP prioritization engine, threat intelligence and guided response — so your team always knows what to do next."
        actions={
          <>
            <Link to="/contact?intent=demo" className="btn-primary">
              Book a Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/products" className="btn-secondary">
              View products
            </Link>
          </>
        }
      >
        <Reveal className="mt-14">
          <PlatformDiagram />
        </Reveal>
      </PageHero>

      <HowItWorks />

      <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="ranking-heading">
        <div className="container-page">
          <SectionHeader
            eyebrow="Why impact-aware scoring"
            title={<span id="ranking-heading">Same night shift. Two very different rankings.</span>}
            lead="Severity scores rate a vulnerability in isolation. The Alert Score also asks what the affected system does — and how urgent that is right now."
          />
          <Reveal className="mt-14 grid gap-4 lg:grid-cols-2">
            {[
              { title: 'Ranked by CVSS severity', list: byCvss, metric: 'cvss' as const },
              { title: 'Ranked by MediSIEM Alert Score', list: byCas, metric: 'cas' as const },
            ].map((col) => (
              <div key={col.title} className={`card p-6 ${col.metric === 'cas' ? 'border-cyan-400/40' : ''}`}>
                <h3 className={`text-sm font-semibold ${col.metric === 'cas' ? 'text-cyan-300' : 'text-slate-300'}`}>{col.title}</h3>
                <ol className="mt-4 space-y-2.5">
                  {col.list.map((a, i) => (
                    <li key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <span className="w-5 font-mono text-xs text-slate-500">#{i + 1}</span>
                      <ScorePill score={col.metric === 'cas' ? a.cas : a.cvss} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-100">{a.title}</p>
                        <p className="truncate text-xs text-slate-500">{a.device}</p>
                      </div>
                      {col.metric === 'cas' && <TierBadge tier={getCASAction(a.cas).label} />}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </Reveal>
          <p className="mt-4 text-center text-xs text-slate-500">Illustrative scenario. Alert Scores computed with the documented CAAP formula.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="calculator-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <SectionHeader
            align="left"
            eyebrow="Transparent by design"
            title={<span id="calculator-heading">Try the Alert Score yourself.</span>}
            lead="Five weighted factors, one 0–10 score, three clear actions. No black box: adjust each factor and watch the recommendation change."
          />
          <Reveal>
            <CASCalculator />
          </Reveal>
        </div>
      </section>

      <DashboardShowcase />

      {getScreenshots(COMPLIANCE).length > 0 && (
        <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="compliance-heading">
          <div className="container-page">
            <SectionHeader
              eyebrow="Compliance, per device"
              title={<span id="compliance-heading">Audit evidence that stays current.</span>}
              lead="HIPAA and GDPR exposure mapped from alert activity, and CIS benchmark results from real configuration scans. Every view exports to CSV or PDF."
            />
            <Reveal className="mt-14">
              <ScreenshotTabs ids={COMPLIANCE} label="Compliance frameworks" />
            </Reveal>
          </div>
        </section>
      )}
      <InteractiveDemo />
      <FeaturesGrid />
      <CTABanner />
    </>
  )
}
