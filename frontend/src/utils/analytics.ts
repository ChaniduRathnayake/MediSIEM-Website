// Privacy-friendly analytics (Plausible): no cookies, no personal data, so no
// consent banner is needed. Off unless VITE_PLAUSIBLE_DOMAIN is set at build
// time; LegalPage describes it only when it's on.
const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

export const analyticsEnabled = Boolean(DOMAIN)

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}

/** Loads the Plausible script. Page views on client-side navigation are tracked by the script itself. */
export function initAnalytics() {
  if (!DOMAIN) return
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = DOMAIN
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

/** Records a conversion event, e.g. a submitted lead form. No-op when analytics are off. */
export function trackEvent(name: string, props?: Record<string, string>) {
  window.plausible?.(name, props && { props })
}
