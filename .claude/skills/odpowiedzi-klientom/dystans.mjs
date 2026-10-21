// Odległość dojazdu z serwisu do adresu klienta (trasa samochodem, w jedną stronę).
// Użycie: node .claude/skills/odpowiedzi-klientom/dystans.mjs "Osobowicka 127, Wrocław"
const SERWIS = [16.9784082, 51.0775534] // Marcina Bukowskiego 174, 52-418 Wrocław

const adres = process.argv.slice(2).join(' ').trim()
if (!adres) { console.log('Podaj adres'); process.exit(1) }

const geo = await fetch(`https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(adres)}`).then(r => r.json())
const f = geo.features?.[0]
if (!f) { console.log('Nie znaleziono adresu:', adres); process.exit(1) }
const [lon, lat] = f.geometry.coordinates
const p = f.properties
const znaleziony = [p.street, p.housenumber, p.postcode, p.city].filter(Boolean).join(' ')

const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${SERWIS.join(',')};${lon},${lat}?overview=false`).then(r => r.json())
const km = r.routes[0].distance / 1000
console.log(`Znaleziony adres: ${znaleziony}`)
console.log(`W jedną stronę: ${km.toFixed(1)} km, w obie strony: ${(2 * km).toFixed(1)} km`)
