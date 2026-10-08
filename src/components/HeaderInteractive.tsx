'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { CallButton } from '@/components/ui/CallButton'
import { cn } from '@/lib/utils'

// Same-looking static button shown for the brief window while MobileMenuSheet's
// chunk is still loading, so the hamburger icon never disappears mid-transition.
// data-premenu: a tap here opens the static drawer copy (see premenu-script.ts).
const MobileMenuLoadingButton = () => (
  <button
    type="button"
    data-premenu=""
    className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-md text-white min-[920px]:hidden"
    aria-label="Open menu"
    aria-haspopup="dialog"
    aria-expanded="false"
  >
    <Menu className="h-6 w-6" />
  </button>
)

// The mobile drawer (Radix Dialog under the hood) is never part of the SSR
// output anyway (gated by `mounted` below) — dynamic+ssr:false just stops its
// JS from being parsed as part of Header's own chunk on every page load.
const MobileMenuSheet = dynamic(
  () => import('@/components/MobileMenuSheet').then(m => ({ default: m.MobileMenuSheet })),
  { ssr: false, loading: MobileMenuLoadingButton }
)

// Reserves the switcher's approximate width so the rest of the header doesn't
// shift once it mounts. No PL/UA markup here — kept out of SSR entirely so a
// browser translator has nothing to grab before React ever attaches.
const LanguageSwitcherPlaceholder = () => (
  <div className="h-full w-[122px] flex items-center" aria-hidden="true" />
)

// Rendered client-only: a page translator that mutates DOM text/attributes
// before hydration can't touch a subtree that was never part of the SSR HTML.
const LanguageSwitcher = dynamic(
  () => import('@/components/LanguageSwitcher').then(m => ({ default: m.LanguageSwitcher })),
  { ssr: false, loading: LanguageSwitcherPlaceholder }
)

/* =========================
   Brand
   ========================= */

export const BrandWordmark = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'flex gap-2 tracking-wide font-cormorant text-base md:text-[22px]',
      className
    )}
  >
    <span className="text-white transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(191,167,106,0.35)]">Omobonus</span>
    <span className="text-[#bfa76a] transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(191,167,106,0.35)]">serwis</span>
  </div>
)

/* =========================
   Locale-aware navigation data
   ========================= */

export type Locale = 'pl' | 'uk' | 'ru'

const LOCALE_NAV: Record<Locale, {
  prefix: string
  homeHref: string
  homeSectionHref: (id: string) => string
  labels: {
    services: string
    about: string
    contact: string
    shop: string
    call: string
    sendForm: string
    megaMenuHeader: string
  }
}> = {
  pl: {
    prefix: '',
    homeHref: '/',
    homeSectionHref: (id) => `/#${id}`,
    labels: {
      services: 'Usługi',
      about: 'O nas',
      contact: 'Kontakt',
      shop: 'Sklep',
      call: 'Zadzwoń teraz',
      sendForm: 'Szybki kontakt',
      megaMenuHeader: 'SERWIS I NAPRAWA',
    },
  },
  uk: {
    prefix: '/uk',
    homeHref: '/uk',
    homeSectionHref: (id) => `/uk#${id}`,
    labels: {
      services: 'Послуги',
      about: 'Про нас',
      contact: 'Контакт',
      shop: 'Магазин',
      call: 'Зателефонувати',
      sendForm: 'Швидкий контакт',
      megaMenuHeader: 'СЕРВІС І РЕМОНТ',
    },
  },
  ru: {
    prefix: '/ru',
    homeHref: '/ru',
    homeSectionHref: (id) => `/ru#${id}`,
    labels: {
      services: 'Услуги',
      about: 'О нас',
      contact: 'Контакт',
      shop: 'Магазин',
      call: 'Позвонить',
      sendForm: 'Быстрый контакт',
      megaMenuHeader: 'СЕРВИС И РЕМОНТ',
    },
  },
}

/* =========================
   Mega menu data
   ========================= */

