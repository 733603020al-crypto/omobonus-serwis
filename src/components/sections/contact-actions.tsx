'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Phone, AtSign } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane, FaViber } from 'react-icons/fa'
import { MdDirections } from 'react-icons/md'
import manifest from '@/config/manifest'
import { CustomPhoneInput } from '@/components/ui/custom-phone-input'
import { CompactSuccessModal } from '@/components/ui/compact-success-modal'
import { PhoneHintArrow } from '@/components/ui/phone-hint-arrow'

type DataLayerFormId = 'quick_form' | 'long_form'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

const normalizePhoneNumberForDataLayer = (phoneNumber: string): string => {
  const value = String(phoneNumber || '').trim()
  const hasPlus = value.startsWith('+')
  const digitsOnly = value.replace(/\D/g, '')

  return hasPlus ? `+${digitsOnly}` : digitsOnly
}

const pushFormSubmitToDataLayer = (
  formId: DataLayerFormId,
  phoneNumber: string
): void => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: 'form_submit',
    form_id: formId,
    phone_number: normalizePhoneNumberForDataLayer(phoneNumber),
  })
}

const cardClass =
  'relative overflow-hidden rounded-lg border-2 border-[rgba(200,169,107,0.5)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'

const cardClassOpen =
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
      <div className="absolute inset-0 bg-black/55" />
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
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
    <p
      ref={ref}
      className="fade-slide-init brush-underline mb-4 font-cormorant text-[13px] font-semibold uppercase tracking-[0.25em] text-[#f3df9a] [text-shadow:0_0_14px_rgba(191,167,106,0.75)]"
    >
      {title}
    </p>
  )
}


interface ContactActionsT {
  quickContactTitle: string
  callbackTitle: string
  navigateLabel: string
  callbackButton: string
  callbackSubmitting: string
  callbackHint: string
  phoneError: string
  callbackError: string
  successTitle: string
  successText: string
}

const PL_ACTIONS: ContactActionsT = {
  quickContactTitle: 'Skontaktuj się z nami',
  callbackTitle: 'Zostaw numer — oddzwonimy',
  navigateLabel: 'Wyznacz trasę',
  callbackButton: 'Proszę o telefon',
  callbackSubmitting: 'Wysyłanie...',
  callbackHint: 'Oddzwaniamy: pon.–sob. 7:00–21:00',
  phoneError: 'Numer telefonu jest za krótki',
  callbackError: 'Nie udało się wysłać prośby. Spróbuj ponownie lub zadzwoń.',
  successTitle: 'Dziękujemy!',
  successText: 'Skontaktujemy się z Państwem jak najszybciej',
}

