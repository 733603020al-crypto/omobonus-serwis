'use client'

import type { RefObject } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CallButton } from '@/components/ui/CallButton'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface MobileMenuSheetProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    mobileMenuRef: RefObject<HTMLDivElement | null>
    brandWordmark: React.ReactNode
    homeHref: string
    onHomeLinkClick: (e: React.MouseEvent) => void
    homeSectionHref: string
    onServicesClick: (e: React.MouseEvent) => void
    navServices: string
    aboutHref: string
    navAbout: string
    contactHref: string
    navContact: string
    navShop: string
    navSendForm: string
}

export function MobileMenuSheet({
    isOpen,
    setIsOpen,
    mobileMenuRef,
    brandWordmark,
    homeHref,
    onHomeLinkClick,
    homeSectionHref,
    onServicesClick,
    navServices,
    aboutHref,
    navAbout,
    contactHref,
    navContact,
    navShop,
    navSendForm,
}: MobileMenuSheetProps) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="z-10 md:hidden">
                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-[78vw] max-w-[360px] border-l-0 bg-transparent p-0 sm:max-w-[420px]"
            >
                <div
                    ref={mobileMenuRef}
                    className="relative overflow-hidden rounded-l-lg border border-[#bfa76a]/30"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `var(--bg-parchment)`,
                        }}
                    />
                    <div className="absolute inset-0 bg-black/55" />

                    <div className="relative z-10 flex flex-col gap-6 px-6 py-8 font-cormorant text-[20px] text-white">
                        <Link href={homeHref} onClick={onHomeLinkClick}>
                            {brandWordmark}
                        </Link>

                        <nav className="flex flex-col gap-4">
                            <Link href={homeSectionHref} onClick={onServicesClick}>
                                {navServices}
                            </Link>
                            <Link href={aboutHref} onClick={() => setIsOpen(false)}>
                                {navAbout}
                            </Link>
                            <Link href={contactHref} onClick={() => setIsOpen(false)}>
                                {navContact}
                            </Link>

                            <Link
                                href="https://omobonus.com.pl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {navShop}
                            </Link>
                            <LanguageSwitcher />
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
