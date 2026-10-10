import type { LucideIcon } from 'lucide-react'
import {
  BellRing,
  BrainCircuit,
  EyeOff,
  FileWarning,
  Fingerprint,
  Gauge,
  Globe2,
  Layers,
  LineChart,
  Plug,
  Radar,
  ScanSearch,
  ShieldCheck,
  Timer,
  Workflow,
  ClipboardCheck,
  Activity,
  GitBranch,
  HeartPulse,
  Target,
  UserCog,
} from 'lucide-react'
import { statistics } from './statistics'

export interface ProblemCard {
  icon: LucideIcon
  title: string
  description: string
  /** Optional cited statistic — must reference an entry in statistics.ts. */
  statId?: string
}

// Problem cards only carry a number when it's a cited statistic from
// statistics.ts. Never add a bare, unsourced figure here.
export const problems: ProblemCard[] = [
  {
    icon: BellRing,
    title: 'Too many alerts',
    description:
      'Severity-only scoring floods analysts with “high” and “critical” alerts that aren’t equally urgent, so the one that matters waits in the queue.',
  },
  {
    icon: EyeOff,
    title: 'Limited visibility',
    description:
      'Logs live in a dozen consoles, and connected devices that can’t run an agent are often not monitored at all.',
    statId: 'iomt-vulnerabilities',
  },
  {
    icon: Timer,
    title: 'Slow incident response',
    description:
      'Without a clear next step, triage depends on who is on shift — and every hour of dwell time raises the cost of a breach.',
    statId: 'breach-cost',
  },
  {
    icon: Layers,
    title: 'Growing attack surface',
    description: 'Cloud workloads, remote users and connected equipment add exposure faster than teams can assess it.',
  },
  {
    icon: Radar,
    title: 'Targeted, disruptive attacks',
    description:
      'Ransomware groups deliberately target organizations where downtime is unacceptable — and the impact spreads beyond the victim.',
    statId: 'ransomware-share',
  },
  {
    icon: FileWarning,
    title: 'Compliance pressure',
    description: 'Regulators expect continuous evidence, but most teams still assemble it by hand before every audit.',
  },
]

export function getStatistic(id: string | undefined) {
  return statistics.find((s) => s.id === id)
}

export interface Pillar {
  icon: LucideIcon
  title: string
  description: string
}

/** The six things the platform does, used in the Solution section. */
export const pillars: Pillar[] = [
  { icon: Radar, title: 'Detects threats', description: 'ML classification and anomaly detection across endpoints, network and logs.' },
  { icon: Gauge, title: 'Prioritizes risk', description: 'Every alert scored 0–10 by the impact at stake, not severity alone.' },
  { icon: Activity, title: 'Provides visibility', description: 'One timeline across servers, endpoints, network and connected devices.' },
  { icon: Workflow, title: 'Automates response', description: 'Recommended actions with approval gates for critical systems.' },
  { icon: ClipboardCheck, title: 'Improves compliance', description: 'Controls mapped to major frameworks with evidence on demand.' },
  { icon: BrainCircuit, title: 'Reduces analyst workload', description: 'Explainable rankings so teams act first on what matters most.' },
]

export interface Feature {
  icon: LucideIcon
  title: string
  /** The business value — why a buyer cares. */
  value: string
}

export const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: 'AI-Assisted Threat Detection',
    value: 'Catch attacks signature tools miss, while keeping false positives away from your analysts.',
  },
  {
    icon: Fingerprint,
    title: 'Behavioral Analytics',
    value: 'Spot compromised accounts and devices by how they behave — even when the malware is brand new.',
  },
  {
    icon: Workflow,
    title: 'Automated Incident Response',
    value: 'Contain threats sooner with pre-approved actions, without risking outages on critical systems.',
  },
  {
    icon: ScanSearch,
    title: 'Vulnerability Management',
    value: 'Direct limited patching capacity at the exposure most likely to hurt the business.',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    value: 'Know what is happening across your estate now — not in tomorrow morning’s report.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Posture Management',
    value: 'Give the board a single, defensible measure of risk and how it is trending.',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance Monitoring',
    value: 'Replace weeks of audit preparation with continuous, exportable evidence.',
  },
  {
    icon: Globe2,
    title: 'Threat Intelligence',
    value: 'Turn community intelligence into prioritized action against campaigns targeting your sector.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    value: 'Fit MediSIEM into the tools and workflows your teams already rely on.',
  },
  {
    icon: LineChart,
    title: 'Security Analytics',
    value: 'Measure what matters — workload, response times and exposure — and prove improvement.',
  },
]

export interface WorkflowStep {
  icon: LucideIcon
  step: string
  title: string
  description: string
  detail: string
}

export const workflowSteps: WorkflowStep[] = [
  {
    icon: Plug,
    step: '01',
    title: 'Connect',
    description: 'Deploy lightweight agents and forward logs from servers, endpoints, network and cloud.',
    detail: 'Agents · Syslog · Network flows',
  },
  {
    icon: Radar,
    step: '02',
    title: 'Detect',
    description: 'Machine-learning models classify attacks and flag anomalous behavior in real time.',
    detail: 'Classification · Anomaly detection',
  },
  {
    icon: Gauge,
    step: '03',
    title: 'Analyze',
    description: 'Each alert is enriched with threat intelligence and scored by the impact at stake.',
    detail: 'Alert Score 0–10 · Explanations',
  },
  {
    icon: ShieldCheck,
    step: '04',
    title: 'Respond',
    description: 'Analysts act on a recommended response, with approvals and a tamper-evident audit trail.',
    detail: 'Playbooks · Approvals · Audit ledger',
  },
]

export const heroTrustIndicators = [
  'Built for hospitals',
  'Clinician approval before isolation',
  'AI-powered prioritization',
  'Built on Wazuh & Shuffle',
  'Flat monthly subscription',
]

/** Framework names the platform maps detections to. Mapping ≠ certification. */
export const frameworkCoverage = [
  'MITRE ATT&CK',
  'NIST CSF 2.0',
  'HIPAA Security Rule',
  'ISO/IEC 27001',
  'PCI DSS',
  'CIS Controls',
  'GDPR',
]

export const builtOn = ['Wazuh', 'Shuffle', 'Elastic', 'MISP', 'Docker']

export interface HospitalFitItem {
  icon: LucideIcon
  label: string
  title: string
  description: string
}

/** Who MediSIEM is for and why, from the commercialization plan. */
export const hospitalFit: HospitalFitItem[] = [
  {
    icon: Target,
    label: 'Who it’s for',
    title: 'Hospitals priced out of enterprise security',
    description:
      'Public healthcare clusters and small-to-medium private hospitals, starting in Sri Lanka, that need SOC-grade protection without an enterprise SOC budget.',
  },
  {
    icon: UserCog,
    label: 'Who uses it',
    title: 'Hospital IT managers',
    description:
      'Small IT teams who know ransomware could disable life-sustaining equipment, and need to see which alert puts a patient at risk.',
  },
  {
    icon: HeartPulse,
    label: 'What makes it different',
    title: 'It asks a doctor first',
    description:
      'A safety-first layer that asks a clinician for permission before any response cuts off a critical device. Automation never takes a ventilator offline on its own.',
  },
  {
    icon: GitBranch,
    label: 'How it’s built',
    title: 'Open foundations, our own safety logic',
    description:
      'Built on proven open-source tools, Wazuh and Shuffle. The clinical decision weights, thresholds and safety playbooks on top are MediSIEM’s own.',
  },
]
