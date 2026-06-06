'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, Mail, Navigation } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane, FaViber } from 'react-icons/fa'
import manifest from '@/config/manifest'

const cardClass =
  'relative overflow-hidden rounded-lg border-2 border-[rgba(200,169,107,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'

const linkClass =
  'flex items-center gap-2.5 rounded-sm border border-transparent bg-transparent px-2 py-1.5 font-cormorant text-[16px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)]'

function CardBg() {
  return (
    <div className="absolute inset-0">
      <Image
        src={manifest.Background_1}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/75" />
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <p className="pb-1.5 font-cormorant text-[13px] font-semibold uppercase tracking-[0.25em] text-[#f3df9a] [text-shadow:0_0_14px_rgba(191,167,106,0.75)]">
        {title}
      </p>
      <div className="mb-3 h-px w-full bg-gradient-to-r from-transparent via-[#bfa76a]/70 to-transparent shadow-[0_0_14px_rgba(191,167,106,0.55)]" />
    </>
  )
}

export function ContactActionsSection() {
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.replace(/\D/g, '').length < 9) return
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('phone', phone)
      formData.append('problemDescription', 'Prośba o telefon zwrotny ze strony Kontakt')
      await fetch('/api/send-email', { method: 'POST', body: formData })
      setSent(true)
      setPhone('')
    } catch {
      // silent — użytkownik może zadzwonić bezpośrednio
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 pt-8 pb-4 md:pt-12 md:pb-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* LEFT — Szybki kontakt */}
        <div className={cardClass}>
          <CardBg />
          <div className="relative z-10 p-4 md:p-6">
            <SectionHeader title="Szybki kontakt" />

            <div className="flex flex-col divide-y divide-[#bfa76a]/20">
              {/* Zadzwoń */}
              <a
                href="tel:+48793759262"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
              >
                <Phone className="h-[18px] w-[18px] shrink-0 text-[#25D366]" />
                <span>793 759 262</span>
              </a>

              {/* WhatsApp — link: https://wa.me/48793759262 */}
              <a
                href="https://wa.me/48793759262"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(37,211,102,0.25)]`}
              >
                <FaWhatsapp className="h-[18px] w-[18px] shrink-0 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              {/* Telegram — link: https://t.me/48793759262 */}
              <a
                href="https://t.me/48793759262"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(42,171,238,0.25)]`}
              >
                <FaTelegramPlane className="h-[18px] w-[18px] shrink-0 text-[#2AABEE]" />
                <span>Telegram</span>
              </a>

              {/* Viber — TODO: замени href на реальную ссылку Viber для +48793759262 */}
              <a
                href="viber://chat?number=%2B48793759262"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(115,96,242,0.25)]`}
              >
                <FaViber className="h-[18px] w-[18px] shrink-0 text-[#7360f2]" />
                <span>Viber</span>
              </a>

              {/* E-mail — link: mailto:serwis@omobonus.com.pl */}
              <a
                href="mailto:serwis@omobonus.com.pl"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-[#bfa76a]" />
                <span>serwis@omobonus.com.pl</span>
              </a>

              {/* Wyznacz trasę — link: Google Maps, Marcina Bukowskiego 174 */}
              <a
                href="https://www.google.com/maps/place/Marcina+Bukowskiego+174,+52-418+Wroc%C5%82aw/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
              >
                <Navigation className="h-[18px] w-[18px] shrink-0 text-[#bfa76a]" />
                <span>Wyznacz trasę</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — Oddzwonimy do Ciebie */}
        <div className={cardClass}>
          <CardBg />
          <div className="relative z-10 flex flex-col p-4 md:p-6">
            <SectionHeader title="Zostaw numer — oddzwonimy" />

            {sent ? (
              <p className="py-4 text-center font-cormorant text-[18px] text-[#f3df9a] [text-shadow:0_0_12px_rgba(191,167,106,0.55)]">
                Dziękujemy! Oddzwonimy wkrótce.
              </p>
            ) : (
              <form onSubmit={handleCallback} className="space-y-3">
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+48 xxx xxx xxx"
                  className="w-full rounded-sm border border-[#bfa76a]/40 bg-transparent px-4 py-2 font-inter text-base text-white placeholder:text-white/35 transition-all duration-250 hover:border-[#bfa76a]/60 focus:border-[#bfa76a]/80 focus:shadow-[0_0_8px_rgba(191,167,106,0.3)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-sm border border-[#bfa76a]/60 bg-gradient-to-r from-[#bfa76a]/20 via-[#bfa76a]/10 to-transparent px-6 py-2.5 font-cormorant text-[17px] font-semibold tracking-wide text-[#f3df9a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/90 hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/25 hover:to-transparent hover:shadow-[0_0_20px_rgba(191,167,106,0.35)] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Poproś o telefon'}
                </button>
                <p className="text-center font-inter text-[12px] text-white/45">
                  Oddzwaniamy: pon.–sob. 7:00–21:00
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
