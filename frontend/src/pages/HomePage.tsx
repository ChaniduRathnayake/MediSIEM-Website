import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/HeroSection'
import TrustBar from '../components/sections/TrustBar'
import ProblemSection from '../components/sections/ProblemSection'
import HospitalFit from '../components/sections/HospitalFit'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const HomeBelowFold = lazy(() => import('../components/sections/HomeBelowFold'))

export default function HomePage() {
  usePageSeo({ ...pageMeta['/'], path: '/' })

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <HospitalFit />
      {/* Reserves space so the footer doesn't jump up while the chunk loads. */}
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  )
}
