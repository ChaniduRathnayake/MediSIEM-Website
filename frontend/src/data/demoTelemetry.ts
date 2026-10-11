// Illustrative sample data for product visualizations (hero and platform
// dashboards, interactive demo). Every place this renders is labelled
// "Sample data" in the UI. It depicts what the console shows, not
// measurements from a customer environment.

export type Tier = 'Immediate' | 'Investigate' | 'Monitor'

export interface SampleAlert {
  id: string
  title: string
  asset: string
  score: number
  tier: Tier
  technique: string
  time: string
}

// Illustrative sample alerts for UI previews, not measured results. Scores
// are in the CAS range and tiers follow getCASAction.
export const sampleAlerts: SampleAlert[] = [
  { id: 'A-2041', title: 'Denial-of-service flood', asset: 'ICU ventilator · Ward 3B', score: 9.1, tier: 'Immediate', technique: 'T1498', time: '02:14' },
  { id: 'A-2039', title: 'Ransomware signature', asset: 'Radiology PACS server', score: 8.1, tier: 'Immediate', technique: 'T1486', time: '02:09' },
  { id: 'A-2036', title: 'Credential brute force', asset: 'VPN gateway', score: 6.4, tier: 'Investigate', technique: 'T1110', time: '01:52' },
  { id: 'A-2030', title: 'Unusual outbound volume', asset: 'Lab analyzer · Pathology', score: 5.6, tier: 'Investigate', technique: 'T1048', time: '01:31' },
  { id: 'A-2027', title: 'Trojan downloader', asset: 'Admin PC · Billing', score: 4.1, tier: 'Monitor', technique: 'T1105', time: '01:18' },
]

/** Security events per hour over the last 24h (sample). */
export const eventsPerHour = [
  412, 388, 365, 341, 330, 352, 401, 498, 612, 688, 702, 695, 671, 684, 690, 702, 676, 640, 590, 548, 512, 489, 462, 1180,
]

/** Prioritized (Immediate + Investigate) alerts per day, last 14 days (sample). */
export const prioritizedPerDay = [18, 22, 17, 25, 21, 19, 14, 16, 23, 28, 24, 19, 15, 12]

export const attackTrends = [
  { label: 'Ransomware', value: 34 },
  { label: 'Credential attacks', value: 27 },
  { label: 'Denial of service', value: 18 },
  { label: 'Data exfiltration', value: 12 },
  { label: 'Malware', value: 9 },
]

export const endpointStatus = { healthy: 1184, atRisk: 63, offline: 21 }

export const vulnerabilityOverview = [
  { label: 'Critical', value: 7, tone: 'critical' as const },
  { label: 'High', value: 31, tone: 'warning' as const },
  { label: 'Medium', value: 118, tone: 'neutral' as const },
  { label: 'Low', value: 264, tone: 'neutral' as const },
]

export const incidentStatus = [
  { label: 'Open', value: 4 },
  { label: 'Awaiting approval', value: 2 },
  { label: 'Contained', value: 9 },
  { label: 'Resolved (7d)', value: 37 },
]

export const timeline = [
  { time: '02:14', label: 'DoS flood on ICU ventilator scored 9.1, Immediate', tone: 'critical' as const },
  { time: '02:15', label: 'Network isolation proposed · awaiting clinical approval', tone: 'warning' as const },
  { time: '02:17', label: 'Approved by charge nurse · segment rate-limited', tone: 'info' as const },
  { time: '02:21', label: 'Traffic normalized · incident contained', tone: 'success' as const },
]
