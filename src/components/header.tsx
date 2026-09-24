import Image from 'next/image'
import manifest from '@/config/manifest'
import { HeaderInteractive, type Locale } from '@/components/HeaderInteractive'

export type { Locale }

/* =========================
   Header
   ========================= */

// Server Component: the background image needs no interactivity, so it never
// participates in client hydration. All state/effects/nav logic live in the
// HeaderInteractive client island rendered inside it.
export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 h-[65px] w-full border-b border-border">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Not the LCP element (Hero's background is) — loads eagerly but at
            fetchPriority="low", so its browser-auto preload doesn't compete
            with Hero's image for early bandwidth/priority-queue slots
            (a plain `loading="eager"` image still gets a default-high-priority
            preload otherwise). */}
        <Image
          src={manifest.Background_1}
          alt=""
          fill
          loading="eager"
          fetchPriority="low"
          sizes="100vw"
          quality={40}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <HeaderInteractive locale={locale} />
    </header>
  )
}
