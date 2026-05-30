'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function FadeSlideText({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('fade-slide-init')
          el.classList.add('fade-slide-animate')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <p ref={ref} className={cn('fade-slide-init', className)}>
      {children}
    </p>
  )
}
