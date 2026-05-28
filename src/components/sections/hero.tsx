'use client'

import Image from 'next/image'
import { CallButton } from '@/components/ui/CallButton'

interface HeroT {
  h1Line1: string
  h1Line2: string
  h1Line3: string
  tagline: string
  callMobile: string
  callDesktop: string
  submitForm: string
}

const PL: HeroT = {
  h1Line1: 'Profesjonalny serwis',
  h1Line2: 'komputerów i drukarek we',
  h1Line3: 'Wrocławiu',
  tagline: '"Uczciwość i szacunek do klienta" – to nasze podstawowe zasady pracy',
  callMobile: 'Zadzwoń teraz',
  callDesktop: '793 759 262',
  submitForm: 'Wyślij zgłoszenie',
}

export function Hero({ children, t }: { children?: React.ReactNode; t?: HeroT } = {}) {
  const d = t ?? PL

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      className="
        relative
        min-h-[calc(100svh-65px)]
        flex
        items-center
        justify-center
      "
    >
      {/* Tło */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/omobonus-hero-mobile.webp"
          alt="Omobonus serwis"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Zawartość */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center flex flex-col items-center">

        <h1 className="text-[60px] font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px]">
          {d.h1Line1} <br /> {d.h1Line2} <br /> {d.h1Line3}
        </h1>

        <p className="mt-[24px] text-[22px] font-cormorant leading-tight text-[#bfa76a] italic font-semibold drop-shadow-2xl">
          {d.tagline}
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
          <CallButton
            variant="primary"
            href="tel:+48793759262"
            className="w-[80%] md:w-auto"
          >
            <span className="md:hidden">{d.callMobile}</span>
            <span className="hidden md:inline">{d.callDesktop}</span>
          </CallButton>

          <CallButton
            variant="secondary"
            href="#formularz"
            className="w-[80%] md:w-auto"
          >
            {d.submitForm}
          </CallButton>
        </div>
      </div>
      {children}
    </section>
  )
}
