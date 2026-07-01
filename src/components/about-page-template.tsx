import '@/app/styles/umka-paw.css'
import { Header } from '@/components/header'
import { ONasHero, type ONasHeroT } from '@/components/sections/o-nas-hero'
import { Advantages, type AdvantagesT } from '@/components/sections/advantages'
import { About, type AboutT } from '@/components/sections/about'
import { Team, type TeamT } from '@/components/sections/team'
import GoogleReviews from '@/components/google-reviews'
import BrandTicker from '@/components/brand-ticker'
import { BrandSectionCaption } from '@/components/sections/brand-section-caption'
import { Footer, type FooterT } from '@/components/footer'
import manifest from '@/config/manifest'

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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${manifest.Background_1}')`,
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
