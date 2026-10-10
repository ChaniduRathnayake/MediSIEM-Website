import { Video } from 'lucide-react'
import { DEMO_VIDEO_ID } from '../../data/media'
import LiteYouTube from '../LiteYouTube'
import Reveal from '../Reveal'

export default function VideoSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">See CAAP in Action</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            A 2-3 minute walkthrough: an alert comes in, gets scored, and the recommended action appears with
            its explanation.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mt-8">
          {DEMO_VIDEO_ID ? (
            <LiteYouTube videoId={DEMO_VIDEO_ID} title="CAAP demo walkthrough" />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 text-center">
              <Video className="h-10 w-10 text-slate-600" />
              <p className="text-sm font-semibold text-slate-400">Demo video coming soon</p>
              <p className="max-w-sm px-4 text-xs text-slate-500">
                Set <code className="rounded bg-slate-800 px-1 py-0.5">DEMO_VIDEO_ID</code> in{' '}
                <code className="rounded bg-slate-800 px-1 py-0.5">src/data/media.ts</code> once the
                walkthrough is recorded and uploaded to YouTube.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
