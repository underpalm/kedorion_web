'use client'

import { useState } from 'react'
import Footer from './Footer'
import HamburgerMenu from './HamburgerMenu'
import styles from '@/app/page.module.css'

const THEMES = [
  { bg: '#1C4A96', fg: '#FFFFFF', border: '#FFFFFF' },
  { bg: '#B9E7FE', fg: '#1C4A96', border: '#1C4A96' },
  { bg: '#FFFFFF', fg: '#1C4A96', border: '#1C4A96' },
]

function AnimatedText({ text, baseDelay, letterDelay }: { text: string; baseDelay: number; letterDelay: number }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={styles.letter}
          style={{ animationDelay: `${baseDelay + i * letterDelay}ms` }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </>
  )
}

interface Props {
  heroLines: string[]
  panelTitle: string
  pageName: string
}

export default function PageLayout({ heroLines, panelTitle, pageName }: Props) {
  const [themeIdx, setThemeIdx] = useState(0)
  const t = THEMES[themeIdx]

  const cycle = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button,input,label')) return
    setThemeIdx(i => (i + 1) % THEMES.length)
  }

  const bgFilter = t.fg === '#FFFFFF' ? 'brightness(0) invert(1)' : 'brightness(0)'
  const BASE = 1200, LD = 70
  let offset = BASE

  return (
    <>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.bgGraphic} aria-hidden="true">
        <div className={styles.bgGraphicInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kedorion.svg" alt="" className={styles.bgLogo} style={{ filter: bgFilter }} />
        </div>
      </div>

      <div
        className={styles.page}
        style={{ background: t.bg, color: t.fg } as React.CSSProperties}
        onClick={cycle}
      >
        {/* Sub-header */}
        <header className={styles.subHeader}>
          <div className={styles.headerBorderTop} style={{ borderColor: t.border }} />
          <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
              <div className={styles.headerMetaBlock}>
                <div className={styles.headerMetaRow}>
                  <span>KEDORION — R&amp;D</span>
                </div>
                <span className={styles.headerDividerLine} style={{ borderColor: t.border }} />
                <div className={styles.headerMetaRow}>
                  <span>SYS_DATE: 2026</span>
                </div>
              </div>
            </div>
            <div className={styles.headerRight} onClick={e => e.stopPropagation()}>
              <HamburgerMenu />
            </div>
          </div>
          <div className={styles.headerBorderBottom} style={{ borderColor: t.border }} />
        </header>

        {/* Main */}
        <main className={styles.main}>
          <div />
          <div className={styles.heroWrap}>
            <h1 className={styles.heroTitle}>
              {heroLines.map((line, li) => {
                const el = (
                  <span key={li} className={styles.heroLine}>
                    <AnimatedText text={line} baseDelay={offset} letterDelay={LD} />
                  </span>
                )
                offset += line.length * LD
                return el
              })}
            </h1>
          </div>
          <div />
        </main>

        {/* Bottom panels */}
        <div className={styles.panelsBottom}>
          <div className={styles.panelsRow}>
            <div className={styles.panelLeft}>
              <div className={styles.labelRow}>
                <span>KEDORION</span>
                <span className={styles.dotRule} style={{ borderColor: t.border }} />
                <span>{pageName}</span>
              </div>
              <div className={styles.panelTitle}>{panelTitle}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
