import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

interface RevealProps {
  className?: string
  /** Stagger delay in ms, for animating a row of cards in sequence. */
  delayMs?: number
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Fades + slides children in once they scroll into view. Plain
// IntersectionObserver + CSS transition — no animation library. Respects
// prefers-reduced-motion by starting out already visible.
export default function Reveal({ className = '', delayMs = 0, children }: PropsWithChildren<RevealProps>) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
