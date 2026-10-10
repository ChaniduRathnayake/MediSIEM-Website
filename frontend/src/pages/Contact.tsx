import { useSearchParams } from 'react-router-dom'
import { CalendarCheck, Clock, Headset, ShieldCheck } from 'lucide-react'
import { PageHero } from '../components/ui'
import LeadForm from '../components/LeadForm'
import { INTENTS, parseIntent, type Intent } from '../data/intents'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const COPY: Partial<Record<Intent, { title: string; lead: string; submit: string }>> = {
  demo: {
    title: 'Book a demo',
    lead: 'See MediSIEM rank a realistic alert stream in 30 minutes, with a security engineer — not a script.',
    submit: 'Request a demo',
  },
  quote: {
    title: 'Get a setup quote',
    lead: 'Tell us about your hospital: number of beds, connected medical devices and current IT setup. We’ll scope the one-time setup and recommend a plan.',
    submit: 'Request a quote',
  },
  sales: {
    title: 'Talk to sales',
    lead: 'Pricing, deployment options, procurement and security reviews — we’ll get you what you need.',
    submit: 'Contact sales',
  },
  expert: {
    title: 'Talk to a security expert',
    lead: 'Discuss your alert volume, critical assets and compliance obligations with one of our security engineers.',
    submit: 'Request a call',
  },
  partner: {
    title: 'Apply for early access',
    lead: 'Join our design-partner program: hands-on onboarding, roadmap influence and preferred pricing.',
    submit: 'Apply now',
  },
  security: {
    title: 'Contact our security team',
    lead: 'Report a suspected vulnerability or ask a security question. Reports go directly to our security team.',
    submit: 'Send securely',
  },
  integration: {
    title: 'Request an integration',
    lead: 'Tell us which tools you need MediSIEM to connect to. Requests directly shape our roadmap.',
    submit: 'Send request',
  },
}

const EXPECT = [
  { icon: Clock, title: 'Reply within one business day', body: 'A real person reads every message.' },
  { icon: Headset, title: 'Talk to an engineer', body: 'Demos are run by security engineers, not scripts.' },
  { icon: CalendarCheck, title: 'Tailored to your environment', body: 'We focus on your critical assets and current tools.' },
  { icon: ShieldCheck, title: 'Your details stay private', body: 'Used only to respond — never sold or shared.' },
]

export default function Contact() {
  const [params] = useSearchParams()
  const intent = parseIntent(params.get('intent'))
  const copy = COPY[intent]
  const context = [params.get('plan') && `Plan: ${params.get('plan')}`, params.get('product') && `Product: ${params.get('product')}`, params.get('topic') && `Topic: ${params.get('topic')}`]
    .filter(Boolean)
    .join(', ')

  usePageSeo({
    ...pageMeta['/contact'],
    ...(copy && { title: `${copy.title} | MediSIEM` }),
    path: '/contact',
  })

  return (
    <>
      <PageHero eyebrow="Contact" title={copy?.title ?? 'Let’s talk security.'} lead={copy?.lead ?? 'Questions about MediSIEM? Choose a topic and we’ll route you to the right team.'} />
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
