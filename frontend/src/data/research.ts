// Single source for every research fact, number and claim shown on the site.
// All figures come from the three R26-CS-008 component theses (CAAP,
// life-critical incident response, MedShield) and the product brief. Do not
// add a number here unless it appears in one of those sources, and keep
// RESEARCH_FOOTNOTE beside every block that shows results.

export const TAGLINE = 'When the cure can harm the patient, security has to understand the patient.'

export const RESEARCH_FOOTNOTE =
  'Results from a research prototype evaluated on public datasets (CIC-DDoS2019, CICIoT2023), simulated hospital scenarios and one emulated device type. Not yet validated on live hospital networks.'

export const STORY =
  'At 3 a.m., a security platform flags a ventilator as a compromised host and isolates it. The isolation is textbook incident response. It is also a patient-safety incident.'

/* ---------- Hero stat strip ---------- */
export const heroStats = [
  { value: '235×', label: 'lower false-positive rate from correcting feature derivation' },
  { value: '10/10', label: 'top-ranked alerts genuinely life-critical, vs 7/10 with CVSS' },
  { value: '0 of 3', label: 'accidental ventilator disruptions, vs 3 of 3 for always-isolate' },
  { value: '0.086 ms', label: 'mean response-decision latency' },
]

/* ---------- Problem: three gaps ---------- */
export const gaps = [
  {
    stage: 'Detection',
    title: 'Detectors look great offline and fail in deployment.',
    body: 'A Random Forest DDoS detector with 99.84% oracle accuracy reaches a 0.7514 false-positive rate when it only gets the features a live sensor can compute.',
  },
  {
    stage: 'Prioritization',
    title: 'Alert ranking is technique-centric.',
    body: 'CVSS base scores describe the attack, not the target. They cannot tell a probe on a life-sustaining ventilator from the same probe on a clerical PC.',
  },
  {
    stage: 'Response',
    title: 'Automated response is clinically blind.',
    body: 'Isolating an infusion pump or a patient monitor removes its alarms and central surveillance, exactly as an attacker would.',
  },
]

export const contextStat = {
  text: 'Nearly three in four U.S. healthcare organizations that experienced a common cyberattack in 2025 report it disrupted patient care.',
  source: 'Ponemon Institute and Proofpoint, The 2025 Study on Cyber Insecurity in Healthcare',
}

/* ---------- How it works: modules ---------- */
export interface Module {
  id: 'medshield' | 'caap' | 'response'
  number: string
  name: string
  role: string
  summary: string
  points: string[]
}

export const modules: Module[] = [
  {
    id: 'medshield',
    number: '01',
    name: 'MedShield',
    role: 'Deployment-realistic DDoS detection',
    summary:
      'A Random Forest trained on 826,206 flows, built to work on the features a real sensor can actually compute.',
    points: [
      'Corrects feature derivation (unit and inter-arrival-time errors) instead of imputing what the sensor cannot see.',
      'A feature-coverage gate keeps heavily imputed flows out of the score and reports reduced confidence instead.',
      'Fuses Random Forest, Isolation Forest, healthcare context and IP-reputation evidence into MIRS (0 to 100), an availability-normalized score.',
      'Attack-preserving: supporting evidence can raise MIRS, but never pull it below the primary attack evidence.',
    ],
  },
  {
    id: 'caap',
    number: '02',
    name: 'CAAP',
    role: 'Clinical Alert Score',
    summary: 'Ranks every alert by what it puts at risk for the patient, with an explanation an analyst can audit.',
    points: [
      'CAS = 0.25 Technical Risk + 0.30 Clinical Criticality + 0.25 Time Sensitivity + 0.10 Active Exploitation + 0.10 Temporal Context.',
      'Clinical Criticality is grounded in FDA 21 CFR 860.3 device classes, refined with ISO 14971 severity of harm.',
      'Action bands: 8 or above is Immediate, 5 or above is Investigate, anything lower is Monitor.',
      'SHAP explanations on every prediction.',
    ],
  },
  {
    id: 'response',
    number: '03',
    name: 'Criticality-gated response',
    role: 'Incident response that knows the device',
    summary: 'Separates whether a device may be disrupted from how severely to respond.',
    points: [
      'Tier 1: a non-critical asset gets graduated containment.',
      'Tier 2: a protected asset gets Monitored Mode (deep telemetry, shadow auditing, zero interference).',
      'Tier 3: a protected asset under extreme threat gets Monitored Mode plus clinician approval on a mobile Approve/Deny screen before any disruption.',
      'Unknown devices fail safe to protected.',
    ],
  },
]

