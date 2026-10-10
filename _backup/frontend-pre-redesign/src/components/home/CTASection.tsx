import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import Reveal from '../Reveal'

export default function CTASection() {
  return (
    <section className="bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:36px_36px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to see MediSIEM in action?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-slate-400 sm:text-base">
                Talk to the team building MediSIEM, or explore the technical resources behind it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300"
                >
                  <Mail className="h-4 w-4" />
                  Book a Demo
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-900"
                >
                  Explore Resources
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
