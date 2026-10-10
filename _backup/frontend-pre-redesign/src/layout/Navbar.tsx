import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShieldHalf } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/technology', label: 'Technology' },
  { to: '/results', label: 'Results' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
  }`

function useScrolled(thresholdPx = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > thresholdPx)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [thresholdPx])

  return scrolled
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrolled()

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-slate-800 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/20'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <ShieldHalf className="h-7 w-7 text-cyan-400" />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-white">
              MediSIEM<span className="text-cyan-400">.</span>
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:block">
              Healthcare Security Platform
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center lg:flex">
          <Link
            to="/contact"
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
          >
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
