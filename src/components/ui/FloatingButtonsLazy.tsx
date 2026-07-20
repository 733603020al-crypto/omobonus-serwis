'use client'

import dynamic from 'next/dynamic'

export const FloatingCallButton = dynamic(
  () => import('./FloatingCallButton').then(m => ({ default: m.FloatingCallButton })),
  { ssr: false }
)

export const FloatingContactButton = dynamic(
  () => import('./FloatingContactButton').then(m => ({ default: m.FloatingContactButton })),
  { ssr: false }
)
