import manifest from '@/config/manifest'
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Omobonus Serwis',
  description: 'Polityka prywatności serwisu Omobonus Wrocław. Zasady przetwarzania danych osobowych, ochrona RODO.',
  alternates: {
    canonical: 'https://serwis.omobonus.com.pl/polityka-prywatnosci',
  },
}

export const dynamic = 'force-static'

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[65px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${manifest.services_background}')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <section className="relative pb-0 pt-0 z-10">
          {/* Tekst nad formularzem */}
          <p className="text-white/90 text-lg md:text-xl text-center mb-2 md:mb-3 drop-shadow-md font-serif italic pt-1">
            &ldquo;Chcesz zapoznać się z naszą Polityką Prywatności? Przeczytaj poniżej.&rdquo;
          </p>

          <div className="container mx-auto px-2 md:px-4 flex flex-col items-center">
        
        {/* Karta formularza - масштабирована на 20% */}
        <div className="w-full max-w-6xl bg-paper-texture shadow-2xl rounded-sm p-3 md:p-5 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top -mb-[15%]">
          
          {/* Nagłówek formularza */}
          <h2 className="text-[#3a2e24] text-2xl md:text-3xl font-cormorant font-bold text-center mb-3 md:mb-4">
            Polityka Prywatności
          </h2>

          {/* Zawartość polityki prywatności */}
          <div className="space-y-2 md:space-y-3 text-[#3a2e24]">
            
            {/* Wprowadzenie */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                1. Wprowadzenie
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
                przekazanych przez Użytkowników w związku z korzystaniem przez nich z usług serwisu 
                Omobonus Serwis dostępnego pod adresem internetowym <a href="https://serwis.omobonus.com.pl" className="underline hover:text-[#3a2e24]/70">https://serwis.omobonus.com.pl</a>.
              </p>
            </div>

            {/* Administrator danych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                2. Administrator danych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Administratorem danych osobowych jest Omobonus Sp. z o.o. z siedzibą we Wrocławiu, 
                ul. Marcina Bukowskiego 174, 52-418 Wrocław.
              </p>
            </div>

            {/* Rodzaje przetwarzanych danych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                3. Rodzaje przetwarzanych danych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Przetwarzamy następujące kategorie danych osobowych:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu</li>
                <li>Adres zamieszkania/dostawy</li>
                <li>Dane dotyczące urządzenia poddanego serwisowi</li>
                <li><strong>Dane zbierane za pomocą plików cookies</strong>, takie jak adres IP, preferencje użytkownika, dane przeglądarki (jeśli stosowane).</li>
              </ul>
            </div>

            {/* Cel przetwarzania danych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                4. Cel przetwarzania danych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Dane osobowe są przetwarzane w następujących celach:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>Realizacja usług serwisowych</li>
                <li>Kontakt z klientem w sprawie zgłoszenia</li>
                <li>Przygotowanie wyceny naprawy</li>
                <li>Prowadzenie dokumentacji serwisowej</li>
                <li>Wypełnienie obowiązków prawnych</li>
                <li><strong>Analiza statystyk strony i poprawa jakości usług</strong> (jeśli używane narzędzia analityczne, takie jak Google Analytics).</li>
              </ul>
            </div>

            {/* Podstawa prawna przetwarzania */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                5. Podstawa prawna przetwarzania
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Podstawą prawną przetwarzania danych osobowych jest:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>Zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)</li>
                <li>Wykonanie umowy lub podjęcie działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO)</li>
                <li>Wypełnienie obowiązku prawnego (art. 6 ust. 1 lit. c RODO)</li>
              </ul>
            </div>

            {/* Okres przechowywania danych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                6. Okres przechowywania danych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, 
                dla których zostały zebrane, oraz przez okres wymagany przepisami prawa, 
                w tym przepisami podatkowymi i rachunkowymi.
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4 mt-1.5">
                <li>Po upływie tego okresu dane będą <strong>usunięte lub zanonimizowane</strong>.</li>
              </ul>
            </div>

            {/* Prawa użytkownika */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                7. Prawa użytkownika
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Każda osoba, której dane dotyczą, ma prawo do:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>Dostępu do swoich danych osobowych</li>
                <li>Sprostowania (poprawiania) danych</li>
                <li>Usunięcia danych</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Przenoszenia danych</li>
                <li>Wniesienia sprzeciwu wobec przetwarzania</li>
                <li>Cofnięcia zgody w dowolnym momencie</li>
              </ul>
            </div>

            {/* Przekazywanie danych do krajów trzecich */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                8. Przekazywanie danych do krajów trzecich
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Dane osobowe mogą być przekazywane do krajów trzecich w przypadku korzystania z zewnętrznych usług, 
                takich jak przechowywanie danych w chmurze, usługi analityczne lub reklama internetowa. 
                Przekazywanie danych odbywa się zgodnie z obowiązującymi przepisami prawa, w tym za pomocą 
                odpowiednich mechanizmów ochrony danych, takich jak <strong>standardowe klauzule umowne</strong>.
              </p>
            </div>

            {/* Bezpieczeństwo danych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                9. Bezpieczeństwo danych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Podejmujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa danych osobowych. 
                Stosujemy szyfrowanie danych, zabezpieczenia przed dostępem nieautoryzowanym oraz regularnie aktualizujemy 
                nasze systemy zabezpieczeń.
              </p>
            </div>

            {/* Kontakt */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                10. Kontakt
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                W sprawach związanych z ochroną danych osobowych można kontaktować się z Administratorem 
                danych osobowych poprzez formularz kontaktowy dostępny na stronie internetowej 
                lub bezpośrednio pod adresem e-mail: <a href="mailto:serwis@omobonus.com.pl" className="underline hover:text-[#3a2e24]/70">serwis@omobonus.com.pl</a>.
              </p>
            </div>

            {/* Aktualizacje */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                11. Aktualizacje polityki
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Niniejsza Polityka Prywatności może ulec zmianom. Wszelkie zmiany będą publikowane 
                na tej stronie. Zalecamy regularne przeglądanie treści polityki prywatności.
              </p>
            </div>

            {/* Pliki cookies */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                12. Pliki cookies
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                Na naszej stronie używamy plików cookies w celu zbierania informacji o preferencjach użytkowników, 
                poprawy jakości usług oraz w celach analitycznych i marketingowych. Użytkownik może zarządzać 
                ustawieniami cookies poprzez swoją przeglądarkę internetową. Więcej informacji znajduje się 
                w naszej <a href="/polityka-cookies" className="underline hover:text-[#3a2e24]/70">Polityce Cookies</a>.
              </p>
            </div>

            {/* Data aktualizacji */}
            <div className="pt-3 border-t border-[#3a2e24]/20 mt-4">
              <p className="text-sm md:text-base font-sans text-[#3a2e24]/70 italic">
                {`Ostatnia aktualizacja: ${new Date().toLocaleDateString('pl-PL', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}`}
              </p>
            </div>

          </div>
        </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

