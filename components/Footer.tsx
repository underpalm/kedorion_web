'use client'

import { useState } from 'react'
import Link from 'next/link'

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(28,74,150,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#F2F2F2', color: '#1C4A96', maxWidth: '600px', width: '90%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', border: '0.5px solid #1C4A96' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '0.5px dashed #1C4A96' }}>
          <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Courier Prime', monospace", fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1C4A96' }}>
            ✕ CLOSE
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '16px', fontFamily: "'Courier Prime', monospace", fontSize: '15px', lineHeight: 1.7, color: '#1C4A96' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState<'imprint' | 'privacy' | null>(null)

  return (
    <>
      <footer style={{
        background: '#1C4A96',
        color: '#FFFFFF',
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        lineHeight: 1.5,
        borderTop: '0.5px dashed #FFFFFF',
        padding: '12px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-6">

          {/* Identity — full width on mobile, top */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: 700 }}>KEDORION</span>
            <span style={{ borderTop: '0.5px dashed rgba(255,255,255,0.4)', display: 'block', margin: '3px 0' }} />
            <span style={{ opacity: 0.6 }}>Ground Truth Architects.</span>
            <span style={{ opacity: 0.6 }}>Anchoring Intelligence in Reality.</span>
          </div>

          {/* Social + Legal — side-by-side on mobile, individual columns on desktop */}
          <div className="flex flex-row gap-6 md:gap-6 md:contents">

            {/* Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
              <span style={{ opacity: 0.4, marginBottom: '2px' }}>Social</span>
              <span style={{ borderTop: '0.5px dashed rgba(255,255,255,0.4)', display: 'block', margin: '3px 0' }} />
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/company/kedorion' },
                { label: 'Twitter', href: 'https://x.com/kedorionTech' },
                { label: 'Instagram', href: 'https://instagram.com/kedorion' },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7, display: 'block' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
              <span style={{ opacity: 0.4, marginBottom: '2px' }}>Legal</span>
              <span style={{ borderTop: '0.5px dashed rgba(255,255,255,0.4)', display: 'block', margin: '3px 0' }} />
              <button onClick={() => setModal('imprint')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit', color: 'inherit', padding: 0, opacity: 0.7, textAlign: 'left' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                Imprint
              </button>
              <button onClick={() => setModal('privacy')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit', color: 'inherit', padding: 0, opacity: 0.7, textAlign: 'left' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                Privacy
              </button>
              <Link href="#contact" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7, display: 'block' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
              >
                Contact
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '0.5px dashed rgba(255,255,255,0.4)', marginTop: '12px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', opacity: 0.4, flexWrap: 'wrap', gap: '8px' }}>
          <span>[ KEDORION — SYS_FOOTER — V.001 ]</span>
          <span>© {new Date().getFullYear()} — All Rights Reserved.</span>
        </div>
      </footer>

      {modal === 'imprint' && (
        <Modal title="Imprint" onClose={() => setModal(null)}>
          <p><strong>Kedorion GmbH</strong><br />[Street Address]<br />[City, Postal Code]<br />Germany</p>
          <p style={{ marginTop: '12px' }}><strong>Contact</strong><br />Email: contact@kedorion.com</p>
          <p style={{ marginTop: '12px' }}><strong>Legal Representatives</strong><br />[Name of Managing Director(s)]</p>
          <p style={{ marginTop: '12px' }}><strong>Registration</strong><br />Commercial Register: [Register Court]<br />Registration Number: [HRB XXXXX]<br />VAT ID: [DE XXXXXXXXX]</p>
        </Modal>
      )}

      {modal === 'privacy' && (
        <Modal title="Privacy Policy" onClose={() => setModal(null)}>
          <p><strong>1. Data Controller</strong><br />Kedorion GmbH — contact@kedorion.com</p>
          <p style={{ marginTop: '12px' }}><strong>2. Data We Collect</strong><br />We collect data you voluntarily provide, as well as technical data such as IP addresses for the operation and security of this website.</p>
          <p style={{ marginTop: '12px' }}><strong>3. Purpose of Processing</strong><br />Your data is used solely to respond to inquiries and improve our services. We do not sell or share your data with third parties.</p>
          <p style={{ marginTop: '12px' }}><strong>4. Your Rights</strong><br />You have the right to access, rectification, erasure, restriction, portability and objection. Contact: contact@kedorion.com</p>
          <p style={{ marginTop: '12px' }}><strong>5. Cookies</strong><br />This website uses only technically necessary cookies. No tracking or advertising cookies are used.</p>
        </Modal>
      )}
    </>
  )
}
