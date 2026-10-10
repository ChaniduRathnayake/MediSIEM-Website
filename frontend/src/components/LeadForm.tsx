import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitContactMessage } from '../services/api'
import { INTENTS, type Intent } from '../data/intents'
import { trackEvent } from '../utils/analytics'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

interface LeadFormProps {
  intent: Intent
  /** Extra context appended to the message, e.g. selected plan or product. */
  context?: string
  submitLabel?: string
  /** Lets the visitor change the topic (Contact page); hidden on focused flows. */
  allowTopicChange?: boolean
}

// The backend contact API accepts {name, email, message}. Company, role and
// topic are folded into the message so no backend change is needed.
export default function LeadForm({ intent: initialIntent, context, submitLabel, allowTopicChange = true }: LeadFormProps) {
  const uid = useId()
  const [intent, setIntent] = useState<Intent>(initialIntent)
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', message: '' })
  // Honeypot: hidden from people and assistive tech; bots that fill every
  // field fill this too, and the API silently discards those submissions.
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    const lines = [`[${INTENTS[intent]}]`]
    if (form.company) lines.push(`Company: ${form.company}`)
    if (form.role) lines.push(`Role: ${form.role}`)
    if (context) lines.push(`Context: ${context}`)
    lines.push('', form.message || '(No additional message)')
    try {
      await submitContactMessage({ name: form.name, email: form.email, message: lines.join('\n').slice(0, 2000), website })
      setStatus('success')
      trackEvent('Lead', { intent })
      setForm({ name: '', email: '', company: '', role: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-slate-50">Thanks — we’ve got it.</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-400">A member of our team will reply within one business day.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary btn-sm mt-6">
          Send another message
        </button>
      </div>
    )
  }

  const id = (name: string) => `${uid}-${name}`

  return (
    <form onSubmit={handleSubmit} className="relative grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id('website')}>Leave this field empty</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {allowTopicChange && (
        <div className="sm:col-span-2">
          <label htmlFor={id('topic')} className="label">
            How can we help?
          </label>
          <select id={id('topic')} value={intent} onChange={(e) => setIntent(e.target.value as Intent)} className="field">
            {(Object.keys(INTENTS) as Intent[]).map((k) => (
              <option key={k} value={k}>
                {INTENTS[k]}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor={id('name')} className="label">
          Full name <span className="text-cyan-400" aria-hidden="true">*</span>
        </label>
        <input id={id('name')} type="text" required maxLength={100} autoComplete="name" value={form.name} onChange={set('name')} className="field" />
      </div>
      <div>
        <label htmlFor={id('email')} className="label">
          Work email <span className="text-cyan-400" aria-hidden="true">*</span>
        </label>
        <input id={id('email')} type="email" required autoComplete="email" value={form.email} onChange={set('email')} className="field" />
      </div>
      <div>
        <label htmlFor={id('company')} className="label">
          Company
        </label>
        <input id={id('company')} type="text" autoComplete="organization" maxLength={120} value={form.company} onChange={set('company')} className="field" />
      </div>
      <div>
        <label htmlFor={id('role')} className="label">
          Job title
        </label>
        <input id={id('role')} type="text" autoComplete="organization-title" maxLength={120} value={form.role} onChange={set('role')} className="field" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id('message')} className="label">
          {intent === 'security' ? 'Describe the issue' : 'Anything we should know?'}{' '}
          {intent === 'security' && (
            <span className="text-cyan-400" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <textarea
          id={id('message')}
          rows={4}
          maxLength={1500}
          required={intent === 'security'}
          value={form.message}
          onChange={set('message')}
          className="field resize-y"
          placeholder={intent === 'security' ? 'Affected component, steps to reproduce, impact…' : 'Environment size, tools you use, what you want to see…'}
        />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          By submitting, you agree to our{' '}
          <Link to="/privacy" className="underline decoration-slate-700 underline-offset-2 hover:text-slate-300">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" disabled={status === 'submitting'} className="btn-primary">
          {status === 'submitting' ? 'Sending…' : (submitLabel ?? 'Submit')}
          {status !== 'submitting' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      {status === 'error' && (
        <p className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-300 sm:col-span-2" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Something went wrong sending your message. Please try again in a moment.
        </p>
      )}
    </form>
  )
}
