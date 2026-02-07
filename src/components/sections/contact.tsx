'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Paperclip, X } from 'lucide-react'
import Link from 'next/link'
import manifest from '@/config/manifest'
import { CustomPhoneInput } from '@/components/ui/custom-phone-input'
import { CustomCheckbox } from '@/components/ui/custom-checkbox'
import { SuccessModal } from '@/components/ui/success-modal'

// Schemat walidacji Zod
const formSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(9, { message: 'Numer telefonu jest za krótki' }),
  email: z.string().optional(),
  address: z.string().optional(),
  problemDescription: z.string().optional(),
  agreements: z.literal(true, { message: 'Musisz zaakceptować regulamin' }),
})

type FormValues = z.infer<typeof formSchema>

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

export function Contact() {
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
      className="relative pb-6 md:pb-10 pt-24 md:pt-20"
    >



      {/* Tło sekcji */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.services_background
            }')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div >

      <div className="relative z-10 container mx-auto px-2 md:px-4 flex flex-col items-center">



        {/* Karta formularza - масштабирована на 20% */}
        <div className="w-full max-w-3xl bg-paper-texture shadow-2xl rounded-sm p-4 md:p-6 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top mb-0 -mb-12 md:-mb-[15%]">



          {/* Nagłówek formularza */}
          <div className="text-black text-3xl md:text-4xl font-cormorant font-bold text-center mb-4 md:mb-5 drop-shadow-sm">
            Formularz zgłoszeniowy
          </div>


          <form
            onSubmit={handleSubmit(onSubmit, () => {
              // При ошибках валидации запускаем прокрутку
              setShouldScrollToError(true)
            })}
            className="space-y-3 md:space-y-4"
          >

            {/* Imię i Telefon - Grid */}
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {/* Imię i nazwisko */}
              <div className="space-y-2" data-field-name="name">
                <label className="block text-black font-bold font-sans text-base md:text-lg">
                  Imię i nazwisko
                </label>
                <input
                  {...register('name')}
                  placeholder="Jan Kowalski"
                  className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250"

                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Telefon */}
              <div className="space-y-2" data-field-name="phone">
                <label className="block text-black font-bold font-sans text-base md:text-lg">
                  Numer telefonu
                </label>
                <div>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomPhoneInput
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-2" data-field-name="email">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                Adres e-mail
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="jan.kowalski@example.com"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250"

              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Adres */}
            <div className="space-y-2" data-field-name="address">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                Adres
              </label>
              <input
                {...register('address')}
                placeholder="ul. Przykładowa 1, 50-001 Wrocław"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250"

              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>



            {/* Opis problemu */}
            <div className="space-y-2" data-field-name="problemDescription">
              <label className="block text-black font-bold font-sans text-base md:text-lg">
                Opis problemu (usterki)
              </label>
              <textarea
                {...register('problemDescription')}
                rows={4}
                placeholder="Model urządzenia + opis problemu (np. HP M404dn – drukarka nie pobiera papieru)"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250"

              />
              {errors.problemDescription && (
                <p className="text-red-600 text-sm">{errors.problemDescription.message}</p>
              )}
            </div>

            {/* Załączniki */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <label className="text-black font-bold font-sans text-base md:text-lg">
                  Załącz zdjęcia / filmy (opcjonalnie)
                </label>
                <label
                  htmlFor="attachments"
                  className="inline-flex items-center gap-1 text-[#3a2e24] text-sm font-semibold cursor-pointer border border-[#3a2e24]/40 rounded-full px-3 py-1 hover:bg-[#3a2e24]/10 transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                  Dodaj
                </label>
              </div>
              <p className="text-red-600 text-sm italic font-sans">
                Załączone pliki pomogą nam szybciej i dokładniej zidentyfikować problem oraz
                przygotować wycenę naprawy.
              </p>
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
                      error = 'Możesz przesłać tylko zdjęcia lub wideo.'
                      return
                    }

                    if (!sizeValid) {
                      error = `Plik ${file.name} jest zbyt duży (maks. ${MAX_FILE_SIZE_MB} MB).`
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
                          Potwierdzam, że zapoznałem/am się z{' '}
                          <Link href="/polityka-prywatnosci" className="underline hover:text-black/70">
                            Polityką Prywatności
                          </Link>{' '}
                          oraz{' '}
                          <Link href="/regulamin" className="underline hover:text-black/70">
                            Regulaminem
                          </Link>{' '}
                          i akceptuję ich postanowienia.
                        </>
                      }
                    />
                  )}
                />
                {errors.agreements && (
                  <p className="text-red-600 text-sm ml-8">{errors.agreements.message}</p>
                )}
              </div>
            </div>

            {/* Przycisk Submit */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group px-10 py-3 bg-white/10 hover:bg-white/20 border border-black/30 hover:border-2 hover:border-black/80 hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.1),0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:shadow-[inset_0_0_20px_rgba(0,0,0,0.1),0_0_4px_rgba(0,0,0,0.3)] rounded-full transition-all duration-250"
              >
                <span className="font-cormorant font-bold text-2xl text-black tracking-wide group-hover:text-black/80 flex items-center gap-2">
                  {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
                  Wyślij zgłoszenie
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={onCloseSuccessModal} />
    </section >
  )
}
