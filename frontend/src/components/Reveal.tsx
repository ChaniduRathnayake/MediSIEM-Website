import { useCallback, type PropsWithChildren } from 'react'

interface RevealProps {
  className?: string
  /** Stagger delay in ms, for animating a row of cards in sequence. */
  delayMs?: number
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Fades + slides children in once they scroll into view. Plain
// IntersectionObserver + CSS transition — no animation library.
//
// The observer is attached from a ref callback rather than an effect: on
// lazy-loaded routes React 19 can run a Suspense-resolved subtree's effects
// before its DOM is live, and an observer attached then never fires. A ref
// callback runs on the real attach (and re-attach), so it's reliable. The
// visible state is a DOM data attribute, so re-renders can't reset it.
export default function Reveal({ className = '', delayMs = 0, children }: PropsWithChildren<RevealProps>) {
  const attach = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      node.dataset.visible = 'true'
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={attach}
      className={`translate-y-6 opacity-0 transition-all duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
