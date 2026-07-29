import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID
const TRANSLATE_KEY = process.env.GOOGLE_TRANSLATE_API_KEY

const FEED_PATH = './data/reviews-feed.json'
const MAX_REVIEWS = 10

console.log('GOOGLE KEY:', API_KEY ? 'OK' : 'MISSING')
console.log('PLACE ID:', PLACE_ID ? 'OK' : 'MISSING')
console.log('GOOGLE TRANSLATE KEY:', TRANSLATE_KEY ? 'OK' : 'MISSING (тексты не будут переведены)')

if (!API_KEY || !PLACE_ID) {
    console.error('❌ Нет GOOGLE_MAPS_API_KEY или GOOGLE_PLACE_ID')
    process.exit(1)
}

// Статический перевод польских временных описаний
function translatePolishTime(str, lang) {
    if (!str || lang === 'pl') return str

    const staticMap = {
        uk: {
            'dzisiaj': 'сьогодні',
            'wczoraj': 'вчора',
            'tydzień temu': 'тиждень тому',
            'miesiąc temu': 'місяць тому',
            'rok temu': 'рік тому',
        },
        ru: {
            'dzisiaj': 'сегодня',
            'wczoraj': 'вчера',
            'tydzień temu': 'неделю назад',
            'miesiąc temu': 'месяц назад',
            'rok temu': 'год назад',
        },
    }

    if (staticMap[lang][str]) return staticMap[lang][str]

    const m = str.match(/^(\d+)\s+([\wÀ-ɏ]+(?:\s+[\wÀ-ɏ]+)?)\s+temu$/i)
    if (!m) return str
    const n = parseInt(m[1])
    const unit = m[2].toLowerCase()

    if (lang === 'uk') {
        if (/^dzie[nń]|^dni$/.test(unit)) {
            const f = n === 1 ? 'день' : n < 5 ? 'дні' : 'днів'
            return `${n} ${f} тому`
        }
        if (/^tygodni|^tydzie/.test(unit)) {
            const f = n === 1 ? 'тиждень' : n < 5 ? 'тижні' : 'тижнів'
            return `${n} ${f} тому`
        }
        if (/^miesiąc|^miesięcy|^miesiące/.test(unit)) {
            const f = n === 1 ? 'місяць' : n < 5 ? 'місяці' : 'місяців'
            return `${n} ${f} тому`
        }
        if (/^rok$|^lat[a]?$/.test(unit)) {
            const f = n === 1 ? 'рік' : n < 5 ? 'роки' : 'років'
            return `${n} ${f} тому`
        }
    }

    if (lang === 'ru') {
        if (/^dzie[nń]|^dni$/.test(unit)) {
            const f = n === 1 ? 'день' : n < 5 ? 'дня' : 'дней'
            return `${n} ${f} назад`
        }
        if (/^tygodni|^tydzie/.test(unit)) {
            const f = n === 1 ? 'неделю' : n < 5 ? 'недели' : 'недель'
            return `${n} ${f} назад`
        }
        if (/^miesiąc|^miesięcy|^miesiące/.test(unit)) {
            const f = n === 1 ? 'месяц' : n < 5 ? 'месяца' : 'месяцев'
            return `${n} ${f} назад`
        }
        if (/^rok$|^lat[a]?$/.test(unit)) {
            const f = n === 1 ? 'год' : n < 5 ? 'года' : 'лет'
            return `${n} ${f} назад`
        }
    }

    return str
}

// Перевод текстов через Google Cloud Translation API v2 (бесплатный тариф 500k символов/месяц)
async function translateTextsWithGoogle(texts, targetLang) {
    if (!TRANSLATE_KEY) return null

    try {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: texts,
                source: 'pl',
                target: targetLang,
                format: 'text',
            }),
        })

        if (!response.ok) {
            console.error(`❌ Google Translate API error: ${response.status}`)
            return null
        }

        const data = await response.json()
        const translations = data.data?.translations
        if (!Array.isArray(translations)) return null
        return translations.map((t) => t.translatedText)
    } catch (err) {
        console.error('❌ Ошибка перевода через Google Translate:', err.message)
        return null
    }
}

function reviewKey(r) {
    return `${r.author_name}_${r.time}`
}

async function fetchWeeklyReviews() {
    try {
        // Накопленный фид за предыдущие недели
        let feed = []
        if (fs.existsSync(FEED_PATH)) {
            try {
                const existing = JSON.parse(fs.readFileSync(FEED_PATH, 'utf-8'))
                feed = Array.isArray(existing.reviews) ? existing.reviews : []
            } catch {}
        }
        const existingKeys = new Set(feed.map(reviewKey))

        // Текущие отзывы от Google (только PL)
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&language=pl&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()

        if (data.status !== 'OK') {
            console.error('❌ Google API error:', data.status)
            return
        }

        // Фильтр: только 5★, только с непустым текстом, только польский оригинал, только новые (не в фиде)
        const candidates = (data.result?.reviews ?? []).filter(
            (r) =>
                r.original_language === 'pl' &&
                r.rating === 5 &&
                typeof r.text === 'string' &&
                r.text.trim().length > 0 &&
                !existingKeys.has(reviewKey(r))
        )

        if (candidates.length === 0) {
            console.log('ℹ️ Новых 5★ отзывов с текстом не найдено, фид не изменился')
            console.log(`📊 В фиде сейчас: ${feed.length}`)
            return
        }

        // Переводим только новые отзывы
        const texts = candidates.map((r) => r.text)
        let translatedUk = null
        let translatedRu = null

        if (TRANSLATE_KEY) {
            console.log(`🔄 Переводим ${texts.length} новых отзывов → UK...`)
            translatedUk = await translateTextsWithGoogle(texts, 'uk')
            console.log(`🔄 Переводим ${texts.length} новых отзывов → RU...`)
            translatedRu = await translateTextsWithGoogle(texts, 'ru')
        }

        const newEntries = candidates.map((r, i) => ({
            ...r,
            text_uk: translatedUk ? translatedUk[i] : null,
            text_ru: translatedRu ? translatedRu[i] : null,
            relative_time_uk: translatePolishTime(r.relative_time_description, 'uk'),
            relative_time_ru: translatePolishTime(r.relative_time_description, 'ru'),
        }))

        // FIFO: новые уходят в конец, старые вытесняются с начала при превышении лимита
        let updatedFeed = [...feed, ...newEntries]
        if (updatedFeed.length > MAX_REVIEWS) {
            updatedFeed = updatedFeed.slice(updatedFeed.length - MAX_REVIEWS)
        }

        const result = {
            reviews: updatedFeed,
            updatedAt: new Date().toISOString(),
        }

        fs.writeFileSync(FEED_PATH, JSON.stringify(result, null, 2))

        console.log(`✅ reviews-feed.json обновлён: +${newEntries.length} новых`)
        console.log(`📊 В фиде сейчас: ${updatedFeed.length}/${MAX_REVIEWS}`)
        console.log(`🇺🇦 С UK переводом: ${updatedFeed.filter((r) => r.text_uk).length}/${updatedFeed.length}`)
        console.log(`🇷🇺 С RU переводом: ${updatedFeed.filter((r) => r.text_ru).length}/${updatedFeed.length}`)
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchWeeklyReviews()
