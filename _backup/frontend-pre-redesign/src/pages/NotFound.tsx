import { Link } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'

export default function NotFound() {
  usePageSeo({
    title: 'Page Not Found | MediSIEM',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  })

  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-6xl font-extrabold text-transparent">
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 text-slate-400">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
      >
        Back to Home
      </Link>
    </div>
  )
}
