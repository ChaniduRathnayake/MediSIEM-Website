import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { products } from '../../data/products'

export function ProductCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {products.map((p, i) => {
        const Icon = p.icon
        return (
          <Reveal key={p.slug} delayMs={(i % 4) * 70} className="h-full">
            <article className="card-interactive group relative flex h-full flex-col p-6">
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-slate-50">
                <Link to={`/products/${p.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {p.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.summary}</p>
              <ul className="mt-5 flex-1 space-y-2 border-t border-slate-800 pt-5">
                {p.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex gap-2 text-[13px] text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
                <Link to={`/products/${p.slug}`} className="link-arrow">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link to={`/signup?product=${p.slug}`} className="text-[13px] font-medium text-slate-400 hover:text-slate-50">
                  Get Started
                </Link>
              </div>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}

export default function ProductsGrid() {
  return (
    <section className="section" id="products" aria-labelledby="products-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Products"
          title={<span id="products-heading">Everything your security operation needs. Nothing it doesn’t.</span>}
          lead="Start with the SIEM and threat prioritization, then add response, intelligence and compliance as you grow — all on one data platform."
        />
        <div className="mt-16">
          <ProductCards />
        </div>
      </div>
    </section>
  )
}
