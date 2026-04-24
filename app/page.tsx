'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import HamburgerMenu from '@/components/HamburgerMenu'
import FilmGrain from '@/components/FilmGrain'
import VideoWindow from '@/components/VideoWindow'
import PaperPlaneIcon from '@/components/PaperPlaneIcon'
import styles from './page.module.css'

function AnimatedText({ text, baseDelay, letterDelay }: { text: string; baseDelay: number; letterDelay: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className={styles.letter} style={{ animationDelay: `${baseDelay + i * letterDelay}ms` }}>
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </>
  )
}

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

export default function Home() {
  const [themeIdx, setThemeIdx] = useState(0)
  const t = THEMES[themeIdx]

  const cycle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button,input,label,[data-nc]')) return
    setThemeIdx(i => (i + 1) % THEMES.length)
  }

  const line1 = 'THE BRAIN BEHIND'
  const line2 = 'MACHINES'
  const BASE = 1200, LD = 70
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

      {/* Hero viewport */}
      <div className={styles.page} style={{ background: t.bg, color: t.fg }} onClick={cycle}>

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

        <main className={styles.main}>

          {/* Top-right index block */}
          <div className={styles.topRightBlock} style={{ borderColor: t.border }} data-nc>
            <span className={styles.topRightMeta}>KEDORION c/o R&amp;D</span>
            <p className={styles.topRightTagline}>
              Where technology steps back,<br />and Humanity steps in.
            </p>
          </div>

          <div className={styles.heroWrap}>
            <div className={styles.heroCenterBlock}>

              {/* Main title */}
              <h1 className={styles.heroTitle}>
                <span className={styles.heroLine}>{line1}</span>
                <span className={styles.heroLine}>{line2}</span>
              </h1>

              {/* GET STARTED — desktop */}
              <a
                href="mailto:contact@kedorion.com?subject=Get%20Started%20—%20Kedorion"
                className={styles.getStartedBtn}
                style={{ color: t.fg, borderColor: t.border }}
                data-nc
                onClick={e => e.stopPropagation()}
              >
                GET STARTED <PaperPlaneIcon style={{ marginLeft: 6 }} />
              </a>

              {/* GET STARTED — mobile floating */}
              <a
                href="mailto:contact@kedorion.com?subject=Get%20Started%20—%20Kedorion"
                className={styles.getStartedFab}
                style={{ color: t.fg, borderColor: t.border, background: t.bg }}
                data-nc
                onClick={e => e.stopPropagation()}
              >
                GET STARTED <PaperPlaneIcon style={{ marginLeft: 6 }} />
              </a>

              {/* Windows 95 Video Player */}
              <div className={styles.videoWin95} data-nc>
                <div className={styles.videoWin95TitleBar}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={styles.videoWin95Icon}>▶</span>
                    <span className={styles.videoWin95TitleText}>Media Player — KEDORION_REEL_2026.mov</span>
                  </div>
                  <div className={styles.win95Btns}>
                    <button className={styles.win95Btn} tabIndex={-1}>─</button>
                    <button className={styles.win95Btn} tabIndex={-1}>□</button>
                    <button className={styles.win95BtnClose} tabIndex={-1}>✕</button>
                  </div>
                </div>
                <div className={styles.videoWin95Screen}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/Home/GIF-2026-04-22-01-04-52.gif"
                    alt=""
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div className={styles.videoWin95Controls}>
                  <button className={styles.videoWin95CtrlBtn} tabIndex={-1}>◀◀</button>
                  <button className={styles.videoWin95CtrlBtn} tabIndex={-1}>▶</button>
                  <button className={styles.videoWin95CtrlBtn} tabIndex={-1}>▶▶</button>
                  <button className={styles.videoWin95CtrlBtn} style={{ marginLeft: '4px' }} tabIndex={-1}>■</button>
                  <div className={styles.videoWin95Scrubber}>
                    <div className={styles.videoWin95ScrubberTrack} />
                  </div>
                  <span className={styles.videoWin95Time}>00:00 / 00:00</span>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Announcement section */}
      <section
        className={styles.announcementSection}
        style={{ background: t.bg, color: t.fg, borderColor: t.border }}
        onClick={cycle}
      >
        {/* Full-width title */}
        <div className={styles.announcementTitleWrap} style={{ borderBottomColor: t.border }}>
          <h2 className={styles.announcementTitle}>ANNOUNCEMENT</h2>
        </div>

        {/* Featured project — image left (Win95), content right */}
        <div className={styles.featuredRow} style={{ borderTopColor: t.border }} data-nc onClick={e => e.stopPropagation()}>
          <div className={styles.featuredVideo} style={{ borderRightColor: t.border }}>
            {/* Win95-style image window */}
            <div className={styles.videoWin95}>
              <div className={styles.videoWin95TitleBar}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className={styles.videoWin95Icon}>🖼</span>
                  <span className={styles.videoWin95TitleText}>Image Viewer — PROJECT_OBNONE.jpg</span>
                </div>
                <div className={styles.win95Btns}>
                  <button className={styles.win95Btn} tabIndex={-1}>─</button>
                  <button className={styles.win95Btn} tabIndex={-1}>□</button>
                  <button className={styles.win95BtnClose} tabIndex={-1}>✕</button>
                </div>
              </div>
              <div className={styles.videoWin95Screen}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Obnone/obnone_title.jpg"
                  alt="Project Obnone"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div className={styles.videoWin95Controls}>
                <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6 }}>
                  P-005 — PROJECT OBNONE — 2025–2026
                </span>
              </div>
            </div>
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredMeta}>P-005 — RESEARCH — 2025–2026</span>
            <h3 className={styles.featuredTitle}>Project<br />Obnone</h3>
            <p className={styles.featuredText}>
              Camera-less fall detection and vital signs monitoring — built for environments where cameras are not an option. We are building the intelligence layer first. The physical body comes later.
            </p>
            <a
              href="/research?open=P-005"
              className={styles.featuredBtn}
              style={{ color: t.fg, borderColor: t.border }}
            >
              VIEW PROJECT <PaperPlaneIcon style={{ marginLeft: 6 }} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
