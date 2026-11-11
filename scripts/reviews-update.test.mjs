import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = fileURLToPath(new URL('../', import.meta.url))
const originalDate = '2026-01-01T00:00:00.000Z'
function removeTestDirectory(directory) {
    const resolved = path.resolve(directory)
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()))
    assert.match(path.basename(resolved), /^omobonus-(reviews|workflow)-test-/)
    fs.rmSync(resolved, { recursive: true, force: true })
}
const review = (overrides = {}) => ({
    author_name: 'Test author', time: 123, original_language: 'pl', language: 'pl',
    rating: 5, text: 'Polecam!', relative_time_description: 'miesiąc temu',
    text_uk: 'Попередній переклад', text_ru: 'Прежний перевод', text_en: 'Previous translation',
    ...overrides,
})

// Run the real command in an isolated directory with fake credentials and fetch.
// The project .env files and Google services are never accessed by these tests.
function runUpdate(kind, previous, response, options = {}) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'omobonus-reviews-test-'))
    try {
        fs.mkdirSync(path.join(directory, 'data'))
        const file = path.join(directory, 'data', kind === 'rating' ? 'reviews.json' : 'reviews-feed.json')
        const before = typeof previous === 'string' ? previous : JSON.stringify({ ...previous, updatedAt: originalDate }, null, 2)
        fs.writeFileSync(file, before)
        fs.writeFileSync(path.join(directory, 'fixture.json'), JSON.stringify({ response, ...options }))
        fs.writeFileSync(path.join(directory, 'mock.cjs'), `
const fs = require('node:fs');
const fixture = JSON.parse(fs.readFileSync('fixture.json', 'utf8'));
global.fetch = async (url, options) => {
    if (fixture.networkError) throw new Error('Simulated offline');
    if (url.startsWith('https://translation.googleapis.com/')) {
        fs.appendFileSync('translation-calls', '1');
        const { q, target } = JSON.parse(options.body);
        return { ok: !fixture.translationError, status: 503,
            json: async () => ({ data: { translations: q.map(text => ({ translatedText: target + ':' + text })) } }) };
    }
    if (!url.startsWith('https://maps.googleapis.com/')) throw new Error('Unexpected network request');
    return { ok: !fixture.httpError, status: fixture.httpError ? 503 : 200, json: async () => fixture.response };
};
`)
        const result = spawnSync(process.execPath, ['--require', path.join(directory, 'mock.cjs'),
            path.join(root, 'scripts', kind === 'rating' ? 'fetch-reviews-rating.js' : 'fetch-reviews-weekly.js')], {
            cwd: directory, encoding: 'utf8',
            env: { ...process.env, GOOGLE_MAPS_API_KEY: 'test-only', GOOGLE_PLACE_ID: 'test-place',
                GOOGLE_TRANSLATE_API_KEY: options.translate ? 'test-translate' : '' },
        })
        assert.ifError(result.error)
        const after = fs.readFileSync(file, 'utf8')
        return { before, after, status: result.status, log: result.stdout + result.stderr,
            calls: fs.existsSync(path.join(directory, 'translation-calls')) ? fs.readFileSync(path.join(directory, 'translation-calls'), 'utf8').length : 0 }
    } finally {
        removeTestDirectory(directory)
    }
}

const rating = { rating: 4.9, total: 248 }
const ratingResponse = (overrides = {}) => ({ status: 'OK', result: { rating: 4.9, user_ratings_total: 248, ...overrides } })
const feedResponse = (reviews) => ({ status: 'OK', result: { reviews } })

test('unchanged rating preserves the entire file including timestamp', () => {
    const r = runUpdate('rating', rating, ratingResponse())
    assert.equal(r.status, 0, r.log)
    assert.equal(r.after, r.before)
})

for (const [field, value] of [['rating', 4.8], ['user_ratings_total', 249]]) {
    test(`a real change to ${field} updates the snapshot`, () => {
        const r = runUpdate('rating', rating, ratingResponse({ [field]: value }))
        assert.equal(r.status, 0, r.log)
        const data = JSON.parse(r.after)
        assert.equal(data[field === 'rating' ? 'rating' : 'total'], value)
        assert.notEqual(data.updatedAt, originalDate)
    })
}

for (const [name, response, options] of [
    ['API error', { status: 'REQUEST_DENIED' }, {}],
    ['HTTP error', ratingResponse(), { httpError: true }],
    ['network error', ratingResponse(), { networkError: true }],
    ['missing rating', ratingResponse({ rating: null }), {}],
    ['invalid count', ratingResponse({ user_ratings_total: -1 }), {}],
]) {
    test(`${name} fails without damaging the last rating`, () => {
        const r = runUpdate('rating', rating, response, options)
        assert.equal(r.status, 1, r.log)
        assert.equal(r.after, r.before)
    })
}

