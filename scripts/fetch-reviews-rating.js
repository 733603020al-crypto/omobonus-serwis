import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

console.log('GOOGLE KEY:', API_KEY ? 'OK' : 'MISSING')
console.log('PLACE ID:', PLACE_ID ? 'OK' : 'MISSING')

if (!API_KEY || !PLACE_ID) {
    console.error('❌ Нет GOOGLE_MAPS_API_KEY или GOOGLE_PLACE_ID')
    process.exit(1)
}

// Лёгкий запрос раз в 6 часов: только рейтинг и общее число отзывов,
// без текстов отзывов и без перевода — это делает отдельный недельный workflow.
async function fetchRating() {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()

        if (data.status !== 'OK') {
            console.error('❌ Google API error:', data.status)
            return
        }

        const result = {
            rating: data.result?.rating ?? null,
            total: data.result?.user_ratings_total ?? null,
            updatedAt: new Date().toISOString(),
        }

        fs.writeFileSync('./data/reviews.json', JSON.stringify(result, null, 2))

        console.log('✅ reviews.json (rating) обновлён')
        console.log(`📊 Rating: ${result.rating}, Total: ${result.total}`)
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchRating()
