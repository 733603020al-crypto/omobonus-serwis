// Inkjet print clip for HeroPrinterCarousel's `introVideo` (serwis-drukarek-
// atramentowych slide 0, home hero slide 3). poster = the clip's own frame 0,
// depth = hover-light depth map in the same 792×612 frame; box = printer's
// bbox in that frame, mapped onto the static 512×392 slide image
// atrament-carousel-v3-01.webp (still used on Apple WebKit / reduced motion /
// failed clip).
export const ATRAMENT_PRINT_CLIP = {
  src: '/images/atrament-carousel-v3-01-print2.webm',
  poster: '/images/atrament-carousel-v3-01-print2-first.webp',
  depth: '/images/atrament-carousel-v3-01-print2-depth.webp',
  frame: [792, 612],
  photoAspect: 512 / 392,
  box: [30 / 792, 18 / 612, 776 / 792, 594 / 612],
} as const
