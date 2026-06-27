'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import manifest from '@/config/manifest'
import GoogleReviews from '@/components/google-reviews'

export interface AboutT {
  eyebrow?: string
  heading: string
  subheading: string
  ourCompany: string
  description: readonly string[]
  quote: string
  quoteSubtitle: string
  moreAboutLink?: string
  moreAboutHref?: string
  // legacy fields — kept for type-compat with existing translations
  kdkText?: string
  whyUs?: string
  checklist?: readonly string[]
}

const PL: AboutT = {
  eyebrow: 'Skąd nazwa',
  heading: 'Święty Omobonus XII wieku',
  subheading: '(łac. „Homobonus" — Dobry człowiek). Patron biznesmenów i przemysłowców. Był uczciwym rzemieślnikiem, który część swoich dochodów przekazywał potrzebującym.',
  ourCompany: 'O nas:',
  description: [
    'Jesteśmy zespołem, który wierzy, że praca może być również pomocą i służbą innym ludziom. Zysk jest potrzebny, ale nie jest naszym idolem ani bożkiem. Nie chcemy się bogacić za wszelką cenę.',
  ],
  quote: 'Brak oszustwa i szacunek do klienta',
  quoteSubtitle: 'to nasze podstawowe zasady pracy',
  moreAboutLink: 'Więcej o nas',
  moreAboutHref: '/o-nas',
}

export function About({
  t,
  bare = false,
  showReviews = true,
  compact = false,
  showMoreLink = false,
}: {
  t?: AboutT
  bare?: boolean
  showReviews?: boolean
  compact?: boolean
  showMoreLink?: boolean
} = {}) {
  const d = t ?? PL
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const mobileEyebrowRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (const ref of [eyebrowRef, mobileEyebrowRef]) {
      const el = ref.current
      if (!el) continue
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('fade-slide-init')
          el.classList.add('fade-slide-animate')
          observer.disconnect()
        }
      }, { threshold: 0.1 })
      observer.observe(el)
      observers.push(observer)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])
  return (
    <section
      id="o-nas"
      className={`relative ${bare ? 'pt-10 md:pt-16' : 'py-16 md:py-24'}`}
    >
      {!bare && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${manifest.Background_1}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Mobile-only: logiczna kolejność treści */}
        <div className="md:hidden text-white space-y-6">
          {d.eyebrow && (
            <p ref={mobileEyebrowRef} className="fade-slide-init brush-underline text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] text-center">
              {d.eyebrow}
            </p>
          )}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-tight text-[#bfa76a]">
              {d.heading}
            </h2>
            <p className="font-serif text-base md:text-lg font-normal italic leading-relaxed text-[#bfa76a]">
              {d.subheading}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-2xl max-w-sm w-full">
              <Image
                src={manifest.omobonus_hero}
                alt="Święty Omobonus"
                width={400}
                height={500}
                sizes="(max-width: 768px) 85vw, 400px"
                className="object-contain rounded-lg w-full h-auto"
                quality={60}
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-cormorant font-bold leading-tight mb-2 text-white">
              {d.ourCompany}
            </h3>
            <p className="text-base font-serif text-[rgba(255,255,245,0.85)] leading-relaxed">
              {d.description[0]}
            </p>
          </div>
          <div className="border-l-2 border-[#bfa76a]/70 pl-5 space-y-1.5">
            <p className="text-xl md:text-2xl font-serif font-semibold text-white">
              &ldquo;{d.quote}&rdquo;
            </p>
            <p className="text-base md:text-lg font-serif font-normal italic text-[#bfa76a]">
              {d.quoteSubtitle}
            </p>
          </div>
          {showMoreLink && (
            <div className="flex justify-center">
              <Link
                href={d.moreAboutHref ?? '/o-nas'}
                className="inline-flex items-center justify-center gap-1 min-w-[200px] rounded-full px-8 py-[16px] font-cormorant font-semibold text-[20px] transition-all duration-300 ease-out backdrop-blur-[2px] text-[#bfa76a] border border-[#bfa76a]/80 bg-[#bfa76a]/10 shadow-[0_0_20px_rgba(191,167,106,0.35)] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
              >
                {d.moreAboutLink ?? 'Więcej o nas'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Desktop: istniejący układ bez zmian */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-16 items-center">
          {/* Portrait */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-2xl max-w-sm w-full">
              <Image
                src={manifest.omobonus_hero}
                alt="Święty Omobonus"
                width={400}
                height={500}
                sizes="(max-width: 768px) 85vw, 400px"
                className="object-contain rounded-lg w-full h-auto"
                quality={60}
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-white space-y-6">
            {d.eyebrow && (
              <p ref={eyebrowRef} className="fade-slide-init brush-underline text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a]">
                {d.eyebrow}
              </p>
            )}
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-tight text-[#bfa76a]">
                {d.heading}
              </h2>
              <p className="font-serif text-base md:text-lg font-normal italic leading-relaxed text-[#bfa76a]">
                {d.subheading}
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-cormorant font-bold leading-tight mb-2 text-white">
                {d.ourCompany}
              </h3>
              <p className="text-base md:text-lg font-serif text-[rgba(255,255,245,0.85)] leading-relaxed">
                {d.description[0]}
              </p>
            </div>
            <div className="border-l-2 border-[#bfa76a]/70 pl-5 space-y-1.5">
              <p className="text-xl md:text-2xl font-serif font-semibold text-white">
                &ldquo;{d.quote}&rdquo;
              </p>
              <p className="text-base md:text-lg font-serif font-normal italic text-[#bfa76a]">
                {d.quoteSubtitle}
              </p>
            </div>
            {showMoreLink && (
              <div className="pl-5 mt-6">
                <Link
                  href={d.moreAboutHref ?? '/o-nas'}
                  className="inline-flex items-center justify-center gap-1 min-w-[200px] rounded-full px-8 py-[16px] md:py-[12px] font-cormorant font-semibold text-[20px] transition-all duration-300 ease-out backdrop-blur-[2px] text-[#bfa76a] border border-[#bfa76a]/80 bg-[#bfa76a]/10 shadow-[0_0_20px_rgba(191,167,106,0.35)] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
                >
                  {d.moreAboutLink ?? 'Więcej o nas'}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>

      {showReviews && (
        <div className="mt-12">
          <GoogleReviews />
        </div>
      )}
    </section>
  )
}