export function ContactActionsSection({ t, locale = 'pl' }: { t?: ContactActionsT; locale?: 'pl' | 'uk' | 'ru' } = {}) {
  const d = t ?? PL_ACTIONS
  const [phone, setPhone] = useState('')
  const [countryName, setCountryName] = useState('Polska')
  const [countryDialCode, setCountryDialCode] = useState('+48')
  const [countryPhoneLength, setCountryPhoneLength] = useState<number | undefined>(9)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [callbackError, setCallbackError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [hintActive, setHintActive] = useState(false)
  const [glowActive, setGlowActive] = useState(false)
  const [hintSourceRect, setHintSourceRect] = useState<DOMRect | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const phoneBlockRef = useRef<HTMLDivElement>(null)
  const phoneInputWrapperRef = useRef<HTMLElement | null>(null)
  const glowTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Populate phoneInputWrapperRef after mount (input's parent div, not the country button)
  useEffect(() => {
    const input = formRef.current?.querySelector<HTMLInputElement>('input.dark-phone-input')
    phoneInputWrapperRef.current = input?.parentElement ?? null
  }, [])

  const applyGoldenShake = () => {
    const input = formRef.current?.querySelector<HTMLInputElement>('input.dark-phone-input')
    const wrapper = input?.parentElement
    if (!wrapper) return
    wrapper.classList.add('golden-shake')
    setTimeout(() => wrapper.classList.remove('golden-shake'), 1300)
  }

  const triggerHint = (sourceRect: DOMRect | null, withArrow: boolean) => {
    if (glowTimer.current) clearTimeout(glowTimer.current)
    setGlowActive(true)
    if (withArrow && sourceRect) {
      setHintSourceRect(sourceRect)
      setHintActive(true)
    }
    const delay = withArrow ? 380 : 140
    setTimeout(() => {
      formRef.current?.querySelector<HTMLInputElement>('input.dark-phone-input')?.focus()
    }, delay)
    setTimeout(() => applyGoldenShake(), delay + 80)
    if (!withArrow) {
      glowTimer.current = setTimeout(() => setGlowActive(false), 2600)
    }
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ sourceRect: DOMRect; showArrow?: boolean }>).detail
      triggerHint(detail.sourceRect, detail.showArrow ?? false)
    }
    window.addEventListener('phone-hint-trigger', handler)
    return () => window.removeEventListener('phone-hint-trigger', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerPhoneError = () => {
    setPhoneError(true)
    const input = formRef.current?.querySelector('input.dark-phone-input')
    const el = input?.parentElement
    if (!el) return
    el.classList.add('shake-error')
    setTimeout(() => el.classList.remove('shake-error'), 1000)
  }

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    const dialDigits = countryDialCode.replace(/\D/g, '').length
    const nationalDigits = digits.length - dialDigits

    if (nationalDigits <= 0 || (countryPhoneLength !== undefined && nationalDigits < countryPhoneLength)) {
      triggerPhoneError()
      return
    }
    setPhoneError(false)
    setIsSubmitting(true)
    setCallbackError(false)
    try {
      const formData = new FormData()
      formData.append('phone', phone)
      formData.append('country', countryName)
      const res = await fetch('/api/callback-request', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('send failed')

      pushFormSubmitToDataLayer('quick_form', phone)
      setShowModal(true)
    } catch {
      setCallbackError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-4 md:pt-12 md:pb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* LEFT — Szybki kontakt */}
          <div className={cardClass}>
            <CardBg />
            <div className="relative z-10 p-4 md:p-6">
              <SectionHeader title={d.quickContactTitle} />

              <div className="flex flex-col divide-y divide-[#bfa76a]/20">
                {/* Zadzwoń */}
                <a
                  href="tel:+48793759262"
                  onClick={(e) => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                      e.preventDefault()
                      triggerHint(e.currentTarget.getBoundingClientRect(), true)
                    }
                  }}
                  className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
                >
                  <Phone className="h-[18px] w-[18px] shrink-0 text-[#25D366]" />
                  <span>793 759 262</span>
                </a>

                {/* E-mail — link: mailto:serwis@omobonus.com.pl */}
                <a
                  href="mailto:serwis@omobonus.com.pl"
                  className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
                >
                  <AtSign className="h-[18px] w-[18px] shrink-0 text-[#c8a95a]" />
                  <span>serwis@omobonus.com.pl</span>
                </a>

                {/* Wyznacz trasę — link: Google Maps, Marcina Bukowskiego 174 */}
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Marcina%20Bukowskiego%20174%2C%2052-418%20Wroc%C5%82aw%2C%20Poland&travelmode=driving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]`}
                >
                  <MdDirections className="h-[18px] w-[18px] shrink-0 text-[#1a73e8]" />
                  <span>{d.navigateLabel}</span>
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

                {/* Telegram — link: https://t.me/+48793759262 */}
                <a
                  href="https://t.me/+48793759262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} hover:shadow-[0_0_20px_rgba(42,171,238,0.25)]`}
                >
                  <FaTelegramPlane className="h-[18px] w-[18px] shrink-0 text-[#2AABEE]" />
                  <span>Telegram</span>
                </a>

                {/* Viber */}
                <a
                  href="viber://chat?number=%2B48793759262"
                  className={`${linkClass} hover:shadow-[0_0_20px_rgba(115,96,242,0.25)]`}
                >
                  <FaViber className="h-[18px] w-[18px] shrink-0 text-[#7360f2]" />
                  <span>Viber</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Oddzwonimy do Ciebie */}
          <div
            className={cardClassOpen}
            style={{
              transition: 'box-shadow 500ms ease-in-out',
              boxShadow: glowActive
                ? '0 0 0 2px rgba(191,167,106,0.55), 0 0 28px 8px rgba(191,167,106,0.28), 0 8px 32px rgba(0,0,0,0.5)'
                : '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <CardBg />
            <div className="relative z-10 flex flex-col p-4 md:p-6">
              <SectionHeader title={d.callbackTitle} />

              <form ref={formRef} onSubmit={handleCallback} className="space-y-3 mt-4">
                <div ref={phoneBlockRef}>
                  <CustomPhoneInput
                    value={phone}
                    onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false) }}
                    onCountryChange={({ name, dialCode, phoneLength }) => {
                      setCountryName(name)
                      setCountryDialCode(dialCode)
                      setCountryPhoneLength(phoneLength)
                    }}
                    variant="dark"
                    className="!flex-col"
                    locale={locale}
                  />
                </div>
                {phoneError && (
                  <p className="text-red-600 text-sm font-sans">
                    {d.phoneError}
                  </p>
                )}
                {callbackError && !phoneError && (
                  <p className="text-red-600 text-sm">
                    {d.callbackError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-transparent bg-[#1c6e43] px-8 py-[14px] md:py-[10px] font-sans text-[16px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#155d36] hover:shadow-[0_8px_20px_rgba(28,110,67,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? d.callbackSubmitting : d.callbackButton}
                </button>
                <p className="text-center font-inter text-[12px] text-white/45">
                  {d.callbackHint}
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      <CompactSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={d.successTitle}
        text={d.successText}
      />

      <PhoneHintArrow
        active={hintActive}
        sourceRect={hintSourceRect}
        targetRef={phoneInputWrapperRef}
        onDone={() => { setHintActive(false); setGlowActive(false) }}
      />
    </>
  )
}
