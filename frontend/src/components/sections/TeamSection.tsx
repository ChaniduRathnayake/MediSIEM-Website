import { useState } from 'react'
import { Check, Copy, Download, FileText, GraduationCap } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { institution, paper, supervisors, team } from '../../data/research'

function initials(name: string) {
  const words = name.replace(/^(mr|ms|mrs|dr|prof)\.?\s+/i, '').split(/[\s.]+/).filter((w) => w.length > 2)
  return (words[words.length - 1] ?? name)[0].toUpperCase()
}

function Person({ name, detail }: { name: string; detail: string }) {
  return (
    <li className="card flex items-center gap-4 p-5">
      {/* PLACEHOLDER: replace the initial with a photo (square, ~200px, WebP) */}
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-600 bg-slate-900 text-lg font-semibold text-slate-300"
        title="[PLACEHOLDER: photo]"
        aria-hidden="true"
      >
        {initials(name)}
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-slate-50">{name}</p>
        <p className="mt-0.5 text-sm text-slate-400">{detail}</p>
      </div>
    </li>
  )
}

export function PaperCard() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(paper.bibtex)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article id="paper" className="card scroll-mt-28 p-6 sm:p-8" aria-labelledby="paper-title">
      <div className="flex items-start gap-4">
        <span className="icon-tile">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-cyan-400 uppercase">Research paper</p>
          <h3 id="paper-title" className="mt-2 text-xl font-semibold text-balance text-slate-50 sm:text-2xl">
            {paper.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">[PLACEHOLDER: authors, venue and publication status]</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={paper.pdfPath} download className="btn-primary">
          <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
        </a>
        <button type="button" onClick={copy} className="btn-secondary">
          {copied ? <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'BibTeX copied' : 'Copy BibTeX'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'BibTeX citation copied to clipboard' : ''}
        </span>
      </div>
      <details className="mt-5 [&_summary::-webkit-details-marker]:hidden">
        <summary className="cursor-pointer list-none text-sm font-medium text-cyan-400 hover:text-cyan-300">Show BibTeX</summary>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-300">
          {paper.bibtex}
        </pre>
      </details>
    </article>
  )
}

export default function TeamSection() {
  return (
    <section id="team" className="section" aria-labelledby="team-heading">
      <div className="container-page">
        <SectionHeader
          align="left"
          eyebrow="Team and credibility"
          title={<span id="team-heading">Built as university research, in the open.</span>}
          lead={`MediSIEM began as ${institution.project} at the ${institution.department}, ${institution.name}. Each module is one researcher’s component, evaluated on its own and integrated through shared interfaces.`}
        />

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          {/* PLACEHOLDER: replace with the SLIIT logo once usage is approved */}
          <span className="flex h-16 w-44 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-600 px-3 text-center text-xs text-slate-500">
            [PLACEHOLDER: SLIIT logo]
          </span>
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <GraduationCap className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            {institution.department}, {institution.name}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="text-sm font-semibold tracking-wide text-slate-300">Research team</h3>
            <ul className="mt-4 space-y-3">
              {team.map((p) => (
                <Person key={p.name} name={p.name} detail={p.area} />
              ))}
            </ul>
          </Reveal>
          <Reveal delayMs={80}>
            <h3 className="text-sm font-semibold tracking-wide text-slate-300">Supervisors</h3>
            <ul className="mt-4 space-y-3">
              {supervisors.map((p) => (
                <Person key={p.name} name={p.name} detail={p.role} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