/* ---------- Interactive demo ---------- */
// Live-scale (1 to 10) Clinical Criticality values from the CAAP device-profile table.
export const devicePresets = [
  { id: 'ventilator', label: 'ICU mechanical ventilator', fdaClass: 'III', cc: 10 },
  { id: 'insulin', label: 'Closed-loop insulin pump', fdaClass: 'III', cc: 10 },
  { id: 'monitor', label: 'Bedside patient monitor', fdaClass: 'II', cc: 8 },
  { id: 'gateway', label: 'MQTT medical IoT gateway', fdaClass: 'II', cc: 8 },
  { id: 'pacs', label: 'DICOM PACS workstation', fdaClass: 'II', cc: 6 },
  { id: 'portal', label: 'Clinical web portal', fdaClass: 'II', cc: 6 },
  { id: 'rdp', label: 'RDP clinical PC', fdaClass: 'I', cc: 4 },
  { id: 'admin', label: 'Administrative workstation', fdaClass: 'I', cc: 2 },
] as const

export const CAS_WEIGHTS = { tr: 0.25, cc: 0.3, ts: 0.25, ae: 0.1, tc: 0.1 }

/** Identical technical signals for both demo alerts; only the device differs. */
export const DEMO_SIGNALS = { tr: 9, ts: 8, ae: 7, tc: 5 }

export function computeCAS(cc: number, s = DEMO_SIGNALS) {
  const w = CAS_WEIGHTS
  return w.tr * s.tr + w.cc * cc + w.ts * s.ts + w.ae * s.ae + w.tc * s.tc
}

/** Controlled test case TC4: the CVSS ranking inverts once clinical context is added. */
export const inversion = [
  { id: 'recon-vent', title: 'Recon port scan', device: 'ICU mechanical ventilator (FDA Class III)', cvss: 3.1, cas: 7.4 },
  { id: 'dos-admin', title: 'DoS TCP flood', device: 'Administrative workstation (FDA Class I)', cvss: 7.5, cas: 6.8 },
]

/* ---------- Proof ---------- */
export interface ProofMetric {
  id: string
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
  tooltip: string
}

export const proofMetrics: ProofMetric[] = [
  {
    id: 'fpr',
    value: 235,
    suffix: '×',
    label: 'lower false-positive rate',
    detail: '0.7514 to 0.0032 from correcting feature derivation alone, with no new telemetry.',
    tooltip: 'MedShield Random Forest on the held-out DrDoS_NTP family. Naive deployment imputes the features a live Suricata sensor cannot compute; the corrected pipeline derives them properly.',
  },
  {
    id: 'auc',
    value: 0.9998,
    decimals: 4,
    label: 'ROC-AUC for MIRS',
    detail: 'MIRS separates benign from attack traffic.',
    tooltip: 'Measured on 40,000 labelled flows from the held-out attack family.',
  },
  {
    id: 'top10',
    value: 10,
    suffix: '/10',
    label: 'top-10 alerts genuinely life-critical',
    detail: 'With CAS, against 7/10 with CVSS.',
    tooltip: '600 simulated alerts across three hospital ward scenarios, 185 of them life-critical, each scored by CAS and by a CVSS-equivalent baseline.',
  },
  {
    id: 'rank',
    value: 150.2,
    decimals: 1,
    label: 'mean rank of a life-critical alert',
    detail: 'Down from 266.0 under the CVSS baseline.',
    tooltip: 'Lower is better: life-critical alerts reach the analyst sooner. Same 600-alert simulation.',
  },
  {
    id: 'disruption',
    value: 0,
    suffix: ' of 3',
    label: 'accidental ventilator disruptions',
    detail: 'Against 3 of 3 for an always-isolate playbook.',
    tooltip: 'Three warranted attack scenarios on an emulated ICU ventilator. Disruption means the device telemetry was interrupted by the response itself.',
  },
  {
    id: 'latency',
    value: 0.086,
    decimals: 3,
    suffix: ' ms',
    label: 'mean decision latency',
    detail: 'Telemetry downtime: 14.0 s isolation, 5.0 s quarantine, 0.0 s throttle or selective block.',
    tooltip: 'In-process latency of the response decision. Downtime was measured on the emulated device for each containment strategy.',
  },
  {
    id: 'spearman',
    value: 0.982,
    decimals: 3,
    prefix: '≥ ',
    label: 'Spearman rank stability',
    detail: 'CAS rankings stay stable when any weight is shifted by ±0.05.',
    tooltip: 'Each CAS weight perturbed by ±0.05 and renormalized, all 600 alerts rescored and compared with the original ranking.',
  },
]

