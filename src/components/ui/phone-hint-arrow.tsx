'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Phase = 'idle' | 'drawing' | 'holding' | 'erasing'

interface PhoneHintArrowProps {
  active: boolean
  sourceRect: DOMRect | null
  targetRef: React.RefObject<HTMLElement | null>
  onDone: () => void
}

const f = (n: number) => n.toFixed(1)

// Builds a filled tapered ribbon path with an integrated arrowhead.
// Thicker at source, narrows toward target.
function buildRibbon(lx1: number, ly1: number, lx2: number, ly2: number): string {
  const ws = 3.0    // half-width at source
  const we = 1.1    // half-width at ribbon end (just before arrowhead)
  const aHW = 5.5   // arrowhead half-width at base
  const aLen = 13   // arrowhead length

  const tDir = lx2 >= lx1 ? 1 : -1
  const hw = Math.max(Math.abs(lx2 - lx1) * 0.52, 44)
  const cp1x = lx1 + tDir * hw
  const cp2x = lx2 - tDir * hw
  const rx2 = lx2 - aLen * tDir  // arrowhead base x

  // Top edge (source → arrowhead base), bottom edge reversed (arrowhead base → source)
  return [
    `M ${f(lx1)} ${f(ly1 - ws)}`,
    // top bezier — tapers from ws to we
    `C ${f(cp1x)} ${f(ly1 - ws * 0.6)}, ${f(cp2x)} ${f(ly2 - we * 2.2)}, ${f(rx2)} ${f(ly2 - we)}`,
    // expand into arrowhead
    `L ${f(rx2)} ${f(ly2 - aHW)}`,
    // tip
    `L ${f(lx2)} ${f(ly2)}`,
    // collapse from arrowhead
    `L ${f(rx2)} ${f(ly2 + aHW)}`,
    `L ${f(rx2)} ${f(ly2 + we)}`,
    // bottom bezier reversed — tapers from we back to ws
    `C ${f(cp2x)} ${f(ly2 + we * 2.2)}, ${f(cp1x)} ${f(ly1 + ws * 0.6)}, ${f(lx1)} ${f(ly1 + ws)}`,
    `Z`,
  ].join(' ')
}

export function PhoneHintArrow({ active, sourceRect, targetRef, onDone }: PhoneHintArrowProps) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [svgData, setSvgData] = useState<{
    x: number; y: number; w: number; h: number
    ribbon: string
    lx1: number; ly1: number; lx2: number; ly2: number
    sourceOnLeft: boolean
  } | null>(null)
  const [clipPath, setClipPath] = useState('inset(0 100% 0 0)')
  const [clipTransition, setClipTransition] = useState('none')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (!active || !sourceRect || !targetRef.current) {
      setPhase('idle')
      setSvgData(null)
      return
    }

    const tgt = targetRef.current.getBoundingClientRect()
    const x1 = sourceRect.right + 8
    const y1 = sourceRect.top + sourceRect.height / 2
    const x2 = tgt.left - 8
    const y2 = tgt.top + tgt.height / 2

    const sourceOnLeft = x1 <= x2
    const pad = 48
    const svgX = Math.min(x1, x2) - pad
    const svgY = Math.min(y1, y2) - pad
    const svgW = Math.abs(x2 - x1) + pad * 2
    const svgH = Math.abs(y2 - y1) + pad * 2

    const lx1 = x1 - svgX
    const ly1 = y1 - svgY
    const lx2 = x2 - svgX
    const ly2 = y2 - svgY

    const ribbon = buildRibbon(lx1, ly1, lx2, ly2)

    const initClip = sourceOnLeft ? 'inset(0 100% 0 -12px)' : 'inset(0 -12px 0 100%)'
    const drawClip = 'inset(0 -12px 0 -12px)'
    const eraseClip = sourceOnLeft ? 'inset(0 -12px 0 100%)' : 'inset(0 100% 0 -12px)'

    setSvgData({ x: svgX, y: svgY, w: svgW, h: svgH, ribbon, lx1, ly1, lx2, ly2, sourceOnLeft })
    setClipPath(initClip)
    setClipTransition('none')

    const t = timers.current
    t.push(setTimeout(() => {
      setPhase('drawing')
      setClipPath(drawClip)
      setClipTransition('clip-path 980ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
    }, 160))
    t.push(setTimeout(() => {
      setPhase('holding')
      setClipTransition('none')
    }, 160 + 980))
    t.push(setTimeout(() => {
      setPhase('erasing')
      setClipPath(eraseClip)
      setClipTransition('clip-path 820ms cubic-bezier(0.55, 0.06, 0.68, 0.19)')
    }, 160 + 980 + 880))
    t.push(setTimeout(() => {
      setPhase('idle')
      setSvgData(null)
      onDone()
    }, 160 + 980 + 880 + 820))

    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, sourceRect])

  if (!mounted || !svgData || phase === 'idle') return null

  return createPortal(
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: svgData.x,
        top: svgData.y,
        width: svgData.w,
        height: svgData.h,
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'visible',
        clipPath,
        transition: clipTransition,
      }}
    >
      <defs>
        {/* Drop shadow glow */}
        <filter id="ph-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#bfa76a" floodOpacity="0.36" />
        </filter>
        {/* Fill gradient: bright at source, slightly darker at target */}
        <linearGradient
          id="ph-grad"
          gradientUnits="userSpaceOnUse"
          x1={svgData.lx1} y1={svgData.ly1}
          x2={svgData.lx2} y2={svgData.ly2}
        >
          <stop offset="0%"   stopColor="#d4ac6a" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#c09a56" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#a88840" stopOpacity="0.78" />
        </linearGradient>
      </defs>

      {/* Diffuse glow halo (blurred copy, slightly expanded) */}
      <path
        d={svgData.ribbon}
        fill="rgba(191,167,106,0.18)"
        style={{ filter: 'blur(5px)' }}
      />

      {/* Main tapered ribbon + integrated arrowhead */}
      <path
        d={svgData.ribbon}
        fill="url(#ph-grad)"
        filter="url(#ph-glow)"
      />

      {/* Round cap at source to smooth the thick start */}
      <circle
        cx={svgData.lx1}
        cy={svgData.ly1}
        r="3"
        fill="#d4ac6a"
        fillOpacity="0.92"
        filter="url(#ph-glow)"
      />
    </svg>,
    document.body
  )
}
