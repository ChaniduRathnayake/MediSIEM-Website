export type IntegrationStatus = 'available' | 'roadmap'

export type IntegrationCategory =
  | 'Telemetry & SIEM'
  | 'Response Orchestration'
  | 'Threat Intelligence'
  | 'Cloud'
  | 'Network & Firewall'
  | 'Endpoint'
  | 'ITSM & Collaboration'
  | 'Identity'
  | 'Developer'

export interface Integration {
  name: string
  category: IntegrationCategory
  status: IntegrationStatus
  description: string
}

// Only mark an integration 'available' if the platform actually ships it.
// Everything else stays 'roadmap' and is shown under "On the roadmap", never
// as supported. Brand names are rendered as plain text, not logos.
export const integrations: Integration[] = [
  // Shipping today: the platform is built on these.
  { name: 'Wazuh', category: 'Telemetry & SIEM', status: 'available', description: 'Agents, log collection and detection rules.' },
  { name: 'Shuffle', category: 'Response Orchestration', status: 'available', description: 'Open-source SOAR that runs MediSIEM’s safety playbooks.' },
  { name: 'Elasticsearch', category: 'Telemetry & SIEM', status: 'available', description: 'Event storage, search and analytics.' },
  { name: 'Kibana', category: 'Telemetry & SIEM', status: 'available', description: 'Dashboards and investigation views.' },
  { name: 'Syslog', category: 'Telemetry & SIEM', status: 'available', description: 'Standard log forwarding from network and security devices.' },
  { name: 'MISP', category: 'Threat Intelligence', status: 'available', description: 'Indicator feeds and intelligence sharing.' },
  { name: 'Docker', category: 'Developer', status: 'available', description: 'Containerized deployment on-prem or in your cloud.' },
  { name: 'REST API', category: 'Developer', status: 'available', description: 'Programmatic access to alert scores and enrichment.' },

  // Planned: shown as roadmap only.
  { name: 'Microsoft 365', category: 'Cloud', status: 'roadmap', description: 'Audit and sign-in logs.' },
  { name: 'AWS', category: 'Cloud', status: 'roadmap', description: 'CloudTrail, GuardDuty and VPC flow logs.' },
  { name: 'Microsoft Azure', category: 'Cloud', status: 'roadmap', description: 'Activity logs and Defender alerts.' },
  { name: 'Google Cloud', category: 'Cloud', status: 'roadmap', description: 'Cloud Audit Logs and Security Command Center.' },
  { name: 'Cisco', category: 'Network & Firewall', status: 'roadmap', description: 'Firewall and network device telemetry.' },
  { name: 'Palo Alto Networks', category: 'Network & Firewall', status: 'roadmap', description: 'NGFW threat and traffic logs.' },
  { name: 'Fortinet', category: 'Network & Firewall', status: 'roadmap', description: 'FortiGate threat and traffic logs.' },
  { name: 'CrowdStrike', category: 'Endpoint', status: 'roadmap', description: 'Falcon detections as alert sources.' },
  { name: 'Splunk', category: 'Telemetry & SIEM', status: 'roadmap', description: 'Forward prioritized alerts to Splunk.' },
  { name: 'ServiceNow', category: 'ITSM & Collaboration', status: 'roadmap', description: 'Open and sync incident tickets.' },
  { name: 'Jira', category: 'ITSM & Collaboration', status: 'roadmap', description: 'Create remediation issues automatically.' },
  { name: 'Slack', category: 'ITSM & Collaboration', status: 'roadmap', description: 'Immediate-tier alert notifications.' },
  { name: 'Microsoft Teams', category: 'ITSM & Collaboration', status: 'roadmap', description: 'Alert notifications and approvals.' },
  { name: 'Okta', category: 'Identity', status: 'roadmap', description: 'SSO and identity event ingestion.' },
  { name: 'Active Directory', category: 'Identity', status: 'roadmap', description: 'Identity context and authentication events.' },
]

export const availableIntegrations = integrations.filter((i) => i.status === 'available')
export const roadmapIntegrations = integrations.filter((i) => i.status === 'roadmap')
