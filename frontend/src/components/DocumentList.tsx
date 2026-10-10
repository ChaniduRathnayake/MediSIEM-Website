import { useCallback } from 'react'
import { ArrowUpRight, FileText, Presentation } from 'lucide-react'
import { fetchDocuments } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import type { ProjectDocument } from '../types'

interface DocumentListProps {
  category?: 'document' | 'presentation'
  emptyLabel: string
}

export default function DocumentList({ category, emptyLabel }: DocumentListProps) {
  const fetcher = useCallback(() => fetchDocuments(category), [category])
  const { data: documents, loading } = useAsyncData<ProjectDocument[]>(fetcher, [])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2" aria-busy="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card h-36 animate-pulse" />
        ))}
      </div>
    )
  }

  if (documents.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {documents.map((doc) => {
        const Icon = doc.category === 'presentation' ? Presentation : FileText
        return (
          <li key={doc._id}>
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="card-interactive group flex h-full items-start gap-4 p-6">
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-base font-semibold text-slate-50">{doc.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-cyan-300" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-mono text-[11px] text-slate-500">
                  {doc.category === 'presentation' ? 'Brief' : 'Whitepaper'} ·{' '}
                  {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-400">{doc.description}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
