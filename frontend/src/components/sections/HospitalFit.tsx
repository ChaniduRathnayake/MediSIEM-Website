import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { hospitalFit } from '../../data/marketing'

export default function HospitalFit() {
  return (
    <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="hospital-fit-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Safety-as-a-Service"
          title={<span id="hospital-fit-heading">Built for hospitals that can’t afford enterprise SOC tooling.</span>}
          lead="Big hospital groups buy enterprise SIEMs and staff a 24/7 SOC. Most hospitals can’t. MediSIEM gives them the same protection as a service, with patient safety built into every decision."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {hospitalFit.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delayMs={(i % 2) * 80} className="h-full">
                <article className="card flex h-full gap-5 p-6 sm:p-7">
                  <span className="icon-tile shrink-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">{item.label}</p>
                    <h3 className="mt-2 text-base font-semibold text-slate-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/pricing" className="btn-primary btn-sm">
            See pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/industries/healthcare" className="btn-secondary btn-sm">
            MediSIEM for hospitals
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
