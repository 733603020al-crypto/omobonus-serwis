'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Phone + address cells of the header capsule (HeaderInteractive) over one picture
// (header-contact-bg-v2.avif: green phone part, map with a red marker). Text stays real text.
// The address scrolls to the contact block with the map, the phone keeps its call / hint behaviour.
export function HeaderContactCapsule({
  addressLabel,
  phoneHref,
  phoneText,
  addressText,
  onAddressClick,
  onPhoneClick,
}: {
  addressLabel: string
  phoneHref: string
  phoneText: string
  addressText: string
  onAddressClick: (e: React.MouseEvent<HTMLElement>) => void
  onPhoneClick: (e: React.MouseEvent<HTMLElement>) => void
}) {
  // Server has no navigator.userAgent: stay "not mobile" until mounted (same as CallButton).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isMobile = mounted && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  // The house number is set in the same font as the phone number.
  const cut = addressText.lastIndexOf(' ')
  const street = cut > 0 ? addressText.slice(0, cut) : addressText
  const number = cut > 0 ? addressText.slice(cut + 1) : ''

  return (
    <div className="header-contact-cells">
      <a
        href={phoneHref}
        className="header-cell"
        onClick={(e) => {
          if (isMobile) return
          e.preventDefault()
          onPhoneClick(e)
        }}
      >
        <Image src="/images/call-round-glossy-v1.webp" alt="" width={36} height={36} sizes="36px" className="header-contact-icon" />
        <span className="header-contact-number">{phoneText}</span>
      </a>
      <a href="#kontakt" className="header-cell header-cell-address" aria-label={addressLabel} onClick={onAddressClick}>
        <span className="header-contact-lines">
          {street}
          {number && <> <span className="header-contact-number">{number}</span></>}
        </span>
      </a>
    </div>
  )
}
