# MediSIEM Website

Public-facing commercial website for **MediSIEM**, an AI-powered security operations platform (SIEM, CAAP
impact-aware alert prioritization, guided incident response, threat intelligence and compliance) for hospitals
and regulated enterprises.

> **Maintainer note:** the public site is intentionally branded as a standalone commercial product
> (MediSIEM) — it does not disclose that the underlying codebase originates from a SLIIT final-year
> research project (R26-CS-008). Keep that framing in mind if you edit copy: no SLIIT/university/student
> references, no "Supervisor"/"viva"/"proposal"-style academic language anywhere in `frontend/src`. This
> README itself is internal documentation and isn't shown to site visitors, so it can stay factual about
> both contexts.

The frontend is an enterprise SaaS-style marketing site (dark-first design system, mega-menu navigation, product /
solution / industry pages, pricing, Trust Center, interactive product demo). Content lives in typed data files in
`frontend/src/data/`, so copy, products, integrations and pricing can be edited without touching components.

## Stack

- **frontend/** &mdash; React + Vite + TypeScript + Tailwind CSS v4 + React Router + Axios + lucide-react
- **backend/** &mdash; Node.js + Express + Mongoose + dotenv + cors + helmet + express-validator +
  express-rate-limit + nodemailer
- **Database** &mdash; MongoDB Atlas

`frontend/` and `backend/` are two fully independent npm projects (their own `package.json`, `node_modules`,
`.env`) &mdash; standard MERN layout. Each can be installed and run on its own; the root `package.json` is just
a convenience wrapper for running both together.

## Folder structure

```
MediSIEM Website/
├── frontend/                    React + Vite + TypeScript frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── og-image.png         Open Graph / Twitter card preview image
│   │   └── 404.html             GitHub Pages SPA routing fallback
│   ├── scripts/prerender.mjs    Post-build: per-route HTML (title/OG/canonical),
│   │                            sitemap.xml and robots.txt
│   ├── e2e/                     Playwright smoke, form and axe accessibility tests
│   ├── src/
│   │   ├── components/          Reveal, Logo, LeadForm, BrowserFrame, CASCalculator,
│   │   │                        DocumentList, ui.tsx (SectionHeader, PageHero, CTABanner…)
│   │   │   ├── sections/        Page sections (Hero, Problem, Products, Pricing, …)
│   │   │   └── visuals/         Dashboards, network graph, chart primitives
│   │   ├── data/                Typed site content: products, solutions, industries,
│   │   │                        integrations, pricing, trust, customers, resources,
│   │   │                        marketing copy, demoTelemetry (sample data),
│   │   │                        statistics (cited), comparisonScenario, fallbackData.json
│   │   ├── hooks/
│   │   │   ├── useAsyncData.ts
│   │   │   └── usePageSeo.ts          Per-page title/description/canonical + JSON-LD
│   │   ├── seo/                  pageMeta.ts (every page's title/description),
│   │   │                          routes.ts (prerender list), siteUrl.ts
│   │   ├── layout/               Layout (lazy-route Suspense, scroll restore), Navbar, Footer
│   │   ├── pages/                One file per route (see table below)
│   │   ├── services/
│   │   │   └── api.ts            Axios instance, 5s timeout + fallback
│   │   ├── utils/casAction.ts    Shared CAS -> action threshold logic
│   │   ├── types/index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── vercel.json               SPA rewrites for Vercel
│   └── vite.config.ts            base path for GitHub Pages
│
├── backend/                     Express MVC backend
│   ├── config/
│   │   ├── db.js                 Mongoose/Atlas connection
│   │   └── mailer.js             Conditional nodemailer transporter
│   ├── controllers/
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── contactRateLimiter.js
│   ├── models/                   Milestone, Document, TeamMember, ContactMessage
│   │                              (model/API names kept as-is internally —
│   │                              only the public-facing pages were renamed:
│   │                              Milestone -> "Roadmap", Document -> "Resources")
│   ├── routes/
│   ├── .env.example
│   ├── seed.js
│   └── server.js
│
├── package.json                  Root script to run frontend + backend together
├── render.yaml                   Render deploy config (Blueprint, rootDir: backend)
└── README.md
```

## Pages / routes

All routes except `/` are code-split (`React.lazy`) and load on demand.

| Route | Page | Content source |
|---|---|---|
| `/` | Home | All sections in `src/components/sections/` |
| `/platform` | Platform overview, CVSS-vs-Alert-Score ranking, Alert Score calculator | `comparisonScenario.ts`, `CASCalculator` |
| `/products`, `/products/:slug` | Product catalogue and detail pages | `data/products.ts` |
| `/solutions`, `/solutions/:slug` | Use cases | `data/solutions.ts` |
| `/industries`, `/industries/:slug` | Industry pages | `data/industries.ts` |
| `/integrations` | Available vs. roadmap integrations | `data/integrations.ts` |
| `/pricing` | Safety-as-a-Service model (setup fee + LKR subscription), plans, comparison table, FAQ | `data/pricing.ts` |
| `/customers`, `/case-studies` | Outcomes + design-partner program (testimonials when real) | `data/customers.ts` |
| `/resources`, `/documentation`, `/api`, `/blog` | Resource hub + document library (`Document` API) | `data/resources.ts` |
| `/trust`, `/security` | Trust Center and compliance status | `data/trust.ts` |
| `/about`, `/careers`, `/roadmap` | Company pages (`TeamMember` / `Milestone` APIs) | |
| `/contact`, `/signup` | Lead forms → `POST /api/contact` (topic via `?intent=demo\|sales\|trial\|partner\|security\|…`) | `LeadForm.tsx` |
| `/login` | Console sign-in router (no credentials collected) | `LoginPage.tsx` |
| `/status` | Live check of `GET /api/health` | |
| `/privacy`, `/terms`, `/cookies`, `/dpa` | Legal drafts | `LegalPage.tsx` |

`/technology` and `/results` (old routes) redirect to `/platform` and `/customers`.

## Honest claims (read before editing copy)

The site deliberately makes no claim it can't back up:

- **Certifications**: none claimed. `data/trust.ts` → `complianceItems` uses `aligned` (= detections are mapped to
  the framework) vs `roadmap`. Only add a certification once the certificate/report exists.
- **Integrations**: only `status: 'available'` items are presented as supported; everything else is shown under
  "On the roadmap". Brand names are plain text, never logos.
- **Customer proof**: `data/customers.ts` → `testimonials` is empty and `outcomeMetrics` values are `null`, so the
  site shows "Measuring in pilots" + the design-partner CTA. Add testimonials only with written approval from the
  named person; fill metric values only from real pilot results.
- **Statistics**: only the cited numbers in `statistics.ts` (see below).
- **Dashboards / demo**: driven by `data/demoTelemetry.ts` and always labelled "Sample data" in the UI.

## Running frontend and backend independently

Each is a standalone project — open two terminals:

```bash
# Terminal 1
cd frontend
npm install        # first time only
npm run dev         # http://localhost:5173
```

```bash
# Terminal 2
cd backend
npm install        # first time only
npm run dev         # http://localhost:5000
```

The frontend works fine on its own with no backend running — it falls back to bundled sample data (see
**Stack** above). The backend works fine on its own too — test it with `curl http://localhost:5000/api/health`.

## Or run everything from the root

## 1. Install

```bash
npm run install:all
```

Installs dependencies in both `frontend/` and `backend/`. (Run `npm install` once at the root first if you
haven't already, to pick up `concurrently`.)

## 2. Configure environment variables

Copy the example env files and fill them in (see **What you need to fill in** below):

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## 3. Seed the database

```bash
npm run seed
```

This clears and repopulates `Milestone`, `Document`, and `TeamMember` collections with the product roadmap,
resource listing, and team info (see `backend/seed.js`). No `ContactMessage` seed data is created &mdash; that
collection fills up from real contact form submissions.

## 4. Run

```bash
npm run dev
```

Runs the frontend (http://localhost:5173) and backend (http://localhost:5000) together via `concurrently`. Or
run them separately from the root:

```bash
npm run frontend   # frontend only
npm run backend    # backend only
```

## Deployment

### Frontend &rarr; Vercel

1. Import the repo in Vercel, set the project root to `frontend/`.
2. Framework preset: Vite.
3. Add env var `VITE_API_URL` = your deployed backend URL (no trailing slash).
4. `vercel.json` already configures the SPA rewrite so client-side routes don't 404 on refresh.

### Frontend &rarr; GitHub Pages (alternative)

1. In `frontend/vite.config.ts`, set `base: '/<repo-name>/'`.
2. Build with `npm run build --prefix frontend`, then deploy the `frontend/dist` folder to the `gh-pages`
   branch (e.g. via the `gh-pages` npm package or a GitHub Action).
3. `public/404.html` + the restore script in `index.html` already handle SPA routing on GitHub Pages (see the
   comments in those files if you deploy to a custom domain or user root page &mdash; `pathSegmentsToKeep` may
   need to change from `1` to `0`).

### Backend &rarr; Render

1. Create a new Web Service pointing at this repo with root directory `backend/` (or use the root
   `render.yaml` as a Render "Blueprint" &mdash; Render auto-detects it at the repo root).
2. Build command: `npm install`. Start command: `npm start`.
3. Add all env vars from `backend/.env.example` in the Render dashboard.
4. Set `CLIENT_URL` to your deployed frontend's URL so CORS allows it.
5. Note: Render's free tier spins down on inactivity and takes a few seconds to wake up. The frontend already
   handles this &mdash; every data fetch times out after ~5s and falls back to
   `frontend/src/data/fallbackData.json` so the site never shows an empty page while the backend wakes up.

## What you need to fill in

- **`backend/.env`**
  - `MONGO_URI` &mdash; create a free MongoDB Atlas cluster, add a database user, allow your IP (or
    `0.0.0.0/0` for simplicity during development), and copy the connection string.
  - `CLIENT_URL` &mdash; your deployed frontend URL (defaults to `http://localhost:5173` for local dev). Named
    `CLIENT_URL` because it configures CORS for whichever origin is making requests, regardless of folder name.
  - `SMTP_*` / `CONTACT_RECEIVER_EMAIL` &mdash; optional. If left blank, contact form messages are still saved
    to the database, just not emailed. To enable email, use an SMTP provider (e.g. Gmail with an app password,
    SendGrid, Mailtrap for testing).
- **`frontend/.env`**
  - `VITE_API_URL` &mdash; your deployed backend URL (defaults to `http://localhost:5000` for local dev).
- **`backend/seed.js`**
  - Advisor emails (`Mr. Amila Senarathne`, `Ms. Ayesha Wijesooroya`) are still placeholders
    (`TODO@sliit.lk`) &mdash; fill in with real contact emails. Note these institutional-looking addresses are
    only in the database, never rendered on the public site.
  - Team member emails similarly use an institutional-looking placeholder pattern, not independently
    confirmed, and are **not rendered anywhere on the public site** (`studentId`/`email` are kept on the
    `TeamMember` record for internal reference only) &mdash; replace with real contact details if you want
    them used anywhere.
  - `linkedin` and `photoUrl` are empty strings &mdash; add real profile links/photos when available.
  - Re-run `npm run seed` after editing.
- **Pricing** (`frontend/src/data/pricing.ts`, `TODO(pricing)`): follows the commercialization plan (one-time
  setup fee quoted per hospital + 15,000&ndash;20,000 LKR/month subscription). How the three plans split that
  range (Essential 15,000 / Clinical 20,000 / Healthcare Cluster custom) and each plan's scope are placeholders
  &mdash; confirm with the business before launch.
- **Trust Center** (`frontend/src/data/trust.ts`, `TODO(trust)`): have engineering confirm each operational
  statement (TLS, encryption at rest, key rotation, backups, review process).
- **Legal pages** (`frontend/src/pages/LegalPage.tsx`, `TODO(legal)`): plain-language drafts based on what the site
  actually does; get legal review.
- **Login** (`frontend/src/pages/LoginPage.tsx`, `TODO(login)`): `CONSOLE_HOST` is `null`, so the form never
  redirects. Set it once the managed console domain exists.
- **Social links** (`frontend/src/data/site.ts`, `TODO(social)`): empty hrefs are not rendered.
- **Product screenshots**: drop real console screenshots into `frontend/src/assets/screenshots/` named after a
  slot (`hero.webp`, `console-overview.webp`, `product-siem.webp`, …). See the README in that folder for the full
  list. Slots without a file keep the illustrated sample-data visuals.
- **Customer results** (`frontend/src/data/customers.ts`): see "Honest claims" above.
- **`frontend/public/docs/`** doesn't exist yet &mdash; the seeded resource `fileUrl`s point to
  `/docs/<name>.pdf`. Add the actual PDF files there (or swap in real hosted URLs) once they exist.
- **Production domain**: set `VITE_SITE_URL` (e.g. in Vercel's env vars) to the real origin. The build uses it
  for canonical links, Open Graph URLs, the generated `sitemap.xml` and `robots.txt`; it defaults to
  `https://medisiem.vercel.app`.
- **Analytics** (optional): set `VITE_PLAUSIBLE_DOMAIN` to enable cookieless Plausible Analytics (page views,
  `Lead` and `Pricing CTA` events). The Privacy and Cookie pages mention it only when it's enabled.
- **Product screenshots**: most console captures show `R26-CS-008 · MediSIEM Platform` under the dashboard
  header (and `detection-performance.webp` shows an internal file path). Recapture them once the console
  subtitle is changed. `hero.webp` is also a byte-identical copy of `alert-queue.webp`; use a different view.

## Statistics (Problem section and Healthcare industry page)

Every number in `frontend/src/data/statistics.ts` was independently verified against its primary source
(fetched directly, not taken from a secondary summary) before being added:

- **$7.42M** average healthcare breach cost &mdash; IBM *Cost of a Data Breach Report 2025* (Ponemon Institute),
  via [HealthTech Security](https://www.techtarget.com/healthtechsecurity/news/366628031/Healthcare-remains-costliest-industry-for-breaches-at-742M).
- **22%** of disclosed ransomware attacks targeted healthcare in 2025 &mdash; BlackFog *2025 State of Ransomware
  Report*, via [HIPAA Journal](https://www.hipaajournal.com/healthcare-most-targeted-sector-2025-ransomware/).
- **+113.6%** rise in confirmed strokes at an adjacent, non-targeted hospital during a ransomware attack on a
  nearby facility &mdash; [JAMA Network Open](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585).
- **99%** of hospitals manage IoMT devices with known exploited vulnerabilities &mdash; Claroty *State of CPS
  Security: Healthcare Exposures 2025*, via [HIPAA Journal](https://www.hipaajournal.com/99-of-healthcare-orgs-managing-iomt-devices-with-known-exploited-vulnerabilities/).

If you add or change a statistic, verify it against the primary source yourself (not just a search-engine
summary &mdash; those can misattribute or conflate separate studies) and keep the citation visible on the card,
not just in a tooltip.

## CVSS-vs-CAAP comparison demo

`frontend/src/data/comparisonScenario.ts` holds three illustrative alerts (ICU ventilator DoS, radiology
ransomware, admin-PC malware) with precomputed CVSS and CAS scores, used by the Platform page's side-by-side
ranking ("Same night shift. Two very different rankings.") and mirrored in the Home page's interactive demo. These are clearly labelled in the UI as an illustrative scenario, not
recorded production data — the CAS values are reproducible from the documented formula, and the CVSS values
are representative severity ratings chosen to make the ranking contrast clear. If you'd rather show a real
logged incident once one exists, replace the entries here; the component itself needs no changes.

## Tests

```bash
cd backend && npm test          # API: contact validation, HTML escaping, honeypot, rate limit, team fields
cd frontend && npm run test:e2e # build, then Playwright: every route (desktop + mobile), lead form,
                                # per-route metadata, axe WCAG 2.1 AA checks in dark and light themes
```

First-time e2e setup: `npx playwright install chromium`.

## Notes

- Tailwind CSS v4 is configured via `@tailwindcss/vite` (no `tailwind.config.js` needed) &mdash; see
  `frontend/src/index.css`.
- The contact endpoint (`POST /api/contact`) is rate-limited to 5 requests per 15 minutes per IP. The app
  trusts one proxy hop (`TRUST_PROXY`, default `1`) so the limit is per visitor on Render. Submissions with the
  hidden `website` honeypot field filled are accepted silently and discarded.
- The `Milestone` and `Document` Mongoose models/API routes keep their original names internally
  (`/api/milestones`, `/api/documents`) — only the public-facing page names and copy changed (to "Roadmap"
  and "Resources"). Renaming the API itself wasn't necessary since visitors never see those endpoint names.
