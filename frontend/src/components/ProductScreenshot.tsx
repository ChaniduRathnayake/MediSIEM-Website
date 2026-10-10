import { useRef } from 'react'
import { Maximize2, X } from 'lucide-react'
import BrowserFrame, { SampleDataTag } from './BrowserFrame'
import { getScreenshot, type Screenshot } from '../data/screenshots'

interface ZoomableScreenshotProps {
  shot: Screenshot
  /** Above-the-fold images load eagerly with high priority (hero). */
  priority?: boolean
  /** Hidden tab panels stay mounted (so tabs never jump) but out of the tab order. */
  inert?: boolean
}

// A screenshot that opens full size in a lightbox when clicked. The native
// <dialog> gives Esc-to-close, focus handling and the backdrop for free.
export function ZoomableScreenshot({ shot, priority = false, inert = false }: ZoomableScreenshotProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        tabIndex={inert ? -1 : undefined}
        className="group relative block w-full cursor-zoom-in"
        aria-label={`Enlarge screenshot: ${shot.alt}`}
      >
        <img
          src={shot.src}
          alt={shot.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="block h-auto w-full"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950/85 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" /> Enlarge
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-label={shot.alt}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-[#030810]/90 backdrop:backdrop-blur-sm"
      >
        <img src={shot.src} alt="" className="block max-h-[90vh] w-auto max-w-[96vw] rounded-xl border border-slate-700 shadow-2xl" />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute -top-3 -right-3 rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-300 shadow-lg hover:text-slate-50"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </dialog>
    </>
  )
}

interface ProductScreenshotProps {
  id: string
  priority?: boolean
  className?: string
}

// Renders a real product screenshot in the console frame, or nothing if the
// slot has no file (callers fall back to the illustrated visual).
export default function ProductScreenshot({ id, priority = false, className = '' }: ProductScreenshotProps) {
  const shot = getScreenshot(id)
  if (!shot) return null
  return (
    <BrowserFrame url={shot.url} className={className} aside={<SampleDataTag label="Lab deployment" />}>
      <ZoomableScreenshot shot={shot} priority={priority} />
    </BrowserFrame>
  )
}
