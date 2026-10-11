import { CircleCheck, CircleDashed, TriangleAlert } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { monitoredModeNote, next, validated } from '../../data/research'

/** "What we have and haven't validated": stated plainly, on purpose. */
export default function ValidationSection() {
  return (
    <section id="validation" className="section" aria-labelledby="validation-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Honest status"
          title={<span id="validation-heading">What we have and haven’t validated.</span>}
          lead="A security tool for hospitals has to be judged on evidence. Here is exactly where ours stands."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card h-full p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
                <CircleCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" /> Validated
              </h3>
              <ul className="mt-5 space-y-4">
                {validated.map((v) => (
                  <li key={v} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delayMs={80} className="h-full">
            <div className="card h-full p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
                <CircleDashed className="h-5 w-5 text-slate-400" aria-hidden="true" /> Next
              </h3>
              <ul className="mt-5 space-y-4">
                {next.map((v) => (
                  <li key={v} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full border border-slate-400" aria-hidden="true" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-4">
          <p className="flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 text-[15px] leading-relaxed text-slate-200">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-slate-50">A note on Monitored Mode. </strong>
              {monitoredModeNote}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
