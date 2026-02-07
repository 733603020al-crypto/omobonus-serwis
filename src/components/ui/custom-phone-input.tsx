'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { countries, Country, formatPhoneNumber } from '@/lib/countries'

interface CustomPhoneInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const DEFAULT_COUNTRY = countries[1]

export function CustomPhoneInput({ value, onChange, className = '' }: CustomPhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY) // По умолчанию Польша
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const selectorRowRef = useRef<HTMLButtonElement>(null)

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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    // Флаг (20px) + gap (8px) + максимальное название страны (~150px) + gap (8px) + код (~50px) + кнопка (20px) + padding (32px)
    return 280
  }
  const fixedDropdownWidth = calculateMaxDropdownWidth()

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    setPhoneNumber('') // Clear phone number on country change
    onChange(country.dialCode ? country.dialCode : '') // Set only dial code
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

  const displayName = selectedCountry.name.length > 12
    ? selectedCountry.shortName
    : selectedCountry.name

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 ${className}`}
    >
      {/* Первая строка: Флаг + Название + Код (справа) + Кнопка выпадающего списка */}
      <button
        type="button"
        ref={selectorRowRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label={`Wybierz kraj, aktualnie wybrano: ${selectedCountry.name}`}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
        className="group flex items-center gap-3 border border-black/60 rounded-sm px-4 py-2 cursor-pointer hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250 w-full sm:w-[280px] sm:min-w-[280px]"
        style={{ height: '42px' }}
      >
        <Image
          src={selectedCountry.flagImage}
          alt={selectedCountry.name}
          width={20}
          height={15}
          className="object-contain flex-shrink-0 pointer-events-none"
          style={{ width: '20px', height: '15px' }}
        />
        <span className="text-black font-sans font-medium text-base leading-tight whitespace-nowrap pointer-events-none min-w-0">
          {displayName || selectedCountry.name}
        </span>
        {selectedCountry.dialCode ? (
          <span className="text-black font-sans font-medium text-base whitespace-nowrap flex-shrink-0 pointer-events-none ml-auto">
            {selectedCountry.dialCode}
          </span>
        ) : (
          <span className="text-black font-sans font-medium text-base whitespace-nowrap opacity-50 flex-shrink-0 pointer-events-none ml-auto">
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
            fill="#000000"
          />
        </svg>
      </button>

      {/* Поле ввода (горизонтально рядом с селектором страны) */}
      <div className="flex-1 w-full">
        <input
          type="tel"
          value={phoneNumber} // Display only the number part
          onChange={handlePhoneChange}
          placeholder={getPlaceholder()}
          className="w-full !bg-transparent border border-black/60 rounded-sm px-4 py-2 text-black text-lg md:text-xl font-sans font-medium placeholder:font-normal placeholder:text-black/15 focus:outline-none hover:border-2 hover:border-black/80 hover:bg-[rgba(0,0,0,0.05)] hover:shadow-[0_0_4px_rgba(0,0,0,0.3)] focus:border-2 focus:border-black/80 focus:bg-[rgba(0,0,0,0.05)] focus:shadow-[0_0_4px_rgba(0,0,0,0.3)] transition-all duration-250 mt-2 sm:mt-0"
          style={{ backgroundColor: 'transparent', height: '42px' }}
        />
      </div>

      {/* Выпадающий список */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 z-50 border border-black/20 rounded-lg shadow-lg max-h-64 overflow-y-auto country-list"
          style={{
            width: `${fixedDropdownWidth}px`,
            minWidth: `${fixedDropdownWidth}px`,
          }}
        >

          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleCountrySelect(country)}
              aria-label={`Wybierz ${country.name}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-black/5 transition-colors text-left whitespace-nowrap w-full"
            >
              <Image
                src={country.flagImage}
                alt={country.name}
                width={24}
                height={18}
                className="object-contain flex-shrink-0"
              />
              <span className="flex-1 text-black font-sans font-medium text-base">
                {country.name}
              </span>
              {country.dialCode && (
                <span className="text-black font-sans text-sm opacity-70 whitespace-nowrap">
                  {country.dialCode}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
