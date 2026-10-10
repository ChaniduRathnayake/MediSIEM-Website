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
    title: 'MediSIEM | Safety-as-a-Service Security Operations for Hospitals',
    description:
      'MediSIEM is Safety-as-a-Service security for hospitals that can’t afford enterprise SOC tooling. It ranks every alert by patient impact and asks a clinician before any response cuts off a life-critical device.',
  },
  '/platform': {
    title: 'Platform | MediSIEM',
    description:
      'How MediSIEM works: unified telemetry, machine-learning detection, threat-intelligence enrichment and the CAAP impact-aware Alert Score, with guided, auditable response.',
  },
  '/products': {
    title: 'Products | MediSIEM',
    description:
      'MediSIEM products: Core SIEM, CAAP threat prioritization, guided incident response, threat intelligence, endpoint and device security, vulnerability management, network security analytics and compliance management.',
  },
  '/solutions': {
    title: 'Solutions | MediSIEM',
    description:
      'Security solutions for SOC monitoring, threat detection, incident response, vulnerability management, compliance, endpoint protection, cloud security and network security.',
  },
  '/industries': {
    title: 'Industries | MediSIEM',
    description:
      'MediSIEM is built first for hospitals and public healthcare clusters, and adapts to banking and finance, government, education, retail, manufacturing, technology and SMEs.',
  },
  '/integrations': {
    title: 'Integrations | MediSIEM',
    description:
      'MediSIEM integrations available today (Wazuh, Shuffle, Elasticsearch, Kibana, Syslog, MISP, Docker, REST API) and connectors on the roadmap for cloud, network, endpoint, ITSM and identity platforms.',
  },
  '/pricing': {
    title: 'Pricing | MediSIEM',
    description:
      'MediSIEM Safety-as-a-Service pricing for hospitals: a one-time setup fee for IoMT integration, then a flat monthly subscription from LKR 15,000.',
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
      'MediSIEM builds Safety-as-a-Service security operations for hospitals that can’t afford enterprise SOC tooling. Meet the team and the principles behind the platform.',
  },
  '/careers': {
    title: 'Careers | MediSIEM',
    description: 'Help build impact-aware security operations at MediSIEM.',
  },
  '/roadmap': {
    title: 'Roadmap | MediSIEM',
    description: 'The MediSIEM product roadmap, from the core scoring engine to general availability.',
  },
  '/contact': {
    title: 'Contact | MediSIEM',
    description:
      'Book a MediSIEM demo, get a setup quote for your hospital, talk to sales or a security expert, apply for early access, or contact our security team.',
  },
  '/signup': {
    title: 'Get Started | MediSIEM',
    description: 'Start a guided MediSIEM pilot. Connect part of your hospital network and see your own alerts ranked by patient impact.',
  },
  '/login': {
    title: 'Log in | MediSIEM',
    description: 'Sign in to your organization’s MediSIEM console.',
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
export const unlistedPaths: StaticPath[] = ['/login']

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
