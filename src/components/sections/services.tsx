'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { services as defaultServices } from '@/lib/services-data'
import type { ServiceData } from '@/lib/services-data'
import manifest from '@/config/KANONICZNY_MANIFEST.json'

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
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = eyebrowRef.current
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

          <p ref={eyebrowRef} className="fade-slide-init brush-underline mt-[6px] text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a]">
            {d.sectionLabel}
          </p>
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
            .map((service) => (
              <Link
                key={service.slug}
                href={`${basePath}/${service.slug}`}
                className="
    group
    relative
    min-h-[70px]
    rounded-lg
    py-2 px-3
    border-2 border-[rgba(200,169,107,0.5)]
    hover:border-[rgba(200,169,107,0.85)]
    transition-all
    duration-300
    ease-out
    hover:-translate-y-1
    hover:shadow-[0_0_24px_rgba(191,167,106,0.35)]
    flex
    items-center
    text-left
    w-full
    services-card-bg
  "
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#bfa76a]/25 via-[#bfa76a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Ikona */}
                <div className="relative z-10 mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
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
                    width={50}
                    height={50}
                    className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                    unoptimized
                  />
                </div>

                {/* Treść */}
                <div className="relative z-10 flex-1">
                  <h2 className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-[#f3df9a] group-hover:[text-shadow:0_0_10px_rgba(191,167,106,0.5)] transition-all duration-300 mb-1 leading-tight">
                    {service.slug === 'serwis-drukarek-termicznych'
                      ? d.serwis_drukarek_termicznych
                      : service.title}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
