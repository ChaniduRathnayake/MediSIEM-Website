export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  /** The specific, measured result this customer achieved. */
  result: string
}

// Real customer quotes only. Each needs written approval from the named
// person. Leave empty until then: the Customers section shows the
// early-access program instead of fabricated testimonials.
export const testimonials: Testimonial[] = []

export interface OutcomeMetric {
  id: string
  label: string
  description: string
  // null = not yet measured with customers. Never replace with an invented
  // number. Fill in only from real pilot results.
  value: string | null
}

export const outcomeMetrics: OutcomeMetric[] = [
  {
    id: 'investigation-time',
    label: 'Investigation time',
    description: 'Time from alert to triage decision, before vs. after MediSIEM.',
    value: null,
  },
  {
    id: 'alert-fatigue',
    label: 'Alerts needing human review',
    description: 'Share of daily alerts that land in the Immediate or Investigate tiers.',
    value: null,
  },
  {
    id: 'response-time',
    label: 'Time to contain',
    description: 'Mean time from detection to containment on critical assets.',
    value: null,
  },
  {
    id: 'audit-prep',
    label: 'Audit preparation',
    description: 'Analyst hours spent assembling evidence for an audit.',
    value: null,
  },
]
