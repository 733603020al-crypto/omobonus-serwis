import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import manifest from '@/config/manifest'
import GoogleReviews from '@/components/google-reviews'

export function About() {
  return (
    <section
      id="o-nas"
      className="relative pt-12 pb-4 md:pt-16 md:pb-12 overflow-hidden"

    >


      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.Background_1}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Zawartość */}
      <div className="relative w-full px-0">


        {/* Nagłówek sekcji */}
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <div className="text-3xl md:text-4xl font-cormorant font-bold text-[#bfa76a] leading-tight">
            Święty Omobonus XII wieku (łac. &ldquo;Dobry człowiek&rdquo;)
          </div>

          <p className="mt-[6px] text-lg md:text-xl text-[#bfa76a] font-cormorant italic">
            Patron biznesmenów i przemysłowców. Był uczciwym rzemieślnikiem, który część swoich dochodów przekazywał potrzebującym.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Lewa kolumna - obraz */}
          <div className="max-w-sm md:max-w-md mx-auto flex justify-center">

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-2xl">
              <Image
                src={manifest.omobonus_hero}
                alt="Święty Omobonus"
                width={400}
                height={500}
                className="object-contain rounded-lg w-full h-auto"
                quality={85}
              />
            </div>
          </div>

          {/* Prawa kolumna - tekst */}
          <div className="space-y-6 text-white max-w-[520px] max-md:max-w-[92%] mx-auto md:mx-0">
            <div>
              <div className="text-2xl md:text-3xl font-serif font-semibold mb-3 text-white">
                O nas:
              </div>
              <p className="text-[15px] md:text-[16px] text-[rgba(255,255,245,0.85)] leading-[1.3] tracking-tight">
                Jesteśmy zespołem, który wierzy, że praca może być również pomocą i służbą innym ludziom. Zysk jest potrzebny, ale nie jest naszym idolem ani bożkiem. Nie chcemy się bogacić za wszelką cenę.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-serif font-semibold text-white">
                &ldquo;Brak oszustwa i szacunek do klienta&rdquo;
              </p>
              <p className="text-xl md:text-2xl font-serif text-white">
                to nasze podstawowe zasady pracy
              </p>
            </div>

            <div>
              <p className="text-base md:text-lg text-[#bfa76a] mb-3">
                Współpracując z nami, możesz mieć pewność, że:
              </p>
              <ul className="space-y-1.5">
                {[
                  'podajemy prawdziwe ceny - nie "naprawa od 50 zł" lub "cena do uzgodnienia". Dzięki temu od razu znasz pełny koszt usługi.',
                  'działamy we Wrocławiu jako legalny serwis komputerów, laptopów i drukarek i nie podajemy cen netto, lecz wyłącznie ceny brutto;',
                  'podczas diagnozy otrzymujesz nie tylko suchą tabelkę z wyceną naprawy, ale też zdjęcia uszkodzeń;',
                  'jeśli naprawa się nie opłaca – powiemy to otwarcie;',
                  'nie wymieniamy części bez potrzeby;',
                  'wymienione części i podzespoły zawsze zwracamy Klientowi;',
                  'w razie potrzeby na czas naprawy zapewniamy usługę „Drukarka zastępcza";',
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[#bfa76a] italic text-sm leading-tight">
                      {text}
                    </span>
                  </li>
                ))}

                <li className="flex items-center gap-2">
                  <Image
                    src="/images/KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp"
                    alt="Karta Dużej Rodziny"
                    width={64}
                    height={64}
                    className="rounded-lg flex-shrink-0"
                    loading="lazy"
                    quality={75}
                  />
                  <span className="text-[#bfa76a] italic text-sm leading-tight">
                    honorujemy kartę Dużej Rodziny i kartę Seniora, oferując 10% zniżki na naprawę.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ ОТЗЫВЫ ВНИЗУ БЛОКА */}
        <div className="mt-0">
          <GoogleReviews />
        </div>
      </div>
    </section>
  )
}
