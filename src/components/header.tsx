'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { CallButton } from '@/components/ui/CallButton'

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
    <span className="text-white">Omobonus</span>
    <span className="text-[#bfa76a]">serwis</span>
  </div>
)

/* =========================
   Header
   ========================= */

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

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
      if (pathname !== '/') {
        window.location.href = `/#${id}`
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
          href="/"
          className="z-10 flex h-full items-center gap-2"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              scrollToTop()
            }
          }}
        >
          <div className="relative flex h-full w-[40px] items-center md:w-[48px]">
            <Image
              src="/images/Logo_Omobonus.webp"
              alt="Omobonus Serwis – serwis komputerów i drukarek Wrocław"
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
          {[
            { id: 'uslugi', label: 'Usługi' },
            { id: 'o-nas', label: 'O nas' },
            { id: 'kontakt', label: 'Kontakt' },
          ].map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.id)
              }}
              className="font-cormorant text-[18px] text-[#bfa76a]"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="https://omobonus.com.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cormorant text-[18px] text-[#bfa76a]"
          >
            Sklep
          </Link>

          <CallButton variant="primary" href="tel:+48793759262">
            Zadzwoń teraz
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
                  href="/"
                  onClick={(e) => {
                    if (pathname === '/') {
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
                  {[
                    { id: 'uslugi', label: 'Usługi' },
                    { id: 'o-nas', label: 'O nas' },
                    { id: 'kontakt', label: 'Kontakt' },
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={`/#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.id)
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link
                    href="https://omobonus.com.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sklep
                  </Link>
                </nav>

                <CallButton
                  variant="secondary"
                  href="#formularz"
                  className="w-full"
                >
                  Wyślij zgłoszenie
                </CallButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
