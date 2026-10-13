import fs from "fs"
import path from "path"
import dynamic from "next/dynamic"
import type { Review } from "@/components/google-reviews-carousel"

// Below-fold on every page that renders it (Home, O nas, all service pages)
// — same dynamic() split already used for Footer/Services/etc. so its JS
// doesn't compete with the first screen's hydration. No ssr:false: review
// text still renders server-side, only the client bundle is deferred.
const GoogleReviewsCarousel = dynamic(() => import("@/components/google-reviews-carousel"))

type RawReview = Review & { [key: string]: unknown }

// Server Component: rating/total come from data/reviews.json (refreshed every
// 6h by update-reviews.yml), review texts come from data/reviews-feed.json (a
// FIFO pool of up to 10 five-star reviews with text, refreshed weekly by
// update-reviews-weekly.yml with translations applied only to new entries).
// Both are read directly at render/build time — no client-side fetch, so
// review text is present in the initial HTML.
function getRating() {
    try {
        const filePath = path.join(process.cwd(), "data", "reviews.json")
        const file = fs.readFileSync(filePath, "utf-8")
        const data = JSON.parse(file)
        return {
            rating: typeof data.rating === "number" ? data.rating : null,
            totalReviews: typeof data.total === "number" ? data.total : null,
        }
    } catch {
        return { rating: null, totalReviews: null }
    }
}

// Only the page's language reaches the client: the carousel falls back to
// `text` / `relative_time_description` when the _uk/_ru fields are empty.
function getReviews(locale: "pl" | "uk" | "ru"): Review[] {
    try {
        const filePath = path.join(process.cwd(), "data", "reviews-feed.json")
        const file = fs.readFileSync(filePath, "utf-8")
        const data = JSON.parse(file)

        return (data.reviews ?? [])
            .filter((r: RawReview) => r.rating === 5)
            .slice(0, 10)
            .map((r: RawReview) => ({
                author_name: r.author_name,
                rating: r.rating,
                profile_photo_url: r.profile_photo_url,
                text: (locale === "uk" ? r.text_uk : locale === "ru" ? r.text_ru : null) || r.text,
                relative_time_description:
                    (locale === "uk" ? r.relative_time_uk : locale === "ru" ? r.relative_time_ru : null) ||
                    r.relative_time_description,
            }))
    } catch {
        return []
    }
}

export default function GoogleReviews({ locale = "pl" }: { locale?: "pl" | "uk" | "ru" }) {
    const { rating, totalReviews } = getRating()
    const reviews = getReviews(locale)
    return <GoogleReviewsCarousel reviews={reviews} rating={rating} totalReviews={totalReviews} />
}
