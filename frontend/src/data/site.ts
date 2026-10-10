import { products } from './products'
import { solutions } from './solutions'
import { industries } from './industries'

export const COMPANY = {
  name: 'MediSIEM',
  tagline: 'Safety-as-a-Service for hospitals',
  // Pre-GA: keep visitor expectations honest (see fallbackData milestones).
  availability: 'Now onboarding early-access partners',
}

export interface MenuLink {
  label: string
  to: string
  description?: string
}

export interface MenuSection {
  label: string
  /** Top-level destination (also used on mobile). */
  to: string
  links?: MenuLink[]
  footer?: MenuLink
}

export const mainNav: MenuSection[] = [
  {
    label: 'Products',
    to: '/products',
    links: products.map((p) => ({ label: p.shortName, to: `/products/${p.slug}`, description: p.tagline })),
    footer: { label: 'Explore the platform', to: '/platform' },
  },
  {
    label: 'Solutions',
    to: '/solutions',
    links: solutions.map((s) => ({ label: s.title, to: `/solutions/${s.slug}`, description: s.challenge })),
    footer: { label: 'See all solutions', to: '/solutions' },
  },
  {
    label: 'Industries',
    to: '/industries',
    links: industries.map((i) => ({ label: i.name, to: `/industries/${i.slug}`, description: i.headline })),
    footer: { label: 'See all industries', to: '/industries' },
  },
  { label: 'Integrations', to: '/integrations' },
  {
    label: 'Resources',
    to: '/resources',
    links: [
      { label: 'Documentation', to: '/documentation', description: 'Deploy, configure and operate MediSIEM.' },
      { label: 'API Reference', to: '/api', description: 'Programmatic access to scores and alerts.' },
      { label: 'Blog', to: '/blog', description: 'Product news and threat analysis.' },
      { label: 'Case Studies', to: '/case-studies', description: 'How teams deploy MediSIEM.' },
      { label: 'Trust Center', to: '/trust', description: 'Security, privacy and compliance.' },
      { label: 'Roadmap', to: '/roadmap', description: 'What we are building next.' },
    ],
    footer: { label: 'All resources', to: '/resources' },
  },
  { label: 'Pricing', to: '/pricing' },
]

export const footerColumns: { title: string; links: MenuLink[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'SIEM', to: '/products/siem' },
      { label: 'Threat Detection', to: '/products/threat-detection' },
      { label: 'Vulnerability Management', to: '/products/vulnerability-management' },
      { label: 'Endpoint Security', to: '/products/endpoint-security' },
      { label: 'Compliance', to: '/products/compliance-management' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'SOC Monitoring', to: '/solutions/soc-monitoring' },
      { label: 'Enterprise Security', to: '/solutions' },
      { label: 'Cloud Security', to: '/solutions/cloud-security' },
      { label: 'Healthcare', to: '/industries/healthcare' },
      { label: 'Banking', to: '/industries/banking-finance' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '/documentation' },
      { label: 'Blog', to: '/blog' },
      { label: 'Research', to: '/resources#research' },
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'API', to: '/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Customers', to: '/customers' },
      { label: 'Careers', to: '/careers' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Security',
    links: [
      { label: 'Trust Center', to: '/trust' },
      { label: 'Security', to: '/security' },
      { label: 'Vulnerability Disclosure', to: '/trust#vulnerability-disclosure' },
      { label: 'Status', to: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
      { label: 'DPA', to: '/dpa' },
    ],
  },
]

// TODO(social): add real profile URLs. Entries with an empty href are not rendered.
export const socialLinks: { label: 'LinkedIn' | 'GitHub' | 'X'; href: string }[] = [
  { label: 'LinkedIn', href: '' },
  { label: 'GitHub', href: '' },
  { label: 'X', href: '' },
]
