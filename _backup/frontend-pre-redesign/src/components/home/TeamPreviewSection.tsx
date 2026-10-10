import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { useAsyncData } from '../../hooks/useAsyncData'
import { fetchTeam } from '../../services/api'
import Reveal from '../Reveal'
import Skeleton from '../Skeleton'

function getInitials(name: string) {
  return name
    .replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function TeamPreviewSection() {
  const { data: team, loading } = useAsyncData(fetchTeam, [])

  const members = team.filter((member) => member.role === 'Team Member')
  const advisors = team.filter((member) => member.role === 'Advisor')

  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Users className="mx-auto h-6 w-6 text-cyan-400" />
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Meet the Team</h2>
          {loading ? (
            <Skeleton className="mx-auto mt-3 h-4 w-72" />
          ) : (
            advisors.length > 0 && (
              <p className="mt-3 text-sm text-slate-400">
                Advised by {advisors.map((a) => a.name).join(' · ')}
              </p>
            )
          )}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-44 w-full" />)
            : members.map((member, i) => (
                <Reveal key={member._id} delayMs={i * 100}>
                  <div className="flex h-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
                        {getInitials(member.name)}
                      </div>
                    )}
                    <h3 className="mt-3 text-sm font-semibold text-white">{member.name}</h3>
                    <p className="mt-2 text-xs text-slate-400">{member.component}</p>
                  </div>
                </Reveal>
              ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/about" className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300">
            Meet the Team &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
