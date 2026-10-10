export interface ComparisonAlert {
  id: 'icu-dos' | 'radiology-ransomware' | 'admin-malware'
  title: string
  device: string
  attackType: string
  cvss: number
  cas: number
}

// Illustrative scenario, not recorded production data: three alerts from a
// single night shift, scored with a representative CVSS base score and the
// documented CAS formula (CAS = (0.25*TR + 0.30*CC + 0.25*TS + 0.10*AE + 0.10*TC) x 2).
// Demonstrates how clinical context changes the ranking — not a claim about
// real incident logs.
export const comparisonAlerts: ComparisonAlert[] = [
  {
    id: 'icu-dos',
    title: 'Denial-of-Service Flood',
    device: 'ICU Ventilator — Ward 3B',
    attackType: 'Denial of Service',
    cvss: 6.8,
    cas: 9.1,
  },
  {
    id: 'radiology-ransomware',
    title: 'Ransomware Signature Detected',
    device: 'Radiology PACS Server',
    attackType: 'Ransomware',
    cvss: 7.4,
    cas: 8.1,
  },
  {
    id: 'admin-malware',
    title: 'Trojan Downloader',
    device: 'Admin PC — Billing Office',
    attackType: 'Malware',
    cvss: 8.1,
    cas: 4.1,
  },
]
