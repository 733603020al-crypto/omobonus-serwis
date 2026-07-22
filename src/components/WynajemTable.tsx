'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { serviceAccordionI18n } from '@/lib/i18n/service-accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const WynajemTable = ({
  subcategoryId,
  headerRefs,
  serviceSlug,
  locale = 'pl',
}: {
  subcategoryId: string
  headerRefs: {
    icon: React.RefObject<HTMLDivElement | null>
    text: React.RefObject<HTMLDivElement | null>
    prices: React.RefObject<HTMLDivElement | null>[]
  }
  serviceSlug?: string
  locale?: 'pl' | 'uk' | 'ru'
}) => {
  const t = serviceAccordionI18n[locale]
  const isDrukarkaZastepcza = serviceSlug === 'drukarka-zastepcza'
  // Для a3-drukarki-mono на странице "Drukarka Zastępcza" используем ту же структуру, что и для a3-drukarki-kolor
  // На странице "Wynajem" используем subcategoryId напрямую для правильных данных tableDataA3Mono
  const effectiveSubcategoryId = (subcategoryId === 'a3-drukarki-mono' && isDrukarkaZastepcza) ? 'a3-drukarki-kolor' : subcategoryId
  const [columnWidths, setColumnWidths] = useState<{ icon: number; text: number; price1: number; price2: number; price3?: number } | null>(null)
  const [a3ReferenceWidths, setA3ReferenceWidths] = useState<{ icon: number; text: number; price1: number; price2: number } | null>(null)
  // Сохранение измерений верхнего блока для точного выравнивания нижнего блока
  const [headerMeasurements, setHeaderMeasurements] = useState<{
    iconWidth: number;
    distanceIconToText: number;
    textWidth: number;
    distanceTextToPrice1: number;
    leftPartWidth: number;
  } | null>(null)

  // Фиксированный отступ слева для выравнивания нижней таблицы под верхним рядом
  // Примерно равен расстоянию от левого края контейнера до начала иконки (12px)
  // Скорректировано визуально для идеального совпадения
  const leftOffset = 12

  useEffect(() => {
    const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
    if (!validSubcategoryIds.includes(effectiveSubcategoryId) || !headerRefs.prices[0]?.current) return

    const measureColumns = () => {
      const iconEl = headerRefs.icon.current
      const textEl = headerRefs.text.current
      const price1El = headerRefs.prices[0]?.current
      const price2El = headerRefs.prices[1]?.current
      const price3El = !isDrukarkaZastepcza ? headerRefs.prices[2]?.current : null

      if (iconEl && textEl && price1El && price2El) {
        const iconRect = iconEl.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        const price1Rect = price1El.getBoundingClientRect()
        const price2Rect = price2El.getBoundingClientRect()

        const baseWidths = {
          icon: iconRect.width,
          text: textRect.width,
          price1: price1Rect.width,
          price2: price2Rect.width,
        }

        if (isDrukarkaZastepcza) {
          setColumnWidths(baseWidths)
          // Для всех A3 подкатегорий используем одинаковую логику выравнивания
          const a3SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
          if (a3SubcategoryIds.includes(subcategoryId)) {
            // Приоритет: если это a3-drukarki-kolor (или a3-drukarki-mono на странице Drukarka Zastępcza, который обрабатывается как kolor), всегда обновляем эталон
            // Для MFU A3 подкатегорий: всегда используем a3-mfu-mono как эталон для синхронизации ширины между mono и mono+kolor
            const isMfuMono = subcategoryId === 'a3-mfu-mono'
            const isMfuKolor = subcategoryId === 'a3-mfu-kolor'
            if (effectiveSubcategoryId === 'a3-drukarki-kolor' || isMfuMono || (!a3ReferenceWidths && !isMfuKolor)) {
              setA3ReferenceWidths(baseWidths)
            }
            // Для a3-mfu-kolor не устанавливаем a3ReferenceWidths - используем значение от a3-mfu-mono для полной синхронизации
          }
        } else if (price3El) {
          const price3Rect = price3El.getBoundingClientRect()
          setColumnWidths({
            ...baseWidths,
            price3: price3Rect.width,
          })
        }
      }
    }

    // Задержка для обеспечения рендеринга элементов
    const timeoutId1 = setTimeout(measureColumns, 50)
    const timeoutId2 = setTimeout(measureColumns, 200)
    const timeoutId3 = setTimeout(measureColumns, 500)

    // Измерение структуры заголовка для всех A3/A4 подкатегорий на Drukarka Zastępcza
    const measureHeader = () => {
      const iconEl = headerRefs.icon.current
      const textEl = headerRefs.text.current
      const price1El = headerRefs.prices[0]?.current

      if (iconEl && textEl && price1El) {
        const iconRect = iconEl.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        const price1Rect = price1El.getBoundingClientRect()

        const distanceIconToText = textRect.left - iconRect.right
        const distanceTextToPrice1 = price1Rect.left - textRect.right
        const leftPartWidth = textRect.right - iconRect.left

        // Сохраняем измерения для использования в нижнем блоке
        setHeaderMeasurements({
          iconWidth: iconRect.width,
          distanceIconToText: distanceIconToText,
          textWidth: textRect.width,
          distanceTextToPrice1: distanceTextToPrice1,
          leftPartWidth: leftPartWidth
        })
      }
    }

    // Измеряем заголовок для всех A3/A4 подкатегорий на Drukarka Zastępcza
    const a3A4SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor']
    if (isDrukarkaZastepcza && a3A4SubcategoryIds.includes(subcategoryId)) {
      setTimeout(measureHeader, 600)
      setTimeout(measureHeader, 1000)
    }

    const handleResize = () => {
      measureColumns()
      if (isDrukarkaZastepcza && a3A4SubcategoryIds.includes(subcategoryId)) {
        measureHeader()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
    }
  }, [subcategoryId, headerRefs, isDrukarkaZastepcza, effectiveSubcategoryId, a3ReferenceWidths])

  const validSubcategoryIds = ['drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor', 'a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
  if (!validSubcategoryIds.includes(subcategoryId)) return null


  // Данные для таблицы Drukarki mono
  const tableDataMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '500 str./mies.', plan2: '1 000 str./mies.', plan3: '2 500 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Duplex', plan1: '-', plan2: '- / +', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы Drukarki mono (drukarka-zastepcza) - без строки "Cena wydruku A4 mono" и "Liczba stron A4"
  const tableDataMonoDZ = [
    { label: 'Duplex', plan1: '-' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы Drukarki kolor
  const tableDataKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 000 + 0', plan2: '1 000 + 200', plan3: '2 000 + 200' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,20 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы Drukarki kolor (drukarka-zastepcza) - только один столбец (plan1) и без некоторых строк
  const tableDataKolorDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы MFU mono
  const tableDataMfuMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 500 str./mies.', plan2: '2 000 str./mies.', plan3: '3 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '40', plan3: '60' },
  ]

  // Данные для таблицы MFU kolor
  const tableDataMfuKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '1 000 + 100', plan2: '1 500 + 200', plan3: '2 000 + 300' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,05 zł', plan2: '0,05 zł', plan3: '0,04 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,20 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '20', plan2: '30', plan3: '40' },
  ]

  // Данные для таблицы MFU mono (drukarka-zastepcza) - только один столбец и без некоторых строк
  const tableDataMfuMonoDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы MFU kolor (drukarka-zastepcza) - только один столбец и без некоторых строк
  const tableDataMfuKolorDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '40' },
  ]

  // Данные для таблицы Drukarki A3/A4 mono
  const tableDataA3Mono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 500 str./mies.', plan2: '3 750 str./mies.', plan3: '5 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы Drukarki A3/A4 mono (drukarka-zastepcza) - только технические строки, один столбец
  const tableDataA3MonoDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы Drukarki A3/A4 kolor
  const tableDataA3Kolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '2 000 + 300', plan2: '3 000 + 500', plan3: '5 000 + 800' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,25 zł', plan2: '0,20 zł', plan3: '0,18 zł' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы Drukarki A3/A4 kolor (drukarka-zastepcza) - только технические строки, один столбец
  const tableDataA3KolorDZ = [
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы MFU A3/A4 mono
  const tableDataA3MfuMono = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '5 000 str./mies.', plan2: '7 000 str./mies.', plan3: '10 000 str./mies.' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы MFU A3/A4 mono (drukarka-zastepcza) - только технические строки, без заголовка "Cena wydruku format A3", один столбец
  const tableDataA3MfuMonoDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  // Данные для таблицы MFU A3/A4 kolor
  const tableDataA3MfuKolor = [
    { label: 'Liczba stron A4 wliczonych w czynsz', plan1: '5 000 + 500', plan2: '7 500 + 750', plan3: '10 000 + 1 000' },
    { label: 'Cena wydruku A4 mono (powyżej limitu)', plan1: '0,04 zł', plan2: '0,04 zł', plan3: '0,03 zł' },
    { label: 'Cena wydruku A4 kolor (powyżej limitu)', plan1: '0,16 zł', plan2: '0,16 zł', plan3: '0,15 zł' },
    { label: 'Skanowanie', plan1: 'gratis', plan2: 'gratis', plan3: 'gratis' },
    { label: 'Duplex', plan1: '+', plan2: '+', plan3: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50', plan2: '60', plan3: '90' },
  ]

  // Данные для таблицы MFU A3/A4 kolor (drukarka-zastepcza) - только технические строки, без заголовка "Cena wydruku format A3"
  // Только один столбец с данными (plan1) - второй столбец удален
  const tableDataA3MfuKolorDZ = [
    { label: 'Skanowanie', plan1: 'gratis' },
    { label: 'Duplex', plan1: '+' },
    { label: 'Prędkość druku do: (str./min)', plan1: '50' },
  ]

  let tableData =
    subcategoryId === 'drukarki-mono' ? (isDrukarkaZastepcza ? tableDataMonoDZ : tableDataMono) :
      // Для a3-drukarki-mono на странице "Drukarka Zastępcza" используем те же данные, что и для a3-drukarki-kolor, чтобы структура была идентичной
      subcategoryId === 'a3-drukarki-mono' ? (isDrukarkaZastepcza ? tableDataA3KolorDZ : tableDataA3Mono) :
        subcategoryId === 'drukarki-kolor' ? (isDrukarkaZastepcza ? tableDataKolorDZ : tableDataKolor) :
          subcategoryId === 'a3-drukarki-kolor' ? (isDrukarkaZastepcza ? tableDataA3KolorDZ : tableDataA3Kolor) :
            subcategoryId === 'mfu-mono' ? (isDrukarkaZastepcza ? tableDataMfuMonoDZ : tableDataMfuMono) :
              subcategoryId === 'a3-mfu-mono' ? (isDrukarkaZastepcza ? tableDataA3MfuMonoDZ : tableDataA3MfuMono) :
                subcategoryId === 'mfu-kolor' ? (isDrukarkaZastepcza ? tableDataMfuKolorDZ : tableDataMfuKolor) :
                  subcategoryId === 'a3-mfu-kolor' ? (isDrukarkaZastepcza ? tableDataA3MfuKolorDZ : tableDataA3MfuKolor) :
                    []

  // Для drukarka-zastepcza убираем plan3 из данных, строки "Liczba stron A4 wliczonych w czynsz", "Cena wydruku A4 mono (powyżej limitu)" и "Cena wydruku A4 kolor (powyżej limitu)" (кроме drukarki-mono, drukarki-kolor и всех A3 подкатегорий, где уже используются специальные таблицы)
  const a3SubcategoryIds = ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor']
  if (isDrukarkaZastepcza && tableData.length > 0 && subcategoryId !== 'drukarki-mono' && subcategoryId !== 'drukarki-kolor' && !a3SubcategoryIds.includes(subcategoryId)) {
    tableData = tableData
      .filter(row =>
        row.label !== 'Liczba stron A4 wliczonych w czynsz' &&
        row.label !== 'Cena wydruku A4 mono (powyżej limitu)' &&
        row.label !== 'Cena wydruku A4 kolor (powyżej limitu)'
      )
      .map(row => {
        const { plan3, ...rest } = row as { label: string; plan1: string; plan2: string; plan3: string }
        return rest
      })
  }

  // Функция для рендеринга label с переносами строк (для мобильной и десктопной версий)
  const renderLabel = (label: string, fontSize: string) => {
    if (label === 'Liczba stron A4 wliczonych w czynsz') {
      const [line1, line2] = t.wynajemTableLabels.pagesIncluded
      return <>{line1}<br />{line2}</>
    }
    else if (label === 'Cena wydruku A4 mono (powyżej limitu)') {
      const [line1, line2] = t.wynajemTableLabels.printPriceMono
      return <>{line1}<br />{line2}</>
    }
    else if (label === 'Cena wydruku A4 kolor (powyżej limitu)') {
      const [line1, line2] = t.wynajemTableLabels.printPriceColor
      return <>{line1}<br />{line2}</>
    }
    else if (label === 'Skanowanie') return t.wynajemTableLabels.scanning
    else if (label === 'Duplex') return t.wynajemTableLabels.duplex
    else if (label.startsWith('Prędkość druku do:')) return label.replace('Prędkość druku do:', t.wynajemTableLabels.printSpeedPrefix)
    return label
  }

  // Функция для рендеринга значения с суффиксом "/mies.", "/min" или "zł"
  const renderValueWithSuffix = (value: string | undefined, fontSize: string = 'text-[16px]', columnIndex: number = 0, rowLabel?: string) => {
    if (!value) return null
    const isLimitRow = rowLabel === 'Liczba stron A4 wliczonych w czynsz'
    // Для сложных значений типа "1 000 + 0" (без "str.") - разделяем на две строки
    if (value.includes(' + ') && !value.includes(' str.')) {
      const parts = value.split(' + ')
      const firstPart = parts[0].trim() // "1 000"
      const secondPart = parts[1].trim() // "0"

      // Если это строка с лимитом, добавляем подписи "mono" и "kolor"
      if (isLimitRow) {
        return (
          <div className="flex flex-col items-center">
            {/* Десктоп: числа и подписи на одной строке */}
            <div className="hidden md:flex flex-col items-center">
              {/* Первая строка: "1 000 mono" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
                <span
                  className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
                >
                  {t.wynajemUnits.mono}
                </span>
              </div>
              {/* Вторая строка: "+ 0 kolor" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
                <span
                  className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
                >
                  {t.wynajemUnits.kolor}
                </span>
              </div>
            </div>
            {/* Мобильная версия: каждое число и подпись на отдельной строке */}
            <div className="md:hidden flex flex-col items-center">
              {/* "1 000" */}
              <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
              {/* "mono" */}
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed"
              >
                {t.wynajemUnits.mono}
              </span>
              {/* "+ 0" */}
              <div className="flex items-baseline">
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
                <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
              </div>
              {/* "kolor" */}
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed"
              >
                {t.wynajemUnits.kolor}
              </span>
            </div>
          </div>
        )
      }

      // Обычная обработка (без подписей mono/kolor)
      return (
        <div className="flex flex-col items-center">
          {/* Первая строка: "1 000" */}
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{firstPart}</span>
          {/* Вторая строка: "+ 0" */}
          <div className="flex items-baseline">
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondPart}</span>
          </div>
        </div>
      )
    }

    // Для сложных значений типа "1 000 str. + 0 str." - разделяем на две строки
    if (value.includes(' + ') && value.includes(' str.')) {
      const parts = value.split(' + ')
      const firstPart = parts[0].trim() // "1 000 str."
      const secondPart = parts[1].trim() // "0 str."

      const renderStrPart = (strPart: string) => {
        const strMatch = strPart.match(/^(.+?)\s*str\.$/)
        if (strMatch) {
          const number = strMatch[1].trim()
          return (
            <div className="flex items-baseline">
              <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
              <span
                className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
              >
                {t.wynajemUnits.str}
              </span>
            </div>
          )
        }
        return <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{strPart}</span>
      }

      // Парсим вторую часть отдельно
      const secondMatch = secondPart.match(/^(.+?)\s*str\.$/)
      const secondNumber = secondMatch ? secondMatch[1].trim() : secondPart

      return (
        <div className="flex flex-col items-center">
          {/* Первая строка: "1 000 str." */}
          {renderStrPart(firstPart)}
          {/* Вторая строка: "+ 0 str." */}
          <div className="flex items-baseline">
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>+</span>
            <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)] ml-1`}>{secondNumber}</span>
            <span
              className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
            >
              {t.wynajemUnits.str}
            </span>
          </div>
        </div>
      )
    }

    // Для "500 str./mies." - разделить на две строки: число сверху, "str./mies." снизу
    if (value.includes('str./mies.')) {
      const parts = value.split('str./mies.')
      const number = parts[0].trim()
      return (
        <div className="flex flex-col items-center">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed"
          >
            {t.wynajemUnits.strPerMonth}
          </span>
        </div>
      )
    }
    // Для "20 str./min" - не переносим, но "str./min" оформляем в том же стиле
    if (value.includes('str./min')) {
      const number = value.replace(/\s*str\.\/min.*$/, '').trim()
      return (
        <span className="inline-flex items-baseline">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed ml-1"
          >
            {t.wynajemUnits.strPerMin}
          </span>
        </span>
      )
    }
    // Для "0,05 zł" - "zł" оформляем в том же стиле
    // Используем вариант A для всех колонок, с поднятием "zł" выше
    if (value.includes('zł')) {
      const number = value.replace(/\s*zł.*$/, '').trim()
      return (
        <span className="inline-flex items-start">
          <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{number}</span>
          <span
            className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5"
            style={{ marginTop: '-3px' }}
          >
            {t.wynajemUnits.currency}
          </span>
        </span>
      )
    }
    // Для остальных значений
    // Для "gratis" и "+" на странице Drukarka Zastępcza используем стиль как у "(mono A4)"
    if (isDrukarkaZastepcza && (value === 'gratis' || value === '+' || value === '-')) {
      return (
        <span
          className="text-[14px] text-[#cbb27c] leading-relaxed"
        >
          {value === 'gratis' ? t.gratisLower : value}
        </span>
      )
    }
    const displayValue = value === 'gratis' ? t.gratisLower : value
    return <span className={`font-inter ${fontSize} text-[rgba(255,255,245,0.85)]`}>{displayValue}</span>
  }

  return (
    <div
      className={cn(
        "rounded-lg outline outline-1 outline-[#bfa76a]/10 md:outline-none md:border md:border-[#bfa76a]/10 overflow-hidden"
      )}
    >
      <div
        className="overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0 px-4 md:px-0"
        ref={(el) => {
          // ВРЕМЕННО: измерение ширины родительского контейнера overflow-x-auto
          if (el && (subcategoryId === 'a3-mfu-mono' || subcategoryId === 'a3-mfu-kolor') && isDrukarkaZastepcza) {
            setTimeout(() => {
              const overflowRect = el.getBoundingClientRect()
              console.log(`[WIDTH MEASURE] ${subcategoryId} - родительский контейнер overflow-x-auto:`, {
                width: overflowRect.width
              })
            }, 150)
          }
        }}
      >
        {/* Десктоп: flex с динамическими размерами из верхнего ряда */}
        <div
          className="hidden md:block"
          style={{ marginLeft: `${leftOffset}px`, width: `calc(100% - ${leftOffset}px)` }}
          ref={(el) => {
            // ВРЕМЕННО: измерение ширины родительского контейнера md:block
            if (el && (subcategoryId === 'a3-mfu-mono' || subcategoryId === 'a3-mfu-kolor') && isDrukarkaZastepcza) {
              setTimeout(() => {
                const mdBlockRect = el.getBoundingClientRect()
                console.log(`[WIDTH MEASURE] ${subcategoryId} - родительский контейнер md:block:`, {
                  width: mdBlockRect.width,
                  marginLeft: leftOffset,
                  calculatedWidth: `calc(100% - ${leftOffset}px)`
                })
              }, 120)
            }
          }}
        >
          {tableData.map((row, idx) => {
            if (!row || !(row as { label?: string }).label) return null
            const typedRow = row as { label: string; plan1?: string; plan2?: string; plan3?: string }
            const isSmallFontRow = typedRow.label.includes('Skanowanie') || typedRow.label.includes('Duplex') || typedRow.label.includes('Prędkość druku')
            const labelFontSize = isSmallFontRow ? 'text-[13px]' : 'text-[16px]'
            const valueFontSize = isSmallFontRow ? 'text-[13px]' : (idx === 3 ? 'text-[14px]' : 'text-[16px]')
            const lineHeight = isSmallFontRow ? 'leading-[1.2]' : 'leading-[1.4]'

            return (
              <div
                key={idx}
                data-subcategory={subcategoryId}
                className={cn(
                  `flex w-full items-center border-[#8b7a5a] ${idx === 0 ? 'border-t-2' : ''} border-b-2`
                )}
              >
                {/* Пустая колонка для иконки */}
                <div
                  style={(() => {
                    // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                    const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                    if (isA3A4OnDZ) {
                      // Используем headerMeasurements если доступны (для точного выравнивания), иначе a3ReferenceWidths или columnWidths
                      if (headerMeasurements) {
                        return {
                          width: `${headerMeasurements.iconWidth}px`,
                          marginRight: `${headerMeasurements.distanceIconToText}px`
                        }
                      }
                      if (a3ReferenceWidths) {
                        return { width: `${a3ReferenceWidths.icon}px`, marginRight: '8px' }
                      }
                      return columnWidths ? { width: `${columnWidths.icon}px`, marginRight: '8px' } : { width: '40px', marginRight: '8px' }
                    }
                    return columnWidths ? { width: `${columnWidths.icon}px`, marginRight: '8px' } : { width: '40px', marginRight: '8px' }
                  })()}
                ></div>
                {/* Колонка с описанием */}
                <div
                  className={cn(
                    `px-2 flex items-center font-table-main ${labelFontSize} ${lineHeight} text-[rgba(255,255,245,0.85)]`,
                    isDrukarkaZastepcza
                      ? (isSmallFontRow ? 'py-0' : 'py-[3px]')
                      : (isSmallFontRow ? 'py-0.5' : 'py-1')
                  )}
                  style={(() => {
                    // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                    const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                    if (isA3A4OnDZ) {
                      // Используем headerMeasurements если доступны, иначе a3ReferenceWidths или columnWidths
                      if (headerMeasurements) {
                        return { width: `${headerMeasurements.textWidth}px` }
                      }
                      if (a3ReferenceWidths) {
                        return { width: `${a3ReferenceWidths.text}px` }
                      }
                      return columnWidths ? { width: `${columnWidths.text}px` } : undefined
                    }
                    return columnWidths ? { width: `${columnWidths.text}px` } : undefined
                  })()}
                >
                  {renderLabel(typedRow.label, labelFontSize)}
                </div>
                {/* Колонка с данными - единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                {typedRow.plan1 && (
                  <div
                    className={cn(
                      "px-2 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]",
                      isDrukarkaZastepcza
                        ? "py-[3px]"
                        : "py-1"
                    )}
                    style={(() => {
                      // Единый шаблон для всех A3/A4 подкатегорий на Drukarka Zastępcza
                      const isA3A4OnDZ = isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)
                      if (isA3A4OnDZ) {
                        // Используем headerMeasurements если доступны для точного выравнивания
                        if (headerMeasurements) {
                          return {
                            width: '22.5%',
                            marginLeft: `${headerMeasurements.distanceTextToPrice1}px`
                          }
                        }
                        return { width: '22.5%', marginLeft: '8px' }
                      }
                      return columnWidths ? { width: `${columnWidths.price1}px`, marginLeft: '8px' } : undefined
                    })()}
                  >
                    {renderValueWithSuffix(typedRow.plan1, valueFontSize, idx === 1 ? 0 : 0, typedRow.label)}
                  </div>
                )}
                {/* Второй столбец удален для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                {typedRow.plan2 && !(isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)) && (
                  <div
                    className={cn(
                      "px-2 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]",
                      isDrukarkaZastepcza
                        ? "py-[3px]"
                        : "py-1"
                    )}
                    style={columnWidths ? { width: `${columnWidths.price2}px` } : undefined}
                  >
                    {renderValueWithSuffix(typedRow.plan2, valueFontSize, idx === 1 ? 1 : 0, typedRow.label)}
                  </div>
                )}
                {!isDrukarkaZastepcza && typedRow.plan3 && (
                  <div
                    className="px-2 py-1 flex items-center justify-center text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                    style={columnWidths ? { width: `${columnWidths.price3}px` } : undefined}
                  >
                    {renderValueWithSuffix(typedRow.plan3, valueFontSize, idx === 1 ? 2 : 0, typedRow.label)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {/* Мобильная версия: обычная таблица */}
        <div className="md:hidden">
          <div className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
            <Table className="border-separate" style={{ minWidth: '100%', width: '100%', borderSpacing: '2px 0', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: isDrukarkaZastepcza ? '55%' : '48%', minWidth: '120px' }} />
                <col style={{ width: isDrukarkaZastepcza ? '22.5%' : '17.33%', minWidth: '45px' }} />
                <col style={{ width: isDrukarkaZastepcza ? '22.5%' : '17.33%', minWidth: '45px' }} />
                {!isDrukarkaZastepcza && <col style={{ width: '17.33%', minWidth: '45px' }} />}
              </colgroup>
              <TableHeader>
                <TableRow className="border-[#8b7a5a] border-b-2 border-t-2">
                  <TableHead
                    className="px-2 pr-3 align-middle text-left"
                    style={{ width: isDrukarkaZastepcza ? '55%' : '48%', minWidth: '120px', maxWidth: isDrukarkaZastepcza ? '55%' : '48%', boxSizing: 'border-box', whiteSpace: 'normal' }}
                  ></TableHead>
                  <TableHead
                    colSpan={isDrukarkaZastepcza ? 1 : 3}
                    className="pl-2 pr-2 align-middle text-center border-l-2 border-[#8b7a5a]"
                    style={{ width: isDrukarkaZastepcza ? '45%' : '52%', maxWidth: isDrukarkaZastepcza ? '45%' : '52%', boxSizing: 'border-box', overflow: 'hidden' }}
                  >
                    {/* Надпись "Czynsz wynajmu [zł/mies.]" убрана из таблицы - теперь она в шапке секции */}
                    <div className="hidden md:block text-lg font-cormorant font-semibold text-[#ffffff] leading-tight">
                      {t.rentPriceHeader}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, idx) => {
                  if (!row || !(row as { label?: string }).label) return null
                  const typedRow = row as { label: string; plan1?: string; plan2?: string; plan3?: string }
                  const isSmallFontRow = typedRow.label.includes('Skanowanie') || typedRow.label.includes('Duplex') || typedRow.label.includes('Prędkość druku')
                  const labelFontSize = isSmallFontRow ? 'text-[13px]' : 'text-[16px]'
                  const valueFontSize = isSmallFontRow ? 'text-[13px]' : (idx === 3 ? 'text-[13px]' : 'text-[15px]')
                  const lineHeight = isSmallFontRow ? 'leading-[1.2]' : 'leading-[1.4]'
                  const isLastRow = idx === tableData.length - 1
                  const borderBottomStyle = isLastRow ? 'none' : 'solid'
                  const borderBottomColor = isLastRow ? 'transparent' : 'rgba(139, 122, 90, 0.75)'

                  return (
                    <TableRow
                      key={idx}
                      style={{
                        borderBottomColor,
                        borderBottomWidth: '1.5px',
                        borderBottomStyle
                      }}
                    >
                      <TableCell
                        className={cn(
                          `px-2 pr-3 align-middle text-left font-table-main ${labelFontSize} ${lineHeight} text-[rgba(255,255,245,0.85)] break-words`,
                          isDrukarkaZastepcza
                            ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                            : (isSmallFontRow ? 'py-1' : 'py-2.5')
                        )}
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          width: isDrukarkaZastepcza ? '55%' : '48%',
                          minWidth: '120px',
                          maxWidth: isDrukarkaZastepcza ? '55%' : '48%',
                          boxSizing: 'border-box',
                          whiteSpace: 'normal',
                          borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                        }}
                      >
                        {renderLabel(typedRow.label, labelFontSize)}
                      </TableCell>
                      {typedRow.plan1 && (
                        <TableCell
                          className={cn(
                            "pl-2 pr-1 align-middle text-center border-l-2 border-[#8b7a5a]",
                            lineHeight,
                            isDrukarkaZastepcza
                              ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                              : (isSmallFontRow ? 'py-1' : 'py-2.5')
                          )}
                          style={{
                            width: isDrukarkaZastepcza ? '45%' : '17.33%',
                            minWidth: '45px',
                            maxWidth: isDrukarkaZastepcza ? '45%' : '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan1, valueFontSize, idx === 1 ? 0 : 0, typedRow.label)}
                        </TableCell>
                      )}
                      {/* Второй столбец удален для всех A3/A4 подкатегорий на Drukarka Zastępcza */}
                      {typedRow.plan2 && !(isDrukarkaZastepcza && ['a3-drukarki-mono', 'a3-drukarki-kolor', 'a3-mfu-mono', 'a3-mfu-kolor', 'drukarki-mono', 'drukarki-kolor', 'mfu-mono', 'mfu-kolor'].includes(subcategoryId)) && (
                        <TableCell
                          className={cn(
                            `${isDrukarkaZastepcza ? 'pl-1.5 pr-2' : 'pl-1.5 pr-1'} align-middle text-center border-l-2 border-[#8b7a5a]`,
                            lineHeight,
                            isDrukarkaZastepcza
                              ? (isSmallFontRow ? 'py-[3px]' : 'py-2')
                              : (isSmallFontRow ? 'py-1' : 'py-2.5')
                          )}
                          style={{
                            width: isDrukarkaZastepcza ? '22.5%' : '17.33%',
                            minWidth: '45px',
                            maxWidth: isDrukarkaZastepcza ? '22.5%' : '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan2, valueFontSize, idx === 1 ? 1 : 0, typedRow.label)}
                        </TableCell>
                      )}
                      {!isDrukarkaZastepcza && typedRow.plan3 && (
                        <TableCell
                          className="pl-1.5 pr-2 py-2.5 align-middle text-center leading-[1.4] border-l-2 border-[#8b7a5a]"
                          style={{
                            width: '17.33%',
                            minWidth: '45px',
                            maxWidth: '17.33%',
                            boxSizing: 'border-box',
                            borderBottom: isLastRow ? 'none' : '1.5px solid rgba(139, 122, 90, 0.75)'
                          }}
                        >
                          {renderValueWithSuffix(typedRow.plan3, valueFontSize, idx === 1 ? 2 : 0, typedRow.label)}
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
