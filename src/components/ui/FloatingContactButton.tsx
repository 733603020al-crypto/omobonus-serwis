'use client'

import { SquarePen } from 'lucide-react'
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
                    rounded-2xl
                    bg-white
                    shadow-[0_4px_16px_rgba(0,0,0,0.25)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
                "
            >
                <SquarePen className="w-6 h-6 text-[#0B1F3A]" />
            </Link>
        </div>,
        document.body
    )
}
