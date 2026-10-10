import { Link } from 'react-router-dom'
import { ArrowRight, Cloud, FileText, Plug, Sparkles } from 'lucide-react'
import DashboardPreview from './DashboardPreview'
import Reveal from '../Reveal'

const TRUST_INDICATORS = [
  { icon: Sparkles, label: 'AI-Powered' },
  { icon: Plug, label: 'API-First' },
  { icon: Cloud, label: 'Cloud-Native' },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950" />
        <div className="absolute left-1/2 top-[-60px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-300 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            AI-Powered Healthcare Security Platform
          </span>
        </Reveal>

        <Reveal delayMs={100}>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              Clinically Aware
            </span>{' '}
            Alert Prioritization for Smart Hospitals
          </h1>
        </Reveal>

        <Reveal delayMs={200}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
            Ranking security alerts by patient impact, not just technical severity. CAAP combines machine
            learning with clinical context so hospital SOC teams act on the threats that matter most to
            patient safety.
          </p>
        </Reveal>

        <Reveal delayMs={300}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/technology"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:bg-cyan-300 hover:shadow-cyan-400/30"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-900"
            >
              <FileText className="h-4 w-4" />
              Book a Demo
            </Link>
          </div>
        </Reveal>

        <Reveal delayMs={350} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_INDICATORS.map((item) => {
            const Icon = item.icon
            return (
              <span key={item.label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Icon className="h-3.5 w-3.5 text-slate-600" />
                {item.label}
              </span>
            )
          })}
        </Reveal>

        <Reveal delayMs={400} className="mt-14">
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  )
}