/* ---------- Validation ---------- */
export const validated = [
  'Each component evaluated individually: MedShield detection and MIRS, CAAP prioritization, and the criticality-gated response engine.',
  'Integration at the interface level: CAAP’s criticality score feeds the response gate, and an unknown criticality reaches the engine as missing so it fails safe.',
  'Response decisions measured on an emulated ICU ventilator speaking MQTT and HL7 v2.5.',
]

export const next = [
  'A full end-to-end test of the live pipeline.',
  'Clinician-sourced ground truth for what counts as life-critical.',
  'Comparison against CVSS Environmental and SSVC baselines.',
  'IoMT-specific datasets such as CICIoMT2024.',
  'More device types beyond the emulated ventilator.',
]

export const monitoredModeNote =
  'Monitored Mode does not stop an attack by itself. It trades residual technical risk for guaranteed device availability, and relies on telemetry and human-mediated remediation.'

/* ---------- Standards ---------- */
export const standards = [
  { name: 'FDA 21 CFR 860.3', relation: 'Informed by', use: 'Device classes anchor Clinical Criticality; the life-sustaining designation decides which devices are protected.' },
  { name: 'ISO 14971', relation: 'Informed by', use: 'Severity of harm separates devices within the same FDA class.' },
  { name: 'IEC 80001-1', relation: 'Aligned with', use: 'An automated containment action is a change to a medical IT network, so it is weighed for safety as well as security.' },
  { name: 'NIST SP 800-30', relation: 'Informed by', use: 'Likelihood and impact framing for the risk dimensions.' },
  { name: 'NIST SP 800-82r3', relation: 'Informed by', use: 'In safety-critical systems, a response must not drive the process into an unsafe state.' },
  { name: 'NIST SP 800-207', relation: 'Aligned with', use: 'The decision point is kept separate from the enforcement point, so detectors can change without touching safety logic.' },
]

/* ---------- Use cases ---------- */
export const scenarios = [
  {
    id: 'ventilator',
    title: 'ICU ventilator under reconnaissance',
    traditional: 'A port scan scores CVSS 3.1, so it ranks below a DoS on an administrative PC (CVSS 7.5). If a playbook does fire, it isolates the host like any other.',
    medisiem: 'CAS 7.4 ranks the probe above the admin-PC DoS (6.8). As a protected asset, the ventilator gets Monitored Mode, and any disruption waits for clinician approval.',
  },
  {
    id: 'pump',
    title: 'Infusion pump under network flood',
    traditional: 'An always-isolate playbook disconnects the pump, removing its alarms and central surveillance. On the emulated test device, isolation cost the whole containment window (14.0 s of telemetry).',
    medisiem: 'The pump is treated as protected: Monitored Mode, or throttling only the flagged flow (0.0 s telemetry downtime measured). Disruption needs a clinician’s Approve on the mobile screen.',
  },
  {
    id: 'admin',
    title: 'Administrative PC under DoS',
    traditional: 'A CVSS 7.5 DoS goes to the top of the queue, ahead of a probe on a ventilator.',
    medisiem: 'CAS 6.8 marks it Investigate, ranked after the ventilator. As a non-critical asset it gets graduated containment, up to isolating the host, because no patient depends on it.',
  },
]

/* ---------- Team and paper ---------- */
export const institution = {
  name: 'Sri Lanka Institute of Information Technology (SLIIT)',
  department: 'Department of Information Technology',
  project: 'Group research project R26-CS-008',
}

export const team = [
  { name: 'R.M.C.B. Rathnayake', area: 'CAAP: Clinically Aware Alert Prioritization' },
  { name: 'W.D.S. Jayasinghe', area: 'Life-critical-aware incident response orchestration' },
  { name: 'K.O.A. Anjana', area: 'MedShield: DDoS detection and evidence-aware risk scoring (MIRS)' },
]

export const supervisors = [
  { name: 'Mr. Amila Nuwan Senarathne', role: 'Supervisor' },
  { name: 'Ms. Ayesha Wijesooriya', role: 'Co-supervisor' },
]

