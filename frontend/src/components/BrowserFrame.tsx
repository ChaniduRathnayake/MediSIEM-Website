import type { PropsWithChildren, ReactNode } from 'react'

interface BrowserFrameProps {
  url?: string
  className?: string
  /** Right-aligned slot in the title bar, e.g. a "Sample data" tag. */
  aside?: ReactNode
}

// Product "console" chrome used around every dashboard visualization.
export default function BrowserFrame({ url = 'console.medisiem.app', className = '', aside, children }: PropsWithChildren<BrowserFrameProps>) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-800 bg-card shadow-[0_40px_80px_-32px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.02)_inset] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-950/50 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>
        <span className="min-w-0 truncate rounded-md border border-slate-800 bg-slate-900/80 px-3 py-0.5 font-mono text-[11px] text-slate-500">
          {url}
        </span>
        {aside && <div className="ml-auto shrink-0">{aside}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}

export function SampleDataTag({ label = 'Sample data' }: { label?: string }) {
  return (
    <span className="rounded-full border border-slate-700/80 px-2 py-0.5 font-mono text-[10px] tracking-wide text-slate-500 uppercase">
      {label}
    </span>
  )
}
