'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import FilmGrain from '@/components/FilmGrain'
import VideoWindow from '@/components/VideoWindow'
import styles from './research.module.css'

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

const PROJECTS = [
  {
    id: 'P-005',
    title: 'Project Obnone',
    tags: ['FALL DETECTION', 'VITAL MONITORING', 'AMBIENT SENSING'],
    year: '2025–2026',
    status: 'ONGOING',
    image: '/images/Obnone/obnone_title.jpg',
    image2: '/images/Obnone/Obnone_design.jpg',
    abstract: 'A privacy-preserving system for detecting falls and monitoring vital signs without cameras. Using non-visual ambient sensing, Project Obnone builds a continuous understanding of human presence and physiological state — enabling real-time intervention in environments where cameras would compromise privacy, dignity or practicality.',
    body: [
      'Falls are the leading cause of injury-related death among older adults and a significant occupational hazard in industrial settings. Conventional fall detection relies on cameras or wearables — both are limited: cameras are intrusive, wearables require compliance. We are building a system that knows without watching.',
      'Our approach begins with the intelligence layer: a reasoning engine that fuses ambient sensing inputs into a coherent model of human presence and state. We are building the brain first. The sensor modalities and physical form — including integration into a robotic body — come later, once the reasoning architecture is validated against real-world data.',
      'Project Obnone is designed from the outset for regulated environments: hospitals, care homes, industrial floors. Every design decision — data minimisation, interpretable outputs, fail-safe behaviour — is made with compliance and trust in mind. When the brain is ready, it will be placed in a body that can act on what it knows.',
    ],
    media: 'IMAGE',
  },
  {
    id: 'P-001',
    image: undefined, image2: undefined,
    title: 'Ground-Truth Perception',
    tags: ['SENSOR FUSION', 'REAL-TIME', '3D MAPPING'],
    year: '2024–2025',
    status: 'ONGOING',
    abstract: 'Development of a multi-modal sensor fusion pipeline that produces sub-centimetre accurate 3D maps of dynamic industrial environments in real time. Combining LiDAR, depth cameras and proprioceptive data, the system enables robots to maintain a continuously updated ground-truth model of their physical surroundings — independent of network connectivity or external infrastructure.',
    body: [
      'Traditional robotic perception relies on pre-built maps that become stale the moment the environment changes. Our approach treats every sensor reading as a live update to a probabilistic world model, allowing manipulation systems to react to unexpected obstacles, displaced objects and human co-workers without manual re-programming.',
      'The core architecture uses a sparse voxel representation fused with neural implicit surfaces, running at 60 Hz on edge hardware. Latency from physical event to world-model update is under 16 ms — fast enough for closed-loop force control.',
      'Early deployment tests in a logistics warehouse showed a 94% reduction in unplanned stop events compared to the baseline perception stack.',
    ],
    media: 'VIDEO',
  },
  {
    id: 'P-002',
    image: undefined, image2: undefined,
    title: 'Physical Intelligence Layer',
    tags: ['ADAPTIVE CONTROL', 'EMBODIED AI', 'SAFETY'],
    year: '2024',
    status: 'COMPLETED',
    abstract: 'A modular AI middleware layer that sits between high-level task planners and low-level motor controllers, continuously monitoring physical feasibility and intervening when planned actions would violate real-world constraints.',
    body: [
      'Task planners operating in abstract state spaces frequently generate action sequences that are theoretically valid but physically impossible — due to friction, inertia, deformation or unforeseen contact. The Physical Intelligence Layer translates symbolic plans into physically grounded motion primitives and rejects or corrects commands that exceed hardware tolerances.',
      'The layer exposes a simple API: any task planner can publish target states; PIL returns either a certified trajectory or a structured failure report that the planner can use to replan. No knowledge of the underlying robot kinematics is required from the task-planning side.',
      'Benchmarks across three different robot platforms showed zero unsafe actions executed in 10,000 consecutive trials, versus a 2.3% unsafe action rate without the layer.',
    ],
    media: 'IMAGE',
  },
  {
    id: 'P-003',
    image: undefined, image2: undefined,
    title: 'Embodied Reasoning',
    tags: ['CAUSAL AI', 'SIMULATION', 'TRANSFER LEARNING'],
    year: '2025',
    status: 'ONGOING',
    abstract: 'Training AI agents that build causal models of physical interactions before acting — enabling reliable transfer from simulation to the real world without extensive fine-tuning.',
    body: [
      'The sim-to-real gap remains one of the central obstacles in deployable robotics. Models trained in simulation encounter contact dynamics, material properties and lighting conditions that differ enough from the real world to cause policy failure. Our approach trains agents to reason about the causal structure of physical events rather than memorising sensorimotor patterns.',
      'Agents are trained in a family of randomised physics simulators and evaluated against a held-out set of real-world manipulation tasks. By learning causal invariants — what must be true regardless of surface material or lighting — agents generalise to novel physical situations without additional data collection.',
      'On a standard pick-and-place benchmark, our agents achieve 89% success rate on first real-world deployment, compared to the 41% baseline for standard domain-randomisation approaches.',
    ],
    media: 'VIDEO',
  },
  {
    id: 'P-004',
    image: undefined, image2: undefined,
    title: 'Tactile Neural Interface',
    tags: ['HAPTICS', 'DEXTEROUS MANIPULATION', 'SENSING'],
    year: '2025',
    status: 'EARLY STAGE',
    abstract: 'High-density tactile sensing arrays coupled with neural processing pipelines, enabling robotic hands to feel contact geometry, slip and material hardness in real time.',
    body: [
      'Human hands contain roughly 17,000 mechanoreceptors. Today\'s robot grippers typically have none. This project develops a thin-film piezoelectric sensor array — 256 taxels per cm² — that can be laminated onto any gripper surface, paired with an on-device signal processing stack that converts raw pressure readings into high-level contact events.',
      'The neural processing pipeline runs on a microcontroller drawing under 200 mW and outputs structured contact events at 500 Hz: contact detected, slip onset, slip direction, estimated normal force, and material-class estimate (rigid / compliant / granular).',
      'Initial grasp experiments show a 3× reduction in object drops and a 78% success rate on precision assembly tasks that previously required visual servoing.',
    ],
    media: 'IMAGE',
  },
]

