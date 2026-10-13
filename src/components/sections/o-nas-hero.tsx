import { getImageProps } from 'next/image'
import { HeroTrust, type HeroT } from '@/components/sections/hero'

export interface ONasHeroT {
  h1Line1: string
  h1Line2: string
}

const PL: ONasHeroT = {
  h1Line1: 'Nie bogacimy się na',
  h1Line2: 'Twoim problemie',
}

const heroCommon = { alt: '', fill: true, sizes: '100vw', priority: true } as const
const { props: { srcSet: heroDesktopSrcSet } } = getImageProps({ ...heroCommon, src: '/images/omobonus-hero-desktop.webp', quality: 32 })
const { props: heroMobileProps } = getImageProps({ ...heroCommon, src: '/images/omobonus-hero-mobile.webp', quality: 60 })

export function ONasHero({ t, heroT, locale = 'pl' }: { t?: ONasHeroT; heroT?: HeroT; locale?: 'pl' | 'uk' | 'ru' } = {}) {
  const d = t ?? PL

  return (
    <section className="relative min-h-[calc(100svh-65px)] flex items-center justify-center">
      {/* To samo tło co na stronie głównej (hero.tsx): od 768px ostra wersja
          1920px, na telefonie plik mobilny. Przedłużone w dół i rozpuszczone
          jak na głównej; od 1024px znika na wysokości „Skąd nazwa” (onas-bg-fade). */}
      <div className="absolute inset-x-0 top-0 overflow-visible hero-bg-fade onas-bg-fade">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img {...heroMobileProps} fetchPriority="high" className="object-cover object-center" />
        </picture>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <h1
          className="font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px] mx-auto text-[clamp(32px,10.5vw,40px)] md:text-[52px]"
        >
          {d.h1Line1} <br /> {d.h1Line2}
        </h1>
        {/* Ten sam blok co pod H1 na stronie głównej */}
        <div className="flex flex-col items-center">
          <HeroTrust t={heroT} locale={locale} animatedBadge />
        </div>
      </div>
    </section>
  )
}
