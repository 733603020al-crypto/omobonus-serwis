import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { GOLD_CTA, GOLD_CTA_SIZE } from '@/components/ui/gold-cta'

interface HomeCtaProps {
  heading: ReactNode
  text: ReactNode
  button: ReactNode
  href: string
}

export function HomeCta({ heading, text, button, href }: HomeCtaProps) {
  return (
    <section className="relative z-10 pt-6 pb-2 md:pt-8 md:pb-3">
      <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-1">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold leading-tight text-white">
          {heading}
        </h2>
        <p className="font-serif text-base md:text-lg font-normal leading-relaxed text-[#bfa76a]">
          {text}
        </p>
        <div className="flex justify-center">
          <Link
            href={href}
            prefetch={false}
            className={`${GOLD_CTA} ${GOLD_CTA_SIZE}`}
          >
            <span className="gold-text-sweep">{button}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
