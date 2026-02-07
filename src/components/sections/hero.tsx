'use client'

import Image from 'next/image'
import { CallButton } from '@/components/ui/CallButton'

export function Hero() {
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
        overflow-hidden
      "
    >
      {/* Tło */}
      <div className="absolute inset-0">
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
          Profesjonalny serwis <br /> komputerów i drukarek we <br /> Wrocławiu
        </h1>

        <p className="mt-[24px] text-[22px] font-cormorant leading-tight text-[#bfa76a] italic font-semibold drop-shadow-2xl">
          &quot;Uczciwość (brak oszustwa) i szacunek do klienta&quot; – to nasze podstawowe zasady pracy
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
          <CallButton
            variant="primary"
            href="tel:+48793759262"
            className="w-[80%] md:w-auto"
          >
            <span className="md:hidden">Zadzwoń teraz</span>
            <span className="hidden md:inline">793 759 262</span>
          </CallButton>

          <CallButton
            variant="secondary"
            href="#formularz"
            className="w-[80%] md:w-auto"
          >
            Wyślij zgłoszenie
          </CallButton>
        </div>
      </div>
    </section>
  )
}
