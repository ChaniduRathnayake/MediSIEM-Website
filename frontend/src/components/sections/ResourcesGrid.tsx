import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { resourceTypes, type ResourceTypeId } from '../../data/resources'

const ROUTE_FOR: Partial<Record<ResourceTypeId, string>> = {
  documentation: '/documentation',
  api: '/api',
  blog: '/blog',
  'case-studies': '/case-studies',
}

export function ResourceCards({ highlight }: { highlight?: ResourceTypeId }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resourceTypes.map((r, i) => {
        const Icon = r.icon
        const href = r.status === 'available' ? `/resources#library` : (ROUTE_FOR[r.id] ?? `/contact?intent=resource&topic=${r.id}`)
        const isHighlight = highlight === r.id
        return (
          <Reveal key={r.id} delayMs={(i % 3) * 60} className="h-full">
            <Link
              to={href}
              className={`card-interactive group flex h-full items-start gap-4 p-5 ${isHighlight ? 'border-cyan-400/50' : ''}`}
            >
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-slate-50">{r.title}</span>
                  {r.status === 'soon' && <span className="font-mono text-[10px] tracking-wide text-slate-500 uppercase">Coming soon</span>}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-400">{r.description}</span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-600 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-cyan-300" aria-hidden="true" />
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

export default function ResourcesGrid() {
  return (
    <section className="section border-t border-slate-800/70" aria-labelledby="resources-heading">
      <div className="container-page">
        <SectionHeader
          align="left"
          eyebrow="Resources"
          title={<span id="resources-heading">Go deeper.</span>}
          lead="Research, guides and documentation for hospital security leaders and the engineers who run their platforms."
          actions={
            <Link to="/resources" className="link-arrow">
              Browse all resources <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="mt-12">
          <ResourceCards />
        </div>
      </div>
    </section>
  )
}
