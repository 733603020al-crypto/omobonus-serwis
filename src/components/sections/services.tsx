import Link from 'next/link'
import { FadeSlideP } from '@/components/ui/fade-slide-p'
import Image from 'next/image'
import { services as defaultServices } from '@/lib/services-data'
import type { ServiceData } from '@/lib/services-data'
import manifest from '@/config/KANONICZNY_MANIFEST.json'

// Written out as literal strings (not built via template interpolation) so
// Tailwind's static content scanner can actually find them — a class name
// assembled as `zakres-orient-${x}` is invisible to that scanner and the
// whole custom @layer utilities rule gets silently purged from the CSS
// build even though the DOM ends up with the right class name.
const ORIENT_CLASSES = [
  'zakres-orient-normal',
  'zakres-orient-flipx',
  'zakres-orient-flipy',
  'zakres-orient-rotate180',
]
const MICRO_CLASSES = [
  'zakres-micro-a',
  'zakres-micro-b',
  'zakres-micro-c',
  'zakres-micro-d',
  'zakres-micro-e',
]
// Fixed (non-random) orientation+micro assignment for the 10 cards, indexed
// by position in the 3-column grid (0,1,2 / 3,4,5 / 6,7,8 / 9). No two
// horizontally-adjacent cards share an orientation, and no (orientation,
// micro) pair repeats anywhere in the block.
const CARD_STYLE: { orientIdx: number; microIdx: number }[] = [
  { orientIdx: 0, microIdx: 0 }, // 0: normal   + micro-a
  { orientIdx: 1, microIdx: 1 }, // 1: flipX    + micro-b
  { orientIdx: 3, microIdx: 2 }, // 2: rotate180 + micro-c
  { orientIdx: 2, microIdx: 3 }, // 3: flipY    + micro-d
  { orientIdx: 0, microIdx: 4 }, // 4: normal   + micro-e
  { orientIdx: 1, microIdx: 2 }, // 5: flipX    + micro-c
  { orientIdx: 3, microIdx: 0 }, // 6: rotate180 + micro-a
  { orientIdx: 2, microIdx: 1 }, // 7: flipY    + micro-b
  { orientIdx: 0, microIdx: 3 }, // 8: normal   + micro-d
  { orientIdx: 1, microIdx: 4 }, // 9: flipX    + micro-e
]

interface ServicesT {
  sectionLabel: string
  tagline: string
  serwis_drukarek_termicznych: string
}

const PL: ServicesT = {
  sectionLabel: 'ZAKRES USŁUG',
  tagline: 'Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu',
  serwis_drukarek_termicznych: 'Serwis i naprawa drukarek etykiet',
}

export function Services({
  servicesData,
  basePath = '/uslugi',
  t,
  bare = false,
}: {
  servicesData?: ServiceData[]
  basePath?: string
  t?: ServicesT
  bare?: boolean
} = {}) {
  const services = servicesData ?? defaultServices
  const d = t ?? PL
  return (
    <section
      id="uslugi"
      className="relative pt-6 pb-12 md:pt-10 md:pb-16 text-center text-white overflow-hidden"
    >

      {/* Tło */}
      {!bare && (
        <div className="absolute inset-0">
          <Image
            src={manifest.services_background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 text-center">

          <FadeSlideP className="brush-underline mt-[6px] text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a]">
            {d.sectionLabel}
          </FadeSlideP>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {services
            .filter(
              (service) =>
                ![
                  'serwis-drukarek-laserowych',
                  'serwis-drukarek-atramentowych',
                  'serwis-drukarek-iglowych',
                ].includes(service.slug)
            )
            .map((service, i) => {
              const style = CARD_STYLE[i % CARD_STYLE.length]
              return (
              <Link
                key={service.slug}
                href={`${basePath}/${service.slug}`}
                prefetch={false}
                className={`
    group
    relative
    min-h-[152px]
    py-4 px-6
    flex
    items-center
    text-left
    w-full
    zakres-paper-card
    ${ORIENT_CLASSES[style.orientIdx]}
    ${MICRO_CLASSES[style.microIdx]}
  `}
              >
                {/* Ikona */}
                <div className="relative z-10 ml-8 mr-5 w-[120px] h-[120px] flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={
                      service.slug === 'serwis-komputerow-stacjonarnych'
                        ? '/images/02_serwis-komputerow-stacjonarnych-icon.webp'
                        : service.slug === 'serwis-laptopow'
                          ? '/images/01_serwis-laptopow-icon.webp'
                          : service.slug === 'outsourcing-it'
                            ? '/images/03_outsourcing-it-icon.webp'
                            : service.slug === 'serwis-drukarek-laserowych'
                              ? '/images/04_serwis-drukarek-laserowych-icon.webp'
                              : service.slug === 'serwis-drukarek-atramentowych'
                                ? '/images/05_serwis-drukarek-atramentowych-icon.webp'
                                : service.slug === 'serwis-drukarek-3d'
                                  ? '/images/Serwis_i_Naprawa_Drukarek_3D-icon.webp'
                                  : service.slug === 'serwis-plotterow'
                                    ? '/images/08_serwis-ploterow-icon.webp'
                                    : service.slug === 'serwis-drukarek-termicznych'
                                      ? '/images/06_serwis-drukarek-termicznych-icon.webp'
                                      : service.slug === 'serwis-drukarek-iglowych'
                                        ? '/images/07_serwis-drukarek-iglowych-icon.webp'
                                        : service.slug === 'wynajem-drukarek'
                                          ? '/images/10_wynajem-drukarek-icon.webp'
                                          : service.slug === 'drukarka-zastepcza'
                                            ? '/images/11_drukarka-zastepcza-icon.webp'
                                            : service.slug === 'naprawa-drukarek'
                                              ? '/images/Serwis_Drukarek-icon.webp'
                                              : service.icon
                    }
                    alt={`${service.title} Wrocław - ikona usługi serwisowej`}
                    width={105}
                    height={105}
                    sizes="105px"
                    className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Treść */}
                <div className="relative z-10 max-w-[195px]">
                  <h2 className="text-[24px] font-cormorant font-semibold text-[#3A2817] leading-[1.25]">
                    {service.slug === 'serwis-drukarek-termicznych'
                      ? d.serwis_drukarek_termicznych
                      : service.title}
                  </h2>
                </div>
              </Link>
              )
            })}
        </div>
      </div>
    </section>
  )
}
