import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { GOLD_CTA, GOLD_CTA_SIZE } from '@/components/ui/gold-cta'

interface HomeCtaProps {
  heading: ReactNode
  text: ReactNode
  /** Krótsza wersja tylko na telefon (<768px); desktop bez zmian. */
  headingMobile?: ReactNode
  textMobile?: ReactNode
  button: ReactNode
  href: string
}

const phoneOr = (desktop: ReactNode, phone?: ReactNode) =>
  phone ? (<><span className="md:hidden">{phone}</span><span className="max-md:hidden">{desktop}</span></>) : desktop

export function HomeCta({ heading, text, headingMobile, textMobile, button, href }: HomeCtaProps) {
  return (
    <section className="relative z-10 pt-6 pb-2 md:pt-8 md:pb-3">
      <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-1">
        <h2 className="text-[22px] md:text-3xl font-cormorant font-bold leading-tight text-white">
          {phoneOr(heading, headingMobile)}
        </h2>
        <p className="font-serif text-[15px] md:text-lg font-normal leading-relaxed text-[#bfa76a]">
          {phoneOr(text, textMobile)}
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
