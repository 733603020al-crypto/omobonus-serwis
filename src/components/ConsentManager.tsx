'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        gtag: (...args: any[]) => void
    }
}

type ConsentValue = 'granted' | 'denied'

// CookieYes sends { accepted: string[], rejected: string[] } with category slugs.
// We pass the choice to Google Consent Mode for all categories. CookieYes sends
// the same update itself; this keeps the signal correct even if that changes.
export function ConsentManager() {
    useEffect(() => {
        const handleConsent = (event: Event) => {
            const accepted = (event as CustomEvent<{ accepted?: unknown }>).detail?.accepted
            if (!Array.isArray(accepted) || typeof window.gtag !== 'function') return
            const state = (slug: string): ConsentValue => (accepted.includes(slug) ? 'granted' : 'denied')
            const ads = state('advertisement')
            const functional = state('functional')
            window.gtag('consent', 'update', {
                ad_storage: ads,
                ad_user_data: ads,
                ad_personalization: ads,
                analytics_storage: state('analytics'),
                functionality_storage: functional,
                personalization_storage: functional,
                security_storage: 'granted',
            })
        }

        document.addEventListener('cookieyes_consent_update', handleConsent)
        return () => document.removeEventListener('cookieyes_consent_update', handleConsent)
    }, [])

    return null
}
