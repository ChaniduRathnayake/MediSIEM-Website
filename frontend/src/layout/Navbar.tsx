import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import { mainNav, type MenuSection } from '../data/site'

function useScrolled(thresholdPx = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > thresholdPx)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [thresholdPx])

  return scrolled
}

function DesktopMenu({ section, open, onOpen, onClose }: { section: MenuSection; open: boolean; onOpen: () => void; onClose: () => void }) {
  const panelId = useId()
  const closeTimer = useRef<number | undefined>(undefined)
  const { pathname } = useLocation()
  const active = pathname === section.to || pathname.startsWith(`${section.to}/`)

  const cancelClose = () => window.clearTimeout(closeTimer.current)
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(onClose, 120)
  }

  if (!section.links) {
    return (
      <NavLink
        to={section.to}
        className={({ isActive }) =>
          `rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${isActive ? 'text-slate-50' : 'text-slate-400 hover:text-slate-50'}`
        }
      >
        {section.label}
      </NavLink>
    )
  }

  const wide = section.links.length > 6

  return (
    <div className="relative" onMouseEnter={() => (cancelClose(), onOpen())} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? onClose() : onOpen())}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
          open || active ? 'text-slate-50' : 'text-slate-400 hover:text-slate-50'
        }`}
      >
        {section.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 ${wide ? 'w-[640px]' : 'w-[440px]'}`}
      >
        <div className="animate-fade-up overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl [animation-duration:250ms]">
          <ul className={`grid gap-1 p-3 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {section.links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={onClose} className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]">
                  <span className="block text-sm font-medium text-slate-100 group-hover:text-cyan-300">{link.label}</span>
                  {link.description && <span className="mt-0.5 line-clamp-1 block text-xs text-slate-500">{link.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {section.footer && (
            <div className="border-t border-slate-800 bg-card/60 px-6 py-3">
              <Link to={section.footer.to} onClick={onClose} className="link-arrow text-[13px]">
                {section.footer.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const scrolled = useScrolled()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  // Close everything on navigation (adjusted during render, so the menus
  // never paint open on the new page).
  const routeKey = location.pathname + location.search
  const [lastRouteKey, setLastRouteKey] = useState(routeKey)
  if (routeKey !== lastRouteKey) {
    setLastRouteKey(routeKey)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  // Escape + outside click close the desktop dropdown.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openMenu, mobileOpen])

  // Lock page scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const solid = scrolled || mobileOpen

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-slate-800/80 bg-slate-950/75 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-cyan-400 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-16 items-center gap-6">
        <Link to="/" aria-label="MediSIEM home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {mainNav.map((section) => (
            <DesktopMenu
              key={section.label}
              section={section}
              open={openMenu === section.label}
              onOpen={() => setOpenMenu(section.label)}
              onClose={() => setOpenMenu((cur) => (cur === section.label ? null : cur))}
            />
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Link to="/research#paper" className="btn-secondary btn-sm hidden xl:inline-flex">
            Read the paper
          </Link>
          <Link to="/contact?intent=pilot" className="btn-primary btn-sm">
            Request a pilot
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-white/5"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="container-page flex min-h-full flex-col py-4">
            <ul className="divide-y divide-slate-800/80">
              {mainNav.map((section) => (
                <li key={section.label}>
                  {section.links ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobileSection === section.label}
                        onClick={() => setMobileSection((cur) => (cur === section.label ? null : section.label))}
                        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-slate-100"
                      >
                        {section.label}
                        <ChevronDown
                          className={`h-4 w-4 text-slate-500 transition-transform ${mobileSection === section.label ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {mobileSection === section.label && (
                        <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                          {section.links.map((link) => (
                            <li key={link.to}>
                              <Link to={link.to} className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-slate-50">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                          {section.footer && (
                            <li>
                              <Link to={section.footer.to} className="link-arrow px-3 py-2">
                                {section.footer.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </Link>
                            </li>
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link to={section.to} className="block py-4 text-base font-medium text-slate-100">
                      {section.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3 pt-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link to="/contact?intent=pilot" className="btn-primary">
                Request a pilot
              </Link>
              <Link to="/research#paper" className="btn-secondary">
                Read the paper
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
