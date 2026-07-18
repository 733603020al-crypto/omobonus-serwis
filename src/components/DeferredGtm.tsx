'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>
    }
}

const TRIGGER_EVENTS = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const
const FALLBACK_DELAY_MS = 4000

export function DeferredGtm({ gtmId }: { gtmId: string }) {
    useEffect(() => {
        let loaded = false

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

        const cleanup = () => {
            TRIGGER_EVENTS.forEach(evt => window.removeEventListener(evt, load))
            clearTimeout(timer)
        }

        TRIGGER_EVENTS.forEach(evt => window.addEventListener(evt, load, { passive: true, once: true }))
        const timer = setTimeout(load, FALLBACK_DELAY_MS)

        return cleanup
    }, [gtmId])

    return null
}
