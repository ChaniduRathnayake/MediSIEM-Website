import type { LucideIcon } from 'lucide-react'
import {
  Bug,
  Database,
  FileClock,
  KeyRound,
  Lock,
  ScrollText,
  Server,
  ShieldCheck,
  UserCheck,
  Users,
  Gauge,
  Mail,
} from 'lucide-react'

export interface TrustTopic {
  id: string
  icon: LucideIcon
  title: string
  summary: string
  points: string[]
}

// Describes how the platform is designed and operated. No certification or
// audit claims belong here.
// TODO(trust): have engineering confirm each operational statement below
// (TLS versions, encryption at rest, key rotation, backups, review process)
// before launch, and remove anything that isn't yet true.
export const trustTopics: TrustTopic[] = [
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Security architecture',
    summary: 'Defense in depth across the platform, from the agent to the dashboard.',
    points: [
      'Components run as isolated containers with least-privilege service accounts',
      'Agent-to-manager communication is authenticated and encrypted',
      'Security review of every release before it reaches customers',
    ],
  },
  {
    id: 'data-protection',
    icon: Database,
    title: 'Data protection',
    summary: 'Your telemetry is your data. We minimize what we collect and where it goes.',
    points: [
      'Self-hosted deployment keeps telemetry entirely within your environment',
      'Data residency options for managed deployments',
      'Customer data is never used to train shared models without written consent',
    ],
  },
  {
    id: 'encryption',
    icon: Lock,
    title: 'Encryption',
    summary: 'Encrypted in transit and at rest by default.',
    points: ['TLS 1.2+ for all network traffic', 'Encryption at rest for stored events and backups', 'Managed key rotation'],
  },
  {
    id: 'access-control',
    icon: KeyRound,
    title: 'Access control',
    summary: 'Only the right people see the right data.',
    points: ['Role-based access control for every view and action', 'Approval gates for sensitive response actions', 'SSO support on the roadmap'],
  },
  {
    id: 'audit-logging',
    icon: FileClock,
    title: 'Audit logging',
    summary: 'Every response decision is recorded and tamper-evident.',
    points: [
      'Hash-chained audit ledger for approvals and response actions',
      'User activity logging across the console',
      'Exportable records for auditors and investigators',
    ],
  },
  {
    id: 'infrastructure',
    icon: Server,
    title: 'Infrastructure',
    summary: 'Built on open, inspectable technologies.',
    points: [
      'Wazuh, Shuffle, Elasticsearch and MISP at the core — widely reviewed open-source projects',
      'Containerized for repeatable, hardened deployments',
      'Deploy on-premises, in your private cloud, or managed by us',
    ],
  },
  {
    id: 'privacy',
    icon: UserCheck,
    title: 'Privacy',
    summary: 'Privacy by design, aligned with GDPR principles.',
    points: [
      'Data minimization and purpose limitation',
      'Data Processing Agreement available for customers',
      'See our Privacy Policy for how this website handles your data',
    ],
  },
  {
    id: 'availability',
    icon: Gauge,
    title: 'Availability',
    summary: 'Transparent operational status.',
    points: ['Live status page for public services', 'Contractual SLAs on the Healthcare Cluster plan', 'Backups and documented recovery procedures'],
  },
  {
    id: 'subprocessors',
    icon: Users,
    title: 'Subprocessors',
    summary: 'A short, published list of third parties that process data.',
    points: [
      'Self-hosted deployments use no MediSIEM subprocessors for telemetry',
      'The current list for managed deployments is provided with our DPA',
      'Customers are notified before new subprocessors are added',
    ],
  },
  {
    id: 'vulnerability-disclosure',
    icon: Bug,
    title: 'Vulnerability disclosure',
    summary: 'We welcome reports from security researchers.',
    points: [
      'Report suspected vulnerabilities through our security contact form',
      'We acknowledge reports and keep you updated through remediation',
      'Good-faith research is welcome — please avoid privacy violations and service disruption',
    ],
  },
  {
    id: 'practices',
    icon: ScrollText,
    title: 'Security practices',
    summary: 'Secure development throughout the lifecycle.',
    points: ['Code review on every change', 'Dependency monitoring for known vulnerabilities', 'Least-privilege access for staff'],
  },
  {
    id: 'contact',
    icon: Mail,
    title: 'Security contact',
    summary: 'Questions about security or a report to make?',
    points: ['Use our contact form with the “Security” topic selected', 'Security reports are routed to the security team directly'],
  },
]

export type ComplianceStatus = 'aligned' | 'roadmap'

export interface ComplianceItem {
  name: string
  status: ComplianceStatus
  description: string
}

// IMPORTANT: MediSIEM does not currently hold any third-party certification
// or attestation. 'aligned' means the platform maps detections/controls to
// the framework and helps customers meet it. Change a status to a
// certification claim only once an actual certificate/report exists.
export const complianceItems: ComplianceItem[] = [
  { name: 'HIPAA', status: 'aligned', description: 'Detections and reports mapped to Security Rule safeguards.' },
  { name: 'NIST CSF 2.0', status: 'aligned', description: 'Capabilities mapped across Identify, Protect, Detect, Respond and Recover.' },
  { name: 'ISO/IEC 27001', status: 'aligned', description: 'Supports Annex A logging, monitoring and incident controls.' },
  { name: 'CIS Controls', status: 'aligned', description: 'Supports audit log management and continuous vulnerability management.' },
  { name: 'GDPR', status: 'aligned', description: 'Privacy-by-design principles and a DPA for customers.' },
  { name: 'SOC 2 Type II', status: 'roadmap', description: 'Independent attestation planned after general availability.' },
]
