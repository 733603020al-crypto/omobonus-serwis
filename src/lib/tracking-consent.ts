// CookieYes keeps the visitor's choice in the "cookieyes-consent" cookie, e.g.
// "consentid:…,consent:yes,action:yes,necessary:yes,functional:no,analytics:yes,advertisement:no".
export function readCookieYesConsent(): string {
    if (typeof document === 'undefined') return ''
    const match = document.cookie.match(/(?:^|;\s*)cookieyes-consent=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : ''
}

// True when the visitor allowed analytics or advertising cookies — only then
// Google Tag Manager is loaded and conversion events are queued for it.
export function hasTrackingConsent(): boolean {
    return /(?:^|,)(analytics|advertisement):yes/.test(readCookieYesConsent())
}
