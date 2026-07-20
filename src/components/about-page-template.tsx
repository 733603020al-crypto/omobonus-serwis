import '@/app/styles/umka-paw.css'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { ONasHero, type ONasHeroT } from '@/components/sections/o-nas-hero'
import type { AdvantagesT } from '@/components/sections/advantages'
import type { AboutT } from '@/components/sections/about'
import type { TeamT } from '@/components/sections/team'
import BrandTicker from '@/components/brand-ticker'
import { BrandSectionCaption } from '@/components/sections/brand-section-caption'
import type { FooterT } from '@/components/footer'
import GoogleReviews from '@/components/GoogleReviewsLazy'

// Below-fold: split into separate chunks, same pattern as HomePageTemplate.
// No ssr:false anywhere here — content still renders server-side (SEO text stays
// in the initial HTML), only the JS bundle is split into smaller, later-loaded chunks.
// Exception: GoogleReviews (imported above) is not SEO content, so it's deferred
// with ssr:false inside its own client-component wrapper, to keep its hydration
// off the critical path.
const Advantages = dynamic(() => import('@/components/sections/advantages').then(m => ({ default: m.Advantages })))
const About = dynamic(() => import('@/components/sections/about').then(m => ({ default: m.About })))
const Team = dynamic(() => import('@/components/sections/team').then(m => ({ default: m.Team })))
const Footer = dynamic(() => import('@/components/footer').then(m => m.Footer))

interface AboutPageTemplateProps {
  brandCaptionText: string
  onasHeroT?: ONasHeroT
  advantagesT?: AdvantagesT
  aboutT?: AboutT
  teamT?: TeamT
  footerT?: FooterT
}

export function AboutPageTemplate({
  brandCaptionText,
  onasHeroT,
  advantagesT,
  aboutT,
  teamT,
  footerT,
}: AboutPageTemplateProps) {
  return (
    <>
      <Header />
      <ONasHero t={onasHeroT} />
      <div
        className="relative isolate overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), var(--bg-parchment)`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10">
          <Advantages t={advantagesT} />
          <About t={aboutT} bare compact showReviews={false} />
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
