import AxeBuilder from '@axe-core/playwright'
import { expect, test } from './fixtures'

test('each route ships its own link-preview metadata', async ({ request }) => {
  const html = await (await request.get('/products/siem')).text()
  expect(html).toContain('<title>MediSIEM Core SIEM | MediSIEM</title>')
  expect(html).toMatch(/<meta property="og:url" content="https?:\/\/[^"]+\/products\/siem"/)
  expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/products\/siem"/)
})

test('engagement page lists options without prices', async ({ page, errors }) => {
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { level: 1, name: 'Start with a conversation, not a price list.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Pilot program' })).toBeVisible()
  await expect(page.locator('p', { hasText: /^Contact us$/ })).toHaveCount(3)
  await expect(page.getByText(/LKR|\$\d/)).toHaveCount(0)
  expect(errors).toEqual([])
})

test('home page loads the lazy sections', async ({ page, errors }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Security that knows which device is keeping someone alive.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'See why CVSS gets it wrong.' })).toBeAttached()
  expect(errors).toEqual([])
})

test('CAS demo reproduces the paper values and updates live', async ({ page, errors }) => {
  await page.goto('/platform#demo')
  const demo = page.locator('#demo')
  await expect(demo.getByText('8.45 / 10', { exact: true })).toBeVisible()
  await expect(demo.getByText('6.05 / 10', { exact: true })).toBeVisible()

  // Dropping the ventilator to CC 2 must give the admin-PC score.
  await demo.getByRole('slider').first().fill('2')
  await expect(demo.getByText('6.05 / 10', { exact: true })).toHaveCount(2)
  expect(errors).toEqual([])
})

test('research page ships ScholarlyArticle structured data', async ({ page, errors }) => {
  await page.goto('/research')
  await expect(page.locator('#paper')).toBeVisible()
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(ld.some((t) => t.includes('"ScholarlyArticle"'))).toBe(true)
  expect(errors).toEqual([])
})

test('pilot form submits with consent, context and an empty honeypot', async ({ page, errors }) => {
  await page.goto('/contact?intent=pilot&product=siem')
  await expect(page.getByRole('heading', { level: 1, name: 'Request a pilot' })).toBeVisible()

  await page.getByLabel('Full name').fill('Dana Perera')
  await page.getByLabel('Work email').fill('dana@hospital.example')
  await page.getByRole('textbox', { name: 'Hospital / organization' }).fill('Example General Hospital')
  await page.getByLabel('Number of connected devices').fill('120')
  await page.getByLabel('Current SIEM').fill('Wazuh')
  await page.getByRole('checkbox').check()

  const [request] = await Promise.all([
    page.waitForRequest((r) => r.url().endsWith('/api/contact') && r.method() === 'POST'),
    page.getByRole('button', { name: 'Request a pilot' }).click(),
  ])
  const body = request.postDataJSON()
  expect(body).toMatchObject({ name: 'Dana Perera', email: 'dana@hospital.example', website: '' })
  expect(body.message).toContain('[Request a pilot]')
  expect(body.message).toContain('Product: siem')
  expect(body.message).toContain('Consent to be contacted: yes')

  await expect(page.getByText('Thanks, we’ve got it.')).toBeVisible()
  expect(errors).toEqual([])
})

test.describe('accessibility (axe, WCAG 2.1 AA)', () => {
  // Reduced motion shows every Reveal immediately, so nothing is mid-fade.
  test.use({ reducedMotion: 'reduce' })

  for (const path of ['/', '/platform', '/pricing', '/research', '/contact', '/industries/hospitals']) {
    for (const theme of ['dark', 'light'] as const) {
      test(`${path} (${theme})`, async ({ page }) => {
        await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
        await page.goto(path)
        if (path === '/') await expect(page.locator('#demo-heading')).toBeAttached()
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        const serious = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join('\n  ')}`)
        expect(serious, serious.join('\n')).toEqual([])
      })
    }
  }
})
