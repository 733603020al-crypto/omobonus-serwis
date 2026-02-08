"use client"

import { useEffect, useRef, useState } from "react"

type Review = {
    author_name: string
    rating: number
    text: string
    profile_photo_url?: string
    relative_time_description?: string
}

export default function GoogleReviews() {
    const [reviews, setReviews] = useState<Review[]>([])
    const [rating, setRating] = useState<number | null>(null)
    const [totalReviews, setTotalReviews] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    const trackRef = useRef<HTMLDivElement | null>(null)
    const offsetRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const isRunningRef = useRef(true)
    const isHoverRef = useRef(false)

    const cardWidth = 320
    const gap = 24
    const speed = 0.35

    useEffect(() => {
        fetch("/api/google-reviews")
            .then(res => res.json())
            .then(data => {
                if (data?.reviews) {
                    setReviews(data.reviews.slice(0, 10))
                }
                if (typeof data?.rating === "number") {
                    setRating(data.rating)
                }
                if (typeof data?.totalReviews === "number") {
                    setTotalReviews(data.totalReviews)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (!trackRef.current || !reviews.length) return

        const animate = () => {
            if (!isRunningRef.current || isHoverRef.current) {
                rafRef.current = requestAnimationFrame(animate)
                return
            }

            const track = trackRef.current
            if (!track) return

            const totalWidth = (cardWidth + gap) * reviews.length

            offsetRef.current += speed
            if (offsetRef.current >= totalWidth) {
                offsetRef.current = 0
            }

            track.style.transform = `translateX(-${offsetRef.current}px)`
            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)

        const handleVisibility = () => {
            isRunningRef.current = !document.hidden
        }

        document.addEventListener("visibilitychange", handleVisibility)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }, [reviews])

    if (loading) {
        return (
            <section className="py-4 text-center text-sm text-gray-400">
                Ładowanie opinii klientów…
            </section>
        )
    }

    if (!reviews.length) {
        return (
            <section className="py-6 text-center text-red-500">
                Brak opinii (API nie zwróciło danych)
            </section>
        )
    }


    return (
        <section className="relative w-full mt-6 md:mt-0 py-0 h-[420px] md:h-[320px] overflow-hidden">




            {/* Zawartość */}
            <div className="relative z-10">

                <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-center gap-6 text-center md:items-start">

                        <a
                            href="https://www.google.com/search?sca_esv=2e645401c35289e6&sxsrf=ANbL-n4lHBH2k4FnOY0MzfsfZ2bAtB5v3w:1769877145074&q=Omobonus+-+Profesjonalny+serwis+komputer%C3%B3w+i+drukarek+we+Wroc%C5%82awiu+%D0%9E%D1%82%D0%B7%D1%8B%D0%B2%D1%8B&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MjY0NjO3MDExNDa2MLcwMDMz3sDI-Iox0D83Pyk_r7RYQVchoCg_LbU4Kz8vMSevUqE4tag8s1ghOz-3oLQktejw5nKFTIWUotLsxKLUbIXyVIXwovzko02J5ZmlChfmXWy6sP1i94VNF7sXsVLfTAB1M-fvwgAAAA&rldimm=2313678441338780663&tbm=lcl&hl=ru-PL#lkt=LocalPoiReviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-all duration-300 ease-out hover:-translate-y-1"
                        >
                            <div className="text-2xl md:text-3xl font-cormorant font-bold leading-tight text-white">
                                Opinie klientów z Google
                            </div>
                            <div className="text-[#bfa76a] underline text-xs">
                                Zobacz wszystkie opinie w Google →
                            </div>
                        </a>

                        {rating !== null && (
                            <a
                                href="https://www.google.com/search?sca_esv=2e645401c35289e6&sxsrf=ANbL-n4lHBH2k4FnOY0MzfsfZ2bAtB5v3w:1769877145074&q=Omobonus+-+Profesjonalny+serwis+komputer%C3%B3w+i+drukarek+we+Wroc%C5%82awiu+%D0%9E%D1%82%D0%B7%D1%8B%D0%B2%D1%8B&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MjY0NjO3MDExNDa2MLcwMDMz3sDI-Iox0D83Pyk_r7RYQVchoCg_LbU4Kz8vMSevUqE4tag8s1ghOz-3oLQktejw5nKFTIWUotLsxKLUbIXyVIXwovzko02J5ZmlChfmXWy6sP1i94VNF7sXsVLfTAB1M-fvwgAAAA&rldimm=2313678441338780663&tbm=lcl&hl=ru-PL#lkt=LocalPoiReviews"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 px-5 py-3 rounded-lg bg-[#f5f5f5] border border-[#e0e0e0] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
                            >
                                <svg width="36" height="36" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.36 1.46 8.28 3.27l6.15-6.15C34.66 3.07 29.7 1 24 1 14.61 1 6.51 6.62 2.56 14.8l7.32 5.68C11.5 14.17 17.27 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.5 24.5c0-1.64-.15-3.21-.43-4.73H24v9.02h12.7c-.55 2.97-2.19 5.49-4.66 7.18l7.21 5.6c4.22-3.89 6.65-9.61 6.65-17.07z" />
                                    <path fill="#FBBC05" d="M9.88 28.48c-.5-1.48-.78-3.06-.78-4.68s.28-3.2.78-4.68l-7.32-5.68C.92 16.54 0 20.13 0 23.8c0 3.67.92 7.26 2.56 10.36l7.32-5.68z" />
                                    <path fill="#34A853" d="M24 46c5.7 0 10.66-1.88 14.21-5.11l-7.21-5.6c-2 1.35-4.56 2.15-7 2.15-6.73 0-12.5-4.67-14.12-10.98l-7.32 5.68C6.51 41.38 14.61 46 24 46z" />
                                </svg>

                                <div className="text-left">
                                    <div className="text-xs text-gray-600">Google Rating</div>
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
                                            Na podstawie {totalReviews} opinii
                                        </div>
                                    )}
                                </div>
                            </a>
                        )}
                    </div>
                </div>

                <div
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
                        {[...reviews, ...reviews].map((review, i) => (
                            <div
                                key={i}
                                style={{ width: `${cardWidth}px` }}
                                className="services-card-bg shrink-0 rounded-lg p-3 flex flex-col transition-transform duration-300 hover:scale-[1.02] border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)]"
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    {review.profile_photo_url ? (
                                        <img
                                            src={review.profile_photo_url}
                                            alt={review.author_name}
                                            className="w-9 h-9 rounded-full object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-[#bfa76a] text-[#3a2e24] flex items-center justify-center font-bold text-sm uppercase shrink-0">
                                            {review.author_name?.trim()?.charAt(0) || "?"}
                                        </div>
                                    )}

                                    <div className="font-semibold leading-tight text-sm text-white">
                                        {review.author_name}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[#bfa76a] text-sm mb-2">
                                    <div className="flex gap-1">
                                        {Array.from({ length: 5 }).map((_, star) => (
                                            <span key={star}>
                                                {star < Math.round(review.rating) ? "★" : "☆"}
                                            </span>
                                        ))}
                                    </div>

                                    {review.relative_time_description && (
                                        <span className="text-xs text-[#bfa76a]">
                                            {review.relative_time_description}
                                        </span>
                                    )}
                                </div>

                                <p className="text-[12px] leading-[1.6] text-[#f1ead6] tracking-[0.015em] line-clamp-5">
                                    {review.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )


}
