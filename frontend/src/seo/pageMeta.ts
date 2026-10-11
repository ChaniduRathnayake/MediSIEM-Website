// Title and description for every page, in one place. Pages pass these to
// usePageSeo, and the build (scripts/prerender.mjs, via ./routes.ts) writes
// them into each route's static HTML so link previews and non-JS crawlers see
// the right text too. Keep this file free of heavy imports: the home page
// loads it eagerly.

export interface PageMeta {
  title: string
  description: string
}

export const pageMeta = {
  '/': {
    title: 'MediSIEM | Clinically Aware Security for Hospital Networks',
    description:
      'MediSIEM is security that knows which device is keeping someone alive. It detects attacks on medical devices, ranks every alert by clinical impact, and never isolates a life-sustaining device without a human. Research prototype from SLIIT.',
  },
  '/platform': {
    title: 'Platform | MediSIEM',
    description:
      'How MediSIEM works: MedShield detects IoMT attacks, CAAP ranks alerts with the Clinical Alert Score, and criticality-gated response protects life-sustaining devices. Try the CVSS vs CAS demo.',
  },
  '/products': {
    title: 'Products | MediSIEM',
    description:
      'MediSIEM products: Core SIEM, CAAP threat prioritization, guided incident response, threat intelligence, endpoint and device security, vulnerability management, network security analytics and compliance management.',
  },
  '/solutions': {
    title: 'Solutions | MediSIEM',
    description:
      'Healthcare security solutions: hospital SOC monitoring, threat detection, clinically safe incident response, medical device protection, vulnerability management, HIPAA and GDPR compliance, EHR and cloud security, and clinical network security.',
  },
  '/industries': {
    title: 'Healthcare | MediSIEM',
    description:
      'MediSIEM protects every care setting: hospitals, healthcare clusters and networks, clinics and medical centres, laboratories and imaging centres, nursing homes and long-term care, and telehealth providers.',
  },
  '/integrations': {
    title: 'Integrations | MediSIEM',
    description:
      'MediSIEM integrations available today (Wazuh, Shuffle, Elasticsearch, Kibana, Syslog, MISP, Docker, REST API) and connectors on the roadmap for cloud, network, endpoint, ITSM and identity platforms.',
  },
  '/pricing': {
    title: 'Engagement Model | MediSIEM',
    description:
      'Work with MediSIEM through a research collaboration, a hospital pilot or an enterprise deployment conversation. Every engagement is scoped with you. Request a pilot.',
  },
  '/research': {
    title: 'Research | MediSIEM',
    description:
      'The research behind MediSIEM: the paper, the SLIIT team (R26-CS-008), what has been validated on public datasets and simulated hospital scenarios, and what has not yet.',
  },
  '/customers': {
    title: 'Customers | MediSIEM',
    description:
      'How organizations use MediSIEM, the outcomes we measure in every deployment, and how to join the MediSIEM early-access design partner program.',
  },
  '/case-studies': {
    title: 'Case Studies | MediSIEM',
    description:
      'How organizations use MediSIEM, the outcomes we measure in every deployment, and how to join the MediSIEM early-access design partner program.',
  },
  '/resources': {
    title: 'Resources | MediSIEM',
    description:
      'Whitepapers, research, documentation, guides and product resources for the MediSIEM platform and the CAAP prioritization engine.',
  },
  '/documentation': {
    title: 'Documentation | MediSIEM',
    description:
      'Deployment, configuration and administration guides for MediSIEM. Full public documentation launches with general availability; early-access partners receive it during onboarding.',
  },
  '/api': {
    title: 'API documentation | MediSIEM',
    description:
      'Programmatic access to alert scores, enrichment and cases. The API reference is shared with early-access partners during onboarding and will be published at general availability.',
  },
  '/blog': {
    title: 'Blog | MediSIEM',
    description: 'Product news, threat analysis and engineering notes from the MediSIEM team. Our first posts are on the way.',
  },
  '/trust': {
    title: 'Trust Center | MediSIEM',
    description:
      'How MediSIEM protects your data: security architecture, encryption, access control, audit logging, privacy, subprocessors, availability, compliance status and vulnerability disclosure.',
  },
  '/security': {
    title: 'Security | MediSIEM',
    description:
      'How MediSIEM protects your data: security architecture, encryption, access control, audit logging, privacy, subprocessors, availability, compliance status and vulnerability disclosure.',
  },
  '/about': {
    title: 'About | MediSIEM',
    description:
      'MediSIEM is clinically aware security for hospital networks, built as research project R26-CS-008 at SLIIT. Meet the team and the principles behind the platform.',
  },
  '/careers': {
    title: 'Careers | MediSIEM',
    description: 'Help build security operations that protect hospitals and their patients at MediSIEM.',
  },
  '/roadmap': {
    title: 'Roadmap | MediSIEM',
    description: 'The MediSIEM product roadmap, from the core scoring engine to general availability.',
  },
  '/contact': {
    title: 'Contact | MediSIEM',
    description:
      'Request a MediSIEM pilot, discuss a research collaboration or deployment, book a walkthrough, or report a security issue to the MediSIEM team.',
  },
  '/signup': {
    title: 'Request a Pilot | MediSIEM',
    description: 'Request a MediSIEM pilot. See your own hospital alerts ranked by clinical impact, alongside the Wazuh deployment you already run.',
  },
  '/status': {
    title: 'System Status | MediSIEM',
    description: 'Live operational status of MediSIEM public services.',
  },
  '/privacy': {
    title: 'Privacy Policy | MediSIEM',
    description: 'What this website collects, why, and the choices you have.',
  },
  '/terms': {
    title: 'Terms of Use | MediSIEM',
    description: 'The terms that apply when you use this website.',
  },
  '/cookies': {
    title: 'Cookie Policy | MediSIEM',
    description: 'How this website uses cookies and similar technologies.',
  },
  '/dpa': {
    title: 'Data Processing Agreement | MediSIEM',
    description: 'How MediSIEM processes customer data on your behalf.',
  },
} satisfies Record<string, PageMeta>

export type StaticPath = keyof typeof pageMeta

/** Static pages that are prerendered but left out of the sitemap. */
export const unlistedPaths: StaticPath[] = []

export const productMeta = (p: { name: string; tagline: string; summary: string }): PageMeta => ({
  title: `${p.name} | MediSIEM`,
  description: `${p.tagline} ${p.summary}`,
})

export const solutionMeta = (s: { title: string; challenge: string; approach: string }): PageMeta => ({
  title: `${s.title} | MediSIEM Solutions`,
  description: `${s.challenge} ${s.approach}`,
})

export const industryMeta = (i: { name: string; headline: string; description: string }): PageMeta => ({
  title: `MediSIEM for ${i.name}`,
  description: `${i.headline} ${i.description}`,
})
