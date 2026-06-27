import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config({ path: '.env.local' })

const API_KEY = process.env.GOOGLE_MAPS_API_KEY
const PLACE_ID = process.env.GOOGLE_PLACE_ID
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

console.log('GOOGLE KEY:', API_KEY ? 'OK' : 'MISSING')
console.log('PLACE ID:', PLACE_ID ? 'OK' : 'MISSING')
console.log('ANTHROPIC KEY:', ANTHROPIC_KEY ? 'OK' : 'MISSING (тексты не будут переведены)')

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

// Перевод текстов через Claude API (native fetch, без SDK)
async function translateTextsWithClaude(texts, targetLang) {
    if (!ANTHROPIC_KEY) return null
    const langName = targetLang === 'uk' ? 'Ukrainian' : 'Russian'

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 4096,
                messages: [{
                    role: 'user',
                    content: `Translate the following Polish Google review texts to ${langName}.
Return ONLY a valid JSON array of translated strings in the same order. No explanations, no markdown.
Preserve the original tone and meaning. Do not add facts not in the original.

Texts to translate:
${JSON.stringify(texts)}`,
                }],
            }),
        })

        if (!response.ok) {
            console.error(`❌ Anthropic API error: ${response.status}`)
            return null
        }

        const data = await response.json()
        const raw = data.content?.[0]?.text?.trim()
        return JSON.parse(raw)
    } catch (err) {
        console.error('❌ Ошибка перевода через Claude:', err.message)
        return null
    }
}

async function fetchReviews() {
    try {
        // Загружаем существующий кэш переводов
        let existingCache = {}
        const cachePath = './data/reviews.json'
        if (fs.existsSync(cachePath)) {
            try {
                const existing = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
                for (const r of (existing.reviews ?? [])) {
                    const key = `${r.author_name}_${r.time}`
                    existingCache[key] = {
                        text_uk: r.text_uk ?? null,
                        text_ru: r.text_ru ?? null,
                    }
                }
            } catch {}
        }

        // Фетчим отзывы от Google (только PL)
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=pl&key=${API_KEY}`
        const res = await fetch(url)
        const data = await res.json()

        if (data.status !== 'OK') {
            console.error('❌ Google API error:', data.status)
            return
        }

        const plReviews = (data.result?.reviews ?? []).filter(
            (r) => r.original_language === 'pl'
        )

        // Определяем какие тексты нужно перевести (не в кэше или null)
        const needUk = []
        const needRu = []
        const indices = []

        for (let i = 0; i < plReviews.length; i++) {
            const r = plReviews[i]
            const key = `${r.author_name}_${r.time}`
            const cached = existingCache[key] ?? {}
            if (!cached.text_uk) { needUk.push(r.text); indices.push({ i, key, forUk: true }) }
            if (!cached.text_ru) { needRu.push(r.text); indices.push({ i, key, forRu: true }) }
        }

        // Переводим через Claude API (если ключ есть)
        let translatedUk = null
        let translatedRu = null

        if (ANTHROPIC_KEY) {
            if (needUk.length > 0) {
                console.log(`🔄 Переводим ${needUk.length} отзывов → UK...`)
                translatedUk = await translateTextsWithClaude(needUk, 'uk')
            }
            if (needRu.length > 0) {
                console.log(`🔄 Переводим ${needRu.length} отзывов → RU...`)
                translatedRu = await translateTextsWithClaude(needRu, 'ru')
            }
        }

        // Строим карту переводов по индексу
        const ukMap = {}
        const ruMap = {}
        let ukIdx = 0, ruIdx = 0

        for (const { i, forUk, forRu } of indices) {
            if (forUk) { if (translatedUk) ukMap[i] = translatedUk[ukIdx]; ukIdx++ }
            if (forRu) { if (translatedRu) ruMap[i] = translatedRu[ruIdx]; ruIdx++ }
        }

        // Собираем итоговый массив
        const reviews = plReviews.map((r, i) => {
            const key = `${r.author_name}_${r.time}`
            const cached = existingCache[key] ?? {}
            return {
                ...r,
                text_uk: ukMap[i] ?? cached.text_uk ?? null,
                text_ru: ruMap[i] ?? cached.text_ru ?? null,
                relative_time_uk: translatePolishTime(r.relative_time_description, 'uk'),
                relative_time_ru: translatePolishTime(r.relative_time_description, 'ru'),
            }
        })

        const result = {
            rating: data.result?.rating ?? null,
            total: data.result?.user_ratings_total ?? null,
            reviews,
            updatedAt: new Date().toISOString(),
        }

        fs.writeFileSync(cachePath, JSON.stringify(result, null, 2))

        console.log('✅ reviews.json обновлён')
        console.log(`📊 Отзывов: ${reviews.length}`)
        console.log(`🇺🇦 С UK переводом: ${reviews.filter((r) => r.text_uk).length}/${reviews.length}`)
        console.log(`🇷🇺 С RU переводом: ${reviews.filter((r) => r.text_ru).length}/${reviews.length}`)
    } catch (err) {
        console.error('❌ Ошибка:', err)
    }
}

fetchReviews()
