'use client'

import { useId, useRef, useState, type RefObject } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, ChevronDown } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CallButton } from '@/components/ui/CallButton'
import type { ServiceGroup } from '@/components/HeaderInteractive'

interface MobileMenuSheetProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    mobileMenuRef: RefObject<HTMLDivElement | null>
    brandWordmark: React.ReactNode
    homeHref: string
    onHomeLinkClick: (e: React.MouseEvent) => void
    navServices: string
    servicesHeader: string
    serviceGroups: ServiceGroup[]
    aboutHref: string
    navAbout: string
    contactHref: string
    navContact: string
    navSendForm: string
}

export function MobileMenuSheet({
    isOpen,
    setIsOpen,
    mobileMenuRef,
    brandWordmark,
    homeHref,
    onHomeLinkClick,
    navServices,
    servicesHeader,
    serviceGroups,
    aboutHref,
    navAbout,
    contactHref,
    navContact,
    navSendForm,
}: MobileMenuSheetProps) {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [servicesOpen, setServicesOpen] = useState(false)
    const servicesId = useId()

    return (
        <Sheet
            open={isOpen}
            onOpenChange={(open) => {
                // Every opening starts with the services list collapsed.
                if (open) setServicesOpen(false)
                setIsOpen(open)
            }}
        >
            <SheetTrigger asChild className="z-10 min-[920px]:hidden">
                <button
                    ref={triggerRef}
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[78vw] max-w-[360px] border-l-0 bg-transparent p-0 sm:max-w-[420px]"
                // Always hand focus back to the hamburger, also when the menu was
                // closed by a link (Radix alone sometimes left it on <body>).
                onCloseAutoFocus={(e) => {
                    e.preventDefault()
                    triggerRef.current?.focus({ preventScroll: true })
                }}
            >
                <div
                    ref={mobileMenuRef}
                    className="relative isolate flex min-h-0 flex-col overflow-hidden rounded-l-lg border border-[#bfa76a]/30"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `var(--bg-parchment)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-black/55" />

                    {/* Scrolls inside itself when the services list makes it taller than the screen. */}
                    <div className="relative z-10 flex min-h-0 flex-col gap-6 overflow-y-auto overscroll-contain px-6 py-8 font-cormorant text-[20px] text-white">
                        <Link href={homeHref} onClick={onHomeLinkClick}>
                            {brandWordmark}
                        </Link>

                        <nav className="flex flex-col gap-4">
                            <div>
                                <button
                                    type="button"
                                    aria-expanded={servicesOpen}
                                    aria-controls={servicesId}
                                    onClick={() => setServicesOpen((v) => !v)}
                                    className="flex items-center gap-1 text-left"
                                >
                                    {navServices}
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {servicesOpen && (
                                    <div id={servicesId} className="mt-3">
                                        <p className="pb-1.5 text-[13px] font-semibold uppercase tracking-[0.25em] text-[#f3df9a] [text-shadow:0_0_14px_rgba(191,167,106,0.75)]">
                                            {servicesHeader}
                                        </p>
                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#bfa76a]/70 to-transparent shadow-[0_0_14px_rgba(191,167,106,0.55)]" />
                                        {serviceGroups.map((group) => (
                                            <div key={group.title} className="mt-3">
                                                <p className="mb-1 text-[16px] font-semibold text-[#bfa76a]">
                                                    {group.title}
                                                </p>
                                                <div className="flex flex-col divide-y divide-[#bfa76a]/25">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="flex items-center gap-2 py-1.5 text-[17px] leading-snug"
                                                        >
                                                            <Image
                                                                src={item.icon}
                                                                alt=""
                                                                width={20}
                                                                height={20}
                                                                sizes="20px"
                                                                className="flex-shrink-0 object-contain opacity-90"
                                                                unoptimized
                                                            />
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link href={aboutHref} onClick={() => setIsOpen(false)}>
                                {navAbout}
                            </Link>
                            <Link href={contactHref} onClick={() => setIsOpen(false)}>
                                {navContact}
                            </Link>
                        </nav>

                        <CallButton
                            variant="secondary"
                            href={contactHref}
                            className="w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            {navSendForm}
                        </CallButton>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
