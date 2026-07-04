'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
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

const pushFormSubmitToDataLayer = (formId: DataLayerFormId, phoneNumber: string): void => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'form_submit',
    form_id: formId,
    phone_number: normalizePhoneNumberForDataLayer(phoneNumber),
  })
}

function Divider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('fade-slide-animate')
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className="brush-divider-row flex items-center gap-3">
      <div
        className="divider-line divider-line-left h-px flex-1"
        style={{ background: 'linear-gradient(to right, transparent, rgba(230,204,130,0.85))', boxShadow: '0 0 8px rgba(230,204,130,0.35)' }}
      />
      <span className="whitespace-nowrap font-cormorant text-[12px] font-semibold uppercase tracking-[0.2em] text-[#f3df9a]/80">
        {label}
      </span>
      <div
        className="divider-line divider-line-right h-px flex-1"
        style={{ background: 'linear-gradient(to left, transparent, rgba(230,204,130,0.85))', boxShadow: '0 0 8px rgba(230,204,130,0.35)' }}
      />
    </div>
  )
}

interface ContactActionsT {
  quickContactTitle: string
  callbackTitle: string
  callbackButton: string
  callbackSubmitting: string
  callbackHint: string
  phoneError: string
  callbackError: string
  successTitle: string
  successText: string
  orFormLabel?: string
}

const PL_ACTIONS: ContactActionsT = {
  quickContactTitle: 'Skontaktuj się z nami',
  callbackTitle: 'lub zostaw numer — oddzwonimy',
  callbackButton: 'Proszę o telefon',
  callbackSubmitting: 'Wysyłanie...',
  callbackHint: 'Oddzwaniamy: pon.–sob. 7:00–21:00',
  phoneError: 'Numer telefonu jest za krótki',
  callbackError: 'Nie udało się wysłać prośby. Spróbuj ponownie lub zadzwoń.',
  successTitle: 'Dziękujemy!',
  successText: 'Skontaktujemy się z Państwem jak najszybciej',
  orFormLabel: 'lub wyślij zgłoszenie serwisowe',
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
  const [hintSourceRect, setHintSourceRect] = useState<DOMRect | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const phoneInputWrapperRef = useRef<HTMLElement | null>(null)

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
    if (withArrow && sourceRect) {
      setHintSourceRect(sourceRect)
      setHintActive(true)
    }
    const delay = withArrow ? 380 : 140
    setTimeout(() => {
      formRef.current?.querySelector<HTMLInputElement>('input.dark-phone-input')?.focus()
    }, delay)
    setTimeout(() => applyGoldenShake(), delay + 80)
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
      <section className="mx-auto max-w-2xl px-4 pt-8 pb-4 md:pt-10 md:pb-6">

        {/* Level 1: icons */}
        <div className="mb-6 flex flex-row items-start justify-center gap-5 md:gap-7 md:mb-8">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Marcina%20Bukowskiego%20174%2C%2052-418%20Wroc%C5%82aw%2C%20Poland&travelmode=driving"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-link flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]"
          >
            <div className="icon-float"><Image src="/images/google-maps.png" alt="Google Maps" width={72} height={72} className="w-[46px] h-[46px] md:w-[68px] md:h-[68px]" /></div>
            <span className="whitespace-nowrap font-cormorant text-[12px] md:text-[14px] text-white/85 -mt-[4px] md:-mt-[7px]">Mapa</span>
          </a>
          <a href="mailto:serwis@omobonus.com.pl" className="contact-icon-link flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><Image src="/images/email.png" alt="E-mail" width={72} height={72} className="w-[46px] h-[46px] md:w-[68px] md:h-[68px]" /></div>
            <span className="whitespace-nowrap font-cormorant text-[12px] md:text-[14px] text-white/85 -mt-[4px] md:-mt-[7px]">E-mail</span>
          </a>
          <a href="https://wa.me/48793759262" target="_blank" rel="noopener noreferrer" className="contact-icon-link flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><Image src="/images/whatsapp.png" alt="WhatsApp" width={72} height={72} className="w-[46px] h-[46px] md:w-[68px] md:h-[68px]" /></div>
            <span className="whitespace-nowrap font-cormorant text-[12px] md:text-[14px] text-white/85 -mt-[4px] md:-mt-[7px]">WhatsApp</span>
          </a>
          <a href="https://t.me/+48793759262" target="_blank" rel="noopener noreferrer" className="contact-icon-link flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><Image src="/images/telegram.png" alt="Telegram" width={72} height={72} className="w-[46px] h-[46px] md:w-[68px] md:h-[68px]" /></div>
            <span className="whitespace-nowrap font-cormorant text-[12px] md:text-[14px] text-white/85 -mt-[4px] md:-mt-[7px]">Telegram</span>
          </a>
          <a href="viber://chat?number=%2B48793759262" className="contact-icon-link flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><Image src="/images/viber.png" alt="Viber" width={72} height={72} className="w-[46px] h-[46px] md:w-[68px] md:h-[68px]" /></div>
            <span className="whitespace-nowrap font-cormorant text-[12px] md:text-[14px] text-white/85 -mt-[4px] md:-mt-[7px]">Viber</span>
          </a>
        </div>

        {/* Divider 1 */}
        <div className="mb-4">
          <Divider label={d.callbackTitle} />
        </div>

        {/* Level 2: phone + button row */}
        <form ref={formRef} onSubmit={handleCallback}>
          <div className="flex flex-col gap-2 md:flex-row md:items-stretch md:gap-3">
            <div className="flex-1 min-w-0">
              <CustomPhoneInput
                value={phone}
                onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false) }}
                onCountryChange={({ name, dialCode, phoneLength }) => {
                  setCountryName(name)
                  setCountryDialCode(dialCode)
                  setCountryPhoneLength(phoneLength)
                }}
                variant="dark"
                locale={locale}
                alwaysRow
                selectorWidth="220px"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full border border-transparent bg-[#1c6e43] px-6 py-[13px] font-sans text-[15px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#155d36] hover:shadow-[0_8px_20px_rgba(28,110,67,0.4)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-[240px] md:py-0"
            >
              {isSubmitting ? d.callbackSubmitting : d.callbackButton}
            </button>
          </div>

          {phoneError && (
            <p className="mt-1.5 text-sm font-sans text-red-400">{d.phoneError}</p>
          )}
          {callbackError && !phoneError && (
            <p className="mt-1.5 text-sm text-red-400">{d.callbackError}</p>
          )}
          <p className="mt-2 text-center font-inter text-[12px] text-white/45">
            {d.callbackHint}
          </p>
        </form>

        {/* Divider 2 */}
        {d.orFormLabel && (
          <div className="mt-6">
            <Divider label={d.orFormLabel} />
          </div>
        )}

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
        onDone={() => setHintActive(false)}
      />
    </>
  )
}
