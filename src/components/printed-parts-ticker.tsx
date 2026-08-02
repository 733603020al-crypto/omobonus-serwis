"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const parts: { name: string; src: string; alt: string; width: number; height: number }[] = [
  { name: "enclosure-cream", src: "/images/parts-strip/enclosure-cream.avif", alt: "Obudowa elektroniki wydrukowana w 3D", width: 439, height: 300 },
  { name: "enclosure-usb-c", src: "/images/parts-strip/enclosure-usb-c.avif", alt: "Obudowa z portem USB-C wydrukowana w 3D", width: 428, height: 300 },
  { name: "planetary-gearbox", src: "/images/parts-strip/planetary-gearbox.avif", alt: "Przekładnia planetarna wydrukowana w 3D", width: 372, height: 300 },
  { name: "multicolor-gearbox", src: "/images/parts-strip/multicolor-gearbox.avif", alt: "Wielokolorowa przekładnia wydrukowana w 3D", width: 390, height: 300 },
  { name: "air-duct-adapter", src: "/images/parts-strip/air-duct-adapter.avif", alt: "Adapter kanału powietrznego wydrukowany w 3D", width: 460, height: 300 },
  { name: "blue-wheel-hub", src: "/images/parts-strip/blue-wheel-hub.avif", alt: "Piasta koła wydrukowana w 3D", width: 293, height: 300 },
  { name: "orange-black-gearbox", src: "/images/parts-strip/orange-black-gearbox.avif", alt: "Przekładnia wydrukowana w 3D", width: 342, height: 300 },
  { name: "gearbox-extra", src: "/images/parts-strip/gearbox-extra.avif", alt: "Element mechaniczny wydrukowany w 3D", width: 468, height: 300 },
  { name: "enclosure-graphite-turquoise", src: "/images/parts-strip/enclosure-graphite-turquoise.avif", alt: "Obudowa elektroniki wydrukowana w 3D", width: 405, height: 300 },
  { name: "manifold", src: "/images/parts-strip/part-9b3489f2.avif", alt: "Kolektor techniczny wydrukowany w 3D", width: 490, height: 300 },
  { name: "power-supply-cream-blue", src: "/images/parts-strip/power-supply-cream-blue.avif", alt: "Obudowa zasilacza wydrukowana w 3D", width: 492, height: 300 },
  { name: "power-supply-cream-green", src: "/images/parts-strip/power-supply-cream-green.avif", alt: "Obudowa zasilacza wydrukowana w 3D", width: 488, height: 300 },
  { name: "keychains", src: "/images/parts-strip/keychains.avif", alt: "Breloki wydrukowane w 3D", width: 406, height: 300 },
  { name: "coffee-shop-sign", src: "/images/parts-strip/coffee-shop-sign.avif", alt: "Szyld reklamowy wydrukowany w 3D", width: 505, height: 300 },
  { name: "power-meter-white", src: "/images/parts-strip/power-meter-white.avif", alt: "Obudowa miernika energii wydrukowana w 3D", width: 481, height: 300 },
  { name: "power-meter-jumper-cables", src: "/images/parts-strip/power-meter-jumper-cables.avif", alt: "Obudowa zasilacza z kablami wydrukowana w 3D", width: 666, height: 300 },
]

// Docelowa prędkość ruchu — ta sama co w standardowym BrandTicker (0.4px/klatkę
// przy 60fps ≈ 24px/s), tak aby wizualna prędkość była identyczna niezależnie
// od tego, ile obrazów jest w pasku i jak są szerokie.
const TARGET_SPEED_PX_PER_SEC = 24
// Wartość używana tylko do pierwszego renderu, zanim JS zdąży zmierzyć realną
// szerokość toru (przybliżenie dla obecnego zestawu 13 obrazów na desktopie).
const FALLBACK_DURATION_SEC = 135

function PartsGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" style={{ gap: "40px" }} aria-hidden={ariaHidden}>
      {parts.map((part, i) => (
        <div
          key={i}
          className="shrink-0 flex items-center justify-center h-24 md:h-[150px]"
        >
          <Image
            src={part.src}
            alt={ariaHidden ? "" : part.alt}
            width={part.width}
            height={part.height}
            loading="lazy"
            unoptimized
            draggable={false}
            className="h-full w-auto max-w-none object-contain"
            style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.45))" }}
          />
        </div>
      ))}
    </div>
  )
}

export default function PrintedPartsTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [durationSec, setDurationSec] = useState(FALLBACK_DURATION_SEC)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateDuration = () => {
      // Tor zawiera 2 kopie grupy (animacja jedzie do -50%), więc dystans do
      // przebycia w jednej pętli to szerokość jednej kopii.
      const oneGroupWidth = track.scrollWidth / 2
      if (oneGroupWidth > 0) {
        setDurationSec(oneGroupWidth / TARGET_SPEED_PX_PER_SEC)
      }
    }

    updateDuration()
    const resizeObserver = new ResizeObserver(updateDuration)
    resizeObserver.observe(track)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <section className="relative w-full h-24 -mt-12 -mb-12 md:h-[150px] md:-mt-[30px] md:-mb-[75px] z-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible">
        <div
          ref={trackRef}
          className="flex items-center parts-ticker-track"
          style={{ gap: "40px", width: "max-content", animationDuration: `${durationSec}s` }}
        >
          <PartsGroup />
          <PartsGroup ariaHidden />
        </div>
      </div>
      <style>{`
        .parts-ticker-track {
          animation-name: parts-ticker-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes parts-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .parts-ticker-track {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  )
}
