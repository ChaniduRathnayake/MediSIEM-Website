import { Wrench } from 'lucide-react'
import Reveal from '../Reveal'

const TECHNOLOGIES = [
  'Python',
  'scikit-learn',
  'SHAP',
  'Flask',
  'Wazuh',
  'Elasticsearch',
  'Kibana',
  'Docker',
  'MongoDB',
  'Express',
  'React',
  'Node.js',
]

export default function TechStackSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Wrench className="mx-auto h-6 w-6 text-cyan-400" />
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Built With</h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
