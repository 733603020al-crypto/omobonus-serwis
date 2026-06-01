interface StatItem {
  num: string
  pre?: string
  unit: string
  label: string
}

interface ONasHeroT {
  h1: string
  sub: string
  stats: StatItem[]
}

const PL: ONasHeroT = {
  h1: 'Nie bogacimy się na Twoim problemie',
  sub: 'Od ponad 10 lat naprawiamy komputery, laptopy i drukarki we Wrocławiu.',
  stats: [
    { num: '10', unit: '+', label: 'lat doświadczenia' },
    { num: '2', pre: 'do', unit: 'h', label: 'przyjazd we Wrocławiu' },
    { num: '15', unit: 'min', label: 'wstępna diagnoza' },
    { num: '48', pre: 'do', unit: 'h', label: 'większość napraw' },
  ],
}

export function ONasHero({ t }: { t?: ONasHeroT } = {}) {
  const d = t ?? PL
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white leading-tight mb-6">
          {d.h1}
        </h1>
        <p className="text-lg md:text-xl font-cormorant italic text-[rgba(255,255,245,0.8)] mb-12 max-w-2xl mx-auto">
          {d.sub}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {d.stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-5 text-center"
            >
              <div className="font-cormorant font-bold text-[#bfa76a] leading-none mb-1">
                {s.pre && (
                  <span className="text-lg mr-1 font-normal">{s.pre}</span>
                )}
                <span className="text-4xl md:text-5xl">{s.num}</span>
                <small className="text-xl">{s.unit}</small>
              </div>
              <div className="text-xs md:text-sm text-[rgba(255,255,245,0.7)] font-inter mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
