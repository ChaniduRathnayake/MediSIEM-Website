// Every route the build prerenders, with its metadata. Used only by
// scripts/prerender.mjs (not bundled into the app).
import { products } from '../data/products'
import { solutions } from '../data/solutions'
import { industries } from '../data/industries'
import { industryMeta, pageMeta, productMeta, solutionMeta, unlistedPaths, type PageMeta, type StaticPath } from './pageMeta'

export interface PrerenderRoute extends PageMeta {
  path: string
  /** Listed in sitemap.xml. */
  sitemap: boolean
}

export function prerenderRoutes(): PrerenderRoute[] {
  const staticRoutes = (Object.keys(pageMeta) as StaticPath[]).map((path) => ({
    path,
    ...pageMeta[path],
    sitemap: !unlistedPaths.includes(path),
  }))
  return [
    ...staticRoutes,
    ...products.map((p) => ({ path: `/products/${p.slug}`, ...productMeta(p), sitemap: true })),
    ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, ...solutionMeta(s), sitemap: true })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, ...industryMeta(i), sitemap: true })),
  ]
}
