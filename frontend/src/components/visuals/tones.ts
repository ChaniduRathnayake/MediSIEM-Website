import type { Tier } from '../../data/demoTelemetry'

// Status color tokens shared by the chart primitives and dashboards. Color is
// always paired with a text label where it's shown.
export type Tone = 'critical' | 'warning' | 'success' | 'info' | 'neutral'

export const toneClasses: Record<Tone, { dot: string; badge: string; text: string }> = {
  critical: { dot: 'bg-red-500', badge: 'border-red-500/30 bg-red-500/10 text-red-300', text: 'text-red-400' },
  warning: { dot: 'bg-amber-500', badge: 'border-amber-500/30 bg-amber-500/10 text-amber-300', text: 'text-amber-400' },
  success: { dot: 'bg-emerald-500', badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300', text: 'text-emerald-400' },
  info: { dot: 'bg-cyan-400', badge: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300', text: 'text-cyan-400' },
  neutral: { dot: 'bg-slate-500', badge: 'border-slate-700 bg-slate-800/60 text-slate-300', text: 'text-slate-400' },
}

export const tierTone: Record<Tier, Tone> = { Immediate: 'critical', Investigate: 'warning', Monitor: 'success' }
