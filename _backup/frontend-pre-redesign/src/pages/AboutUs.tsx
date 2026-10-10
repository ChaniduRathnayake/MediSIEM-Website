import { Link } from 'react-router-dom'
import { ExternalLink, User } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { fetchTeam } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import { usePageSeo } from '../hooks/usePageSeo'

export default function AboutUs() {
  usePageSeo({
    title: 'About Us | MediSIEM',
    description: 'The team building MediSIEM and the CAAP clinical alert scoring engine.',
    path: '/about',
  })

  const { data: team, loading } = useAsyncData(fetchTeam, [])

  return (
    <div>
      <PageHeader title="About Us" subtitle="The team building MediSIEM." />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <p className="text-sm text-slate-500">Loading team&hellip;</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <Card key={member._id} className="flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400">
                  <User className="h-7 w-7 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-cyan-400">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-400">{member.component}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-cyan-400"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          Want to get in touch with the team?{' '}
          <Link to="/contact" className="font-medium text-cyan-400 hover:text-cyan-300">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
