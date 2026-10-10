import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { workflowSteps } from '../../data/marketing'

export default function HowItWorks() {
  return (
    <section className="section" aria-labelledby="how-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="How it works"
          title={<span id="how-heading">From raw telemetry to resolved incident in four steps.</span>}
        />

        <div className="relative mt-16">
          {/* Connecting rail behind the step markers (desktop) */}
          <div className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block" aria-hidden="true">
            <svg className="h-px w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 1">
              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#1E334A" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="#00D9FF"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeDasharray="4 16"
                vectorEffect="non-scaling-stroke"
                className="animate-dash"
              />
            </svg>
          </div>

          <ol className="grid gap-4 lg:grid-cols-4 lg:gap-0">
          {workflowSteps.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.title} className="relative lg:px-3">
                <Reveal delayMs={i * 110} className="flex h-full gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-slate-950 text-cyan-400 shadow-[0_0_30px_-8px_rgb(0_217_255/0.5)]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="card flex-1 p-5 lg:mt-6 lg:w-full">
                    <p className="font-mono text-[11px] tracking-widest text-cyan-400">STEP {s.step}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-50">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
                    <p className="mt-4 border-t border-slate-800 pt-3 font-mono text-[11px] text-slate-500">{s.detail}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </section>
  )
}
