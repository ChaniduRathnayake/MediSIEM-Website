import { expect, routes, test } from './fixtures'

test.describe('every route renders', () => {
  for (const path of routes) {
    test(path, async ({ page, errors }) => {
      await page.goto(path)
      await expect(page.locator('main h1').first()).toBeVisible()
      await expect(page).toHaveTitle(/MediSIEM/)
      await expect(page.getByText('Page not found')).toHaveCount(0)
      expect(errors).toEqual([])
    })
  }
})

test('unknown routes show the 404 page', async ({ page }) => {
  await page.goto('/definitely-not-a-page')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})
