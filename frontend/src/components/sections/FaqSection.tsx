import { SectionHeader } from '../ui'
import { faqs } from '../../data/research'

export default function FaqSection() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container-page max-w-3xl">
        <SectionHeader eyebrow="FAQ" title={<span id="faq-heading">Common questions.</span>} />
        <div className="mt-12 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-card">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-slate-100">
                {f.q}
                <span className="text-xl leading-none text-cyan-400 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
