// Gotowy szkic odpowiedzi jako plik .eml — gdy Claude nie ma dostępu do Outlooka (chmura).
// Plik ma nagłówek X-Unsent: 1, więc Outlook otwiera go jako NOWĄ wiadomość do wysłania (nie jako odebraną):
// odbiorca, UDW, temat, treść i karta dojazdu są już na miejscu — wystarczy przejrzeć i kliknąć „Wyślij”.
// Użycie:
//   node .claude/skills/odpowiedzi-klientom/zrob-eml.mjs --to klient@x.pl --subject "RE: ..." --html tresc.html [--img karta.png] [--out odpowiedz.eml]
// W HTML karta: <img src="cid:karta-trasy" ...>. UDW zawsze: zaemka222@gmail.com.
import fs from 'node:fs'
import path from 'node:path'

const a = process.argv.slice(2), o = { bcc: 'zaemka222@gmail.com', from: 'serwis@omobonus.com.pl', out: 'odpowiedz.eml' }
for (let i = 0; i < a.length; i += 2) o[a[i].replace(/^--/, '')] = a[i + 1]
if (!o.to || !o.subject || !o.html) { console.error('Wymagane: --to --subject --html'); process.exit(1) }

const b64 = (buf) => Buffer.from(buf).toString('base64').replace(/.{76}/g, '$&\r\n')
const enc = (s) => `=?UTF-8?B?${Buffer.from(s).toString('base64')}?=`
const html = fs.readFileSync(o.html)
const B = 'omobonus-' + Date.now()
const parts = [
  `--${B}`, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', b64(html),
]
if (o.img) parts.push(`--${B}`, 'Content-Type: image/png; name="koszt-dojazdu.png"', 'Content-Transfer-Encoding: base64',
  'Content-ID: <karta-trasy>', 'Content-Disposition: inline; filename="koszt-dojazdu.png"', '', b64(fs.readFileSync(o.img)))
parts.push(`--${B}--`, '')
const eml = [
  'X-Unsent: 1', `From: ${o.from}`, `To: ${o.to}`, `Bcc: ${o.bcc}`, `Subject: ${enc(o.subject)}`,
  'MIME-Version: 1.0', `Content-Type: multipart/related; boundary="${B}"; type="text/html"`, '', ...parts,
].join('\r\n')
fs.writeFileSync(o.out, eml)
console.log('EML:', path.resolve(o.out))
