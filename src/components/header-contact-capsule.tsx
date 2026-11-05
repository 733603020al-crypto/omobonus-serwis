'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const LABEL = 'cat-switch-label cat-switch-label-active gold-text-sweep'

// Phone + address cells of the header capsule (HeaderInteractive): one always-on gold pill
// (the sliding pill of the home category switch) holds both, split by a thin divider.
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
      <span
        aria-hidden="true"
        className="cat-switch-pill gold-border-flow gold-shiny"
        style={{ width: '100%', height: '100%' }}
      >
        <span className="gold-text-sweep" />
      </span>
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
        <span className={`header-contact-number ${LABEL}`}>{phoneText}</span>
      </a>
      <a href="#kontakt" className="header-cell" aria-label={addressLabel} onClick={onAddressClick}>
        <Image src="/images/bar-mapa-glossy-v1.webp" alt="" width={36} height={36} sizes="36px" className="header-contact-icon" />
        <span className={`header-contact-lines ${LABEL}`}>
          {street}
          {number && <> <span className="header-contact-number">{number}</span></>}
        </span>
      </a>
    </div>
  )
}
