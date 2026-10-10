import { useEffect, useState } from 'react'
import { CheckCircle2, CircleAlert, Loader2, RefreshCw } from 'lucide-react'
import { PageHero } from '../components/ui'
import { api } from '../services/api'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'

type CheckState = 'checking' | 'operational' | 'degraded'

interface ServiceCheck {
  name: string
  description: string
  state: CheckState
  latencyMs?: number
}

interface ApiProbe {
  state: CheckState
  latencyMs: number
}

async function probeApi(): Promise<ApiProbe> {
  const started = performance.now()
  let state: CheckState = 'degraded'
  try {
    await api.get('/health')
    state = 'operational'
  } catch {
    state = 'degraded'
  }
  return { state, latencyMs: Math.round(performance.now() - started) }
}

// Live check of the public services this website can actually observe. It
// doesn't (and can't) report on customer consoles, which run in each
// customer's own environment.
export default function StatusPage() {
  usePageSeo({
    ...pageMeta['/status'],
    path: '/status',
  })

  const [checks, setChecks] = useState<ServiceCheck[]>([
    { name: 'Website', description: 'medisiem marketing site', state: 'operational' },
    { name: 'Public API', description: 'Contact, resources and content API', state: 'checking' },
  ])
  const [checkedAt, setCheckedAt] = useState<Date | null>(null)

  const applyResult = (result: ApiProbe) => {
    setChecks((prev) => prev.map((c) => (c.name === 'Public API' ? { ...c, ...result } : c)))
    setCheckedAt(new Date())
  }

  // Initial state is already "checking", so the first run needs no reset.
  useEffect(() => {
    let active = true
    probeApi().then((result) => {
      if (active) applyResult(result)
    })
    return () => {
      active = false
    }
  }, [])

  const runChecks = () => {
    setChecks((prev) => prev.map((c) => (c.name === 'Public API' ? { ...c, state: 'checking', latencyMs: undefined } : c)))
    void probeApi().then(applyResult)
  }

  const allOk = checks.every((c) => c.state === 'operational')
  const anyChecking = checks.some((c) => c.state === 'checking')

  return (
    <>
      <PageHero eyebrow="Status" title="System status" lead="Live status of MediSIEM’s public services. Customer consoles are monitored within each customer’s environment." />
      <section className="section pt-12">
        <div className="container-page max-w-3xl">
          <div
            className={`flex items-center gap-3 rounded-2xl border p-5 ${
              anyChecking ? 'border-slate-800 bg-card' : allOk ? 'border-emerald-500/30 bg-emerald-500/[0.06]' : 'border-amber-500/30 bg-amber-500/[0.06]'
            }`}
            role="status"
            aria-live="polite"
          >
            {anyChecking ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" aria-hidden="true" />
            ) : allOk ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            ) : (
              <CircleAlert className="h-5 w-5 text-amber-400" aria-hidden="true" />
            )}
            <p className="font-medium text-slate-50">
              {anyChecking ? 'Checking services…' : allOk ? 'All public services operational' : 'Some services are slow to respond or unavailable'}
            </p>
            <button type="button" onClick={() => void runChecks()} className="btn-ghost btn-sm ml-auto" disabled={anyChecking}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> Recheck
            </button>
          </div>

          <ul className="mt-6 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-card">
            {checks.map((c) => (
              <li key={c.name} className="flex items-center gap-4 p-5">
                <div className="flex-1">
                  <p className="font-medium text-slate-100">{c.name}</p>
                  <p className="text-sm text-slate-500">{c.description}</p>
                </div>
                {c.latencyMs !== undefined && <span className="font-mono text-xs text-slate-500">{c.latencyMs} ms</span>}
                <span
                  className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                    c.state === 'operational' ? 'text-emerald-400' : c.state === 'degraded' ? 'text-amber-400' : 'text-slate-400'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${c.state === 'operational' ? 'bg-emerald-500' : c.state === 'degraded' ? 'bg-amber-500' : 'bg-slate-500'}`}
                    aria-hidden="true"
                  />
                  {c.state === 'operational' ? 'Operational' : c.state === 'degraded' ? 'Degraded' : 'Checking'}
                </span>
              </li>
            ))}
          </ul>
          {checkedAt && <p className="mt-4 text-xs text-slate-500">Last checked {checkedAt.toLocaleTimeString()}</p>}
          <p className="mt-2 text-xs text-slate-500">
            The API runs on infrastructure that may take a few seconds to wake after inactivity; a single slow check isn’t necessarily an outage.
          </p>
        </div>
      </section>
    </>
  )
}
