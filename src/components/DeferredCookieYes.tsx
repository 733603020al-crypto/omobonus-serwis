'use client'

import { useEffect } from 'react'

// CookieYes brings its own script (~235 ms of main-thread work on a phone) plus
// ~8 requests. Consent Mode already defaults everything to "denied" and GTM
// waits for consent, so the banner may appear a little later: after the page
// has loaded and gone quiet, or immediately on the first real interaction.
const DELAY_AFTER_LOAD_MS = 3500
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const

export function DeferredCookieYes({ src }: { src: string }) {
    useEffect(() => {
        let loaded = false
        let timer: ReturnType<typeof setTimeout> | undefined

        const cleanup = () => {
            INTERACTION_EVENTS.forEach(type => window.removeEventListener(type, load, { capture: true }))
            window.removeEventListener('load', onLoad)
            clearTimeout(timer)
        }

        function load() {
            if (loaded) return
            loaded = true
            cleanup()
            const script = document.createElement('script')
            script.id = 'cookieyes'
            script.src = src
            script.async = true
            document.head.appendChild(script)
        }

        function onLoad() {
            timer = setTimeout(load, DELAY_AFTER_LOAD_MS)
        }

        INTERACTION_EVENTS.forEach(type => window.addEventListener(type, load, { capture: true, passive: true }))
        if (document.readyState === 'complete') onLoad()
        else window.addEventListener('load', onLoad)

        return cleanup
    }, [src])

    return null
}
