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
    title: 'Hospital SOC Monitoring',
    icon: MonitorDot,
    challenge: 'Hospital IT teams face a constant stream of alerts and can’t tell which ones put patients at risk.',
    approach:
      'A single queue ranked by clinical impact, with the device, ward and threat context needed to decide in one view.',
    benefits: [
      'One queue instead of many consoles',
      'Alerts ranked by patient impact, with clear next steps',
      'Shift handover built on a shared case timeline',
    ],
    products: ['siem', 'threat-detection', 'incident-response'],
  },
  {
    slug: 'threat-detection',
    title: 'Threat Detection',
    icon: Radar,
    challenge: 'Signature-only tools miss novel attacks on medical devices and drown small teams in false positives.',
    approach:
      'Machine-learning classification and anomaly detection built for hospital and medical-device (IoMT) traffic, enriched with threat intelligence and scored by clinical impact.',
    benefits: [
      'Detect known and never-before-seen behavior',
      'Fewer false positives reaching analysts',
      'Explainable reasoning behind every detection',
    ],
    products: ['threat-detection', 'threat-intelligence', 'network-security'],
  },
  {
    slug: 'incident-response',
    title: 'Clinically Safe Incident Response',
    icon: Siren,
    challenge: 'Automated response can take a life-critical device offline, and manual response is slow and hard to evidence.',
    approach:
      'Recommended actions, clinician approval before anything touches a life-critical device, and a tamper-evident record of every step.',
    benefits: [
      'Consistent response regardless of who is on shift',
      'No ventilator or infusion pump taken offline by automation',
      'Incident evidence ready for regulators and insurers',
    ],
    products: ['incident-response', 'siem'],
  },
  {
    slug: 'vulnerability-management',
    title: 'Vulnerability Management',
    icon: Bug,
    challenge: 'Medical devices and clinical systems carry known vulnerabilities that often can’t be patched quickly.',
    approach:
      'Rank vulnerabilities by clinical criticality and active exploitation, watch unpatched devices more closely, and track remediation to closure.',
    benefits: [
      'Patch the riskiest clinical exposure first',
      'Closer monitoring for devices that can’t be patched yet',
      'Clear ownership and deadlines',
    ],
    products: ['vulnerability-management', 'endpoint-security'],
  },
  {
    slug: 'compliance',
    title: 'Healthcare Compliance',
    icon: ClipboardCheck,
    challenge: 'Health-data regulators expect continuous evidence, but audits still mean weeks of collecting logs by hand.',
    approach: 'Continuous mapping to HIPAA and GDPR controls, with evidence exports backed by an immutable audit trail.',
    benefits: [
      'Always-current HIPAA and GDPR posture',
      'Evidence exports in minutes',
      'Defensible records of every response decision',
    ],
    products: ['compliance-management', 'siem', 'incident-response'],
  },
  {
    slug: 'endpoint-protection',
    title: 'Medical Device Protection',
    icon: Laptop,
    challenge: 'Infusion pumps, monitors and imaging systems often can’t run security agents, so they go unmonitored.',
    approach: 'Agents on clinical workstations and servers, network-based monitoring for medical and IoMT devices that can’t run one.',
    benefits: [
      'Coverage for clinical workstations and medical devices',
      'Integrity and configuration drift detection',
      'Alerting weighted by each device’s clinical role',
    ],
    products: ['endpoint-security', 'network-security'],
  },
  {
    slug: 'cloud-security',
    title: 'EHR & Cloud Security',
    icon: Cloud,
    challenge: 'Patient records and clinical apps are moving to the cloud, splitting visibility between on-premises tools and cloud consoles.',
    approach:
      'Run MediSIEM on-premises or in your own cloud, and bring cloud workload logs into the same clinically ranked pipeline.',
    benefits: [
      'Containerized deployment in the environment you choose',
      'Cloud workloads alongside on-premises clinical systems',
      'Patient data stays in your tenancy',
    ],
    products: ['siem', 'threat-detection'],
  },
  {
    slug: 'network-security',
    title: 'Clinical Network Security',
    icon: Network,
    challenge: 'Flat hospital networks let attackers move from an office PC to clinical systems without being noticed.',
    approach: 'Baseline normal traffic per segment and surface anomalies near ICU, theatre and imaging systems first.',
    benefits: [
      'Early warning of lateral movement toward clinical systems',
      'Visibility into medical and IoMT devices',
      'Evidence that clinical network segmentation works',
    ],
    products: ['network-security', 'threat-intelligence'],
  },
]

export function getSolution(slug: string | undefined) {
  return solutions.find((s) => s.slug === slug)
}
