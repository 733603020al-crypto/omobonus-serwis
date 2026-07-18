'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Next.js's built-in scroll reset on navigation is unreliable when the destination
// page's content height changes after the initial paint (e.g. due to next/dynamic
// chunks resolving), especially when navigating from a scrolled-down position.
// This forces every route change to land at the top of the page.
export function ScrollToTop() {
    const pathname = usePathname()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
