import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Info } from 'lucide-react'
import Logo from '../components/Logo'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

// MediSIEM consoles are provisioned per customer (managed or self-hosted),
// so there's no central password login on the marketing site. This page
// routes customers to their own console URL instead of collecting
// credentials it can't verify.
// TODO(login): set to the managed console host (e.g. 'console.medisiem.app')
// once that domain is live. While null, the form never redirects anywhere —
// it tells the visitor how to reach their console instead.
const CONSOLE_HOST: string | null = null

export default function LoginPage() {
  usePageSeo({
    ...pageMeta['/login'],
    path: '/login',
  })

  const [workspace, setWorkspace] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const slug = workspace.trim().toLowerCase()
    if (!/^[a-z0-9-]{2,63}$/.test(slug)) {
      setError('Use letters, numbers and hyphens only — e.g. “northbridge-health”.')
      return
    }
    if (!CONSOLE_HOST) {
      setError('Managed console sign-in links are shared during onboarding. Please use the link from your welcome email, or contact support.')
      return
    }
    window.location.assign(`https://${slug}.${CONSOLE_HOST}`)
  }

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden py-16">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="glow-cyan absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2" aria-hidden="true" />
      <div className="container-page">
        <div className="card mx-auto max-w-md p-8 sm:p-10">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-50">Log in to your console</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your organization’s workspace name to continue to its sign-in page.</p>
          <form onSubmit={handleSubmit} className="mt-8" noValidate>
            <label htmlFor="workspace" className="label">
              Workspace
            </label>
            <div className="mt-1.5 flex items-stretch overflow-hidden rounded-xl border border-slate-700 bg-slate-950/60 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/25">
              <input
                id="workspace"
                type="text"
                autoComplete="organization"
                autoCapitalize="none"
                spellCheck={false}
                value={workspace}
                onChange={(e) => {
                  setWorkspace(e.target.value)
                  setError('')
                }}
                placeholder="your-org"
                className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none"
                aria-invalid={!!error}
                aria-describedby={error ? 'workspace-error' : 'workspace-hint'}
              />
              <span className="flex items-center border-l border-slate-800 px-3 font-mono text-xs text-slate-500">.{CONSOLE_HOST ?? 'console.medisiem.app'}</span>
            </div>
            {error ? (
              <p id="workspace-error" className="mt-2 text-xs text-red-300" role="alert">
                {error}
              </p>
            ) : (
              <p id="workspace-hint" className="mt-2 text-xs text-slate-500">
                Self-hosted? Use your internal MediSIEM URL instead.
              </p>
            )}
            <button type="submit" className="btn-primary mt-6 w-full">
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
          <div className="mt-8 flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-xs leading-relaxed text-slate-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
            <p>
              Don’t know your workspace? Ask your MediSIEM administrator, or{' '}
              <Link to="/contact?intent=general" className="text-cyan-400 hover:text-cyan-300">
                contact support
              </Link>
              .
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            New to MediSIEM?{' '}
            <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
