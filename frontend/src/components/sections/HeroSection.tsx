import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react'
import { EcgLine, ResearchFootnote } from '../research'
import { STORY, TAGLINE, heroStats } from '../../data/research'

export default function HeroSection() {
  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16" aria-labelledby="hero-heading">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-cyan absolute -top-32 left-1/2 -z-10 h-[720px] w-[1100px] -translate-x-1/2" aria-hidden="true" />

      <div className="container-page pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
        <div className="animate-fade-up mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">{TAGLINE}</p>

          <h1 id="hero-heading" className="display-title mt-6 text-balance">
            Security that knows which device is <span className="text-cyan-400">keeping someone alive.</span>
          </h1>

          <p className="lead mx-auto mt-6 max-w-2xl text-pretty">
            MediSIEM brings clinical context to every stage of hospital IoMT security: detection that works on what a real sensor can
            see, alerts ranked by what they put at risk for the patient, and response that never disrupts a life-sustaining device
            without a clinician’s approval.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact?intent=pilot" className="btn-primary">
              Request a pilot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/research#paper" className="btn-secondary">
              <BookOpen className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Read the research paper
            </Link>
          </div>
        </div>

        <EcgLine className="mt-12 h-16 w-full sm:h-20" />

        {/* Opening story: the failure mode the product exists to prevent */}
        <figure className="animate-fade-up mx-auto mt-8 max-w-3xl rounded-2xl border border-slate-800 border-l-amber-400 bg-card/80 p-6 [animation-delay:120ms] sm:border-l-4 sm:p-7">
          <p className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] text-amber-400 uppercase">
            <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> 03:00, ICU
          </p>
          <blockquote className="mt-3 text-lg leading-relaxed text-pretty text-slate-100 sm:text-xl">{STORY}</blockquote>
        </figure>

        {/* Stat strip: research-prototype headline results */}
        <div className="mx-auto mt-12 max-w-5xl">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 lg:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="bg-card p-5 sm:p-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight text-slate-50 tabular-nums sm:text-3xl">{s.value}</span>
                  <span className="mt-1.5 block text-xs leading-snug text-slate-400 sm:text-[13px]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <ResearchFootnote className="mt-4 justify-center text-center" />
        </div>
      </div>
    </section>
  )
}
