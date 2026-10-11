import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { industries } from '../../data/industries'

export function IndustryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => {
        const Icon = ind.icon
        return (
          <Reveal key={ind.slug} delayMs={(i % 3) * 70} className="h-full">
            <Link to={`/industries/${ind.slug}`} className="card-interactive group flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                {ind.flagship && <span className="chip border-cyan-400/30 text-cyan-300">Flagship</span>}
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-50">{ind.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{ind.headline}</p>
              <span className="link-arrow mt-5">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

/** Home-page variant: tabbed spotlight that keeps the section compact. */
export default function IndustriesSpotlight() {
  const [active, setActive] = useState(industries[0].slug)
  const ind = industries.find((i) => i.slug === active) ?? industries[0]
  const Icon = ind.icon

  return (
    <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="industries-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Care settings"
          title={<span id="industries-heading">Built for every place care happens.</span>}
          lead="From public healthcare clusters to small private clinics, MediSIEM ranks every alert by what it puts at risk for patients, and adapts to how each care setting works."
        />

        <Reveal className="mt-14">
          <div role="tablist" aria-label="Care settings" className="flex gap-1.5 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
            {industries.map((i) => {
              const TabIcon = i.icon
              const selected = i.slug === active
              return (
                <button
                  key={i.slug}
                  role="tab"
                  id={`ind-tab-${i.slug}`}
                  aria-selected={selected}
                  aria-controls="ind-panel"
                  onClick={() => setActive(i.slug)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    selected
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                      : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <TabIcon className="h-4 w-4" aria-hidden="true" />
                  {i.name}
                </button>
              )
            })}
          </div>

          <div id="ind-panel" role="tabpanel" aria-labelledby={`ind-tab-${ind.slug}`} className="card mt-6 overflow-hidden">
            <div key={ind.slug} className="animate-fade-up grid lg:grid-cols-[1.2fr_1fr]">
              <div className="p-7 sm:p-10">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-balance text-slate-50 sm:text-3xl">{ind.headline}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{ind.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/industries/${ind.slug}`} className="btn-primary btn-sm">
                    MediSIEM for {ind.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link to="/industries" className="btn-secondary btn-sm">
                    All care settings
                  </Link>
                </div>
              </div>
              <div className="border-t border-slate-800 bg-slate-950/40 p-7 sm:p-10 lg:border-t-0 lg:border-l">
                <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">How we help</p>
                <ul className="mt-4 space-y-3">
                  {ind.value.map((v) => (
                    <li key={v} className="flex gap-2.5 text-sm text-slate-200">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                      {v}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">Top risks</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ind.risks.map((r) => (
                    <li key={r} className="chip">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
