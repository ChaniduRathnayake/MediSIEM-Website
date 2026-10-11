import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'

// Home is bundled eagerly for the fastest first paint; every other route is
// code-split and loaded on demand (Layout wraps the outlet in <Suspense>).
const PlatformPage = lazy(() => import('./pages/PlatformPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'))
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage'))
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const CustomersPage = lazy(() => import('./pages/CustomersPage'))
const Resources = lazy(() => import('./pages/Resources'))
const TrustCenterPage = lazy(() => import('./pages/TrustCenterPage'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const Contact = lazy(() => import('./pages/Contact'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const StatusPage = lazy(() => import('./pages/StatusPage'))
const LegalPage = lazy(() => import('./pages/LegalPage'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="platform" element={<PlatformPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="solutions/:slug" element={<SolutionDetailPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="industries/:slug" element={<IndustryDetailPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="case-studies" element={<CustomersPage caseStudies />} />
        <Route path="resources" element={<Resources />} />
        <Route path="documentation" element={<Resources focus="documentation" />} />
        <Route path="api" element={<Resources focus="api" />} />
        <Route path="blog" element={<Resources focus="blog" />} />
        <Route path="trust" element={<TrustCenterPage />} />
        <Route path="security" element={<TrustCenterPage securityFocus />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="privacy" element={<LegalPage doc="privacy" />} />
        <Route path="terms" element={<LegalPage doc="terms" />} />
        <Route path="cookies" element={<LegalPage doc="cookies" />} />
        <Route path="dpa" element={<LegalPage doc="dpa" />} />
        <Route path="roadmap" element={<Roadmap />} />

        {/* Legacy routes from the previous site structure */}
        <Route path="engagement" element={<Navigate to="/pricing" replace />} />
        <Route path="technology" element={<Navigate to="/platform" replace />} />
        <Route path="results" element={<Navigate to="/customers" replace />} />
        <Route path="industries/healthcare" element={<Navigate to="/industries/hospitals" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
