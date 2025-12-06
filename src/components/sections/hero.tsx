'use client'

import manifest from '@/config/manifest'

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.Логотип_картинка_на_сайт}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Zawartość */}
      <div className="relative z-10 w-full px-[1.4%] text-center flex flex-col items-center">
        <h1 className="text-[60px] font-cormorant font-bold leading-[1.1] text-[#ffffff] max-w-[900px]">
          Profesjonalny serwis <br /> komputerów i drukarek we <br /> Wrocławiu
        </h1>
        <p className="mt-[24px] text-[22px] font-cormorant leading-tight text-[#bfa76a] italic font-semibold drop-shadow-2xl">
          &quot;Brak oszustwa i szacunek do klienta&quot; to nasze podstawowe zasady pracy
        </p>
        <a
          href="#kontakt"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('kontakt')
          }}
          className="inline-flex items-center justify-center border border-[#bfa76a]/80 text-[15px] text-[#bfa76a] py-[8px] px-[24px] rounded-full hover:bg-[#bfa76a]/10 transition-colors mt-[24px]"
        >
          Wyślij zgłoszenie
        </a>
      </div>
    </section>
  )
}
