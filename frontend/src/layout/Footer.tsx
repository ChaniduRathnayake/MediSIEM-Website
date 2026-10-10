import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'
import { COMPANY, footerColumns, socialLinks } from '../data/site'

// Simple monochrome brand glyphs (lucide no longer ships brand icons).
const SOCIAL_PATHS: Record<(typeof socialLinks)[number]['label'], string> = {
  LinkedIn:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-4z',
  GitHub:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z',
  X: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.2h1.7L7.4 4.73H5.58z',
}

// Evaluated once at load; a session doesn't outlive a new year in practice.
const YEAR = new Date().getFullYear()

export default function Footer() {
  const socials = socialLinks.filter((s) => s.href)

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950">
      <div className="hairline absolute inset-x-0 top-0 h-px opacity-40" aria-hidden="true" />
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
          <div className="max-w-sm">
            <Link to="/" aria-label="MediSIEM home">
              <Logo />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Safety-as-a-Service security operations for hospitals. Detect, prioritize and respond to the threats that matter most,
              without putting patient care at risk.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary btn-sm">
                Get Started
              </Link>
              <Link to="/contact?intent=demo" className="btn-secondary btn-sm">
                Book a Demo
              </Link>
            </div>
            {socials.length > 0 && (
              <ul className="mt-8 flex gap-2" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MediSIEM on ${s.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d={SOCIAL_PATHS[s.label]} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-mono text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-slate-400 transition-colors hover:text-slate-50">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-card/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-sm text-slate-300">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            {COMPANY.availability}
          </p>
          <Link to="/contact?intent=partner" className="link-arrow">
            Apply for early access <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {YEAR} MediSIEM. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-slate-300">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-slate-300">
              Cookies
            </Link>
            <Link to="/status" className="hover:text-slate-300">
              System status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
