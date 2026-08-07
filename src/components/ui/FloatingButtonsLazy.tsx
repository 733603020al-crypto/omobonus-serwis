'use client'

import dynamic from 'next/dynamic'

export const MobileActionBar = dynamic(
  () => import('./MobileActionBar').then(m => ({ default: m.MobileActionBar })),
  { ssr: false }
)
