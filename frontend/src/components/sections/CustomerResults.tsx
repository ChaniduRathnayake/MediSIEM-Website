import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { outcomeMetrics, testimonials } from '../../data/customers'

// Renders real testimonials when they exist. Until then it shows the outcomes
// every early-access deployment is measured on, with values left as
// "Measuring" rather than invented, plus a design-partner CTA.
export default function CustomerResults() {
  const hasTestimonials = testimonials.length > 0

  return (
    <section className="section" aria-labelledby="results-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Customer results"
          title={<span id="results-heading">Measured on outcomes, not promises.</span>}
          lead={
            hasTestimonials
              ? 'Security teams use MediSIEM to spend less time triaging and more time stopping real threats.'
              : 'Every early-access deployment is measured against the same before-and-after outcomes. We publish results only once our partners have verified and approved them.'
          }
        />

        {hasTestimonials ? (
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delayMs={i * 80} className="h-full">
                <figure className="card flex h-full flex-col p-7">
                  <p className="text-3xl font-semibold tracking-tight text-cyan-400">{t.result}</p>
                  <Quote className="mt-6 h-5 w-5 text-slate-600" aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-200">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-slate-800 pt-4">
                    <p className="text-sm font-semibold text-slate-50">{t.name}</p>
                    <p className="text-xs text-slate-400">
                      {t.title}, {t.company}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="h-full">
              <dl className="grid h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 [gap:1px] sm:grid-cols-2">
                {outcomeMetrics.map((m) => (
                  <div key={m.id} className="bg-card p-6">
                    <dt className="text-sm font-medium text-slate-300">{m.label}</dt>
                    <dd className="mt-3">
                      {m.value ? (
                        <span className="text-4xl font-semibold tracking-tight text-slate-50">{m.value}</span>
                      ) : (
                        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-slate-500 uppercase">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" aria-hidden="true" />
                          Measuring in pilots
                        </span>
                      )}
                      <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{m.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delayMs={100} className="h-full">
              <div className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-card p-8">
                <div className="glow-cyan absolute -top-32 -right-32 -z-10 h-80 w-80" aria-hidden="true" />
                <p className="eyebrow">Design partner program</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-50">Shape the platform. Get results first.</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  Early-access partners get hands-on onboarding, direct access to our engineers, influence over the roadmap and preferred
                  pricing, in exchange for honest feedback and measured results.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Link to="/contact?intent=partner" className="btn-primary">
                    Become a design partner <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link to="/customers" className="btn-secondary">
                    Learn more
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}
