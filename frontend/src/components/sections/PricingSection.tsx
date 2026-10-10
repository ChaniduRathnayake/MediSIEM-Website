import { Link } from 'react-router-dom'
import { ArrowRight, Check, Minus } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { trackEvent } from '../../utils/analytics'
import { comparisonRows, formatPrice, plans, revenueModel, type PricingPlan } from '../../data/pricing'

function Price({ plan }: { plan: PricingPlan }) {
  if (plan.monthlyPrice === null) {
    return <p className="text-4xl font-semibold tracking-tight text-slate-50">Custom</p>
  }
  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-4xl font-semibold tracking-tight text-slate-50 tabular-nums">{formatPrice(plan.monthlyPrice)}</span>
      <span className="text-sm text-slate-500">/ month</span>
    </p>
  )
}

/** The two-part Safety-as-a-Service model: one-time setup + monthly subscription. */
export function RevenueModel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {revenueModel.map((part, i) => (
        <Reveal key={part.id} delayMs={i * 80} className="h-full">
          <article className="card flex h-full flex-col p-6 sm:p-7" aria-labelledby={`model-${part.id}`}>
            <span
              className={`self-start rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase ${
                part.id === 'setup' ? 'border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
              }`}
            >
              {part.badge}
            </span>
            <h3 id={`model-${part.id}`} className="mt-4 text-lg font-semibold text-slate-50">
              {part.title}
            </h3>
            <p className="mt-1 text-xl font-semibold tracking-tight text-cyan-300 tabular-nums">{part.price}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{part.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export function PricingCards() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delayMs={i * 80} className="h-full">
            <article
              className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                plan.featured ? 'border-cyan-400/50 bg-card shadow-[0_0_0_1px_rgb(0_217_255/0.15),0_30px_60px_-30px_rgb(0_217_255/0.35)]' : 'border-slate-800 bg-card'
              }`}
              aria-labelledby={`plan-${plan.id}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-semibold text-slate-950">Recommended</span>
              )}
              <h3 id={`plan-${plan.id}`} className="text-lg font-semibold text-slate-50">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{plan.audience}</p>
              <div className="mt-6">
                <Price plan={plan} />
                <p className="mt-1 text-xs text-slate-500">{plan.unit}</p>
              </div>
              <Link to={plan.cta.to} onClick={() => trackEvent('Pricing CTA', { plan: plan.id })} className={`mt-7 ${plan.featured || plan.monthlyPrice === null ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-7 text-sm font-medium text-slate-200">{plan.description}</p>
              <ul className="mt-4 space-y-2.5">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        All plans add a one-time setup fee for hospital-specific IoMT integration, quoted after a site survey. Prices in Sri Lankan rupees (LKR).
      </p>
    </>
  )
}

export function ComparisonTable() {
  const groups = [...new Set(comparisonRows.map((r) => r.group))]
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">Feature comparison across Essential, Clinical and Healthcare Cluster plans</caption>
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60">
            <th scope="col" className="sticky left-0 bg-slate-950 px-5 py-4 font-medium text-slate-400">
              Feature
            </th>
            {plans.map((p) => (
              <th key={p.id} scope="col" className={`px-5 py-4 text-center font-semibold ${p.featured ? 'text-cyan-300' : 'text-slate-50'}`}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => (
            <GroupRows key={g} group={g} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GroupRows({ group }: { group: string }) {
  return (
    <>
      <tr className="bg-card">
        <th colSpan={4} scope="colgroup" className="px-5 pt-6 pb-2 font-mono text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">
          {group}
        </th>
      </tr>
      {comparisonRows
        .filter((r) => r.group === group)
        .map((r) => (
          <tr key={r.feature} className="border-t border-slate-800/70 bg-card">
            <th scope="row" className="sticky left-0 bg-card px-5 py-3 font-normal text-slate-300">
              {r.feature}
            </th>
            {plans.map((p) => {
              const v = r.values[p.id]
              return (
                <td key={p.id} className="px-5 py-3 text-center">
                  {v === true ? (
                    <Check className="mx-auto h-4 w-4 text-cyan-400" aria-label="Included" />
                  ) : v === false ? (
                    <Minus className="mx-auto h-4 w-4 text-slate-600" aria-label="Not included" />
                  ) : (
                    <span className="text-slate-200">{v}</span>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
    </>
  )
}

export default function PricingSection() {
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Safety-as-a-Service"
          title={<span id="pricing-heading">Enterprise-grade protection, priced for hospitals.</span>}
          lead="A one-time setup for your hospital, then one flat monthly subscription, at a fraction of the cost of enterprise SOC tooling."
        />
        <div className="mt-12">
          <RevenueModel />
        </div>
        <div className="mt-10">
          <PricingCards />
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/pricing" className="link-arrow">
            Compare all features <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