const MEDIA_IMAGES = ['/about.webp', '/lab.avif']

function PlaceholderMedia({ type, index, title, image }: { type: string; index: number; title: string; image?: string }) {
  if (type === 'VIDEO') {
    return (
      <div style={{ padding: '12px' }}>
        <VideoWindow src="/video9.mov" title={`${title}.mov`} />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image ?? MEDIA_IMAGES[index % MEDIA_IMAGES.length]}
      alt=""
      style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
    />
  )
}

function Research() {
  const [themeIdx, setThemeIdx] = useState(0)
  const [open, setOpen] = useState<typeof PROJECTS[0] | null>(null)
  const searchParams = useSearchParams()
  const t = THEMES[themeIdx]

  useEffect(() => {
    const id = searchParams.get('open')
    if (id) {
      const project = PROJECTS.find(p => p.id === id)
      if (project) setOpen(project)
    }
  }, [searchParams])

  const cycle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button,input,label,[data-no-cycle]')) return
    setThemeIdx(i => (i + 1) % THEMES.length)
  }

  const bgFilter = t.fg === '#FFFFFF' ? 'brightness(0) invert(1)' : 'brightness(0)'

  return (
    <>
      {/* Grain */}
      <FilmGrain />

      {/* Bg logo */}
      <div className={styles.bgGraphic} aria-hidden="true">
        <div className={styles.bgGraphicInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kedorion.svg" alt="" className={styles.bgLogo} style={{ filter: bgFilter }} />
        </div>
      </div>

      {/* Page */}
      <div className={styles.page} style={{ background: t.bg, color: t.fg }} onClick={cycle}>

        {/* Sub-header */}
        <header className={styles.subHeader}>
          <div className={styles.headerBorderTop} style={{ borderColor: t.border }} />
          <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
              <div className={styles.headerMetaBlock}>
                <div className={styles.headerMetaRow}><span>KEDORION — R&amp;D</span></div>
                <span className={styles.headerDividerLine} style={{ borderColor: t.border }} />
                <div className={styles.headerMetaRow}><span>SYS_DATE: 2026</span></div>
              </div>
            </div>
            <div className={styles.headerRight} onClick={e => e.stopPropagation()}>
              <HamburgerMenu />
            </div>
          </div>
          <div className={styles.headerBorderBottom} style={{ borderColor: t.border }} />
        </header>

        {/* Content */}
        <div className={styles.content} data-no-cycle>

          {/* Page title row */}
          <div className={styles.pageTitleRow} style={{ borderBottomColor: t.border }}>
            <span className={styles.pageLabel}>RESEARCH</span>
            <span className={styles.pageCount}>{PROJECTS.length} PROJECTS</span>
          </div>

          {/* Project list */}
          {PROJECTS.map((p, i) => {
            const dimmed = p.id !== 'P-005'
            return (
              <button
                key={p.id}
                className={styles.projectRow}
                style={{
                  borderBottomColor: t.border,
                  color: t.fg,
                  opacity: dimmed ? 0.3 : 1,
                  cursor: dimmed ? 'not-allowed' : 'pointer',
                }}
                disabled={dimmed}
                onClick={e => { e.stopPropagation(); if (!dimmed) setOpen(p) }}
              >
                <span className={styles.projectId}>{p.id}</span>
                <span className={styles.projectTitle}>{p.title}</span>
                <span className={styles.projectTags}>
                  {p.tags.map(tag => (
                    <span key={tag} className={styles.tag} style={{ borderColor: t.border }}>{tag}</span>
                  ))}
                </span>
                <span className={styles.projectMeta}>
                  <span>{p.year}</span>
                  <span className={styles.statusDot} style={{
                    background: p.status === 'ONGOING' ? '#00FF88' : p.status === 'COMPLETED' ? t.fg : '#FF9900',
                    opacity: p.status === 'COMPLETED' ? 0.4 : 1,
                  }} />
                  <span>{p.status}</span>
                </span>
              </button>
            )
          })}

        </div>
      </div>

      {/* Project Modal */}
      {open && (
        <div
          className={styles.modal}
          style={{ background: t.bg, color: t.fg }}
          onClick={() => setOpen(null)}
        >
          <div className={styles.modalInner} onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div className={styles.modalHeader} style={{ borderBottomColor: t.border }}>
              <div className={styles.modalMeta}>
                <span>{open.id}</span>
                <span className={styles.dotRule} style={{ borderColor: t.border }} />
                <span>PHYSICAL AI</span>
                <span className={styles.dotRule} style={{ borderColor: t.border }} />
                <span>{open.year}</span>
              </div>
              <button
                className={styles.closeBtn}
                style={{ color: t.fg, borderColor: t.border }}
                onClick={() => setOpen(null)}
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Modal body */}
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>{open.title.toUpperCase()}</h2>

              <PlaceholderMedia type={open.media} index={PROJECTS.findIndex(p => p.id === open.id)} title={open.title} image={open.image} />

              <div className={styles.modalDivider} style={{ borderColor: t.border }} />

              <p className={styles.abstract}>{open.abstract}</p>

              <div className={styles.modalDivider} style={{ borderColor: t.border }} />

              {open.body.map((para, i) => (
                <>
                  <p key={i} className={styles.bodyText}>{para}</p>
                  {i === 0 && open.image2 && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key="img2"
                      src={open.image2}
                      alt=""
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  )}
                </>
              ))}

              <div className={styles.tagRow}>
                {open.tags.map(tag => (
                  <span key={tag} className={styles.tag} style={{ borderColor: t.border }}>{tag}</span>
                ))}
                <span className={styles.statusChip} style={{ borderColor: t.border }}>{open.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default function ResearchPage() {
  return <Suspense><Research /></Suspense>
}
