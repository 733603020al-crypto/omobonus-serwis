"use client"

import { useEffect, useRef } from "react"

const brands: { name: string; src?: string; label?: string; heightClass?: string; maxWidthClass?: string }[] = [
  // компьютеры / ноутбуки
  { name: "apple", src: "/images/brands/apple.svg?v=2", heightClass: "h-[34px] md:h-[42px]", maxWidthClass: "max-w-[120px]" },
  { name: "microsoft", src: "/images/brands/microsoft.svg?v=2", heightClass: "h-[36px] md:h-[48px]", maxWidthClass: "max-w-[140px] md:max-w-[180px]" },
  { name: "dell", src: "/images/brands/dell.svg?v=4", heightClass: "h-[42px] md:h-[60px]", maxWidthClass: "max-w-[120px] md:max-w-[170px]" },
  { name: "hp",             heightClass: "h-[42px] md:h-[60px]", maxWidthClass: "max-w-[120px] md:max-w-[170px]" },
  { name: "lenovo",         heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "acer",           heightClass: "h-[28px] md:h-[34px]", maxWidthClass: "max-w-[150px] md:max-w-[190px]" },
  { name: "asus",           heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "msi", src: "/images/brands/msi.svg?v=2", heightClass: "h-[34px] md:h-[44px]", maxWidthClass: "max-w-[150px] md:max-w-[200px]" },
  { name: "fujitsu",        heightClass: "h-[34px] md:h-[46px]", maxWidthClass: "max-w-[170px] md:max-w-[230px]" },
  { name: "samsung",        heightClass: "h-[38px] md:h-[52px]", maxWidthClass: "max-w-[170px] md:max-w-[240px]" },
  // принтеры / офисная техника
  { name: "canon",          heightClass: "h-[24px] md:h-[30px]", maxWidthClass: "max-w-[120px] md:max-w-[160px]" },
  { name: "epson",          heightClass: "h-[24px] md:h-[30px]", maxWidthClass: "max-w-[120px] md:max-w-[160px]" },
  { name: "brother", src: "/images/brands/brother.svg?v=4", heightClass: "h-[26px] md:h-[34px]", maxWidthClass: "max-w-[160px] md:max-w-[220px]" },
  { name: "xerox",          heightClass: "h-[30px] md:h-[42px]", maxWidthClass: "max-w-[170px] md:max-w-[240px]" },
  { name: "ricoh",          heightClass: "h-[24px] md:h-[30px]", maxWidthClass: "max-w-[120px] md:max-w-[160px]" },
  { name: "kyocera",        heightClass: "h-[28px] md:h-[34px]", maxWidthClass: "max-w-[150px] md:max-w-[190px]" },
  { name: "konica-minolta", heightClass: "h-[36px] md:h-[48px]", maxWidthClass: "max-w-[200px]" },
  { name: "sharp",          heightClass: "h-[24px] md:h-[30px]", maxWidthClass: "max-w-[120px] md:max-w-[160px]" },
  { name: "lexmark",        heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "pantum",         heightClass: "h-[32px] md:h-[43px]", maxWidthClass: "max-w-[162px] md:max-w-[216px]" },
  { name: "toshiba",        heightClass: "h-[25px] md:h-[31px]", maxWidthClass: "max-w-[135px] md:max-w-[171px]" },
  { name: "olivetti",       heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "oki",            heightClass: "h-[27px] md:h-[34px]", maxWidthClass: "max-w-[117px] md:max-w-[153px]" },
  { name: "bixolon",       heightClass: "h-[34px] md:h-[45px]", maxWidthClass: "max-w-[153px] md:max-w-[198px]" },
  { name: "dymo",           heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "zebra",          heightClass: "h-[88px] md:h-[38px]", maxWidthClass: "max-w-[300px] md:max-w-[170px]" },
  { name: "godex",          heightClass: "h-[27px] md:h-[34px]", maxWidthClass: "max-w-[144px] md:max-w-[189px]" },
  { name: "apc", src: "/images/brands/apc.svg?v=2", heightClass: "h-[30px] md:h-[38px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  // drukarki 3D
  { name: "bambulab",  src: "/images/brands/bambulab.svg?v=2", heightClass: "h-[28px] md:h-[34px]", maxWidthClass: "max-w-[160px] md:max-w-[210px]" },
  { name: "formlabs",  heightClass: "h-[22px] md:h-[28px]", maxWidthClass: "max-w-[180px] md:max-w-[240px]" },
  { name: "creality",  heightClass: "h-[34px] md:h-[44px]", maxWidthClass: "max-w-[180px] md:max-w-[240px]" },
  { name: "anycubic",  src: "/images/brands/anycubic.svg?v=3",   heightClass: "h-[30px] md:h-[40px]", maxWidthClass: "max-w-[180px] md:max-w-[240px]" },
  { name: "prusa",      heightClass: "h-[40px] md:h-[52px]", maxWidthClass: "max-w-[130px] md:max-w-[170px]" },
  { name: "flashforge", src: "/images/brands/flashforge.svg?v=3", heightClass: "h-[30px] md:h-[40px]", maxWidthClass: "max-w-[190px] md:max-w-[250px]" },
  { name: "elegoo",     src: "/images/brands/elegoo.svg?v=4",    heightClass: "h-[27px] md:h-[36px]", maxWidthClass: "max-w-[190px] md:max-w-[250px]" },
  { name: "zortrax",    heightClass: "h-[20px] md:h-[25px]", maxWidthClass: "max-w-[160px] md:max-w-[200px]" },
  { name: "ultimaker",  src: "/images/brands/ultimaker.svg?v=5", heightClass: "h-[22px] md:h-[26px]", maxWidthClass: "max-w-[150px] md:max-w-[180px]" },
  { name: "phrozen",    src: "/images/brands/phrozen.svg?v=2", heightClass: "h-[54px] md:h-[62px]", maxWidthClass: "max-w-[66px] md:max-w-[76px]" },
  { name: "artillery",  src: "/images/brands/artillery.svg?v=2", heightClass: "h-[28px] md:h-[36px]", maxWidthClass: "max-w-[200px] md:max-w-[240px]" },
  { name: "snapmaker",  src: "/images/brands/snapmaker.svg?v=2", heightClass: "h-[26px] md:h-[34px]", maxWidthClass: "max-w-[120px] md:max-w-[155px]" },
]

const gap = 48
const speed = 0.4

export default function BrandTicker({ brandNames, compact }: { brandNames?: string[]; compact?: boolean } = {}) {
  const displayBrands = brandNames
    ? brands.filter(b => brandNames.includes(b.name))
    : brands
  // Enough copies so the full track always exceeds viewport width (seamless loop)
  const copies = displayBrands.length > 0
    ? Math.max(2, Math.ceil(4000 / (displayBrands.length * 200)) + 1)
    : 2
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const isRunningRef = useRef(true)
  const isHoverRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const animate = () => {
      if (isRunningRef.current && !isHoverRef.current) {
        const totalWidth = track.scrollWidth / copies
        offsetRef.current += speed
        if (offsetRef.current >= totalWidth) {
          offsetRef.current = 0
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate)
    }
    const stopAnimation = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    // Only run the scroll loop while the ticker is actually visible on screen.
    const sectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startAnimation()
      else stopAnimation()
    }, { threshold: 0 })
    sectionObserver.observe(section)

    const handleVisibility = () => {
      isRunningRef.current = !document.hidden
    }

    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility)
      sectionObserver.disconnect()
      stopAnimation()
    }
  }, [copies])

  return (
    <section ref={sectionRef} className={`relative w-full h-[68px] -mt-[34px] -mb-[34px] z-10 overflow-hidden${compact ? ' md:h-[56px]' : ''}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div
        className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible"
        onMouseEnter={() => (isHoverRef.current = true)}
        onMouseLeave={() => (isHoverRef.current = false)}
      >
        <div
          ref={trackRef}
          className="flex items-center"
          style={{ gap: `${gap}px`, willChange: "transform" }}
        >
          {Array.from({ length: copies }, () => displayBrands).flat().map((brand, i) => (
            <div
              key={i}
              className={`inline-flex shrink-0 items-center h-[68px] transition-opacity duration-300${compact ? ' md:h-[56px]' : ''}`}
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
                <img
                  src={brand.src ?? `/images/brands/${brand.name}.svg`}
                  alt={brand.name}
                  width={240}
                  height={62}
                  loading="lazy"
                  className={`w-auto object-contain ${brand.heightClass ?? ''} ${brand.maxWidthClass ?? ''}${compact ? ' md:max-h-[44px]' : ''}`}
                  style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))" }}
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