// Four groups; desktop shows them as 4 columns from 1280 px and as a 2×2 grid
// below. The mobile drawer lists the same groups in one column under "Usługi".
export type ServiceGroup = { title: string; items: { label: string; href: string; icon: string; iconTall?: boolean }[] }

const MEGA_MENU: { title: Record<Locale, string>; items: { label: Record<Locale, string>; href: string; icon: string; iconTall?: boolean; locales?: Locale[] }[] }[] = [
  {
    title: { pl: 'Komputery i IT', uk: 'Комп\'ютери та ІТ', ru: 'Компьютеры и IT' },
    items: [
      { label: { pl: 'Laptopy', uk: 'Ноутбуки', ru: 'Ноутбуки' }, href: '/uslugi/serwis-laptopow', icon: '/images/menu-icon-laptopy.webp' },
      { label: { pl: 'Komputery stacjonarne', uk: 'Стаціонарні комп\'ютери', ru: 'Стационарные компьютеры' }, href: '/uslugi/serwis-komputerow-stacjonarnych', icon: '/images/menu-icon-komputery-stacjonarne.webp' },
      { label: { pl: 'Outsourcing IT', uk: 'ІТ-аутсорсинг', ru: 'IT-аутсорсинг' }, href: '/uslugi/outsourcing-it', icon: '/images/menu-icon-outsourcing-it.webp' },
    ],
  },
  {
    title: { pl: 'Drukarki biurowe', uk: 'Офісні принтери', ru: 'Офисные принтеры' },
    items: [
      { label: { pl: 'Drukarki laserowe', uk: 'Лазерні принтери', ru: 'Лазерные принтеры' }, href: '/uslugi/serwis-drukarek-laserowych', icon: '/images/menu-icon-drukarki-laserowe.webp' },
      { label: { pl: 'Drukarki atramentowe', uk: 'Струменеві принтери', ru: 'Струйные принтеры' }, href: '/uslugi/serwis-drukarek-atramentowych', icon: '/images/menu-icon-drukarki-atramentowe.webp' },
      { label: { pl: 'Drukarki igłowe', uk: 'Матричні принтери', ru: 'Матричные принтеры' }, href: '/uslugi/serwis-drukarek-iglowych', icon: '/images/menu-icon-drukarki-iglowe.webp' },
      { label: { pl: 'Drukarki etykiet termicznych', uk: 'Термопринтери етикеток', ru: 'Термопринтеры этикеток' }, href: '/uslugi/serwis-drukarek-termicznych', icon: '/images/menu-icon-drukarki-etykiet-termicznych.webp' },
    ],
  },
  {
    title: { pl: 'Drukarki specjalistyczne', uk: 'Спеціалізовані принтери', ru: 'Специализированные принтеры' },
    items: [
      { label: { pl: 'Drukarki sublimacyjne', uk: 'Сублімаційні принтери', ru: 'Сублимационные принтеры' }, href: '/uslugi/serwis-drukarek-sublimacyjnych', icon: '/images/menu-icon-drukarki-sublimacyjne.webp' },
      { label: { pl: 'Drukarki DTF', uk: 'DTF-принтери', ru: 'DTF-принтеры' }, href: '/uslugi/serwis-drukarek-dtf', icon: '/images/menu-icon-drukarki-dtf.webp' },
      { label: { pl: 'Drukarki DTG', uk: 'DTG-принтери', ru: 'DTG-принтеры' }, href: '/uslugi/serwis-drukarek-dtg', icon: '/images/menu-icon-drukarki-dtg.webp' },
      { label: { pl: 'Drukarki spożywcze', uk: 'Харчові принтери', ru: 'Пищевые принтеры' }, href: '/uslugi/serwis-drukarek-spozywczych', icon: '/images/menu-icon-drukarki-spozywcze.webp', iconTall: true },
      { label: { pl: 'Drukarki do kart plastikowych', uk: 'Принтери пластикових карток', ru: 'Принтеры пластиковых карт' }, href: '/uslugi/serwis-drukarek-do-kart-plastikowych', icon: '/images/menu-icon-drukarki-do-kart-plastikowych.webp' },
    ],
  },
  {
    title: { pl: 'Inne urządzenia i usługi', uk: 'Інші пристрої та послуги', ru: 'Другие устройства и услуги' },
    items: [
      { label: { pl: 'Drukarki 3D', uk: '3D-принтери', ru: '3D-принтеры' }, href: '/uslugi/serwis-drukarek-3d', icon: '/images/menu-icon-drukarki-3d.webp' },
      { label: { pl: 'Druk 3D na zamówienie', uk: '3D-друк на замовлення', ru: '3D-печать на заказ' }, href: '/uslugi/druk-3d-na-zamowienie', icon: '/images/menu-icon-druk-3d-na-zamowienie.webp' },
      { label: { pl: 'Plotery', uk: 'Плотери', ru: 'Плоттеры' }, href: '/uslugi/serwis-plotterow', icon: '/images/menu-icon-plotery.webp' },
      { label: { pl: 'Niszczarki', uk: 'Шредери', ru: 'Шредеры' }, href: '/uslugi/serwis-niszczarek', icon: '/images/menu-icon-niszczarki.webp' },
      { label: { pl: 'Zasilacze UPS', uk: 'ДБЖ (UPS)', ru: 'ИБП (UPS)' }, href: '/uslugi/naprawa-zasilaczy-ups', icon: '/images/menu-icon-zasilacze-ups.webp' },
    ],
  },
]

