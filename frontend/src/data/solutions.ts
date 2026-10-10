import type { LucideIcon } from 'lucide-react'
import {
  Bug,
  Cloud,
  ClipboardCheck,
  Laptop,
  MonitorDot,
  Network,
  Radar,
  Siren,
} from 'lucide-react'

export interface Solution {
  slug: string
  title: string
  icon: LucideIcon
  /** One-line problem statement from the buyer's point of view. */
  challenge: string
  /** How MediSIEM addresses it. */
  approach: string
  benefits: string[]
  /** Product slugs (see products.ts) that deliver this use case. */
  products: string[]
}

export const solutions: Solution[] = [
  {
    slug: 'soc-monitoring',
    title: 'SOC Monitoring',
    icon: MonitorDot,
    challenge: 'Analysts face thousands of alerts a day and can’t tell which ones matter.',
    approach:
      'A single prioritized queue, ranked by business impact, with the context needed to decide in one view.',
    benefits: [
      'One queue instead of many consoles',
      'Impact-ranked alerts with clear next steps',
      'Shift handover built on a shared case timeline',
    ],
    products: ['siem', 'threat-detection', 'incident-response'],
  },
  {
    slug: 'threat-detection',
    title: 'Threat Detection',
    icon: Radar,
    challenge: 'Signature-only tools miss novel attacks and drown teams in false positives.',
    approach:
      'Machine-learning classification and anomaly detection, enriched with threat intelligence and scored by impact.',
    benefits: [
      'Detect known and never-before-seen behavior',
      'Fewer false positives reaching analysts',
      'Explainable reasoning behind every detection',
    ],
    products: ['threat-detection', 'threat-intelligence', 'network-security'],
  },
  {
    slug: 'incident-response',
    title: 'Incident Response',
    icon: Siren,
    challenge: 'Response is slow, inconsistent, and hard to evidence afterwards.',
    approach:
      'Recommended actions, human approval gates for critical systems, and a tamper-evident record of everything done.',
    benefits: [
      'Consistent response regardless of who is on shift',
      'No unplanned outages from automated actions',
      'Regulator-ready incident evidence',
    ],
    products: ['incident-response', 'siem'],
  },
  {
    slug: 'vulnerability-management',
    title: 'Vulnerability Management',
    icon: Bug,
    challenge: 'Patch backlogs grow faster than teams can work through them.',
    approach: 'Rank vulnerabilities by asset criticality and active exploitation, then track remediation to closure.',
    benefits: [
      'Patch the riskiest exposure first',
      'Clear ownership and deadlines',
      'Trend reporting leadership understands',
    ],
    products: ['vulnerability-management', 'endpoint-security'],
  },
  {
    slug: 'compliance',
    title: 'Compliance',
    icon: ClipboardCheck,
    challenge: 'Audits mean weeks of manually collecting logs and screenshots.',
    approach: 'Continuous control mapping and evidence exports backed by an immutable audit trail.',
    benefits: [
      'Always-current compliance posture',
      'Evidence exports in minutes',
      'Defensible records of every response decision',
    ],
    products: ['compliance-management', 'siem', 'incident-response'],
  },
  {
    slug: 'endpoint-protection',
    title: 'Endpoint Protection',
    icon: Laptop,
    challenge: 'Endpoints and connected devices are the most common way in — and the hardest to see.',
    approach: 'Agent-based monitoring where possible, network-based monitoring where agents can’t run.',
    benefits: [
      'Coverage for managed and unmanaged devices',
      'Integrity and configuration drift detection',
      'Criticality-aware alerting per device',
    ],
    products: ['endpoint-security', 'network-security'],
  },
  {
    slug: 'cloud-security',
    title: 'Cloud Security',
    icon: Cloud,
    challenge: 'Hybrid estates split visibility between on-premises tools and cloud consoles.',
    approach:
      'Run MediSIEM on-premises or in your own cloud, and bring cloud workload logs into the same prioritized pipeline.',
    benefits: [
      'Containerized deployment in the environment you choose',
      'Cloud workload telemetry alongside on-prem events',
      'Your data stays in your tenancy',
    ],
    products: ['siem', 'threat-detection'],
  },
  {
    slug: 'network-security',
    title: 'Network Security',
    icon: Network,
    challenge: 'Flat networks let attackers move laterally without being noticed.',
    approach: 'Baseline normal traffic per segment and surface anomalies near your most critical systems first.',
    benefits: [
      'Early warning of lateral movement',
      'Visibility into unmanaged and IoT devices',
      'Evidence that segmentation works',
    ],
    products: ['network-security', 'threat-intelligence'],
  },
]

export function getSolution(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug)
}
