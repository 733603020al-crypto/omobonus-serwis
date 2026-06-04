'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

interface TeamMember {
  initial: string
  name: string
  role: string
  avatar?: string
}

export interface TeamT {
  eyebrow?: string
  h2?: string
  members?: readonly TeamMember[]
  quote?: string
}

const GRADIENTS = [
  'radial-gradient(circle at 38% 30%, #2c9461, #14613c)',
  'radial-gradient(circle at 38% 30%, #b07a2c, #6b4513)',
  'radial-gradient(circle at 38% 30%, #8a5a9c, #4f2d63)',
] as const

const PL_MEMBERS: readonly TeamMember[] = [
  { initial: 'M', name: 'Maksym', role: 'Obsługa klienta i naprawa sprzętu' },
  { initial: 'P', name: 'Paweł', role: 'Serwis sprzętu biurowego' },
  { initial: 'A', name: 'Andrzej', role: 'Wyceny i obsługa klienta', avatar: '/images/andrzey_avatar_400.webp' },
]

const PL = {
  eyebrow: 'Zespół',
  h2: 'Poznaj ludzi, nie infolinię',
  quote: 'Nas jest trzech. Znasz nas z imienia. Odbieramy telefon osobiście.',
}

export function Team({ t }: { t?: TeamT } = {}) {
  const eyebrow = t?.eyebrow ?? PL.eyebrow
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
  const members = t?.members ?? PL_MEMBERS

  return (
    <section className="pt-10 md:pt-16">
      <div className="max-w-5xl mx-auto px-6">
        <p ref={eyebrowRef} className="fade-slide-init brush-underline text-center text-sm font-inter font-semibold tracking-widest uppercase text-[#bfa76a] mb-8">
          {eyebrow}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((m, i) => (
            <article
              key={m.name}
              className="services-card-bg border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] rounded-[10px] overflow-hidden pt-5 pb-3 px-7 text-center"
            >
              <div
                className="w-[168px] h-[168px] rounded-full flex items-center justify-center text-white font-cormorant text-5xl font-bold mx-auto mb-[12px] border-2 border-[rgba(201,162,75,0.5)] overflow-hidden"
                style={{
                  background: m.avatar ? 'transparent' : GRADIENTS[i],
                  boxShadow: '0 0 0 6px rgba(201,162,75,0.1), 0 14px 30px rgba(0,0,0,0.4)',
                }}
              >
                {m.avatar ? (
                  <Image src={m.avatar} alt={m.name} width={168} height={168} className="w-full h-full object-cover" />
                ) : m.initial}
              </div>
              <h3 className="text-[24px] font-cormorant font-semibold text-[hsl(45_25%_95%)] mb-[2px]">{m.name}</h3>
              <p className="text-base text-[#cbb27c] font-cormorant italic">{m.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
