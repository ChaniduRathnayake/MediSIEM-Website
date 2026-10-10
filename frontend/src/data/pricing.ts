// Safety-as-a-Service pricing: a one-time setup fee for hospital-specific
// IoMT integration, then a flat monthly subscription that keeps the clinical
// decision logic, thresholds and safety playbooks up to date. The model and
// the 15,000–20,000 LKR/month range come from the commercialization plan.
//
// TODO(pricing): how plans split across that range (and the scope of each
// plan) is a placeholder. Confirm with the business before launch. The setup
// fee is quoted per hospital after a site survey, so no amount is listed.

export const CURRENCY = 'LKR'

const lkr = new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 })
export const formatPrice = (amount: number) => `${CURRENCY} ${lkr.format(amount)}`

export interface PricingPlan {
  id: 'essential' | 'clinical' | 'cluster'
  name: string
  audience: string
  /** Monthly subscription in LKR, or null for "Custom". */
  monthlyPrice: number | null
  unit: string
  description: string
  highlights: string[]
  cta: { label: string; to: string }
  featured?: boolean
}

export const plans: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    audience: 'For small private hospitals getting their first real visibility.',
    monthlyPrice: 15000,
    unit: 'per hospital · single site',
    description: 'Impact-aware monitoring with clinician approval built in.',
    highlights: [
      'Core SIEM: collection, correlation, search',
      'Clinical Alert Score with action tiers',
      'Clinician approval before any action on a life-critical device',
      'Standard non-disruptive safety playbooks',
      'Monthly decision-logic and threshold updates',
      '30-day event retention · email support',
    ],
    cta: { label: 'Get a setup quote', to: '/contact?intent=quote&plan=essential' },
  },
  {
    id: 'clinical',
    name: 'Clinical',
    audience: 'For hospitals with ICU, theatre and other connected clinical equipment.',
    monthlyPrice: 20000,
    unit: 'per hospital · single site',
    description: 'Everything in Essential, plus intelligence, compliance and tuning.',
    highlights: [
      'Everything in Essential',
      'Clinician push notifications for approvals',
      'Threat intelligence & IP reputation (MISP)',
      'Playbooks tuned to your hospital’s devices',
      'Compliance mapping and evidence exports',
      '90-day event retention · priority support',
    ],
    cta: { label: 'Get a setup quote', to: '/contact?intent=quote&plan=clinical' },
    featured: true,
  },
  {
    id: 'cluster',
    name: 'Healthcare Cluster',
    audience: 'For public healthcare clusters and multi-site hospital groups.',
    monthlyPrice: null,
    unit: 'priced per cluster',
    description: 'One console across every hospital in the cluster.',
    highlights: [
      'Everything in Clinical, for every site',
      'Cluster-wide view with per-hospital drill-down',
      'Self-hosted or government-cloud deployment',
      'Custom retention and data residency',
      'Dedicated customer success manager',
      'Contractual SLAs and DPA',
    ],
    cta: { label: 'Talk to sales', to: '/contact?intent=sales&plan=cluster' },
  },
]

/** The two parts of the Safety-as-a-Service model, shown above the plans. */
export const revenueModel = [
  {
    id: 'setup',
    badge: 'One-time',
    title: 'Setup fee',
    price: 'Quoted per hospital',
    body: 'Hospital-specific IoMT integration: a site survey, connected-device inventory, clinician approval routing and staff onboarding.',
  },
  {
    id: 'subscription',
    badge: 'Monthly',
    title: 'Subscription',
    price: `${formatPrice(15000)} – ${lkr.format(20000)} / month`,
    body: 'Continuous updates to the clinical decision logic, alert thresholds and safety playbooks, at a fraction of the cost of enterprise SOC tooling.',
  },
] as const

export interface ComparisonRow {
  feature: string
  group: string
  /** true = included, false = not included, string = included with note. */
  values: Record<PricingPlan['id'], boolean | string>
}

