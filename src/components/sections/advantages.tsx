import { Tag, Camera, ShieldCheck, Printer, Clock } from 'lucide-react'
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
    Icon: Printer,
    title: 'Drukarka zastępcza',
    text: 'Na czas naprawy zapewniamy usługę „Drukarka zastępcza" — Twoja praca w domu i biurze nie staje w miejscu.',
  },
  {
    Icon: Clock,
    title: 'Diagnoza w 15 minut',
    text: 'Wstępną diagnozę usterki wykonujemy zwykle w kwadrans. Szybko wiesz, co się dzieje i ile to potrwa.',
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
          <p className="text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-cormorant font-semibold text-[hsl(45_25%_95%)] leading-[1.12] mx-auto mb-[28px] whitespace-nowrap"
            style={{ fontSize: 'clamp(32px,3.2vw,48px)', letterSpacing: '0.2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
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
                className="services-card-bg border border-[hsl(45_20%_35%)] rounded-[10px] overflow-hidden pt-6 px-[26px] pb-[26px] transition-transform duration-[180ms] hover:-translate-y-1"
              >
                <div className="flex items-center gap-[14px] mb-[18px]">
                  <Icon className="w-10 h-10 shrink-0 text-[hsl(45_50%_70%)]" />
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

          <article className="services-card-bg border border-[hsl(45_20%_35%)] rounded-[10px] overflow-hidden pt-6 px-[26px] pb-[26px] transition-transform duration-[180ms] hover:-translate-y-1">
            <div className="flex items-center gap-[14px] mb-[18px]">
              <Image
                src="/images/KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp"
                alt="Karta Dużej Rodziny"
                width={40}
                height={40}
                className="rounded-[7px] shrink-0"
                loading="lazy"
                quality={75}
              />
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
