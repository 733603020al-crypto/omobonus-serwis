"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const brands: { name: string; src?: string; label?: string; heightClass?: string; maxWidthClass?: string }[] = [
  // компьютеры / ноутбуки
  { name: "apple", src: "/images/brands/apple.svg?v=2", heightClass: "h-[44px] md:h-[42px]", maxWidthClass: "max-w-[155px]" },
  { name: "microsoft", src: "/images/brands/microsoft.svg?v=2", heightClass: "h-[47px] md:h-[48px]", maxWidthClass: "max-w-[180px] md:max-w-[180px]" },
  { name: "dell", src: "/images/brands/dell.svg?v=4", heightClass: "h-[55px] md:h-[60px]", maxWidthClass: "max-w-[155px] md:max-w-[170px]" },
  { name: "hp",             heightClass: "h-[55px] md:h-[60px]", maxWidthClass: "max-w-[155px] md:max-w-[170px]" },
  { name: "lenovo",         heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "acer",           heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[195px] md:max-w-[190px]" },
  { name: "asus",           heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "msi", src: "/images/brands/msi.svg?v=2", heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[195px] md:max-w-[200px]" },
  { name: "fujitsu",        heightClass: "h-[44px] md:h-[46px]", maxWidthClass: "max-w-[220px] md:max-w-[230px]" },
  { name: "samsung",        heightClass: "h-[49px] md:h-[52px]", maxWidthClass: "max-w-[220px] md:max-w-[240px]" },
  // принтеры / офисная техника
  { name: "canon",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "epson",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "brother", src: "/images/brands/brother.svg?v=4", heightClass: "h-[34px] md:h-[34px]", maxWidthClass: "max-w-[210px] md:max-w-[220px]" },
  { name: "xerox",          heightClass: "h-[39px] md:h-[42px]", maxWidthClass: "max-w-[220px] md:max-w-[240px]" },
  { name: "ricoh",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "kyocera",        heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[195px] md:max-w-[190px]" },
  { name: "konica-minolta", heightClass: "h-[47px] md:h-[48px]", maxWidthClass: "max-w-[260px]" },
  { name: "sharp",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "lexmark",        heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "pantum",         heightClass: "h-[42px] md:h-[43px]", maxWidthClass: "max-w-[210px] md:max-w-[216px]" },
  { name: "toshiba",        heightClass: "h-[33px] md:h-[31px]", maxWidthClass: "max-w-[175px] md:max-w-[171px]" },
  { name: "olivetti",       heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "oki",            heightClass: "h-[35px] md:h-[34px]", maxWidthClass: "max-w-[150px] md:max-w-[153px]" },
  { name: "bixolon",       heightClass: "h-[44px] md:h-[45px]", maxWidthClass: "max-w-[200px] md:max-w-[198px]" },
  { name: "dymo",           heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "zebra",          heightClass: "h-[88px] md:h-[38px]", maxWidthClass: "max-w-[300px] md:max-w-[170px]" },
  { name: "godex",          heightClass: "h-[35px] md:h-[34px]", maxWidthClass: "max-w-[185px] md:max-w-[189px]" },
  { name: "apc", src: "/images/brands/apc.svg?v=2", heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  // drukarki 3D
  { name: "bambulab",  src: "/images/brands/bambulab.svg?v=2", heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[210px] md:max-w-[210px]" },
  { name: "formlabs",  heightClass: "h-[29px] md:h-[28px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "creality",  heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "anycubic",  src: "/images/brands/anycubic.svg?v=3",   heightClass: "h-[39px] md:h-[40px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "prusa",      heightClass: "h-[52px] md:h-[52px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "flashforge", src: "/images/brands/flashforge.svg?v=3", heightClass: "h-[39px] md:h-[40px]", maxWidthClass: "max-w-[245px] md:max-w-[250px]" },
  { name: "elegoo",     src: "/images/brands/elegoo.svg?v=4",    heightClass: "h-[35px] md:h-[36px]", maxWidthClass: "max-w-[245px] md:max-w-[250px]" },
  { name: "zortrax",    heightClass: "h-[26px] md:h-[25px]", maxWidthClass: "max-w-[210px] md:max-w-[200px]" },
  { name: "ultimaker",  src: "/images/brands/ultimaker.svg?v=5", heightClass: "h-[29px] md:h-[26px]", maxWidthClass: "max-w-[195px] md:max-w-[180px]" },
  { name: "phrozen",    src: "/images/brands/phrozen.svg?v=2", heightClass: "h-[70px] md:h-[62px]", maxWidthClass: "max-w-[85px] md:max-w-[76px]" },
  { name: "artillery",  src: "/images/brands/artillery.svg?v=2", heightClass: "h-[36px] md:h-[36px]", maxWidthClass: "max-w-[260px] md:max-w-[240px]" },
  { name: "snapmaker",  src: "/images/brands/snapmaker.svg?v=2", heightClass: "h-[34px] md:h-[34px]", maxWidthClass: "max-w-[155px] md:max-w-[155px]" },
]

const gap = 48
// Docelowa prędkość ruchu identyczna z poprzednią implementacją JS (rAF):
// 0.4px/klatkę przy ~60fps = 24px/s. Ta sama stała co w PrintedPartsTicker.
const TARGET_SPEED_PX_PER_SEC = 24

function BrandGroup({ displayBrands, compact, ariaHidden }: { displayBrands: typeof brands; compact?: boolean; ariaHidden?: boolean }) {
  return (
    <>
      {displayBrands.map((brand, i) => (
        <div
          key={i}
          className={`inline-flex shrink-0 items-center h-[78px] transition-opacity duration-300 ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}`}
          aria-hidden={ariaHidden}
        >
          {brand.label ? (
            <span
              className="whitespace-nowrap text-white shrink-0"
              style={{
                fontFamily: "'Arial Black','Arial Bold',Arial,sans-serif",
                fontWeight: 900,
                fontSize: "25px",
                filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))"
              }}
            >
              {brand.label}
            </span>
          ) : (
            <Image
              src={brand.src ?? `/images/brands/${brand.name}.svg`}
              alt={ariaHidden ? "" : brand.name}
              width={240}
              height={62}
              loading="lazy"
              unoptimized
              className={`w-auto object-contain ${brand.heightClass ?? ''} ${brand.maxWidthClass ?? ''}${compact ? ' md:max-h-[44px]' : ''}`}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))" }}
              draggable={false}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default function BrandTicker({ brandNames, compact }: { brandNames?: string[]; compact?: boolean } = {}) {
  const displayBrands = brandNames
    ? brands.filter(b => brandNames.includes(b.name))
    : brands
  // Tyle kopii, żeby jedna "grupa" (100%/copies szerokości toru) zawsze
  // przekraczała szerokość viewportu — pętla translateX(-100%/copies) zostaje
  // wizualnie bezszwowa nawet przy krótkich listach marek (np. slugBrands).
  const copies = displayBrands.length > 0
    ? Math.max(2, Math.ceil(4000 / (displayBrands.length * 200)) + 1)
    : 2
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const hoverRef = useRef<HTMLDivElement | null>(null)
  const [durationSec, setDurationSec] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    const hoverEl = hoverRef.current
    if (!track || !section) return

    const updateDuration = () => {
      const oneGroupWidth = track.scrollWidth / copies
      if (oneGroupWidth > 0) setDurationSec(oneGroupWidth / TARGET_SPEED_PX_PER_SEC)
    }
    updateDuration()
    const resizeObserver = new ResizeObserver(updateDuration)
    resizeObserver.observe(track)

    // Animacja CSS działa na compositorze bez JS na klatkę, ale pauzujemy ją,
    // gdy pasek jest poza ekranem, karta w tle, lub kursor nad paskiem — po co
    // animować coś, czego i tak nikt nie widzi (albo co ktoś chce obejrzeć).
    // Hover jest tu, a nie w CSS :hover, bo ten sam inline style ustawiają też
    // IntersectionObserver/visibilitychange — jeden wspólny "właściciel" stanu
    // zamiast dwóch reguł nadpisujących się nawzajem.
    let isIntersecting = false
    let isHovered = false
    const applyPlayState = () => {
      track.style.animationPlayState = isIntersecting && !document.hidden && !isHovered ? 'running' : 'paused'
    }

    const sectionObserver = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      applyPlayState()
    }, { threshold: 0 })
    sectionObserver.observe(section)

    document.addEventListener("visibilitychange", applyPlayState)

    const handleMouseEnter = () => { isHovered = true; applyPlayState() }
    const handleMouseLeave = () => { isHovered = false; applyPlayState() }
    hoverEl?.addEventListener("mouseenter", handleMouseEnter)
    hoverEl?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("visibilitychange", applyPlayState)
      hoverEl?.removeEventListener("mouseenter", handleMouseEnter)
      hoverEl?.removeEventListener("mouseleave", handleMouseLeave)
      sectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [copies])

  const toPercent = 100 / copies

  return (
    <section ref={sectionRef} className={`relative w-full h-[78px] -mt-[39px] -mb-[39px] md:-mt-[34px] md:-mb-[34px] z-10 overflow-hidden ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div ref={hoverRef} className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible brand-ticker-hover-pause">
        <div
          ref={trackRef}
          className="flex items-center brand-ticker-track"
          style={{ gap: `${gap}px`, width: "max-content", willChange: "transform", animationDuration: `${durationSec}s` }}
        >
          {Array.from({ length: copies }).map((_, i) => (
            <BrandGroup key={i} displayBrands={displayBrands} compact={compact} ariaHidden={i > 0} />
          ))}
        </div>
      </div>
      <style>{`
        .brand-ticker-track {
          animation-name: brand-ticker-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: ${durationSec > 0 ? 'running' : 'paused'};
        }
        @keyframes brand-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-${toPercent}%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-ticker-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
