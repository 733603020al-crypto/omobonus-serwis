// Shared gold pill CTA style (base: "Szybki kontakt"). The animated gold ring
// comes from .gold-border-flow::before, the label glint from .gold-text-sweep
// (both in globals.css) — put the label inside <span className="gold-text-sweep">.
export const GOLD_CTA =
  'inline-flex items-center justify-center rounded-full font-cormorant font-semibold transition-all duration-300 ease-out backdrop-blur-[2px] text-[#bfa76a] border border-[#bfa76a]/80 bg-[#bfa76a]/[0.14] shadow-[0_0_18px_rgba(191,167,106,0.28)] hover:-translate-y-1 hover:bg-[#bfa76a]/20 hover:shadow-[0_0_28px_rgba(191,167,106,0.38)] gold-border-flow'

// Regular in-page CTA size.
export const GOLD_CTA_SIZE = 'gap-1 min-w-[180px] px-[28.8px] py-[14.4px] text-[19px]'

// Hero CTA — ~10% larger than the regular one.
export const GOLD_CTA_SIZE_HERO = 'gap-1 min-w-[198px] px-[31.7px] py-[15.8px] text-[21px]'
