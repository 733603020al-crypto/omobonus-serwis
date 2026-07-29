import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const TRANSLATE_KEY = process.env.GOOGLE_TRANSLATE_API_KEY
const FEED_PATH = './data/reviews-feed.json'

console.log('GOOGLE TRANSLATE KEY:', TRANSLATE_KEY ? 'OK' : 'MISSING')

if (!TRANSLATE_KEY) {
    console.error('❌ Нет GOOGLE_TRANSLATE_API_KEY')
    process.exit(1)
}

// One-off backfill: translates any reviews-feed.json entries still missing
// text_uk/text_ru — needed for reviews mined from git history, since they no
// longer appear in Google's live API response and the weekly script only
// ever translates newly-arrived reviews.
async function translateTextsWithGoogle(texts, targetLang) {
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
}

async function backfill() {
    const feed = JSON.parse(fs.readFileSync(FEED_PATH, 'utf-8'))
    const missing = feed.reviews.filter((r) => !r.text_uk || !r.text_ru)

    if (missing.length === 0) {
        console.log('ℹ️ Все записи уже переведены')
        return
    }

    console.log(`🔄 Переводим ${missing.length} записей...`)
    const texts = missing.map((r) => r.text)

    const translatedUk = await translateTextsWithGoogle(texts, 'uk')
    const translatedRu = await translateTextsWithGoogle(texts, 'ru')

    missing.forEach((r, i) => {
        if (!r.text_uk && translatedUk) r.text_uk = translatedUk[i]
        if (!r.text_ru && translatedRu) r.text_ru = translatedRu[i]
    })

    feed.updatedAt = new Date().toISOString()
    fs.writeFileSync(FEED_PATH, JSON.stringify(feed, null, 2))

    console.log('✅ reviews-feed.json обновлён')
    console.log(`🇺🇦 С UK переводом: ${feed.reviews.filter((r) => r.text_uk).length}/${feed.reviews.length}`)
    console.log(`🇷🇺 С RU переводом: ${feed.reviews.filter((r) => r.text_ru).length}/${feed.reviews.length}`)
}

backfill()
