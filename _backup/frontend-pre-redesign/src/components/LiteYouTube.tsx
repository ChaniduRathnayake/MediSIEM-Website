import { useState } from 'react'
import { Play } from 'lucide-react'

interface LiteYouTubeProps {
  videoId: string
  title: string
}

// Shows a thumbnail until clicked, then swaps in the real iframe — avoids
// loading YouTube's full embed JS for every visitor who never presses play.
export default function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-slate-950/30 transition-colors group-hover:bg-slate-950/10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-110">
          <Play className="h-7 w-7 fill-slate-950 text-slate-950" />
        </span>
      </span>
    </button>
  )
}
