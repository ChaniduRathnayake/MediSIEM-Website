import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { solutions } from '../../data/solutions'

export function UseCaseCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {solutions.map((s, i) => {
        const Icon = s.icon
        return (
          <Reveal key={s.slug} delayMs={(i % 4) * 70} className="h-full">
            <Link to={`/solutions/${s.slug}`} className="card-interactive group flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                <ArrowUpRight
                  className="h-4 w-4 text-slate-600 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-50">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.challenge}</p>
              <p className="mt-4 border-t border-slate-800 pt-4 text-[13px] leading-relaxed text-slate-300">{s.approach}</p>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

export default function UseCasesGrid() {
  return (
    <section className="section" aria-labelledby="usecases-heading">
      <div className="container-page">
        <SectionHeader
          align="left"
          eyebrow="Use cases"
          title={<span id="usecases-heading">Solve the problems your team faces every shift.</span>}
          actions={
            <Link to="/solutions" className="link-arrow">
              All solutions <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-14">
          <UseCaseCards />
        </div>
      </div>
    </section>
  )
}
