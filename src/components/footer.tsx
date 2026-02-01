import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa'
import Link from 'next/link'
import manifest from '@/config/manifest'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="kontakt"
      className="relative w-full py-16 px-6 border-t border-[#3a2e24] text-white"
    >
      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${manifest.Background_1}')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Lewa kolumna - Kontakt */}
          <div className="space-y-4">
            <div className="text-2xl font-cormorant tracking-wide text-[#bfa76a] mb-4">
              Kontakt
            </div>

            <div className="space-y-3 font-inter text-sm leading-snug">
              {/* Adres */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>Adres</span>
                </div>
                <Link
                  href="https://www.google.com/maps/place/Marcina+Bukowskiego+174,+52-418+Wrocław/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-primary transition-colors"
                >
                  <div>Marcina Bukowskiego 174</div>
                  <div>52-418 Wrocław</div>
                </Link>
              </div>

              {/* Telefon */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <Phone className="h-4 w-4" />
                  <span>Telefon</span>
                </div>
                <Link
                  href="tel:+48793759262"
                  className="text-white hover:text-primary transition-colors"
                >
                  +48 793 759 262
                </Link>
              </div>

              {/* E-mail */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <Mail className="h-4 w-4" />
                  <span>E-mail</span>
                </div>
                <Link
                  href="mailto:serwis@omobonus.com.pl"
                  className="text-white hover:text-primary transition-colors"
                >
                  serwis@omobonus.com.pl
                </Link>
              </div>

              {/* Godziny */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Godziny otwarcia</span>
                </div>
                <span className="text-white">
                  Pon–Pt: 8–18
                </span>
              </div>

              {/* Komunikatory */}
              <div>
                <div className="flex items-center gap-2 text-[#bfa76a] font-semibold mb-1">
                  <FaWhatsapp className="h-4 w-4" />
                  <span>Komunikatory</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="https://wa.me/48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp
                  </Link>
                  <span className="opacity-50">·</span>
                  <Link
                    href="https://t.me/+48793759262"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Telegram
                  </Link>
                </div>
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
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja Omobonus serwis"
              />
            </div>
          </div>
        </div>

        {/* Dolny pasek */}
        <div className="mt-8 pt-4 border-t border-[#3a2e24]/30 text-center space-y-1 font-inter">
          <div className="text-sm text-[#b8a894]">
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-primary transition-colors"
            >
              Polityka Prywatności
            </Link>
            <span className="mx-2 opacity-40">|</span>
            <Link
              href="/regulamin"
              className="hover:text-primary transition-colors"
            >
              Regulamin
            </Link>
          </div>

          <p className="text-xs text-[#bfa76a]">
            © {currentYear} Omobonus Sp. z o.o. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
