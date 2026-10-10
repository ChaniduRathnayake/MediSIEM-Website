import { Link } from 'react-router-dom'
import { ArrowRight, Check, PlayCircle } from 'lucide-react'
import HeroDashboard from '../visuals/HeroDashboard'
import ProductScreenshot from '../ProductScreenshot'
import { getScreenshot } from '../../data/screenshots'
import { COMPANY } from '../../data/site'
import { heroTrustIndicators } from '../../data/marketing'

export default function HeroSection() {
  const hasScreenshot = Boolean(getScreenshot('hero'))
  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16">
      {/* Restrained backdrop: engineering grid + one soft cyan glow */}
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-cyan absolute -top-32 left-1/2 -z-10 h-[720px] w-[1100px] -translate-x-1/2" aria-hidden="true" />

      <div className="container-page pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        <div className="animate-fade-up mx-auto max-w-4xl text-center">
          <Link
            to="/contact?intent=partner"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 py-1 pr-3 pl-1 text-xs text-slate-300 transition-colors hover:border-cyan-400/40"
          >
            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-cyan-300 uppercase">
              New
            </span>
            {COMPANY.availability}
            <ArrowRight className="h-3 w-3 text-slate-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>

          <h1 className="display-title mt-7 text-balance">
            Stop chasing alerts. <span className="text-cyan-400 sm:block">Stop the threats that matter.</span>
          </h1>

          <p className="lead mx-auto mt-6 max-w-2xl text-pretty">
            MediSIEM is Safety-as-a-Service security for hospitals that can’t afford enterprise SOC tooling. It ranks every alert by
            the patient impact at stake, and asks a clinician before any response cuts off a life-critical device.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/signup" className="btn-primary">
              Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact?intent=demo" className="btn-secondary">
              <PlayCircle className="h-4 w-4 text-cyan-400" aria-hidden="true" /> Book a Demo
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2.5" aria-label="Platform highlights">
            {heroTrustIndicators.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[13px] text-slate-400">
                <Check className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product visual, full width so the real console stays legible */}
        <div className={`animate-fade-up relative mx-auto mt-16 [animation-delay:150ms] lg:mt-20 ${hasScreenshot ? '' : 'max-w-4xl'}`}>
          <div className="glow-cyan absolute inset-x-[10%] -top-16 -z-10 h-2/3" aria-hidden="true" />
          <div className="hairline absolute inset-x-[15%] top-0 z-10 h-px" aria-hidden="true" />
          {hasScreenshot ? <ProductScreenshot id="hero" priority /> : <HeroDashboard />}
        </div>
      </div>
    </section>
  )
}
