import { useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import Logo from '../components/Logo'
import LeadForm from '../components/LeadForm'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const STEPS = [
  { title: 'Tell us about your hospital', body: 'Your connected devices, which ones sustain life, and the SIEM you run today.' },
  { title: 'Scope the pilot together', body: 'Agree which network segment and devices to start with. [PLACEHOLDER: pilot duration and success criteria]' },
  { title: 'Build the device registry', body: 'Assign clinical criticality and life-sustaining designations, then connect to your Wazuh pipeline.' },
]

// Kept at /signup so old "Get started" links still land somewhere useful.
// MediSIEM has no self-serve accounts: this captures a pilot request.
export default function SignupPage() {
  const [params] = useSearchParams()
  const product = params.get('product')
  const context = product ? `Product: ${product}` : ''

  usePageSeo({
    ...pageMeta['/signup'],
    path: '/signup',
  })

  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-cyan absolute -top-40 -left-40 -z-10 h-[600px] w-[800px]" aria-hidden="true" />
      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Logo />
          <h1 className="display-title mt-10 text-balance">Request a MediSIEM pilot.</h1>
          <p className="lead mt-5 max-w-lg">
            See your own alerts ranked by clinical impact, alongside the Wazuh deployment you already run. MediSIEM is a research
            prototype, so every pilot is scoped and set up with the team.
          </p>
          <ol className="mt-10 space-y-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 font-mono text-xs text-cyan-300">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-100">{s.title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {['Runs alongside your existing SIEM', 'Your data stays yours', 'Human approval on every clinical action'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 sm:p-10">
          <h2 className="text-xl font-semibold text-slate-50">Pilot request</h2>
          <div className="mt-8">
            <LeadForm intent="pilot" context={context || undefined} submitLabel="Request a pilot" allowTopicChange={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
