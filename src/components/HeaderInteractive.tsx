'use client'

import { scrollToContactBlock } from '@/lib/scroll-to-contact'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { MenuItemIcon } from '@/components/menu-item-icon'
import '@/app/styles/cat-switch.css'
import { HeaderContactCapsule } from '@/components/header-contact-capsule'
import { cn } from '@/lib/utils'
import { SERVICE_CATEGORIES, type MenuIconComponent } from '@/config/service-categories'

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

export type Locale = 'pl' | 'uk' | 'ru' | 'en'

const LOCALE_NAV: Record<Locale, {
  prefix: string
  homeHref: string
  homeSectionHref: (id: string) => string
  /** Logo alt; PL text when not set */
  logoAlt?: string
  labels: {
    services: string
    home: string
    about: string
    shipping: string
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
      home: 'Strona główna',
      about: 'O nas',
      shipping: 'Wysyłka',
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
      home: 'Головна',
      about: 'Про нас',
      shipping: 'Відправка',
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
      home: 'Главная',
      about: 'О нас',
      shipping: 'Отправка',
      contact: 'Контакт',
      shop: 'Магазин',
      call: 'Позвонить',
      sendForm: 'Быстрый контакт',
      megaMenuHeader: 'СЕРВИС И РЕМОНТ',
    },
  },
  en: {
    prefix: '/en',
    homeHref: '/en',
    homeSectionHref: (id) => `/en#${id}`,
    logoAlt: 'Omobonus Serwis – computer, laptop and printer repair Wrocław',
    labels: {
      services: 'Services',
      home: 'Home',
      about: 'About us',
      shipping: 'Mail-in',
      contact: 'Contact',
      shop: 'Shop',
      call: 'Call now',
      sendForm: 'Quick contact',
      megaMenuHeader: 'SERVICE AND REPAIR',
    },
  },
}

/* =========================
   Mega menu data
   ========================= */

// Four groups; desktop shows them as 4 columns from 1280 px and as a 2×2 grid
// below. The mobile drawer lists the same groups in one column under "Usługi".
// Data lives in config/service-categories (shared with the home page catalogue).
type ServiceGroupItem = { label: string; href: string; icon: string | MenuIconComponent; iconTall?: boolean }
export type ServiceGroup = {
  title: string
  titleMobile?: string
  href?: string
  items: ServiceGroupItem[]
  /** A second titled block stacked below `items` in the same menu column. */
  subgroup?: { title: string; items: ServiceGroupItem[] }
}

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

const ADDRESS_LABEL: Record<Locale, string> = {
  pl: 'Marcina Bukowskiego 174, Wrocław — przejdź do kontaktu i mapy',
  uk: 'Marcina Bukowskiego 174, Вроцлав — перейти до контактів і карти',
  ru: 'Marcina Bukowskiego 174, Вроцлав — перейти к контактам и карте',
  en: 'Marcina Bukowskiego 174, Wrocław — go to contact and map',
}

// Link of the page you are on, inside the mega menu: the same look as the hovered link, kept on.
const MEGA_CURRENT = ' !border-[#bfa76a]/80 bg-gradient-to-r from-[#bfa76a]/40 via-[#bfa76a]/20 to-transparent !text-[#f3df9a] shadow-[0_0_30px_rgba(191,167,106,0.45)] [text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&_img]:opacity-100 [&_svg]:opacity-100'

