'use client'

import { X } from 'lucide-react'

// Close button of the "Koszt dojazdu" window: calls onClose (popup) or hides the window it sits in.
export function KosztClose({ label = 'Zamknij', onClose }: { label?: string; onClose?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        if (onClose) return onClose()
        const w = e.currentTarget.closest<HTMLElement>('[data-koszt-dojazdu]')
        if (w) w.hidden = true
      }}
      className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full border border-[rgba(191,167,106,0.45)] bg-black/40 text-[#cbb27c] hover:text-[#f3df9a] hover:border-[rgba(200,169,107,0.8)] hover:bg-black/60 transition-colors cursor-pointer touch-manipulation"
    >
      <X className="w-4 h-4" strokeWidth={2.2} />
    </button>
  )
}
