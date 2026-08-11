'use client'

import { useRef, useEffect } from 'react'

// Same scroll-into-view -> fade-slide-animate toggle used by FadeSlideP and
// the Divider in contact-actions.tsx, so .brush-divider-row .divider-line-*
// picks up the same brushUnderline/brushUnderlineLoop light-sweep animation.
export function BrushDividerRow({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('fade-slide-animate')
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`brush-divider-row ${className ?? ''}`}>
      {children}
    </div>
  )
}
