'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { CustomPhoneInput } from '@/components/ui/custom-phone-input'
import { CustomCheckbox } from '@/components/ui/custom-checkbox'
import { CompactSuccessModal } from '@/components/ui/compact-success-modal'
import { uk } from '@/lib/i18n/uk'
import { ru } from '@/lib/i18n/ru'

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

// Wydziela nawiasowy dopisek etykiety (np. "(wymagane)") jako mniej wyróżniony fragment w tej samej linii
function splitLabelNote(text: string): { main: string; note: string | null } {
  const match = text.match(/^(.*?)\s*(\([^)]*\))\s*$/)
  if (!match) return { main: text, note: null }
  return { main: match[1], note: match[2] }
}

export type Locale = 'pl' | 'uk' | 'ru'

export interface ContactT {
  formTitle: string
  nameLabel: string
  namePlaceholder: string
  phoneLabel: string
  emailLabel: string
  addressLabel: string
  addressPlaceholder: string
  problemLabel: string
  problemPlaceholder: string
  attachLabel: string
  attachAdd: string
  attachHint?: string
  agreementConfirm: string
  privacyLink: string
  privacyHref: string
  termsLink: string
  termsHref: string
  agreementEnd: string
  submitButton: string
  /** Krótkie słowo na pieczęci/przycisku wysyłki (np. "Wyślij") — osobne od submitButton (pełna fraza używana m.in. jako aria-label) */
  submitButtonSeal: string
  submitting: string
  phoneError: string
  agreementError: string
  agreementConnector: string
  fileTypeError: string
  fileSizeError: (name: string, max: number) => string
  successTitle: string
  successText: string
  successModal?: {
    title: string
    line1: string
    line2: string
    line3: string
  }
}

const PL: ContactT = {
  formTitle: 'Formularz zgłoszeniowy',
  nameLabel: 'Imię i nazwisko',
  namePlaceholder: 'Jan Kowalski',
  phoneLabel: 'Numer telefonu (wymagane)',
  emailLabel: 'Adres e-mail',
  addressLabel: 'Adres',
  addressPlaceholder: 'ul. Przykładowa 1, 50-001 Wrocław',
  problemLabel: 'Opis zgłoszenia',
  problemPlaceholder: 'Np. opisz problem, usterkę lub napisz, czego dotyczy zgłoszenie',
  attachLabel: 'Załącz zdjęcia / filmy / pliki',
  attachAdd: 'Dodaj',
  agreementConfirm: 'Potwierdzam, że zapoznałem/am się z',
  privacyLink: 'Polityką Prywatności',
  privacyHref: '/polityka-prywatnosci',
  termsLink: 'Regulaminem',
  termsHref: '/regulamin',
  agreementEnd: 'i akceptuję ich postanowienia.',
  submitButton: 'Wyślij zgłoszenie',
  submitButtonSeal: 'Wyślij',
  submitting: 'Wysyłanie...',
  phoneError: 'Numer telefonu jest za krótki',
  agreementError: 'Musisz zaakceptować regulamin',
  agreementConnector: 'oraz',
  fileTypeError: 'Możesz przesłać tylko zdjęcia lub wideo.',
  fileSizeError: (name, max) => `Plik ${name} jest zbyt duży (maks. ${max} MB).`,
  successTitle: 'Dziękujemy!',
  successText: 'Zgłoszenie zostało wysłane.',
}

const CONTACT_DEFAULTS: Record<Locale, ContactT> = {
  pl: PL,
  uk: uk.contactForm,
  ru: ru.contactForm,
}

function buildFormSchema(phoneError: string, agreementError: string) {
  return z.object({
    name: z.string().optional(),
    phone: z.string().min(9, { message: phoneError }),
    email: z.string().optional(),
    address: z.string().optional(),
    problemDescription: z.string().optional(),
    agreements: z.literal(true, { message: agreementError }),
  })
}

type FormValues = z.infer<ReturnType<typeof buildFormSchema>>

const defaultFormValues: Partial<FormValues> = {
  name: '',
  phone: '',
  email: '',
  address: '',
  problemDescription: '',
  agreements: undefined,
}


const MAX_FILE_SIZE_MB = 25
const ACCEPTED_PREFIXES = [
  'image/',
  'video/',
  'text/',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
]

type AttachmentPreview = {
  id: string
  file: File
  url: string
  kind: 'image' | 'video' | 'file'
}

