import { FileText } from 'lucide-react'
import Card from './Card'
import { fetchDocuments } from '../services/api'
import { useAsyncData } from '../hooks/useAsyncData'
import type { ProjectDocument } from '../types'

interface DocumentListProps {
  category?: 'document' | 'presentation'
  emptyLabel: string
}

export default function DocumentList({ category, emptyLabel }: DocumentListProps) {
  const fetcher = () => fetchDocuments(category)
  const { data: documents, loading } = useAsyncData<ProjectDocument[]>(fetcher, [])

  if (loading) {
    return <p className="text-sm text-slate-500">Loading&hellip;</p>
  }

  if (documents.length === 0) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {documents.map((doc) => (
        <Card key={doc._id} className="flex items-start gap-4">
          <FileText className="mt-1 h-6 w-6 flex-shrink-0 text-cyan-400" />
          <div>
            <h3 className="text-base font-semibold text-white">{doc.title}</h3>
            <p className="mt-1 text-xs text-slate-500">
              {new Date(doc.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <p className="mt-2 text-sm text-slate-400">{doc.description}</p>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-cyan-400 hover:text-cyan-300"
            >
              View file &rarr;
            </a>
          </div>
        </Card>
      ))}
    </div>
  )
}
