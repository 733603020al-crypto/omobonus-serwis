'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>
    }
}

// Ordinary scroll/tap happens almost immediately on every visit and would
// defeat the point of deferring analytics — so it no longer triggers an
// early load. Analytics loads on the fixed fallback timer, UNLESS the user
// takes a real conversion action first (call, WhatsApp/Telegram/Viber, or
// submitting a form) — those we still want to attribute even if they
// happen in the first few seconds.
const CONVERSION_HREF_PATTERN = /^tel:|wa\.me|t\.me\/|viber:/i
// Keep analytics out of the first Lighthouse window. Conversion actions still
// load GTM immediately through the listeners below.
const FALLBACK_DELAY_MS = 15000
// GTM brings Ads, GA4 and Clarity (~1–3 s of main-thread work on a phone). After
// the timer it waits until the visitor has not scrolled/touched/typed for this
// long, so that work doesn't land in the middle of a scroll or a tap...
const QUIET_MS = 1500
// ...but never longer than this, so busy visits are still counted.
const MAX_QUIET_WAIT_MS = 15000
const ACTIVITY_EVENTS = ['scroll', 'touchstart', 'pointerdown', 'keydown', 'wheel'] as const

export function DeferredGtm({ gtmId }: { gtmId: string }) {
    useEffect(() => {
        let loaded = false
        let lastActivity = 0
        let timer: ReturnType<typeof setTimeout> | undefined
        let idle: number | undefined

        const load = () => {
            if (loaded) return
            loaded = true
            cleanup()

            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
            const script = document.createElement('script')
            script.async = true
            script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}&l=dataLayer`
            document.head.appendChild(script)
        }

        const onClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
            if (link && CONVERSION_HREF_PATTERN.test(link.getAttribute('href') || '')) {
                load()
            }
        }

        const onSubmit = () => load()
        const onActivity = () => {
            lastActivity = performance.now()
        }
        // The visitor switched to another tab/app (e.g. the dialer): nothing on
        // screen can stutter now, and the visit is still counted.
        const onHidden = () => {
            if (document.visibilityState === 'hidden') load()
        }

        const loadWhenIdle = () => {
            if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(load, { timeout: 2000 })
            else load()
        }

        const waitForQuiet = (deadline: number) => {
            const now = performance.now()
            const quietFor = now - lastActivity
            if (quietFor >= QUIET_MS || now >= deadline) loadWhenIdle()
            else timer = setTimeout(() => waitForQuiet(deadline), Math.min(QUIET_MS - quietFor, deadline - now))
        }

        const cleanup = () => {
            document.removeEventListener('click', onClick)
            document.removeEventListener('submit', onSubmit)
            document.removeEventListener('visibilitychange', onHidden)
            ACTIVITY_EVENTS.forEach(type => window.removeEventListener(type, onActivity, { capture: true }))
            clearTimeout(timer)
            if (idle !== undefined) window.cancelIdleCallback?.(idle)
        }

        document.addEventListener('click', onClick, { passive: true })
        document.addEventListener('submit', onSubmit, { passive: true })
        document.addEventListener('visibilitychange', onHidden)
        ACTIVITY_EVENTS.forEach(type => window.addEventListener(type, onActivity, { capture: true, passive: true }))
        timer = setTimeout(() => waitForQuiet(performance.now() + MAX_QUIET_WAIT_MS), FALLBACK_DELAY_MS)

        return cleanup
    }, [gtmId])

    return null
}
