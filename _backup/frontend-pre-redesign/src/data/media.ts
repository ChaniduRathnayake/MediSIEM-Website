// Fill these in once real assets exist. Left empty, the Home page shows a
// clearly-labelled "coming soon" placeholder instead of a broken embed or
// a fabricated image.

// YouTube video ID only — the part after `v=` or `youtu.be/`,
// e.g. 'dQw4w9WgXcQ'. Unlisted videos work fine for this.
export const DEMO_VIDEO_ID: string | null = null

export interface ProductScreenshot {
  id: string
  title: string
  caption: string
  imageUrl: string
}

// Add one entry per real screenshot, e.g.:
// {
//   id: 'medisiem-dashboard',
//   title: 'medisiem.app/dashboard',
//   caption: 'MediSIEM dashboard — alerts ranked by Clinical Alert Score',
//   imageUrl: '/screenshots/medisiem-dashboard.png',
// }
export const PRODUCT_SCREENSHOTS: ProductScreenshot[] = []
