'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import FilmGrain from '@/components/FilmGrain'
import PaperPlaneIcon from '@/components/PaperPlaneIcon'
import styles from './joinus.module.css'

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

const PROFILES = [
  {
    n: '01',
    title: 'Research Engineers',
    text: 'You work at the intersection of ML research and systems engineering. You care deeply about whether your models actually work on real hardware, not just on benchmarks. Experience with robotics, control theory or embedded systems is a strong plus.',
  },
  {
    n: '02',
    title: 'Perception Scientists',
    text: 'You specialise in sensor fusion, 3D vision or SLAM. You have shipped perception systems that ran outside a lab. You understand that robustness under adversarial real-world conditions is not a footnote — it is the whole problem.',
  },
  {
    n: '03',
    title: 'Embodied AI Researchers',
    text: 'You think about how AI agents learn physical causality. You have worked on sim-to-real transfer, model-based RL, or physics-informed learning. You are frustrated by how often "state of the art" means "works in one very clean environment".',
  },
  {
    n: '04',
    title: 'Software Architects',
    text: 'You design systems that run at the edge — low latency, high reliability, constrained compute. You know the difference between a distributed system that looks good in a diagram and one that survives contact with reality.',
  },
  {
    n: '05',
    title: 'Hardware Engineers',
    text: 'You bridge the gap between sensors and software. You have designed or characterised sensing arrays, worked with custom ASICs or FPGAs, and you understand that the physical world does not respect your simulator\'s assumptions.',
  },
  {
    n: '06',
    title: 'Open Applications',
    text: 'You do not fit neatly into a category, but you share our conviction that building trustworthy physical AI is the most important engineering challenge of this decade. We want to hear from you.',
  },
]

function Img({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
  )
}

export default function JoinUs() {
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
            <div className={styles.heroLabel}>KEDORION — CAREERS</div>
            <h1 className={styles.heroTitle}>Join<br />Us.</h1>
          </div>

          {/* Intro — two columns */}
          <div className={styles.section} style={{ borderBottomColor: t.border }}>
            <div className={styles.sectionLeft} style={{ borderRightColor: t.border }}>
              <span className={styles.sectionLabel}>WHY KEDORION</span>
              <h2 className={styles.sectionTitle}>Build AI that works in the real world.</h2>
              <div className={styles.sectionBody}>
                <p>Most AI research happens in environments where failure is a number in a table. At Kedorion, failure means a robot drops a component on a factory floor, or a perception system misreads a scene at the wrong moment. That constraint changes everything — how you design, how you test, how you think about uncertainty.</p>
                <p>We are a small, research-led team. Everyone here works on problems that matter, with colleagues who take the work seriously. There is no hierarchy between research and engineering — both are treated as first-class disciplines.</p>
                <p>We are based in Germany, with a long-term commitment to building in Europe. We offer competitive salaries, meaningful equity, and the space to do your best work on problems that have not been solved yet.</p>
              </div>
            </div>
            <div className={styles.sectionRight}>
              <Img src="/images/join_us/photo-1680783954745-3249be59e527.avif" />
            </div>
          </div>

          {/* Culture */}
          <div className={styles.sectionSingle} style={{ borderBottomColor: t.border }}>
            <span className={styles.sectionLabel}>HOW WE WORK</span>
            <h2 className={styles.sectionTitle}>Small team. Hard problems. High standards.</h2>
            <div className={styles.sectionBody}>
              <p>We do not have a lot of process. We have a lot of judgment. We hire people who can hold a problem in their head for weeks, who push back when something does not make sense, and who finish things. We expect intellectual honesty — if something is not working, we want to know early.</p>
              <p>Research and product are not separate tracks. The same people who develop ideas are responsible for seeing them through to deployment. That means the feedback loop is short and the work is grounding — in every sense.</p>
            </div>
          </div>

          {/* Who we're looking for */}
          <div style={{ padding: '40px 12px 0', borderBottom: `0.5px dashed ${t.border}` }}>
            <span className={styles.sectionLabel}>WHO WE ARE LOOKING FOR</span>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '32px' }}>People who care about this specific problem.</h2>
          </div>
          <div className={styles.profileGrid} style={{ borderBottomColor: t.border }}>
            {PROFILES.map(p => (
              <div key={p.n} className={styles.profileCard} style={{ borderRightColor: t.border, borderBottomColor: t.border }}>
                <div className={styles.profileNum}>{p.n}</div>
                <div className={styles.profileTitle}>{p.title}</div>
                <div className={styles.profileText}>{p.text}</div>
              </div>
            ))}
          </div>

          {/* Apply */}
          <div className={styles.applySection} style={{ borderBottom: `0.5px dashed ${t.border}` }}>
            <span className={styles.sectionLabel}>HOW TO APPLY</span>
            <h2 className={styles.applyTitle}>Ready to build<br />with us?</h2>
            <div className={styles.applyInstructions}>
              <p>We do not have a formal application portal. Send us an email. Tell us who you are, what you have built, and why you want to work on physical AI at Kedorion.</p>
              <p>We read every message and we respond to everyone. There is no black hole here.</p>
            </div>
            <ul className={styles.applyChecklist}>
              <li>Your CV or a link to your work</li>
              <li>A short note about what interests you most about our research</li>
              <li>What you would want to work on if you joined</li>
              <li>Anything else you think we should know</li>
            </ul>
            <a
              href="mailto:contact@kedorion.com?subject=Application%20—%20Kedorion&body=Hi%20Kedorion%20team%2C%0A%0AMy%20name%20is%20[Name].%0A%0AWhy%20I%20want%20to%20join%3A%0A%0AWhat%20I%27d%20like%20to%20work%20on%3A%0A%0APlease%20find%20my%20CV%20attached."
              className={styles.applyBtn}
              style={{ color: t.fg, borderColor: t.border }}
              onClick={e => e.stopPropagation()}
            >
              Apply — contact@kedorion.com <PaperPlaneIcon style={{ marginLeft: 6 }} />
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
