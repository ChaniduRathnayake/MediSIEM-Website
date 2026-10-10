import { Link } from 'react-router-dom'
import { builtOn, frameworkCoverage } from '../../data/marketing'

// Only genuine claims: frameworks we *map to* (not certifications) and the
// open-source technologies the platform is actually built on. Customer logos
// get added here once customers have approved their use.
export default function TrustBar() {
  return (
    <section aria-label="Standards and technology" className="border-y border-slate-800/70 bg-slate-900/30">
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">Detections mapped to</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {frameworkCoverage.map((f) => (
              <li key={f} className="text-[15px] font-semibold tracking-tight text-slate-300/90">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:border-l lg:border-slate-800 lg:pl-14">
          <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">Built on open technology</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {builtOn.map((b) => (
              <li key={b} className="text-[15px] font-semibold tracking-tight text-slate-300/90">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="container-page pb-6 text-[11px] text-slate-500">
        Framework mapping describes coverage, not certification.{' '}
        <Link to="/trust#compliance" className="underline decoration-slate-700 underline-offset-2 hover:text-slate-300">
          See our compliance status
        </Link>
        .
      </p>
    </section>
  )
}
