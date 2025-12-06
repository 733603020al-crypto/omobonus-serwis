'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast, Toaster } from 'sonner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import manifest from '@/config/KANONICZNY_MANIFEST.json'
import { CustomRadio } from '@/components/ui/custom-radio'
import { CustomCheckbox } from '@/components/ui/custom-checkbox'

// Schemat walidacji Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Imię i nazwisko musi mieć min. 2 znaki' }),
  phone: z.string().min(9, { message: 'Numer telefonu jest za krótki' }),
  email: z.string().email({ message: 'Niepoprawny adres e-mail' }),
  address: z.string().min(5, { message: 'Adres musi mieć min. 5 znaków' }),
  deviceType: z.enum(['printer', 'computer', 'other'], { message: 'Wybierz typ urządzenia' }),
  deviceModel: z.string().optional(),
  problemDescription: z.string().min(10, { message: 'Opis problemu musi mieć min. 10 znaków' }),
  replacementPrinter: z.boolean(),
  agreements: z.literal(true, { message: 'Musisz zaakceptować regulamin' }),
})

type FormValues = z.infer<typeof formSchema>

export function ContactTest() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      deviceType: undefined,
      deviceModel: '',
      problemDescription: '',
      replacementPrinter: false,
      agreements: undefined,
    },
  })

  // Принудительное применение прозрачного фона после автозаполнения
  useEffect(() => {
    const fixAutofillStyles = () => {
      if (formRef.current) {
        const inputs = formRef.current.querySelectorAll<HTMLInputElement>(
          'input[type="text"], input[type="email"], input[type="tel"]'
        )
        
        inputs.forEach((input) => {
          // Функция для применения прозрачного фона
          const applyTransparent = () => {
            input.style.setProperty('background-color', 'transparent', 'important')
            input.style.setProperty('background', 'transparent', 'important')
            input.style.setProperty('-webkit-box-shadow', '0 0 0 1000px transparent inset', 'important')
            input.style.setProperty('box-shadow', '0 0 0 1000px transparent inset', 'important')
          }
          
          // Применяем сразу
          applyTransparent()
          
          // Обработчики событий
          input.addEventListener('input', applyTransparent)
          input.addEventListener('change', applyTransparent)
          input.addEventListener('focus', applyTransparent)
          input.addEventListener('blur', applyTransparent)
          
          // Обработчик для автозаполнения (когда браузер применяет стили)
          const observer = new MutationObserver(() => {
            // Проверяем, есть ли класс автозаполнения
            if (input.matches(':-webkit-autofill')) {
              applyTransparent()
            }
          })
          
          observer.observe(input, {
            attributes: true,
            attributeFilter: ['style', 'class'],
            childList: false,
            subtree: false,
          })
          
          // Проверяем каждые 100мс в течение первых 2 секунд (время, когда браузер применяет автозаполнение)
          let checkCount = 0
          const checkInterval = setInterval(() => {
            applyTransparent()
            checkCount++
            if (checkCount >= 20) {
              clearInterval(checkInterval)
            }
          }, 100)
        })
      }
    }

    // Применяем с задержкой, чтобы форма успела отрендериться
    const timer = setTimeout(fixAutofillStyles, 100)
    const timer2 = setTimeout(fixAutofillStyles, 500)
    const timer3 = setTimeout(fixAutofillStyles, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Zgłoszenie wysłane pomyślnie!')
        reset()
      } else {
        toast.error(result.error || 'Wystąpił błąd podczas wysyłania zgłoszenia')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Wystąpił błąd podczas wysyłania zgłoszenia')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt-test" className="relative pb-6 md:pb-10 pt-0">
      <Toaster position="bottom-center" />
      
      {/* Tło sekcji */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.services_background}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        
        {/* Tekst nad formularzem */}
        <p className="text-[22px] text-[#fff8e7] font-cormorant italic font-semibold text-center mb-8 drop-shadow-2xl pt-4 md:pt-6">
          &ldquo;Chcesz zamówić serwis lub potrzebujesz wsparcia? Napisz lub zadzwoń&rdquo;
        </p>

        {/* Karta formularza */}
        <div className="w-full max-w-3xl bg-paper-texture shadow-2xl rounded-sm p-4 md:p-6 border border-black/20 scale-[0.8] origin-top">
          
          {/* Nagłówek formularza */}
          <h2 className="text-black text-3xl md:text-4xl font-cormorant italic font-bold text-center mb-4 md:mb-5 border-b border-black/10 pb-3 md:pb-3">
            Formularz zgłoszeniowy (TEST - Nowa wersja)
          </h2>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
            
            {/* Imię i Telefon - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Imię i nazwisko */}
              <div className="space-y-2">
                <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                  Imię i nazwisko
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Jan Kowalski"
                  autoComplete="off"
                  className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-lg md:text-xl text-black font-sans font-medium placeholder:text-black/50 focus:outline-none focus:!bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-all resize-y"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Telefon */}
              <div className="space-y-2">
                <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                  Numer telefonu
                </label>
                <div className="phone-input-container">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        country={'pl'}
                        value={field.value}
                        onChange={(phone) => field.onChange(phone)}
                        onlyCountries={['ua', 'pl', 'de', 'cz', 'sk', 'lt', 'gb']}
                        preferredCountries={['ua']}
                        inputClass="!w-full !bg-transparent !border-black/60 !text-black !text-lg md:!text-xl !font-sans !font-medium !h-[42px] !rounded-sm !pl-[48px]"
                        buttonClass="!bg-transparent !border-black/60 !rounded-l-sm !border-r-0"
                        dropdownClass="!text-black paper-dropdown-bg"
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
            <div className="space-y-2">
              <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                Adres e-mail
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="jan.kowalski@example.com"
                autoComplete="off"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-lg md:text-xl text-black font-sans font-medium placeholder:text-black/50 focus:outline-none focus:!bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Adres */}
            <div className="space-y-2">
              <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                Adres
              </label>
              <input
                {...register('address')}
                type="text"
                placeholder="ul. Przykładowa 1, 50-001 Wrocław"
                autoComplete="off"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-lg md:text-xl text-black font-sans font-medium placeholder:text-black/50 focus:outline-none focus:!bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
              {errors.address && (
                <p className="text-red-600 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Typ urządzenia */}
            <div className="space-y-2">
              <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl mb-2">
                Typ urządzenia
              </label>
              <div className="flex flex-wrap gap-6">
                <Controller
                  name="deviceType"
                  control={control}
                  render={({ field }) => (
                    <CustomRadio
                      {...field}
                      id="deviceType-printer"
                      value="printer"
                      checked={field.value === 'printer'}
                      label="Drukarka"
                    />
                  )}
                />
                <Controller
                  name="deviceType"
                  control={control}
                  render={({ field }) => (
                    <CustomRadio
                      {...field}
                      id="deviceType-computer"
                      value="computer"
                      checked={field.value === 'computer'}
                      label="Komputer / Laptop"
                    />
                  )}
                />
                <Controller
                  name="deviceType"
                  control={control}
                  render={({ field }) => (
                    <CustomRadio
                      {...field}
                      id="deviceType-other"
                      value="other"
                      checked={field.value === 'other'}
                      label="Inne urządzenie"
                    />
                  )}
                />
              </div>
              {errors.deviceType && (
                <p className="text-red-600 text-sm">{errors.deviceType.message}</p>
              )}
            </div>

            {/* Model urządzenia */}
            <div className="space-y-2">
              <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                Model urządzenia
              </label>
              <input
                {...register('deviceModel')}
                type="text"
                placeholder="np. HP LaserJet Pro M404dn"
                autoComplete="off"
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-lg md:text-xl text-black font-sans font-medium placeholder:text-black/50 focus:outline-none focus:!bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>

            {/* Opis problemu */}
            <div className="space-y-2">
              <label className="block text-black font-bold font-cormorant italic text-xl md:text-2xl">
                Opis problemu
              </label>
              <textarea
                {...register('problemDescription')}
                rows={4}
                placeholder="Proszę opisać problem z urządzeniem..."
                className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-lg md:text-xl text-black font-sans font-medium placeholder:text-black/50 focus:outline-none focus:!bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-all resize-y"
              />
              {errors.problemDescription && (
                <p className="text-red-600 text-sm">{errors.problemDescription.message}</p>
              )}
            </div>

            {/* Checkboxy */}
            <div className="space-y-3 pt-1">
              <Controller
                name="replacementPrinter"
                control={control}
                render={({ field }) => (
                  <CustomCheckbox
                    id="replacementPrinter"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    name={field.name}
                    label="Potrzebuję drukarki zastępczej na czas naprawy."
                  />
                )}
              />

              <div className="space-y-1">
                <Controller
                  name="agreements"
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      id="agreements"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      name={field.name}
                      label={
                        <span className="text-lg">
                          Oświadczam, że zapoznałem/am się z{' '}
                          <Link href="/polityka-prywatnosci" className="underline hover:text-black hover:font-bold transition-all">
                            Polityką Prywatności
                          </Link>{' '}
                          oraz{' '}
                          <Link href="/regulamin" className="underline hover:text-black hover:font-bold transition-all">
                            Regulaminem
                          </Link>{' '}
                          i akceptuję ich postanowienia.
                        </span>
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
                className="text-[22px] text-black font-cormorant px-6 py-2.5 rounded-full bg-transparent border border-black hover:bg-black/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="animate-spin h-5 w-5" />}
                Wyślij zgłoszenie
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}

