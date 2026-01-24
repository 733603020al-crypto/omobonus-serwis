import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa'
import Link from 'next/link'
import manifest from '@/config/manifest'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="kontakt" className="relative w-full py-16 px-6 border-t border-[#3a2e24] text-white">
      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.Background_1}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Lewa kolumna - Kontakt */}
          <div className="space-y-3">
            <div className="text-2xl font-semibold tracking-wide text-[#bfa76a] mb-3">
              Kontakt
            </div>

            <div className="space-y-2.5">
              <div>
                <div className="text-[#bfa76a] font-semibold text-base mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#bfa76a] flex-shrink-0" />
                  <span>Adres</span>
                </div>
                <Link
                  href="https://www.google.com/maps/place/Marcina+Bukowskiego+174,+52-418+Wrocław/@51.0775056,16.9784737,11z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors block text-sm leading-tight"
                >
                  <div>Marcina Bukowskiego 174</div>
                  <div>52-418 Wrocław</div>
                </Link>
              </div>

              <div>
                <div className="text-[#bfa76a] font-semibold text-base mb-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#bfa76a] flex-shrink-0" />
                  <span>Telefon</span>
                </div>
                <Link
                  href="tel:+48793759262"
                  className="text-white hover:text-primary transition-colors block text-sm"
                >
                  +48 793 759 262
                </Link>
              </div>

              <div>
                <div className="text-[#bfa76a] font-semibold text-base mb-1 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#bfa76a] flex-shrink-0" />
                  <span>E-mail</span>
                </div>
                <Link
                  href="mailto:serwis@omobonus.com.pl"
                  className="text-white hover:text-primary transition-colors block text-sm"
                >
                  serwis@omobonus.com.pl
                </Link>
              </div>

              <div>
                <div className="text-[#bfa76a] font-semibold text-base mb-1 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#bfa76a] flex-shrink-0" />
                  <span>Godziny otwarcia</span>
                </div>
                <span className="text-white block text-sm">
                  Pon–Pt: 8–18
                </span>
              </div>

              <div>
                <div className="text-[#bfa76a] font-semibold text-base mb-1 flex items-center gap-2">
                  <FaWhatsapp className="h-4 w-4 text-[#bfa76a] flex-shrink-0" />
                  <span>Komunikatory</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Link
                    href="https://wa.me/48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </Link>
                  <span className="text-white/60">·</span>
                  <Link
                    href="https://t.me/+48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Telegram
                  </Link>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Link
                  href="/polityka-prywatnosci"
                  className="block text-[#b8a894] hover:text-primary transition-colors text-sm"
                >
                  Polityka Prywatności
                </Link>
                <Link
                  href="/regulamin"
                  className="block text-[#b8a894] hover:text-primary transition-colors text-sm"
                >
                  Regulamin
                </Link>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Mapa */}
          <div className="flex items-center justify-center">
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-[#3a2e24]">
              <iframe
                src="https://www.google.com/maps?q=Marcina+Bukowskiego+174,+52-418+Wrocław&hl=pl&z=11&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter:
                    'grayscale(0.3) sepia(0.2) brightness(0.9) contrast(1.1)',
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja Omobonus serwis"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#3a2e24]/30 text-center space-y-1">
          <p className="text-[#bfa76a] text-sm">
            Omobonus Sp. z o.o. – legalny serwis komputerów, laptopów i drukarek we Wrocławiu.
          </p>
          <p className="text-[#bfa76a] text-sm">
            © {currentYear} Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
