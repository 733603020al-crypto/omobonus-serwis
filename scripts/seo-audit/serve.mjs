// Отдаёт SEO-панель на http://localhost:4100 (файл перечитывается при каждом запросе).
// Сначала собрать панель: node scripts/seo-audit/title-audit.mjs
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

const PANEL = path.join(os.tmpdir(), 'omobonus-seo-panel.html')
http
  .createServer((_, res) => {
    if (!fs.existsSync(PANEL)) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      return res.end('Панель не собрана: node scripts/seo-audit/title-audit.mjs')
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' })
    res.end(fs.readFileSync(PANEL))
  })
  .listen(4100, () => console.log('SEO-панель: http://localhost:4100'))
