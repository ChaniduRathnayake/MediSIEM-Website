export interface Statistic {
  id: string
  value: string
  label: string
  source: string
  sourceUrl: string
  year: string
}

// Every number here is independently verified against its primary source
// (fetched directly, not taken from a secondary summary) and linked.
// Do not add a number without a citation. See README "Statistics" section
// before editing.
export const statistics: Statistic[] = [
  {
    id: 'breach-cost',
    value: '$7.42M',
    label: 'Average cost of a healthcare data breach, the costliest industry of any, 14 years running',
    source: 'IBM Cost of a Data Breach Report 2025 (Ponemon Institute), via HealthTech Security',
    sourceUrl:
      'https://www.techtarget.com/healthtechsecurity/news/366628031/Healthcare-remains-costliest-industry-for-breaches-at-742M',
    year: '2025',
  },
  {
    id: 'ransomware-share',
    value: '22%',
    label: 'Of all disclosed ransomware attacks targeted healthcare in 2025, more than any other sector',
    source: 'BlackFog 2025 State of Ransomware Report, via HIPAA Journal',
    sourceUrl: 'https://www.hipaajournal.com/healthcare-most-targeted-sector-2025-ransomware/',
    year: '2025',
  },
  {
    id: 'adjacent-hospital-strokes',
    value: '+113.6%',
    label: "Rise in confirmed strokes at a hospital that wasn't even targeted, while ransomware disrupted a nearby facility",
    source: 'JAMA Network Open',
    sourceUrl: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2804585',
    year: '2023',
  },
  {
    id: 'iomt-vulnerabilities',
    value: '99%',
    label: 'Of hospitals manage connected medical devices (IoMT) carrying known, actively exploited vulnerabilities',
    source: 'Claroty State of CPS Security: Healthcare Exposures 2025, via HIPAA Journal',
    sourceUrl: 'https://www.hipaajournal.com/99-of-healthcare-orgs-managing-iomt-devices-with-known-exploited-vulnerabilities/',
    year: '2025',
  },
]
