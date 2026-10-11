# MediSIEM Website

Public-facing commercial website for **MediSIEM**, clinically aware security for hospital networks: MedShield
(IoMT DDoS detection and MIRS scoring), CAAP (the Clinical Alert Score) and criticality-gated incident response,
on top of Wazuh.

> **Maintainer note:** MediSIEM is presented as a research-stage commercial product. The site openly credits its
> origin as research project R26-CS-008 at SLIIT (team, supervisors, paper on `/research`), because that is the
> credibility the product has today. Every result is described as a research-prototype finding, with the standard
> footnote beside it. See "Honest claims" before editing copy.

The frontend is a healthcare-only marketing site (dark-first design system, mega-menu navigation, platform,
research, engagement and care-setting pages, Trust Center, interactive CVSS-vs-CAS demo). Content lives in typed
data files in `frontend/src/data/`. All research facts and figures live in one file, `data/research.ts`.

## Stack

- **frontend/**: React + Vite + TypeScript + Tailwind CSS v4 + React Router + Axios + lucide-react
- **backend/**: Node.js + Express + Mongoose + dotenv + cors + helmet + express-validator +
  express-rate-limit + nodemailer
- **Database**: MongoDB Atlas

`frontend/` and `backend/` are two fully independent npm projects (their own `package.json`, `node_modules`,
`.env`): standard MERN layout. Each can be installed and run on its own; the root `package.json` is just
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
│   │   │   ├── sections/        Page sections (Hero, Problem, Modules, CasDemo, Proof, …)
│   │   │   └── visuals/         Dashboards, network graph, chart primitives
│   │   ├── data/                Typed site content: products, solutions, industries,
│   │   │                        integrations, research, trust, customers, resources,
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
│   │                              (model/API names kept as-is internally,
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
| `/` | Home: hero, problem, how it works, CVSS-vs-CAS demo, results, validation, FAQ | `data/research.ts` |
| `/platform` | Modules and architecture, CVSS-vs-CAS demo, use cases, standards, console screenshots | `data/research.ts` |
| `/products`, `/products/:slug` | Product catalogue and detail pages | `data/products.ts` |
| `/solutions`, `/solutions/:slug` | Use cases | `data/solutions.ts` |
| `/industries`, `/industries/:slug` | Care settings ("Healthcare" in the nav): hospitals, healthcare networks, clinics, labs & imaging, long-term care, telehealth. `/industries/healthcare` redirects to `/industries/hospitals` | `data/industries.ts` |
| `/integrations` | Available vs. roadmap integrations | `data/integrations.ts` |
| `/pricing` (also `/engagement`) | Engagement model: three "Contact us" options and the pilot request form. No prices | `data/research.ts` → `engagements` |
| `/research` | Paper card (PDF + BibTeX), team and supervisors, validation, standards. `ScholarlyArticle` JSON-LD | `data/research.ts` |
| `/customers`, `/case-studies` | Outcomes + design-partner program (testimonials when real) | `data/customers.ts` |
| `/resources`, `/documentation`, `/api`, `/blog` | Resource hub + document library (`Document` API) | `data/resources.ts` |
| `/trust`, `/security` | Trust Center and compliance status | `data/trust.ts` |
| `/about`, `/careers`, `/roadmap` | Company pages (`TeamMember` / `Milestone` APIs) | |
| `/contact`, `/signup` | Lead forms → `POST /api/contact` (topic via `?intent=pilot\|research\|enterprise\|demo\|partner\|security\|…`). `/signup` is a pilot request | `LeadForm.tsx` |
| `/status` | Live check of `GET /api/health` | |
| `/privacy`, `/terms`, `/cookies`, `/dpa` | Legal drafts with a visible "pending legal review" banner | `LegalPage.tsx` |

`/technology` and `/results` (old routes) redirect to `/platform` and `/customers`.

## Honest claims (read before editing copy)

The site deliberately makes no claim it can't back up:

- **Never write**: "FDA approved/cleared", "HIPAA compliant", "prevents all attacks", "guarantees patient safety",
  "100% accurate", or any certification. Standards are "aligned with" or "informed by", never "compliant".
- **Research results**: only the figures in `data/research.ts`, each shown with `<ResearchFootnote />` ("Results
  from a research prototype evaluated on public datasets…"). Keep the footnote beside every results block.
- **No prices**: the engagement model is "Contact us" until real terms exist.
- **Missing content** is shown as a visible `[PLACEHOLDER: …]`, never invented.
- **Style**: no em dashes in site copy.

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

Each is a standalone project, so open two terminals:

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

The frontend works fine on its own with no backend running: it falls back to bundled sample data (see
**Stack** above). The backend works fine on its own too: test it with `curl http://localhost:5000/api/health`.

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
resource listing, and team info (see `backend/seed.js`). No `ContactMessage` seed data is created: that
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
   comments in those files if you deploy to a custom domain or user root page: `pathSegmentsToKeep` may
   need to change from `1` to `0`).

### Backend &rarr; Render

1. Create a new Web Service pointing at this repo with root directory `backend/` (or use the root
   `render.yaml` as a Render "Blueprint": Render auto-detects it at the repo root).
2. Build command: `npm install`. Start command: `npm start`.
3. Add all env vars from `backend/.env.example` in the Render dashboard.
4. Set `CLIENT_URL` to your deployed frontend's URL so CORS allows it.
5. Note: Render's free tier spins down on inactivity and takes a few seconds to wake up. The frontend already
   handles this: every data fetch times out after ~5s and falls back to
   `frontend/src/data/fallbackData.json` so the site never shows an empty page while the backend wakes up.

## What you need to fill in

- **`backend/.env`**
  - `MONGO_URI`: create a free MongoDB Atlas cluster, add a database user, allow your IP (or
    `0.0.0.0/0` for simplicity during development), and copy the connection string.
  - `CLIENT_URL`: your deployed frontend URL (defaults to `http://localhost:5173` for local dev). Named
    `CLIENT_URL` because it configures CORS for whichever origin is making requests, regardless of folder name.
  - `SMTP_*` / `CONTACT_RECEIVER_EMAIL`: optional. If left blank, contact form messages are still saved
    to the database, just not emailed. To enable email, use an SMTP provider (e.g. Gmail with an app password,
    SendGrid, Mailtrap for testing).
- **`frontend/.env`**
  - `VITE_API_URL`: your deployed backend URL (defaults to `http://localhost:5000` for local dev).
- **`backend/seed.js`**
  - Advisor emails (`Mr. Amila Senarathne`, `Ms. Ayesha Wijesooriya`) are still placeholders
    (`TODO@sliit.lk`): fill in with real contact emails. Note these institutional-looking addresses are
    only in the database, never rendered on the public site.
  - Team member emails similarly use an institutional-looking placeholder pattern, not independently
    confirmed, and are **not rendered anywhere on the public site** (`studentId`/`email` are kept on the
    `TeamMember` record for internal reference only): replace with real contact details if you want
    them used anywhere.
  - `linkedin` and `photoUrl` are empty strings: add real profile links/photos when available.
  - Re-run `npm run seed` after editing.
- **Visible placeholders** (search the code for `PLACEHOLDER`):
  - Paper PDF at `frontend/public/papers/when-the-cure-can-harm-the-patient.pdf`, plus authors, venue and year
    for the paper card and BibTeX (`data/research.ts` → `paper`).
  - SLIIT logo (needs usage approval) and team/supervisor photos (`TeamSection.tsx`).
  - Pilot duration, scope and success criteria; enterprise terms; IP ownership answer (`data/research.ts`).
  - Link to the Ponemon/Proofpoint 2025 report for the context statistic (`data/research.ts` → `contextStat`).
  - Security contact email and the full responsible-disclosure policy (`data/trust.ts`).
  - DPA terms and legal review of Privacy, Terms, Cookies and DPA (`LegalPage.tsx`).
- **Trust Center** (`frontend/src/data/trust.ts`, `TODO(trust)`): have engineering confirm each operational
  statement (TLS, encryption at rest, key rotation, backups, review process).
- **Legal pages** (`frontend/src/pages/LegalPage.tsx`, `TODO(legal)`): plain-language drafts based on what the site
  actually does; get legal review.
- **Social links** (`frontend/src/data/site.ts`, `TODO(social)`): empty hrefs are not rendered.
- **Product screenshots**: drop real console screenshots into `frontend/src/assets/screenshots/` named after a
  slot (`hero.webp`, `console-overview.webp`, `product-siem.webp`, …). See the README in that folder for the full
  list. Slots without a file keep the illustrated sample-data visuals.
- **Customer results** (`frontend/src/data/customers.ts`): see "Honest claims" above.
- **`frontend/public/docs/`** doesn't exist yet: the seeded resource `fileUrl`s point to
  `/docs/<name>.pdf`. Add the actual PDF files there (or swap in real hosted URLs) once they exist.
- **Production domain**: set `VITE_SITE_URL` (e.g. in Vercel's env vars) to the real origin. The build uses it
  for canonical links, Open Graph URLs, the generated `sitemap.xml` and `robots.txt`; it defaults to
  `https://medisiem.vercel.app`.
- **Analytics** (optional): set `VITE_PLAUSIBLE_DOMAIN` to enable cookieless Plausible Analytics (page views,
  `Lead` and `Engagement CTA` events). The Privacy and Cookie pages mention it only when it's enabled.
- **Product screenshots**: most console captures show `R26-CS-008 · MediSIEM Platform` under the dashboard
  header (and `detection-performance.webp` shows an internal file path). Recapture them once the console
  subtitle is changed. `hero.webp` is also a byte-identical copy of `alert-queue.webp`; use a different view.

## Statistics (Problem section and care-setting pages)

Every number in `frontend/src/data/statistics.ts` was independently verified against its primary source
(fetched directly, not taken from a secondary summary) before being added:

- **$7.42M** average healthcare breach cost: IBM *Cost of a Data Breach Report 2025* (Ponemon Institute),
  via [HealthTech Security](https://www.techtarget.com/healthtechsecurity/news/366628031/Healthcare-remains-costliest-industry-for-breaches-at-742M).
- **22%** of disclosed ransomware attacks targeted healthcare in 2025: BlackFog *2025 State of Ransomware
  Report*, via [HIPAA Journal](https://www.hipaajournal.com/healthcare-most-targeted-sector-2025-ransomware/).
- **+113.6%** rise in confirmed strokes at an adjacent, non-targeted hospital during a ransomware attack on a
  nearby facility: [JAMA Network Open](https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585).
- **99%** of hospitals manage IoMT devices with known exploited vulnerabilities: Claroty *State of CPS
  Security: Healthcare Exposures 2025*, via [HIPAA Journal](https://www.hipaajournal.com/99-of-healthcare-orgs-managing-iomt-devices-with-known-exploited-vulnerabilities/).

If you add or change a statistic, verify it against the primary source yourself (not just a search-engine
summary, since those can misattribute or conflate separate studies) and keep the citation visible on the card,
not just in a tooltip.

## CVSS-vs-CAS demo

`frontend/src/components/sections/CasDemo.tsx` computes the Clinical Alert Score live with `computeCAS` from
`data/research.ts` (weights 0.25 TR, 0.30 CC, 0.25 TS, 0.10 AE, 0.10 TC; signals TR 9, TS 8, AE 7, TC 5). The
defaults reproduce the paper: ventilator CC 10 gives 8.45 (Immediate), admin workstation CC 2 gives 6.05
(Investigate). The inversion lists are test case TC4 (recon on a ventilator: CVSS 3.1, CAS 7.4; DoS on an admin
PC: CVSS 7.5, CAS 6.8). An e2e test pins these values.

## CDAP research site (`cdap-site/`)

> **Note (2026-10-11):** the `cdap-site/` folder is currently missing from the working tree. It was never
> committed, so it can't be restored from git. `npm run seed:cdap` reads `cdap-site/js/data.js` and will fail until
> the folder is restored.

`cdap-site/` is a separate, academic website for the SLIIT CDAP module. It uses plain HTML, CSS and vanilla JS with no build step, and has seven pages: Home, Domain, Milestones, Documents, Presentations, About Us and Contact Us. Unlike `frontend/`, it openly names SLIIT, the project ID and the students' IDs. Host it separately from the commercial site. See `cdap-site/README.md` for editing and uploading.

It runs on its own from `cdap-site/js/data.js`. With `apiUrl` set in `cdap-site/js/config.js`, it uses these backend endpoints instead:

| Endpoint | Purpose |
|---|---|
| `GET /api/cdap/milestones`, `/api/cdap/documents?kind=document\|slides`, `/api/cdap/team` | Public content (`CdapMilestone`, `CdapDocument`, `CdapMember`; separate from the commercial collections) |
| `POST /api/contact` | Same endpoint as the marketing site. Accepts an optional `subject`, plus `source: "cdap"` |
| `/api/admin/messages`, `/api/admin/cdap/{milestones\|documents\|team}[/:id]` | Admin: read/delete contact messages; create/update/delete CDAP content. Needs `Authorization: Bearer $ADMIN_API_KEY` and is off until `ADMIN_API_KEY` is set (24+ characters). Failed attempts are rate-limited |

`npm run seed:cdap` (in `backend/`) loads `cdap-site/js/data.js` into those collections. `CLIENT_URL` accepts a comma-separated list, so both sites can call the API.

## Tests

```bash
cd backend && npm test          # API: contact validation, HTML escaping, honeypot, rate limit, team fields,
                                # CDAP endpoints, admin auth/CRUD, URL validation, multi-origin CORS
cd frontend && npm run test:e2e # build, then Playwright: every route (desktop + mobile), lead form,
                                # per-route metadata, axe WCAG 2.1 AA checks in dark and light themes
```

First-time e2e setup: `npx playwright install chromium`.

## Notes

- Tailwind CSS v4 is configured via `@tailwindcss/vite` (no `tailwind.config.js` needed): see
  `frontend/src/index.css`.
- The contact endpoint (`POST /api/contact`) is rate-limited to 5 requests per 15 minutes per IP. The app
  trusts one proxy hop (`TRUST_PROXY`, default `1`) so the limit is per visitor on Render. Submissions with the
  hidden `website` honeypot field filled are accepted silently and discarded.
- The `Milestone` and `Document` Mongoose models/API routes keep their original names internally
  (`/api/milestones`, `/api/documents`): only the public-facing page names and copy changed (to "Roadmap"
  and "Resources"). Renaming the API itself wasn't necessary since visitors never see those endpoint names.
