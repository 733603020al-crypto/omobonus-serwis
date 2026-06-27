import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

type RawReview = {
    rating: number
    text?: string
    text_uk?: string
    text_ru?: string
    relative_time_description?: string
    relative_time_uk?: string
    relative_time_ru?: string
    [key: string]: unknown
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "reviews.json")

        const file = fs.readFileSync(filePath, "utf-8")
        const data = JSON.parse(file)

        const reviews = (data.reviews ?? [])
            .filter((r: RawReview) => r.rating === 5)
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
                time: r.time,
            }))

        return NextResponse.json({
            rating: data.rating,
            totalReviews: data.total,
            reviews,
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to read reviews.json",
                details: String(error),
            },
            { status: 500 }
        )
    }
}