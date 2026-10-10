import SolutionSection from './SolutionSection'
import ProductsGrid from './ProductsGrid'
import FeaturesGrid from './FeaturesGrid'
import DashboardShowcase from './DashboardShowcase'
import HowItWorks from './HowItWorks'
import InteractiveDemo from './InteractiveDemo'
import UseCasesGrid from './UseCasesGrid'
import IndustriesSpotlight from './IndustriesGrid'
import IntegrationsShowcase from './IntegrationsShowcase'
import SecurityCompliance from './SecurityCompliance'
import CustomerResults from './CustomerResults'
import PricingSection from './PricingSection'
import ResourcesGrid from './ResourcesGrid'
import { CTABanner } from '../ui'

// Everything on the home page below the first couple of screens. HomePage
// lazy-loads this as one chunk so the hero paints without waiting for the
// demo, dashboards and charts to download and parse.
export default function HomeBelowFold() {
  return (
    <>
      <SolutionSection />
      {/* The hero already shows the alert queue */}
      <DashboardShowcase skip={['alert-queue']} />
      <ProductsGrid />
      <FeaturesGrid />
      <HowItWorks />
      <InteractiveDemo />
      <UseCasesGrid />
      <IndustriesSpotlight />
      <IntegrationsShowcase />
      <SecurityCompliance />
      <CustomerResults />
      <PricingSection />
      <ResourcesGrid />
      <CTABanner
        title="Know which alert puts a patient at risk, before it becomes an incident."
        lead="Book a 30-minute demo with a security engineer, or get a setup quote for your hospital."
        secondary={{ label: 'Get a setup quote', to: '/contact?intent=quote' }}
      />
    </>
  )
}
