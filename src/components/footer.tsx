'use client'

import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane, FaViber } from 'react-icons/fa'
import Link from 'next/link'

export interface FooterT {
  contact: string
  address: string
  phone: string
  email: string
  workingHours: string
  workingHoursValue: string
  contactHours: string
  contactHoursValue: string
  messengers: string
  privacyPolicy: string
  terms: string
  allRights: string
  privacyHref: string
  regulaminHref: string
}

const PL: FooterT = {
  contact: 'Kontakt',
  address: 'Adres',
  phone: 'Telefon',
  email: 'E-mail',
  workingHours: 'Godziny pracy serwisu',
  workingHoursValue: 'poniedziałek–piątek: 8:00–18:00',
  contactHours: 'Kontakt z serwisem',
  contactHoursValue: 'poniedziałek–sobota: 7:00–21:00',
  messengers: 'Komunikatory',
  privacyPolicy: 'Polityka Prywatności',
  terms: 'Regulamin',
  allRights: 'Wszelkie prawa zastrzeżone.',
  privacyHref: '/polityka-prywatnosci',
  regulaminHref: '/regulamin',
}

export function Footer({ t, bare = false }: { t?: FooterT; bare?: boolean } = {}) {
  const d = t ?? PL
  const currentYear = new Date().getFullYear()
  const kontaktRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      e.preventDefault()
      const rect = e.currentTarget.getBoundingClientRect()
      window.dispatchEvent(new CustomEvent('phone-hint-trigger', { detail: { sourceRect: rect, showArrow: false } }))
    }
  }
  useEffect(() => {
    const el = kontaktRef.current
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

  // Load the map iframe only once the block is about to enter the viewport,
  // so the heavy Google Maps JS API doesn't load on initial page load.
  useEffect(() => {
    const el = mapContainerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMapLoaded(true)
        observer.disconnect()
      }
    }, { rootMargin: '250px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      id="kontakt"
      className={`relative w-full pb-[64px] px-6 text-white ${bare ? 'pt-[44px]' : 'pt-[88px] border-t border-[#3a2e24]'}`}

    >
      {/* Tło — pomijane, gdy stroną zarządza wspólne tło (prop `bare`) */}
      {!bare && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `var(--bg-parchment)` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Lewa kolumna - Kontakt */}
          <div className="space-y-4">
            <div ref={kontaktRef} className="fade-slide-init brush-underline text-2xl md:text-3xl font-cormorant font-bold leading-tight tracking-wide text-[#bfa76a] mb-4">
              {d.contact}
            </div>

            <div className="space-y-3 font-inter text-sm leading-snug">
              {/* Adres */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>{d.address}</span>
                </div>
                <Link
                  href="https://www.google.com/maps/place/Marcina+Bukowskiego+174,+52-418+Wrocław/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-primary transition-colors"
                >
                  <div>Marcina Bukowskiego 174</div>
                  <div>52-418 Wrocław</div>
                </Link>
              </div>

              {/* Telefon */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <Phone className="h-4 w-4" />
                  <span>{d.phone}</span>
                </div>
                <a
                  href="tel:+48793759262"
                  onClick={handlePhoneClick}
                  className="text-white hover:text-[#f3df9a] transition-colors md:cursor-pointer"
                >
                  +48 793 759 262
                </a>
              </div>

              {/* E-mail */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <Mail className="h-4 w-4" />
                  <span>{d.email}</span>
                </div>
                <Link
                  href="mailto:serwis@omobonus.com.pl"
                  className="text-white hover:text-primary transition-colors"
                >
                  serwis@omobonus.com.pl
                </Link>
              </div>

              {/* Godziny pracy serwisu */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a]">
                  <Clock className="h-4 w-4" />
                  <span>{d.workingHours}</span>
                </div>
                <span className="text-white">
                  {d.workingHoursValue}
                </span>
              </div>

              {/* Kontakt z serwisem */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a]">
                  <Clock className="h-4 w-4" />
                  <span>{d.contactHours}</span>
                </div>
                <span className="text-white">
                  {d.contactHoursValue}
                </span>
              </div>

              {/* Komunikatory */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{d.messengers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="https://wa.me/48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <FaWhatsapp className="h-3.5 w-3.5" />
                    WhatsApp
                  </Link>
                  <span className="opacity-50">·</span>
                  <Link
                    href="https://t.me/+48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <FaTelegramPlane className="h-3.5 w-3.5" />
                    Telegram
                  </Link>
                  <span className="opacity-50">·</span>
                  <Link
                    href="viber://chat?number=%2B48793759262"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <FaViber className="h-3.5 w-3.5" />
                    Viber
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Mapa */}
          <div className="flex items-center justify-center">
            <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-[#3a2e24]">
              {mapLoaded && (
                <iframe
                  src="https://www.google.com/maps?q=Marcina+Bukowskiego+174,+52-418+Wrocław&hl=pl&z=11&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter:
                      'grayscale(0.3) sepia(0.2) brightness(0.9) contrast(1.1)',
                  }}
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja Omobonus serwis"
                />
              )}
            </div>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="mt-8 pt-4 border-t border-[#3a2e24]/30 text-center space-y-1 font-inter">
          <div className="text-sm text-[#b8a894]">
            <Link
              href={d.privacyHref}
              className="hover:text-primary transition-colors"
            >
              {d.privacyPolicy}
            </Link>
            <span className="mx-2 opacity-40">|</span>
            <Link
              href={d.regulaminHref}
              className="hover:text-primary transition-colors"
            >
              {d.terms}
            </Link>
          </div>

          {/* currentYear can legitimately differ between server-render time (build)
              and hydration time (client) right at a year boundary — suppress just
              that expected, harmless mismatch instead of letting it throw. */}
          <p className="text-xs text-[#bfa76a]" suppressHydrationWarning>
            © {currentYear} Omobonus Sp. z o.o. {d.allRights}
          </p>
        </div>
      </div>
    </footer>
  )
}
