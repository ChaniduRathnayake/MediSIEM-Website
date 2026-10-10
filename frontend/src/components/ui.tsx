import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

/* Section header: eyebrow + H2 + lead, left or centered. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  as: Heading = 'h2',
  actions,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
  actions?: ReactNode
  className?: string
}) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className={`${Heading === 'h1' ? 'display-title' : 'section-title'} ${eyebrow ? 'mt-4' : ''} text-balance`}>{title}</Heading>
      {lead && <p className={`lead mt-5 text-pretty ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{lead}</p>}
      {actions && <div className={`mt-8 flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>{actions}</div>}
    </Reveal>
  )
}

/* Inner-page hero with breadcrumb, H1 and optional CTAs. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  breadcrumb,
  children,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  breadcrumb?: { label: string; to?: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-800/70">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-cyan absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2" aria-hidden="true" />
      <div className="container-page pt-14 pb-16 sm:pt-20 sm:pb-24">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              {breadcrumb.map((b, i) => (
                <li key={b.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {b.to ? (
                    <Link to={b.to} className="hover:text-slate-300">
                      {b.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-slate-300">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <SectionHeader as="h1" align="left" eyebrow={eyebrow} title={title} lead={lead} actions={actions} />
        {children}
      </div>
    </section>
  )
}

/* Closing conversion banner. */
export function CTABanner({
  title = 'See your own alerts, ranked by what matters.',
  lead = 'Book a 30-minute demo with a security engineer, or start a guided trial in your environment.',
  primary = { label: 'Book a Demo', to: '/contact?intent=demo' },
  secondary = { label: 'Talk to a Security Expert', to: '/contact?intent=expert' },
}: {
  title?: string
  lead?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}) {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-slate-800 bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
            <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
            <div className="glow-cyan absolute -bottom-48 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2" aria-hidden="true" />
            <div className="hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
            <h2 className="section-title mx-auto max-w-2xl text-balance">{title}</h2>
            <p className="lead mx-auto mt-5 max-w-xl">{lead}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to={primary.to} className="btn-primary">
                {primary.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to={secondary.to} className="btn-secondary">
                {secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Animated number that counts up once when scrolled into view. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', durationMs = 1400 }: { to: number; decimals?: number; prefix?: string; suffix?: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [animated, setValue] = useState(0)
  const value = reducedMotion ? to : animated

  useEffect(() => {
    const node = ref.current
    if (!node || reducedMotion) return
    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(to * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, durationMs, reducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

/* Small "status" chip used for availability labels. */
export function StatusChip({ tone, children }: { tone: 'available' | 'roadmap' | 'info'; children: ReactNode }) {
  const cls =
    tone === 'available'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      : tone === 'roadmap'
        ? 'border-slate-700 bg-slate-800/50 text-slate-400'
        : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cls}`}>{children}</span>
}
