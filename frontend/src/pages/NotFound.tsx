import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageSeo } from '../hooks/usePageSeo'

const SUGGESTIONS = [
  { label: 'Platform', to: '/platform' },
  { label: 'Products', to: '/products' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFound() {
  usePageSeo({
    title: 'Page Not Found | MediSIEM',
    description: 'The page you were looking for does not exist.',
    noindex: true,
  })

  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm tracking-widest text-cyan-400">404</p>
        <h1 className="section-title mt-4">This page isn’t on the network.</h1>
        <p className="lead mt-4 max-w-md">The link may be broken or the page may have moved.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {SUGGESTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="btn-secondary">
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
