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

function getReviews(): Review[] {
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
                text: r.text,
                text_uk: r.text_uk ?? null,
                text_ru: r.text_ru ?? null,
                relative_time_description: r.relative_time_description,
                relative_time_uk: r.relative_time_uk ?? null,
                relative_time_ru: r.relative_time_ru ?? null,
            }))
    } catch {
        return []
    }
}

export default function GoogleReviews() {
    const { rating, totalReviews } = getRating()
    const reviews = getReviews()
    return <GoogleReviewsCarousel reviews={reviews} rating={rating} totalReviews={totalReviews} />
}
