'use client'

import Link from 'next/link'
import manifest from '@/config/manifest'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const BrandWordmark = ({ className }: { className?: string }) => (
  <div className={cn('text-base md:text-[22px] font-cormorant tracking-wide flex gap-2', className)}>
    <span className="text-white">Omobonus</span>
    <span className="text-[#bfa76a]">serwis</span>
  </div>
)

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[65px] border-b border-border">
      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${manifest.Background_1}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Zawartość */}
      <div className="relative w-full h-full flex items-stretch justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              scrollToTop()
            }
          }}
          className="flex items-center gap-2 z-10 h-full"
        >
          <div className="h-full w-[40px] md:w-[48px] relative flex items-center flex-shrink-0">
            <Image
              src="/images/Logo_Omobonus.png"
              alt="Omobonus logo"
              fill
              className="object-contain object-center p-[1px]"
              sizes="(max-width: 768px) 40px, 48px"
              priority
              quality={90}
            />
          </div>
          <BrandWordmark />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-[28px] z-10 ml-[35px]">
          <Link
            href="/#uslugi"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('uslugi')
            }}
            className="text-[18px] text-[#bfa76a] font-cormorant hover:text-[#bfa76a] transition-colors"
          >
            Usługi
          </Link>
          <Link
            href="/#o-nas"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('o-nas')
            }}
            className="text-[18px] text-[#bfa76a] font-cormorant hover:text-[#bfa76a] transition-colors"
          >
            O nas
          </Link>
          <Link
            href="/#kontakt"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('kontakt')
            }}
            className="text-[18px] text-[#bfa76a] font-cormorant hover:text-[#bfa76a] transition-colors"
          >
            Kontakt
          </Link>
          <Link
            href="https://omobonus.com.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[18px] text-[#bfa76a] font-cormorant hover:text-[#bfa76a] transition-colors"
          >
            Sklep
          </Link>
          <Button
            variant="outline"
            className="text-[18px] text-[#bfa76a] font-cormorant px-4 py-1.5 rounded-full bg-transparent border-[#bfa76a]/80 hover:bg-[#bfa76a]/10 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('kontakt')
            }}
          >
            Wyślij zgłoszenie
          </Button>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden z-10">
            <Button variant="ghost" size="icon" className="text-white" aria-label="Otwórz menu nawigacyjne">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-transparent p-0 w-[78vw] max-w-[360px] sm:max-w-[420px] border-l-0"
          >
            <div
              ref={mobileMenuRef}
              className="relative rounded-l-lg border border-[#bfa76a]/30 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${manifest.Background_1}')` }}
              />
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 flex flex-col px-6 py-8 gap-6 text-left font-cormorant text-[20px] text-white">
                <Link
                  href="/"
                  className="inline-flex"
                  onClick={(e) => {
                    if (pathname === '/') {
                      e.preventDefault()
                      scrollToTop()
                    }
                    setIsOpen(false)
                  }}
                >
                  <BrandWordmark />
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/#uslugi"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('uslugi')
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Usługi
                  </Link>
                  <Link
                    href="/#o-nas"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('o-nas')
                    }}
                    className="hover:text-white transition-colors"
                  >
                    O nas
                  </Link>
                  <Link
                    href="/#kontakt"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('kontakt')
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Kontakt
                  </Link>
                  <Link
                    href="https://omobonus.com.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Sklep
                  </Link>
                </nav>
                <Button
                  variant="outline"
                  className="w-full border-[#bfa76a]/80 text-white text-[18px] font-cormorant rounded-full bg-transparent hover:bg-[#bfa76a]/15"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('kontakt')
                  }}
                >
                  Wyślij zgłoszenie
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
