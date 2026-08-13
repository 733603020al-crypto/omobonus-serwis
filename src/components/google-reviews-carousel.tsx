'use client'

import { useEffect, useRef } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { googleReviewsI18n } from "@/lib/i18n/google-reviews"

// Same edge/orientation/corner variability system as services.tsx's
// zakres-paper-card cards (literal strings, not template-built, so
// Tailwind's content scanner keeps them) — reused verbatim per the
// "don't invent a new algorithm" instruction, cycled per review card.
const ORIENT_CLASSES = [
    'zakres-orient-normal',
    'zakres-orient-flipx',
    'zakres-orient-flipy',
    'zakres-orient-rotate180',
]
const EDGE_CLASSES = [
    'zakres-edge-a',
    'zakres-edge-b',
    'zakres-edge-c',
    'zakres-edge-d',
    'zakres-edge-e',
    'zakres-edge-f',
    'zakres-edge-g',
    'zakres-edge-h',
]
const CORNER_CLASSES = [
    '',
    'zakres-corner-tl',
    'zakres-corner-tr',
    'zakres-corner-bl',
    'zakres-corner-br',
]
const CARD_STYLE: { edgeIdx: number; orientIdx: number; cornerIdx: number }[] = [
    { edgeIdx: 0, orientIdx: 0, cornerIdx: 3 },
    { edgeIdx: 1, orientIdx: 1, cornerIdx: 0 },
    { edgeIdx: 2, orientIdx: 3, cornerIdx: 2 },
    { edgeIdx: 3, orientIdx: 2, cornerIdx: 1 },
    { edgeIdx: 4, orientIdx: 0, cornerIdx: 0 },
    { edgeIdx: 5, orientIdx: 1, cornerIdx: 4 },
    { edgeIdx: 6, orientIdx: 3, cornerIdx: 0 },
    { edgeIdx: 7, orientIdx: 2, cornerIdx: 3 },
    { edgeIdx: 2, orientIdx: 1, cornerIdx: 2 },
    { edgeIdx: 5, orientIdx: 3, cornerIdx: 0 },
]

export type Review = {
    author_name: string
    rating: number
    text: string
    text_uk?: string | null
    text_ru?: string | null
    profile_photo_url?: string
    relative_time_description?: string
    relative_time_uk?: string | null
    relative_time_ru?: string | null
}

interface GoogleReviewsCarouselProps {
    reviews: Review[]
    rating: number | null
    totalReviews: number | null
}

