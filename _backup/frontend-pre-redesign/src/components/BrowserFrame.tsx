import type { PropsWithChildren } from 'react'

interface BrowserFrameProps {
  url?: string
  className?: string
}

export default function BrowserFrame({
  url = 'medisiem.app',
  className = '',
  children,
}: PropsWithChildren<BrowserFrameProps>) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/30 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 truncate rounded-md bg-slate-800/60 px-3 py-1 text-xs text-slate-500">{url}</span>
      </div>
      <div className="bg-slate-950">{children}</div>
    </div>
  )
}
