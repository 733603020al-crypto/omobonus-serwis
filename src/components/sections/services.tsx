import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/services-data'
import manifest from '@/config/KANONICZNY_MANIFEST.json'
import { ArrowRight } from 'lucide-react'

export function Services() {
  return (
    <section id="uslugi" className="relative pt-8 md:pt-12 pb-16 md:pb-24 text-center text-white bg-[#1e1b16]">
      {/* Tło */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${manifest.services_background}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Zawartość */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
            Nasze Usługi
          </h2>
          <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-5xl mx-auto font-semibold drop-shadow-2xl">
            Oferujemy serwis komputerów, laptopów i drukarek oraz wsparcie techniczne dla domu i biura we Wrocławiu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/uslugi/${service.slug}`}
              className="group relative min-h-[70px] rounded-lg py-2 px-3 border-2 border-[rgba(200,169,107,0.5)] hover:border-[rgba(200,169,107,0.85)] transition-all duration-300 hover:shadow-xl flex items-center text-left w-full services-card-bg"
            >
              {/* Ikona */}
              <div className="mr-4 w-[50px] h-[50px] flex-shrink-0 flex items-center justify-center">
                <Image
                  src={service.icon}
                  alt={`${service.title} Wrocław - ikona usługi serwisowej`}
                  width={50}
                  height={50}
                  className="object-contain w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </div>

              {/* Treść */}
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-cormorant font-semibold text-[#ffffff] group-hover:text-white transition-colors mb-1 leading-tight">
                  {service.slug === 'serwis-drukarek-termicznych' ? 'Serwis i naprawa drukarek etykiet' : service.title}
                </h3>
                <div className="flex items-center gap-2 text-[#bfa76a] text-xs font-serif group-hover:translate-x-1 transition-transform">
                  <span>Zobacz cennik</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
