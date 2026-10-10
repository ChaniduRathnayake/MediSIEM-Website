import { readFileSync } from 'node:fs'
import { test as base, expect } from '@playwright/test'

/** Every sitemap route, plus pages deliberately left out of it. */
export const routes = [
  ...[...readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8').matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(
    (m) => m[1],
  ),
  '/login',
]

// Mocks the API so tests are fast and need no backend: content endpoints fail
// (the site falls back to bundled data), the contact form succeeds. Collects
// uncaught page errors and console errors so each test can assert none.
export const test = base.extend<{ errors: string[] }>({
  errors: async ({ page }, use) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
    page.on('console', (msg) => {
      // Blocked API calls and offline font loads show up as resource errors.
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) errors.push(`console: ${msg.text()}`)
    })
    await page.route('**/api/**', (route) => {
      const url = route.request().url()
      if (url.endsWith('/api/contact') && route.request().method() === 'POST') {
        return route.fulfill({ status: 201, contentType: 'application/json', body: '{"success":true}' })
      }
      return route.abort()
    })
    await use(errors)
  },
})

export { expect }
