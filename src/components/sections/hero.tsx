'use client'

import manifest from '@/config/manifest'
import Image from 'next/image'

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
    <section className="relative min-h-[calc(100svh-64px)] flex items-center justify-center">
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
      <div className="relative z-10 w-full px-[1.4%] text-center flex flex-col items-center">
        <h1 className="text-[60px] font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px]">
          Profesjonalny serwis <br /> komputerów i drukarek we <br /> Wrocławiu
        </h1>

        <p className="mt-[24px] text-[22px] font-cormorant leading-tight text-[#bfa76a] italic font-semibold drop-shadow-2xl">
          &quot;Uczciwość (brak oszustwa) i szacunek do klienta&quot; – to nasze podstawowe zasady pracy
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-[28px] items-center justify-center w-full">
          <a
            href="tel:+48793759262"
            className="
              w-[80%] md:w-auto
              inline-flex items-center justify-center
              border border-[#bfa76a]/80
              text-[18px] md:text-[20px]
              font-cormorant font-semibold
              text-[#bfa76a]
              py-[14px] md:py-[8px]
              px-[24px]
              rounded-full
              hover:bg-[#bfa76a]/10
              transition-all duration-300 ease-out
              hover:-translate-y-1
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]
              md:min-w-[200px]
            "
          >
            <img
              src="/images/telefon.png"
              alt="Telefon"
              className="w-6 h-6 mr-2 object-contain"
            />
            Zadzwoń teraz
          </a>

          <a
            href="#formularz"
            className="
              w-[80%] md:w-auto
              inline-flex items-center justify-center
              border border-[#bfa76a]/80
              text-[18px] md:text-[20px]
              font-cormorant font-semibold
              text-[#bfa76a]
              py-[14px] md:py-[8px]
              px-[24px]
              rounded-full
              hover:bg-[#bfa76a]/10
              transition-all duration-300 ease-out
              hover:-translate-y-1
              md:min-w-[200px]
            "
          >
            Wyślij zgłoszenie
          </a>
        </div>
      </div>
    </section>
  )
}
