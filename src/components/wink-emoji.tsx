'use client'

import { useEffect, useRef, useState } from 'react'

// Source: Google Noto Animated Emoji (by Google) — https://googlefonts.github.io/noto-emoji-animation/
// Fetched from the official CDN: fonts.gstatic.com/s/e/notoemoji/latest/<codepoint>/512.webp
// and .../512.png. License: CC BY 4.0 (Creative Commons Attribution 4.0) — per the Noto
// Animated Emoji site FAQ. Attribution: animated emoji by Google, Noto Animated Emoji,
// licensed under CC BY 4.0.
// "Wink" static frame was resized from 512px to 64px (ImageMagick, -coalesce -resize
// -layers optimize); all original frames and their per-frame delays are unchanged.
// "Thinking Face" animated file was resized from 512px to 90px (ImageMagick, -coalesce
// -resize -layers optimize; all 60 frames and their delays unchanged) — the raw 512px
// file showed black-dot scaling artifacts when the browser downscaled it 17x to 30px.
// Played continuously, like the site's open preview.
type Variant = 'wink' | 'thinking'

const VARIANTS: Record<Variant, { animatedSrc: string; staticSrc: string; alt: string; durationMs: number }> = {
  // "Wink" (😉, U+1F609) — 55 frames, real duration ~2.25s.
  wink: {
    animatedSrc: '/images/emoji-wink.webp',
    staticSrc: '/images/emoji-wink-static.webp',
    alt: '😉',
    durationMs: 2400,
  },
  // "Thinking Face" (🤔, U+1F914) — plays continuously, no idle/pause cycle.
  thinking: {
    animatedSrc: '/images/emoji-thinking.webp',
    staticSrc: '/images/emoji-thinking-static.webp',
    alt: '🤔',
    durationMs: 0,
  },
}

const MIN_IDLE_MS = 5000
const MAX_IDLE_MS = 7000
const SIZE = 30

interface WinkEmojiProps {
  variant?: Variant
}

// Fixed-size emoji that plays its animation briefly every 5-7s and sits on a
// still frame the rest of the time, without ever affecting surrounding line height
// (the wrapper reserves 0px of line height; the image overflows it, centered).
export function WinkEmoji({ variant = 'wink' }: WinkEmojiProps) {
  const { animatedSrc, staticSrc, alt, durationMs } = VARIANTS[variant]
  const [playKey, setPlayKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const cancelledRef = useRef(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // "thinking" plays its animation continuously (like the Noto site's open preview) —
  // no idle/pause timer, no key-remount cycle. Only "wink" uses the periodic-play timer.
  useEffect(() => {
    if (variant !== 'wink') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let idleTimer: ReturnType<typeof setTimeout>
    let playTimer: ReturnType<typeof setTimeout>
    cancelledRef.current = false

    const scheduleNext = () => {
      const delay = MIN_IDLE_MS + Math.random() * (MAX_IDLE_MS - MIN_IDLE_MS)
      idleTimer = setTimeout(() => {
        if (cancelledRef.current) return
        setPlayKey((k) => k + 1)
        setIsPlaying(true)
        playTimer = setTimeout(() => {
          if (cancelledRef.current) return
          setIsPlaying(false)
          scheduleNext()
        }, durationMs)
      }, delay)
    }

    scheduleNext()

    return () => {
      cancelledRef.current = true
      clearTimeout(idleTimer)
      clearTimeout(playTimer)
    }
  }, [variant, durationMs])

  const showAnimated = variant === 'thinking' ? !reducedMotion : isPlaying

  return (
    <span
      className="inline-block relative align-middle"
      style={{ width: SIZE, height: 0, overflow: 'visible' }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={variant === 'thinking' ? 'thinking' : isPlaying ? `play-${playKey}` : 'static'}
        src={showAnimated ? animatedSrc : staticSrc}
        alt={alt}
        width={SIZE}
        height={SIZE}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%) translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          width: SIZE,
          height: SIZE,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </span>
  )
}
