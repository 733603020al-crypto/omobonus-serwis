import { Header } from '@/components/header'
import { Footer, type FooterT } from '@/components/footer'
import type { LegalPageContent } from '@/lib/legal/legal-pages'

interface LegalPageTemplateProps {
  content: LegalPageContent
  footerT?: FooterT
  cardMarginBottomClass: string
  minHeightZero?: boolean
  locale?: 'pl' | 'uk' | 'ru'
}

export function LegalPageTemplate({ content, footerT, cardMarginBottomClass, minHeightZero = false, locale = 'pl' }: LegalPageTemplateProps) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen pt-[65px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `var(--bg-services-card)`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <section className={`relative pb-0 pt-0 z-10${minHeightZero ? ' min-h-0' : ''}`}>
          <p className="text-white/90 text-lg md:text-xl text-center mb-2 md:mb-3 drop-shadow-md font-serif italic pt-1">
            {content.intro}
          </p>

          <div className="container mx-auto px-2 md:px-4 flex flex-col items-center">
            <div className={`w-full max-w-6xl bg-paper-texture shadow-2xl rounded-sm p-3 md:p-5 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top ${cardMarginBottomClass}`}>

              <h2 className="text-[#3a2e24] text-2xl md:text-3xl font-cormorant font-bold text-center mb-3 md:mb-4">
                {content.title}
              </h2>

              <div className="space-y-2 md:space-y-3 text-[#3a2e24]">
                {content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-lg md:text-xl font-cormorant font-bold">
                      {section.heading}
                    </div>
                    {section.body}
                  </div>
                ))}

                <div className="pt-3 border-t border-[#3a2e24]/20 mt-4">
                  <p className="text-sm md:text-base font-sans text-[#3a2e24]/70 italic">
                    {`${content.lastUpdatedLabel}: ${new Date().toLocaleDateString(content.dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer t={footerT} />
    </>
  )
}
