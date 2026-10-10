// TODO placeholders rendered on this page — none are fabricated:
//   - Results metrics (Random Forest F1-Score, Cross-Dataset Accuracy, Alert
//     Ranking Accuracy vs CVSS, Isolation Forest ROC-AUC) render as "—" /
//     "Results pending". Fill in src/data/results.ts once real evaluation
//     numbers exist.
//   - Demo video: shows a "coming soon" placeholder until DEMO_VIDEO_ID is
//     set in src/data/media.ts (needs a recorded + uploaded YouTube video).
//   - Product screenshots: shows a "coming soon" placeholder until entries
//     are added to PRODUCT_SCREENSHOTS in src/data/media.ts (needs real
//     captures of the MediSIEM/Kibana dashboards).
// The CVSS-vs-CAAP comparison uses an illustrative scenario with precomputed
// scores (see src/data/comparisonScenario.ts), clearly labelled as such —
// not a claim about recorded production alerts.
import CASSpotlightSection from '../components/home/CASSpotlightSection'
import CTASection from '../components/home/CTASection'
import CVSSComparisonSection from '../components/home/CVSSComparisonSection'
import HeroSection from '../components/home/HeroSection'
import HighlightsStrip from '../components/home/HighlightsStrip'
import HowItWorksSection from '../components/home/HowItWorksSection'
import ProblemSection from '../components/home/ProblemSection'
import ResultsPreviewSection from '../components/home/ResultsPreviewSection'
import ScreenshotsSection from '../components/home/ScreenshotsSection'
import SolutionSection from '../components/home/SolutionSection'
import TeamPreviewSection from '../components/home/TeamPreviewSection'
import TechStackSection from '../components/home/TechStackSection'
import TimelinePreviewSection from '../components/home/TimelinePreviewSection'
import VideoSection from '../components/home/VideoSection'
import WhyItMattersSection from '../components/home/WhyItMattersSection'
import { usePageSeo } from '../hooks/usePageSeo'

export default function HomePage() {
  usePageSeo({
    title: 'MediSIEM | AI-Powered Healthcare Security Platform',
    description:
      'MediSIEM ranks hospital security alerts by clinical impact, not just technical severity, using the CAAP scoring engine — so SOC teams act on the threats that matter most to patient safety.',
    path: '/',
  })

  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <VideoSection />
      <HighlightsStrip />
      <WhyItMattersSection />
      <ProblemSection />
      <CVSSComparisonSection />
      <SolutionSection />
      <HowItWorksSection />
      <ScreenshotsSection />
      <CASSpotlightSection />
      <ResultsPreviewSection />
      <TechStackSection />
      <TimelinePreviewSection />
      <TeamPreviewSection />
      <CTASection />
    </div>
  )
}
