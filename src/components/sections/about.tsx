import Image from 'next/image'
import manifest from '@/config/manifest'
import GoogleReviews from '@/components/google-reviews'

interface AboutT {
  eyebrow?: string
  heading: string
  subheading: string
  ourCompany: string
  description: readonly string[]
  quote: string
  quoteSubtitle: string
  // legacy fields — kept for type-compat with existing translations
  kdkText?: string
  whyUs?: string
  checklist?: readonly string[]
}

const PL: AboutT = {
  eyebrow: 'Skąd nazwa',
  heading: 'Święty Omobonus XII wieku',
  subheading: '(łac. „Homobonus" — Dobry człowiek). Patron biznesmenów i przemysłowców. Był uczciwym rzemieślnikiem, który część swoich dochodów przekazywał potrzebującym.',
  ourCompany: 'O nas:',
  description: [
    'Jesteśmy zespołem, który wierzy, że praca może być również pomocą i służbą innym ludziom. Zysk jest potrzebny, ale nie jest naszym idolem ani bożkiem. Nie chcemy się bogacić za wszelką cenę.',
  ],
  quote: 'Brak oszustwa i szacunek do klienta',
  quoteSubtitle: 'to nasze podstawowe zasady pracy.',
}

export function About({
  t,
  bare = false,
  showReviews = true,
}: {
  t?: AboutT
  bare?: boolean
  showReviews?: boolean
} = {}) {
  const d = t ?? PL
  return (
    <section
      id="o-nas"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {!bare && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${manifest.Background_1}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Portrait */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-2xl max-w-sm w-full">
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

          {/* Text */}
          <div className="text-white space-y-6">
            {d.eyebrow && (
              <p className="text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a]">
                {d.eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-cormorant italic font-bold text-[#bfa76a] leading-tight">
              {d.heading}
            </h2>
            <p className="font-cormorant italic text-base md:text-lg text-[rgba(255,255,245,0.85)] leading-relaxed">
              {d.subheading}
            </p>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-2 text-white">
                {d.ourCompany}
              </h3>
              <p className="text-sm md:text-base text-[rgba(255,255,245,0.85)] leading-relaxed">
                {d.description[0]}
              </p>
            </div>
            <div className="border-l-2 border-[#bfa76a] pl-5 space-y-1">
              <p className="text-xl md:text-2xl font-serif font-semibold text-white">
                &ldquo;{d.quote}&rdquo;
              </p>
              <p className="text-lg font-serif text-[#bfa76a]">
                {d.quoteSubtitle}
              </p>
            </div>
          </div>
        </div>

        {showReviews && (
          <div className="mt-12">
            <GoogleReviews />
          </div>
        )}
      </div>
    </section>
  )
}
