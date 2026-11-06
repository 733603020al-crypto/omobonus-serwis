'use client'

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { PaperOptions, PaperScene, PaperState } from '@/lib/crumpled-paper/engine'
import { afterPageLoad, checkCancelled, idleTask, pause } from '@/lib/crumpled-paper/idle'
import { entranceAt, arrivalTiming, arrivalAt, floatAt, rest, smooth, springAt, unfold, revealDrift, type Drift } from '@/lib/crumpled-paper/choreography'
import type { ContactT, Locale } from '@/components/sections/contact'
import previews from '@/lib/crumpled-paper/previews.json'
import type { Envelope } from '@/lib/crumpled-paper/presentation'
import styles from './contact-paper.module.css'

type Phase = 'loading' | 'ball' | 'moving' | 'opening' | 'holding' | 'returning' | 'handoff' | 'form' | 'crumpling' | 'thanking' | 'success' | 'success-closing' | 'flying-back' | 'contacts-drop'
type Pose = { x: number; y: number; scale: number; angle?: number }
export interface ContactPaperHandle { complete: () => Promise<void> }

const AUTO_OPEN_MS = 6000
// Experimental framing only. Set false to restore the approved C composition.
const EXPERIMENTAL_LARGE_REVEAL = true
// Engine shadow tuning (original values): BASE stays under a flat sheet, BALL is added as it crumples.
const SHADOW_COLOR = 'rgba(8,5,2,0.65)', SHADOW_BASE = 2, SHADOW_BALL = -.5, SHADOW_LIFT = .09
const CLOSE_LABEL: Record<Locale, string> = { pl: 'Zamknij', uk: 'Закрити', ru: 'Закрыть', en: 'Close' }
const SUCCESS_NOTE: Record<Locale, string> = {
  pl: "Skontaktujemy się z Tobą tak szybko, jak to możliwe",
  uk: "Ми зв'яжемося з вами якнайшвидше",
  ru: "Мы свяжемся с вами как можно скорее",
  en: "We will contact you as soon as possible",
}
const ease = (t: number) => t * t * (3 - 2 * t)

