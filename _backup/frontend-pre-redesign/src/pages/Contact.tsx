import { useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { submitContactMessage } from '../services/api'
import { usePageSeo } from '../hooks/usePageSeo'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  usePageSeo({
    title: 'Contact | MediSIEM',
    description: 'Get in touch with the MediSIEM team about the platform or the CAAP scoring engine.',
    path: '/contact',
  })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      await submitContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <PageHeader title="Contact" subtitle="Questions about MediSIEM or the CAAP scoring engine? Get in touch." />
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                required
                minLength={10}
                rows={5}
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-300 disabled:opacity-60 disabled:hover:bg-cyan-400"
            >
              <Send className="h-4 w-4" />
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-cyan-400">Message sent. Thank you for reaching out.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again, or email us directly below.
              </p>
            )}
          </form>

          <div className="mt-6 flex items-center gap-2 border-t border-slate-800 pt-6 text-sm text-slate-400">
            <Mail className="h-4 w-4 text-cyan-400" />
            <span>We typically respond within one business day.</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
