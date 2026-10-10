import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { usePageSeo } from '../hooks/usePageSeo'

const SECTIONS = [
  { id: 'current-landscape', title: 'The Current Landscape' },
  { id: 'where-tools-fall-short', title: 'Where Existing Tools Fall Short' },
  { id: 'the-problem-we-solve', title: 'The Problem We Solve' },
  { id: 'what-we-set-out-to-build', title: 'What We Set Out to Build' },
  { id: 'our-approach', title: 'Our Approach' },
  { id: 'technology-stack', title: 'Technology Stack' },
]

export default function Technology() {
  usePageSeo({
    title: 'Technology | MediSIEM',
    description:
      'How MediSIEM ranks hospital security alerts by clinical impact: the gap in existing tools, the problem we solve, our approach, and the technology behind the CAAP scoring engine.',
    path: '/technology',
  })

  return (
    <div>
      <PageHeader
        title="Technology"
        subtitle="How MediSIEM ranks hospital security alerts by clinical impact, not just technical severity."
      />
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        {SECTIONS.map((section) => (
          <Card key={section.id}>
            <h2 id={section.id} className="text-xl font-semibold text-white">
              {section.title}
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              TODO: Add {section.title.toLowerCase()} content.
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
