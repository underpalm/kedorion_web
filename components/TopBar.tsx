'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TopBar() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed top-0 w-full z-[70] px-4 py-2 border-b border-black flex justify-between items-center bg-[#F2F2F2]">
      <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/kedorion.svg" alt="Kedorion" className="h-6 w-auto" />
      </Link>

      {/* Launching Soon Badge */}
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-tighter font-bold">
        <span className="inline-block w-[6px] h-[6px] rounded-full bg-[#FF4D00] animate-pulse" />
        We are working on it — Launching Soon
      </div>

      <span className="hidden md:block font-mono text-[9px] uppercase tracking-tighter">SYS_TIME: {time || '00:00:00'}</span>
    </div>
  )
}
