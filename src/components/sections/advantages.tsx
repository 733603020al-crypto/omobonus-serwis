import { Tag, Camera, ShieldCheck, RotateCcw, Printer } from 'lucide-react'
import Image from 'next/image'
import { FadeSlideP } from '@/components/ui/fade-slide-p'

interface CardText {
  title: string
  text: string
}

export interface AdvantagesT {
  eyebrow?: string
  h2?: string
  lead?: string
  cards?: readonly CardText[]
  kdr?: CardText
}

const PL_HEADER = {
  eyebrow: 'Dlaczego Omobonus',
  h2: 'Uczciwość i szacunek do klienta',
  lead: 'To nie hasło reklamowe, tylko sposób, w jaki naprawdę pracujemy każdego dnia.',
}

const PL_CARDS = [
  {
    Icon: Tag,
    title: 'Uczciwe ceny',
    text: 'Podajemy prawdziwe ceny — nie „naprawa od 50 zł" ani „cena do uzgodnienia". Pełny koszt usługi znasz od razu.',
  },
  {
    Icon: Camera,
    title: 'Zdjęcia uszkodzeń',
    text: 'Podczas diagnozy otrzymujesz nie suchą tabelkę z wyceną, ale też zdjęcia rzeczywistych uszkodzeń sprzętu.',
  },
  {
    Icon: ShieldCheck,
    title: 'Uczciwa ocena',
    text: 'Jeśli naprawa się nie opłaca — powiemy to otwarcie. Nie wymieniamy części bez potrzeby, a wymienione zawsze oddajemy.',
  },
  {
    Icon: RotateCcw,
    title: 'Zwrot części po naprawie',
    text: 'Wymienione części i podzespoły oddajemy klientowi. Dzięki temu masz pewność, co zostało naprawdę wymienione.',
  },
  {
    Icon: Printer,
    title: 'Drukarka zastępcza',
    text: 'Na czas naprawy zapewniamy usługę „Drukarka zastępcza" — Twoja praca w domu i biurze nie staje w miejscu.',
  },
] as const

const PL_KDR: CardText = {
  title: '−10% zniżka',
  text: 'Honorujemy Kartę Dużej Rodziny i Kartę Seniora, oferując 10% zniżki na naprawę.',
}

export function Advantages({ t }: { t?: AdvantagesT } = {}) {
  const eyebrow = t?.eyebrow ?? PL_HEADER.eyebrow
  const h2 = t?.h2 ?? PL_HEADER.h2
  const lead = t?.lead ?? PL_HEADER.lead
  const kdr = t?.kdr ?? PL_KDR

  return (
    <section className="pt-10 md:pt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <FadeSlideP className="brush-underline text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-3">
            {eyebrow}
          </FadeSlideP>
          <h2
            className="font-cormorant font-semibold text-[hsl(45_25%_95%)] leading-[1.12] mx-auto mb-[28px] max-w-full whitespace-normal break-words text-[clamp(26px,7.7vw,30px)] md:whitespace-nowrap md:max-w-none md:text-[40px]"
            style={{ letterSpacing: '0.2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
          >
            {h2}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PL_CARDS.map(({ Icon, title, text }, i) => {
            const override = t?.cards?.[i]
            return (
              <article
                key={title}
                className="bg-gradient-to-b from-[rgba(191,167,106,0.24)] to-[rgba(60,45,25,0.32)] backdrop-blur-[6px] border-2 border-[#bfa76a]/80 hover:border-[#bfa76a] shadow-[0_0_20px_rgba(191,167,106,0.35)] rounded-lg overflow-hidden pt-[14px] px-[20px] pb-[16px] transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[rgba(191,167,106,0.32)] hover:to-[rgba(60,45,25,0.40)] hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
              >
                <div className="flex items-center gap-[12px] mb-[10px]">
                  <span
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 40, height: 40,
                      background: 'rgba(191,167,106,.12)',
                      border: '1.5px solid rgba(201,162,75,.7)',
                      boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                    }}
                  >
                    <Icon className="w-[20px] h-[20px] text-[#e6cc82]" />
                  </span>
                  <h3 className="m-0 text-[18px] font-cormorant font-semibold text-[#e6cc82] leading-[1.18]">
                    {override?.title ?? title}
                  </h3>
                </div>
                <div className="h-px mb-[10px] bg-gradient-to-r from-[#bfa76a]/60 via-[#bfa76a]/25 to-transparent" />
                <p className="text-[15px] md:text-[16px] text-[hsl(45_18%_82%)] font-cormorant leading-[1.3] m-0">
                  {override?.text ?? text}
                </p>
              </article>
            )
          })}

          <article className="bg-gradient-to-b from-[rgba(191,167,106,0.24)] to-[rgba(60,45,25,0.32)] backdrop-blur-[6px] border-2 border-[#bfa76a]/80 hover:border-[#bfa76a] shadow-[0_0_20px_rgba(191,167,106,0.35)] rounded-lg overflow-hidden pt-[14px] px-[20px] pb-[16px] transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[rgba(191,167,106,0.32)] hover:to-[rgba(60,45,25,0.40)] hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]">
            <div className="flex items-center gap-[12px] mb-[10px]">
              <span
                className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 40, height: 40,
                  border: '1.5px solid rgba(201,162,75,.7)',
                  boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                }}
              >
                <span style={{ width: 32, height: 23, background: 'rgb(227,231,240)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Image
                    src="/images/KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp"
                    alt="Karta Dużej Rodziny"
                    width={32}
                    height={23}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </span>
              </span>
              <span
                className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 40, height: 40,
                  border: '1.5px solid rgba(201,162,75,.7)',
                  boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                }}
              >
                <span style={{ width: 32, height: 23, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Image
                    src="/images/Karta-Seniora.webp"
                    alt="Karta Seniora"
                    width={32}
                    height={23}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </span>
              </span>
              <h3 className="m-0 text-[18px] font-cormorant font-semibold text-[#e6cc82] leading-[1.18]">{kdr.title}</h3>
            </div>
            <div className="h-px mb-[10px] bg-gradient-to-r from-[#bfa76a]/60 via-[#bfa76a]/25 to-transparent" />
            <p className="text-[15px] md:text-[16px] text-[hsl(45_18%_82%)] font-cormorant leading-[1.3] m-0">
              {kdr.text}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