export default function GoogleReviewsCarousel({ reviews, rating, totalReviews }: GoogleReviewsCarouselProps) {
    const pathname = usePathname()
    const locale = pathname?.startsWith('/uk') ? 'uk' : pathname?.startsWith('/ru') ? 'ru' : 'pl'
    const reviewsT = googleReviewsI18n[locale]

    const trackRef = useRef<HTMLDivElement | null>(null)
    const carouselContainerRef = useRef<HTMLDivElement | null>(null)
    const allOpinionsRef = useRef<HTMLDivElement | null>(null)
    const opinieTitleRef = useRef<HTMLDivElement | null>(null)
    const offsetRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const isRunningRef = useRef(true)
    const isHoverRef = useRef(false)

    const cardWidth = 320
    const gap = 24
    const speed = 0.35

    useEffect(() => {
        const el = opinieTitleRef.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.remove('fade-slide-init')
                el.classList.add('fade-slide-animate')
                observer.disconnect()
            }
        }, { threshold: 0.1 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const el = allOpinionsRef.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.remove('fade-slide-init')
                el.classList.add('fade-slide-animate')
                observer.disconnect()
            }
        }, { threshold: 0.1 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!trackRef.current || !carouselContainerRef.current || !reviews.length) return
        const track = trackRef.current
        const container = carouselContainerRef.current

        const animate = () => {
            if (isRunningRef.current && !isHoverRef.current) {
                const totalWidth = (cardWidth + gap) * reviews.length
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

        // Only run the scroll loop while the carousel is actually visible on screen —
        // avoids burning main-thread time on an animation nobody sees yet (e.g. during initial load).
        const sectionObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) startAnimation()
            else stopAnimation()
        }, { threshold: 0 })
        sectionObserver.observe(container)

        const handleVisibility = () => {
            isRunningRef.current = !document.hidden
        }

        document.addEventListener("visibilitychange", handleVisibility)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility)
            sectionObserver.disconnect()
            stopAnimation()
        }
    }, [reviews])

    if (!reviews.length) {
        return (
            <section className="py-6 text-center text-red-500">
                {reviewsT.empty}
            </section>
        )
    }


    return (
        <section className="relative w-full mt-[2px] md:mt-0 py-0 h-[420px] md:h-[320px] overflow-hidden">




            {/* Zawartość */}
            <div className="relative z-10">

                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-center gap-6 text-center md:items-start">

                        <a
                            href="https://g.page/omobonus-serwis/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-all duration-300 ease-out hover:-translate-y-1"
                        >

                            <div ref={opinieTitleRef} className="fade-slide-init text-2xl md:text-3xl font-cormorant font-bold leading-tight text-white">
                                {reviewsT.title}
                            </div>
                            <div ref={allOpinionsRef} className="fade-slide-init brush-underline text-[#bfa76a] underline text-xs">
                                {reviewsT.link}
                            </div>
                        </a>

                        {rating !== null && (
                            <a
                                href="https://g.page/omobonus-serwis/review"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center gap-4 px-5 py-3 rounded-lg bg-[#f5f5f5] border border-[#e0e0e0] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] self-center w-fit max-w-[320px] md:self-auto md:max-w-none"
                            >
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="absolute top-2 right-2 text-gray-600 opacity-70 group-hover:opacity-100 transition-opacity"
                                    aria-hidden="true"
                                >
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>

                                <svg width="36" height="36" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.36 1.46 8.28 3.27l6.15-6.15C34.66 3.07 29.7 1 24 1 14.61 1 6.51 6.62 2.56 14.8l7.32 5.68C11.5 14.17 17.27 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.97-2.19 5.49-4.66 7.18l7.21 5.6c4.22-3.89 6.65-9.61 6.65-17.07z" />
                                    <path fill="#FBBC05" d="M9.88 28.48c-.5-1.48-.78-3.06-.78-4.68s.28-3.2.78-4.68l-7.32-5.68C.92 16.54 0 20.13 0 23.8c0 3.67.92 7.26 2.56 10.36l7.32-5.68z" />
                                    <path fill="#34A853" d="M24 46c5.7 0 10.66-1.88 14.21-5.11l-7.21-5.6c-2 1.35-4.56 2.15-7 2.15-6.73 0-12.5-4.67-14.12-10.98l-7.32 5.68C6.51 41.38 14.61 46 24 46z" />
                                </svg>

                                <div className="text-left">
                                    <div className="text-xs text-gray-600">{reviewsT.ratingLabel}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-xl font-bold text-gray-900">
                                            {rating.toFixed(1)}
                                        </div>
                                        <div className="text-[#fbbc04] text-base leading-none">
                                            {"★★★★★".slice(0, Math.round(rating))}
                                        </div>
                                    </div>
                                    {totalReviews !== null && (
                                        <div className="text-xs text-gray-600">
                                            {reviewsT.basedOnReviews(totalReviews)}
                                        </div>
                                    )}
                                </div>
                            </a>
                        )}
                    </div>
                </div>

                <div
                    ref={carouselContainerRef}
                    className="relative w-screen -mx-[calc((100vw-100%)/2)] overflow-visible"
                    onMouseEnter={() => (isHoverRef.current = true)}
                    onMouseLeave={() => (isHoverRef.current = false)}
                >
                    <div
                        ref={trackRef}
                        className="flex"
                        style={{
                            gap: `${gap}px`,
                            willChange: "transform",
                        }}
                    >
                        {[...reviews, ...reviews].map((review, i) => {
                            const localizedText =
                                locale === 'uk' ? (review.text_uk || review.text) :
                                locale === 'ru' ? (review.text_ru || review.text) :
                                review.text
                            const localizedTime =
                                locale === 'uk' ? (review.relative_time_uk || review.relative_time_description) :
                                locale === 'ru' ? (review.relative_time_ru || review.relative_time_description) :
                                review.relative_time_description
                            const cardStyle = CARD_STYLE[i % CARD_STYLE.length]

                            return (
                            <div
                                key={i}
                                style={{ width: `${cardWidth}px` }}
                                className={`zakres-paper-card review-parchment ${EDGE_CLASSES[cardStyle.edgeIdx]} ${ORIENT_CLASSES[cardStyle.orientIdx]} ${CORNER_CLASSES[cardStyle.cornerIdx]} shrink-0 pt-[16px] pb-[8px] pl-[22px] pr-[22px] flex flex-col`}
                            >
                                <div className="relative z-10 flex items-center gap-3 mb-0.5">
                                    {review.profile_photo_url ? (
                                        <Image
                                            src={review.profile_photo_url.replace(/=s\d+/, '=s72')}
                                            alt={review.author_name}
                                            width={36}
                                            height={36}
                                            loading="lazy"
                                            className="w-9 h-9 rounded-full object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#bfa76a] text-[#3a2e24] flex items-center justify-center font-bold text-sm uppercase shrink-0">
                                            {review.author_name?.trim()?.charAt(0) || "?"}
                                        </div>
                                    )}

                                    <div className="font-semibold leading-tight text-sm text-[#3A2817]">
                                        {review.author_name}
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center gap-2 text-yellow-400 text-lg mb-1">
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, star) => (
                                            <span
                                                key={star}
                                                className={
                                                    star < Math.floor(review.rating)
                                                        ? "text-[#F4C542] text-[18px] [text-shadow:-0.75px_0_0_#7A4A00,0.75px_0_0_#7A4A00,0_-0.75px_0_#7A4A00,0_0.75px_0_#7A4A00,0_1px_0_rgba(255,255,255,0.18),0_1px_1px_rgba(70,40,0,0.22)]"
                                                        : "text-[#F4C542]/25 text-[18px]"
                                                }
                                            >
                                                {"★"}
                                            </span>
                                        ))}
                                    </div>

                                    {localizedTime && (
                                        <span className="text-[12px] text-[#72502B] ml-1">
                                            • {localizedTime}
                                        </span>
                                    )}
                                </div>

                                <p className="relative z-10 text-[12px] leading-[1.42] text-[#3A2817] tracking-[0.015em] line-clamp-6">
                                    {localizedText}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )


}
