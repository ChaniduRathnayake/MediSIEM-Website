import { useId, type KeyboardEvent } from 'react'
import { FlaskConical, Info } from 'lucide-react'
import { RESEARCH_FOOTNOTE } from '../data/research'

/** Mandatory caveat shown beside every block of research results. */
export function ResearchFootnote({ className = '' }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-xs leading-relaxed text-slate-500 ${className}`}>
      <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
      <span>{RESEARCH_FOOTNOTE}</span>
    </p>
  )
}

/**
 * Small info button with a tooltip. Opens on hover and on keyboard focus (and
 * on tap, which focuses the button); Escape closes it. The text is linked with
 * aria-describedby, so screen readers announce it either way.
 */
export function InfoTip({ text, label }: { text: string; label: string }) {
  const id = useId()
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') e.currentTarget.blur()
  }
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-describedby={id}
        aria-label={`More about ${label}`}
        onKeyDown={onKeyDown}
        className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white/5 hover:text-cyan-400"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none invisible absolute right-0 bottom-full z-30 mb-2 w-64 rounded-xl border border-slate-700 bg-slate-900 p-3 text-left text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}

/** Heartbeat trace used as the hero motif. Decorative; draws itself once, then holds. */
export function EcgLine({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={className} aria-hidden="true" focusable="false">
      <path
        d="M0 70 H330 l18 -8 l14 8 H420 l12 -46 l18 92 l16 -70 l12 24 H560 l14 -10 l14 10 H760 l12 -46 l18 92 l16 -70 l12 24 H900 l14 -10 l14 10 H1200"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="animate-ecg stroke-cyan-400 [stroke-dasharray:1] [stroke-dashoffset:0]"
      />
    </svg>
  )
}
