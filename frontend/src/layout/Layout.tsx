import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Scroll to the top on page change, or to the #hash target when present.
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Pages are lazy-loaded, so the target may not exist on the first frame.
    const id = decodeURIComponent(hash.slice(1))
    let frames = 0
    let raf = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (frames++ < 60) raf = requestAnimationFrame(tryScroll)
    }
    tryScroll()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])
}

function PageFallback() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />
      <span className="sr-only">Loading page</span>
    </div>
  )
}

export default function Layout() {
  useScrollRestoration()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Navbar />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
