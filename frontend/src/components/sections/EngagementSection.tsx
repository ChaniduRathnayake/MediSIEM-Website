import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { engagements } from '../../data/research'
import { trackEvent } from '../../utils/analytics'

/** Three ways to work with MediSIEM. No published prices: every option is "Contact us". */
export function EngagementCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {engagements.map((e, i) => (
        <Reveal key={e.id} delayMs={i * 80} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-2xl border p-7 ${
              e.featured ? 'border-cyan-400/50 bg-card shadow-[0_0_0_1px_rgb(0_217_255/0.15),0_30px_60px_-30px_rgb(0_217_255/0.35)]' : 'border-slate-800 bg-card'
            }`}
            aria-labelledby={`engagement-${e.id}`}
          >
            {e.featured && <span className="absolute -top-3 left-7 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-semibold text-slate-950">Recommended first step</span>}
            <h3 id={`engagement-${e.id}`} className="text-xl font-semibold text-slate-50">
              {e.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.audience}</p>
            <p className="mt-6 text-3xl font-semibold tracking-tight text-slate-50">Contact us</p>
            <ul className="mt-6 flex-1 space-y-3 border-t border-slate-800 pt-6">
              {e.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to={`/contact?intent=${e.intent}`}
              onClick={() => trackEvent('Engagement CTA', { option: e.id })}
              className={`mt-8 ${e.featured ? 'btn-primary' : 'btn-secondary'}`}
            >
              {e.id === 'pilot' ? 'Request a pilot' : 'Contact us'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export default function EngagementSection() {
  return (
    <section id="engagement" className="section" aria-labelledby="engagement-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Engagement model"
          title={<span id="engagement-heading">Three ways to work with us.</span>}
          lead="MediSIEM is a research-stage product. Every engagement starts with a conversation about your network, your devices and what you need to see validated."
        />
        <div className="mt-14">
          <EngagementCards />
        </div>
      </div>
    </section>
  )
}
