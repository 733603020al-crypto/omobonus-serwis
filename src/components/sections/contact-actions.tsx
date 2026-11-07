'use client'

import { useState, useRef, useEffect } from 'react'
import { CustomPhoneInput } from '@/components/ui/custom-phone-input'
import { CompactSuccessModal } from '@/components/ui/compact-success-modal'
import { registerDraftSource, readLangSwitchDraft, switchLocaleForCountry } from '@/lib/country-locale'
import { hasTrackingConsent } from '@/lib/tracking-consent'
import { PhoneHintArrow } from '@/components/ui/phone-hint-arrow'
import { GOLD_CTA, GOLD_CTA_SIZE } from '@/components/ui/gold-cta'
import { CallbackModal } from '@/components/ui/callback-modal'
import dynamic from 'next/dynamic'
import { MessengerIcon } from '@/components/ui/MessengerIcon'

// the route window loads only after a click on the calculator icon
const KosztDojazduModal = dynamic(() => import('@/components/koszt-dojazdu/KosztDojazduModal'), { ssr: false })

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
  // Without cookie consent the event is not queued, so it is never sent later.
  if (typeof window === 'undefined' || !hasTrackingConsent()) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'form_submit',
    form_id: formId,
    phone_number: normalizePhoneNumberForDataLayer(phoneNumber),
  })
}

interface ContactActionsT {
  quickContactTitle: string
  callbackTitle: string
  callbackButton: string
  callbackSubmitting: string
  callbackHint: string
  privacyNotice?: string
  privacyLink?: string
  privacyHref?: string
  phoneError: string
  callbackError: string
  successTitle: string
  successText: string
  orFormLabel?: string
  callNowButton?: string
  callNowDividerLabel?: string
  mapLabel?: string
  kosztLabel?: string
}

const PL_ACTIONS: ContactActionsT = {
  quickContactTitle: 'Skontaktuj się z nami',
  callbackTitle: 'zostaw numer — oddzwonimy',
  callbackButton: 'Proszę o telefon',
  callbackSubmitting: 'Wysyłanie...',
  callbackHint: 'Oddzwaniamy: pon.–sob. 7:00–21:00',
  privacyNotice: 'Numer wykorzystamy, aby oddzwonić — szczegóły w',
  privacyLink: 'Polityce prywatności',
  privacyHref: '/polityka-prywatnosci',
  phoneError: 'Numer telefonu jest za krótki',
  callbackError: 'Nie udało się wysłać prośby. Spróbuj ponownie lub zadzwoń.',
  successTitle: 'Dziękujemy!',
  successText: 'Skontaktujemy się z Państwem jak najszybciej',
  orFormLabel: 'lub wyślij zgłoszenie',
  callNowButton: 'Zadzwoń teraz',
  callNowDividerLabel: 'lub napisz',
  mapLabel: 'Mapa',
  kosztLabel: 'Koszt dojazdu',
}

const CALLBACK_UI = {
  pl: { icon: 'Oddzwonimy', close: 'Zamknij' },
  uk: { icon: 'Передзвонимо', close: 'Закрити' },
  ru: { icon: 'Перезвоним', close: 'Закрыть' },
  en: { icon: 'Call back', close: 'Close' },
} as const

const KOSZT_HINT = {
  pl: 'Kalkulator otworzy się po rozwinięciu formularza',
  uk: 'Калькулятор відкриється після розгортання форми',
  ru: 'Калькулятор откроется после раскрытия формы',
  en: 'The calculator will open once the form unfolds',
} as const

