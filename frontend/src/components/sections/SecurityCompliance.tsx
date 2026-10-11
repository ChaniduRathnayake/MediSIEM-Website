import { Link } from 'react-router-dom'
import { ArrowRight, CircleDashed, ShieldCheck } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { complianceItems, trustTopics } from '../../data/trust'

const HOME_TOPICS = ['security', 'data-protection', 'encryption', 'access-control', 'audit-logging', 'vulnerability-disclosure']

export function ComplianceList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {complianceItems.map((c) => {
        const aligned = c.status === 'aligned'
        return (
          <li key={c.name} className="card flex gap-3 p-4">
            {aligned ? (
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
            ) : (
              <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
            )}
            <div>
              <p className="text-sm font-semibold text-slate-50">
                {c.name}{' '}
                <span className={`ml-1 text-[11px] font-medium ${aligned ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {aligned ? 'Mapped' : 'Planned'}
                </span>
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{c.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default function SecurityCompliance() {
  const topics = trustTopics.filter((t) => HOME_TOPICS.includes(t.id))
  return (
    <section className="section border-y border-slate-800/70 bg-slate-900/25" aria-labelledby="trust-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Security & compliance"
          title={<span id="trust-heading">Security you can verify, from the platform up.</span>}
          lead="We hold ourselves to the standards we help you meet, and we’re transparent about exactly where we are."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => {
            const Icon = t.icon
            return (
              <Reveal key={t.id} delayMs={(i % 3) * 70} className="h-full">
                <div className="card h-full p-6">
                  <Icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-slate-50">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.summary}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">Frameworks &amp; standards</h3>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                MediSIEM maps its detections and reports to these frameworks to help you meet them. MediSIEM does not currently hold a
                third-party certification.
              </p>
            </div>
            <Link to="/trust" className="link-arrow shrink-0">
              Visit the Trust Center <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6">
            <ComplianceList />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
