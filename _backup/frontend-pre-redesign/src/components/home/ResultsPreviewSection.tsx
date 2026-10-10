import { Link } from 'react-router-dom'
import { ArrowRight, Gauge } from 'lucide-react'
import { resultMetrics } from '../../data/results'
import Reveal from '../Reveal'

export default function ResultsPreviewSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-900/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Key Results</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resultMetrics.map((metric, i) => (
            <Reveal key={metric.id} delayMs={i * 75}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                <Gauge className="h-5 w-5 text-slate-500" />
                {metric.value === null ? (
                  <>
                    <span className="mt-3 text-3xl font-extrabold text-slate-600" aria-hidden="true">
                      &mdash;
                    </span>
                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Results pending
                    </span>
                  </>
                ) : (
                  <span className="mt-3 text-3xl font-extrabold text-white">{metric.value}</span>
                )}
                <span className="mt-2 text-sm font-medium text-slate-300">{metric.label}</span>
                <span className="mt-1 text-xs text-slate-500">{metric.sublabel}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <Link
            to="/results"
            className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            See Full Results <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
