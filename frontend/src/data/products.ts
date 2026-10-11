import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BrainCircuit,
  ClipboardCheck,
  Globe2,
  Laptop,
  Network,
  ScanSearch,
  Workflow,
} from 'lucide-react'

export interface ProductCapability {
  title: string
  description: string
}

export interface Product {
  slug: string
  name: string
  shortName: string
  icon: LucideIcon
  tagline: string
  summary: string
  /** 3–4 bullet capabilities for cards. */
  highlights: string[]
  /** Longer capability write-ups for the product detail page. */
  capabilities: ProductCapability[]
  /** Business outcomes: what a buyer gets, not what the code does. */
  outcomes: string[]
  /** Solution slugs (see solutions.ts) to cross-link. */
  relatedSolutions: string[]
}

// Product copy describes what the MediSIEM platform does today: a Wazuh +
// Elasticsearch telemetry pipeline, Shuffle-orchestrated playbooks, the CAAP scoring engine (Random Forest,
// Isolation Forest, K-Means, SHAP), human-in-the-loop response with a
// tamper-evident audit ledger, and MISP-backed IP reputation. Keep it that
// way. Don't add a capability here that the platform doesn't ship.
export const products: Product[] = [
  {
    slug: 'siem',
    name: 'MediSIEM Core SIEM',
    shortName: 'SIEM',
    icon: Activity,
    tagline: 'One place for every log, event and alert.',
    summary:
      'Collects and correlates telemetry from servers, clinical workstations, network devices and connected medical equipment into a single searchable timeline.',
    highlights: [
      'Agent-based and agentless log collection',
      'Real-time correlation and detection rules',
      'Searchable event timeline with long-term retention',
      'Role-based dashboards for SOC and leadership',
    ],
    capabilities: [
      {
        title: 'Unified collection',
        description:
          'Wazuh agents and syslog forwarders stream events from Windows, Linux, network gear and connected devices into one pipeline, with no separate tools per source.',
      },
      {
        title: 'Correlation at ingest',
        description:
          'Detection rules run as events arrive, so suspicious sequences across hosts are linked into a single alert instead of a dozen fragments.',
      },
      {
        title: 'Fast investigation',
        description:
          'Elasticsearch-backed search lets analysts pivot from an alert to every related event on that asset in seconds.',
      },
      {
        title: 'Dashboards by audience',
        description:
          'Analysts see a live queue; managers see posture and trends; auditors see evidence. Same data, the right view for each.',
      },
    ],
    outcomes: [
      'Replace swivel-chair investigation across disconnected consoles',
      'Give hospital leadership a defensible, real-time view of security posture',
      'Keep a single, searchable record for audits and post-incident reviews',
    ],
    relatedSolutions: ['soc-monitoring', 'threat-detection', 'compliance'],
  },
  {
    slug: 'threat-detection',
    name: 'CAAP Threat Prioritization',
    shortName: 'Threat Detection',
    icon: BrainCircuit,
    tagline: 'Rank every alert by what it actually puts at risk.',
    summary:
      'The CAAP engine scores each alert from 0–10 by combining threat severity with the criticality of the affected asset, time sensitivity and active exploitation.',
    highlights: [
      'AI-assisted classification of attack type',
      'Anomaly detection for never-before-seen behavior',
      'Impact-aware 0–10 Alert Score with clear action tiers',
      'Explainable results: see why every score was given',
    ],
    capabilities: [
      {
        title: 'AI-assisted classification',
        description:
          'A Random Forest model classifies the likely attack type, while an Isolation Forest flags behavior that doesn’t match any known pattern.',
      },
      {
        title: 'Impact-aware scoring',
        description:
          'The Alert Score weighs threat risk, asset criticality, time sensitivity, active exploitation and temporal context, so a quiet attack on a critical system outranks a loud one on a spare laptop.',
      },
      {
        title: 'Three clear action tiers',
        description:
          'Every alert lands in Immediate, Investigate or Monitor, giving analysts an unambiguous next step instead of another severity label to interpret.',
      },
      {
        title: 'Explainable by design',
        description:
          'SHAP-based explanations show which factors drove each score, so analysts can trust or challenge the ranking.',
      },
    ],
    outcomes: [
      'Spend analyst time on the alerts that carry real patient impact',
      'Cut through severity-only noise that buries critical incidents',
      'Make prioritization decisions you can explain to auditors and hospital leadership',
    ],
    relatedSolutions: ['threat-detection', 'soc-monitoring', 'incident-response'],
  },
  {
    slug: 'incident-response',
    name: 'Guided Incident Response',
    shortName: 'Incident Response',
    icon: Workflow,
    tagline: 'Respond fast, without breaking what must stay online.',
    summary:
      'Non-disruptive safety playbooks, orchestrated by Shuffle, that ask a clinician before acting on a life-critical device, with a tamper-evident audit trail of every action taken.',
    highlights: [
      'Recommended response for every prioritized alert',
      'Human-in-the-loop approval for critical systems',
      'Tamper-evident, hash-chained audit ledger',
      'Case timeline from detection to resolution',
    ],
    capabilities: [
      {
        title: 'Recommended actions',
        description:
          'Each alert comes with a suggested containment step matched to the threat and the asset, so junior analysts can act with senior-level confidence.',
      },
      {
        title: 'Approval gates where they matter',
        description:
          'Actions against life-critical clinical systems wait for a clinician or other authorized approver. Automation never takes a key system offline on its own.',
      },
      {
        title: 'Tamper-evident audit ledger',
        description:
          'Every decision and action is written to a hash-chained ledger, giving regulators and insurers an evidence trail that can’t be quietly edited.',
      },
      {
        title: 'Full case history',
        description:
          'Detection, triage, approvals and remediation sit on one timeline for handover, reporting and lessons learned.',
      },
    ],
    outcomes: [
      'Contain threats sooner with a clear, pre-approved next step',
      'Avoid outages caused by over-eager automated response',
      'Produce incident evidence for regulators without manual reconstruction',
    ],
    relatedSolutions: ['incident-response', 'soc-monitoring', 'compliance'],
  },
  {
    slug: 'threat-intelligence',
    name: 'Threat Intelligence & IP Reputation',
    shortName: 'Threat Intelligence',
    icon: Globe2,
    tagline: 'Know who is on the other end of every connection.',
    summary:
      'Enriches alerts with dynamic IP reputation scoring and indicators from the MISP threat-intelligence platform.',
    highlights: [
      'Automatic enrichment of every alert',
      'Dynamic, context-aware IP reputation scores',
      'MISP indicator feeds and sharing',
      'Reputation feeds back into alert priority',
    ],
    capabilities: [
      {
        title: 'Automatic enrichment',
        description:
          'Source and destination addresses are checked against threat intelligence the moment an alert fires, with no copy-pasting into lookup sites.',
      },
      {
        title: 'Context-aware reputation',
        description:
          'Reputation scores adapt to behavior seen in your own environment, not just static blocklists.',
      },
      {
        title: 'MISP integration',
        description:
          'Consume and share indicators through MISP, the open threat-intelligence platform used by CERTs and ISACs worldwide.',
      },
      {
        title: 'Priority-aware',
        description:
          'Known-malicious infrastructure raises an alert’s score automatically, so active campaigns surface first.',
      },
    ],
    outcomes: [
      'Spend less time on manual indicator lookups',
      'Spot active campaigns targeting healthcare earlier',
      'Turn shared community intelligence into prioritized action',
    ],
    relatedSolutions: ['threat-detection', 'network-security'],
  },
  {
    slug: 'endpoint-security',
    name: 'Endpoint & Device Security',
    shortName: 'Endpoint Security',
    icon: Laptop,
    tagline: 'Visibility across clinical workstations, servers and medical devices.',
    summary:
      'Lightweight agents monitor file integrity, configuration and behavior on endpoints, with asset criticality tracked for every device.',
    highlights: [
      'File integrity and configuration monitoring',
      'Behavioral detection on servers and workstations',
      'Asset inventory with criticality tagging',
      'Coverage for connected and medical devices via network telemetry',
    ],
    capabilities: [
      {
        title: 'Lightweight agents',
        description:
          'Wazuh-based agents watch file integrity, running processes and security configuration with minimal performance overhead.',
      },
      {
        title: 'Criticality-aware inventory',
        description:
          'Tag each asset with its clinical criticality once, and every future alert on it is scored accordingly.',
      },
      {
        title: 'Agentless device coverage',
        description:
          'Devices that can’t run an agent, such as many medical and IoMT devices, are monitored through network flow analysis.',
      },
      {
        title: 'Configuration assessment',
        description: 'Continuously check endpoints against hardening baselines and flag drift before it becomes exposure.',
      },
    ],
    outcomes: [
      'Know which devices exist and which ones truly matter',
      'Detect compromise on devices that can’t run traditional security tools',
      'Keep hardening baselines from silently drifting',
    ],
    relatedSolutions: ['endpoint-protection', 'soc-monitoring'],
  },
  {
    slug: 'vulnerability-management',
    name: 'Vulnerability Management',
    shortName: 'Vulnerability Management',
    icon: ScanSearch,
    tagline: 'Fix the vulnerabilities that matter first.',
    summary:
      'Detects known vulnerabilities on monitored assets and ranks them by asset criticality and active exploitation, not CVSS alone.',
    highlights: [
      'Continuous detection of known CVEs',
      'Prioritized by asset criticality and exploitation',
      'Remediation tracking by owner',
      'Exposure trends for leadership reporting',
    ],
    capabilities: [
      {
        title: 'Continuous detection',
        description: 'Installed software on monitored assets is checked against vulnerability feeds as new CVEs are published.',
      },
      {
        title: 'Risk-based ranking',
        description:
          'A medium-severity flaw on an ICU patient monitor outranks a critical flaw on an isolated test machine.',
      },
      {
        title: 'Remediation tracking',
        description: 'Assign owners, track progress and see what is overdue without exporting spreadsheets.',
      },
      {
        title: 'Exposure reporting',
        description: 'Trend views show whether exposure is shrinking quarter over quarter.',
      },
    ],
    outcomes: [
      'Point patching effort at the highest-risk exposure first',
      'Show measurable risk reduction to hospital leadership',
      'Reduce friction between security and IT operations',
    ],
    relatedSolutions: ['vulnerability-management', 'compliance'],
  },
  {
    slug: 'network-security',
    name: 'Network Security Analytics',
    shortName: 'Network Security',
    icon: Network,
    tagline: 'See lateral movement and abnormal traffic as it happens.',
    summary:
      'Analyzes network flows to baseline normal behavior per segment and surface anomalies, scanning and lateral movement.',
    highlights: [
      'Flow-based traffic baselining',
      'Anomaly and scan detection',
      'Lateral-movement visibility across segments',
      'Coverage for unmanaged and IoT/IoMT devices',
    ],
    capabilities: [
      {
        title: 'Behavioral baselining',
        description:
          'K-Means clustering learns normal traffic patterns per segment, so unusual volumes, ports and peers stand out.',
      },
      {
        title: 'Anomaly detection',
        description: 'Isolation Forest models flag flows that don’t fit any learned pattern, including novel attacks.',
      },
      {
        title: 'Segment-aware context',
        description:
          'Traffic touching critical segments is weighted higher, so threats near your most important systems surface first.',
      },
      {
        title: 'Unmanaged device coverage',
        description: 'Protect equipment you can’t install software on by watching how it communicates.',
      },
    ],
    outcomes: [
      'Catch attackers moving between systems before they reach clinical systems',
      'Protect connected devices that traditional endpoint tools miss',
      'Validate that network segmentation is working as designed',
    ],
    relatedSolutions: ['network-security', 'threat-detection'],
  },
  {
    slug: 'compliance-management',
    name: 'Compliance Management',
    shortName: 'Compliance',
    icon: ClipboardCheck,
    tagline: 'Continuous evidence instead of annual scrambles.',
    summary:
      'Maps detections and controls to healthcare-relevant frameworks such as HIPAA, NIST CSF, ISO/IEC 27001 and GDPR, and keeps audit evidence ready.',
    highlights: [
      'Control mapping to major frameworks',
      'Continuous compliance dashboards',
      'Audit-ready evidence exports',
      'Tamper-evident record of response actions',
    ],
    capabilities: [
      {
        title: 'Framework mapping',
        description:
          'Detection rules and checks are tagged with the controls they support across HIPAA, NIST, ISO/IEC 27001 and GDPR.',
      },
      {
        title: 'Continuous monitoring',
        description: 'Dashboards show control coverage and gaps as they change, not only at audit time.',
      },
      {
        title: 'Evidence on demand',
        description: 'Export the logs, alerts and response records an auditor asks for in minutes rather than weeks.',
      },
      {
        title: 'Defensible response records',
        description: 'The hash-chained audit ledger shows exactly who approved what, and when.',
      },
    ],
    outcomes: [
      'Shorten audit preparation from weeks of collection to a guided export',
      'See compliance gaps while there is still time to fix them',
      'Demonstrate due diligence to regulators, insurers and partners',
    ],
    relatedSolutions: ['compliance', 'soc-monitoring'],
  },
]

export function getProduct(slug: string | undefined) {
  return products.find((p) => p.slug === slug)
}
