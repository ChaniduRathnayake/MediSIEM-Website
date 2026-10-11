import ModulesSection from './ModulesSection'
import CasDemo from './CasDemo'
import ProofSection from './ProofSection'
import ValidationSection from './ValidationSection'
import FaqSection from './FaqSection'
import { CTABanner } from '../ui'

// Everything on the home page below the hero and problem. HomePage
// lazy-loads this as one chunk so the hero paints without waiting for it.
//
// The home page tells one story: problem, how it works, the demo, the
// evidence, its limits, questions, call to action. Use cases and standards
// live on /platform, the engagement model on /pricing and the team and paper
// on /research, so they are not repeated here.
export default function HomeBelowFold() {
  return (
    <>
      <ModulesSection />
      <CasDemo />
      <ProofSection />
      <ValidationSection />
      <FaqSection />
      <CTABanner />
    </>
  )
}
