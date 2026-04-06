'use client'

import { useState } from 'react'

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-[#F2F2F2] border-2 border-black max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b-2 border-black">
          <span className="font-mono text-[11px] uppercase font-bold tracking-widest">{title}</span>
          <button
            onClick={onClose}
            className="font-mono text-[11px] font-bold hover:text-[#FF4D00] transition-colors"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-8 py-8 font-mono text-[11px] leading-relaxed text-black/70 space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t-2 border-black flex justify-end">
          <button
            onClick={onClose}
            className="bg-black text-white px-8 py-3 font-mono font-bold uppercase text-[10px] tracking-widest hover:bg-[#FF4D00] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState<'imprint' | 'privacy' | null>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative z-10 py-20 px-6 border-t-4 border-black bg-[#F2F2F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Left: Logo + Tagline */}
          <div className="md:col-span-4">
            <div
              className="flex items-center gap-2 mb-8 cursor-pointer"
              onClick={scrollToTop}
            >
              <img src="/kedorion.svg" alt="Kedorion" className="w-10 h-10" />
              <span className="text-2xl font-teko font-bold uppercase tracking-tighter">KEDORION</span>
            </div>
            <p className="font-mono text-[10px] uppercase font-bold text-black/40 leading-relaxed">
              Ground Truth Architects.<br />
              Anchoring Intelligence in Reality.<br />
              © 2025. All Rights Reserved.
            </p>
          </div>

          {/* Right: Links */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 font-mono text-[10px] uppercase tracking-tighter">
            <div className="space-y-6">
              <div className="font-bold text-black">&quot;Legal&quot;</div>
              <ul className="space-y-3 text-black/50 font-bold">
                <li>
                  <button onClick={() => setModal('imprint')} className="hover:text-[#FF4D00] transition-colors uppercase">
                    Imprint
                  </button>
                </li>
                <li>
                  <button onClick={() => setModal('privacy')} className="hover:text-[#FF4D00] transition-colors uppercase">
                    Privacy
                  </button>
                </li>
                <li><a href="#contact" className="hover:text-[#FF4D00] transition-colors uppercase">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="font-bold text-black">&quot;Socials&quot;</div>
              <ul className="space-y-3 text-black/50 font-bold">
                <li><span className="opacity-30 cursor-not-allowed">X.com/Kedorion</span></li>
                <li><span className="opacity-30 cursor-not-allowed">LinkedIn/Kedorion</span></li>
                <li><span className="opacity-30 cursor-not-allowed">Instagram</span></li>
              </ul>
            </div>

            <div className="space-y-6 col-span-2 md:col-span-1 md:border-l-2 border-black/10 md:pl-6 mt-6 md:mt-0 pt-6 md:pt-0 border-t-2 md:border-t-0">
              <div className="font-bold text-black italic">&quot;Mission_Control&quot;</div>
              <p className="text-[9px] text-black/30 font-bold leading-tight">
                Our mission is to develop AI that makes physical operations safer, more efficient, and more responsive.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* Imprint Modal */}
      {modal === 'imprint' && (
        <Modal title="Imprint" onClose={() => setModal(null)}>
          <p className="font-bold text-black uppercase">Company Information</p>
          <p>
            Kedorion GmbH<br />
            [Street Address]<br />
            [City, Postal Code]<br />
            Germany
          </p>
          <p className="font-bold text-black uppercase mt-4">Contact</p>
          <p>
            Email: contact@kedorion.com<br />
            Phone: [Phone Number]
          </p>
          <p className="font-bold text-black uppercase mt-4">Legal Representatives</p>
          <p>[Name of Managing Director(s)]</p>
          <p className="font-bold text-black uppercase mt-4">Registration</p>
          <p>
            Commercial Register: [Register Court]<br />
            Registration Number: [HRB XXXXX]<br />
            VAT ID: [DE XXXXXXXXX]
          </p>
          <p className="font-bold text-black uppercase mt-4">Responsible for Content</p>
          <p>[Name], [Address]</p>
        </Modal>
      )}

      {/* Privacy Modal */}
      {modal === 'privacy' && (
        <Modal title="Privacy Policy" onClose={() => setModal(null)}>
          <p className="font-bold text-black uppercase">1. Data Controller</p>
          <p>
            Kedorion GmbH<br />
            [Address]<br />
            contact@kedorion.com
          </p>
          <p className="font-bold text-black uppercase mt-4">2. Data We Collect</p>
          <p>
            We collect data you voluntarily provide (e.g. via contact forms), as well as technical data such as IP addresses and browser information for the operation and security of this website.
          </p>
          <p className="font-bold text-black uppercase mt-4">3. Purpose of Processing</p>
          <p>
            Your data is used solely to respond to inquiries and improve our services. We do not sell or share your data with third parties.
          </p>
          <p className="font-bold text-black uppercase mt-4">4. Your Rights</p>
          <p>
            You have the right to access, rectification, erasure, restriction, portability and objection regarding your personal data. Please contact: contact@kedorion.com
          </p>
          <p className="font-bold text-black uppercase mt-4">5. Cookies</p>
          <p>
            This website uses only technically necessary cookies. No tracking or advertising cookies are used.
          </p>
          <p className="font-bold text-black uppercase mt-4">6. Legal Basis</p>
          <p>
            Processing is based on Art. 6(1)(b) and (f) GDPR. You may withdraw consent at any time.
          </p>
        </Modal>
      )}
    </>
  )
}
