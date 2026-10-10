// Real product screenshots. Drop image files into
// src/assets/screenshots/ named after a slot id below (any of .webp, .avif,
// .png, .jpg, .jpeg), e.g. `hero.webp` or `alert-queue.png`. Vite picks them
// up at build time, optimizes and fingerprints them; no code changes needed.
// A section whose slots have no files keeps showing its illustrated visual.
const files = import.meta.glob<string>('../assets/screenshots/*.{webp,avif,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const urlById: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const id = path.split('/').pop()!.replace(/\.(webp|avif|png|jpe?g)$/i, '')
  urlById[id] = url
}

export interface ScreenshotSlot {
  id: string
  /** Where it appears on the site. */
  usedOn: string
  /** Alt text: describe what the screenshot shows. */
  alt: string
  /** Shown in the console frame's address bar. */
  url: string
  /** Tab label when the screenshot is one of several. */
  label?: string
  caption?: string
}

export const screenshotSlots: ScreenshotSlot[] = [
  {
    id: 'hero',
    usedOn: 'Home page hero',
    alt: 'MediSIEM alert queue: alert totals, 24-hour alert volume, severity mix and alerts ranked by Clinical Alert Score',
    url: 'console.medisiem.app/alerts',
  },
  {
    id: 'alert-queue',
    usedOn: 'Console tour (Home, Platform), CAAP Threat Prioritization and Core SIEM product pages',
    label: 'Alert queue',
    alt: 'MediSIEM alert queue ranked by Clinical Alert Score, with CVSS, recommended action and ML detection for each alert',
    url: 'console.medisiem.app/alerts',
    caption: 'Every alert ranked by Clinical Alert Score, with the detection behind it and a clear action: Immediate, Investigate or Monitor.',
  },
  {
    id: 'device-events',
    usedOn: 'Console tour, Core SIEM product page',
    label: 'Events by device',
    alt: 'MediSIEM events grouped by device, listing each rule that fired with its severity and time',
    url: 'console.medisiem.app/events',
    caption: 'Every event the SIEM raises, grouped by the device it came from, with the highest severity on each.',
  },
  {
    id: 'case-management',
    usedOn: 'Console tour, Guided Incident Response product page',
    label: 'Case management',
    alt: 'MediSIEM open cases sorted by severity, with critical cases escalated and a close-case action on each',
    url: 'console.medisiem.app/cases',
    caption: 'Open cases sorted by severity. Critical incidents are escalated automatically, and analysts close them out in one click.',
  },
  {
    id: 'response-playbooks',
    usedOn: 'Console tour, Guided Incident Response product page',
    label: 'Response playbooks',
    alt: 'MediSIEM life-critical SOC console with host isolations awaiting clinician approval and a hash-chained audit timeline',
    url: 'console.medisiem.app/playbooks',
    caption: 'High-impact actions on life-critical devices wait for clinician approval, and every decision is written to a verifiable audit chain.',
  },
  {
    id: 'device-inventory',
    usedOn: 'Console tour, Endpoint & Device Security product page',
    label: 'Device inventory',
    alt: 'MediSIEM device inventory with agent status, operating system, category and tagged medical device for each endpoint',
    url: 'console.medisiem.app/devices',
    caption: 'A live endpoint inventory, with each agent tagged to the workstation or medical device it protects.',
  },
  {
    id: 'ip-reputation',
    usedOn: 'Console tour, Threat Intelligence and Network Security product pages',
    label: 'IP reputation',
    alt: 'MediSIEM real-time IP monitor scoring public IPv4 addresses from network flow telemetry with machine-learning risk scores',
    url: 'console.medisiem.app/ip-reputation',
    caption: 'Public IPs seen in network flows, scored in real time by machine-learning models and flagged for analyst review.',
  },
  {
    id: 'vulnerabilities',
    usedOn: 'Vulnerability Management product page',
    alt: 'MediSIEM vulnerabilities view listing monitored devices with a link to each device’s CVE detections',
    url: 'console.medisiem.app/vulnerabilities',
    caption: 'CVE detections for any monitored device, one click away.',
  },
  {
    id: 'detection-performance',
    usedOn: 'CAAP Threat Prioritization product page',
    label: 'Detection performance',
    alt: 'MediSIEM detection performance view with CISA KEV status and ranking-quality metrics',
    url: 'console.medisiem.app/detection-performance',
    caption: 'Ranking quality measured live against a severity-only baseline, with the CISA Known Exploited Vulnerabilities catalog loaded.',
  },
  {
    id: 'compliance-hipaa',
    usedOn: 'Platform page compliance section, Compliance Management product page',
    label: 'HIPAA',
    alt: 'MediSIEM HIPAA compliance view showing flagged controls per device',
    url: 'console.medisiem.app/compliance/hipaa',
    caption: 'HIPAA controls flagged per device over 7, 30 or 90 days, exportable as CSV or PDF.',
  },
  {
    id: 'compliance-gdpr',
    usedOn: 'Platform page compliance section, Compliance Management product page',
    label: 'GDPR',
    alt: 'MediSIEM GDPR compliance view showing flagged controls per device',
    url: 'console.medisiem.app/compliance/gdpr',
    caption: 'GDPR exposure mapped from alert activity, per device and time window.',
  },
  {
    id: 'compliance-cis',
    usedOn: 'Platform page compliance section, Compliance Management product page',
    label: 'CIS Benchmarks',
    alt: 'MediSIEM CIS compliance view showing benchmark pass rates per device',
    url: 'console.medisiem.app/compliance/cis',
    caption: 'CIS benchmark pass rates from real configuration scans on every device.',
  },
  {
    id: 'analyst-workspace',
    usedOn: 'Trust Center, Access control',
    alt: 'MediSIEM SOC analyst workspace with role-specific navigation and a two-factor authentication requirement set by the administrator',
    url: 'console.medisiem.app/soc',
    caption: 'Each role gets its own workspace, and administrators can require two-factor authentication on any account.',
  },
]

/** Screenshot slots shown on each product page, as tabs when there are several. */
export const productScreenshots: Record<string, string[]> = {
  siem: ['device-events', 'alert-queue'],
  'threat-detection': ['alert-queue', 'detection-performance'],
  'incident-response': ['response-playbooks', 'case-management'],
  'threat-intelligence': ['ip-reputation'],
  'endpoint-security': ['device-inventory'],
  'vulnerability-management': ['vulnerabilities'],
  'network-security': ['ip-reputation'],
  'compliance-management': ['compliance-hipaa', 'compliance-gdpr', 'compliance-cis'],
}

export type Screenshot = ScreenshotSlot & { src: string }

export function getScreenshot(id: string): Screenshot | undefined {
  const slot = screenshotSlots.find((s) => s.id === id)
  const src = urlById[id]
  return slot && src ? { ...slot, src } : undefined
}

/** The slots among `ids` that have a file, in order. */
export function getScreenshots(ids: string[]) {
  return ids.map(getScreenshot).filter((s) => s !== undefined)
}
