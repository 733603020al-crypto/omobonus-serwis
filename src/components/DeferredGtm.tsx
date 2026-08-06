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
const FALLBACK_DELAY_MS = 7000

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

        const onClick = (e: MouseEvent) => {
            const link = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
            if (link && CONVERSION_HREF_PATTERN.test(link.getAttribute('href') || '')) {
                load()
            }
        }

        const onSubmit = () => load()

        const cleanup = () => {
            document.removeEventListener('click', onClick)
            document.removeEventListener('submit', onSubmit)
            clearTimeout(timer)
        }

        document.addEventListener('click', onClick, { passive: true })
        document.addEventListener('submit', onSubmit, { passive: true })
        const timer = setTimeout(load, FALLBACK_DELAY_MS)

        return cleanup
    }, [gtmId])

    return null
}
