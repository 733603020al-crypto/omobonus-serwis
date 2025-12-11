import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa'
import Link from 'next/link'
import manifest from '@/config/manifest'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full py-16 px-6 border-t border-[#3a2e24] text-white">
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
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-wide text-[#bfa76a]">
              Kontakt
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <Link
                    href="https://maps.app.goo.gl/K5VzK8uHkP8xJ5dD7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary transition-colors"
                  >
                    <div>Marcina Bukowskiego 174</div>
                    <div>52-418 Wrocław</div>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <Link
                  href="tel:+48793759262"
                  className="text-white hover:text-primary transition-colors"
                >
                  +48 793 759 262
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <Link
                  href="mailto:omobonus.pl@gmail.com"
                  className="text-white hover:text-primary transition-colors"
                >
                  omobonus.pl@gmail.com
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white">
                  Godziny otwarcia: pon–pt — 9:00–17:00
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="h-5 w-5 text-primary flex-shrink-0" />
                <Link
                  href="https://wa.me/48793759262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  WhatsApp
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <FaTelegramPlane className="h-5 w-5 text-primary flex-shrink-0" />
                <Link
                  href="https://t.me/+48793759262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                >
                  Telegram
                </Link>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.1234567890123!2d17.12345678901234!3d51.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDA3JzI0LjQiTiAxN8KwMDcnMjQuNCJF!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
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

        <div className="mt-12 pt-6 border-t border-[#3a2e24]/30 text-center space-y-2">
          <p className="text-white/80 text-sm">
            Omobonus Sp. z o.o. – legalny serwis komputerów, laptopów i drukarek we Wrocławiu.
          </p>
          <p className="text-white/80 text-sm">
            © {currentYear} Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