export const paper = {
  title: 'When the Cure Can Harm the Patient: Clinically Aware Detection, Prioritization, and Response for Hospital IoMT Security',
  // PLACEHOLDER: put the PDF at frontend/public/papers/ with this file name.
  pdfPath: '/papers/when-the-cure-can-harm-the-patient.pdf',
  // PLACEHOLDER: replace the bracketed fields once the paper is published.
  bibtex: `@inproceedings{medisiem2026,
  title     = {When the Cure Can Harm the Patient: Clinically Aware Detection, Prioritization, and Response for Hospital {IoMT} Security},
  author    = {[PLACEHOLDER: author list]},
  booktitle = {[PLACEHOLDER: venue]},
  year      = {[PLACEHOLDER: year]},
  note      = {SLIIT group research project R26-CS-008}
}`,
}

/* ---------- Engagement ---------- */
export const engagements = [
  {
    id: 'research',
    intent: 'research' as const,
    name: 'Research collaboration',
    audience: 'Universities, clinical engineering teams and research groups.',
    points: [
      'Help build clinician-sourced ground truth',
      'Evaluate on IoMT-specific datasets and more device types',
      'Co-design comparisons against CVSS Environmental and SSVC',
    ],
    featured: false,
  },
  {
    id: 'pilot',
    intent: 'pilot' as const,
    name: 'Pilot program',
    audience: 'Hospitals ready to test clinically aware security on part of their network.',
    points: [
      'Sits on a Wazuh SIEM pipeline; no rip-and-replace',
      'Device registry with life-sustaining designations built together',
      '[PLACEHOLDER: pilot duration, scope and success criteria]',
    ],
    featured: true,
  },
  {
    id: 'enterprise',
    intent: 'enterprise' as const,
    name: 'Enterprise discussion',
    audience: 'Hospital groups, healthcare networks and managed security providers.',
    points: [
      'Multi-site and managed-SOC deployment questions',
      'Security review and procurement conversations',
      '[PLACEHOLDER: enterprise terms]',
    ],
    featured: false,
  },
]

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: 'Does MediSIEM replace our SIEM?',
    a: 'No. It sits on a Wazuh pipeline and adds clinical context: deployment-realistic detection, clinically aware ranking and criticality-gated response on top of the alerts your SIEM already collects.',
  },
  {
    q: 'Do you need patient data?',
    a: 'No. No patient data or protected health information was used. The evaluation used public datasets, synthetic telemetry and simulated hospital scenarios. The platform works on network and device metadata, not patient records.',
  },
  {
    q: 'How is device criticality decided?',
    a: 'From a device registry grounded in FDA device classes (21 CFR 860.3), refined with ISO 14971 severity of harm. It is never inferred from network ports or traffic features; that shortcut was found to misroute ventilators during integration.',
  },
  {
    q: 'What happens if a device is unknown?',
    a: 'It fails safe to protected. An unregistered device is treated as life-sustaining, so it gets Monitored Mode rather than isolation, and the decision is marked as fail-safe for the analyst.',
  },
  {
    q: 'Can an attacker abuse that default?',
    a: 'Yes, that risk is real. A device that is unknown to the registry gets the gentler, protected treatment, so an attacker could try to exploit it. The mitigation is operational: keep the registry accurate, review every fail-safe decision the dashboard flags, and remember that Monitored Mode still raises telemetry and keeps a human in the loop.',
  },
  {
    q: 'How do clinicians approve actions?',
    a: 'Through a mobile Approve/Deny link sent by Web Push to the on-call clinician. No VPN is needed. Until they decide, the device stays in non-disruptive containment.',
  },
  {
    q: 'What are the current limitations?',
    a: 'The results come from a research prototype: public datasets, simulated hospital scenarios and one emulated device type. There is no live hospital validation yet, no clinician-sourced ground truth, and SHAP explanations take about 20 seconds per request on development hardware.',
  },
  {
    q: 'What integrations exist?',
    a: 'The prototype runs with Wazuh (SIEM and file-integrity alerts), the Wazuh indexer (OpenSearch), Suricata for MedShield sensing, Shuffle for SOAR workflows, MongoDB for case data, and email, Slack or Teams notifications for Immediate alerts.',
  },
  {
    q: 'What is the pilot process?',
    a: 'A pilot starts by building the device registry with life-sustaining designations and connecting to your Wazuh pipeline. [PLACEHOLDER: pilot steps, duration, scope and success criteria.]',
  },
  {
    q: 'Who owns the IP?',
    a: '[PLACEHOLDER: IP ownership and licensing terms.]',
  },
]

/** FAQPage structured data for the same questions, for pages that render FaqSection. */
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
