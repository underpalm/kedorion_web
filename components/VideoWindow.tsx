'use client'

import { useRef, useState, useEffect } from 'react'

interface Props {
  src: string
  title?: string
  borderColor?: string
  autoplay?: boolean
}

export default function VideoWindow({ src, title = 'Media Player', borderColor = '#FFFFFF', autoplay = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(autoplay)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [duration, setDuration] = useState('00:00')

  useEffect(() => {
    const v = videoRef.current
    if (!v || !autoplay) return
    v.muted = true
    v.play().then(() => setPlaying(true)).catch(() => {})
  }, [])

  function fmt(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  function stop() {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(false)
    setProgress(0)
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function fullscreen() {
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
  }

  function onTimeUpdate() {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
    setCurrentTime(fmt(v.currentTime))
  }

  function onLoadedMetadata() {
    const v = videoRef.current
    if (!v) return
    setDuration(fmt(v.duration))
  }

  function scrub(e: React.MouseEvent<HTMLDivElement>) {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    v.currentTime = pct * v.duration
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      border: '2px solid', borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
      boxShadow: '1px 1px 0 #0a0a0a',
      background: '#C0C0C0', width: '100%',
    }}>
      {/* Title bar */}
      <div style={{
        background: 'linear-gradient(to right, #000080, #1084D0)',
        padding: '3px 4px 3px 6px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: '4px', userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#FFF', fontSize: '9px' }}>▶</span>
          <span style={{ color: '#FFF', fontFamily: 'Arial, sans-serif', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
          {['─', '□', '✕'].map((ch, i) => (
            <button key={i} tabIndex={-1} style={{
              width: '16px', height: '14px', border: '1.5px solid',
              borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
              background: '#C0C0C0', color: '#000', fontSize: i === 2 ? '7px' : '8px',
              cursor: 'default', display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 0, fontFamily: 'Arial, sans-serif',
            }}>{ch}</button>
          ))}
        </div>
      </div>

      {/* Video */}
      <div style={{ border: '2px solid', borderColor: '#808080 #FFF #FFF #808080', margin: '4px 4px 2px', background: '#000', aspectRatio: '16/9', overflow: 'hidden' }}>
        <video
          ref={videoRef}
          src={src}
          playsInline
          loop
          muted
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
        />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '3px 4px 4px', background: '#C0C0C0' }}>
        {/* Play/Pause */}
        <button onClick={togglePlay} style={ctrlBtn}>
          {playing ? '⏸' : '▶'}
        </button>
        {/* Stop */}
        <button onClick={stop} style={ctrlBtn}>■</button>
        {/* Mute/Unmute */}
        <button onClick={toggleMute} style={{ ...ctrlBtn, fontSize: '9px' }} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? '🔇' : '🔊'}
        </button>
        {/* Fullscreen */}
        <button onClick={fullscreen} style={{ ...ctrlBtn, fontSize: '9px' }}>⛶</button>

        {/* Scrubber */}
        <div
          onClick={scrub}
          style={{ flex: 1, height: '20px', border: '1.5px solid', borderColor: '#808080 #FFF #FFF #808080', background: '#FFF', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: '#000080', transition: 'width 0.1s linear' }} />
        </div>

        {/* Time */}
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px', color: '#000', whiteSpace: 'nowrap', padding: '0 4px', border: '1.5px solid', borderColor: '#808080 #FFF #FFF #808080', background: '#FFF', height: '20px', display: 'flex', alignItems: 'center' }}>
          {currentTime} / {duration}
        </span>
      </div>
    </div>
  )
}

const ctrlBtn: React.CSSProperties = {
  width: '28px', height: '20px',
  border: '1.5px solid', borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
  background: '#C0C0C0', color: '#000', fontSize: '10px',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, fontFamily: 'Arial, sans-serif', flexShrink: 0,
}
