'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        gtag: (...args: any[]) => void
    }
}

export function ConsentManager() {
    useEffect(() => {
        // Listen for CookieYes consent changes to update GTM Consent Mode
        const handleConsent = (event: any) => {
            const consent = event.detail
            if (typeof window.gtag === 'function' && consent) {
                window.gtag('consent', 'update', {
                    ad_storage: consent.advertising === 'yes' ? 'granted' : 'denied',
                    analytics_storage: consent.analytics === 'yes' ? 'granted' : 'denied',
                    personalization_storage: consent.personalization === 'yes' ? 'granted' : 'denied',
                    functionality_storage: consent.functional === 'yes' ? 'granted' : 'denied',
                })
            }
        }

        document.addEventListener('cookieyes_consent_update', handleConsent)
        return () => document.removeEventListener('cookieyes_consent_update', handleConsent)
    }, [])

    return null
}
