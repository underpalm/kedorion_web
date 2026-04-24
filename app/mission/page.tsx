'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import FilmGrain from '@/components/FilmGrain'
import styles from './mission.module.css'

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

function Img({ src, wide }: { src: string; wide?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src} alt=""
      style={{ width: '100%', aspectRatio: wide ? '16/6' : '4/3', objectFit: 'cover', display: 'block' }}
    />
  )
}

export default function Mission() {
  const [themeIdx, setThemeIdx] = useState(0)
  const t = THEMES[themeIdx]
  const cycle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button,input,label,[data-nc]')) return
    setThemeIdx(i => (i + 1) % THEMES.length)
  }
  const bgFilter = t.fg === '#FFFFFF' ? 'brightness(0) invert(1)' : 'brightness(0)'

  return (
    <>
      <FilmGrain />
      <div className={styles.bgGraphic} aria-hidden="true">
        <div className={styles.bgGraphicInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kedorion.svg" alt="" className={styles.bgLogo} style={{ filter: bgFilter }} />
        </div>
      </div>

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

        <div className={styles.content} data-nc>

          {/* Hero */}
          <div className={styles.heroSection} style={{ borderBottomColor: t.border }}>
            <div className={styles.heroLabel}>KEDORION — MISSION &amp; ABOUT</div>
            <h1 className={styles.heroTitle}>Our<br />Mission.</h1>
          </div>

          {/* Wide image */}
          <div style={{ borderBottom: `0.5px dashed ${t.border}` }}>
            <Img src="/images/Mission/pramod-tiwari-JUVbeeevaYw-unsplash.jpg" wide />
          </div>

          {/* Mission statement */}
          <div className={styles.sectionSingle} style={{ borderBottomColor: t.border }}>
            <span className={styles.sectionLabel}>THE MISSION</span>
            <h2 className={styles.sectionTitle}>Technology that knows its place.</h2>
            <div className={styles.sectionBody}>
              <p>Kedorion exists to build the intelligence layer between the digital and the physical. We develop AI systems that do not operate in abstraction — they operate in warehouses, on factory floors, on roads and in operating theatres, where the cost of being wrong is not a bad prediction score but a real-world consequence.</p>
              <p>Our work centres on a single question: how do you make a machine reliably understand the physical world it is actually in, not the one it was trained on? That question drives everything — our sensor fusion research, our physical intelligence middleware, our embodied reasoning systems.</p>
              <p>We believe the next decade of AI progress is not about larger models. It is about grounding intelligence in physical reality, and building the infrastructure that makes that grounding trustworthy at scale.</p>
            </div>
          </div>

          {/* About — two columns */}
          <div className={styles.section} style={{ borderBottomColor: t.border }}>
            <div className={styles.sectionLeft} style={{ borderRightColor: t.border }}>
              <span className={styles.sectionLabel}>ABOUT KEDORION</span>
              <h2 className={styles.sectionTitle}>Ground Truth Architects.</h2>
              <div className={styles.sectionBody}>
                <p>Kedorion was founded on the conviction that physical AI — systems that perceive, reason about, and act in the real world — is both the hardest unsolved problem in applied AI and the most consequential one to get right.</p>
                <p>We are a research-led company. Our teams work at the boundary between machine learning, robotics, sensor engineering and control theory. We publish, we collaborate with universities, and we ship production systems to industrial partners.</p>
                <p>We are based in Germany, operating across Europe. Our investors and partners share our long-term conviction: that reliable physical intelligence, built with rigour, will define the next generation of industrial and social infrastructure.</p>
              </div>
            </div>
            <div className={styles.sectionRight}>
              <Img src="/images/Mission/photo-1580161038901-5b908c84a7e8.avif" />
            </div>
          </div>

          {/* Pull quote */}
          <div className={styles.pullQuote} style={{ borderBottomColor: t.border }}>
            <div className={styles.quoteText} style={{ color: t.fg }}>
              "The most important technology is the kind that works reliably when it matters — in the physical world, under real conditions, with real stakes."
            </div>
            <div className={styles.quoteSource}>— KEDORION, FOUNDING PRINCIPLE</div>
          </div>

          {/* What we build — two columns */}
          <div className={styles.section} style={{ borderBottomColor: t.border }}>
            <div className={styles.sectionLeft} style={{ borderRightColor: t.border }}>
              <Img src="/images/Mission/photo-1660232784863-2fa738b006e5.avif" />
            </div>
            <div className={styles.sectionRight}>
              <span className={styles.sectionLabel}>WHAT WE BUILD</span>
              <h2 className={styles.sectionTitle}>Systems that operate in the real world.</h2>
              <div className={styles.sectionBody}>
                <p>Our products are not demos. Every system we develop is designed from day one for deployment in environments we do not fully control — with varying lighting, unexpected obstacles, human co-workers, and hardware that ages.</p>
                <p>We build perception stacks that produce accurate 3D world models in real time. We build physical intelligence layers that sit between planners and actuators and enforce physical feasibility. We build embodied reasoning systems that generalise from simulation to the real world without fragile fine-tuning.</p>
                <p>The common thread is ground truth: every layer of our stack is designed to stay honest about what it knows, where it is uncertain, and when to stop and ask for help.</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div style={{ borderBottom: `0.5px dashed ${t.border}`, padding: '40px 12px 0' }}>
            <span className={styles.sectionLabel}>OUR PRINCIPLES</span>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '32px' }}>How we work.</h2>
          </div>
          <div className={styles.valuesGrid} style={{ borderBottom: `0.5px dashed ${t.border}` }}>
            {[
              { n: '01', title: 'Physical First', text: 'Every design decision is evaluated against the question: does this work reliably in the physical world? Elegance in simulation is not enough.' },
              { n: '02', title: 'Honest Systems', text: 'We build systems that know what they do not know. Uncertainty quantification is not an afterthought — it is a core deliverable.' },
              { n: '03', title: 'Long Thinking', text: 'Physical AI requires patience. We do not ship systems before they are ready. We take the time to understand failure modes before deployment.' },
              { n: '04', title: 'Open Research', text: 'We publish our findings. The problems we are solving are hard enough that the field advances faster when results are shared.' },
              { n: '05', title: 'Human Benefit', text: 'Technology that makes physical work safer, more efficient and more humane — that is the only outcome worth building for.' },
              { n: '06', title: 'Rigour', text: 'We measure everything. We test in adversarial conditions. We do not accept results that cannot be reproduced outside the lab.' },
            ].map(v => (
              <div key={v.n} className={styles.valueCard} style={{ borderRightColor: t.border, borderBottomColor: t.border }}>
                <div className={styles.valueNumber}>{v.n}</div>
                <div className={styles.valueTitle}>{v.title}</div>
                <div className={styles.valueText}>{v.text}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
