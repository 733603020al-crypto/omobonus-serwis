// Smooth scroll to the contact block of the current page (the "Szybki kontakt" block above the footer,
// the "Kontakt" heading, the details and the map under the sticky header). Shared by the header
// address/phone and the "we Wrocławiu" half of the scope switch. No contact block on the page: does nothing.
export function scrollToContactBlock(e: { preventDefault: () => void }) {
  const footer = document.getElementById('kontakt')
  if (!footer) return // no contact block here: the plain #kontakt link does nothing harmful
  e.preventDefault()
  // Lift the home page's off-screen render skipping so the heights are real (see globals.css).
  document.documentElement.classList.add('cv-off')
  requestAnimationFrame(() => {
    const prev = footer.previousElementSibling
    const cta = document.querySelector('[data-site-cta]') ?? footer.querySelector('section') ?? (prev?.tagName === 'SECTION' && prev.querySelector('.more-about-cta') ? prev : null)
    // Align the CTA's text (not its padded section) under the header, so the tail of the reviews strip above stays hidden.
    const target = cta?.firstElementChild ?? cta ?? footer
    const headerBottom = (document.querySelector('header')?.getBoundingClientRect().bottom ?? 65) + 24
    const y = window.scrollY
    // Preferred: the whole CTA block right under the header. On short screens slide down (up to
    // the button, never past it) so that the bottom of the details/map stays on screen.
    let top = target.getBoundingClientRect().top + y - headerBottom
    const grid = footer.querySelector('.grid')
    const button = cta?.querySelector('a')
    if (grid && button) {
      const needed = grid.getBoundingClientRect().bottom + y + 8 - window.innerHeight
      const limit = button.getBoundingClientRect().top + y - headerBottom - 10
      top = Math.min(Math.max(top, needed), limit)
    }
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  })
}

