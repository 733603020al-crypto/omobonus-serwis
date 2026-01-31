import { NextResponse } from "next/server"

const PLACE_ID = process.env.GOOGLE_PLACE_ID
const API_KEY = process.env.GOOGLE_MAPS_API_KEY

export async function GET() {
    if (!API_KEY) {
        return NextResponse.json(
            { error: "Missing GOOGLE_MAPS_API_KEY" },
            { status: 500 }
        )
    }

    if (!PLACE_ID) {
        return NextResponse.json(
            { error: "Missing GOOGLE_PLACE_ID" },
            { status: 500 }
        )
    }

    // ✅ ДОБАВИЛИ user_ratings_total
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        PLACE_ID
    )}&fields=name,rating,user_ratings_total,reviews&language=pl&key=${API_KEY}`

    try {
        const res = await fetch(url)
        const data = await res.json()

        if (!res.ok || data.status !== "OK") {
            return NextResponse.json(
                { error: "Google API error", details: data },
                { status: 500 }
            )
        }

        // ✅ Возвращаем безопасные поля + totalReviews
        const safeResult = {
            name: data.result?.name ?? null,
            rating: data.result?.rating ?? null,
            totalReviews: data.result?.user_ratings_total ?? null,
            reviews:
                data.result?.reviews?.map((r: any) => ({
                    author_name: r.author_name,
                    rating: r.rating,
                    text: r.text,
                    time: r.time,
                    relative_time_description: r.relative_time_description,
                    profile_photo_url: r.profile_photo_url,
                })) ?? [],
        }

        return NextResponse.json(safeResult)
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch reviews",
                details: String(error),
            },
            { status: 500 }
        )
    }
}
