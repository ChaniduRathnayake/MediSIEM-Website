import { useEffect } from 'react'

interface PageSeoOptions {
  title: string
  description: string
  /** Path for the canonical link, e.g. '/technology'. Defaults to the current path. */
  path?: string
  /** Set on pages that shouldn't be indexed, e.g. the 404 page. */
  noindex?: boolean
}

// TODO: replace with the real production domain once deployed, then update
// public/sitemap.xml, public/robots.txt, and index.html's og:url to match.
export const SITE_URL = 'https://medisiem.vercel.app'

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

// Sets the per-page <title>, meta description, and canonical link — the
// signals a non-prerendered SPA can still reliably give to crawlers that
// execute JavaScript (Google). Open Graph / Twitter card tags are set
// statically in index.html instead: LinkedIn, WhatsApp, Slack, etc. fetch
// raw HTML without running JS, so per-page client-injected OG tags would
// never actually be seen by their link-preview bots. If per-page social
// previews are needed later, that requires prerendering each route, not
// more of this hook.
export function usePageSeo({ title, description, path, noindex }: PageSeoOptions) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const descMeta = upsertMeta('description', description)
    const canonicalHref = `${SITE_URL}${path ?? window.location.pathname}`
    const canonical = upsertCanonical(canonicalHref)
    const robotsMeta = noindex ? upsertMeta('robots', 'noindex, nofollow') : null

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
    }
  }, [title, description, path, noindex])
}
