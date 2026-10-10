import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader, StatusChip } from '../ui'
import { availableIntegrations, roadmapIntegrations, type Integration } from '../../data/integrations'

/** Text wordmark tile — we deliberately don't reproduce third-party logos. */
export function IntegrationTile({ integration, showDescription = false }: { integration: Integration; showDescription?: boolean }) {
  const available = integration.status === 'available'
  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-4 transition-colors ${
        available ? 'border-slate-700/80 bg-card hover:border-cyan-400/40' : 'border-dashed border-slate-800 bg-transparent'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1.5">
        <span className={`text-[15px] font-semibold tracking-tight ${available ? 'text-slate-50' : 'text-slate-400'}`}>{integration.name}</span>
        <StatusChip tone={available ? 'available' : 'roadmap'}>{available ? 'Available' : 'Roadmap'}</StatusChip>
      </div>
      <p className="mt-1 font-mono text-[10px] tracking-wide text-slate-500 uppercase">{integration.category}</p>
      {showDescription && <p className="mt-3 text-[13px] leading-relaxed text-slate-400">{integration.description}</p>}
    </div>
  )
}

export default function IntegrationsShowcase() {
  return (
    <section className="section" aria-labelledby="integrations-heading">
      <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            align="left"
            eyebrow="Integrations"
            title={<span id="integrations-heading">Works with the stack you already run.</span>}
            lead="MediSIEM is built on open, widely deployed security technology and exposes a REST API. Native connectors for major cloud, network and ITSM platforms are on our roadmap — tell us which you need first."
            actions={
              <>
                <Link to="/integrations" className="btn-primary">
                  Explore all integrations <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/contact?intent=integration" className="btn-secondary">
                  Request an integration
                </Link>
              </>
            }
          />
        </div>

        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.16em] text-emerald-400 uppercase">Available today</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {availableIntegrations.map((i) => (
                <li key={i.name}>
                  <IntegrationTile integration={i} />
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10" delayMs={100}>
            <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">On the roadmap</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {roadmapIntegrations.map((i) => (
                <li key={i.name} className="rounded-lg border border-dashed border-slate-800 px-3 py-1.5 text-[13px] text-slate-400">
                  {i.name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
