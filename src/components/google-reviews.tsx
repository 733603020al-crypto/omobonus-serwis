import fs from "fs"
import path from "path"
import GoogleReviewsCarousel, { type Review } from "@/components/google-reviews-carousel"

type RawReview = Review & { [key: string]: unknown }

// Server Component: reads the same data/reviews.json the auto-update workflow
// writes to, directly at render/build time — no client-side fetch, so the
// review text is present in the initial HTML. The auto-update workflow keeps
// working unchanged: every "Auto update reviews" push triggers a fresh Vercel
// build, which re-reads this file and bakes the new content in.
function getReviews() {
    try {
        const filePath = path.join(process.cwd(), "data", "reviews.json")
        const file = fs.readFileSync(filePath, "utf-8")
        const data = JSON.parse(file)

        const reviews: Review[] = (data.reviews ?? [])
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

        return {
            rating: typeof data.rating === "number" ? data.rating : null,
            totalReviews: typeof data.total === "number" ? data.total : null,
            reviews,
        }
    } catch {
        return { rating: null, totalReviews: null, reviews: [] }
    }
}

export default function GoogleReviews() {
    const { reviews, rating, totalReviews } = getReviews()
    return <GoogleReviewsCarousel reviews={reviews} rating={rating} totalReviews={totalReviews} />
}
