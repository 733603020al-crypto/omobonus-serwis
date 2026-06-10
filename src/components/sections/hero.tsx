'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { GoogleRatingBadge } from '@/components/ui/google-rating-badge'

const HERO_STATS = [
  { num: '10', unit: '+', label: 'lat doświadczenia' },
  { num: '2', pre: 'do', unit: 'h', label: 'przyjazd' },
  { num: '15', unit: 'min', label: 'wstępna diagnoza' },
  { num: '12', pre: 'do', unit: ' mies.', label: 'gwarancja' },
] as const

interface HeroT {
  h1Line1: string
  h1Line2: string
  h1Line3: string
  tagline: string
  callMobile: string
  callDesktop: string
  submitForm: string
}

const PL: HeroT = {
  h1Line1: 'Profesjonalny serwis',
  h1Line2: 'komputerów, laptopów i drukarek',
  h1Line3: 'we Wrocławiu',
  tagline: '"Uczciwość i szacunek do klienta" – to nasze podstawowe zasady pracy',
  callMobile: 'Zadzwoń teraz',
  callDesktop: '793 759 262',
  submitForm: 'Wyślij zgłoszenie',
}

export function Hero({ children, t }: { children?: React.ReactNode; t?: HeroT } = {}) {
  const d = t ?? PL
  const taglineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = taglineRef.current
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
    <section
      className="
        relative
        min-h-[calc(100svh-65px)]
        flex
        items-center
        justify-center
      "
    >
      {/* Tło */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/omobonus-hero-mobile.webp"
          alt="Omobonus serwis"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Zawartość */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center flex flex-col items-center pb-[90px] md:pb-[110px]">

        <h1 className="hidden md:block text-[60px] font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px]">
          {d.h1Line1} <br /> {d.h1Line2} <br /> {d.h1Line3}
        </h1>
        <h1 className="md:hidden text-[28px] font-cormorant font-bold leading-[1.2] text-[#ffffff] max-w-[320px]">
          Serwis komputerów, laptopów i drukarek we Wrocławiu
        </h1>

        <p ref={taglineRef} className="fade-slide-init mt-[24px] text-[22px] font-cormorant leading-tight text-[#bfa76a] italic font-semibold drop-shadow-2xl">
          {d.tagline}
        </p>

        {/* Trust block: badge po lewej, 2x2 stat cards po prawej (desktop) */}
        <div className="flex gap-3 items-center mt-[16px] justify-center">
          <GoogleRatingBadge className="w-[222px] h-[103px]" />

          <div className="hidden md:grid grid-cols-2 gap-3 w-[260px]">
            {HERO_STATS.map((s, i) => (
              <div
                key={i}
                className="bg-[#bfa76a]/10 backdrop-blur-[2px] border-2 border-[#bfa76a]/80 shadow-[0_0_20px_rgba(191,167,106,0.35)] rounded-lg py-3 px-3 text-center transition-all duration-[180ms] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
              >
                <div className="font-cormorant font-bold text-[#e6cc82] leading-none">
                  {'pre' in s && (
                    <span className="text-[hsl(45_50%_70%)] text-[11px] mr-0.5 font-normal">{s.pre}</span>
                  )}
                  <span className="text-[32px]">{s.num}</span>
                  <small className="text-[17px]">{s.unit}</small>
                </div>
                <div className="text-[11px] text-[hsl(45_18%_82%)] font-inter mt-1 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {children}
    </section>
  )
}