// Grid placement per group: 2×2 below 1280 px, 4 columns from 1280 px.
const MEGA_GROUP_CLASS = [
  'col-start-1 row-start-2 pr-3',
  'col-start-2 row-start-2 border-l border-[#bfa76a]/25 pl-3 min-[1280px]:pr-3',
  'col-start-1 row-start-3 mt-3 pr-3 min-[1280px]:col-start-3 min-[1280px]:row-start-2 min-[1280px]:mt-0 min-[1280px]:border-l min-[1280px]:border-[#bfa76a]/25 min-[1280px]:pl-3',
  'col-start-2 row-start-3 mt-3 border-l border-[#bfa76a]/25 pl-3 min-[1280px]:col-start-4 min-[1280px]:row-start-2 min-[1280px]:mt-0',
]

/* =========================
   Header interactive island
   ========================= */

export function HeaderInteractive({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Small grace period before closing the mega menu: the panel sits a few px
  // below the trigger, so a real mouse move from "Usługi" to a link inside it
  // briefly leaves both hit areas. Without this delay the menu unmounts before
  // the cursor arrives.
  const openServices = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current)
      servicesCloseTimer.current = null
    }
    setIsServicesOpen(true)
  }

  const scheduleCloseServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    servicesCloseTimer.current = setTimeout(() => {
      setIsServicesOpen(false)
      servicesCloseTimer.current = null
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    }
  }, [])
  const nav = LOCALE_NAV[locale]
  const homeHref = nav.homeHref
  const aboutHref = `${nav.prefix}/o-nas`
  const contactHref = `${nav.prefix}/kontakt`
  const prefetchHome = () => {
    if (pathname !== homeHref) router.prefetch(homeHref)
  }
  const isServicesActive = pathname.startsWith(`${nav.prefix}/uslugi`)
  const isAboutActive = pathname === aboutHref
  const isContactActive = pathname === contactHref

  const navServices = nav.labels.services
  const navAbout = nav.labels.about
  const navContact = nav.labels.contact
  const navCall = nav.labels.call
  const navSendForm = nav.labels.sendForm
  const megaMenuHeader = nav.labels.megaMenuHeader
  const homeSectionHref = nav.homeSectionHref('uslugi')

  const handlePhoneClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    window.dispatchEvent(new CustomEvent('phone-hint-trigger', { detail: { sourceRect: rect, showArrow: false } }))
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Closing on an outside tap / overlay click, Escape, the Tab trap and focus
  // return are all handled by the Radix drawer itself. A custom pointerdown
  // listener used to close it earlier, so the click of the same tap landed on
  // whatever was underneath (reopening the menu or following a page link).

  const serviceGroups: ServiceGroup[] = MEGA_MENU.map((group) => ({
    title: group.title[locale],
    items: group.items
      .filter((item) => !item.locales || item.locales.includes(locale))
      .map((item) => ({ label: item.label[locale], href: `${nav.prefix}${item.href}`, icon: item.icon, iconTall: item.iconTall })),
  }))

  const scrollToSection = (id: string) => {
    const performScroll = () => {
      const isHome = pathname === nav.homeHref
      if (!isHome) {
        window.location.href = nav.homeSectionHref(id)
        return
      }

      // Lift the home page's off-screen render skipping so the target's
      // position is computed from real section heights (see globals.css).
      document.documentElement.classList.add('cv-off')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        setTimeout(() => {
          document
            .getElementById(id)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    if (isOpen) {
      setIsOpen(false)
      setTimeout(performScroll, 350)
    } else {
      performScroll()
    }
  }

  const scrollToTop = () => {
    if (isOpen) {
      setIsOpen(false)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 350)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex h-full w-full items-stretch justify-between px-4 md:px-8">
      {/* Logo */}
      <Link
        href={homeHref}
        // Без prefetch при появлении на экране (иначе данные главной ~43 КБ
        // качаются вместе с первым экраном каждой страницы); подгружаем их
        // только по наведению/касанию — переход остаётся быстрым.
        prefetch={false}
        onMouseEnter={prefetchHome}
        onTouchStart={prefetchHome}
        className="group z-10 flex h-full items-center gap-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(191,167,106,0.30)]"
        onClick={(e) => {
          if (pathname === homeHref) {
            e.preventDefault()
            scrollToTop()
          }
        }}
      >
        <div className="relative flex h-full w-[40px] items-center md:w-[48px]">
          {/* Not the LCP element — loads eagerly but at fetchPriority="low",
              so its browser-auto preload doesn't compete with Hero's LCP
              image (a plain `loading="eager"` image still gets a
              default-high-priority preload otherwise). */}
          <Image
            src="/images/Logo_Omobonus.webp"
            alt="Omobonus Serwis – serwis komputerów, laptopów i drukarek Wrocław"
            fill
            loading="eager"
            fetchPriority="low"
            quality={60}
            sizes="(max-width: 768px) 40px, 48px"
            className="object-contain p-[1px]"
          />
        </div>
        <BrandWordmark />
      </Link>

      {/* Desktop nav */}
      <nav className="z-10 ml-[35px] hidden items-center gap-[28px] min-[920px]:flex">
        <div
          className="relative h-full flex items-center"
          onMouseEnter={openServices}
          onMouseLeave={scheduleCloseServices}
          onFocus={openServices}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              scheduleCloseServices()
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && isServicesOpen) {
              setIsServicesOpen(false)
              e.currentTarget.querySelector('a')?.focus()
            }
          }}
        >
          <Link
            href={homeSectionHref}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('uslugi')
            }}
            className="flex items-center gap-1 whitespace-nowrap font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]"
            style={isServicesOpen ? { textShadow: '0 0 8px rgba(191,167,106,0.7), 0 0 18px rgba(191,167,106,0.35)' } : undefined}
          >
            <span className={isServicesActive ? 'nav-active-underline' : ''}>{navServices}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
          </Link>

          {/* Mega menu panel */}
          {isServicesOpen && (
            <div
              className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 z-50 w-[620px] min-[1280px]:w-[1120px] rounded-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden opacity-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-cover bg-center"
              style={{ backgroundImage: `var(--bg-parchment)` }}
            >
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 grid grid-cols-2 items-start gap-0 p-4 min-[1280px]:grid-cols-4">
                <div className="col-span-full row-start-1 mb-3">
                  <p className="col-span-full text-center pb-1.5 font-cormorant text-[13px] font-semibold uppercase tracking-[0.25em] text-white [text-shadow:0_0_14px_rgba(191,167,106,0.75)]">
                    {megaMenuHeader}
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#bfa76a]/70 to-transparent shadow-[0_0_14px_rgba(191,167,106,0.55)]" />
                </div>
                {MEGA_MENU.map((col, i) => (
                  <div key={i} className={MEGA_GROUP_CLASS[i]}>
                    <p className="mb-1.5 px-2 font-cormorant text-[17px] font-semibold text-[#bfa76a]">
                      {col.title[locale]}
                    </p>
                    <div className="flex flex-col divide-y divide-[#bfa76a]/25 border border-[#bfa76a]/25">
                      {col.items.filter((item) => !item.locales || item.locales.includes(locale)).map((item) => (
                        <Link
                          key={item.label.pl}
                          href={`${nav.prefix}${item.href}`}
                          className="flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5 font-cormorant text-[15px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100"
                        >
                          <Image
                            src={item.icon}
                            alt=""
                            width={28}
                            height={item.iconTall ? 28 : 22}
                            sizes="28px"
                            // A tall icon (cake candle) rises above the slot without changing the row height.
                            className={`flex-shrink-0 object-contain opacity-90 ${item.iconTall ? '-mt-1.5' : ''}`}
                            unoptimized
                          />
                          {item.label[locale]}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link href={aboutHref} prefetch={false} className="whitespace-nowrap font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]">
          <span className={isAboutActive ? 'nav-active-underline' : ''}>{navAbout}</span>
        </Link>
        <Link href={contactHref} prefetch={false} className="whitespace-nowrap font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]">
          <span className={isContactActive ? 'nav-active-underline' : ''}>{navContact}</span>
        </Link>

        <LanguageSwitcher />

        <CallButton variant="primary" href="tel:+48793759262" className="hover:shadow-[0_0_24px_rgba(22,163,74,0.45)]" onClick={handlePhoneClick}>
          <span className="min-[920px]:hidden">{navCall}</span>
          <span className="hidden min-[920px]:inline">793 759 262</span>
        </CallButton>
      </nav>

      {/* Mobile: language switcher stays permanently visible in the header bar
          (not tucked inside the hamburger menu) — same component/logic as desktop. */}
      <div className="flex items-center gap-3 min-[920px]:hidden">
        <LanguageSwitcher />

        {/* Mobile menu — Sheet/Radix renderowany dopiero po zamontowaniu na kliencie, aby uniknąć hydration mismatch (Radix generuje inne id podczas SSR i na kliencie) */}
        {!mounted ? (
          // Before hydration a tap here opens a static copy of the drawer
          // (premenu-script.ts) built from this data, so the menu works at once.
          <button
            type="button"
            data-premenu={JSON.stringify({
              home: homeHref,
              services: [homeSectionHref, navServices],
              about: [aboutHref, navAbout],
              contact: [contactHref, navContact],
              form: navSendForm,
            })}
            className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded="false"
          >
            <Menu className="h-6 w-6" />
          </button>
        ) : (
          <MobileMenuSheet
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            mobileMenuRef={mobileMenuRef}
            brandWordmark={<BrandWordmark />}
            homeHref={homeHref}
            onHomeLinkClick={(e) => {
              if (pathname === homeHref) {
                e.preventDefault()
                scrollToTop()
              } else {
                setIsOpen(false)
              }
            }}
            navServices={navServices}
            servicesHeader={megaMenuHeader}
            serviceGroups={serviceGroups}
            aboutHref={aboutHref}
            navAbout={navAbout}
            contactHref={contactHref}
            navContact={navContact}
            navSendForm={navSendForm}
          />
        )}
      </div>
    </div>
  )
}
