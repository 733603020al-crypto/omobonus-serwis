'use client'

import { useEffect, useState } from 'react'

export function GoogleRatingBadge() {
  const [rating, setRating] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/google-reviews')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.rating === 'number') setRating(data.rating)
      })
      .finally(() => setLoading(false))
  }, [])

  // Ten sam charakter wizualny co przycisk "Wyślij zgłoszenie" (CallButton secondary):
  // rounded-full, border-[#bfa76a]/80, text-[#bfa76a] — tylko mniejszy i z przyciemnionym, półprzezroczystym tłem
  const badgeShell =
    'inline-flex items-center gap-1.5 rounded-full border border-[#bfa76a]/80 bg-black/45 px-3.5 py-1.5 backdrop-blur-[2px]'

  if (loading) {
    return (
      <div className={`${badgeShell} animate-pulse`} aria-hidden="true">
        <div className="h-[16px] w-[16px] rounded-full bg-white/10" />
        <div className="h-[12px] w-[70px] rounded-full bg-white/10" />
      </div>
    )
  }

  if (rating === null) return null

  return (
    <div className={badgeShell}>
      <svg width="16" height="16" viewBox="0 0 48 48" className="shrink-0">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.36 1.46 8.28 3.27l6.15-6.15C34.66 3.07 29.7 1 24 1 14.61 1 6.51 6.62 2.56 14.8l7.32 5.68C11.5 14.17 17.27 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.97-2.19 5.49-4.66 7.18l7.21 5.6c4.22-3.89 6.65-9.61 6.65-17.07z" />
        <path fill="#FBBC05" d="M9.88 28.48c-.5-1.48-.78-3.06-.78-4.68s.28-3.2.78-4.68l-7.32-5.68C.92 16.54 0 20.13 0 23.8c0 3.67.92 7.26 2.56 10.36l7.32-5.68z" />
        <path fill="#34A853" d="M24 46c5.7 0 10.66-1.88 14.21-5.11l-7.21-5.6c-2 1.35-4.56 2.15-7 2.15-6.73 0-12.5-4.67-14.12-10.98l-7.32 5.68C6.51 41.38 14.61 46 24 46z" />
      </svg>

      <span className="font-sans text-[14px] font-semibold text-[#bfa76a]">
        {rating.toFixed(1)}
      </span>

      <span className="flex gap-[1px] text-[12px] leading-none tracking-tight text-[#f3df9a]">
        {'★★★★★'}
      </span>
    </div>
  )
}
