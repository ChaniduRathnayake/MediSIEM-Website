import { useSearchParams } from 'react-router-dom'
import { FlaskConical, Mail, ShieldCheck, Stethoscope } from 'lucide-react'
import { PageHero } from '../components/ui'
import LeadForm from '../components/LeadForm'
import { INTENTS, parseIntent, type Intent } from '../data/intents'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const COPY: Partial<Record<Intent, { title: string; lead: string; submit: string }>> = {
  pilot: {
    title: 'Request a pilot',
    lead: 'Tell us about your hospital, its connected medical devices and the SIEM you run today. We will get back to you to scope a pilot alongside your existing Wazuh deployment.',
    submit: 'Request a pilot',
  },
  research: {
    title: 'Research collaboration',
    lead: 'Interested in clinician-sourced ground truth, new device types or evaluating MediSIEM on your data? Tell us what you have in mind.',
    submit: 'Send enquiry',
  },
  enterprise: {
    title: 'Talk to us about a deployment',
    lead: 'Tell us about your network, your device inventory and what you would need validated before a deployment.',
    submit: 'Contact us',
  },
  demo: {
    title: 'Book a walkthrough',
    lead: 'See the research prototype rank and respond to simulated hospital alerts, walked through by the team that built it.',
    submit: 'Request a walkthrough',
  },
  expert: {
    title: 'Talk to the team',
    lead: 'Discuss your alert volume, your life-sustaining devices and how clinical context could change your triage.',
    submit: 'Request a call',
  },
  partner: {
    title: 'Become a design partner',
    lead: 'Help shape MediSIEM by piloting it early and giving the team feedback from a real clinical environment.',
    submit: 'Apply',
  },
  security: {
    title: 'Report a security issue',
    lead: 'Report a suspected vulnerability in this website or in MediSIEM. Please include steps to reproduce.',
    submit: 'Send report',
  },
  integration: {
    title: 'Request an integration',
    lead: 'Tell us which tools you need MediSIEM to connect to. Requests help us decide what to build next.',
    submit: 'Send request',
  },
}

// Only promises we can keep: no response-time guarantees until we can staff them.
const EXPECT = [
  { icon: Mail, title: 'A reply from the team', body: 'Messages are read by the people who built MediSIEM.' },
  { icon: FlaskConical, title: 'Honest about the stage', body: 'MediSIEM is a research prototype. We will tell you what has and has not been validated.' },
  { icon: Stethoscope, title: 'Focused on your devices', body: 'Conversations start from your device inventory and the SIEM you already run.' },
  { icon: ShieldCheck, title: 'Your details stay private', body: 'Used only to respond to your enquiry, and never sold.' },
]

export default function Contact() {
  const [params] = useSearchParams()
  const intent = parseIntent(params.get('intent'))
  const copy = COPY[intent]
  const context = [params.get('product') && `Product: ${params.get('product')}`, params.get('topic') && `Topic: ${params.get('topic')}`]
    .filter(Boolean)
    .join(', ')

  usePageSeo({
    ...pageMeta['/contact'],
    ...(copy && { title: `${copy.title} | MediSIEM` }),
    path: '/contact',
  })

  return (
    <>
      <PageHero eyebrow="Contact" title={copy?.title ?? 'Talk to the MediSIEM team.'} lead={copy?.lead ?? 'Questions about MediSIEM or the research behind it? Choose a topic and tell us what you need.'} />
      <section className="section pt-12 sm:pt-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="card p-6 sm:p-10">
            <LeadForm key={intent} intent={intent} context={context || undefined} submitLabel={copy?.submit ?? 'Send message'} />
          </div>
          <aside aria-label="What to expect" className="space-y-6 lg:pt-4">
            <h2 className="text-lg font-semibold text-slate-50">What to expect</h2>
            <ul className="space-y-5">
              {EXPECT.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="icon-tile h-10 w-10">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="border-t border-slate-800 pt-6 text-xs text-slate-500">
              Topic selected: <span className="text-slate-300">{INTENTS[intent]}</span>
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
