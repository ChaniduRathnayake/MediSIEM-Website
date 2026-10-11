interface LogoProps {
  className?: string
  /** Hide the wordmark and show only the mark (e.g. very small screens). */
  markOnly?: boolean
}

// Hexagonal "node" mark: a shield-like hex with a single prioritized node:
// echoes the network-topology visual language rather than a padlock.
export default function Logo({ className = '', markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <path
          d="M16 2.5 27.7 9.25v13.5L16 29.5 4.3 22.75V9.25z"
          fill="var(--color-card)"
          stroke="var(--color-cyan-400)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M10 13.2 16 9.7l6 3.5v6.9l-6 3.5-6-3.5z" fill="none" stroke="var(--color-slate-800)" strokeWidth="1.4" />
        <path d="M16 9.7v6.6m0 0 6-3.1m-6 3.1-6-3.1" stroke="var(--color-slate-700)" strokeWidth="1.2" />
        <circle cx="16" cy="16.3" r="2.6" fill="var(--color-cyan-400)" />
      </svg>
      {!markOnly && (
        <span className="text-[1.15rem] font-semibold tracking-[-0.02em] text-slate-50">
          Medi<span className="text-cyan-400">SIEM</span>
        </span>
      )}
    </span>
  )
}
