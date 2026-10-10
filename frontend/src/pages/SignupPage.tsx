import { Link, useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import Logo from '../components/Logo'
import LeadForm from '../components/LeadForm'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

const STEPS = [
  { title: 'Tell us about your environment', body: 'Size, key systems and the tools you already run.' },
  { title: 'Scoping call with an engineer', body: '30 minutes to agree which segment to connect first.' },
  { title: 'Connect and see your alerts ranked', body: 'Guided onboarding — usually live within days.' },
]

// "Get Started" / "Start Free Trial". Trials are onboarded by our team while
// MediSIEM is in early access, so this captures a trial request rather than
// creating a self-serve account.
export default function SignupPage() {
  const [params] = useSearchParams()
  const plan = params.get('plan')
  const product = params.get('product')
  const context = [plan && `Plan: ${plan}`, product && `Product: ${product}`].filter(Boolean).join(', ')

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
          <h1 className="display-title mt-10 text-balance">Start your guided trial.</h1>
          <p className="lead mt-5 max-w-lg">
            Connect part of your environment and see your own alerts ranked by what’s at stake. During early access, every trial is set up
            with one of our engineers.
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
            {['No credit card required', 'Your data stays yours', 'Cancel any time'].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6 sm:p-10">
          <h2 className="text-xl font-semibold text-slate-50">Request your trial</h2>
          <p className="mt-1 text-sm text-slate-400">
            Already a customer?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
              Log in
            </Link>
          </p>
          <div className="mt-8">
            <LeadForm intent="trial" context={context || undefined} submitLabel="Start Free Trial" allowTopicChange={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
