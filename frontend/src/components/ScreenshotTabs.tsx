import { useId, useRef, useState, type KeyboardEvent } from 'react'
import BrowserFrame, { SampleDataTag } from './BrowserFrame'
import { ZoomableScreenshot } from './ProductScreenshot'
import { getScreenshots } from '../data/screenshots'

interface ScreenshotTabsProps {
  /** Slot ids, in tab order. Slots without a file are skipped. */
  ids: string[]
  /** Accessible name for the tab list. */
  label: string
  className?: string
}

// Several product screenshots in one console frame, switched with tabs. All
// panels stay mounted in the same grid cell, so the frame takes the height of
// the tallest screenshot and never jumps when switching.
export default function ScreenshotTabs({ ids, label, className = '' }: ScreenshotTabsProps) {
  const shots = getScreenshots(ids)
  const [index, setIndex] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()

  if (shots.length === 0) return null
  const active = shots[Math.min(index, shots.length - 1)]
  const multiple = shots.length > 1

  function onKeyDown(e: KeyboardEvent) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + shots.length) % shots.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <figure className={className}>
      {multiple && (
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="mb-5 flex justify-start gap-1.5 overflow-x-auto pb-1 sm:justify-center">
          {shots.map((s, i) => {
            const selected = s.id === active.id
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  selected
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {s.label ?? s.alt}
              </button>
            )
          })}
        </div>
      )}

      <div id={`${uid}-panel`} role={multiple ? 'tabpanel' : undefined} aria-labelledby={multiple ? `${uid}-tab-${active.id}` : undefined}>
        <BrowserFrame url={active.url} aside={<SampleDataTag label="Lab deployment" />}>
          <div className="grid">
            {shots.map((s) => {
              const selected = s.id === active.id
              return (
                <div
                  key={s.id}
                  aria-hidden={!selected}
                  className={`col-start-1 row-start-1 self-start transition-opacity duration-300 ${selected ? 'opacity-100' : 'invisible opacity-0'}`}
                >
                  <ZoomableScreenshot shot={s} inert={!selected} />
                </div>
              )
            })}
          </div>
        </BrowserFrame>
      </div>

      {active.caption && (
        <figcaption className="mx-auto mt-5 max-w-3xl text-center text-sm text-pretty text-slate-400" aria-live="polite">
          {active.caption}
        </figcaption>
      )}
    </figure>
  )
}
