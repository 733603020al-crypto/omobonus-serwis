'use client'

import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface CallButtonProps {
    variant?: 'primary' | 'secondary'
    href: string
    className?: string
    children: React.ReactNode
}

export function CallButton({
    variant = 'primary',
    href,
    className,
    children,
}: CallButtonProps) {
    const base =
        `
    inline-flex items-center justify-center gap-2
    min-w-[200px]
    rounded-full
    px-8 py-[10px]
    font-cormorant font-semibold text-[16px]

    transition-all duration-300 ease-out
    hover:-translate-y-1
  `

    const variants = {
        primary: `
      bg-[#1c6e43]
      text-white
      border border-transparent
      hover:bg-[#155d36]
      hover:shadow-[0_8px_20px_rgba(28,110,67,0.4)]
    `,
        secondary: `
      bg-transparent
      text-[#bfa76a]
      border border-[#bfa76a]/80
      hover:bg-[#bfa76a]/10
      hover:shadow-[0_0_20px_rgba(191,167,106,0.35)]
    `,
    }

    return (
        <Link
            href={href}
            className={cn(base, variants[variant], className)}
        >
            {variant === 'primary' && (
                <Phone className="w-4 h-4 shrink-0" />
            )}
            <span>{children}</span>
        </Link>
    )
}
