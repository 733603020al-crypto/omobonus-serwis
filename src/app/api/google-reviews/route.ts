import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "reviews.json")

        const file = fs.readFileSync(filePath, "utf-8")
        const data = JSON.parse(file)

        return NextResponse.json({
            rating: data.rating,
            totalReviews: data.total,
            reviews: data.reviews
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