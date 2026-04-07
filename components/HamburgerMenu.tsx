'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Research', href: '/research' },
  { label: 'Mission', href: '/mission' },
  { label: 'Join Us', href: '/joinus' },
]

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const overlay = open ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        paddingTop: '24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <span style={{ fontFamily: 'Teko, sans-serif', fontSize: '24px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          KEDORION
        </span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '28px',
            lineHeight: 1,
            padding: '8px',
            zIndex: 10000,
          }}
        >
          ✕
        </button>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.href} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '18px 0',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF4D00')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </ul>
      </nav>

      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em', margin: 0 }}>
        Ground Truth Architects. © 2025
      </p>
    </div>
  ) : null

  return (
    <>
      {/* Desktop: links direkt sichtbar */}
      <nav className="hidden md:flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "'TeXGyreHeros', Helvetica, Arial, sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#fff',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex md:hidden"
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff' }} />
      </button>

      {/* Portal: Overlay wird direkt in document.body gerendert */}
      {mounted && overlay && createPortal(overlay, document.body)}
    </>
  )
}
