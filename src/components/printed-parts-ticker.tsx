import Image from "next/image"

const parts: { name: string; src: string; alt: string; width: number; height: number; scale?: number }[] = [
  { name: "bracket", src: "/images/parts-strip/bracket.avif", alt: "Wspornik wydrukowany w 3D", width: 240, height: 227 },
  { name: "cable-clip", src: "/images/parts-strip/cable-clip.avif", alt: "Uchwyt do przewodu wydrukowany w 3D", width: 237, height: 240 },
  { name: "enclosure", src: "/images/parts-strip/enclosure.avif", alt: "Obudowa wydrukowana w 3D", width: 240, height: 178, scale: 1.05 },
  { name: "gear", src: "/images/parts-strip/gear.avif", alt: "Koło zębate wydrukowane w 3D", width: 240, height: 158, scale: 1.1 },
  { name: "hinge", src: "/images/parts-strip/hinge.avif", alt: "Zawias wydrukowany w 3D", width: 240, height: 153, scale: 1.15 },
  { name: "small-hinge", src: "/images/parts-strip/small-hinge.avif", alt: "Mały zawias wydrukowany w 3D", width: 240, height: 204 },
  { name: "holder-u", src: "/images/parts-strip/holder-u.avif", alt: "Uchwyt w kształcie U wydrukowany w 3D", width: 240, height: 193 },
]

function PartsGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center shrink-0" style={{ gap: "48px" }} aria-hidden={ariaHidden}>
      {parts.map((part, i) => (
        <div
          key={i}
          className="shrink-0 flex items-center justify-center h-14 w-14 md:h-[76px] md:w-[76px]"
        >
          <Image
            src={part.src}
            alt={ariaHidden ? "" : part.alt}
            width={part.width}
            height={part.height}
            loading="lazy"
            unoptimized
            draggable={false}
            className="max-w-full max-h-full w-auto h-auto object-contain"
            style={{
              transform: part.scale ? `scale(${part.scale})` : undefined,
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function PrintedPartsTicker() {
  return (
    <section className="relative w-full h-16 -mt-8 -mb-8 md:h-[76px] md:-mt-[38px] md:-mb-[38px] z-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible">
        <div
          className="flex items-center parts-ticker-track"
          style={{ gap: "48px", width: "max-content" }}
        >
          <PartsGroup />
          <PartsGroup ariaHidden />
        </div>
      </div>
      <style>{`
        .parts-ticker-track {
          animation: parts-ticker-scroll 28s linear infinite;
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
