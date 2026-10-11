import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/HeroSection'
import ProblemSection from '../components/sections/ProblemSection'
import { faqJsonLd } from '../data/research'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const HomeBelowFold = lazy(() => import('../components/sections/HomeBelowFold'))

export default function HomePage() {
  usePageSeo({ ...pageMeta['/'], path: '/', jsonLd: faqJsonLd })

  return (
    <>
      <HeroSection />
      <ProblemSection />
      {/* Reserves space so the footer doesn't jump up while the chunk loads. */}
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  )
}
