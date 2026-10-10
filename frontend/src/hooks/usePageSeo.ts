import { useEffect } from 'react'
import { SITE_URL } from '../seo/siteUrl'

interface PageSeoOptions {
  title: string
  description: string
  /** Path for the canonical link, e.g. '/technology'. Defaults to the current path. */
  path?: string
  /** Set on pages that shouldn't be indexed, e.g. the 404 page. */
  noindex?: boolean
  /** Optional page-specific schema.org structured data. */
  jsonLd?: Record<string, unknown>
}

function upsertMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  const created = !el
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  const previous = el.content
  el.content = content
  return { el, created, previous }
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const created = !el
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  const previous = el.href
  el.href = href
  return { el, created, previous }
}

// Sets the per-page <title>, meta description, and canonical link on
// client-side navigation. The first load of each route already has them, plus
// per-page Open Graph / Twitter tags, baked into its static HTML by
// scripts/prerender.mjs (link-preview bots don't run JS). Both read
// src/seo/pageMeta.ts, so pass that page's entry here.
export function usePageSeo({ title, description, path, noindex, jsonLd }: PageSeoOptions) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const descMeta = upsertMeta('description', description)
    const canonicalHref = `${SITE_URL}${path ?? window.location.pathname}`
    const canonical = upsertCanonical(canonicalHref)
    const robotsMeta = noindex ? upsertMeta('robots', 'noindex, nofollow') : null

    let ldScript: HTMLScriptElement | null = null
    if (jsonLdString) {
      ldScript = document.createElement('script')
      ldScript.type = 'application/ld+json'
      ldScript.text = jsonLdString
      document.head.appendChild(ldScript)
    }

    return () => {
      document.title = previousTitle
      if (descMeta.created) {
        descMeta.el.remove()
      } else {
        descMeta.el.content = descMeta.previous
      }
      if (canonical.created) {
        canonical.el.remove()
      } else {
        canonical.el.href = canonical.previous
      }
      if (robotsMeta) {
        if (robotsMeta.created) {
          robotsMeta.el.remove()
        } else {
          robotsMeta.el.content = robotsMeta.previous
        }
      }
      ldScript?.remove()
    }
  }, [title, description, path, noindex, jsonLdString])
}

/** BreadcrumbList structured data for nested pages. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
