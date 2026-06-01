const members = [
  {
    initial: 'M',
    name: 'Maksym',
    role: 'Diagnostyka i naprawa sprzętu',
    gradient: 'radial-gradient(circle at 38% 30%, #2c9461, #14613c)',
  },
  {
    initial: 'P',
    name: 'Paweł',
    role: 'Serwis drukarek i ploterów',
    gradient: 'radial-gradient(circle at 38% 30%, #b07a2c, #6b4513)',
  },
  {
    initial: 'A',
    name: 'Andrzej',
    role: 'Kontakt z klientem i wyceny',
    gradient: 'radial-gradient(circle at 38% 30%, #8a5a9c, #4f2d63)',
  },
] as const

export function Team() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-3">
            Zespół
          </p>
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-white">
            Poznaj ludzi, nie infolinię
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((m) => (
            <article
              key={m.name}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                style={{ background: m.gradient }}
              >
                {m.initial}
              </div>
              <h3 className="text-xl font-cormorant font-bold text-white mb-1">{m.name}</h3>
              <p className="text-sm text-[#bfa76a] font-inter">{m.role}</p>
            </article>
          ))}
        </div>

        <p className="text-center mt-8 font-cormorant italic text-lg text-[rgba(255,255,245,0.7)]">
          &bdquo;Nas jest trzech. Znasz nas z imienia. Odbieramy telefon osobiście.&rdquo;
        </p>
      </div>
    </section>
  )
}
