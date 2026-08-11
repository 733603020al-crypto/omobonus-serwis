import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface HomeCtaProps {
  heading: ReactNode
  text: ReactNode
  button: ReactNode
  href: string
}

export function HomeCta({ heading, text, button, href }: HomeCtaProps) {
  return (
    <section className="pt-12 pb-2 md:pt-16 md:pb-3">
      <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-2">
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
            className="inline-flex items-center justify-center min-w-[200px] px-8 py-[16px] font-cormorant font-semibold text-[20px] text-[#3A2817] zakres-paper-card zakres-edge-e zakres-orient-normal zakres-corner-bl"
          >
            <span className="relative z-10 inline-flex items-center gap-1">
              {button}
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
