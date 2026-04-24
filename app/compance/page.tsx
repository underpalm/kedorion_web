'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import FilmGrain from '@/components/FilmGrain'
import PaperPlaneIcon from '@/components/PaperPlaneIcon'
import styles from './compance.module.css'

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

const SERVICES = [
  {
    n: '01',
    title: 'AI Readiness Assessment',
    body: 'Find out where you stand and where AI creates the most value in your operation. We analyse your processes, data infrastructure, and team capabilities to produce a clear, honest picture of your starting point.',
  },
  {
    n: '02',
    title: 'Use Case Integration',
    body: 'Turn AI potential into a concrete roadmap with defined pilots and measurable outcomes. We identify the highest-leverage entry points and design experiments that are scoped to deliver results — not just reports.',
  },
  {
    n: '03',
    title: 'AI Training',
    body: 'Equip your leadership and team with the knowledge to make smart AI decisions. From executive workshops to hands-on technical sessions, we build the internal capability to evaluate, adopt, and govern AI responsibly.',
  },
]

export default function Compance() {
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
            <div className={styles.heroLeft}>
              <div className={styles.heroLabel}>KEDORION — CONSULTING</div>
              <h1 className={styles.heroTitle}>Com&shy;pance.</h1>
            </div>
            <div className={styles.heroRight}>
              <p className={styles.heroTagline}>
                While we build the future of Physical AI, we help companies navigate the AI transformation today.
              </p>
              <p className={styles.heroBody}>
                We bring the same thinking we apply to our own products — rigorous, practical, and built for regulated industries.
              </p>
            </div>
          </div>

          {/* Media */}
          <div className={styles.mediaSection} style={{ borderBottomColor: t.border }}>
            <div className={styles.mediaInner}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Compace/steve-a-johnson-6G7avw7s7JQ-unsplash.jpg" alt="Compance" />
            </div>
          </div>

          {/* Services */}
          <div className={styles.servicesLabel} style={{ borderBottomColor: t.border }}>
            OUR SERVICES — V.001
          </div>
          <div className={styles.servicesGrid} style={{ borderBottomColor: t.border }}>
            {SERVICES.map(s => (
              <div
                key={s.n}
                className={styles.serviceCard}
                style={{ borderRightColor: t.border, borderBottomColor: t.border }}
              >
                <div className={styles.serviceNum}>{s.n}</div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceBody}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Approach */}
          <div className={styles.sectionSingle} style={{ borderBottomColor: t.border }}>
            <span className={styles.sectionLabel}>OUR APPROACH</span>
            <h2 className={styles.sectionTitle}>No slide decks. No generic frameworks.</h2>
            <div className={styles.sectionBody}>
              <p>We work the way we build products — from first principles. Every engagement starts with a deep understanding of your actual constraints: your processes, your data, your risk tolerance, your team.</p>
              <p>We do not sell AI for its own sake. If the expected value does not justify the cost and complexity, we will tell you. Our reputation depends on the quality of our judgment, not the size of our engagements.</p>
            </div>
          </div>

          {/* CTA */}
          <div className={styles.ctaSection} style={{ borderBottomColor: t.border }}>
            <span className={styles.sectionLabel}>GET STARTED</span>
            <h2 className={styles.ctaTitle}>
              Ready to move<br />from potential<br />to results?
            </h2>
            <p className={styles.ctaBody}>
              Tell us about your organisation and the challenges you are facing. We will schedule a short introductory call — no commitment, no sales pitch. Just an honest conversation about where AI can create real value for you.
            </p>
            <a
              href="mailto:contact@kedorion.com?subject=Compance%20Enquiry%20—%20Kedorion&body=Hi%20Kedorion%20team%2C%0A%0AOrganisation%3A%20%5BName%5D%0AIndustry%3A%20%5BYour%20sector%5D%0A%0AChallenge%20we%27re%20facing%3A%0A%0AWhat%20we%27d%20like%20help%20with%3A"
              className={styles.ctaBtn}
              style={{ color: t.fg, borderColor: t.border }}
              onClick={e => e.stopPropagation()}
            >
              Get Started — contact@kedorion.com <PaperPlaneIcon style={{ marginLeft: 6 }} />
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