export function ContactActionsSection({ t, locale = 'pl' }: { t?: ContactActionsT; locale?: 'pl' | 'uk' | 'ru' | 'en' } = {}) {
  const d = t ?? PL_ACTIONS
  const [phone, setPhone] = useState('')
  const [countryName, setCountryName] = useState('Polska')
  const [countryDialCode, setCountryDialCode] = useState('+48')
  const [countryPhoneLength, setCountryPhoneLength] = useState<number | undefined>(9)
  // Введённое сохраняется при смене языка из-за выбора страны (см. country-locale.ts)
  const draftRef = useRef({ phone: '', countryName: 'Polska', countryDialCode: '+48', countryPhoneLength: 9 as number | undefined })
  draftRef.current = { phone, countryName, countryDialCode, countryPhoneLength }
  useEffect(() => registerDraftSource('callback', () => draftRef.current), [])
  useEffect(() => {
    const saved = readLangSwitchDraft<typeof draftRef.current>('callback')
    if (!saved) return
    setPhone(saved.phone || '')
    setCountryName(saved.countryName)
    setCountryDialCode(saved.countryDialCode)
    setCountryPhoneLength(saved.countryPhoneLength)
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showKoszt, setShowKoszt] = useState(false)
  const [showCallback, setShowCallback] = useState(false)
  // link from an email (…/kontakt?koszt=1): hint while the paper animates, calculator opens right after the form is revealed
  const [kosztHint, setKosztHint] = useState(false)
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has('koszt')) return
    const root = document.querySelector('[data-paper-phase]')
    if (!root) return
    let timer = 0
    let done = false
    const check = () => {
      const phase = root.getAttribute('data-paper-phase')
      if (!done && phase !== 'loading' && phase !== 'ball') setKosztHint(true)
      if (phase === 'form' && !done) {
        done = true
        obs.disconnect()
        timer = window.setTimeout(() => { setKosztHint(false); setShowKoszt(true) }, 250)
      }
    }
    const obs = new MutationObserver(check)
    obs.observe(root, { attributes: true, attributeFilter: ['data-paper-phase'] })
    check()
    return () => { done = true; obs.disconnect(); window.clearTimeout(timer) }
  }, [])
  const cb = CALLBACK_UI[locale]
  const [callbackError, setCallbackError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [hintActive, setHintActive] = useState(false)
  const [hintSourceRect, setHintSourceRect] = useState<DOMRect | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const phoneInputWrapperRef = useRef<HTMLElement | null>(null)

  // the form lives in the window: find the phone field each time the window opens
  useEffect(() => {
    if (!showCallback) { phoneInputWrapperRef.current = null; return }
    const input = formRef.current?.querySelector<HTMLInputElement>('input.dark-phone-input')
    phoneInputWrapperRef.current = input?.parentElement ?? null
    input?.focus()
  }, [showCallback])

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
      // open the window first, then focus and shake the field once it is mounted
      setShowCallback(true)
      setTimeout(() => triggerHint(detail.sourceRect, detail.showArrow ?? false), 60)
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
      formData.append('company', honeypotRef.current?.value ?? '')
      const res = await fetch('/api/callback-request', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('send failed')
      pushFormSubmitToDataLayer('quick_form', phone)
      setShowCallback(false)
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
        <div id="kontakt-ikony" className="mb-1 md:-mx-4 max-md:mx-auto max-md:max-w-[336px] flex flex-row max-md:flex-wrap max-md:gap-x-2 max-md:gap-y-4 items-start justify-center md:gap-3 md:mb-0.5">
          <button type="button" onClick={() => setShowCallback(true)} className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/callback-glossy-v3.webp" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[7px] md:-mt-[9px]">{cb.icon}</span>
          </button>
          <a href="https://wa.me/48793759262" target="_blank" rel="noopener noreferrer" className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/whatsapp-glossy-v2.webp" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[10px] md:-mt-[9px]">WhatsApp</span>
          </a>
          <a href="https://t.me/+48793759262" target="_blank" rel="noopener noreferrer" className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/telegram-glossy-v2.webp" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[10px] md:-mt-[9px]">Telegram</span>
          </a>
          <a href="viber://chat?number=%2B48793759262" className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/viber-glossy-v2.webp" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[10px] md:-mt-[9px]">Viber</span>
          </a>
          <a href="mailto:serwis@omobonus.com.pl" className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/email-glossy-v2.webp" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[10px] md:-mt-[9px]">E-mail</span>
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Marcina%20Bukowskiego%20174%2C%2052-418%20Wroc%C5%82aw%2C%20Poland&travelmode=driving"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]"
          >
            <div className="icon-float"><MessengerIcon src="/images/google-maps-glossy-v2.webp" alt="Google Maps" /></div>
            <span className="whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[10px] md:-mt-[9px]">{d.mapLabel ?? 'Mapa'}</span>
          </a>
          <button type="button" onClick={() => setShowKoszt(true)} className="contact-icon-link max-md:w-[min(76px,calc((100%-24px)/4))] flex flex-col items-center gap-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-[6px] hover:scale-[1.03]">
            <div className="icon-float"><MessengerIcon src="/images/koszt-dojazdu-glossy-v2.webp" /></div>
            <span className="max-w-[76px] md:max-w-none text-center leading-[1.05] md:leading-[1.5] md:whitespace-nowrap font-cormorant text-[14px] md:text-[15px] text-white/85 -mt-[7px] md:-mt-[9px]">{d.kosztLabel ?? 'Koszt dojazdu'}</span>
          </button>
        </div>

      </section>
      <CallbackModal open={showCallback} onClose={() => setShowCallback(false)} title={d.callbackTitle} closeLabel={cb.close}>
          <form ref={formRef} onSubmit={handleCallback}>
            {/* Pole-pułapka (honeypot) na boty — niewidoczne dla ludzi, pomijane przez czytniki ekranu */}
            <input
              ref={honeypotRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              defaultValue=""
              className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
            />
            <div className="flex flex-col gap-3">
              <div className="flex-1 min-w-0">
                <CustomPhoneInput
                  aria-label={d.callbackTitle}
                  aria-invalid={phoneError}
                  aria-describedby={phoneError ? 'callback-phone-error' : undefined}
                  value={phone}
                  onChange={(v) => { setPhone(v); if (phoneError) setPhoneError(false) }}
                  onCountryChange={({ name, dialCode, phoneLength, lang }) => {
                    setCountryName(name)
                    setCountryDialCode(dialCode)
                    setCountryPhoneLength(phoneLength)
                    draftRef.current = { phone: dialCode, countryName: name, countryDialCode: dialCode, countryPhoneLength: phoneLength }
                    switchLocaleForCountry(lang, locale)
                  }}
                  variant="dark"
                  locale={locale}
                  alwaysRow
                  selectorWidth="190px"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${GOLD_CTA} ${GOLD_CTA_SIZE} w-full disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <span className="gold-text-sweep">{isSubmitting ? d.callbackSubmitting : d.callbackButton}</span>
              </button>
            </div>

            {phoneError && (
              <p id="callback-phone-error" className="mt-1.5 text-sm font-sans text-red-400">{d.phoneError}</p>
            )}
            {callbackError && !phoneError && (
              <p className="mt-1.5 text-sm text-red-400">{d.callbackError}</p>
            )}
            <p className="mt-2 text-center font-inter text-[12px] text-white/45">
              {d.callbackHint}
            </p>
          </form>
      </CallbackModal>
      {(
        <p aria-hidden="true" className="koszt-hint pointer-events-none fixed z-40 right-[35px] bottom-[35px] max-md:right-4 max-md:bottom-[77px] max-md:max-w-[calc(100%-32px)] text-right text-[20px] text-[#bfa76a] font-cormorant italic leading-tight font-semibold drop-shadow-2xl transition-opacity duration-[1400ms] ease-out" style={{ opacity: kosztHint && !showKoszt ? 1 : 0 }}>
          {KOSZT_HINT[locale]}<span className="koszt-hint-dot">.</span><span className="koszt-hint-dot">.</span><span className="koszt-hint-dot">.</span>
        </p>
      )}
      {showKoszt && <KosztDojazduModal lang={locale} onClose={() => setShowKoszt(false)} />}

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
