'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { countries, Country, formatPhoneNumber } from '@/lib/countries'
import manifest from '@/config/manifest'

interface CustomPhoneInputProps {
  value: string
  onChange: (value: string) => void
  onCountryChange?: (data: { name: string; dialCode: string; phoneLength?: number }) => void
  className?: string
  variant?: 'light' | 'dark'
  locale?: 'pl' | 'uk'
}

const DEFAULT_COUNTRY = countries[1]

export function CustomPhoneInput({ value, onChange, onCountryChange, className = '', variant = 'light', locale = 'pl' }: CustomPhoneInputProps) {
  const dark = variant === 'dark'
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY) // По умолчанию Польша
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectorRowRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setMounted(true) }, [])

  // Закрываем dropdown при скролле или resize — портал не двигается вместе со страницей
  useEffect(() => {
    if (!isDropdownOpen) return
    const close = () => setIsDropdownOpen(false)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [isDropdownOpen])

  // Инициализация: извлекаем код страны и номер из value
  useEffect(() => {
    if (!value) {
      setSelectedCountry(DEFAULT_COUNTRY)
      setPhoneNumber('')
      return
    }

    // Ищем страну по коду
    const country = countries.find(c => value.startsWith(c.dialCode))
    if (country) {
      setSelectedCountry(country)
      const number = value.replace(country.dialCode, '').trim().replace(/\D/g, '')
      if (country.phoneFormat && number.length > 0) {
        const formatted = formatPhoneNumber(number, country.phoneFormat)
        setPhoneNumber(formatted)
      } else {
        setPhoneNumber(number)
      }
    } else {
      setSelectedCountry(DEFAULT_COUNTRY)
      setPhoneNumber(value)
    }
  }, [value])


  // Закрытие выпадающего списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const inContainer = containerRef.current?.contains(target)
      const inDropdown = dropdownRef.current?.contains(target)
      if (!inContainer && !inDropdown) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const calculateMaxDropdownWidth = () => {
    // Фиксированная ширина на основе максимального содержимого
    return 280
  }
  const fixedDropdownWidth = calculateMaxDropdownWidth()

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    setPhoneNumber('')
    onChange(country.dialCode ? country.dialCode : '')
    onCountryChange?.({ name: country.name, dialCode: country.dialCode, phoneLength: country.phoneLength })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    // Удаляем все нецифровые символы
    const digits = inputValue.replace(/\D/g, '')

    // Если выбрана страна "other", просто сохраняем как есть
    if (selectedCountry.code === 'other') {
      setPhoneNumber(inputValue)
      onChange(inputValue)
      return
    }

    // Ограничиваем длину номера
    if (selectedCountry.phoneLength && digits.length > selectedCountry.phoneLength) {
      return
    }

    // Форматируем номер, если есть формат
    let formatted = digits
    if (selectedCountry.phoneFormat && digits.length > 0) {
      formatted = formatPhoneNumber(digits, selectedCountry.phoneFormat)
    }

    // Сохраняем отформатированный номер для отображения
    setPhoneNumber(formatted)

    // Объединяем код страны и номер для отправки
    const fullPhone = selectedCountry.dialCode ? `${selectedCountry.dialCode}${formatted.replace(/\s/g, '')}` : formatted
    onChange(fullPhone)
  }

  const getPlaceholder = () => {
    if (selectedCountry.code === 'other') {
      return 'Wprowadź numer'
    }
    if (selectedCountry.phoneFormat) {
      return selectedCountry.phoneFormat
    }
    return 'xxx xxx xxx' // fallback
  }

  const getCountryLabel = (country: Country) =>
    locale === 'uk' && country.nameUk ? country.nameUk : country.name

  const selectedLabel = getCountryLabel(selectedCountry)
  const displayName = selectedLabel.length > 12 && locale !== 'uk'
    ? selectedCountry.shortName
    : selectedLabel

  // Список стран — общий для обоих вариантов
  const countryListItems = countries.map((country) => (
    <button
      key={country.code}
      type="button"
      onClick={() => handleCountrySelect(country)}
      aria-label={`Wybierz ${getCountryLabel(country)}`}
      className={
        dark
          ? 'group flex items-center gap-3 px-3 py-2 transition-all duration-300 ease-out text-left whitespace-nowrap w-full border border-transparent hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)]'
          : 'flex items-center gap-3 px-4 py-3 hover:bg-black/5 transition-colors text-left whitespace-nowrap w-full'
      }
    >
      <Image
        src={country.flagImage}
        alt={getCountryLabel(country)}
        width={24}
        height={18}
        className="object-contain flex-shrink-0"
      />
      <span className={`flex-1 font-sans font-light text-sm ${dark ? 'text-[#f3df9a] group-hover:text-white transition-colors duration-200' : 'text-black text-base'}`}>
        {getCountryLabel(country)}
      </span>
      {country.dialCode && (
        <span className={`font-sans text-sm whitespace-nowrap ${dark ? 'text-[#bfa76a] group-hover:text-white transition-colors duration-200' : 'text-black opacity-70'}`}>
          {country.dialCode}
        </span>
      )}
    </button>
  ))

  return (
    <>
      <div
        ref={containerRef}
        className={`w-full flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 ${className}`}
      >
        {/* Обёртка кнопки — relative, чтобы light-dropdown позиционировался под ней */}
        <div className={`relative w-full ${dark ? '' : 'sm:w-[280px] sm:min-w-[280px] sm:flex-shrink-0'}`}>
          <button
            type="button"
            ref={selectorRowRef}
            onClick={() => {
              if (dark && selectorRowRef.current) {
                const rect = selectorRowRef.current.getBoundingClientRect()
                setDropdownPos({
                  top: rect.bottom + 2,
                  left: rect.left,
                  width: rect.width,
                })
              }
              setIsDropdownOpen(!isDropdownOpen)
            }}
            aria-label={`Wybierz kraj, aktualnie wybrano: ${selectedLabel}`}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            className={dark
              ? 'group flex items-center gap-3 border border-[#bfa76a]/40 rounded-sm px-3 py-2 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] focus:border-[#bfa76a]/80 w-full'
              : 'group flex items-center gap-3 border border-black/60 rounded-sm px-4 py-2 cursor-pointer hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250 w-full'
            }
            style={{ height: '42px' }}
          >
            <Image
              src={selectedCountry.flagImage}
              alt={selectedLabel}
              width={20}
              height={15}
              className="object-contain flex-shrink-0 pointer-events-none"
              style={{ width: '20px', height: '15px' }}
            />
            <span className={`${dark ? 'text-white text-sm' : 'text-black text-base'} font-sans font-medium leading-tight whitespace-nowrap pointer-events-none min-w-0`}>
              {displayName || selectedLabel}
            </span>
            {selectedCountry.dialCode ? (
              <span className={`${dark ? 'text-white text-sm' : 'text-black text-base'} font-sans font-medium whitespace-nowrap flex-shrink-0 pointer-events-none ml-auto`}>
                {selectedCountry.dialCode}
              </span>
            ) : (
              <span className={`${dark ? 'text-white/40 text-sm' : 'text-black text-base'} font-sans font-medium whitespace-nowrap opacity-50 flex-shrink-0 pointer-events-none ml-auto`}>
                +
              </span>
            )}
            <svg
              className="arrow-icon pointer-events-none flex-shrink-0"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L1 4h10L6 9z"
                fill={dark ? 'rgba(255,255,255,0.6)' : '#000000'}
              />
            </svg>
          </button>

          {/* Light variant: inline absolute dropdown */}
          {!dark && isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-1 z-[9999] border border-black/20 rounded-lg shadow-lg max-h-64 overflow-y-auto country-list"
              style={{ width: `${fixedDropdownWidth}px`, minWidth: `${fixedDropdownWidth}px` }}
            >
              {countryListItems}
            </div>
          )}
        </div>

        {/* Поле ввода номера */}
        <div className="flex-1 w-full">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={getPlaceholder()}
            className={dark
              ? 'dark-phone-input w-full border border-[#bfa76a]/40 rounded-sm px-4 py-2 text-base font-sans font-medium placeholder:font-normal placeholder:text-white/30 focus:outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:shadow-[0_0_20px_rgba(191,167,106,0.35)] focus:border-[#bfa76a]/80'
              : 'w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium placeholder:font-normal placeholder:text-black/15 focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250 mt-2 sm:mt-0'
            }
            style={dark ? {
              backgroundColor: 'rgb(10, 8, 5)',
              height: '42px',
              color: '#ffffff',
              WebkitTextFillColor: '#ffffff',
              caretColor: '#ffffff',
            } : {
              backgroundColor: 'transparent',
              height: '42px',
            }}
          />
        </div>
      </div>

      {/* Dark variant: Portal dropdown — рендерится в document.body, вне всех stacking contexts */}
      {dark && isDropdownOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          className="rounded-lg border border-[rgba(200,169,107,0.5)] overflow-hidden"
          style={{
            position: 'fixed',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width || fixedDropdownWidth,
            zIndex: 99999,
            boxShadow: '0 8px 40px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,169,107,0.12)',
          }}
        >
          {/* Текстура фона — тот же паттерн, что в CardBg */}
          <img
            src={manifest.Background_1}
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Затемнение поверх текстуры */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
          {/* Список стран */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {countryListItems}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
