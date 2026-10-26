// Z chmury (brak Outlooka): gotowa odpowiedź dla klienta idzie e-mailem na skrzynkę serwis@omobonus.com.pl,
// ze wszystkim formatowaniem i kartą dojazdu — do skopiowania i wysłania klientowi.
// Ten sam serwer pocztowy, co formularz na stronie: zmienne SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
// (sekrety środowiska chmury; skrypt ich nie wypisuje).
// Użycie:
//   node .claude/skills/odpowiedzi-klientom/wyslij-do-serwisu.mjs --temat "<temat maila klienta>" --klient "Imię Nazwisko <email>" --html tresc.html [--img koszt-dojazdu.png]
import fs from 'node:fs'
import { createRequire } from 'node:module'
const nodemailer = createRequire(import.meta.url)('nodemailer')

const a = process.argv.slice(2), o = { do: 'serwis@omobonus.com.pl' }
for (let i = 0; i < a.length; i += 2) o[a[i].replace(/^--/, '')] = a[i + 1]
if (!o.temat || !o.klient || !o.html) { console.error('Wymagane: --temat --klient --html'); process.exit(1) }
const brak = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter(k => !process.env[k])
if (brak.length) { console.error('Brak ustawień poczty w środowisku: ' + brak.join(', ')); process.exit(1) }

const port = parseInt(process.env.SMTP_PORT, 10)
const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// pasek po rosyjsku nad odpowiedzią — dla pracownika, nie dla klienta
const pasek = `<p style="font-family:Arial,sans-serif;font-size:10pt;background:#fff3cd;border:1px solid #e0c36a;padding:8px 10px">
Отправить клиенту: <b>${esc(o.klient)}</b> — ответом на письмо «${esc(o.temat)}». Добавить скрытую копию (UDW): zaemka222@gmail.com.<br>
Скопировать всё ниже желтой полосы.</p><hr>`
const html = fs.readFileSync(o.html, 'utf8').replace(/<body([^>]*)>/i, `<body$1>${pasek}`)
const info = await t.sendMail({
  from: process.env.SMTP_FROM || 'serwis@omobonus.com.pl',
  to: o.do,
  subject: `Ответ клиенту — отправить в ответ на письмо «${o.temat}» (ИИ работал из облака, нет доступа к Outlook)`,
  html,
  attachments: o.img ? [{ filename: 'koszt-dojazdu.png', path: o.img, cid: 'karta-trasy' }] : [],
})
console.log('Wysłano na', o.do, info.messageId)
