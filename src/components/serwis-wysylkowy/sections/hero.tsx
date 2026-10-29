import type { ReactNode } from 'react'
import { getImageProps } from 'next/image'
import { HomeHeroShowcase, type HeroMid } from '@/components/serwis-wysylkowy/sections/home-hero-showcase'

export interface HeroT {
  h1Line1: string
  h1Line2: string
  h1Line3: string
  mobileH1: string
  mobileH1Line1?: string
  mobileH1Line2?: string
  mobileH1Line3?: string
  callMobile: string
  callDesktop: string
  submitForm: string
  googleReviewsAriaLabel?: string
  /** Visual H1 of the home carousel: fixed first/last line, middle line
      follows the active slide. The SEO H1 text above stays unchanged. */
  carouselLine1?: string
  carouselLine3?: ReactNode
  carouselMids?: readonly HeroMid[]
  carouselAlt?: string
}

const CAROUSEL_PL = {
  line1: 'Serwis wysyłkowy',
  line3: <>Odbierzemy sprzęt kurierem<br />z całej Polski</>,
  alt: 'Serwis laptopów, komputerów i drukarek we Wrocławiu',
  mids: [
    { group: 'laptop', parts: ['laptopów', ''] },
    { group: 'pc', parts: ['komputerów', 'stacjonarnych'] },
    { group: 'printer', parts: ['drukarek', 'laserowych'] },
    { group: 'printer', parts: ['drukarek', 'atramentowych'] },
    { group: 'printer', parts: ['drukarek', 'igłowych'] },
    { group: 'printer', parts: ['drukarek', 'etykiet'] },
    { group: 'printer', parts: ['drukarek', '3D'] },
    { group: 'plotter', parts: ['ploterów', ''] },
    { group: 'printer', parts: ['drukarek', 'do kart plastikowych'] },
    { group: 'shredder', parts: ['niszczarek', ''] },
    { group: 'ups', parts: ['zasilaczy', 'awaryjnych UPS'] },
  ] as readonly HeroMid[],
}

const ORDERED_CAROUSEL_MIDS: readonly HeroMid[] = [
  { group: 'laptop', parts: ['laptop\u00F3w', ''] },
  { group: 'pc', parts: ['komputer\u00F3w', 'stacjonarnych'] },
  { group: 'printer', parts: ['drukarek', 'laserowych'] },
  { group: 'printer', parts: ['drukarek', 'atramentowych'] },
  { group: 'printer', parts: ['drukarek', 'igłowych'] },
  { group: 'printer', parts: ['drukarek', 'etykiet'] },
  { group: 'printer', parts: ['drukarek', '3D'] },
  { group: 'printer', parts: ['drukarek', 'sublimacyjnych'] },
  { group: 'printer', parts: ['drukarek', 'DTF'] },
  { group: 'printer', parts: ['drukarek', 'DTG'] },
  { group: 'printer', parts: ['drukarek', 'spo\u017Cywczych'] },
  { group: 'printer', parts: ['drukarek', 'do kart plastikowych'] },
  { group: 'shredder', parts: ['niszczarek', ''] },
  { group: 'ups', parts: ['zasilaczy', 'awaryjnych UPS'] },
  { group: 'projector', parts: ['projektor\u00F3w', ''] },
  { group: 'coffee', parts: ['ekspres\u00F3w', 'do kawy'] },
]

const PL: HeroT = {
  h1Line1: 'Serwis komputerów,',
  h1Line2: 'laptopów, drukarek i urządzeń biurowych',
  h1Line3: 'we Wrocławiu',
  mobileH1: 'Serwis komputerów, laptopów i drukarek we Wrocławiu',
  mobileH1Line1: 'Serwis komputerów,',
  mobileH1Line2: 'laptopów i drukarek',
  mobileH1Line3: 'we Wrocławiu',
  callMobile: 'Zadzwoń teraz',
  callDesktop: '793 759 262',
  submitForm: 'Wyślij zgłoszenie',
}

const heroCommon = { alt: 'Omobonus serwis', fill: true, sizes: '100vw', priority: true } as const
const { props: { srcSet: heroDesktopSrcSet } } = getImageProps({ ...heroCommon, src: '/images/omobonus-hero-desktop.webp', quality: 32 })
const { props: heroMobileProps } = getImageProps({ ...heroCommon, src: '/images/omobonus-hero-mobile.webp', quality: 60 })

export function Hero({ children, t, locale = 'pl', cta }: { children?: ReactNode; t?: HeroT; locale?: 'pl' | 'uk' | 'ru' | 'en'; cta?: { label: ReactNode; href: string } } = {}) {
  const d = t ?? PL

  return (
    <section
      className="
        relative
        min-h-[calc(100svh-149px)]
        md:min-h-[calc(100svh-65px)]
        flex
        items-center
        justify-center
      "
    >
      {/* Tło — przedłużone w dół pod sekcję i zamaskowane do przezroczystości,
          żeby to samo zdjęcie (ten sam plik, crop, object-position) płynnie
          rozpuszczało się w tle drugiej sekcji, znikając dokładnie na wysokości
          dolnej krawędzi pierwszego rzędu kart usług, a od 1024px — poniżej przycisku
          „Zobacz wszystkie usługi” (per-breakpoint w hero-bg-fade). */}
      <div className="absolute inset-x-0 top-0 overflow-visible hero-bg-fade">
        {/* Telefon (<768px) — bez zmian (640px, q60). Od 768px — ten sam kadr
            (te same proporcje 2:3, object-cover/center), powiększony AI do 1920px;
            ostry jest tylko pas widoczny na ekranach poziomych, reszta jak dawniej. */}
        <picture>
          <source media="(min-width: 768px)" srcSet={heroDesktopSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            {...heroMobileProps}
            decoding="sync"
            fetchPriority="high"
            className="object-cover object-center"
          />
        </picture>
        {/* Затемнение */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Zawartość */}
      <div className="relative z-10 w-full pt-[24px] pb-[90px] md:pt-0 md:pb-[110px]">
        <HomeHeroShowcase
          h1={`${d.h1Line1} ${d.h1Line2} ${d.h1Line3}`}
          line1={d.carouselLine1 ?? CAROUSEL_PL.line1}
          line3={d.carouselLine3 ?? CAROUSEL_PL.line3}
          mids={d.carouselMids ?? ORDERED_CAROUSEL_MIDS}
          alt={d.carouselAlt ?? CAROUSEL_PL.alt}
          basePath={locale === 'pl' ? '/uslugi' : `/${locale}/uslugi`}
          cta={cta}
        />
      </div>
      {children}
    </section>
  )
}
