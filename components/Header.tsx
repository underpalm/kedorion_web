'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative flex justify-between items-center py-7 px-12 md:px-8 md:py-5 sm:px-5 sm:py-4">
      {/* Logo */}
      <div>
        <Link href="/" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/kedorion.svg" alt="Kedorion Logo" className="h-[42px] sm:h-[34px] block" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden sm:flex items-center gap-8 md:gap-5 text-sm">
        <Link href="/research" className="text-[#111] no-underline">Research</Link>
        <Link href="/about" className="text-[#111] no-underline">About</Link>
        <Link href="/joinus" className="text-[#111] no-underline">Join us</Link>
        <a
          href="mailto:info@kedorion.com"
          className="px-5 py-3 rounded-full text-sm no-underline bg-[#111] border border-[#111] text-white"
        >
          Contact Us
        </a>
      </nav>

      {/* Mobile: Contact Us + Hamburger */}
      <div className="flex sm:hidden items-center gap-3">
        <a
          href="mailto:info@kedorion.com"
          className="px-4 py-2.5 rounded-full text-sm no-underline bg-[#111] border border-[#111] text-white"
        >
          Contact Us
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col justify-center items-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-200 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#111] transition-all duration-200 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-white border-t border-[#f0f0f0] z-50 flex flex-col py-4 shadow-sm">
          <Link href="/research" onClick={() => setOpen(false)} className="px-5 py-3 text-sm text-[#111] no-underline hover:bg-[#f5f5f5]">Research</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="px-5 py-3 text-sm text-[#111] no-underline hover:bg-[#f5f5f5]">About</Link>
          <Link href="/joinus" onClick={() => setOpen(false)} className="px-5 py-3 text-sm text-[#111] no-underline hover:bg-[#f5f5f5]">Join us</Link>
        </div>
      )}
    </header>
  )
}
