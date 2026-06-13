'use client'

import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function FloatingContactButton() {
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const isUk = pathname?.startsWith('/uk') ?? false
    const contactHref = isUk ? '/uk/kontakt' : '/kontakt'

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return createPortal(
        <div
            className="
                fixed
                left-5
                bottom-[calc(1.25rem+env(safe-area-inset-bottom))]
                z-[9999]
                md:hidden
            "
        >
            <Link
                href={contactHref}
                aria-label="Przejdź do kontaktu"
                className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-14
                    h-14
                    rounded-full
                    backdrop-blur-[2px]
                    text-[#bfa76a]
                    border border-[#bfa76a]/80
                    bg-[#bfa76a]/10
                    shadow-[0_0_20px_rgba(191,167,106,0.35)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:bg-[#bfa76a]/20
                    hover:shadow-[0_0_28px_rgba(191,167,106,0.45)]
                "
            >
                <Mail className="w-6 h-6" />
            </Link>
        </div>,
        document.body
    )
}
