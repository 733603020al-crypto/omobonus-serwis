'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'
import { CallButton } from '@/components/ui/CallButton'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

import manifest from '@/config/manifest'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

/* =========================
   Brand
   ========================= */

const BrandWordmark = ({ className }: { className?: string }) => (
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
   Mega menu data
   ========================= */

const MEGA_MENU = [
  {
    items: [
      { label: 'Laptopów', labelUk: 'Ноутбуків', href: '/uslugi/serwis-laptopow', icon: '/images/01_serwis-laptopow-icon.webp' },
      { label: 'Komputerów stacjonarnych', labelUk: 'Стаціонарних комп\'ютерів', href: '/uslugi/serwis-komputerow-stacjonarnych', icon: '/images/02_serwis-komputerow-stacjonarnych-icon.webp' },
      { label: 'Outsourcing IT', labelUk: 'Аутсорсинг IT', href: '/uslugi/outsourcing-it', icon: '/images/03_outsourcing-it-icon.webp' },
    ],
  },
  {
    items: [
      { label: 'Drukarek laserowych', labelUk: 'Лазерних принтерів', href: '/uslugi/serwis-drukarek-laserowych', icon: '/images/04_serwis-drukarek-laserowych-icon.webp' },
      { label: 'Drukarek atramentowych', labelUk: 'Струменевих принтерів', href: '/uslugi/serwis-drukarek-atramentowych', icon: '/images/05_serwis-drukarek-atramentowych-icon.webp' },
      { label: 'Drukarek igłowych', labelUk: 'Матричних принтерів', href: '/uslugi/serwis-drukarek-iglowych', icon: '/images/07_serwis-drukarek-iglowych-icon.webp' },
      { label: 'Drukarek etykiet termicznych', labelUk: 'Термотрансферних принтерів', href: '/uslugi/serwis-drukarek-termicznych', icon: '/images/06_serwis-drukarek-termicznych-icon.webp' },
      { label: 'Drukarek 3D', labelUk: 'Принтерів 3D', href: '/uslugi/serwis-drukarek-3d', icon: '/images/Serwis_i_Naprawa_Drukarek_3D-icon.webp' },
      { label: 'Ploterów', labelUk: 'Плотерів', href: '/uslugi/serwis-plotterow', icon: '/images/08_serwis-ploterow-icon.webp' },
      { label: 'Wynajem (dzierżawa) drukarek', labelUk: 'Оренда принтерів', href: '/uslugi/wynajem-drukarek', icon: '/images/10_wynajem-drukarek-icon.webp' },
      { label: 'Drukarka zastępcza', labelUk: 'Принтер на заміну', href: '/uslugi/drukarka-zastepcza', icon: '/images/11_drukarka-zastepcza-icon.webp' },
    ],
  },
]

/* =========================
   Header
   ========================= */

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const isUk = pathname.startsWith('/uk')
  const homeHref = isUk ? '/uk' : '/'
  const aboutHref = isUk ? '/uk/o-nas' : '/o-nas'
  const contactHref = isUk ? '/uk/kontakt' : '/kontakt'
  const navServices = isUk ? 'Послуги' : 'Usługi'
  const navAbout = isUk ? 'Про нас' : 'O nas'
  const navContact = isUk ? 'Контакт' : 'Kontakt'
  const navShop = isUk ? 'Магазин' : 'Sklep'
  const navCall = isUk ? 'Зателефонувати' : 'Zadzwoń teraz'
  const navSendForm = isUk ? 'Надіслати заявку' : 'Wyślij zgłoszenie'
  const megaMenuHeader = isUk ? 'СЕРВІС І РЕМОНТ' : 'SERWIS I NAPRAWA'
  const homeSectionHref = isUk ? '/uk#uslugi' : '/#uslugi'

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const performScroll = () => {
      const isHome = isUk ? pathname === '/uk' : pathname === '/'
      if (!isHome) {
        window.location.href = isUk ? `/uk#${id}` : `/#${id}`
        return
      }

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
    <header className="sticky top-0 z-50 h-[65px] w-full border-b border-border">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={manifest.Background_1}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative flex h-full w-full items-stretch justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href={homeHref}
          className="group z-10 flex h-full items-center gap-2 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(191,167,106,0.30)]"
          onClick={(e) => {
            if (pathname === homeHref) {
              e.preventDefault()
              scrollToTop()
            }
          }}
        >
          <div className="relative flex h-full w-[40px] items-center md:w-[48px]">
            <Image
              src="/images/Logo_Omobonus.webp"
              alt="Omobonus Serwis – serwis komputerów, laptopów i drukarek Wrocław"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 40px, 48px"
              className="object-contain p-[1px]"
            />
          </div>
          <BrandWordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="z-10 ml-[35px] hidden items-center gap-[28px] md:flex">
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <Link
              href={homeSectionHref}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('uslugi')
              }}
              className="flex items-center gap-1 font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]"
              style={isServicesOpen ? { textShadow: '0 0 8px rgba(191,167,106,0.7), 0 0 18px rgba(191,167,106,0.35)' } : undefined}
            >
              {navServices}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </Link>

            {/* Mega menu panel */}
            {isServicesOpen && (
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 z-50 w-[600px] rounded-b-lg border-2 border-[rgba(200,169,107,0.5)] overflow-hidden opacity-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <Image src={manifest.Background_1} alt="" fill sizes="600px" className="object-cover object-center" />
                <div className="absolute inset-0 bg-black/75" />
                <div className="relative z-10 grid grid-cols-2 items-start gap-0 p-4">
                  <div className="col-span-2 mb-3">
                    <p className="pb-1.5 font-cormorant text-[13px] font-semibold uppercase tracking-[0.25em] text-[#f3df9a] [text-shadow:0_0_14px_rgba(191,167,106,0.75)]">
                      {megaMenuHeader}
                    </p>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#bfa76a]/70 to-transparent shadow-[0_0_14px_rgba(191,167,106,0.55)]" />
                  </div>
                  {MEGA_MENU.map((col, i) => (
                    <div key={i} className={i === 0 ? 'border-r border-[#bfa76a]/25 pr-3' : 'pl-3'}>
                      <div className="flex flex-col divide-y divide-[#bfa76a]/25">
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={isUk ? `/uk${item.href}` : item.href}
                            className="flex items-center gap-2 rounded-sm border border-transparent bg-transparent px-2 py-1.5 font-cormorant text-[15px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#bfa76a]/80 hover:bg-gradient-to-r hover:from-[#bfa76a]/40 hover:via-[#bfa76a]/20 hover:to-transparent hover:text-[#f3df9a] hover:shadow-[0_0_30px_rgba(191,167,106,0.45)] hover:[text-shadow:0_0_12px_rgba(191,167,106,0.65)] [&:hover_img]:opacity-100"
                          >
                            <Image
                              src={item.icon}
                              alt=""
                              width={22}
                              height={22}
                              sizes="22px"
                              className="flex-shrink-0 object-contain opacity-90"
                              unoptimized
                            />
                            {isUk ? item.labelUk : item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href={aboutHref} className="font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]">
            {navAbout}
          </Link>
          <Link href={contactHref} className="font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]">
            {navContact}
          </Link>

          <Link
            href="https://omobonus.com.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-[18px] text-[#bfa76a] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-[#f3df9a] hover:[text-shadow:0_0_10px_rgba(191,167,106,0.55)]"
          >
            {navShop}
          </Link>

          <LanguageSwitcher />

          <CallButton variant="primary" href="tel:+48793759262" className="hover:shadow-[0_0_24px_rgba(22,163,74,0.45)]">
            <span className="md:hidden">{navCall}</span>
            <span className="hidden md:inline">793 759 262</span>
          </CallButton>
        </nav>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="z-10 md:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[78vw] max-w-[360px] border-l-0 bg-transparent p-0 sm:max-w-[420px]"
          >
            <div
              ref={mobileMenuRef}
              className="relative overflow-hidden rounded-l-lg border border-[#bfa76a]/30"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${manifest.Background_1}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/55" />

              <div className="relative z-10 flex flex-col gap-6 px-6 py-8 font-cormorant text-[20px] text-white">
                <Link
                  href={homeHref}
                  onClick={(e) => {
                    if (pathname === homeHref) {
                      e.preventDefault()
                      scrollToTop()
                    } else {
                      setIsOpen(false)
                    }
                  }}
                >
                  <BrandWordmark />
                </Link>

                <nav className="flex flex-col gap-4">
                  <Link
                    href={homeSectionHref}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('uslugi')
                    }}
                  >
                    {navServices}
                  </Link>
                  <Link href={aboutHref} onClick={() => setIsOpen(false)}>
                    {navAbout}
                  </Link>
                  <Link href={contactHref} onClick={() => setIsOpen(false)}>
                    {navContact}
                  </Link>

                  <Link
                    href="https://omobonus.com.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {navShop}
                  </Link>
                  <LanguageSwitcher />
                </nav>

                <CallButton
                  variant="secondary"
                  href="#formularz"
                  className="w-full"
                >
                  {navSendForm}
                </CallButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
