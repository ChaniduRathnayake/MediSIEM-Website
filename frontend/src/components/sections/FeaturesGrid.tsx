import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { features } from '../../data/marketing'

export default function FeaturesGrid() {
  return (
    <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="features-heading">
      <div className="container-page">
        <SectionHeader
          align="left"
          eyebrow="Capabilities"
          title={<span id="features-heading">Built for outcomes, not checklists.</span>}
          lead="Every capability is measured by what it does for your hospital: less time wasted, less exposure, faster answers for clinical leadership and regulators."
        />

        {/* Hairline grid: cells share borders for a dense, engineered feel. */}
        <div className="mt-16 grid overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 [gap:1px] sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} delayMs={(i % 5) * 60} className="h-full">
                <div className="group h-full bg-card p-6 transition-colors duration-300 hover:bg-card-hover">
                  <Icon className="h-5 w-5 text-cyan-400 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
                  <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-slate-50">{f.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{f.value}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
