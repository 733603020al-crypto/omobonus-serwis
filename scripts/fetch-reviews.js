import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID

console.log('KEY:', API_KEY ? 'OK' : 'MISSING')
console.log('PLACE:', PLACE_ID ? 'OK' : 'MISSING')

if (!API_KEY || !PLACE_ID) {
    console.error('❌ Нет API_KEY или PLACE_ID')
    process.exit(1)
}

async function fetchReviews() {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=pl&key=${API_KEY}`

        const res = await fetch(url)
        const data = await res.json()

        if (data.status !== 'OK') {
            console.error('❌ Google API error:', data)
            return
        }

        // Берём только оригинальные польские отзывы
        const reviews = (data.result?.reviews ?? []).filter(
            (r) => r.original_language === 'pl'
        )

        const result = {
            rating: data.result?.rating ?? null,
            total: data.result?.user_ratings_total ?? null,
            reviews,
            updatedAt: new Date().toISOString(),
        }

        fs.writeFileSync('./data/reviews.json', JSON.stringify(result, null, 2))

        console.log('✅ reviews.json обновлён')
        console.log(`📊 Отзывов сохранено: ${reviews.length}`)
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchReviews()