import { ExternalLink } from 'lucide-react'
import { statistics } from '../../data/statistics'
import Reveal from '../Reveal'

export default function WhyItMattersSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-900/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Why This Matters</h2>
          <p className="mt-3 text-slate-400">
            Healthcare is the most expensive and most targeted sector for cyberattacks, and the harm doesn't
            stay contained to IT.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, i) => (
            <Reveal key={stat.id} delayMs={i * 75}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <span className="text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</span>
                <p className="mt-2 flex-1 text-sm text-slate-400">{stat.label}</p>
                <a
                  href={stat.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-start gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                >
                  <ExternalLink className="mt-0.5 h-3 w-3 flex-shrink-0" />
                  <span>
                    {stat.source} ({stat.year})
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