export const comparisonRows: ComparisonRow[] = [
  { group: 'Platform', feature: 'Log collection & correlation', values: { essential: true, clinical: true, cluster: true } },
  { group: 'Platform', feature: 'Hospital sites', values: { essential: '1', clinical: '1', cluster: 'Multiple' } },
  { group: 'Platform', feature: 'Event retention', values: { essential: '30 days', clinical: '90 days', cluster: 'Custom' } },
  { group: 'Platform', feature: 'Deployment', values: { essential: 'Managed', clinical: 'Managed', cluster: 'Managed, self-hosted or gov. cloud' } },
  { group: 'Detection', feature: 'Clinical Alert Score', values: { essential: true, clinical: true, cluster: true } },
  { group: 'Detection', feature: 'Anomaly & behavioral detection', values: { essential: true, clinical: true, cluster: true } },
  { group: 'Detection', feature: 'Threat intelligence (MISP)', values: { essential: false, clinical: true, cluster: true } },
  { group: 'Safety', feature: 'Clinician approval before device isolation', values: { essential: true, clinical: true, cluster: true } },
  { group: 'Safety', feature: 'Non-disruptive safety playbooks', values: { essential: 'Standard', clinical: 'Tuned to your devices', cluster: 'Tuned per site' } },
  { group: 'Safety', feature: 'Clinician push notifications', values: { essential: false, clinical: true, cluster: true } },
  { group: 'Safety', feature: 'Tamper-evident audit ledger', values: { essential: true, clinical: true, cluster: true } },
  { group: 'Compliance', feature: 'Framework control mapping', values: { essential: false, clinical: true, cluster: true } },
  { group: 'Compliance', feature: 'Evidence exports', values: { essential: false, clinical: true, cluster: true } },
  { group: 'Service', feature: 'Decision-logic & threshold updates', values: { essential: 'Monthly', clinical: 'Monthly', cluster: 'Monthly' } },
  { group: 'Service', feature: 'Support', values: { essential: 'Email', clinical: 'Priority', cluster: 'Dedicated CSM' } },
  { group: 'Service', feature: 'Contractual SLA', values: { essential: false, clinical: false, cluster: true } },
]

export const pricingFaqs = [
  {
    q: 'What does the one-time setup fee cover?',
    a: 'Everything needed to fit MediSIEM to your hospital: a site survey, an inventory of your connected medical (IoMT) devices, integration with your network, routing approval requests to the right clinicians, and onboarding for your IT team. We quote it per hospital after the survey.',
  },
  {
    q: 'What does the monthly subscription pay for?',
    a: 'Ongoing updates to the logic behind every Alert Score: the clinical decision weights, alert thresholds and safety playbooks, plus platform updates and support. Threats change every month, so the logic does too.',
  },
  {
    q: 'Will MediSIEM ever shut down a medical device on its own?',
    a: 'No. Any response that would cut off a life-critical device waits for a clinician’s approval, and every decision is written to a tamper-evident audit ledger.',
  },
  {
    q: 'Is MediSIEM open source?',
    a: 'It’s an open-source hybrid. MediSIEM is built on proven open-source tools, Wazuh for detection and Shuffle for response orchestration. The clinical decision logic, thresholds and safety playbooks on top are our own.',
  },
  {
    q: 'Which hospitals is this pricing for?',
    a: 'Public healthcare clusters and small-to-medium private hospitals, starting in Sri Lanka. If you are elsewhere, or a larger group, talk to us about a quote.',
  },
  {
    q: 'Can we host MediSIEM ourselves?',
    a: 'Yes, on the Healthcare Cluster plan. MediSIEM is containerized and can run on-premises or in a government or private cloud, so telemetry never leaves your environment.',
  },
  {
    q: 'Can we try it before we commit?',
    a: 'Yes. We start with a guided pilot on part of your network, so you see your own alerts ranked by patient impact before you sign up.',
  },
]
