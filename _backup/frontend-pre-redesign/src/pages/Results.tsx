import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { usePageSeo } from '../hooks/usePageSeo'

export default function Results() {
  usePageSeo({
    title: 'Results | MediSIEM',
    description: 'Performance benchmarks for the CAAP clinical alert scoring engine, pending publication. No fabricated figures.',
    path: '/results',
  })

  return (
    <div>
      <PageHeader title="Results" subtitle="Performance benchmarks for the CAAP scoring engine." />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">TODO &mdash; Not yet available</p>
          <p className="mt-3 text-slate-400">
            Benchmark results aren't published yet. This page will present Random Forest, Isolation Forest, and
            K-Means evaluation metrics (e.g. accuracy, precision/recall, confusion matrices) on the CIC IoMT
            2024 dataset, plus cross-dataset validation on CICIDS 2017, once evaluation is complete.
          </p>
          <p className="mt-3 text-slate-500">
            No metrics are shown here to avoid presenting placeholder numbers as real findings.
          </p>
        </Card>
      </div>
    </div>
  )
}
