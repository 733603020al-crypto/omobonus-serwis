'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import manifest from '@/config/manifest'

interface StatItem {
  num: string
  pre?: string
  unit: string
  label: string
}

export interface ONasHeroT {
  h1Line1: string
  h1Line2: string
  sub: string
  stats: readonly StatItem[]
}

const PL: ONasHeroT = {
  h1Line1: 'Nie bogacimy się na',
  h1Line2: 'Twoim problemie',
  sub: 'Od ponad 10 lat naprawiamy komputery, laptopy i drukarki we Wrocławiu',
  stats: [
    { num: '10', unit: '+', label: 'lat doświadczenia' },
    { num: '2', pre: 'do', unit: 'h', label: 'przyjazd we Wrocławiu' },
    { num: '15', unit: 'min', label: 'wstępna diagnoza' },
    { num: '48', pre: 'do', unit: 'h', label: 'większość napraw' },
  ],
}

export function ONasHero({ t }: { t?: ONasHeroT } = {}) {
  const d = t ?? PL
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = subRef.current
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

  return (
    <section className="relative min-h-[calc(100svh-65px)] flex items-center justify-center overflow-hidden">
      <Image
        src={manifest.omobonus_hero}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center z-0"
      />
      <div className="absolute inset-0 z-[1] bg-black/50" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-[60px] font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px] mx-auto mb-[30px]">
          {d.h1Line1} <br /> {d.h1Line2}
        </h1>
        <p
          ref={subRef}
          className="fade-slide-init font-cormorant italic font-normal text-[#cbb27c] leading-[1.55] max-w-[60ch] mx-auto mb-10 md:whitespace-nowrap md:max-w-none"
          style={{ fontSize: 'clamp(18px,2.1vw,24px)' }}
        >
          {d.sub}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.stats.map((s, i) => (
            <div
              key={i}
              className="services-card-bg border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] rounded-[10px] overflow-hidden py-8 px-5 text-center transition-transform duration-[180ms] hover:-translate-y-1"
            >
              <div className="font-cormorant font-bold text-[#e6cc82] leading-none mb-1">
                {s.pre && (
                  <span className="text-[hsl(45_50%_70%)] text-lg mr-1 font-normal">{s.pre}</span>
                )}
                <span style={{ fontSize: 'clamp(40px,5vw,60px)' }}>{s.num}</span>
                <small className="text-xl">{s.unit}</small>
              </div>
              <div className="text-base text-[hsl(45_18%_82%)] font-inter mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
