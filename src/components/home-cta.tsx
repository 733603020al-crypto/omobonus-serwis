import type { ReactNode } from 'react'
import { CallButton } from '@/components/ui/CallButton'

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
          <CallButton variant="secondary" href={href} showIcon={false}>
            {button}
          </CallButton>
        </div>
      </div>
    </section>
  )
}