export function Contact({ t, bare = false, locale }: { t?: ContactT; bare?: boolean; locale?: Locale } = {}) {
  const resolvedLocale: Locale = locale ?? 'pl'
  const d = t ?? CONTACT_DEFAULTS[resolvedLocale]
  const formSchema = useMemo(
    () => buildFormSchema(d.phoneError, d.agreementError),
    [d.phoneError, d.agreementError]
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [shouldScrollToError, setShouldScrollToError] = useState(false)
  const errorFieldsRef = useRef<Set<string>>(new Set())

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  // Прокрутка к первому полю с ошибкой
  useEffect(() => {
    if (!shouldScrollToError || Object.keys(errors).length === 0) return

    // Находим первое поле с ошибкой
    const errorFieldNames = Object.keys(errors) as Array<keyof typeof errors>
    const firstErrorField = errorFieldNames[0]

    if (firstErrorField) {
      // Небольшая задержка для рендеринга сообщений об ошибках
      setTimeout(() => {
        const fieldElement = document.querySelector(`[data-field-name="${firstErrorField}"]`)

        if (fieldElement) {
          // Добавляем класс shake для анимации
          fieldElement.classList.add('shake-error')

          // Плавная прокрутка к полю с ошибкой
          fieldElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })

          // Убираем класс shake через 1 секунду
          setTimeout(() => {
            fieldElement.classList.remove('shake-error')
          }, 1000)

          // Добавляем в отслеживаемые поля
          errorFieldsRef.current.add(firstErrorField)
        }
      }, 100)
    }

    setShouldScrollToError(false)
  }, [errors, shouldScrollToError])

  // Отслеживание изменений в полях с ошибками для удаления класса shake
  useEffect(() => {
    Object.keys(errors).forEach(fieldName => {
      if (!errorFieldsRef.current.has(fieldName)) {
        errorFieldsRef.current.add(fieldName)
      }
    })

    // Удаляем поля, которые больше не имеют ошибок
    Object.keys(errors).forEach(fieldName => {
      const fieldElement = document.querySelector(`[data-field-name="${fieldName}"]`)
      if (fieldElement && !errors[fieldName as keyof typeof errors]) {
        fieldElement.classList.remove('shake-error')
        errorFieldsRef.current.delete(fieldName)
      }
    })
  }, [errors])

  const onSubmit = async (data: FormValues) => {
    console.log('🚀 Formularz został przesłany. Dane:', data)
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string | Blob)
        }
      })
      attachments.forEach(preview => {
        formData.append('attachments', preview.file)
      })

      console.log('📡 Wysyłanie żądania do /api/send-email...')
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      })

      console.log('📥 Odpowiedź z serwera:', response.status, response.statusText)
      const responseData = await response.json()
      console.log('📦 Dane odpowiedzi:', responseData)

      if (!response.ok) {
        // Структурированная обработка ошибок
        const errorType = responseData.errorType || 'UNKNOWN'
        let errorMessage = 'Wystąpił błąd podczas wysyłania formularza.'

        switch (errorType) {
          case 'MISSING_CONFIG':
            errorMessage = 'Błąd konfiguracji serwera. Skontaktuj się z administratorem.'
            break
          case 'FILE_TOO_LARGE':
            errorMessage = responseData.error || 'Jeden z plików jest za duży. Maksymalny rozmiar: 25 MB.'
            if (responseData.details) {
              errorMessage += ` ${responseData.details}`
            }
            break
          case 'SMTP_ERROR':
            errorMessage = 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.'
            if (responseData.details) {
              console.error('SMTP Error details:', responseData.details)
            }
            break
          case 'INVALID_REQUEST':
            errorMessage = responseData.error || 'Nieprawidłowe dane w formularzu.'
            break
          default:
            errorMessage = responseData.error || 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.'
        }

        throw new Error(errorMessage)
      }

      console.log('✅ Formularz został wysłany pomyślnie!')

      pushFormSubmitToDataLayer('long_form', data.phone)
      setShowSuccessModal(true)
      reset(defaultFormValues)
      attachments.forEach(preview => URL.revokeObjectURL(preview.url))
      setAttachments([])
      setAttachmentError(null)
    } catch (error) {
      console.error('❌ Error submitting form:', error)

      // Более информативное сообщение об ошибке
      const errorMessage = error instanceof Error
        ? error.message
        : 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.'

      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <section
      id="formularz"
      className={`relative ${bare ? 'pt-2 pb-3 md:pb-8' : 'pt-24 md:pt-20 pb-6 md:pb-16'}`}

    >



      {/* Tło sekcji */}
      {!bare && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `var(--bg-services-card)`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-2 md:px-4 flex flex-col items-center">



        {/* Karta formularza — postrzępiony pergamin jako tło całego wrappera (rozciąga się pod pełną wysokość treści) */}
        <div className="relative w-full max-w-2xl">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/contact-form-parchment-mobile.webp" />
            <img
              src="/images/contact-form-parchment.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-fill contact-form-parchment-shadow pointer-events-none select-none"
            />
          </picture>

          <div className="relative z-10 px-7 pt-8 pb-[34px] md:px-12 md:pt-11 md:pb-[24px]">

          {/* Nagłówek formularza */}
          <div className="text-[#2f2418] text-[34px] md:text-[46px] font-cormorant font-semibold text-center leading-[1.15] mb-[23px] md:mb-[26px] drop-shadow-sm">
            {d.formTitle}
          </div>


          <form
            onSubmit={handleSubmit(onSubmit, () => {
              // При ошибках валидации запускаем прокрутку
              setShouldScrollToError(true)
            })}
            className="space-y-[17px] md:space-y-5"
          >

            {/* Imię i Telefon - Grid */}
            <div className="grid grid-cols-1 gap-[17px] md:gap-5">
              {/* Imię i nazwisko */}
              <div className="space-y-[7px]" data-field-name="name">
                <label className="block text-[#312b1f] font-lora font-semibold text-lg md:text-xl leading-[1.3]">
                  {d.nameLabel}
                </label>
                <input
                  {...register('name')}
                  placeholder={d.namePlaceholder}
                  className="w-full !bg-transparent border border-[rgba(70,45,25,0.45)] rounded-sm px-4 py-2 text-[#312b1f] text-base md:text-lg font-lora font-normal leading-[1.4] placeholder:text-[#6b5940] focus:outline-none hover:border-2 hover:border-[rgba(70,45,25,0.7)] hover:bg-[rgba(70,45,25,0.05)] hover:shadow-[0_0_4px_rgba(70,45,25,0.3)] focus:border-2 focus:border-[rgba(70,45,25,0.7)] focus:bg-[rgba(70,45,25,0.05)] focus:shadow-[0_0_4px_rgba(70,45,25,0.3)] transition-all duration-250"

                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Telefon */}
              <div className="space-y-[7px]" data-field-name="phone">
                <label className="block text-[#312b1f] font-lora font-semibold text-lg md:text-xl leading-[1.3]">
                  {(() => {
                    const { main, note } = splitLabelNote(d.phoneLabel)
                    return (
                      <>
                        {main}
                        {note && (
                          <span className="font-normal text-[13px] md:text-[15px] text-[#6b5940]"> {note}</span>
                        )}
                      </>
                    )
                  })()}
                </label>
                <div>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomPhoneInput
                        value={field.value || ''}
                        onChange={field.onChange}
                        locale={resolvedLocale}
                        alwaysRow
                      />
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm ml-[calc(58%+6px)] sm:ml-[292px]">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-[7px]" data-field-name="email">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                {d.emailLabel}
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="jan.kowalski@example.com"
                className="w-full !bg-transparent border border-[rgba(70,45,25,0.45)] rounded-sm px-4 py-2 text-black text-base md:text-lg font-sans font-normal leading-[1.4] placeholder:font-lora placeholder:text-[#6b5940] focus:outline-none hover:border-2 hover:border-[rgba(70,45,25,0.7)] hover:bg-[rgba(70,45,25,0.05)] hover:shadow-[0_0_4px_rgba(70,45,25,0.3)] focus:border-2 focus:border-[rgba(70,45,25,0.7)] focus:bg-[rgba(70,45,25,0.05)] focus:shadow-[0_0_4px_rgba(70,45,25,0.3)] transition-all duration-250"

              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Adres */}
            <div className="space-y-[7px]" data-field-name="address">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                {d.addressLabel}
              </label>
              <input
                {...register('address')}
                placeholder={d.addressPlaceholder}
                className="w-full !bg-transparent border border-[rgba(70,45,25,0.45)] rounded-sm px-4 py-2 text-black text-base md:text-lg font-sans font-normal leading-[1.4] placeholder:font-lora placeholder:text-[#6b5940] focus:outline-none hover:border-2 hover:border-[rgba(70,45,25,0.7)] hover:bg-[rgba(70,45,25,0.05)] hover:shadow-[0_0_4px_rgba(70,45,25,0.3)] focus:border-2 focus:border-[rgba(70,45,25,0.7)] focus:bg-[rgba(70,45,25,0.05)] focus:shadow-[0_0_4px_rgba(70,45,25,0.3)] transition-all duration-250"

              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>



            {/* Opis problemu */}
            <div className="space-y-[7px]" data-field-name="problemDescription">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                {d.problemLabel}
              </label>
              <textarea
                {...register('problemDescription')}
                rows={4}
                placeholder={d.problemPlaceholder}
                className="w-full !bg-transparent border border-[rgba(70,45,25,0.45)] rounded-sm px-4 py-2 text-black text-base md:text-lg font-sans font-normal leading-[1.4] placeholder:font-lora placeholder:text-[#6b5940] focus:outline-none hover:border-2 hover:border-[rgba(70,45,25,0.7)] hover:bg-[rgba(70,45,25,0.05)] hover:shadow-[0_0_4px_rgba(70,45,25,0.3)] focus:border-2 focus:border-[rgba(70,45,25,0.7)] focus:bg-[rgba(70,45,25,0.05)] focus:shadow-[0_0_4px_rgba(70,45,25,0.3)] transition-all duration-250"

              />
              {errors.problemDescription && (
                <p className="text-red-600 text-sm">{errors.problemDescription.message}</p>
              )}
            </div>

            {/* Załączniki — plakietka pergaminowa wspólna dla PL/UK/RU (ten sam spinacz,
                czcionka, kolor i styl), ale szerokość podłoża dobrana osobno pod długość
                tekstu każdego języka, etykieta nakładana przez HTML/CSS z d.attachLabel. */}
            <div className="space-y-[7px]">
              <div className="flex justify-start">
                <label
                  htmlFor="attachments"
                  className="group relative -ml-3 md:-ml-4 inline-block cursor-pointer transition-transform duration-250 hover:scale-[1.02]"
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`/images/contact-form-attach-button-${resolvedLocale}-mobile.webp`} />
                    <img
                      src={`/images/contact-form-attach-button-${resolvedLocale}.webp`}
                      alt={d.attachLabel}
                      draggable={false}
                      className="h-[42px] md:h-[52px] w-auto select-none drop-shadow-[2px_4px_5px_rgba(35,18,8,0.3)] group-hover:drop-shadow-[3px_6px_7px_rgba(35,18,8,0.4)] transition-[filter] duration-250"
                    />
                  </picture>
                  <span
                    className="absolute left-[40px] md:left-[47px] right-[16px] top-[41%] -translate-y-1/2 select-none pointer-events-none whitespace-nowrap text-center font-lora font-semibold text-[13px] md:text-[17px] text-[#412612]"
                  >
                    {d.attachLabel}
                  </span>
                </label>
              </div>
              {d.attachHint && (
                <p className="text-black text-sm italic font-sans">
                  {d.attachHint}
                </p>
              )}

              <input
                id="attachments"
                type="file"
                accept="image/*,video/*,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
                multiple
                className="hidden"
                onChange={event => {
                  const files = Array.from(event.target.files ?? [])
                  if (!files.length) return

                  let error: string | null = null
                  const nextPreviews: AttachmentPreview[] = []

                  files.forEach(file => {
                    const typeValid = ACCEPTED_PREFIXES.some(prefix => file.type.startsWith(prefix))
                    const sizeValid = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024

                    if (!typeValid) {
                      error = d.fileTypeError
                      return
                    }

                    if (!sizeValid) {
                      error = d.fileSizeError(file.name, MAX_FILE_SIZE_MB)
                      return
                    }

                    const kind = file.type.startsWith('image/')
                      ? 'image'
                      : file.type.startsWith('video/')
                        ? 'video'
                        : 'file'

                    nextPreviews.push({
                      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
                      file,
                      url: URL.createObjectURL(file),
                      kind,
                    })
                  })

                  setAttachmentError(error)
                  if (nextPreviews.length) {
                    setAttachments(prev => [...prev, ...nextPreviews])
                  }
                  event.target.value = ''
                }}
              />

              {attachments.length > 0 && (
                <div className="bg-white/5 border border-[#3a2e24]/20 rounded-lg p-3 space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {attachments.map(preview => (
                      <div key={preview.id} className="relative group">
                        <button
                          type="button"
                          onClick={() => {
                            setAttachments(prev => {
                              const rest = prev.filter(item => {
                                if (item.id === preview.id) {
                                  URL.revokeObjectURL(item.url)
                                }
                                return item.id !== preview.id
                              })
                              return rest
                            })
                          }}
                          className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Usuń ${preview.file.name}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="w-full aspect-video border border-[#3a2e24]/30 rounded-md overflow-hidden bg-black/20 flex items-center justify-center">
                          {preview.kind === 'image' ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={preview.url}
                              alt={preview.file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-[#bfa76a] text-xs text-center px-2 leading-tight">
                              <p className="font-semibold mb-1">
                                {preview.kind === 'video' ? 'VIDEO' : 'PLIK'}
                              </p>
                              <p className="break-all">{preview.file.name}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {attachmentError && <p className="text-red-600 text-sm">{attachmentError}</p>}
            </div>

            {/* Checkboxy */}
            <div className="space-y-3 pt-1">

              <div className="space-y-1" data-field-name="agreements">
                <Controller
                  name="agreements"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      id="agreements"
                      name="agreements"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      label={
                        <>
                          {d.agreementConfirm}{' '}
                          <Link href={d.privacyHref} className="underline hover:text-black/70">
                            {d.privacyLink}
                          </Link>{' '}
                          {d.agreementConnector}{' '}
                          <Link href={d.termsHref} className="underline hover:text-black/70">
                            {d.termsLink}
                          </Link>{' '}
                          {d.agreementEnd}
                        </>
                      }
                    />
                  )}
                />
                {errors.agreements && (
                  <p className="text-red-600 text-sm ml-8 shake-error">
                    {errors.agreements.message}
                  </p>
                )}

              </div>
            </div>

            {/* Przycisk Submit — pieczęć woskowa wspólna dla PL/UK/RU (grafika bez wypalonego
                tekstu), słowo na pieczęci nakładane przez HTML/CSS z d.submitButtonSeal.
                Sznurki celowo zwisają poza dolną krawędź kartki: pieczęć jest w normalnym
                przepływie, ale ujemny margines dolny odcina "sznurkową" część z wysokości
                przepływu, więc pergamin (który dopasowuje się do wysokości treści) kończy się
                tuż pod pieczęcią, a sznurki wizualnie zwisają nad ciemnym tłem. */}
            <div className="!mt-[7px] flex justify-center">
              <div className="translate-x-1/4 flex">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={d.submitButton}
                  className="group relative flex-shrink-0 cursor-pointer ml-[18px] md:ml-[24px] mb-[-71px] md:mb-[-92px] rounded-full disabled:opacity-60 transition-transform duration-250 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C69556]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/images/contact-form-seal-mobile.webp" />
                    <img
                      src="/images/contact-form-seal.webp"
                      alt={d.submitButton}
                      draggable={false}
                      className="w-[108px] md:w-[140px] h-auto select-none drop-shadow-[5px_11px_9px_rgba(35,18,8,0.42)] group-hover:drop-shadow-[6px_13px_11px_rgba(35,18,8,0.5)] transition-[filter] duration-250"
                    />
                  </picture>
                  {!isSubmitting && (
                    <span
                      className={`absolute left-1/2 top-[29%] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none whitespace-nowrap font-cormorant font-bold tracking-[-0.02em] text-[#b68d60] ${resolvedLocale === 'pl' ? 'text-[28px] md:text-[36px]' : 'text-[16px] md:text-[22px]'}`}
                      style={{ textShadow: '0px 1px 1px rgba(40,15,5,0.7), 0px -1px 0px rgba(255,220,150,0.3)' }}
                    >
                      {d.submitButtonSeal}
                    </span>
                  )}
                  {isSubmitting && (
                    <span className="absolute inset-x-0 top-[30%] flex items-center justify-center">
                      <Loader2 className="animate-spin h-6 w-6 text-[#F6E5C3] drop-shadow" />
                    </span>
                  )}
                </button>
              </div>
            </div>

          </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CompactSuccessModal
        isOpen={showSuccessModal}
        onClose={onCloseSuccessModal}
        title={d.successTitle}
        text={d.successText}
      />
    </section >
  )
}