export const ContactPaper = forwardRef<ContactPaperHandle, {
  children: ReactNode; locale: Locale; text: ContactT['paper']; successTitle: string; successText: string
}>(function ContactPaper({ children, locale, text, successTitle, successText }, ref) {
  const [phase, setPhase] = useState<Phase>('loading')
  const [cycle, setCycle] = useState(0)
  const [waiting, setWaiting] = useState(false)
  const [entrance, setEntrance] = useState<'pending' | 'arriving' | 'settled'>('pending')
  const returning = useRef(false)
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)
  const phaseRef = useRef<Phase>('loading')
  const root = useRef<HTMLDivElement>(null)
  const documentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasFrameRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const successButtonRef = useRef<HTMLButtonElement>(null)
  const dismissSuccess = useRef<() => void>(() => {})
  const [successFallback, setSuccessFallback] = useState(false)
  const ballAnchor = useRef<HTMLSpanElement>(null)
  const previewRef = useRef<HTMLImageElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const engine = useRef<{ scene: PaperScene; options: PaperOptions; state: PaperState } | null>(null)
  const opener = useRef<(keyboard?: boolean) => void>(() => {})
  const hover = useRef<(x: number, y: number) => void>(() => {})
  const complete = useRef<() => Promise<void>>(async () => {})
  useImperativeHandle(ref, () => ({ complete: () => complete.current() }), [])

  useEffect(() => {
    setPortalHost(document.body)
    const preparation = new AbortController()
    const arrival = new AbortController()
    const signal = preparation.signal
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let stopped = false, accepted = false, intro = true, nearView = false, inView = false
    let repeat = returning.current, celebrating = false
    if (root.current) for (const key of ['paperVisibleAt', 'paperDeadlineAt', 'paperPageReadyAt', 'paperArrivalAt', 'paperLandedAt', 'paperReadyAt', 'paperContactsSettledAt']) delete root.current.dataset[key]
    let pageReady = false, landed = false, arriving = false, unavailable = motion.matches
    let entranceStart = 0, entranceDistance = 0, entranceLift = 0, nextSway = 0
    let entranceProfile = arrivalTiming(innerWidth), entranceSize = 80
    // Capture the real CSS animation now: it may already be finished by the
    // time fonts/page loading settle. No duplicated 7-button timing in JS.
    let contactsSettledAt = performance.now()
    const contacts = document.querySelector<HTMLElement>('#kontakt-ikony')
    const contactsWereInert = contacts?.inert ?? false
    const contactsVisibility = contacts?.style.visibility ?? ''
    const drops = !repeat && !motion.matches ? Array.from(contacts?.children ?? [])
      .flatMap(element => element.getAnimations()).filter(animation => (animation as CSSAnimation).animationName === 'contact-bounce-drop') : []
    const contactsSettled = drops.length ? Promise.all(drops.map(animation => animation.finished.catch(() => {}))).then(() => {
      contactsSettledAt = performance.now()
      if (!stopped && root.current) root.current.dataset.paperContactsSettledAt = String(contactsSettledAt)
    }).catch(() => { /* Reduced motion or navigation may cancel CSS motion. */ }) : Promise.resolve()
    if (root.current) root.current.style.minHeight = ''
    let queued = false, ready = false, automaticDue = false, shownAt = 0
    let frame = 0, autoTimer = 0, failTimer = 0
    let heldCanvas: HTMLCanvasElement | null = null
    let animationDone: (() => void) | undefined
    let landingReady: (() => void) | undefined
    let presentation: 'idle' | 'form' = 'idle'
    let envelope: Envelope | null = null
    let stageZoom = 1, stageShift = 0, stageLateral = 0, stageShortness = 0
    const readStageProfile = () => {
      if (!root.current) return
      const style = getComputedStyle(root.current)
      stageZoom = Number(style.getPropertyValue('--paper-stage-zoom')) || 1
      stageShift = Number(style.getPropertyValue('--paper-stage-shift')) || 0
      // The approved desktop composition is authored at 900px. Keep its optical
      // balance on shorter/taller windows without reducing the approved zoom.
      const height = window.visualViewport?.height ?? innerHeight
      stageLateral = smooth((1100 - innerWidth) / 332)
      stageShortness = innerWidth < 768 ? smooth((740 - height) / 180) : 0
      stageShift += innerWidth >= 768
        ? (900 - height) * .047 - smooth((height - 1024) / 56)
        : -2 * stageShortness
    }
    let modalOpen = false, frozen = false, suspended = false, suspendedAt = 0, suspendedTotal = 0
    let pendingOpen = false, pendingKeyboard = false, entranceFrame = 0
    let entranceElapsed = 0, entranceLast = 0
    let sceneTick: ((now: number) => void) | null = null
    let entranceTick: ((now: number) => void) | null = null
    let lastPose: Pose | null = null, reframe: { from: Pose; at: number } | null = null
    let meshWidth = 0, meshHeight = 0
    const motionNow = () => (suspended ? suspendedAt : performance.now()) - suspendedTotal
    const isBlocked = () => document.hidden || frozen || modalOpen || (!inView && !celebrating)
    let directedPose: (() => Pose) | null = null
    let waitTimer = 0, wiggled = false, lastBump = -Infinity
    let waitingAnimations: Animation[] = []
    let floatStart = Infinity, springStart = 0
    let springPosition = { ...rest }, springVelocity = { ...rest }
    const waitingAt = (now: number): Drift => {
      if (arriving && !landed) return arrivalAt(now - entranceStart, entranceDistance, entranceLift, entranceProfile.flight, entranceSize)
      const ambient = floatAt(now - floatStart)
      const spring = springAt(springPosition, springVelocity, now - springStart).value
      return { x: ambient.x + spring.x, y: ambient.y + spring.y, angle: ambient.angle + spring.angle }
    }
    const sampleWaiting = (at: (time: number) => Drift, duration: number, flight = false) => {
      const scale = introPlacement().pose.scale
      const start = document.timeline.currentTime
      const samples = Array.from({ length: Math.ceil(duration / 16) + 1 }, (_, i) => i)
      for (const [element, factor, base] of [
        [previewRef.current, 1, 'translateX(-50%)'], [canvasRef.current, 1 / scale, ''],
        [flight ? openButtonRef.current : null, 1, 'translateX(-50%)'],
      ] as const) {
        if (!element?.animate) continue
        const animation = element.animate(samples.map((_, i) => {
          const { x, y, angle, sx = 1, sy = 1 } = at(i / (samples.length - 1) * duration)
          return { transform: `${base} translate3d(${x * factor}px, ${y * factor}px, 0) rotate(${angle}deg)${sx === 1 && sy === 1 ? '' : ` scale(${sx}, ${sy})`}` }
        }), { duration, easing: 'linear' })
        animation.id = flight ? 'paper-arrival' : 'paper-drift'
        animation.startTime = start
        waitingAnimations.push(animation)
        if (suspended) animation.pause()
        void animation.finished.catch(() => {})
      }
    }

    const stopWaiting = (settle = false) => {
      clearTimeout(waitTimer)
      const now = motionNow(), current = waitingAt(now), previous = waitingAt(now - 1)
      waitingAnimations.forEach(animation => animation.cancel())
      waitingAnimations = []
      if (settle) {
        const velocity = { x: (current.x - previous.x) * 1000, y: (current.y - previous.y) * 1000, angle: (current.angle - previous.angle) * 1000 }
        sampleWaiting(time => {
          const value = springAt(current, velocity, time).value
          const tail = 1 - smooth(time / 600)
          return { x: value.x * tail, y: value.y * tail, angle: value.angle * tail }
        }, 600)
      }
    }
    const refreshWaiting = () => {
      waitingAnimations.forEach(animation => animation.cancel()); waitingAnimations = []
      const now = motionNow()
      sampleWaiting(time => waitingAt(now + time), Math.max(2000, (Number.isFinite(floatStart) ? floatStart + 3600 - now : 0)))
    }
    hover.current = (x) => {
      if (stopped || !landed || motion.matches || isBlocked() || !['loading', 'ball'].includes(phaseRef.current)
        || !matchMedia('(hover: hover) and (pointer: fine)').matches || performance.now() - lastBump < 240) return
      const rect = openButtonRef.current?.getBoundingClientRect()
      if (!rect) return
      const now = motionNow(), direction = x < rect.left + rect.width / 2 ? 1 : -1
      const spring = springAt(springPosition, springVelocity, now - springStart)
      springPosition = spring.value
      springVelocity = { x: spring.speed.x + direction * 38, y: spring.speed.y - 45, angle: spring.speed.angle + direction * 10 }
      springStart = lastBump = now
      refreshWaiting()
    }

    const change = (next: Phase) => {
      if (!stopped) {
        if (contacts) {
          contacts.inert = contactsWereInert || celebrating || ['moving', 'opening', 'holding', 'returning', 'handoff'].includes(next)
          if (next === 'success-closing') contacts.style.visibility = 'hidden'
        }
        phaseRef.current = next; setPhase(next); setWaiting(false)
      }
    }
    const still = (expected: Phase) => !stopped && phaseRef.current === expected
    const formPose = (): Pose => {
      const rect = documentRef.current!.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, scale: 1 }
    }
    const introPlacement = () => {
      const rect = documentRef.current!.getBoundingClientRect()
      const bounds = root.current!.getBoundingClientRect()
      const size = Math.sqrt(rect.width * rect.height)
      const meta = previews[locale][innerWidth < 768 ? 'mobile' : 'desktop']
      const visibleHeight = Math.max(96, innerHeight - (innerWidth < 768 ? 80 : 24) - bounds.top - 12)
      const scale = Math.min(1, Math.min(240, bounds.width * .52) / (meta.width * size), visibleHeight / (meta.height * size))
      const width = meta.width * size * scale, height = meta.height * size * scale
      return {
        width, height, offsetX: meta.x * size * scale,
        pose: { x: rect.left + rect.width / 2, y: bounds.top + 12 + height / 2 - meta.y * size * scale, scale },
      }
    }
    const positionPreview = () => {
      if (!intro || !root.current || !documentRef.current) return
      const p = introPlacement(), image = previewRef.current, button = openButtonRef.current
      if (image) {
        image.style.width = `${p.width}px`
        image.style.left = `calc(50% + ${p.offsetX}px)`
      }
      if (button) {
        button.style.width = `${p.width}px`
        button.style.height = `${p.height}px`
        button.style.left = `calc(50% + ${p.offsetX}px)`
      }
      if (ballAnchor.current) ballAnchor.current.style.top = `${12 + p.height / 2}px`
    }
    const applyPose = (pose: Pose) => {
      const canvas = canvasFrameRef.current
      if (!canvas) return
      if (reframe) {
        const t = smooth((motionNow() - reframe.at) / 320), from = reframe.from
        pose = { x: from.x + (pose.x - from.x) * t, y: from.y + (pose.y - from.y) * t, scale: from.scale + (pose.scale - from.scale) * t,
          angle: (from.angle ?? 0) + ((pose.angle ?? 0) - (from.angle ?? 0)) * t }
        if (t >= 1) reframe = null
      }
      lastPose = pose
      // Keep layout coordinates fixed. left/top animation would count as CLS;
      // one compositor transform moves the same canvas without layout shifts.
      canvas.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) translate(-50%, -50%) scale(${pose.scale}) rotate(${pose.angle ?? 0}deg)`
    }
    const centeredPose = (): Pose => {
      const e = engine.current!
      const b = envelope ?? { left: -e.state.w / 2, right: e.state.w / 2, top: -e.state.h / 2, bottom: e.state.h / 2 }
      const header = document.querySelector('header')?.getBoundingClientRect().bottom || 64
      const viewport = window.visualViewport
      const height = viewport?.height ?? innerHeight, width = viewport?.width ?? innerWidth
      // The paper is the foreground actor. Optical overscan uses transparent
      // print padding, rather than reserving a second stage below the icons.
      const top = header + 4
      const bottom = height - (innerWidth < 768 ? 66 : 10)
      const fit = Math.min(1, (width - 16) / (b.right - b.left + 8), Math.max(36, bottom - top) / (b.bottom - b.top + 8))
      const scale = fit * stageZoom
      const pose = { x: width / 2 - (b.left + b.right) / 2 * scale, y: (top + bottom) / 2 + stageShift - (b.top + b.bottom) / 2 * scale, scale }
      if (EXPERIMENTAL_LARGE_REVEAL) {
        // Frame the final sheet at half the menu height. Resolve once from
        // document dimensions, so the camera never zooms as folds release.
        pose.scale = Math.max(scale, (pose.y - header / 2) / (e.state.h / 2 - 24))
      }
      return pose
    }
    const settleAnimation = () => {
      cancelAnimationFrame(frame)
      sceneTick = null
      animationDone?.(); animationDone = undefined
    }
    const dispose = () => {
      const scene = engine.current?.scene
      const context = scene?.gl ?? heldCanvas?.getContext('webgl2')
      engine.current = null; ready = false
      heldCanvas?.removeEventListener('webglcontextlost', onLost)
      heldCanvas = null
      scene?.dispose()
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    }
    function fallback() {
      stopWaiting()
      arrival.abort()
      directedPose = null
      clearTimeout(autoTimer); clearTimeout(failTimer)
      preparation.abort(); settleAnimation(); dispose()
      intro = false; presentation = 'form'
      if (accepted) setSuccessFallback(true)
      if (phaseRef.current !== 'success') change(accepted ? 'success' : 'form')
    }
    const draw = (render = true) => {
      const e = engine.current
      if (!e) return
      e.options.shadowAmt = SHADOW_BASE + SHADOW_BALL * e.state.progress
      // A flat sheet casts no offset shadow by itself; float it above the table as it opens (0 for the ball).
      e.options.shadowLift = SHADOW_LIFT * (1 - e.state.progress)
      if (render) e.scene.render(e.options, [e.state])
      applyPose(directedPose ? directedPose() : !intro || presentation === 'form' ? formPose() : introPlacement().pose)
    }
    const runFrames = (duration: number, update: (t: number) => boolean | void) => new Promise<void>(resolve => {
      settleAnimation(); animationDone = resolve
      let elapsed = 0, previous = performance.now()
      const step = (now: number) => {
        if (stopped || !engine.current) { settleAnimation(); return }
        const delta = now - previous; previous = now
        if (isBlocked()) return
        // A frozen renderer can miss visibility events. Never jump across folds.
        elapsed += delta > 250 ? 16 : Math.max(0, delta)
        try { draw(update(Math.min(1, elapsed / duration)) !== false) } catch { fallback(); return }
        if (elapsed < duration) frame = requestAnimationFrame(step)
        else { animationDone = undefined; sceneTick = null; resolve() }
      }
      sceneTick = now => { previous = now; frame = requestAnimationFrame(step) }
      frame = requestAnimationFrame(step)
    })
    const animate = async (target: number) => {
      const e = engine.current
      if (!e || motion.matches) return
      const from = e.state.progress
      // Preserve the original 1.5-second paper deformation, including submission.
      await runFrames(1500, t => { e.state.progress = from + (target - from) * ease(t) })
    }
    const arc = (from: Pose, to: Pose, t: number, bend: number): Pose => {
      const k = smooth(t), bow = 16 * k * k * (1 - k) * (1 - k)
      return { x: from.x + (to.x - from.x) * k + bend * bow,
        y: from.y + (to.y - from.y) * k - Math.abs(bend) * .6 * bow,
        scale: from.scale + (to.scale - from.scale) * k }
    }
    async function open(keyboard = false) {
      if (phaseRef.current === 'loading') {
        if (unavailable) {
          fallback()
          if (keyboard) requestAnimationFrame(() => documentRef.current?.querySelector<HTMLInputElement>('#contact-name')?.focus({ preventScroll: true }))
        } else { pendingOpen = true; pendingKeyboard ||= keyboard; setWaiting(true); queueInitialization() }
        return
      }
      if (!ready || phaseRef.current !== 'ball' || isBlocked()) return
      pendingOpen = false
      clearTimeout(autoTimer)
      stopWaiting(true)
      arrival.abort(); landed = true; setEntrance('settled')
      const e = engine.current!
      readStageProfile()
      const from = introPlacement().pose, center = centeredPose()
      const travelMs = Math.max(680, Math.min(880, 620 + Math.hypot(center.x - from.x, center.y - from.y) * .45))
      const openingStart = travelMs - 180, openingEnd = openingStart + 2350
      const returnStart = openingEnd + 260, duration = returnStart + 1000
      let time = 0, landedPose: Pose | null = null
      const currentCenter = (): Pose => {
        const pose = centeredPose(), drift = revealDrift(1 - e.state.progress, innerWidth < 768, stageLateral, stageShortness)
        const unit = Math.sqrt(e.state.w * e.state.h) * pose.scale
        return { ...pose, x: pose.x + drift.x * unit, y: pose.y + drift.y * unit, angle: drift.angle }
      }
      directedPose = () => {
        if (time >= returnStart) {
          landedPose ??= currentCenter()
          return arc(landedPose, formPose(), (time - returnStart) / 1000, -14)
        }
        const target = currentCenter()
        if (time < travelMs) {
          const pose = arc(from, target, time / travelMs, innerWidth < 768 ? 18 : 28)
          // Establish the framing before the very first fold releases. The arc
          // continues for 180ms, but there is no zoom during the unfolding.
          pose.scale = from.scale + (target.scale - from.scale) * smooth(time / openingStart)
          return pose
        }
        return target
      }
      change('moving')
      // One clock: the first folds release before the arc ends. No stage awaits
      // or resets velocity at arrival; only the finished sheet has a brief hold.
      await runFrames(duration, t => {
        time = t * duration
        const next = time < openingStart ? 'moving' : time < openingEnd ? 'opening' : time < returnStart ? 'holding' : 'returning'
        if (phaseRef.current !== next) change(next)
        const progress = 1 - unfold((time - openingStart) / 2350)
        const dirty = e.state.progress !== progress
        e.state.progress = progress
        return dirty
      })
      directedPose = null
      if (!still('returning')) return
      // A responsive reflow keeps the old physical document during the scene;
      // refresh its print and dimensions before the HTML handoff, never skip it.
      const rect = documentRef.current!.getBoundingClientRect()
      if (Math.abs(rect.width - meshWidth) > 1 || Math.abs(rect.height - meshHeight) > 1) {
        try {
          const { snapshotDocument } = await import('@/lib/crumpled-paper/snapshot')
          const texture = await snapshotDocument(documentRef.current!, e.options.dpr, signal)
          if (!still('returning')) return
          e.options.width = e.state.w = rect.width; e.options.height = e.state.h = rect.height
          e.state.x = e.state.y = 0
          e.options.margin = Math.round(Math.max(rect.width, rect.height) * .35)
          e.scene.setImage(e.state.key, texture, false)
          canvasRef.current!.style.width = `${rect.width + 2 * e.options.margin}px`
          canvasRef.current!.style.height = `${rect.height + 2 * e.options.margin}px`
          canvasFrameRef.current!.style.width = canvasRef.current!.style.width
          canvasFrameRef.current!.style.height = canvasRef.current!.style.height
          canvasRef.current!.width = Math.round((rect.width + 2 * e.options.margin) * e.options.dpr)
          canvasRef.current!.height = Math.round((rect.height + 2 * e.options.margin) * e.options.dpr)
          draw()
        } catch { if (stopped) return }
      }
      if (!still('returning')) return
      intro = false; presentation = 'form'; applyPose(formPose())
      if (ballAnchor.current) ballAnchor.current.style.top = 'calc(50% + 43px)'
      change('handoff')
      await new Promise(resolve => window.setTimeout(resolve, 140))
      if (!still('handoff')) return
      change('form')
      if (keyboard) requestAnimationFrame(() => documentRef.current?.querySelector<HTMLInputElement>('#contact-name')?.focus({ preventScroll: true }))
    }
    opener.current = keyboard => { void open(keyboard) }
    async function beginEntrance() {
      if (stopped || arriving || landed || !pageReady || isBlocked() || !['loading', 'ball'].includes(phaseRef.current)) return
      const image = previewRef.current
      if (!ready && (!image?.complete || !image.naturalWidth)) return
      arriving = true
      entranceProfile = arrivalTiming(innerWidth)
      const placement = introPlacement()
      entranceSize = placement.height
      entranceDistance = placement.pose.x + placement.offsetX + placement.width * .75 + 24
      const centerY = root.current!.getBoundingClientRect().top + 12 + placement.height / 2
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom || 64
      entranceLift = Math.min(130, Math.max(30, centerY - headerBottom - placement.height * .7 - 24))
      entranceStart = motionNow()
      if (root.current) root.current.dataset.paperArrivalAt = String(entranceStart)
      // Without a handoff (repeat visit, reduced motion) the ball plays the whole landing;
      // otherwise the opening takes over while the ball is still rising from the hop.
      const handsOff = !repeat && !motion.matches
      const duration = handsOff ? entranceProfile.handoff : entranceProfile.total
      if (!motion.matches) sampleWaiting(time => arrivalAt(time, entranceDistance, entranceLift, entranceProfile.flight, entranceSize), entranceProfile.total, true)
      setEntrance('arriving')
      try {
        if (!motion.matches) await new Promise<void>((resolve, reject) => {
          const cancel = () => { cancelAnimationFrame(entranceFrame); reject(arrival.signal.reason) }
          arrival.signal.addEventListener('abort', cancel, { once: true })
          entranceElapsed = 0; entranceLast = performance.now()
          const tick = (now: number) => {
            const delta = now - entranceLast; entranceLast = now
            if (!isBlocked()) entranceElapsed += delta > 250 ? 16 : Math.max(0, delta)
            if (entranceElapsed < duration) entranceFrame = requestAnimationFrame(tick)
            else { entranceTick = null; arrival.signal.removeEventListener('abort', cancel); resolve() }
          }
          entranceTick = now => { entranceLast = now; entranceFrame = requestAnimationFrame(tick) }
          entranceFrame = requestAnimationFrame(tick)
        })
        if (stopped || !['loading', 'ball'].includes(phaseRef.current)) return
        if (handsOff && ready && phaseRef.current === 'ball' && !isBlocked()) {
          // The hop flows straight into the unfolding: no pause, no second clock
          landingReady?.(); landingReady = undefined
          if (root.current) root.current.dataset.paperLandedAt = String(performance.now())
          void open()
          return
        }
        landed = true; setEntrance('settled')
        landingReady?.(); landingReady = undefined
        if (root.current) root.current.dataset.paperLandedAt = String(performance.now())
        nextSway = motionNow() + (repeat ? 2400 : 600)
        schedule()
      } catch { /* Manual opening or unmount cancels the arrival. */ }
    }
    function schedule() {
      clearTimeout(autoTimer)
      clearTimeout(waitTimer)
      if (!['loading', 'ball'].includes(phaseRef.current)) return
      if (!inView || document.hidden) { shownAt = 0; automaticDue = false; return }
      if (modalOpen || frozen) return
      const image = previewRef.current
      if (!shownAt && (ready || (image?.complete && image.naturalWidth))) {
        shownAt = performance.now()
        if (root.current) root.current.dataset.paperVisibleAt = String(shownAt)
      }
      if (!shownAt) return
      void beginEntrance()
      if (!landed) return
      if (pendingOpen && (ready || unavailable)) { void open(pendingKeyboard); return }
      // Let the landing settle before the first sway. After a submission the
      // same sway repeats with 5-7 s pauses until the ball is pressed.
      const wiggle = () => {
        if (stopped || isBlocked() || !['loading', 'ball'].includes(phaseRef.current)) return
        wiggled = true
        floatStart = motionNow()
        refreshWaiting()
        if (repeat) {
          nextSway = motionNow() + 3600 + 5000 + Math.random() * 2000
          waitTimer = window.setTimeout(wiggle, nextSway - motionNow())
        }
      }
      if ((repeat || !wiggled) && !motion.matches) waitTimer = window.setTimeout(wiggle, Math.max(0, nextSway - motionNow()))
      if (repeat) return
      if (automaticDue) { if (ready || unavailable) void open(); return }
      autoTimer = window.setTimeout(() => {
        automaticDue = true
        if (root.current) root.current.dataset.paperDeadlineAt = String(performance.now())
        if ((ready || unavailable) && landed && !isBlocked()) void open()
      }, Math.max(0, AUTO_OPEN_MS - (performance.now() - shownAt)))
    }
    async function initialize() {
      failTimer = window.setTimeout(preparationFailed, 15000)
      try {
        // No heavy import is evaluated until load + quiet period + an idle slot.
        const [{ loadCrumpleData, prepareScene }, { snapshotDocument }] = await Promise.all([
          import('@/lib/crumpled-paper/engine'), import('@/lib/crumpled-paper/snapshot'),
        ])
        checkCancelled(signal)
        await idleTask(signal)
        const element = documentRef.current!, canvas = canvasRef.current!
        if (!canvas) throw new Error('Paper canvas unavailable')
        const rect = element.getBoundingClientRect()
        const margin = Math.round(Math.max(rect.width, rect.height) * .35)
        const dpr = Math.min(devicePixelRatio || 1, 1.5, 2048 / (Math.max(rect.width, rect.height) + 2 * margin))
        const texture = await snapshotDocument(element, dpr, signal)
        checkCancelled(signal)
        await idleTask(signal)
        const data = await loadCrumpleData()
        checkCancelled(signal)
        await idleTask(signal)
        heldCanvas = canvas
        const scene = await prepareScene(canvas, data)
        if (stopped || signal.aborted) { scene.dispose(); scene.gl.getExtension('WEBGL_lose_context')?.loseContext(); return }
        const options: PaperOptions = { width: rect.width, height: rect.height, margin, dpr, seed: 7,
          creases: 0, creaseAngle: 48, lift: 0, ballSize: .9, paper: '#e7c797', gloss: .06,
          grain: 0, rakeElev: .32, inset: [0,0,0,0], radii: [0,0,0,0],
          shadow: SHADOW_COLOR, shadowAmt: SHADOW_BASE + SHADOW_BALL, ao: 1, show: .5,
          keyDir: [-.2635,.3387,.9033], fillDir: [.722,-.309,.619] }
        const state: PaperState = { key: 'contact-document', x: 0, y: 0, w: rect.width, h: rect.height,
          progress: 1, tiltAxis: 1.3, tilt: .55, spin: 2, flatRot: 0, offX: 0, offY: 0,
          curl: [0,0,0,0], rake: .27, rakeAngle: 2.35, focus: [.5,.5], flip: [0,0], hoverLift: 0, fold: 0, foldJitter: [0,0,0] }
        engine.current = { scene, options, state }
        meshWidth = rect.width; meshHeight = rect.height
        heldCanvas = canvas
        canvas.addEventListener('webglcontextlost', onLost)
        await idleTask(signal)
        scene.setImage(state.key, texture, false)
        canvas.style.width = `${rect.width + 2 * margin}px`
        canvas.style.height = `${rect.height + 2 * margin}px`
        canvasFrameRef.current!.style.width = canvas.style.width
        canvasFrameRef.current!.style.height = canvas.style.height
        const meta = previews[locale][innerWidth < 768 ? 'mobile' : 'desktop']
        const size = Math.sqrt(rect.width * rect.height)
        // Rotate around the ball itself, matching the cropped static preview.
        canvas.style.transformOrigin = `${(rect.width + 2 * margin) / 2 + meta.x * size}px ${(rect.height + 2 * margin) / 2 + meta.y * size}px`
        // All crease-map shader weights are already zero in this form. Keep the
        // engine's neutral texture; do not compute its invisible procedural map.
        const { measureEnvelope } = await import('@/lib/crumpled-paper/presentation')
        envelope = await measureEnvelope(scene, options, state, signal)
        checkCancelled(signal)
        draw()
        clearTimeout(failTimer); ready = true
        if (root.current) root.current.dataset.paperReadyAt = String(performance.now())
        change('ball'); schedule()
      } catch (error) {
        if (stopped || signal.aborted) return
        if (process.env.NODE_ENV === 'development') console.warn('Contact paper fallback:', error)
        preparationFailed()
      }
    }
    function preparationFailed() {
      if (phaseRef.current !== 'loading') { fallback(); return }
      clearTimeout(failTimer); preparation.abort(); dispose()
      unavailable = true
      schedule()
    }
    function queueInitialization() {
      if (queued || unavailable || !nearView || document.hidden || motion.matches || phaseRef.current !== 'loading') return
      queued = true
      void (async () => {
        try {
          await afterPageLoad(signal)
          checkCancelled(signal)
          // Preparation starts while the paper is still flying: the flight runs on
          // the compositor and every heavy step below yields to idle time.
          checkCancelled(signal)
          if (document.hidden || !nearView) { queued = false; return }
          await initialize()
        } catch { if (!signal.aborted && !stopped) fallback() }
      })()
    }
    const previewImage = previewRef.current
    previewImage?.addEventListener('load', schedule)
    const near = new IntersectionObserver(entries => {
      nearView = entries.some(e => e.isIntersecting)
      queueInitialization()
    }, { rootMargin: '250px' })
    const visible = new IntersectionObserver(entries => {
      inView = entries[entries.length - 1].isIntersecting
      syncSuspension()
      if (inView) onViewport(false)
      schedule()
    })
    if (root.current) near.observe(root.current)
    if (ballAnchor.current) visible.observe(ballAnchor.current)
    const resize = new ResizeObserver(() => onViewport())
    if (documentRef.current) resize.observe(documentRef.current)
    const layout = root.current?.closest('main'), header = document.querySelector('header')
    if (layout) resize.observe(layout)
    if (header) resize.observe(header)
    function onLost(event: Event) { event.preventDefault(); fallback() }
    const onMotion = () => { if (motion.matches) fallback() }
    const syncSuspension = () => {
      const block = isBlocked()
      if (block === suspended) return
      if (block) {
        suspendedAt = performance.now(); suspended = true
        waitingAnimations.forEach(animation => animation.pause())
        cancelAnimationFrame(frame)
        cancelAnimationFrame(entranceFrame)
      } else {
        suspendedTotal += performance.now() - suspendedAt; suspended = false
        waitingAnimations.forEach(animation => animation.play())
        sceneTick?.(performance.now())
        entranceTick?.(performance.now())
      }
      if (root.current) root.current.dataset.paperPaused = String(block)
    }
    const onVisibility = () => { syncSuspension(); schedule(); queueInitialization() }
    // Page Lifecycle freeze/resume can occur without a visibilitychange event
    // (including restored tabs and Chrome's renderer suspension).
    const onFreeze = () => { frozen = true; onVisibility() }
    const onResume = () => { frozen = false; onVisibility() }
    const dialogs = new MutationObserver(() => {
      const next = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]')).some(el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden')
      if (next !== modalOpen) { modalOpen = next; onVisibility() }
    })
    dialogs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-modal', 'open', 'hidden'] })
    const onViewport = (full = true) => {
      positionPreview()
      if (full) readStageProfile()
      if (!ready || !engine.current) return
      if (intro && directedPose && lastPose) reframe = { from: lastPose, at: motionNow() }
      if (suspended) return
      if (directedPose) applyPose(directedPose())
      else if (!intro) applyPose(formPose())
      else if (presentation === 'idle') applyPose(introPlacement().pose)
    }
    positionPreview()
    // Arrival is independent of engine preparation. First paint has only the
    // contact page; an unloaded engine never prevents a manual HTML fallback.
    void (async () => {
      try {
        if (document.readyState !== 'complete') await new Promise<void>((resolve, reject) => {
          const loaded = () => { arrival.signal.removeEventListener('abort', cancel); resolve() }
          const cancel = () => { window.removeEventListener('load', loaded); reject(arrival.signal.reason) }
          window.addEventListener('load', loaded, { once: true })
          arrival.signal.addEventListener('abort', cancel, { once: true })
        })
        await document.fonts.ready
        checkCancelled(arrival.signal)
        if (repeat && !motion.matches) {
          let previous = scrollY, stable = 0
          for (let elapsed = 0; elapsed < 1600 && stable < 240; elapsed += 80) {
            await pause(80, arrival.signal)
            stable = Math.abs(scrollY - previous) < .5 ? stable + 80 : 0
            previous = scrollY
          }
        }
        const loadedAt = performance.now()
        if (root.current) root.current.dataset.paperPageReadyAt = String(loadedAt)
        if (repeat) await pause(1500, arrival.signal)
        else {
          await contactsSettled
          checkCancelled(arrival.signal)
          await pause(Math.max(0, Math.max(loadedAt, contactsSettledAt) + 250 - performance.now()), arrival.signal)
        }
        pageReady = true
        schedule()
      } catch { /* The page was left or the form was opened directly. */ }
    })()
    motion.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    document.addEventListener('freeze', onFreeze)
    document.addEventListener('resume', onResume)
    // Scroll only moves the stage: one pass per frame, skipped while the ball is
    // off screen (the observer refreshes the pose when it returns).
    let scrollFrame = 0
    const onScroll = () => {
      if (scrollFrame || (!inView && !celebrating)) return
      scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; if (!stopped) onViewport(false) })
    }
    const onResize = () => onViewport()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // A square drawing surface lets the same mesh become a compact thank-you
    // sheet. Physical sheet dimensions remain independent of this render box.
    const resizeSurface = () => {
      const e = engine.current!, canvas = canvasRef.current!
      const width = e.options.width + 2 * e.options.margin, height = e.options.height + 2 * e.options.margin
      canvas.width = Math.round(width * e.options.dpr); canvas.height = Math.round(height * e.options.dpr)
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`
      canvasFrameRef.current!.style.width = canvas.style.width; canvasFrameRef.current!.style.height = canvas.style.height
    }
    const sheet = (width: number, height: number, print: HTMLCanvasElement, ballSize: number) => {
      const e = engine.current!
      e.state.w = width; e.state.h = height
      e.state.x = (e.options.width - width) / 2; e.state.y = (e.options.height - height) / 2
      e.options.ballSize = ballSize; e.scene.setImage(e.state.key, print, false)
    }
    let noteWidth = 1, noteHeight = 1
    const notePose = (): Pose => {
      const header = document.querySelector('header')?.getBoundingClientRect().bottom || 64
      const bottom = innerWidth < 768 ? 80 : 20
      return { x: innerWidth / 2, y: (header + innerHeight - bottom) / 2,
        scale: Math.min(500, innerWidth - 40) / noteWidth * Math.min(1, (innerHeight - header - bottom - 24) / (Math.min(500, innerWidth - 40) * noteHeight / noteWidth)) }
    }
    const replayContacts = async () => {
      change('contacts-drop')
      const elements = Array.from(contacts?.children ?? []) as HTMLElement[]
      elements.forEach(element => { element.style.animation = 'none' })
      void contacts?.offsetWidth
      if (contacts) contacts.style.visibility = contactsVisibility
      elements.forEach(element => { element.style.animation = '' })
      await Promise.all(elements.flatMap(element => element.getAnimations())
        .filter(animation => (animation as CSSAnimation).animationName === 'contact-bounce-drop')
        .map(animation => animation.finished.catch(() => {})))
    }
    const park = () => {
      accepted = false; celebrating = false; repeat = true; returning.current = true
      intro = true; presentation = 'idle'; directedPose = null; reframe = null
      landed = true; arriving = false; pendingOpen = false; automaticDue = false; shownAt = 0
      setSuccessFallback(false); setEntrance('settled'); setCycle(value => value + 1)
      if (root.current) root.current.style.minHeight = ''
      positionPreview()
      if (ready) applyPose(introPlacement().pose)
      nextSway = motionNow() + 2400
      change(ready ? 'ball' : 'loading')
      requestAnimationFrame(() => { if (!stopped) { positionPreview(); syncSuspension(); schedule(); openButtonRef.current?.focus({ preventScroll: true }) } })
    }
    async function finishSuccess() {
      if (!still('success')) return
      change('success-closing')
      try {
        const e = engine.current
        if (e && !motion.matches) {
          await animate(1)
          if (!still('success-closing')) return
          const held = lastPose ?? notePose()
          directedPose = () => held
          const oldSize = Math.sqrt(e.state.w * e.state.h), oldDistance = Math.max(e.state.w, e.state.h)
          const { snapshotDocument } = await import('@/lib/crumpled-paper/snapshot')
          const rect = documentRef.current!.getBoundingClientRect()
          const print = await snapshotDocument(documentRef.current!, e.options.dpr, signal)
          if (stopped) return
          const distance = Math.max(rect.width, rect.height)
          const compensation = e.options.ballSize * oldSize / Math.sqrt(rect.width * rect.height) * distance / oldDistance
          const from = { ...held, scale: held.scale * oldDistance / distance }
          sheet(rect.width, rect.height, print, compensation)
          if (Math.abs(meshWidth - rect.width) > 1 || Math.abs(meshHeight - rect.height) > 1) {
            const { measureEnvelope } = await import('@/lib/crumpled-paper/presentation')
            envelope = await measureEnvelope(e.scene, { ...e.options, ballSize: .9 }, e.state, signal)
          }
          meshWidth = rect.width; meshHeight = rect.height
          directedPose = () => from; draw()
          const meta = previews[locale][innerWidth < 768 ? 'mobile' : 'desktop'], size = Math.sqrt(rect.width * rect.height)
          canvasRef.current!.style.transformOrigin = `${(e.options.width + 2 * e.options.margin) / 2 + meta.x * size}px ${(e.options.height + 2 * e.options.margin) / 2 + meta.y * size}px`
          const center = (pose: Pose) => {
            const angle = (pose.angle ?? 0) * Math.PI / 180
            return { x: pose.x + size * pose.scale * (meta.x * Math.cos(angle) - meta.y * Math.sin(angle)),
              y: pose.y + size * pose.scale * (meta.x * Math.sin(angle) + meta.y * Math.cos(angle)) }
          }
          const at = (x: number, y: number, scale: number, angle: number): Pose => {
            const a = angle * Math.PI / 180
            return { x: x - size * scale * (meta.x * Math.cos(a) - meta.y * Math.sin(a)),
              y: y - size * scale * (meta.x * Math.sin(a) + meta.y * Math.cos(a)), scale, angle }
          }
          const start = center(from), scrollStart = scrollY, rise = 2000, fall = 1100, settle = 400
          // Use the folded mesh itself for contact with the menu. The preview
          // bounds are an axis-aligned crop, not a rotated collision contour.
          e.options.ballSize = .9
          e.scene.render(e.options, [e.state])
          const angle = -22 * Math.PI / 180, camera = distance * 2.6
          let foldedTop = 0
          for (let i = 0; i < e.scene.pos.length; i += 3) {
            const k = camera / (camera - e.scene.pos[i + 2])
            const x = e.scene.pos[i] * k - meta.x * size
            const y = -e.scene.pos[i + 1] * k - meta.y * size
            foldedTop = Math.min(foldedTop, x * Math.sin(angle) + y * Math.cos(angle))
          }
          e.options.ballSize = compensation
          draw()
          let elapsed = 0
          const landing = () => {
            const placement = introPlacement(), point = center(placement.pose)
            return { ...point, scale: placement.pose.scale }
          }
          const impact = () => {
            const target = landing(), radius = -foldedTop * target.scale
            return { x: target.x + Math.min(24, innerWidth * .025), y: (document.querySelector('header')?.getBoundingClientRect().bottom || 64) + radius - 2, scale: target.scale }
          }
          directedPose = () => {
            const hit = impact()
            if (elapsed < rise) {
              const t = elapsed / rise, k = t * t
              return at(start.x + (hit.x - start.x) * smooth(t) + 12 * Math.sin(Math.PI * t) ** 2,
                start.y + (hit.y - start.y) * k, from.scale + (hit.scale - from.scale) * smooth(t), -22 * smooth(t))
            }
            const target = landing(), time = elapsed - rise
            const drift = entranceAt(time, target.x - hit.x, target.y - hit.y, fall, settle)
            const t = Math.min(1, time / fall)
            // Reverse the impact velocity into a soft downward rebound. The
            // existing Hermite flight and spring supply the landing and tail.
            const rebound = time < fall ? 140 * fall / 1000 * t * (1 - t) ** 2 : 0
            return at(target.x + drift.x, target.y + drift.y + rebound, target.scale, drift.angle)
          }
          change('flying-back')
          await runFrames(rise + fall + settle, t => {
            elapsed = t * (rise + fall + settle)
            scrollTo({ top: elapsed < rise ? scrollStart * (1 - smooth(elapsed / rise)) : 0, behavior: 'instant' })
            const next = compensation + (.9 - compensation) * smooth(Math.min(1, elapsed / rise))
            const dirty = e.options.ballSize !== next; e.options.ballSize = next
            return dirty
          })
          if (!still('flying-back')) return
          await replayContacts()
          if (stopped) return
          park()
          return
        }
      } catch { /* A graphics failure cannot invalidate a successful request. */ }
      if (stopped) return
      dispose(); unavailable = true
      scrollTo({ top: 0, behavior: 'instant' })
      await replayContacts()
      if (!stopped) park()
    }
    dismissSuccess.current = () => { void finishSuccess() }
    complete.current = async () => {
      accepted = true; celebrating = true; clearTimeout(autoTimer); stopWaiting()
      syncSuspension(); setSuccessFallback(false)
      if (root.current) root.current.style.minHeight = `${root.current.getBoundingClientRect().height}px`
      try {
        const e = engine.current, element = documentRef.current
        if (e && element && !motion.matches) {
          const { snapshotDocument } = await import('@/lib/crumpled-paper/snapshot')
          const rect = element.getBoundingClientRect(), extent = Math.max(rect.width, rect.height)
          const texture = await snapshotDocument(element, e.options.dpr, signal)
          if (stopped) return
          e.options.width = e.options.height = extent
          e.options.margin = Math.round(extent * .35)
          e.options.dpr = Math.min(devicePixelRatio || 1, 1.5, 2048 / (extent + 2 * e.options.margin))
          sheet(rect.width, rect.height, texture, .9); resizeSurface(); e.state.progress = 0
          intro = false; presentation = 'form'; directedPose = formPose
          draw(); change('crumpling')
          ballAnchor.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
          await animate(1)
          if (!still('crumpling')) return
          const from = lastPose ?? formPose()
          directedPose = () => from
          const print = await snapshotDocument(successRef.current!, Math.min(2, devicePixelRatio || 1), signal)
          if (stopped) return
          const note = successRef.current!.getBoundingClientRect(), k = extent / Math.max(note.width, note.height)
          noteWidth = note.width * k; noteHeight = note.height * k
          // Equal maximum dimension keeps the camera distance; equal S*ballSize
          // keeps every folded vertex in the same place during the print swap.
          sheet(noteWidth, noteHeight, print, .9 * Math.sqrt(rect.width * rect.height / (noteWidth * noteHeight)))
          draw(); change('thanking')
          let t = 0
          directedPose = () => arc(from, notePose(), t, innerWidth < 768 ? 12 : 20)
          await runFrames(1900, value => { t = value; e.state.progress = 1 - unfold(value) })
          if (!still('thanking')) return
          directedPose = notePose
          change('success')
        } else { setSuccessFallback(true); change('success') }
      } catch { if (!stopped) { dispose(); setSuccessFallback(true); change('success') } }
      if (!stopped) requestAnimationFrame(() => successButtonRef.current?.focus({ preventScroll: true }))
    }
    return () => {
      stopped = true; preparation.abort(); arrival.abort()
      stopWaiting(); hover.current = () => {}
      clearTimeout(autoTimer); clearTimeout(failTimer); settleAnimation(); dispose()
      near.disconnect(); visible.disconnect(); resize.disconnect()
      motion.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
      document.removeEventListener('freeze', onFreeze)
      document.removeEventListener('resume', onResume)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(scrollFrame)
      previewImage?.removeEventListener('load', schedule)
      dialogs.disconnect(); cancelAnimationFrame(entranceFrame)
      if (contacts) { contacts.inert = contactsWereInert; contacts.style.visibility = contactsVisibility }
    }
  }, [locale])

  const dismiss = () => dismissSuccess.current()

  useEffect(() => {
    if (phase !== 'success') return
    const timer = window.setTimeout(dismiss, 7000)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', onKey) }
  }, [phase])

  const successShown = phase === 'success'
  const formVisible = phase === 'form' || phase === 'handoff'
  const canvasVisible = ['ball','moving','opening','holding','returning','handoff','crumpling','thanking','success','success-closing','flying-back','contacts-drop'].includes(phase) && !successFallback
  return <div ref={root} className={styles.root} data-paper-phase={phase} data-paper-entrance={entrance} data-paper-cycle={cycle}>
    <div ref={documentRef} className={styles.document} inert={phase !== 'loading' && phase !== 'form'} aria-hidden={phase !== 'loading' && phase !== 'form'}
      style={{ visibility: formVisible ? 'visible' : 'hidden', opacity: formVisible ? 1 : 0 }}>{children}</div>
    {portalHost && createPortal(<div className={styles.viewport} aria-hidden="true" data-paper-layer=""
      style={EXPERIMENTAL_LARGE_REVEAL && ['moving','opening','holding','returning','handoff'].includes(phase) ? { zIndex: 60 } : undefined}>
      <div ref={canvasFrameRef} className={styles.canvasFrame} data-paper-frame="">
      <canvas ref={canvasRef} data-paper-canvas="" className={styles.canvas} style={{ visibility: canvasVisible && entrance !== 'pending' ? 'visible' : 'hidden', opacity: phase === 'handoff' ? 0 : 1, transitionDuration: phase === 'handoff' ? '140ms' : '450ms' }} />
      </div>
    </div>, portalHost)}
    {phase === 'loading' && <picture className={styles.preview}>
      <source media="(max-width: 767px)" srcSet={`/images/contact-paper/${locale}-mobile-v2.webp`} />
      <img ref={previewRef} src={`/images/contact-paper/${locale}-desktop-v2.webp`} alt="" loading="eager" decoding="async" draggable={false} />
    </picture>}
    <span ref={ballAnchor} aria-hidden="true" style={{ position: 'absolute', top: 100, left: '50%', width: 1, height: 1, pointerEvents: 'none' }} />
    {(phase === 'loading' || phase === 'ball') && <button ref={openButtonRef} type="button" className={styles.open}
      onPointerEnter={event => { if (event.pointerType === 'mouse') hover.current(event.clientX, event.clientY) }}
      onClick={event => opener.current(event.detail === 0)} aria-label={text.open} />}
    <span className="sr-only" role="status" aria-live="polite">{successShown ? `${successTitle} ${successText} ${SUCCESS_NOTE[locale]}` : ['moving','opening','holding','returning'].includes(phase) ? text.opening : phase === 'crumpling' ? text.closing : waiting ? text.preparing : ''}</span>
    {waiting && phase === 'loading' && <p className={styles.preparing} aria-hidden="true">{text.preparing}</p>}
    {portalHost && ['crumpling','thanking','success','success-closing','flying-back','contacts-drop'].includes(phase) && createPortal(<div ref={successRef} data-paper-success="" aria-hidden="true" className={styles.successDocument}
      style={successFallback && successShown ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', visibility: 'visible' } : undefined}>
      <picture><source media="(max-width: 767px)" srcSet="/images/contact-form-parchment-mobile.webp" /><img className={styles.successPaper} src="/images/contact-form-parchment.webp" alt="" /></picture>
      <img className={styles.check} src="/images/check-glossy-v1.webp" alt="" width={64} height={64} draggable={false} />
      <h2>{successTitle}</h2><p>{successText}</p><p className={styles.note}>{SUCCESS_NOTE[locale]}</p>
    </div>, portalHost)}
    {portalHost && successShown && createPortal(<button ref={successButtonRef} data-paper-dismiss="" type="button" className={styles.successDismiss} onClick={dismiss} aria-label={CLOSE_LABEL[locale]} />, portalHost)}
    <noscript><style>{`[data-paper-phase] > div:first-child { visibility: visible !important; opacity: 1 !important; } [data-paper-phase] > button, [data-paper-phase] > picture { display: none !important; }`}</style></noscript>
  </div>
})
