import manifest from '@/config/manifest'
import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Regulamin | Omobonus Serwis',
  description: 'Regulamin świadczenia usług serwisowych przez Omobonus',
}

export const dynamic = 'force-static'

export default function Regulamin() {
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

        <section className="relative pb-0 pt-1 min-h-0 z-10">
          {/* Tekst nad formularzem */}
          <p className="text-white/90 text-lg md:text-xl text-center mb-2 md:mb-3 drop-shadow-md font-serif italic">
            &ldquo;Chcesz zapoznać się z naszym Regulaminem? Przeczytaj poniżej.&rdquo;
          </p>

          <div className="container mx-auto px-2 md:px-4 flex flex-col items-center">
        
        {/* Karta formularza - масштабирована на 20% */}
        <div className="w-full max-w-6xl bg-paper-texture shadow-2xl rounded-sm p-3 md:p-5 border border-[#3a2e24]/20 scale-[0.95] md:scale-[0.8] origin-top -mb-[25%]">
          
          {/* Nagłówek formularza */}
          <h2 className="text-[#3a2e24] text-2xl md:text-3xl font-cormorant font-bold text-center mb-3 md:mb-4">
            Regulamin świadczenia usług serwisowych przez Omobonus
          </h2>

          {/* Zawartość regulaminu */}
          <div className="space-y-2 md:space-y-3 text-[#3a2e24]">
            
            {/* Postanowienia ogólne */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                1. Postanowienia ogólne
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>1.1.</strong> Niniejszy Regulamin (dalej &ldquo;Regulamin&rdquo;) określa zasady i warunki świadczenia usług naprawy, diagnostyki, konserwacji, oraz innych usług związanych z komputerami, drukarkami, peryferiami i innym sprzętem IT przez firmę Omobonus Sp. z o.o. (dalej &ldquo;Serwis&rdquo;).
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>1.2.</strong> Usługi świadczone są przez Omobonus Sp. z o.o., z siedzibą pod adresem: ul. Marcina Bukowskiego 174, 52-418 Wrocław, NIP: 8943160773, KRS: 0000869086, REGON: 387509703, kontakt e-mail: <a href="mailto:omobonus.pl@gmail.com" className="underline hover:text-[#3a2e24]/70">omobonus.pl@gmail.com</a>, telefon: <a href="tel:+48793759262" className="underline hover:text-[#3a2e24]/70">+48 793 759 262</a>.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>1.3.</strong> Każdy Klient, który korzysta z usług Serwisu, zobowiązany jest do zapoznania się z niniejszym Regulaminem i jego zaakceptowania przed rozpoczęciem świadczenia usług.
              </p>
            </div>

            {/* Definicje */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                2. Definicje
              </h3>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li><strong>Klient</strong> — osoba fizyczna lub prawna, która korzysta z usług Serwisu.</li>
                <li><strong>Sprzęt</strong> — urządzenia przekazane do Serwisu w celu diagnostyki, naprawy lub konserwacji.</li>
                <li><strong>Zlecenie naprawy</strong> — formularz wypełniany przez Klienta, który zawiera dane o sprzęcie oraz opis usterki.</li>
                <li><strong>Usługa</strong> — wszelkie prace wykonywane przez Serwis, w tym naprawa, diagnostyka, instalacja oprogramowania, konserwacja itp.</li>
              </ul>
            </div>

            {/* Zasady przyjęcia sprzętu do naprawy */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                3. Zasady przyjęcia sprzętu do naprawy
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>3.1.</strong> Serwis przyjmuje sprzęt do naprawy wyłącznie po wypełnieniu formularza Zlecenia naprawy lub zgłoszenia przez system online.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>3.2.</strong> W Zleceniu naprawy Klient zobowiązany jest do podania:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>pełnych danych kontaktowych;</li>
                <li>opisu problemu/usterki;</li>
                <li>numeru seryjnego sprzętu;</li>
                <li>danych dotyczących sprzętu (marka, model, konfiguracja, stan techniczny);</li>
                <li>oświadczenia o stanie gwarancji (jeśli dotyczy).</li>
              </ul>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>3.3.</strong> Serwis ma prawo odmówić przyjęcia sprzętu do naprawy, jeśli:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>Klient nie dostarczył wymaganych danych;</li>
                <li>Sprzęt był naprawiany przez inne osoby lub poddany samodzielnej modyfikacji, co uniemożliwia naprawę.</li>
              </ul>
            </div>

            {/* Czas realizacji usług */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                4. Czas realizacji usług
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>4.1.</strong> Standardowy czas realizacji naprawy wynosi do 30 dni roboczych od momentu przyjęcia sprzętu do Serwisu, chyba że ustalono inaczej w Zleceniu naprawy lub z Klientem.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>4.2.</strong> W przypadku konieczności zamówienia części zamiennych lub opóźnień związanych z dostawą, Serwis zobowiązuje się do poinformowania Klienta o przedłużeniu terminu wykonania usługi.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>4.3.</strong> Serwis nie ponosi odpowiedzialności za opóźnienia wynikłe z powodu działania siły wyższej, np. opóźnienia w dostawach części, awarie systemów, działanie producenta sprzętu.
              </p>
            </div>

            {/* Gwarancja na usługi */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                5. Gwarancja na usługi
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>5.1.</strong> Serwis udziela gwarancji na wykonaną usługę naprawy lub wymienione części. Okres gwarancji wynosi zazwyczaj 6-12 miesięcy, chyba że uzgodniono inaczej.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>5.2.</strong> Gwarancja obejmuje wyłącznie wykonane prace naprawcze oraz wymienione części. W przypadku uszkodzeń wynikających z niewłaściwego użytkowania sprzętu lub ingerencji osób trzecich, Serwis nie ponosi odpowiedzialności.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>5.3.</strong> Gwarancja nie obejmuje uszkodzeń wynikających z naturalnego zużycia części, działań w ramach aktualizacji oprogramowania, a także problemów wynikających z błędów użytkownika.
              </p>
            </div>

            {/* Odpowiedzialność Serwisu */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                6. Odpowiedzialność Serwisu
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>6.1.</strong> Serwis zobowiązuje się do świadczenia usług zgodnie z najwyższymi standardami oraz do zachowania staranności w procesie naprawy i obsługi sprzętu.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>6.2.</strong> Serwis nie ponosi odpowiedzialności za:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>utratę danych, plików, programów na naprawianym sprzęcie (Klient powinien wykonać kopię zapasową przed oddaniem sprzętu do naprawy);</li>
                <li>szkody pośrednie, takie jak utrata zysków, wynikające z opóźnień w naprawie.</li>
              </ul>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>6.3.</strong> Serwis ma prawo odmówić wykonania usługi, jeśli zlecone prace są niemożliwe do wykonania z powodu uszkodzeń sprzętu, które uniemożliwiają jego naprawę.
              </p>
            </div>

            {/* Prawa i obowiązki Klienta */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                7. Prawa i obowiązki Klienta
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>7.1.</strong> Klient zobowiązuje się do:
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4">
                <li>dostarczenia sprzętu w odpowiednim stanie do naprawy;</li>
                <li>udzielania Serwisowi niezbędnych informacji dotyczących problemów z urządzeniem;</li>
                <li>poinformowania Serwisu o jakichkolwiek zmianach dotyczących danych kontaktowych.</li>
              </ul>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>7.2.</strong> Klient ponosi odpowiedzialność za bezpieczeństwo danych na urządzeniu. Serwis nie odpowiada za ewentualną utratę danych.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>7.3.</strong> Klient zobowiązuje się do odbioru naprawionego sprzętu w uzgodnionym terminie. W przeciwnym razie Serwis ma prawo naliczyć dodatkową opłatę za przechowywanie sprzętu.
              </p>
            </div>

            {/* Ochrona danych osobowych */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                8. Ochrona danych osobowych
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>8.1.</strong> Klient wyraża zgodę na przetwarzanie jego danych osobowych w celu realizacji usług naprawy, kontaktu oraz w celach marketingowych, jeśli wyraził zgodę.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>8.2.</strong> Serwis zobowiązuje się do przestrzegania obowiązujących przepisów dotyczących ochrony danych osobowych, w tym RODO, i zapewnia bezpieczeństwo przechowywania danych.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>8.3.</strong> Klient ma prawo do wglądu, korekty, usunięcia danych osobowych oraz przenoszenia danych, zgodnie z obowiązującymi przepisami prawa.
              </p>
            </div>

            {/* Cennik i płatności */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                9. Cennik i płatności
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>9.1.</strong> Ceny usług naprawy są ustalane na podstawie rodzaju usługi i zakresu naprawy. Cennik dostępny jest na stronie internetowej Serwisu lub w siedzibie firmy.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>9.2.</strong> Płatność za usługi następuje po zakończeniu naprawy lub świadczenia usługi. Klient może dokonać płatności gotówką, przelewem bankowym lub kartą kredytową.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>9.3.</strong> W przypadku niewykonania usługi z winy Klienta (np. brak odbioru sprzętu w terminie) Serwis ma prawo do obciążenia Klienta kosztami związanymi z przechowywaniem sprzętu.
              </p>
            </div>

            {/* Reklamacje */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                10. Reklamacje
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>10.1.</strong> Klient ma prawo zgłosić reklamację dotyczącą wykonanej usługi w ciągu 14 dni roboczych od daty odbioru sprzętu.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>10.2.</strong> Reklamacja powinna zostać złożona na piśmie lub drogą elektroniczną. Serwis rozpatrzy reklamację w terminie 14 dni roboczych.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>10.3.</strong> W przypadku uznania reklamacji Serwis zobowiązuje się do bezpłatnej naprawy lub wymiany części, bądź zwrotu kosztów za usługę.
              </p>
            </div>

            {/* Zmiany Regulaminu */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                11. Zmiany Regulaminu
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>11.1.</strong> Serwis ma prawo do wprowadzania zmian w Regulaminie. Zmiany wchodzą w życie po opublikowaniu nowej wersji Regulaminu na stronie internetowej Serwisu.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>11.2.</strong> Klient zostanie poinformowany o zmianach w Regulaminie, a kontynuowanie korzystania z usług po wprowadzeniu zmian będzie traktowane jako akceptacja nowych warunków.
              </p>
            </div>

            {/* Postanowienia końcowe */}
            <div className="space-y-1.5">
              <h3 className="text-lg md:text-xl font-cormorant font-bold">
                12. Postanowienia końcowe
              </h3>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>12.1.</strong> Regulamin dostępny jest na stronie internetowej Serwisu i może być wydrukowany lub zapisany przez Klienta.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>12.2.</strong> Wszystkie spory wynikłe z realizacji usług będą rozstrzygane przez sąd właściwy dla siedziby Serwisu.
              </p>
              <p className="text-sm md:text-base font-sans leading-normal">
                <strong>12.3.</strong> W przypadku niezgodności postanowień Regulaminu z obowiązującymi przepisami prawa, zastosowanie mają przepisy prawa polskiego.
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

