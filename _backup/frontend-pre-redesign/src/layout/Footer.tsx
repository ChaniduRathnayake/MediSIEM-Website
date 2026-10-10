import { Link } from 'react-router-dom'
import { ShieldHalf } from 'lucide-react'

// Computed once at module load rather than per render.
const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldHalf className="h-6 w-6 text-cyan-400" />
              <div className="leading-tight">
                <span className="block text-base font-bold text-white">MediSIEM</span>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Healthcare Security Platform
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              MediSIEM ranks hospital security alerts by clinical impact, not just technical severity, using
              the CAAP scoring engine &mdash; so SOC teams act on the threats that matter most to patient
              safety.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Navigate</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/technology" className="hover:text-cyan-400">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-cyan-400">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-cyan-400">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-cyan-400">
                  Results
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {CURRENT_YEAR} MediSIEM. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
