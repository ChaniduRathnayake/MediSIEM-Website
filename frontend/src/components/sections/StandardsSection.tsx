import { BookMarked } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { standards } from '../../data/research'

export default function StandardsSection() {
  return (
    <section id="standards" className="section" aria-labelledby="standards-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Standards alignment"
          title={<span id="standards-heading">Built on published standards, not opinion.</span>}
          lead="Where a regulation or standard already answers a design question, MediSIEM uses it. These are design references: MediSIEM is not certified against them."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standards.map((s, i) => (
            <Reveal key={s.name} delayMs={(i % 3) * 60} className="h-full">
              <article className="card flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="icon-tile h-10 w-10">
                    <BookMarked className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="chip">{s.relation}</span>
                </div>
                <h3 className="mt-5 font-mono text-base font-semibold text-slate-50">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.use}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
