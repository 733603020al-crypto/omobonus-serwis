/**
 * Image optimization script for Omobonus website.
 * Creates backups, optimizes WebP files with sharp, prints before/after report.
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const IMAGES_DIR = 'public/images'
const BACKUP_DIR = 'public/images/backup'

// Per-file quality settings — lower for images covered by dark overlays
const FILE_QUALITY = {
  // Heavy backgrounds (60-70% dark overlay — barely visible)
  'Background_1.webp': 32,
  'services-background.webp': 32,

  // Hero backgrounds (50% dark overlay — partly visible)
  'omobonus-hero-mobile.webp': 76,
  'omobonus-hero.webp': 74,
  'omobonus-hero2.webp': 72,

  // Service page main images (clearly visible, 512×512)
  '01_serwis-laptopow.webp': 72,
  '02_serwis-komputerow-stacjonarnych.webp': 72,
  '03_outsourcing-it.webp': 72,
  '04_serwis-drukarek-laserowych.webp': 72,
  '05_serwis-drukarek-atramentowych.webp': 72,
  '06_serwis-drukarek-termicznych.webp': 72,
  '07_serwis-drukarek-iglowych.webp': 72,
  '08_serwis-ploterow.webp': 72,
  '10_wynajem-drukarek.webp': 72,
  '11_drukarka-zastepcza.webp': 72,
  '12_wymiana-tuszy-regeneracja-tonerow.webp': 72,
  '13_odkup-komputerow-laptopow.webp': 72,
  'Serwis_Drukarek.webp': 72,
  'Serwis_i_Naprawa_Drukarek_3D.webp': 72,

  // Service card/accordion background tab icons (128×128)
  '01_serwis-laptopow-icon.webp': 65,
  '02_serwis-komputerow-stacjonarnych-icon.webp': 65,
  '03_outsourcing-it-icon.webp': 65,
  '04_serwis-drukarek-laserowych-icon.webp': 65,
  '05_serwis-drukarek-atramentowych-icon.webp': 65,
  '06_serwis-drukarek-termicznych-icon.webp': 65,
  '07_serwis-drukarek-iglowych-icon.webp': 65,
  '08_serwis-ploterow-icon.webp': 65,
  '10_wynajem-drukarek-icon.webp': 65,
  '11_drukarka-zastepcza-icon.webp': 65,
  '12_wymiana-tuszy-regeneracja-tonerow-icon.webp': 65,
  '13_odkup-komputerow-laptopow-icon.webp': 65,
  'Serwis_Drukarek-icon.webp': 65,
  'Serwis_i_Naprawa_Drukarek_3D-icon.webp': 65,

  // Team portraits
  'maksym_portret_400x400.webp': 75,
  'pawel_portret_400x400.webp': 75,
  'andrzey_avatar_400.webp': 75,

  // Pricing category images (256×256, ~20-28K each)
  'Drukarka_domowa.webp': 68,
  'Drukarka_biurowa_atramentowa.webp': 68,
  'Drukarka_biznesowa_atramentowa.webp': 68,
  'Drukarka_domowa_atramentowa.webp': 68,
  'Mała_drukarka_etykiet.webp': 68,
  'Srednia_drukarka_etykiet.webp': 68,
  'Duża_drukarka_etykiet.webp': 68,
  'Mała_drukarka_Igłowa.webp': 68,
  'Średnia_drukarka_Igłowa.webp': 68,
  'Duża_drukarka_Igłowa.webp': 68,
  'A4_Drukarki_mono.webp': 68,
  'A4_Drukarki_kolor.webp': 68,
  'A4_MFU_mono.webp': 68,
  'A4_MFU_kolor.webp': 68,
  'A3.webp': 68,
  'A4.webp': 68,
  'Drukarki_A3_A4_mono.webp': 68,
  'Drukarki_A3_A4_mono_kolor.webp': 68,
  'MFU_A3_A4_mono.webp': 68,
  'MFU_A3_A4_mono_kolor.webp': 68,

  // KDR / senior card
  'KDR_Tu-honorujemy-Karte-Duzej-Rodziny.webp': 65,
  'Karta-Seniora.webp': 65,

  // Section tab icons (128×128 accordion tabs)
  'P1. Diagnoza i wycena.webp': 65,
  'P2. Dojazd.webp': 65,
  'P3. Czyszczenie i konserwacja (pakiety).webp': 65,
  'P4. Naprawy i uslugi serwisowe.webp': 65,
  'P5. FAQ – pytania i odpowiedzi.webp': 65,

  // Zmiety arkusz (used in context unclear — moderately visible)
  'zmiety arkusz papieru 2.webp': 70,
}

// Files to skip (flags, logos, umka paws — already tiny or critical for visual quality)
const SKIP = new Set([
  'Logo_Omobonus.webp',         // 12K logo, critical visual quality
  'Logo_Omobonus_favicon.webp', // 12K favicon
  'pl.webp', 'ua.webp', 'other.webp', 'de.webp', 'cz.webp', 'by.webp',
  'sk.webp', 'lv.webp', 'lt.webp', 'gb.webp', 'ee.webp',
  'umka_paw_brown.webp', 'umka_paw_cbb27c.webp', 'umka_paw_dark.webp',
  'umka_paw_exact.webp', 'umka_paw_heart_gold_clean.webp',
  'Umka_site_400x400.webp',
])

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + 'K'
}

async function optimizeFile(filename) {
  const src = path.join(IMAGES_DIR, filename)
  const backup = path.join(BACKUP_DIR, filename)
  const quality = FILE_QUALITY[filename] ?? 72

  const statBefore = fs.statSync(src)
  const sizeBefore = statBefore.size

  // Backup original (don't overwrite existing backup)
  if (!fs.existsSync(backup)) {
    fs.mkdirSync(path.dirname(backup), { recursive: true })
    fs.copyFileSync(src, backup)
  }

  // Read file as buffer first — workaround for sharp/libvips on Windows
  // with non-ASCII (Polish diacritics) or spaces in filenames
  const inputBuf = fs.readFileSync(src)
  const meta = await sharp(inputBuf).metadata()
  const buf = await sharp(inputBuf)
    .webp({ quality, effort: 4, smartSubsample: true })
    .toBuffer()

  const sizeAfter = buf.length

  // Only write if actually smaller
  if (sizeAfter < sizeBefore) {
    fs.writeFileSync(src, buf)
    const saved = sizeBefore - sizeAfter
    const pct = ((saved / sizeBefore) * 100).toFixed(0)
    return { filename, sizeBefore, sizeAfter, saved, pct, w: meta.width, h: meta.height, quality }
  } else {
    return { filename, sizeBefore, sizeAfter: sizeBefore, saved: 0, pct: '0', w: meta.width, h: meta.height, quality, skippedSmaller: true }
  }
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => f.match(/\.(webp)$/i) && !SKIP.has(f))

  fs.mkdirSync(BACKUP_DIR, { recursive: true })

  console.log(`\n🔧 Optimizing ${files.length} WebP images...\n`)
  console.log('File'.padEnd(52) + 'Size'.padEnd(10) + '→ After'.padEnd(10) + 'Saved'.padEnd(10) + 'Dim')
  console.log('─'.repeat(95))

  let totalBefore = 0
  let totalAfter = 0
  const results = []

  for (const file of files.sort()) {
    try {
      const r = await optimizeFile(file)
      totalBefore += r.sizeBefore
      totalAfter += r.sizeAfter
      results.push(r)

      const flag = r.skippedSmaller ? ' (already optimal)' : `  -${r.pct}%`
      console.log(
        r.filename.padEnd(52) +
        kb(r.sizeBefore).padEnd(10) +
        kb(r.sizeAfter).padEnd(10) +
        (r.saved > 0 ? kb(r.saved) : '').padEnd(10) +
        `${r.w}×${r.h}` + flag
      )
    } catch (e) {
      console.error(`❌ ${file}: ${e.message}`)
    }
  }

  const totalSaved = totalBefore - totalAfter
  console.log('─'.repeat(95))
  console.log(
    'TOTAL'.padEnd(52) +
    kb(totalBefore).padEnd(10) +
    kb(totalAfter).padEnd(10) +
    kb(totalSaved).padEnd(10) +
    `(-${((totalSaved / totalBefore) * 100).toFixed(0)}%)`
  )
  console.log(`\n✅ Backups saved to ${BACKUP_DIR}/\n`)
}

main().catch(console.error)
