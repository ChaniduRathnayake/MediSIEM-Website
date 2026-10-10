import type { PropsWithChildren } from 'react'

export default function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm shadow-black/20 ${className}`}
    >
      {children}
    </div>
  )
}
