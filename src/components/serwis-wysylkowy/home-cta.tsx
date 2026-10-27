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
  /** Plain text instead of an H2, and no glued phone+desktop pair in the HTML (home + service pages). */
  singleHeading?: boolean
}

const phoneOr = (desktop: ReactNode, phone?: ReactNode) =>
  phone ? (<><span className="md:hidden">{phone}</span><span className="max-md:hidden">{desktop}</span></>) : desktop

const HEADING = 'text-[22px] md:text-3xl font-cormorant font-bold leading-tight text-white'
const TEXT = 'font-serif text-[15px] md:text-lg font-normal leading-relaxed text-[#bfa76a]'

export function HomeCta({ heading, text, headingMobile, textMobile, button, href, singleHeading = false }: HomeCtaProps) {
  return (
    <section className="relative z-10 pt-6 pb-2 md:pt-8 md:pb-3">
      <div className="max-w-3xl mx-auto px-6 text-center text-white space-y-1">
        {singleHeading ? (
          // One text in the HTML (no "short?long?" glued pair); the phone wording
          // is the same line drawn again, hidden from screen readers. Plain text, not a heading.
          headingMobile ? (
            <>
              <div className={`max-md:sr-only ${HEADING}`}>{heading}</div>
              <div aria-hidden="true" className={`md:hidden !mt-0 ${HEADING}`}>{headingMobile}</div>
            </>
          ) : (
            <div className={HEADING}>{heading}</div>
          )
        ) : (
          <h2 className={HEADING}>
            {phoneOr(heading, headingMobile)}
          </h2>
        )}
        {singleHeading && textMobile ? (
          <>
            <p className={`max-md:sr-only ${TEXT}`}>{text}</p>
            <p aria-hidden="true" className={`md:hidden ${TEXT}`}>{textMobile}</p>
          </>
        ) : (
          <p className={TEXT}>
            {phoneOr(text, textMobile)}
          </p>
        )}
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
