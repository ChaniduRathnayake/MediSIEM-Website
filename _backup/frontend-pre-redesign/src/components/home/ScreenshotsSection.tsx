import { Image as ImageIcon } from 'lucide-react'
import { PRODUCT_SCREENSHOTS } from '../../data/media'
import BrowserFrame from '../BrowserFrame'
import Reveal from '../Reveal'

export default function ScreenshotsSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-900/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">See the Dashboard</h2>
          <p className="mt-3 text-slate-400">
            MediSIEM and Kibana, with alerts ranked by Clinical Alert Score.
          </p>
        </Reveal>

        {PRODUCT_SCREENSHOTS.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {PRODUCT_SCREENSHOTS.map((shot, i) => (
              <Reveal key={shot.id} delayMs={i * 100}>
                <BrowserFrame url={shot.title}>
                  <img src={shot.imageUrl} alt={shot.caption} className="w-full" loading="lazy" />
                </BrowserFrame>
                <p className="mt-3 text-center text-sm text-slate-400">{shot.caption}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delayMs={100} className="mt-10">
            <BrowserFrame url="medisiem.app/dashboard">
              <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 text-center">
                <ImageIcon className="h-10 w-10 text-slate-600" />
                <p className="text-sm font-semibold text-slate-400">Screenshots coming soon</p>
                <p className="max-w-sm px-4 text-xs text-slate-500">
                  Add entries to <code className="rounded bg-slate-800 px-1 py-0.5">PRODUCT_SCREENSHOTS</code>{' '}
                  in <code className="rounded bg-slate-800 px-1 py-0.5">src/data/media.ts</code> once you have
                  real captures of the MediSIEM and Kibana dashboards.
                </p>
              </div>
            </BrowserFrame>
          </Reveal>
        )}
      </div>
    </section>
  )
}
