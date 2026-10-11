import type { LucideIcon } from 'lucide-react'
import { BedDouble, Hospital, Microscope, Network, Stethoscope, Video } from 'lucide-react'

// MediSIEM is a healthcare-only product. These are the care settings it is
// built for (served at /industries/:slug and labelled "Healthcare" in the nav).
export interface Industry {
  slug: string
  name: string
  icon: LucideIcon
  /** Headline value proposition, specific to this care setting. */
  headline: string
  description: string
  /** Threats MediSIEM is positioned against in this setting. */
  risks: string[]
  /** How MediSIEM helps, in this setting's terms. */
  value: string[]
  /** Frameworks commonly relevant here. MediSIEM maps to them; it does not certify you. */
  frameworks: string[]
  /** The flagship setting the platform was designed around. */
  flagship?: boolean
}

export const industries: Industry[] = [
  {
    slug: 'hospitals',
    name: 'Hospitals',
    icon: Hospital,
    flagship: true,
    headline: 'Prioritize threats by patient impact, not just technical severity.',
    description:
      'MediSIEM is built for public and small-to-medium private hospitals that can’t afford enterprise SOC tooling. Clinical criticality is part of every Alert Score, so an attack on an ICU device outranks malware on a billing PC.',
    risks: ['Ransomware disrupting clinical systems', 'Vulnerable connected medical devices (IoMT)', 'Patient data exposure'],
    value: [
      'Clinical criticality built into alert scoring',
      'A clinician approves before any action on a life-critical device',
      'Agentless monitoring for medical and IoMT devices',
      'Runs alongside the Wazuh SIEM you already operate',
    ],
    frameworks: ['HIPAA Security Rule', 'NIST CSF 2.0', 'ISO/IEC 27001', 'GDPR'],
  },
  {
    slug: 'healthcare-networks',
    name: 'Healthcare Clusters & Networks',
    icon: Network,
    headline: 'One prioritized view across every hospital in your network.',
    description:
      'Public healthcare clusters and multi-site hospital groups share EHR, PACS and network links between sites. MediSIEM gives a central team one queue across every site, still ranked by what each alert puts at risk for patients.',
    risks: ['Attacks spreading between connected sites', 'Shared EHR and imaging systems as single points of failure', 'Uneven security maturity from site to site'],
    value: [
      'Multiple hospital sites on one platform (Healthcare Cluster plan)',
      'Alerts from every site ranked on the same clinical scale',
      'Self-hosted or government-cloud deployment',
      'One tamper-evident audit trail across the network',
    ],
    frameworks: ['HIPAA Security Rule', 'NIST CSF 2.0', 'ISO/IEC 27001'],
  },
  {
    slug: 'clinics',
    name: 'Clinics & Medical Centres',
    icon: Stethoscope,
    headline: 'SOC-grade protection for practices without a security team.',
    description:
      'Outpatient clinics, medical centres and specialist practices run on patient records and appointment systems, usually with no dedicated IT security staff. MediSIEM turns alerts into plain-language next steps.',
    risks: ['Ransomware locking patient records and appointments', 'Phishing and compromised staff email accounts', 'Unpatched practice-management systems'],
    value: [
      'Plain-language action tiers: Immediate, Investigate, Monitor',
      'Guided response steps for non-specialists',
      'Patient-record systems weighted as critical assets',
    ],
    frameworks: ['HIPAA Security Rule', 'GDPR', 'CIS Controls'],
  },
  {
    slug: 'diagnostics',
    name: 'Laboratories & Imaging Centres',
    icon: Microscope,
    headline: 'Keep diagnostic systems running and results trustworthy.',
    description:
      'Labs and radiology centres depend on LIS, PACS, connected analysers and imaging modalities, many on legacy operating systems that can’t run an agent. MediSIEM watches them through network traffic and asks before isolating anything.',
    risks: ['Ransomware on PACS or LIS halting diagnostics', 'Legacy operating systems on modalities and analysers', 'Tampering with or exposure of test results'],
    value: [
      'Agentless monitoring for imaging modalities and analysers',
      'PACS and LIS weighted as critical in every score',
      'Approval gate before any action on diagnostic equipment',
    ],
    frameworks: ['HIPAA Security Rule', 'NIST CSF 2.0', 'ISO/IEC 27001'],
  },
  {
    slug: 'long-term-care',
    name: 'Nursing Homes & Long-Term Care',
    icon: BedDouble,
    headline: 'Protect residents’ care systems with a team of one.',
    description:
      'Nursing homes, rehabilitation and long-term care facilities rely on resident records, medication systems and connected monitoring, often looked after by a single IT person. MediSIEM keeps the queue short and the next step clear.',
    risks: ['Ransomware on resident records and medication systems', 'Insecure monitoring and nurse-call devices', 'No after-hours security cover'],
    value: [
      'A prioritized queue a one-person team can keep up with',
      'Network-based visibility for resident monitoring devices',
      'Recommended actions with approval before anything is isolated',
    ],
    frameworks: ['HIPAA Security Rule', 'GDPR', 'CIS Controls'],
  },
  {
    slug: 'telehealth',
    name: 'Telehealth & Digital Health',
    icon: Video,
    headline: 'Secure virtual care and the patient data behind it.',
    description:
      'Telemedicine providers and digital health services run in the cloud and hold sensitive patient data. MediSIEM brings cloud workload logs into the same impact-ranked queue and runs in the environment you choose.',
    risks: ['Patient data exposed through cloud misconfiguration', 'Takeover of clinician and patient accounts', 'Downtime of virtual consultations'],
    value: [
      'Containerized deployment in your own cloud',
      'Cloud workload telemetry in the same prioritized queue',
      'REST API for scores, alerts and enrichment',
    ],
    frameworks: ['HIPAA Security Rule', 'GDPR', 'ISO/IEC 27001'],
  },
]

export function getIndustry(slug: string | undefined) {
  return industries.find((i) => i.slug === slug)
}
