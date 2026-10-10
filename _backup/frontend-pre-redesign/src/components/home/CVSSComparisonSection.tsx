import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, Bug, HeartPulse, ShieldX } from 'lucide-react'
import { comparisonAlerts, type ComparisonAlert } from '../../data/comparisonScenario'
import { getCASAction } from '../../utils/casAction'
import Reveal from '../Reveal'

type Mode = 'cvss' | 'cas'

const ICONS: Record<ComparisonAlert['id'], typeof HeartPulse> = {
  'icu-dos': HeartPulse,
  'radiology-ransomware': Bug,
  'admin-malware': ShieldX,
}

function getCvssSeverity(score: number) {
  if (score >= 9) return { label: 'Critical', classes: 'border-red-500/30 bg-red-500/10 text-red-400' }
  if (score >= 7) return { label: 'High', classes: 'border-orange-500/30 bg-orange-500/10 text-orange-400' }
  if (score >= 4) return { label: 'Medium', classes: 'border-amber-500/30 bg-amber-500/10 text-amber-400' }
  return { label: 'Low', classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' }
}

export default function CVSSComparisonSection() {
  const [mode, setMode] = useState<Mode>('cvss')

  const sorted = useMemo(
    () => [...comparisonAlerts].sort((a, b) => (mode === 'cvss' ? b.cvss - a.cvss : b.cas - a.cas)),
    [mode]
  )

  // FLIP reorder animation: measure each row's position before this render's
  // DOM update lands (stored from the previous run), measure again after,
  // then animate the delta away with a CSS transform. No library needed.
  const itemRefs = useRef(new Map<string, HTMLDivElement>())
  const prevRects = useRef(new Map<string, DOMRect>())

  useLayoutEffect(() => {
    const newRects = new Map<string, DOMRect>()
    itemRefs.current.forEach((el, id) => newRects.set(id, el.getBoundingClientRect()))

    itemRefs.current.forEach((el, id) => {
      const prev = prevRects.current.get(id)
      const next = newRects.get(id)
      if (prev && next) {
        const deltaY = prev.top - next.top
        if (Math.abs(deltaY) > 0.5) {
          el.style.transition = 'none'
          el.style.transform = `translateY(${deltaY}px)`
          requestAnimationFrame(() => {
            el.style.transition = 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
            el.style.transform = ''
          })
        }
      }
    })

    prevRects.current = newRects
  }, [sorted])

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Same Night Shift, Two Rankings</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Three alerts fire within minutes of each other. Toggle the ranking method and watch which one
            CAAP sends to the top.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900/60 p-1">
            <button
              type="button"
              onClick={() => setMode('cvss')}
              aria-pressed={mode === 'cvss'}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === 'cvss' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Rank by CVSS
            </button>
            <button
              type="button"
              onClick={() => setMode('cas')}
              aria-pressed={mode === 'cas'}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === 'cas' ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Rank by CAAP (CAS)
            </button>
          </div>
        </Reveal>

        <div className="relative mt-8 space-y-4">
          {sorted.map((alert, index) => {
            const Icon = ICONS[alert.id] ?? AlertTriangle
            const action = getCASAction(alert.cas)
            const severity = getCvssSeverity(alert.cvss)
            const isTop = index === 0

            return (
              <div
                key={alert.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(alert.id, el)
                  else itemRefs.current.delete(alert.id)
                }}
                className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors duration-300 sm:gap-4 sm:p-5 ${
                  isTop
                    ? 'border-cyan-500/50 bg-cyan-500/5 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 sm:h-9 sm:w-9 ${
                    isTop ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {index + 1}
                </span>

                <div
                  className={`hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:flex ${
                    isTop ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-white sm:text-base">{alert.title}</h3>
                  <p className="truncate text-xs text-slate-500">{alert.device}</p>
                </div>

                <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${
                      mode === 'cvss' ? severity.classes : 'border-slate-700 bg-slate-800/60 text-slate-500'
                    }`}
                  >
                    CVSS {alert.cvss.toFixed(1)}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${
                      mode === 'cas' ? action.classes : 'border-slate-700 bg-slate-800/60 text-slate-500'
                    }`}
                  >
                    CAS {alert.cas.toFixed(1)} &middot; {action.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <Reveal delayMs={150} className="mt-6 text-center text-xs text-slate-500">
          Illustrative scenario using the documented CAS formula — not recorded production alerts.
        </Reveal>
      </div>
    </section>
  )
}
