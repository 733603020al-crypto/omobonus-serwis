import '@/app/styles/umka-paw.css'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { ONasHero, type ONasHeroT } from '@/components/sections/o-nas-hero'
import type { HeroT } from '@/components/sections/hero'
import { Advantages, type AdvantagesT } from '@/components/sections/advantages'
import { About, type AboutT } from '@/components/sections/about'
import { Team, type TeamT } from '@/components/sections/team'
import { BrandSectionCaption } from '@/components/sections/brand-section-caption'
import type { FooterT } from '@/components/footer'
import GoogleReviews from '@/components/google-reviews'

// Below-fold: split into separate chunks, same pattern as HomePageTemplate.
// No ssr:false anywhere here — content still renders server-side (SEO text stays
// in the initial HTML), only the JS bundle is split into smaller, later-loaded chunks.
// GoogleReviews (imported above) reads data/reviews.json directly on the server
// and is rendered as a plain Server Component — no dynamic() needed.
// Advantages/About/Team are likewise plain Server Components now (see home-page-template.tsx).
const BrandTicker = dynamic(() => import('@/components/brand-ticker'))
const Footer = dynamic(() => import('@/components/footer').then(m => m.Footer))

interface AboutPageTemplateProps {
  brandCaptionText: string
  onasHeroT?: ONasHeroT
  heroT?: HeroT
  advantagesT?: AdvantagesT
  aboutT?: AboutT
  teamT?: TeamT
  footerT?: FooterT
  locale?: 'pl' | 'uk' | 'ru'
}

export function AboutPageTemplate({
  brandCaptionText,
  onasHeroT,
  heroT,
  advantagesT,
  aboutT,
  teamT,
  footerT,
  locale = 'pl',
}: AboutPageTemplateProps) {
  return (
    <>
      <Header locale={locale} />
      <ONasHero t={onasHeroT} heroT={heroT} locale={locale} />
      {/* Tło jak na stronie głównej: nieruchoma warstwa pod spodem, żeby tło
          z ONasHero mogło rozpuścić się nad nią aż do „Skąd nazwa”. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10">
          <Advantages t={advantagesT} />
          <About t={aboutT} bare compact />
          <Team t={teamT} />
          <div className="relative z-10 mt-14 md:mt-20 mb-8 md:mb-10 text-center">
            <BrandSectionCaption text={brandCaptionText} />
            <div className="mt-8">
              <BrandTicker compact />
            </div>
          </div>
          <div className="pt-10 md:pt-16">
            <GoogleReviews />
          </div>
          <Footer t={footerT} bare />
        </div>
      </div>
    </>
  )
}
