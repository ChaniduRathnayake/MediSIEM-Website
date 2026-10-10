export interface CASAction {
  label: 'Immediate' | 'Investigate' | 'Monitor'
  classes: string
}

// Single source of truth for the CAS -> action thresholds, shared by the
// CAS calculator and the CVSS-vs-CAAP comparison demo.
export function getCASAction(cas: number): CASAction {
  if (cas >= 8) {
    return { label: 'Immediate', classes: 'border-red-500/30 bg-red-500/10 text-red-400' }
  }
  if (cas >= 5) {
    return { label: 'Investigate', classes: 'border-amber-500/30 bg-amber-500/10 text-amber-400' }
  }
  return { label: 'Monitor', classes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' }
}