test('relative age and input order do not change review content', () => {
    const a = review(), b = review({ author_name: 'Second', time: 456 })
    const r = runUpdate('weekly', { reviews: [a, b] }, feedResponse([b, { ...a, relative_time_description: '2 miesiące temu' }]), { translate: true })
    assert.equal(r.status, 0, r.log)
    assert.equal(r.after, r.before)
    assert.equal(r.calls, 0)
})

test('edited text under the same author and time replaces the entry and translations', () => {
    const r = runUpdate('weekly', { reviews: [review()] }, feedResponse([review({ text: 'Nowa treść' })]), { translate: true })
    assert.equal(r.status, 0, r.log)
    const { reviews, updatedAt } = JSON.parse(r.after)
    assert.equal(reviews.length, 1)
    assert.equal(reviews[0].text, 'Nowa treść')
    assert.equal(reviews[0].text_uk, 'uk:Nowa treść')
    assert.equal(reviews[0].text_ru, 'ru:Nowa treść')
    assert.equal(reviews[0].text_en, 'en:Nowa treść')
    assert.notEqual(updatedAt, originalDate)
    assert.equal(r.calls, 3)
})

test('metadata changes keep existing translations', () => {
    const r = runUpdate('weekly', { reviews: [review()] }, feedResponse([review({ profile_photo_url: 'https://example.test/new-photo' })]), { translate: true })
    assert.equal(r.status, 0, r.log)
    const data = JSON.parse(r.after).reviews[0]
    assert.equal(data.profile_photo_url, 'https://example.test/new-photo')
    assert.equal(data.text_en, 'Previous translation')
    assert.equal(r.calls, 0)
})

test('new reviews append once, maintain FIFO and the ten-entry limit', () => {
    const reviews = Array.from({ length: 10 }, (_, i) => review({ time: i }))
    const next = review({ time: 20, text: 'New review' })
    const r = runUpdate('weekly', { reviews }, feedResponse([next, next]))
    assert.equal(r.status, 0, r.log)
    const data = JSON.parse(r.after).reviews
    assert.deepEqual(data.map(r => r.time), [1, 2, 3, 4, 5, 6, 7, 8, 9, 20])
})

test('nonqualifying reviews leave the existing selection intact', () => {
    const r = runUpdate('weekly', { reviews: [review()] }, feedResponse([
        review({ time: 1, rating: 4 }), review({ time: 2, original_language: 'en' }), review({ time: 3, text: ' ' }),
    ]))
    assert.equal(r.status, 0, r.log)
    assert.equal(r.after, r.before)
})

for (const [name, previous, response, options] of [
    ['API failure', { reviews: [review()] }, { status: 'OVER_QUERY_LIMIT' }, {}],
    ['invalid response', { reviews: [review()] }, { status: 'OK', result: {} }, {}],
    ['translation failure', { reviews: [review()] }, feedResponse([review({ text: 'Edited' })]), { translate: true, translationError: true }],
    ['corrupt snapshot', '{broken', feedResponse([review()]), {}],
]) {
    test(`${name} preserves the last feed and reports failure`, () => {
        const r = runUpdate('weekly', previous, response, options)
        assert.equal(r.status, 1, r.log)
        assert.equal(r.after, r.before)
    })
}

test('both workflows stop before commit and push when the staged data is unchanged', () => {
    for (const [workflow, file] of [['update-reviews.yml', 'reviews.json'], ['update-reviews-weekly.yml', 'reviews-feed.json']]) {
        const text = fs.readFileSync(path.join(root, '.github/workflows', workflow), 'utf8')
        const shell = text.split('      - name: Commit changes')[1].split('run: |')[1]
            .split(/\r?\n/).filter(Boolean).map(line => line.replace(/^          /, '')).join('\n')
        const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'omobonus-workflow-test-'))
        try {
            // A shell function intercepts Git: no repository or global configuration is changed.
            const fakeGit = `git() { printf '%s\\n' "$*"; if [ "$1" = diff ]; then return 0; fi; }\n`
            fs.writeFileSync(path.join(directory, 'step.sh'), fakeGit + shell)
            const bash = process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash'
            const result = spawnSync(bash, ['--noprofile', '--norc', 'step.sh'], { cwd: directory, encoding: 'utf8' })
            assert.equal(result.status, 0, result.stderr)
            assert.ok(result.stdout.includes(`diff --cached --quiet -- data/${file}`))
            assert.doesNotMatch(result.stdout, /^(commit|push)( |$)/m)
        } finally {
            removeTestDirectory(directory)
        }
    }
})