export function HeaderInteractive({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeHomeSection, setActiveHomeSection] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
const megaPanelRef = useRef<HTMLDivElement>(null)
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  // The mega panel stays mounted while its closing animation plays (header-mega-out, 450 ms).
  const [megaRender, setMegaRender] = useState(false)
  useEffect(() => {
    if (isServicesOpen) { setMegaRender(true); return }
    const t = setTimeout(() => setMegaRender(false), 450)
    return () => clearTimeout(t)
  }, [isServicesOpen])

  // Keep the mega menu inside the window: it is centred under "Usługi",
  // so on narrower windows its right edge can leave the screen.
  useLayoutEffect(() => {
    if (!megaRender) return
    const fit = () => {
      const el = megaPanelRef.current
      if (!el) return
      el.style.left = '50%'
      const r = el.getBoundingClientRect()
      const vw = document.documentElement.clientWidth
      const m = 8
      let shift = 0
      if (r.right > vw - m) shift = vw - m - r.right
      if (r.left + shift < m) shift = m - r.left
      el.style.left = `calc(50% + ${Math.round(shift)}px)`
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [megaRender])

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
    }, 280)
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current)
    }
  }, [])
  const nav = LOCALE_NAV[locale]
  const homeHref = nav.homeHref
  const aboutHref = `${nav.prefix}/o-nas`
  const shippingHref = `${nav.prefix}/serwis-wysylkowy`
  const contactHref = `${nav.prefix}/kontakt`
  const prefetchHome = () => {
    if (pathname !== homeHref) router.prefetch(homeHref)
  }
  const isServicesActive = pathname.startsWith(`${nav.prefix}/uslugi`) || (pathname === homeHref && activeHomeSection === 'uslugi')
  const isShippingActive = pathname === shippingHref
  const isAboutActive = pathname === aboutHref
  const isContactActive = pathname === contactHref

  const navServices = nav.labels.services
  const navHome = nav.labels.home
  const navAbout = nav.labels.about
  const navShipping = nav.labels.shipping
  const navContact = nav.labels.contact
  const addressLabel = ADDRESS_LABEL[locale]
  const navSendForm = nav.labels.sendForm
  const megaMenuHeader = nav.labels.megaMenuHeader
  const homeSectionHref = nav.homeSectionHref('uslugi')

  // Gold switch: one pill slides to the active menu cell (same measuring as the home category switch).
  const cellRefs = useRef<(HTMLElement | null)[]>([])
  const capsuleRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const [pillMoves, setPillMoves] = useState(false)
  const pillStarted = useRef(false)
  // The old header saves where the pill stood before the page changed (first cleanup wins), the new one starts from there.
  const pillLatest = useRef(pill)
  const pillSaved = useRef(false)
  useEffect(() => { pillLatest.current = pill }, [pill])
  const activeCell = isServicesActive ? 0 : isShippingActive ? 1 : isAboutActive ? 2 : isContactActive ? 3 : -1
  useEffect(() => {
    const measure = () => {
      const cell = cellRefs.current[activeCell]
      const parent = pillRef.current?.offsetParent as HTMLElement | null
      if (!cell || !parent) { setPill(null); return }
      const p = parent.getBoundingClientRect()
      const c = cell.getBoundingClientRect()
      if (!c.width) { setPill(null); return }
      const next = { x: c.left - p.left - parent.clientLeft, y: c.top - p.top - parent.clientTop, w: c.width, h: c.height }
      setPill((prev) => prev && Math.abs(prev.x - next.x) < 0.5 && Math.abs(prev.y - next.y) < 0.5 && Math.abs(prev.w - next.w) < 0.5 && Math.abs(prev.h - next.h) < 0.5 ? prev : next)
    }
    // The header is rebuilt on every page: start from where the pill stood on the previous page,
    // so it slides to the new cell instead of jumping.
    let from: { x: number; y: number; w: number; h: number } | null = null
    try { from = JSON.parse(sessionStorage.getItem('header-pill') || 'null') } catch {}
    if (from && activeCell >= 0 && !pillStarted.current) { setPill(from) } else measure()
    let ready = false // ResizeObserver fires once on observe(): skip it, the first move runs after the transition class is set
    const ro = new ResizeObserver(() => { if (ready) measure() })
    if (capsuleRef.current) ro.observe(capsuleRef.current)
    cellRefs.current.forEach((el) => el && ro.observe(el))
    const raf = requestAnimationFrame(() => { pillStarted.current = true; setPillMoves(true); ready = true; measure() })
    return () => {
      ro.disconnect(); cancelAnimationFrame(raf)
      if (!pillSaved.current && pillLatest.current) { pillSaved.current = true; try { sessionStorage.setItem('header-pill', JSON.stringify(pillLatest.current)) } catch {} }
    }
  }, [activeCell])
  const cellLabel = (active: boolean) => `cat-switch-label gold-text-sweep${active ? ' cat-switch-label-active' : ''}`

  useEffect(() => {
    setMounted(true)
  }, [])

  // Service links from the home page use an anchor (/#uslugi). The pathname
  // stays the home pathname, so keep the selected section in sync with the hash.
  useEffect(() => {
    const syncHomeSection = () => {
      setActiveHomeSection(window.location.hash.replace(/^#/, '') || null)
    }
    syncHomeSection()
    window.addEventListener('hashchange', syncHomeSection)
    return () => window.removeEventListener('hashchange', syncHomeSection)
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

  const serviceGroups: ServiceGroup[] = SERVICE_CATEGORIES.map((group) => ({
    title: group.title[locale],
    titleMobile: group.titleMobile?.[locale],
    href: group.href ? `${nav.prefix}${group.href}` : undefined,
    items: group.items
      .filter((item) => !item.locales || item.locales.includes(locale))
      .map((item) => ({ label: item.label[locale], href: `${nav.prefix}${item.href}`, icon: item.icon, iconTall: item.iconTall })),
    subgroup: group.subgroup
      ? {
          title: group.subgroup.title[locale],
          items: group.subgroup.items
            .filter((item) => !item.locales || item.locales.includes(locale))
            .map((item) => ({ label: item.label[locale], href: `${nav.prefix}${item.href}`, icon: item.icon, iconTall: item.iconTall })),
        }
      : undefined,
  }))

  const scrollToSection = (id: string) => {
    const performScroll = () => {
      const isHome = pathname === nav.homeHref
      if (!isHome) {
        window.location.href = nav.homeSectionHref(id)
        return
      }

      setActiveHomeSection(id)

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

  // Address and phone parts of the capsule (desktop): smooth scroll to the contact block of the current page so that the "Szybki kontakt"
  // block above the footer, the "Kontakt" heading, the details and the map all sit under the sticky header.
  const scrollToContact = scrollToContactBlock

  const scrollToTop = () => {
    setActiveHomeSection(null)
    if (window.location.hash) {
      window.history.replaceState(null, '', nav.homeHref)
    }
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
    <div className="header-bar gold-border-flow gold-shiny relative flex h-full w-full items-stretch justify-between px-4 max-[374px]:pr-2 md:px-8">
      <div className="z-10 flex h-full items-center min-[920px]:gap-5 min-[1160px]:gap-7">
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
            src="/images/Logo_Omobonus_round_v2.webp"
            alt={nav.logoAlt ?? 'Omobonus Serwis – serwis komputerów, laptopów i drukarek Wrocław'}
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

      </div>

      {/* Desktop nav */}
      <nav ref={capsuleRef} className="header-capsule z-10">
        <span ref={pillRef} aria-hidden="true" className={`cat-switch-pill gold-border-flow gold-shiny${pillMoves ? ' cat-switch-pill-move' : ''}`} style={pill ? { transform: `translate(${pill.x}px, ${pill.y}px)`, width: pill.w, height: pill.h } : { opacity: 0 }}>
          <span className="gold-text-sweep" />
        </span>
        {/* Phone + address in one always-on gold pill; desktop only, the mobile menu has its own call button */}
        <HeaderContactCapsule
          addressLabel={addressLabel}
          phoneHref="tel:+48793759262"
          phoneText="793 759 262"
          addressText="Bukowskiego 174"
          onAddressClick={scrollToContact}
          onPhoneClick={scrollToContact}
        />
        <div
          ref={(el) => { cellRefs.current[0] = el }}
          className="relative z-[2] flex items-stretch self-stretch"
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
            className="header-cell gap-1"
          >
            <span className={isServicesActive ? 'nav-active-underline' : ''}><span className={cellLabel(isServicesActive)}>{navServices}</span></span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesActive ? 'text-[#fff8eb]' : 'text-[#bfa76a]'} ${isServicesOpen ? 'rotate-180' : ''}`} />
          </Link>

          {/* While the mega menu is closed its links are still in the HTML
              (hidden, no icons), so search engines see every service page. */}
          {!megaRender && (
            <ul hidden>
              {serviceGroups.reduce<{ label: string; href: string }[]>((items, group) => {
                if (group.href) items.push({ label: group.title, href: group.href })
                items.push(...group.items)
                items.push(...(group.subgroup?.items ?? []))
                return items
              }, []).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} prefetch={false} tabIndex={-1}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Mega menu panel */}
          {megaRender && (
            <div
              ref={megaPanelRef}
              data-state={isServicesOpen ? 'open' : 'closed'}
              className="header-mega absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 z-50 w-[620px] min-[1280px]:w-[1120px] rounded-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden opacity-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-cover bg-center"
              style={{ backgroundImage: `var(--bg-parchment)` }}
            >
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 grid grid-cols-2 items-start gap-0 p-4 min-[1280px]:grid-cols-[0.95fr_1.12fr_1.05fr_0.95fr]">
                <div className="col-span-full row-start-1 mb-3">
                  <p className="col-span-full text-center pb-1.5 font-cormorant text-[16px] font-semibold uppercase tracking-[0.2em] text-white [text-shadow:0_0_14px_rgba(191,167,106,0.75)]">
                    {megaMenuHeader}
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#bfa76a]/70 to-transparent shadow-[0_0_14px_rgba(191,167,106,0.55)]" />
                </div>
                {serviceGroups.map((col, i) => (
                  <div key={i} className={MEGA_GROUP_CLASS[i]}>
                    {col.href ? (
                      <Link href={col.href} className="mb-1.5 block px-2 font-cormorant text-[17px] font-semibold text-[#e6cd8a]">
                        {col.title}
                      </Link>
                    ) : (
                      <p className="mb-1.5 px-2 font-cormorant text-[17px] font-semibold text-[#e6cd8a]">
                        {col.title}
                      </p>
                    )}
                    <div className="flex flex-col divide-y divide-[#bfa76a]/25 border border-[#bfa76a]/25">
                      {col.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          // Hover: the running gold ring of the home "Serwis i naprawa" category tabs (globals.css .gold-border-flow).
                          aria-current={item.href === pathname ? 'page' : undefined}
                          className={`gold-border-flow before:opacity-0 before:![animation-play-state:paused] hover:before:opacity-100 hover:before:![animation-play-state:running] flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5 font-cormorant text-[15px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100 [&:hover_svg]:opacity-100${item.href === pathname ? MEGA_CURRENT : ''}`}
                        >
                          <MenuItemIcon icon={item.icon} tall={item.iconTall} />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    {col.subgroup && (
                      <>
                        <p className="mb-1.5 mt-3 px-2 font-cormorant text-[17px] font-semibold text-[#e6cd8a]">
                          {col.subgroup.title}
                        </p>
                        <div className="flex flex-col divide-y divide-[#bfa76a]/25 border border-[#bfa76a]/25">
                          {col.subgroup.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              // Hover: the running gold ring of the home "Serwis i naprawa" category tabs (globals.css .gold-border-flow).
                              aria-current={item.href === pathname ? 'page' : undefined}
                          className={`gold-border-flow before:opacity-0 before:![animation-play-state:paused] hover:before:opacity-100 hover:before:![animation-play-state:running] flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5 font-cormorant text-[15px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100 [&:hover_svg]:opacity-100${item.href === pathname ? MEGA_CURRENT : ''}`}
                            >
                              <MenuItemIcon icon={item.icon} tall={item.iconTall} />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link href={shippingHref} prefetch={false} ref={(el) => { cellRefs.current[1] = el }} className="header-cell">
          <span className={isShippingActive ? 'nav-active-underline' : ''}><span className={cellLabel(isShippingActive)}>{navShipping}</span></span>
        </Link>
        <Link href={aboutHref} prefetch={false} ref={(el) => { cellRefs.current[2] = el }} className="header-cell">
          <span className={isAboutActive ? 'nav-active-underline' : ''}><span className={cellLabel(isAboutActive)}>{navAbout}</span></span>
        </Link>
        <Link href={contactHref} prefetch={false} ref={(el) => { cellRefs.current[3] = el }} className="header-cell">
          <span className={isContactActive ? 'nav-active-underline' : ''}><span className={cellLabel(isContactActive)}>{navContact}</span></span>
        </Link>

        <div className="relative z-[2] flex items-center self-stretch pl-2 pr-3">
          <LanguageSwitcher />
        </div>

      </nav>

      {/* Mobile: language switcher stays permanently visible in the header bar
          (not tucked inside the hamburger menu) — same component/logic as desktop. */}
      {/* Below 375px the flags ran into "serwis": there this gap is 4px and the
          bar's right padding 8px (the menu icon has its own 10px inner space). */}
      <div className="flex items-center gap-3 max-[374px]:gap-1 min-[920px]:hidden">
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
            navHome={navHome}
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
