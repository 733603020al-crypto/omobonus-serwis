'use client'

import dynamic from 'next/dynamic'

// Not SEO content (text is fetched client-side from an API route either way),
// deferred with ssr:false to keep its hydration off the critical path. Loading
// fallback matches its real height to avoid a layout shift when the chunk swaps in.
const GoogleReviews = dynamic(() => import('./google-reviews'), {
  ssr: false,
  loading: () => <div className="relative w-full mt-[2px] md:mt-0 py-0 h-[420px] md:h-[320px]" />,
})

export default GoogleReviews
