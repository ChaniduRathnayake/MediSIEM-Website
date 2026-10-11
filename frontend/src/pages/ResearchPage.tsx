import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CTABanner, PageHero } from '../components/ui'
import Reveal from '../components/Reveal'
import TeamSection, { PaperCard } from '../components/sections/TeamSection'
import ValidationSection from '../components/sections/ValidationSection'
import StandardsSection from '../components/sections/StandardsSection'
import { institution, paper, TAGLINE } from '../data/research'
import { usePageSeo } from '../hooks/usePageSeo'
import { pageMeta } from '../seo/pageMeta'
import { SITE_URL } from '../seo/siteUrl'

export default function ResearchPage() {
  usePageSeo({
    ...pageMeta['/research'],
    path: '/research',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline: paper.title,
      name: paper.title,
      description: `${TAGLINE} Clinically aware detection, prioritization and response for hospital Internet of Medical Things networks.`,
      inLanguage: 'en',
      keywords: ['healthcare cybersecurity', 'IoMT', 'SIEM', 'alert prioritization', 'incident response', 'DDoS detection'],
      url: `${SITE_URL}/research#paper`,
      sourceOrganization: { '@type': 'CollegeOrUniversity', name: institution.name },
      about: { '@id': `${SITE_URL}/#organization` },
    },
  })

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="The research behind MediSIEM."
        lead={`Every number on this site comes from ${institution.project} at ${institution.name}. Read the paper, meet the team, and see exactly what has and hasn’t been validated.`}
        actions={
          <Link to="/contact?intent=research" className="btn-primary">
            Collaborate with us <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        }
      />
      <section className="section pb-0" aria-label="Research paper">
        <div className="container-page">
          <Reveal>
            <PaperCard />
          </Reveal>
        </div>
      </section>
      <TeamSection />
      <ValidationSection />
      <StandardsSection />
      <CTABanner
        title="Help us validate clinically aware security."
        lead="We are looking for hospitals and research partners for pilots, clinician-sourced ground truth and evaluation on more device types."
        primary={{ label: 'Request a pilot', to: '/contact?intent=pilot' }}
        secondary={{ label: 'Research collaboration', to: '/contact?intent=research' }}
      />
    </>
  )
}
