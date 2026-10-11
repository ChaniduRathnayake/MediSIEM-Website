import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'
import { analyticsEnabled } from '../utils/analytics'

export type LegalDoc = 'privacy' | 'terms' | 'cookies' | 'dpa'

interface Section {
  heading: string
  body: string[]
}

// TODO(legal): plain-language drafts that describe what this website actually
// does today (contact form → database + optional email; Google Fonts;
// cookieless Plausible analytics only when VITE_PLAUSIBLE_DOMAIN is set). Have
// counsel review before launch, and update if chat widgets or new processors
// are added.

const ANALYTICS_TEXT =
  'We use Plausible Analytics to count page visits and form submissions in aggregate. Plausible sets no cookies and collects no personal data: it doesn’t store IP addresses or track you across sites.'
const DOCS: Record<LegalDoc, { title: string; summary: string; updated: string; sections: Section[] }> = {
  privacy: {
    title: 'Privacy Policy',
    summary: 'What this website collects, why, and the choices you have.',
    updated: '6 October 2026',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you submit a form on this site (contact, pilot or collaboration requests), we collect the details you enter: your name, email address, organization, role and message, and, for pilot requests, the number of connected devices and your current SIEM if you provide them. We also record that you consented to be contacted.',
          'Our servers process standard technical information, such as your IP address, to deliver the site and to rate-limit form submissions against abuse.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use form submissions only to respond to your request and to follow up about MediSIEM if you asked us to. We do not sell your personal data or share it with advertisers.',
        ],
      },
      {
        heading: 'Where it is stored',
        body: [
          'Form submissions are stored in our database and may be forwarded to our team by email. These services act as our processors and handle data only on our instructions.',
          'This site loads fonts from Google Fonts, which means your browser connects to Google’s servers when you visit.',
        ],
      },
      ...(analyticsEnabled ? [{ heading: 'Analytics', body: [ANALYTICS_TEXT] }] : []),
      {
        heading: 'Retention',
        body: ['We keep form submissions for as long as needed to handle your request and any resulting business relationship, then delete them.'],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on where you live, you may have the right to access, correct, delete or object to the processing of your personal data. To exercise any of these rights, contact us and we will respond within the timeframe required by law.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    summary: 'The terms that apply when you use this website.',
    updated: '6 October 2026',
    sections: [
      {
        heading: 'Using this website',
        body: [
          'This website provides information about MediSIEM and its products. You may use it for lawful purposes only, and must not attempt to disrupt, probe or gain unauthorized access to it. Security research is welcome through our vulnerability disclosure process.',
        ],
      },
      {
        heading: 'Product information',
        body: [
          'Product descriptions, dashboards and scenarios on this site are illustrative. Visualizations labelled “Sample data” do not depict real customer environments. Features marked “Roadmap” are planned and not yet available.',
          'Use of the MediSIEM platform itself is governed by a separate customer agreement.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: ['Content on this site is owned by MediSIEM unless stated otherwise. Third-party names are used only to identify those products and do not imply endorsement.'],
      },
      {
        heading: 'Disclaimer',
        body: ['This website is provided “as is”. To the extent permitted by law, we disclaim liability for any loss arising from use of the information on it.'],
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    summary: 'How this website uses cookies and similar technologies.',
    updated: '6 October 2026',
    sections: [
      {
        heading: 'Cookies we use',
        body: [
          'This website does not set advertising, analytics or tracking cookies, so there is nothing to consent to and no cookie banner.',
          ...(analyticsEnabled ? [ANALYTICS_TEXT] : []),
          'Your browser may cache files (such as fonts and scripts) to make the site load faster. This is standard browser behavior and doesn’t identify you.',
        ],
      },
      {
        heading: 'Third parties',
        body: ['Fonts are served by Google Fonts. Google’s handling of that request is governed by Google’s own privacy policy.'],
      },
      {
        heading: 'Changes',
        body: ['If we introduce analytics or other cookies in future, we will update this page and ask for consent where required.'],
      },
    ],
  },
  dpa: {
    title: 'Data Processing Agreement',
    summary: 'How MediSIEM processes customer data on your behalf.',
    updated: '6 October 2026',
    sections: [
      {
        heading: 'Availability',
        body: [
          '[PLACEHOLDER: DPA terms. MediSIEM is a research prototype and has no managed deployments yet. A DPA will be drafted before any pilot that involves processing hospital data.]',
        ],
      },
      {
        heading: 'Self-hosted deployments',
        body: ['When MediSIEM is self-hosted, telemetry stays in your environment and MediSIEM does not process it as your processor.'],
      },
      {
        heading: 'Requesting the DPA',
        body: ['Contact our team to receive the current DPA and subprocessor list for review and signature.'],
      },
    ],
  },
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const d = DOCS[doc]
  usePageSeo({ ...pageMeta[`/${doc}`], path: `/${doc}` })

  return (
    <>
      <PageHero eyebrow="Legal" title={d.title} lead={d.summary} />
      <section className="section pt-12">
        <div className="container-page grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Legal documents" className="lg:pt-1">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
              {(Object.keys(DOCS) as LegalDoc[]).map((k) => (
                <li key={k}>
                  <Link
                    to={`/${k}`}
                    aria-current={k === doc ? 'page' : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm ${k === doc ? 'bg-white/5 text-slate-50' : 'text-slate-400 hover:text-slate-100'}`}
                  >
                    {DOCS[k].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <article className="max-w-3xl">
            {/* TODO(legal): remove this banner once counsel has reviewed the text. */}
            <p role="note" className="mb-8 rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-slate-200">
              [PLACEHOLDER] Draft pending legal review. This page describes what the website does today and is not yet a reviewed legal
              document.
            </p>
            <p className="font-mono text-xs text-slate-500">Last updated {d.updated}</p>
            {d.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="text-xl font-semibold tracking-tight text-slate-50">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-3 text-[15px] leading-relaxed text-slate-300">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-400">
              Questions?{' '}
              <Link to="/contact?intent=general" className="text-cyan-400 hover:text-cyan-300">
                Contact us
              </Link>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
