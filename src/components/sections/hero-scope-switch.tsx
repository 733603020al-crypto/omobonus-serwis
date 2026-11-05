import Link from 'next/link'

// Two-position gold switch under the home H1: "we Wrocławiu | cała Polska".
// One gold capsule really slides between the halves (translateX, see .scope-switch
// in home-hero-words.css). The capsule is the old gold CTA (gold-border-flow +
// gold-shiny: running arc, dots, inner glow); its label layer counter-slides, so the
// active label always sits in the capsule and gets the .gold-text-sweep glint. The
// empty .gold-text-sweep child only supplies the original dots / inner glow.
// Position (0 = left, 1 = right) comes from the carousel (HomeHeroShowcase); the
// right half opens the shipping service page, the left half the contact page (same language).
// Labels of the switch per language (left = the local service, right = all of Poland by post).
export const SCOPE_LABELS = {
  pl: { left: 'we Wrocławiu', right: 'cała Polska' },
  uk: { left: 'у Вроцлаві', right: 'вся Польща' },
  ru: { left: 'во Вроцлаве', right: 'вся Польша' },
  en: { left: 'in Wrocław', right: 'all of Poland' },
} as const

export function HeroScopeSwitch({
  left,
  right,
  href,
  position,
  onLeft,
  onRight,
}: {
  left: string
  right: string
  href: string
  position: 0 | 1
  onLeft?: () => void
  onRight?: () => void
}) {
  const prefix = ['uk', 'ru', 'en'].find((l) => href.startsWith('/' + l + '/'))
  const contactHref = (prefix ? '/' + prefix : '') + '/kontakt'
  return (
    <div role="group" aria-label={`${left} / ${right}`} className="scope-switch gold-border-flow gold-shiny" data-pos={position}>
      <span className="scope-switch-pill gold-border-flow gold-shiny" aria-hidden="true">
        <span className="gold-text-sweep" />
        <span className="scope-switch-layer">
          <span className="scope-switch-cell"><span className="gold-text-sweep">{left}</span></span>
          <span className="scope-switch-cell"><span className="gold-text-sweep">{right}</span></span>
        </span>
      </span>
      <Link href={contactHref} prefetch={false} className="scope-switch-zone" onClick={onLeft}>
        <span className="gold-text-sweep">{left}</span>
      </Link>
      <Link href={href} prefetch={false} className="scope-switch-zone" onClick={onRight}>
        <span className="gold-text-sweep">{right}</span>
      </Link>
      <span className="scope-switch-base gold-text-sweep" aria-hidden="true" />
    </div>
  )
}
