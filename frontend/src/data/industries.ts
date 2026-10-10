import type { LucideIcon } from 'lucide-react'
import { Building2, Cpu, Factory, GraduationCap, HeartPulse, Landmark, ShoppingBag, Store } from 'lucide-react'

export interface Industry {
  slug: string
  name: string
  icon: LucideIcon
  /** Headline value proposition, specific to this sector. */
  headline: string
  description: string
  /** Sector-specific threats MediSIEM is positioned against. */
  risks: string[]
  /** How MediSIEM helps, in this sector's terms. */
  value: string[]
  /** Frameworks commonly relevant in this sector — MediSIEM maps to them; it does not certify you. */
  frameworks: string[]
  /** The flagship sector the platform was designed around. */
  flagship?: boolean
}

export const industries: Industry[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: HeartPulse,
    flagship: true,
    headline: 'Prioritize threats by patient impact, not just technical severity.',
    description:
      'MediSIEM is built for public healthcare clusters and small-to-medium private hospitals that can’t afford enterprise SOC tooling. Clinical criticality is part of every Alert Score, so an attack on an ICU device outranks malware on a billing PC.',
    risks: ['Ransomware disrupting clinical systems', 'Vulnerable connected medical devices', 'Patient data exposure'],
    value: [
      'Clinical criticality built into alert scoring',
      'A clinician approves before any action on a life-critical device',
      'Agentless monitoring for medical and IoMT devices',
      'Flat monthly subscription priced for hospital budgets',
    ],
    frameworks: ['HIPAA Security Rule', 'NIST CSF 2.0', 'ISO/IEC 27001'],
  },
  {
    slug: 'banking-finance',
    name: 'Banking & Finance',
    icon: Landmark,
    headline: 'Protect payment systems and customer trust under strict regulation.',
    description:
      'Rank alerts by exposure to payment, trading and customer-data systems, and keep a tamper-evident record regulators can rely on.',
    risks: ['Account takeover and fraud infrastructure', 'Attacks on payment systems', 'Insider data exfiltration'],
    value: [
      'Payment and core-banking systems weighted as critical assets',
      'Immutable audit trail for regulator inquiries',
      'Threat-intelligence enrichment against known fraud infrastructure',
    ],
    frameworks: ['PCI DSS', 'ISO/IEC 27001', 'NIST CSF 2.0'],
  },
  {
    slug: 'government',
    name: 'Government',
    icon: Building2,
    headline: 'Sovereign visibility for public-sector networks.',
    description:
      'Deploy in your own infrastructure, keep data in-jurisdiction, and give lean teams a prioritized view of the threats to citizen services.',
    risks: ['State-sponsored intrusion', 'Disruption of citizen services', 'Legacy systems that can’t be patched quickly'],
    value: [
      'Self-hosted deployment; data never leaves your environment',
      'Built on open, inspectable technologies',
      'MISP-based intelligence sharing with national CERTs',
    ],
    frameworks: ['NIST CSF 2.0', 'NIST SP 800-53', 'ISO/IEC 27001'],
  },
  {
    slug: 'education',
    name: 'Education',
    icon: GraduationCap,
    headline: 'Enterprise-grade protection on an education budget.',
    description:
      'Open networks, thousands of unmanaged devices and small IT teams — MediSIEM focuses limited attention where the risk to research and student data is highest.',
    risks: ['Ransomware during exams and enrolment', 'Compromised student and staff accounts', 'Theft of research data'],
    value: [
      'Prioritized queue sized for small teams',
      'Network-based visibility for unmanaged devices',
      'Research and student records tagged as critical assets',
    ],
    frameworks: ['GDPR', 'ISO/IEC 27001', 'CIS Controls'],
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    headline: 'Keep stores, e-commerce and cardholder data online and secure.',
    description:
      'Correlate events across stores, warehouses and online channels, with payment systems weighted as your most critical assets.',
    risks: ['Card-skimming and POS malware', 'Credential stuffing on e-commerce', 'Peak-season ransomware'],
    value: [
      'POS and payment systems scored as critical',
      'Central visibility across distributed locations',
      'PCI DSS-aligned evidence exports',
    ],
    frameworks: ['PCI DSS', 'GDPR', 'CIS Controls'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    headline: 'Protect production lines without stopping them.',
    description:
      'Monitor OT and IT networks together, and require human approval before any response action touches production systems.',
    risks: ['Ransomware halting production', 'Exposed OT and industrial devices', 'Intellectual-property theft'],
    value: [
      'Approval gates before any action on production systems',
      'Agentless monitoring of OT network traffic',
      'Plant-critical assets weighted in every score',
    ],
    frameworks: ['IEC 62443', 'NIST CSF 2.0', 'ISO/IEC 27001'],
  },
  {
    slug: 'technology',
    name: 'Technology',
    icon: Cpu,
    headline: 'API-first security that fits your engineering workflow.',
    description:
      'Feed MediSIEM from your existing telemetry, query it programmatically, and route prioritized alerts into the tools your teams already use.',
    risks: ['Supply-chain and CI/CD compromise', 'Cloud credential abuse', 'Customer data exposure'],
    value: [
      'REST API for scores, alerts and enrichment',
      'Containerized deployment in your own cloud',
      'Explainable scoring engineers can audit',
    ],
    frameworks: ['SOC 2', 'ISO/IEC 27001', 'GDPR'],
  },
  {
    slug: 'smes',
    name: 'SMEs',
    icon: Store,
    headline: 'A security operations center without hiring one.',
    description:
      'Clear, prioritized next steps for teams where security is one of many jobs — so the critical alert never gets lost.',
    risks: ['Business email compromise', 'Ransomware with no recovery plan', 'Unpatched internet-facing systems'],
    value: [
      'Plain-language action tiers: Immediate, Investigate, Monitor',
      'Guided response steps for non-specialists',
      'Predictable pricing that scales with you',
    ],
    frameworks: ['CIS Controls', 'Cyber Essentials', 'GDPR'],
  },
]

export function getIndustry(slug: string | undefined) {
  return industries.find((i) => i.slug === slug)
}
