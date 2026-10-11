import { products } from './products'
import { industries } from './industries'

export const COMPANY = {
  name: 'MediSIEM',
  tagline: 'Clinically aware security for hospital networks',
  // Research stage: keep visitor expectations honest.
  availability: 'Research prototype. Looking for hospital pilot partners.',
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
    label: 'Platform',
    to: '/platform',
    links: [
      { label: 'How it works', to: '/platform#modules', description: 'MedShield, CAAP and criticality-gated response.' },
      { label: 'CVSS vs CAS demo', to: '/platform#demo', description: 'Watch the same alert rank differently by device.' },
      { label: 'Use cases', to: '/platform#use-cases', description: 'Ventilator, insulin pump and admin PC scenarios.' },
      { label: 'Standards', to: '/platform#standards', description: 'The frameworks MediSIEM is informed by.' },
    ],
    footer: { label: 'Explore the platform', to: '/platform' },
  },
  {
    label: 'Products',
    to: '/products',
    links: products.map((p) => ({ label: p.shortName, to: `/products/${p.slug}`, description: p.tagline })),
    footer: { label: 'All products', to: '/products' },
  },
  {
    label: 'Healthcare',
    to: '/industries',
    links: industries.map((i) => ({ label: i.name, to: `/industries/${i.slug}`, description: i.headline })),
    footer: { label: 'See all care settings', to: '/industries' },
  },
  {
    label: 'Research',
    to: '/research',
    links: [
      { label: 'The paper', to: '/research#paper', description: 'Download the paper or copy the BibTeX.' },
      { label: 'Team', to: '/research#team', description: 'The SLIIT team and supervisors behind MediSIEM.' },
      { label: 'What we have validated', to: '/research#validation', description: 'And what we have not, yet.' },
      { label: 'Resources', to: '/resources', description: 'Documentation, articles and guides.' },
    ],
    footer: { label: 'All research', to: '/research' },
  },
  { label: 'Engagement', to: '/pricing' },
]

export const footerColumns: { title: string; links: MenuLink[] }[] = [
  {
    title: 'Platform',
    links: [
      { label: 'How it works', to: '/platform#modules' },
      { label: 'CVSS vs CAS demo', to: '/platform#demo' },
      { label: 'Use cases', to: '/platform#use-cases' },
      { label: 'Products', to: '/products' },
      { label: 'Engagement', to: '/pricing' },
    ],
  },
  {
    title: 'Healthcare',
    links: [
      { label: 'Hospitals', to: '/industries/hospitals' },
      { label: 'Clinics', to: '/industries/clinics' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Integrations', to: '/integrations' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'The paper', to: '/research#paper' },
      { label: 'Team', to: '/research#team' },
      { label: 'Validation', to: '/research#validation' },
      { label: 'Standards', to: '/research#standards' },
      { label: 'Resources', to: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
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
      { label: 'Responsible disclosure', to: '/trust#vulnerability-disclosure' },
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
