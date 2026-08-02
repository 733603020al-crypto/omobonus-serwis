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
]

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
  return (
    <section className="relative w-full h-24 -mt-12 -mb-12 md:h-[150px] md:-mt-[75px] md:-mb-[75px] z-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible">
        <div
          className="flex items-center parts-ticker-track"
          style={{ gap: "40px", width: "max-content" }}
        >
          <PartsGroup />
          <PartsGroup ariaHidden />
        </div>
      </div>
      <style>{`
        .parts-ticker-track {
          animation: parts-ticker-scroll 32s linear infinite;
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
