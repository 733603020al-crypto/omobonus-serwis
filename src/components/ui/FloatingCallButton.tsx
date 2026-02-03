'use client'

import { Phone } from 'lucide-react'

export function FloatingCallButton() {
    return (
        <a
            href="tel:+48793759262"
            aria-label="Zadzwoń"
            className="
        fixed
        bottom-5
        right-5
        z-[9999]
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-full
        bg-[#1c6e43]
        text-white
        shadow-[0_8px_24px_rgba(28,110,67,0.45)]
        transition-transform
        hover:scale-105
        active:scale-95
        md:hidden
      "
        >
            <Phone className="w-6 h-6" />
        </a>
    )
}
