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

async function fetchReviewsForLang(lang) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=${lang}&key=${API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    if (data.status !== 'OK') {
        console.error(`❌ Google API error (language=${lang}):`, data.status)
        return null
    }
    return data.result
}

async function fetchReviews() {
    try {
        const [resultPl, resultUk, resultRu] = await Promise.all([
            fetchReviewsForLang('pl'),
            fetchReviewsForLang('uk'),
            fetchReviewsForLang('ru'),
        ])

        if (!resultPl) {
            console.error('❌ Не удалось получить польские отзывы')
            return
        }

        // Берём только оригинальные польские отзывы как основу
        const plReviews = (resultPl.reviews ?? []).filter(
            (r) => r.original_language === 'pl'
        )

        // Индексируем UK и RU версии по timestamp для матчинга
        const ukByTime = Object.fromEntries(
            (resultUk?.reviews ?? []).map((r) => [r.time, r])
        )
        const ruByTime = Object.fromEntries(
            (resultRu?.reviews ?? []).map((r) => [r.time, r])
        )

        const reviews = plReviews.map((r) => {
            const ukReview = ukByTime[r.time]
            const ruReview = ruByTime[r.time]
            return {
                ...r,
                text_uk: ukReview?.text ?? null,
                text_ru: ruReview?.text ?? null,
                relative_time_uk: ukReview?.relative_time_description ?? null,
                relative_time_ru: ruReview?.relative_time_description ?? null,
            }
        })

        const result = {
            rating: resultPl.rating ?? null,
            total: resultPl.user_ratings_total ?? null,
            reviews,
            updatedAt: new Date().toISOString(),
        }

        fs.writeFileSync('./data/reviews.json', JSON.stringify(result, null, 2))

        console.log('✅ reviews.json обновлён')
        console.log(`📊 Отзывов сохранено: ${reviews.length}`)
        const withUk = reviews.filter((r) => r.text_uk).length
        const withRu = reviews.filter((r) => r.text_ru).length
        console.log(`🇺🇦 С UK переводом: ${withUk}/${reviews.length}`)
        console.log(`🇷🇺 С RU переводом: ${withRu}/${reviews.length}`)
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchReviews()
