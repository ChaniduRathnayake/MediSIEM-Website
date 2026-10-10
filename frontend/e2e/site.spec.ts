import AxeBuilder from '@axe-core/playwright'
import { expect, test } from './fixtures'

test('each route ships its own link-preview metadata', async ({ request }) => {
  const html = await (await request.get('/products/siem')).text()
  expect(html).toContain('<title>MediSIEM Core SIEM | MediSIEM</title>')
  expect(html).toMatch(/<meta property="og:url" content="https?:\/\/[^"]+\/products\/siem"/)
  expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/products\/siem"/)
})

test('pricing shows the Safety-as-a-Service model in LKR', async ({ page, errors }) => {
  await page.goto('/pricing')
  await expect(page.getByRole('heading', { name: 'Setup fee' })).toBeVisible()
  await expect(page.getByText('LKR 15,000', { exact: true })).toBeVisible()
  await expect(page.getByText('LKR 20,000', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Healthcare Cluster' })).toBeVisible()
  expect(errors).toEqual([])
})

test('home page loads the lazy sections', async ({ page, errors }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /can’t afford enterprise SOC tooling/ })).toBeVisible()
  await expect(page.locator('#pricing')).toBeAttached()
  expect(errors).toEqual([])
})

test('lead form submits with topic, context and an empty honeypot', async ({ page, errors }) => {
  await page.goto('/contact?intent=quote&plan=clinical')
  await expect(page.getByRole('heading', { level: 1, name: 'Get a setup quote' })).toBeVisible()

  await page.getByLabel('Full name').fill('Dana Perera')
  await page.getByLabel('Work email').fill('dana@hospital.example')
  await page.getByRole('textbox', { name: 'Company' }).fill('Example General Hospital')

  const [request] = await Promise.all([
    page.waitForRequest((r) => r.url().endsWith('/api/contact') && r.method() === 'POST'),
    page.getByRole('button', { name: 'Request a quote' }).click(),
  ])
  const body = request.postDataJSON()
  expect(body).toMatchObject({ name: 'Dana Perera', email: 'dana@hospital.example', website: '' })
  expect(body.message).toContain('[Request a setup quote]')
  expect(body.message).toContain('Plan: clinical')

  await expect(page.getByText('Thanks — we’ve got it.')).toBeVisible()
  expect(errors).toEqual([])
})

test.describe('accessibility (axe, WCAG 2.1 AA)', () => {
  // Reduced motion shows every Reveal immediately, so nothing is mid-fade.
  test.use({ reducedMotion: 'reduce' })

  for (const path of ['/', '/pricing', '/contact', '/industries/healthcare']) {
    for (const theme of ['dark', 'light'] as const) {
      test(`${path} (${theme})`, async ({ page }) => {
        await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
        await page.goto(path)
        if (path === '/') await expect(page.locator('#pricing')).toBeAttached()
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        const serious = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join('\n  ')}`)
        expect(serious, serious.join('\n')).toEqual([])
      })
    }
  }
})
