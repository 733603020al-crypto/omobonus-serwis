import { notFound } from "next/navigation"
import { services } from "@/lib/services-data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import manifest from "@/config/KANONICZNY_MANIFEST.json"
import ServiceAccordion from "../service-accordion"

export async function generateStaticParams() {
  return services.map(service => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[65px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${manifest.services_background}')` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative">
          <div className="container max-w-5xl mx-auto px-4 md:px-6 text-center relative z-10 mb-6">
            <h1 className="text-[40px] font-cormorant font-bold text-[#ffffff] leading-[1.1]">
              {service.title}
            </h1>
            {service.slug === 'wynajem-drukarek' ? (
              <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                Drukarka z serwisem i tonerem w cenie — Ty dbasz tylko o papier i prąd.
              </p>
            ) : (
              <p className="mt-[6px] text-[18px] text-[#bfa76a] font-cormorant italic leading-tight max-w-3xl mx-auto font-semibold drop-shadow-2xl">
                Pełny wykaz usług i cen, bez ukrytych kosztów (nie "naprawa od 50 zł" lub "cena do uzgodnienia")
              </p>
            )}
          </div>
        </div>

        <ServiceAccordion service={service} />
      </main>
      <Footer />
    </>
  )
}
