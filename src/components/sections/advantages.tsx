'use client'

import { useRef, useEffect } from 'react'
import { Tag, Camera, ShieldCheck, RotateCcw, Printer } from 'lucide-react'
import Image from 'next/image'

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
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = eyebrowRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.remove('fade-slide-init')
        el.classList.add('fade-slide-animate')
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const h2 = t?.h2 ?? PL_HEADER.h2
  const lead = t?.lead ?? PL_HEADER.lead
  const kdr = t?.kdr ?? PL_KDR

  return (
    <section className="pt-10 md:pt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <p ref={eyebrowRef} className="fade-slide-init brush-underline text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-cormorant font-semibold text-[hsl(45_25%_95%)] leading-[1.12] mx-auto mb-[28px] max-w-full whitespace-normal break-words text-[clamp(26px,8vw,48px)] md:whitespace-nowrap md:max-w-none md:text-[clamp(32px,3.2vw,48px)]"
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
                className="services-card-bg border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] rounded-[10px] overflow-hidden pt-6 px-[26px] pb-[26px] transition-transform duration-[180ms] hover:-translate-y-1"
              >
                <div className="flex items-center gap-[14px] mb-[18px]">
                  <span
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: 58, height: 58,
                      background: 'transparent',
                      border: '1.5px solid rgba(201,162,75,.7)',
                      boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                    }}
                  >
                    <Icon className="w-[30px] h-[30px] text-[#e6cc82]" />
                  </span>
                  <h3 className="m-0 text-[19px] font-cormorant font-semibold text-[hsl(45_25%_95%)] leading-[1.18]">
                    {override?.title ?? title}
                  </h3>
                </div>
                <p className="text-[14px] text-[hsl(45_18%_82%)] font-inter leading-[1.45] m-0">
                  {override?.text ?? text}
                </p>
              </article>
            )
          })}

          <article className="services-card-bg border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] rounded-[10px] overflow-hidden pt-6 px-[26px] pb-[26px] transition-transform duration-[180ms] hover:-translate-y-1">
            <div className="flex items-center gap-[14px] mb-[18px]">
              <span
                className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 58, height: 58,
                  border: '1.5px solid rgba(201,162,75,.7)',
                  boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                }}
              >
                <span style={{ width: 48, height: 34, background: 'rgb(227,231,240)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Image
                    src="/images/KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp"
                    alt="Karta Dużej Rodziny"
                    width={48}
                    height={34}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </span>
              </span>
              <span
                className="shrink-0 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 58, height: 58,
                  border: '1.5px solid rgba(201,162,75,.7)',
                  boxShadow: 'inset 0 0 0 4px rgba(201,162,75,.10), 0 1px 3px rgba(0,0,0,.25)',
                }}
              >
                <span style={{ width: 48, height: 34, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Image
                    src="/images/Karta-Seniora.webp"
                    alt="Karta Seniora"
                    width={48}
                    height={34}
                    className="object-contain w-full h-full"
                    loading="lazy"
                    quality={75}
                  />
                </span>
              </span>
              <h3 className="m-0 text-[19px] font-cormorant font-semibold text-[hsl(45_25%_95%)] leading-[1.18]">{kdr.title}</h3>
            </div>
            <p className="text-[14px] text-[hsl(45_18%_82%)] font-inter leading-[1.45] m-0">
              {kdr.text}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
