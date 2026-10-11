import { useId, useState } from 'react'
import { ArrowDown, ArrowUp, Equal } from 'lucide-react'
import Reveal from '../Reveal'
import { SectionHeader } from '../ui'
import { ResearchFootnote } from '../research'
import { TierBadge } from '../visuals/charts'
import { getCASAction } from '../../utils/casAction'
import { CAS_WEIGHTS, DEMO_SIGNALS, computeCAS, devicePresets, inversion } from '../../data/research'

type PresetId = (typeof devicePresets)[number]['id'] | 'custom'

interface AlertState {
  preset: PresetId
  cc: number
}

const SIGNALS = [
  { key: 'tr', code: 'TR', label: 'Technical Risk', value: DEMO_SIGNALS.tr, weight: CAS_WEIGHTS.tr },
  { key: 'ts', code: 'TS', label: 'Time Sensitivity', value: DEMO_SIGNALS.ts, weight: CAS_WEIGHTS.ts },
  { key: 'ae', code: 'AE', label: 'Active Exploitation', value: DEMO_SIGNALS.ae, weight: CAS_WEIGHTS.ae },
  { key: 'tc', code: 'TC', label: 'Temporal Context', value: DEMO_SIGNALS.tc, weight: CAS_WEIGHTS.tc },
] as const

function AlertPanel({ name, state, onChange }: { name: string; state: AlertState; onChange: (s: AlertState) => void }) {
  const uid = useId()
  const cas = computeCAS(state.cc)
  const action = getCASAction(cas).label
  const ccContribution = CAS_WEIGHTS.cc * state.cc

  return (
    <div className="card p-6 sm:p-7">
      <p className="font-mono text-[11px] tracking-[0.16em] text-slate-500 uppercase">{name}</p>

      <label htmlFor={`${uid}-device`} className="label mt-4">
        Affected device
      </label>
      <select
        id={`${uid}-device`}
        className="field"
        value={state.preset}
        onChange={(e) => {
          const preset = e.target.value as PresetId
          const found = devicePresets.find((d) => d.id === preset)
          onChange({ preset, cc: found ? found.cc : state.cc })
        }}
      >
        {devicePresets.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label} (FDA Class {d.fdaClass}, CC {d.cc})
          </option>
        ))}
        <option value="custom">Custom criticality</option>
      </select>

      <div className="mt-5 flex items-center justify-between text-sm">
        <label htmlFor={`${uid}-cc`} className="font-medium text-slate-200">
          Clinical Criticality (CC)
        </label>
        <span className="font-mono text-slate-300 tabular-nums">{state.cc}</span>
      </div>
      <input
        id={`${uid}-cc`}
        type="range"
        min={1}
        max={10}
        step={1}
        value={state.cc}
        onChange={(e) => {
          const cc = Number(e.target.value)
          const match = devicePresets.find((d) => d.id === state.preset && d.cc === cc)
          onChange({ preset: match ? state.preset : 'custom', cc })
        }}
        className="mt-2 w-full accent-cyan-400"
        aria-describedby={`${uid}-cc-hint`}
      />
      <p id={`${uid}-cc-hint`} className="mt-1 text-xs text-slate-500">
        1 = no patient-care role, 10 = life-sustaining. Weight 0.30, the largest in the score.
      </p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-slate-800 pt-5" aria-live="polite">
        <div>
          <p className="text-xs font-medium text-slate-400">Clinical Alert Score</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-slate-50 tabular-nums">
            {cas.toFixed(2)}
            <span className="text-base font-normal text-slate-500"> / 10</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-400">Action</p>
          <div className="mt-2">
            <TierBadge tier={action} />
          </div>
        </div>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800" aria-hidden="true">
        <div className="h-full rounded-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${cas * 10}%` }} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Clinical Criticality contributes <span className="font-mono text-slate-300">{ccContribution.toFixed(2)}</span> of the score.
      </p>
    </div>
  )
}

export default function CasDemo() {
  const [a, setA] = useState<AlertState>({ preset: 'ventilator', cc: 10 })
  const [b, setB] = useState<AlertState>({ preset: 'admin', cc: 2 })
  const casA = computeCAS(a.cc)
  const casB = computeCAS(b.cc)
  const diff = casA - casB
  const byCvss = [...inversion].sort((x, y) => y.cvss - x.cvss)
  const byCas = [...inversion].sort((x, y) => y.cas - x.cas)

  return (
    <section id="demo" className="section" aria-labelledby="demo-heading">
      <div className="container-page">
        <SectionHeader
          eyebrow="Interactive demo"
          title={<span id="demo-heading">See why CVSS gets it wrong.</span>}
          lead="Two alerts with identical technical signals. Only the device differs. CVSS gives them the same score; the Clinical Alert Score does not."
        />

        <Reveal className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2" aria-label="Technical signals shared by both alerts">
            {SIGNALS.map((s) => (
              <li key={s.key} className="chip">
                <span className="font-mono text-cyan-300">{s.code}</span> {s.label} {s.value.toFixed(1)}
                <span className="text-slate-500">× {s.weight}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center font-mono text-xs text-slate-500">
            CAS = 0.25·TR + 0.30·CC + 0.25·TS + 0.10·AE + 0.10·TC
          </p>
        </Reveal>

        <Reveal className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <AlertPanel name="Alert A" state={a} onChange={setA} />
          <div className="flex flex-col items-center gap-2 py-2 text-center" aria-live="polite">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 text-slate-300">
              {diff > 0 ? (
                <ArrowUp className="h-5 w-5 text-cyan-400 lg:-rotate-90" aria-hidden="true" />
              ) : diff < 0 ? (
                <ArrowDown className="h-5 w-5 text-cyan-400 lg:-rotate-90" aria-hidden="true" />
              ) : (
                <Equal className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <p className="max-w-[11rem] text-xs text-slate-400">
              {diff === 0 ? 'Same score: the queue cannot separate them.' : `Alert ${diff > 0 ? 'A' : 'B'} is handled first.`}
              <span className="mt-1 block text-slate-500">CVSS: identical for both.</span>
            </p>
          </div>
          <AlertPanel name="Alert B" state={b} onChange={setB} />
        </Reveal>

        {/* Headline inversion from controlled test case TC4 */}
        <Reveal className="mt-16">
          <h3 className="text-center text-xl font-semibold text-balance text-slate-50">
            A probe on a ventilator versus a flood on an admin PC.
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-400">
            Reconnaissance is often the first step toward an attack on a device that cannot be taken offline. CVSS ranks it last. CAS ranks
            it first.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { title: 'Ranked by CVSS', list: byCvss, metric: 'cvss' as const },
              { title: 'Ranked by CAS', list: byCas, metric: 'cas' as const },
            ].map((col) => (
              <div key={col.title} className={`card p-5 sm:p-6 ${col.metric === 'cas' ? 'border-cyan-400/40' : ''}`}>
                <h4 className={`text-sm font-semibold ${col.metric === 'cas' ? 'text-cyan-400' : 'text-slate-300'}`}>{col.title}</h4>
                <ol className="mt-4 space-y-2.5">
                  {col.list.map((x, i) => (
                    <li key={x.id} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                      <span className="w-6 font-mono text-xs text-slate-500">#{i + 1}</span>
                      <span className="w-10 font-mono text-sm font-semibold text-slate-50 tabular-nums">
                        {(col.metric === 'cas' ? x.cas : x.cvss).toFixed(1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-100">{x.title}</p>
                        <p className="text-xs text-slate-500">{x.device}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <ResearchFootnote className="mt-5" />
        </Reveal>
      </div>
    </section>
  )
}
