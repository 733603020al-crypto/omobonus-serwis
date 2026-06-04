'use client'

import { useRef, useEffect } from 'react'

export function BrandSectionCaption({ text }: { text: string }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textEl = textRef.current
    const lineEl = lineRef.current
    if (!textEl) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        textEl.classList.remove('fade-slide-init')
        textEl.classList.add('fade-slide-animate')
        if (lineEl) {
          setTimeout(() => {
            lineEl.classList.add('brand-intro-line-active')
          }, 1350)
        }
        observer.disconnect()
      }
    }, { threshold: 0.1 })

    observer.observe(textEl)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <p
        ref={textRef}
        className="fade-slide-init font-cormorant italic text-[#cbb27c] text-[22px] md:text-[24px] leading-[1.35]"
      >
        {text}
      </p>
      <div ref={lineRef} className="brand-intro-line-base mt-2" />
    </>
  )
}
