import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import PlatformDashboard from '../visuals/PlatformDashboard'
import ScreenshotTabs from '../ScreenshotTabs'
import { getScreenshots } from '../../data/screenshots'

// Detect → investigate → respond → manage assets → enrich.
const TOUR = ['alert-queue', 'device-events', 'case-management', 'response-playbooks', 'device-inventory', 'ip-reputation']

const CALLOUTS = [
  { title: 'Ranked, with a clear next step', body: 'Every alert carries an Alert Score and an action tier: Immediate, Investigate or Monitor.' },
  { title: 'People approve the risky steps', body: 'Isolating a life-critical device waits for clinician sign-off, and every decision is hash-chained.' },
  { title: 'Organized around the asset', body: 'Events, vulnerabilities and compliance status for each device, in one place.' },
]

interface DashboardShowcaseProps {
  /** Slots to leave out of the tour, e.g. one the page already shows in its hero. */
  skip?: string[]
}

export default function DashboardShowcase({ skip = [] }: DashboardShowcaseProps) {
  const tour = TOUR.filter((id) => !skip.includes(id))
  const hasTour = getScreenshots(tour).length > 0
  return (
    <section className="section relative overflow-hidden" aria-labelledby="dashboard-heading">
      <div className="glow-cyan absolute top-1/3 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2" aria-hidden="true" />
      <div className="container-page">
        <SectionHeader
          eyebrow="Inside the console"
          title={<span id="dashboard-heading">{hasTour ? 'Tour the console your team will work in.' : 'Your entire security posture, on one screen.'}</span>}
          lead={
            hasTour
              ? 'Real screens from a MediSIEM lab deployment. Pick a view to see how analysts triage, respond and report. Click any screen to enlarge it.'
              : 'Analysts get a ranked queue with the context to act. Leaders get risk, compliance and response trends they can report on.'
          }
          actions={
            <Link to="/platform" className="btn-secondary">
              Explore Platform <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <Reveal className="mt-14">{hasTour ? <ScreenshotTabs ids={tour} label="Console views" /> : <PlatformDashboard />}</Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {CALLOUTS.map((c, i) => (
            <Reveal key={c.title} delayMs={i * 80} className="border-l border-cyan-400/40 pl-5">
              <h3 className="text-sm font-semibold text-slate-50">{c.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
