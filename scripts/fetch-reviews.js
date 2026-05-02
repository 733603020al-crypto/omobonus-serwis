import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' }) // ← ВАЖНО

const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

console.log('KEY:', API_KEY)
console.log('PLACE:', PLACE_ID)

if (!API_KEY || !PLACE_ID) {
    console.error('❌ Нет API_KEY или PLACE_ID')
    process.exit(1)
}

async function fetchReviews() {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`

        const res = await fetch(url)
        const data = await res.json()

        if (data.status !== 'OK') {
            console.error('❌ Google API error:', data)
            return
        }

        const result = {
            rating: data.result?.rating ?? null,
            total: data.result?.user_ratings_total ?? null,
            reviews: data.result?.reviews ?? [],
            updatedAt: new Date().toISOString()
        }

        fs.writeFileSync('./data/reviews.json', JSON.stringify(result, null, 2))

        console.log('✅ reviews.json обновлён')
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchReviews()