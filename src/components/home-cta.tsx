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
    <section className="py-12 md:py-16">
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
            className="inline-flex items-center justify-center gap-1 min-w-[200px] rounded-full px-8 py-[16px] font-cormorant font-semibold text-[20px] transition-all duration-300 ease-out backdrop-blur-[2px] text-[#bfa76a] border border-[#bfa76a]/80 bg-[#bfa76a]/10 shadow-[0_0_20px_rgba(191,167,106,0.35)] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]"
          >
            {button}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
