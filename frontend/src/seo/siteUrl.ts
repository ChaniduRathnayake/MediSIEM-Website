// The production origin, used for canonical links, Open Graph URLs, the
// sitemap and robots.txt. Set VITE_SITE_URL in the deploy environment (or
// frontend/.env.production) once the real domain is known; the build step in
// scripts/prerender.mjs swaps it into every generated page.
export const DEFAULT_SITE_URL = 'https://medisiem.vercel.app'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
