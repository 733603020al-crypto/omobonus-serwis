import { Tag, Camera, ShieldCheck, Printer, Clock } from 'lucide-react'
import Image from 'next/image'

const cards = [
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

export function Advantages() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-3">
            Dlaczego Omobonus
          </p>
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white mb-4">
            Uczciwość i szacunek do klienta
          </h2>
          <p className="font-cormorant italic text-lg text-[rgba(255,255,245,0.8)] max-w-2xl mx-auto">
            To nie hasło reklamowe, tylko sposób, w jaki naprawdę pracujemy każdego dnia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-[#bfa76a]/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#bfa76a]" />
              </div>
              <h3 className="text-lg font-cormorant font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-[rgba(255,255,245,0.75)] font-inter leading-relaxed">{text}</p>
            </article>
          ))}

          {/* KDR / Karta Seniora */}
          <article className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <div className="mb-4">
              <Image
                src="/images/KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp"
                alt="Karta Dużej Rodziny"
                width={64}
                height={64}
                className="rounded-lg"
                loading="lazy"
                quality={75}
              />
            </div>
            <h3 className="text-lg font-cormorant font-bold text-white mb-2">−10% zniżka</h3>
            <p className="text-sm text-[rgba(255,255,245,0.75)] font-inter leading-relaxed">
              Honorujemy Kartę Dużej Rodziny i Kartę Seniora, oferując 10% zniżki na naprawę.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
