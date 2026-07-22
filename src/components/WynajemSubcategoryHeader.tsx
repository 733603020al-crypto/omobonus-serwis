'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceData, PricingSection, PricingSubcategory } from '@/lib/services-data'
import { getIconForSection, getIconForSubcategory } from '@/components/service-accordion'

export interface HeaderRefsEntry {
  icon: React.RefObject<HTMLDivElement | null>
  text: React.RefObject<HTMLDivElement | null>
  prices: React.RefObject<HTMLDivElement | null>[]
}

interface WynajemSubcategoryHeaderProps {
  service: ServiceData
  section: PricingSection
  subcategory: PricingSubcategory
  viewDetails: string
  isSectionOpen: (sectionId: string) => boolean
  isSubcategoryOpen: (sectionId: string, subcategoryId: string) => boolean
  wynajemHeaderRefs: React.RefObject<Record<string, HeaderRefsEntry>>
  drukarkaZastepczaHeaderRefs: React.RefObject<Record<string, HeaderRefsEntry>>
}

// Only rendered for wynajem-drukarek / drukarka-zastepcza subcategory headers
// (akordeon-1 / akordeon-2 sections, when subcategory.price is set) — code-split
// so the other 9 service pages don't parse this pixel-alignment-heavy rendering
// at all. Body below is unchanged (byte-for-byte) from the original inline JSX
// in service-accordion.tsx — only the surrounding closures became props with
// the exact same names, so nothing inside needed to change.
export function WynajemSubcategoryHeader({
  service,
  section,
  subcategory,
  viewDetails,
  isSectionOpen,
  isSubcategoryOpen,
  wynajemHeaderRefs,
  drukarkaZastepczaHeaderRefs,
}: WynajemSubcategoryHeaderProps) {
  return (
                              <>
                                {/* Десктоп: grid с иконкой, текстом и тремя колонками цен */}
                                {/* Фиксированные элементы (всего 108px): */}
                                {/* - Padding слева: 12px (md:px-3) - уже учтен в AccordionTrigger */}
                                {/* - Иконка: 40px */}
                                {/* - Расстояние между иконкой и текстом: 16px (gap-4) */}
                                {/* - Стрелка справа: 40px (gap + padding + стрелка) */}
                                {/* Grid контейнер занимает calc(100% - 40px) для учета стрелки справа */}
                                {/* Пропорции колонок подобраны вручную для точного совпадения центров: */}
                                {/* Иконка (40px) + Gap (16px) + Текст (2.15fr) + Цены (0.95fr каждая) */}
                                <div className={cn(
                                  "hidden md:flex items-center",
                                  service.slug === 'drukarka-zastepcza' && "gap-[1px]"
                                )} style={{
                                  width: 'calc(100% - 40px)' // Вычитаем место для стрелки справа (40px)
                                }}>
                                  {(() => {
                                    // Создаем или получаем refs для этого подменю
                                    const subcategoryKey = `${section.id}-${subcategory.id}`
                                    const headerRefsObj = service.slug === 'wynajem-drukarek' ? wynajemHeaderRefs : drukarkaZastepczaHeaderRefs
                                    if (!headerRefsObj.current[subcategoryKey]) {
                                      headerRefsObj.current[subcategoryKey] = {
                                        icon: React.createRef<HTMLDivElement>(),
                                        text: React.createRef<HTMLDivElement>(),
                                        prices: [
                                          React.createRef<HTMLDivElement>(),
                                          React.createRef<HTMLDivElement>(),
                                          React.createRef<HTMLDivElement>(),
                                        ],
                                      }
                                    }
                                    const headerRefs = headerRefsObj.current[subcategoryKey]

                                    const isA3DrukarkiMonoHeader = subcategory.id === 'a3-drukarki-mono'
                                    const isA3DrukarkiKolorHeader = subcategory.id === 'a3-drukarki-kolor'

                                    return (
                                      <>
                                        <div
                                          ref={headerRefs.icon}
                                          className={cn(
                                            "flex-shrink-0 flex items-center justify-center",
                                            "h-[60px] w-[60px] md:h-[50px] md:w-[50px]"
                                          )}
                                        >
                                          <Image
                                            src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                            alt={subcategory.title}
                                            width={100}
                                            height={100}
                                            className={cn(
                                              "w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                                              service.slug === 'drukarka-zastepcza' ? "object-cover" : "object-contain"
                                            )}
                                            unoptimized
                                          />
                                        </div>
                                        <div
                                          ref={headerRefs.text}
                                          data-measure-text={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? 'true' : undefined}
                                          className={cn(
                                            "min-w-0"
                                          )}
                                          style={{ width: 'calc((100% - 40px - 8px) * 0.4)' }}
                                        >
                                          <h4 className={cn(
                                            "text-lg font-semibold text-[#ffffff] font-table-main leading-[1.3]"
                                          )}>
                                            {(() => {
                                              const title = subcategory.title
                                              // Для wynajem-drukarek и drukarka-zastepcza подкатегорий части в скобках оформляем в том же стиле
                                              const isWynajemSubcategory = (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                              const match = title.match(/^(.+?)\s*\((.+?)\)$/)
                                              if (match) {
                                                const mainPart = match[1].trim()
                                                const bracketPart = match[2].trim()
                                                if (isWynajemSubcategory) {
                                                  // Для wynajem - вся часть в скобках в том же стиле
                                                  return (
                                                    <>
                                                      {mainPart}{' '}
                                                      <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.3]">
                                                        ({bracketPart})
                                                      </span>
                                                    </>
                                                  )
                                                } else {
                                                  // Для других секций - унифицированный стиль как у SEO-текста
                                                  return (
                                                    <>
                                                      {mainPart}{' '}
                                                      <span className="text-[14px] text-[#cbb27c] leading-relaxed">
                                                        ({bracketPart})
                                                      </span>
                                                    </>
                                                  )
                                                }
                                              }
                                              return title
                                            })()}
                                          </h4>
                                          <div
                                            data-subcategory-link
                                            className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform whitespace-nowrap"
                                          >
                                            <span>{viewDetails}</span>
                                            <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                          </div>
                                        </div>
                                        {(() => {
                                          // Для drukarki-mono на drukarka-zastepcza показываем две цены (одну с данными, вторую пустую) для выравнивания с mono+kolor
                                          if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'drukarki-mono') {
                                            return (
                                              <>
                                                <div
                                                  ref={headerRefs.prices[0]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '8px' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>0,05</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        (mono)
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }
                                          // Для mfu-mono на drukarka-zastepcza показываем две цены (одну с данными, вторую пустую) для выравнивания с mono+kolor
                                          if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'mfu-mono') {
                                            return (
                                              <>
                                                <div
                                                  ref={headerRefs.prices[0]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '8px' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>0,08</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        (mono)
                                                      </span>
                                                    </span>
                                                  </div>
                                                </div>
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }
                                          // Для остальных - как было
                                          return subcategory.price!.split(' / ').map((price, idx) => {
                                            // Определяем label для drukarka-zastepcza
                                            const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                            const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                            const isMonoKolor = subcategory.title.includes('mono+kolor')
                                            const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                            // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                            const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                            const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                            const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                            let priceLabel = ''
                                            let secondPriceLabel = ''
                                            let secondPrice = '0'

                                            if (isDrukarkaZastepczaA4) {
                                              if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                                // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,10'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,53'
                                                }
                                              } else if (isA3MfuMono) {
                                                // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else if (isA3MfuKolor) {
                                                // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,14'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,60'
                                                }
                                              } else if (isMonoKolor) {
                                                priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                                secondPriceLabel = priceLabel
                                              } else if (isMono) {
                                                priceLabel = '(mono)'
                                                secondPriceLabel = priceLabel
                                              }
                                            }

                                            return (
                                              <div
                                                key={idx}
                                                ref={headerRefs.prices[idx]}
                                                data-measure-price={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? `${idx}` : undefined}
                                                data-price-value={subcategory.id === 'a3-mfu-kolor' && service.slug === 'drukarka-zastepcza' ? price : undefined}
                                                className={cn(
                                                  "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                )}
                                                style={{
                                                  width: `22.5%`,
                                                  marginLeft: idx === 0 ? '8px' : '0'
                                                }}
                                              >
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                  <span className="inline-flex items-start">
                                                    <span>{price}</span>
                                                    {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                    )}
                                                    {priceLabel && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                </div>
                                                {/* Второй контейнер для akordeon-2 */}
                                                {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                    <span className="inline-flex items-start">
                                                      <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          })

                                          // Если это drukarka-zastepcza и только одна цена (не mono+kolor и не A3 подкатегории), добавляем пустой столбец для выравнивания
                                          if (!subcategory.price) return null

                                          const isA3DrukarkiMonoCheck = subcategory.id === 'a3-drukarki-mono'
                                          const isA3DrukarkiKolorCheck = subcategory.id === 'a3-drukarki-kolor'
                                          const isA3MfuMonoCheck = subcategory.id === 'a3-mfu-mono'
                                          const isA3MfuKolorCheck = subcategory.id === 'a3-mfu-kolor'

                                          const prices = subcategory.price!.split(' / ')
                                          const isSinglePrice = prices.length === 1
                                          const isNotA3Subcategory = !isA3DrukarkiMonoCheck && !isA3DrukarkiKolorCheck && !isA3MfuMonoCheck && !isA3MfuKolorCheck

                                          if (service.slug === 'drukarka-zastepcza' && isSinglePrice && isNotA3Subcategory) {
                                            const priceElements = subcategory.price!.split(' / ').map((price, idx) => {
                                              const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                              const isMonoKolor = subcategory.title.includes('mono+kolor')
                                              const isMono = subcategory.title.includes('mono') && !isMonoKolor
                                              let priceLabel = ''

                                              if (isDrukarkaZastepczaA4) {
                                                if (isMono) {
                                                  priceLabel = '(mono)'
                                                }
                                              }

                                              return (
                                                <div
                                                  key={idx}
                                                  ref={headerRefs.prices[idx]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: idx === 0 ? '8px' : '0' }}
                                                >
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                    <span className="inline-flex items-start">
                                                      <span>{price}</span>
                                                      {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                        <span
                                                          className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                          style={{ marginTop: '-3px' }}
                                                        >
                                                          zł
                                                        </span>
                                                      )}
                                                      {priceLabel && (
                                                        <span
                                                          className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                        >
                                                          {priceLabel}
                                                        </span>
                                                      )}
                                                    </span>
                                                  </div>
                                                </div>
                                              )
                                            })

                                            return (
                                              <>
                                                {priceElements}
                                                <div
                                                  ref={headerRefs.prices[1]}
                                                  className={cn(
                                                    "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                  )}
                                                  style={{ width: `22.5%`, marginLeft: '0' }}
                                                >
                                                  {/* Пустой столбец для выравнивания */}
                                                </div>
                                              </>
                                            )
                                          }

                                          return subcategory.price!.split(' / ').map((price, idx) => {
                                            // Определяем label для drukarka-zastepcza
                                            const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                            const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                            const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                            const isMonoKolor = subcategory.title.includes('mono+kolor')
                                            const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                            // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                            const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                            const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                            const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                            let priceLabel = ''
                                            let secondPriceLabel = ''
                                            let secondPrice = '0'

                                            if (isDrukarkaZastepczaA4) {
                                              if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                                // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,10'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,53'
                                                }
                                              } else if (isA3MfuMono) {
                                                // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else if (isA3MfuKolor) {
                                                // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                                if (idx === 0) {
                                                  priceLabel = '(mono A4)'
                                                  secondPriceLabel = '(mono A3)'
                                                  secondPrice = '0,14'
                                                } else {
                                                  priceLabel = '(kolor A4)'
                                                  secondPriceLabel = '(kolor A3)'
                                                  secondPrice = '0,60'
                                                }
                                              } else if (isMonoKolor) {
                                                priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                                secondPriceLabel = priceLabel
                                              } else if (isMono) {
                                                priceLabel = '(mono)'
                                                secondPriceLabel = priceLabel
                                              }
                                            }

                                            return (
                                              <div
                                                key={idx}
                                                ref={headerRefs.prices[idx]}
                                                className={cn(
                                                  "flex flex-col items-center justify-center text-center px-2 border-l-2 border-[#8b7a5a]"
                                                )}
                                                style={{ width: `22.5%`, marginLeft: idx === 0 ? '8px' : '0' }}
                                              >
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                  <span className="inline-flex items-start">
                                                    <span>{price}</span>
                                                    {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                    )}
                                                    {priceLabel && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                </div>
                                                {/* Второй контейнер для akordeon-2 */}
                                                {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                  <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                    <span className="inline-flex items-start">
                                                      <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                        style={{ marginTop: '-3px' }}
                                                      >
                                                        zł
                                                      </span>
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          })
                                        })()}
                                      </>
                                    )
                                  })()}
                                </div>
                                <div className={cn(
                                  "md:hidden flex flex-col w-full",
                                  (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                                    ? "gap-0.5"
                                    : "gap-2"
                                )}>
                                  <div className={cn(
                                    "flex gap-[1px]",
                                    (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2') && isSectionOpen(section.id)
                                      ? "items-center"
                                      : "items-start"
                                  )}>
                                    <div className={cn(
                                      "flex-shrink-0 flex items-center justify-center",
                                      "h-[60px] w-[60px]"
                                    )}>
                                      <Image
                                        src={getIconForSubcategory(subcategory.id) || getIconForSection(section.id)}
                                        alt={subcategory.title}
                                        width={100}
                                        height={100}
                                        className={cn(
                                          "w-full h-full opacity-90 group-hover:opacity-100 transition-opacity",
                                          service.slug === 'drukarka-zastepcza' ? "object-cover" : "object-contain"
                                        )}
                                        unoptimized
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0" style={{ width: '48%', maxWidth: '48%' }}>
                                      <h4 className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                        {(() => {
                                          const title = subcategory.title
                                          // Для wynajem-drukarek и drukarka-zastepcza подкатегорий части в скобках оформляем в том же стиле
                                          const isWynajemSubcategory = (service.slug === 'wynajem-drukarek' || service.slug === 'drukarka-zastepcza') && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                          const match = title.match(/^(.+?)\s*\((.+?)\)$/)
                                          if (match) {
                                            const mainPart = match[1].trim()
                                            const bracketPart = match[2].trim()
                                            if (isWynajemSubcategory) {
                                              // Для wynajem на мобильных - переносим на две строки для экономии места
                                              return (
                                                <>
                                                  <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                                    {mainPart}
                                                  </span>
                                                  <br className="md:hidden" />
                                                  <span className="text-lg font-semibold text-[#ffffff] font-table-main leading-[1.2]">
                                                    ({bracketPart})
                                                  </span>
                                                </>
                                              )
                                            } else {
                                              // Для других секций - унифицированный стиль как у SEO-текста
                                              return (
                                                <>
                                                  {mainPart}{' '}
                                                  <span className="text-[14px] text-[#cbb27c] leading-relaxed">
                                                    ({bracketPart})
                                                  </span>
                                                </>
                                              )
                                            }
                                          }
                                          return title
                                        })()}
                                      </h4>
                                    </div>
                                    {/* Цены справа - только на мобильных, выровнены с таблицей внутри аккордеона */}
                                    {/* Блок занимает 100% оставшегося места, внутри три равные колонки */}
                                    <div className="flex items-center flex-1">
                                      {(() => {
                                        // Для drukarki-mono на drukarka-zastepcza показываем только одну цену "0,05 zł"
                                        if (service.slug === 'drukarka-zastepcza' && subcategory.id === 'drukarki-mono') {
                                          return (
                                            <div
                                              className="flex items-center justify-center text-center border-l-2 border-[#8b7a5a] pl-2 pr-2 flex-1"
                                              style={{
                                                boxSizing: 'border-box'
                                              }}
                                            >
                                              <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                <span className="inline-flex items-start">
                                                  <span>0,05</span>
                                                  <span
                                                    className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                    style={{ marginTop: '-3px' }}
                                                  >
                                                    zł
                                                  </span>
                                                  <span
                                                    className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                  >
                                                    (mono)
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          )
                                        }
                                        // Для остальных - как было
                                        const pricesArray = subcategory.price!.split(' / ')
                                        return pricesArray.map((price, idx) => {
                                          // Определяем label для drukarka-zastepcza
                                          const isDrukarkaZastepczaA4 = service.slug === 'drukarka-zastepcza' && (section.id === 'akordeon-1' || section.id === 'akordeon-2')
                                          const isDrukarkaZastepczaA3 = service.slug === 'drukarka-zastepcza' && section.id === 'akordeon-2'
                                          const isA3DrukarkiMono = subcategory.id === 'a3-drukarki-mono'
                                          const isMonoKolor = subcategory.title.includes('mono+kolor')
                                          const isMono = subcategory.title.includes('mono') && !isMonoKolor

                                          // Для a3-drukarki-mono, a3-drukarki-kolor, a3-mfu-mono, a3-mfu-kolor: первый контейнер с "A4", второй с "A3"
                                          const isA3DrukarkiKolor = subcategory.id === 'a3-drukarki-kolor'
                                          const isA3MfuMono = subcategory.id === 'a3-mfu-mono'
                                          const isA3MfuKolor = subcategory.id === 'a3-mfu-kolor'
                                          let priceLabel = ''
                                          let secondPriceLabel = ''
                                          let secondPrice = '0'

                                          if (isDrukarkaZastepczaA4) {
                                            if (isA3DrukarkiMono || isA3DrukarkiKolor) {
                                              // Для a3-drukarki-mono и a3-drukarki-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                              if (idx === 0) {
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,10'
                                              } else {
                                                priceLabel = '(kolor A4)'
                                                secondPriceLabel = '(kolor A3)'
                                                secondPrice = '0,53'
                                              }
                                            } else if (isA3MfuMono) {
                                              // Для a3-mfu-mono: первый контейнер - "(mono A4)", второй - "(mono A3)"
                                              priceLabel = '(mono A4)'
                                              secondPriceLabel = '(mono A3)'
                                              secondPrice = '0,14'
                                            } else if (isA3MfuKolor) {
                                              // Для a3-mfu-kolor: первый контейнер - "(mono A4)" или "(kolor A4)", второй - "(mono A3)" или "(kolor A3)"
                                              if (idx === 0) {
                                                priceLabel = '(mono A4)'
                                                secondPriceLabel = '(mono A3)'
                                                secondPrice = '0,14'
                                              } else {
                                                priceLabel = '(kolor A4)'
                                                secondPriceLabel = '(kolor A3)'
                                                secondPrice = '0,60'
                                              }
                                            } else if (isMonoKolor) {
                                              priceLabel = idx === 0 ? '(mono)' : '(kolor)'
                                              secondPriceLabel = priceLabel
                                            } else if (isMono) {
                                              priceLabel = '(mono)'
                                              secondPriceLabel = priceLabel
                                            }
                                          }

                                          const hasTwoPrices = (subcategory.price?.split(' / ') || []).length === 2
                                          // Для akordeon-2 метки всегда снизу на мобильных
                                          const shouldShowLabelBelow = isDrukarkaZastepczaA3 || hasTwoPrices

                                          return (
                                            <div
                                              key={idx}
                                              className={cn(
                                                "flex flex-col items-center justify-center text-center border-l-2 border-[#8b7a5a] pl-2 pr-2 flex-1"
                                              )}
                                              style={{
                                                boxSizing: 'border-box'
                                              }}
                                            >
                                              <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3]">
                                                <span className="inline-flex items-start">
                                                  <span>{price}</span>
                                                  {(service.slug === 'drukarka-zastepcza' || isSubcategoryOpen(section.id, subcategory.id)) && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                      style={{ marginTop: '-3px' }}
                                                    >
                                                      zł
                                                    </span>
                                                  )}
                                                  {priceLabel && !shouldShowLabelBelow && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                    >
                                                      {priceLabel}
                                                    </span>
                                                  )}
                                                </span>
                                              </div>
                                              {priceLabel && shouldShowLabelBelow && (
                                                <span
                                                  className="text-[14px] text-[#cbb27c] leading-relaxed mt-0.5"
                                                >
                                                  {priceLabel}
                                                </span>
                                              )}
                                              {/* Второй контейнер для akordeon-2 */}
                                              {isDrukarkaZastepczaA3 && (isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor ? secondPriceLabel : priceLabel) && (
                                                <div className="text-lg font-normal text-[#ffffff] font-inter leading-[1.3] mt-1">
                                                  <span className="inline-flex items-start">
                                                    <span>{(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPrice : '0'}</span>
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed ml-0.5 inline-flex"
                                                      style={{ marginTop: '-3px' }}
                                                    >
                                                      zł
                                                    </span>
                                                    {!shouldShowLabelBelow && (
                                                      <span
                                                        className="text-[14px] text-[#cbb27c] leading-relaxed ml-1 inline-flex"
                                                      >
                                                        {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                      </span>
                                                    )}
                                                  </span>
                                                  {shouldShowLabelBelow && (
                                                    <span
                                                      className="text-[14px] text-[#cbb27c] leading-relaxed mt-0.5"
                                                    >
                                                      {(isA3DrukarkiMono || isA3DrukarkiKolor || isA3MfuMono || isA3MfuKolor) ? secondPriceLabel : priceLabel}
                                                    </span>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )
                                        })
                                      })()}
                                    </div>
                                  </div>
                                  <div className="pl-[52px] -mt-0.5">
                                    <div
                                      data-subcategory-link
                                      className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform whitespace-nowrap"
                                    >
                                      <span>{viewDetails}</span>
                                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                                    </div>
                                  </div>
                                </div>
                              </>
  )
}
