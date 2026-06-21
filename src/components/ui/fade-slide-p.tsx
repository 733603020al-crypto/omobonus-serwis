'use client'

import { useRef, useEffect } from 'react'

export function FadeSlideP({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove('fade-slide-init')
        el.classList.add('fade-slide-animate')
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return <p ref={ref} className={`fade-slide-init ${className ?? ''}`}>{children}</p>
}
