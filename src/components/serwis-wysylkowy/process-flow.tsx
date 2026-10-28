'use client'

import { useEffect, useState, type RefObject } from 'react'

// Desktop walk-through of the "Jak to działa" cards: each card plays its own
// hover state (lift + shadow) with the carousel spotlight, one after another,
// and thin gold arrows lead from one card to the next. Runs once when the top
// row comes into view; mouse-only desktops, never under reduced motion.

type Phase = { lift: string[]; arrows: string[]; ms: number }
// card up → down (light fades) → arrow in → next card up … (~15 s in all)
const step = (card: string[], arrows: string[], up: number): Phase[] => [
  ...(arrows.length ? [{ lift: [], arrows, ms: 400 }] : []),
  { lift: card, arrows, ms: up },
  { lift: [], arrows, ms: 700 },
]
const SEQ: Phase[] = [
  ...step(['01'], [], 1800),
  ...step(['02'], ['a12'], 1800),
  ...step(['03'], ['a23'], 1800),
  ...step(['04'], ['a34'], 2800), // longer stop on the decision card
  // the two outcomes rise twice
  ...step(['05.1', '05.2'], ['tak', 'nie'], 1300).slice(0, 2),
  { lift: [], arrows: ['tak', 'nie'], ms: 500 },
  { lift: ['05.1', '05.2'], arrows: ['tak', 'nie'], ms: 1300 },
  { lift: [], arrows: ['tak', 'nie'], ms: 700 },
]
const IDLE: Omit<Phase, 'ms'> = { lift: [], arrows: [] }

export function useProcessFlow(boxRef: RefObject<HTMLElement | null>, paused: boolean) {
  const [phase, setPhase] = useState(IDLE)
  const [hold, setHold] = useState<((on: boolean) => void) | null>(null)

  useEffect(() => {
    const box = boxRef.current
    const top = box?.firstElementChild
    if (!box || !top) return
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let idx = 0
    let started = false
    let inView = false
    let hovered = false
    let held = false
    let timer = 0
    // Any pause drops the raised card; on resume the current phase replays.
    const pause = () => {
      if (timer) window.clearTimeout(timer)
      timer = 0
      setPhase(IDLE)
    }
    const play = () => {
      if (!started || !inView || hovered || held || timer || idx >= SEQ.length) return
      setPhase(SEQ[idx])
      timer = window.setTimeout(() => {
        timer = 0
        idx += 1
        if (idx >= SEQ.length) {
          setPhase(IDLE)
          done()
        } else play()
      }, SEQ[idx].ms)
    }
    const startIO = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      startIO.disconnect()
      started = true
      play()
    }, { threshold: 0.8 })
    const viewIO = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      if (inView) play()
      else pause()
    })
    // Manual hover wins: the automatic lift steps aside while the mouse is over the cards.
    const onEnter = () => { hovered = true; pause() }
    const onLeave = () => { hovered = false; play() }
    const done = () => {
      startIO.disconnect()
      viewIO.disconnect()
      box.removeEventListener('pointerenter', onEnter)
      box.removeEventListener('pointerleave', onLeave)
      setHold(null)
    }
    startIO.observe(top)
    viewIO.observe(box)
    box.addEventListener('pointerenter', onEnter)
    box.addEventListener('pointerleave', onLeave)
    setHold(() => (on: boolean) => {
      held = on
      if (on) pause()
      else play()
    })
    return () => {
      if (timer) window.clearTimeout(timer)
      done()
    }
  }, [boxRef])

  useEffect(() => {
    hold?.(paused)
  }, [paused, hold])

  return phase
}

type Box = { x: number; y: number; w: number; h: number }
const GOLD = '#bfa76a' // IDLE_INK / "— lub —"
const GAP = 3 // clearance from a card, also when it is raised
const HEAD = 4

// Layout position (transforms ignored, so a raised card doesn't move the lines).
function rel(el: HTMLElement, box: HTMLElement): Box {
  let x = 0
  let y = 0
  let n: HTMLElement | null = el
  while (n && n !== box) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}
// A raised card grows by 2% each side and moves up 4px.
const upTop = (c: Box) => c.y - 4 - c.h * 0.02 - GAP
const upSide = (c: Box) => c.w * 0.02 + GAP

function head(x: number, y: number, dir: 'up' | 'down' | 'left' | 'right') {
  if (dir === 'right') return `M${x - HEAD},${y - HEAD} L${x},${y} L${x - HEAD},${y + HEAD}`
  if (dir === 'up') return `M${x - HEAD},${y + HEAD} L${x},${y} L${x + HEAD},${y + HEAD}`
  if (dir === 'down') return `M${x - HEAD},${y - HEAD} L${x},${y} L${x + HEAD},${y - HEAD}`
  return `M${x + HEAD},${y - HEAD} L${x},${y} L${x + HEAD},${y + HEAD}`
}

function paths(box: HTMLElement): Record<string, string> | null {
  const get = (n: string) => box.querySelector<HTMLElement>(`article[data-step="${n}"]`)
  const els = ['01', '02', '03', '04', '05.1', '05.2'].map(get)
  if (els.some((e) => !e)) return null
  const [c1, c2, c3, c4, c51, c52] = els.map((e) => rel(e!, box))
  // 1 → 2 and 2 → 3: a short arrow straight across the gap between the cards.
  const side = (a: Box, b: Box) => {
    const y = a.y + a.h / 2
    const sx = a.x + a.w + GAP
    const ex = b.x - GAP
    return `M${sx},${y} H${ex} ${head(ex, y, "right")}`
  }
  // 3 → 4: down from card 3, then left into the right end of card 4.
  const r = 10
  const s34x = Math.max(c4.x + c4.w + upSide(c4) + 40, c3.x + c3.w * 0.6)
  const t34y = c4.y + c4.h * 0.3
  const e34x = c4.x + c4.w + upSide(c4)
  const a34 = `M${s34x},${c3.y + c3.h + GAP} V${t34y - r} Q${s34x},${t34y} ${s34x - r},${t34y} H${e34x} ${head(e34x, t34y, 'left')}`
  // Fork: from beside TAK (left end) down to 5.1, from beside NIE down to 5.2.
  const my = c4.y + c4.h / 2
  const lx = c4.x - GAP
  const tl = (c51.x + c4.x) / 2
  const rx = c4.x + c4.w + GAP
  const tr = (c4.x + c4.w + c52.x + c52.w) / 2
  return {
    a12: side(c1, c2),
    a23: side(c2, c3),
    a34,
    tak: `M${lx},${my} H${tl + r} Q${tl},${my} ${tl},${my + r} V${upTop(c51)} ${head(tl, upTop(c51), 'down')}`,
    nie: `M${rx},${my} H${tr - r} Q${tr},${my} ${tr},${my + r} V${upTop(c52)} ${head(tr, upTop(c52), 'down')}`,
  }
}

export function ProcessArrows({ boxRef, on }: { boxRef: RefObject<HTMLElement | null>; on: string[] }) {
  const [d, setD] = useState<Record<string, string> | null>(null)
  // Passive effect: the box ref (a parent element) is attached by then.
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const update = () => setD(paths(box))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(box)
    return () => ro.disconnect()
  }, [boxRef])
  if (!d) return null
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible max-lg:hidden">
      {Object.entries(d).map(([k, path]) => (
        <path
          key={k}
          d={path}
          fill="none"
          stroke={GOLD}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: on.includes(k) ? 1 : 0, transition: 'opacity 300ms ease' }}
        />
      ))}
    </svg>
  )
}
