'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { DEFAULT_COFFEE_ITEMS } from '@/components/ui/coffee-pour-items'

const CoffeePourMenu = dynamic(() => import('@/components/ui/coffee-pour-menu'), { ssr: false })

type Locale = 'pl' | 'uk' | 'ru' | 'en'

const TEXT: Record<Locale, { label: string }> = {
  pl: { label: 'Menu kawy' },
  uk: { label: 'Меню кави' },
  ru: { label: 'Меню кофе' },
  en: { label: 'Coffee menu' },
}

// Original animation by Aakash Mehra, loaded only when the section nears the viewport.
export function CoffeePourSection({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const t = TEXT[locale]
  const items = DEFAULT_COFFEE_ITEMS.map((it) => ({ ...it, subtitle: undefined }))

  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-4 pb-6 md:pb-10">
      <div ref={ref} className="min-h-[194px] md:min-h-[254px]">
        {near && <CoffeePourMenu items={items} ariaLabel={t.label} autoplayMs={6000} />}
      </div>
    </section>
  )
}
