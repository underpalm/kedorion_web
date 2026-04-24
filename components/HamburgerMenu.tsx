'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import PaperPlaneIcon from '@/components/PaperPlaneIcon'

const links = [
  { label: 'Home',     href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Mission',  href: '/mission' },
  { label: 'Compance', href: '/compance' },
  { label: 'Join Us',  href: '/joinus' },
]

const mono: React.CSSProperties = {
  fontFamily: "'Courier Prime', 'Courier New', monospace",
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const overlay = open ? (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#1C4A96', color: '#FFFFFF',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Courier Prime', 'Courier New', monospace",
    }}>
      {/* Header */}
      <div style={{ borderBottom: '0.5px dashed rgba(255,255,255,0.4)' }}>
        {/* top border strip */}
        <div style={{ height: '7.5px', borderBottom: 'none' }} />
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 12px',
          ...mono,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span>KEDORION — R&amp;D</span>
            <span style={{ borderTop: '0.5px dashed rgba(255,255,255,0.4)', display: 'block', margin: '1px 0' }} />
            <span>SYS_DATE: 2026</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none', border: '0.5px dashed rgba(255,255,255,0.5)',
              cursor: 'pointer', color: '#FFFFFF', padding: '4px 10px',
              ...mono,
            }}
          >
            ✕ CLOSE
          </button>
        </div>
        <div style={{ height: '7.5px' }} />
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '0' }}>
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 12px',
              borderBottom: '0.5px dashed rgba(255,255,255,0.2)',
              color: '#FFFFFF', textDecoration: 'none',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <span>{l.label}</span>
            <span style={{ opacity: 0.5, display: 'inline-flex', alignItems: 'center' }}>
              <PaperPlaneIcon size={22} />
            </span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        borderTop: '0.5px dashed rgba(255,255,255,0.3)',
        padding: '8px 12px',
        display: 'flex', justifyContent: 'space-between',
        ...mono, opacity: 0.35,
      }}>
        <span>[ KEDORION — MENU ]</span>
        <span>contact@kedorion.com</span>
      </div>
    </div>
  ) : null

  return (
    <>
      {/* Desktop links */}
      <nav className="hidden md:flex gap-6">
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{
            ...mono, color: 'inherit', textDecoration: 'none', transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {l.label} <PaperPlaneIcon style={{ marginLeft: 4 }} />
          </Link>
        ))}
      </nav>

      {/* Mobile: hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex md:hidden"
        style={{ flexDirection: 'column', justifyContent: 'center', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor' }} />
      </button>

      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  )
}
