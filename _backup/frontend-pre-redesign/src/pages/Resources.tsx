import PageHeader from '../components/PageHeader'
import DocumentList from '../components/DocumentList'
import { usePageSeo } from '../hooks/usePageSeo'

export default function Resources() {
  usePageSeo({
    title: 'Resources | MediSIEM',
    description: 'Product overviews, technical whitepapers, and briefs on the MediSIEM platform and the CAAP scoring engine.',
    path: '/resources',
  })

  return (
    <div>
      <PageHeader title="Resources" subtitle="Product overviews, technical whitepapers, and briefs." />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <DocumentList emptyLabel="No resources published yet." />
      </div>
    </div>
  )
}
