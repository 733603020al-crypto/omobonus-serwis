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
  /** Home page: keep one heading text in the HTML instead of the glued phone+desktop pair. */
  singleHeading?: boolean
}

const phoneOr = (desktop: ReactNode, phone?: ReactNode) =>
  phone ? (<><span className="md:hidden">{phone}</span><span className="max-md:hidden">{desktop}</span></>) : desktop

export function HomeCta({ heading, text, headingMobile, textMobile, button, href, singleHeading = false }: HomeCtaProps) {
  return (
    <section className="relative z-10 pt-6 pb-2 md:pt-8 md:pb-3">
      <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-1">
        {singleHeading && headingMobile ? (
          // One heading text in the HTML (no "short?long?" glued pair); the phone
          // wording is the same line drawn as plain text. Plain text, not a heading (home page).
          <>
            <div className="max-md:sr-only text-[22px] md:text-3xl font-cormorant font-bold leading-tight text-white">{heading}</div>
            <div aria-hidden="true" className="md:hidden !mt-0 text-[22px] font-cormorant font-bold leading-tight text-white">{headingMobile}</div>
          </>
        ) : (
          <h2 className="text-[22px] md:text-3xl font-cormorant font-bold leading-tight text-white">
            {phoneOr(heading, headingMobile)}
          </h2>
        )}
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
