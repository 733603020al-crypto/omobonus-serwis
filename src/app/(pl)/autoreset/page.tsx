import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import type { LegalPageContent } from '@/lib/legal/legal-render'

// Strona testowa: poza menu, poza mapą strony, zablokowana dla wyszukiwarek.
export const metadata: Metadata = {
  title: 'AutoReset — wersja testowa',
  description: 'Wersja testowa programu AutoReset (tylko diagnostyka, bez zapisu do drukarki).',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-static'

const ZIP_URL = '/autoreset/AutoReset-Diagnostyka-test.zip'
const p = 'text-sm md:text-base font-sans leading-normal'
const list = 'list-decimal list-inside space-y-1 text-sm md:text-base font-sans leading-normal ml-4'
const bullets = 'list-disc list-inside space-y-0.5 text-sm md:text-base font-sans leading-normal ml-4'

const content: LegalPageContent = {
  intro: 'Wersja testowa',
  title: 'AutoReset — wersja testowa',
  lastUpdatedLabel: 'Ostatnia aktualizacja',
  dateLocale: 'pl-PL',
  lastUpdated: '2026-11-22',
  sections: [
    {
      heading: 'Wersja testowa — tylko diagnostyka',
      body: (
        <div className="space-y-1.5">
          <p className="inline-block rounded-sm border border-[#3a2e24]/40 bg-[#3a2e24]/10 px-2 py-0.5 text-sm font-sans font-semibold uppercase tracking-wide">
            Wersja testowa
          </p>
          <p className={p}>
            Program pokazuje, jak będzie wyglądać diagnostyka drukarki Epson. W tej wersji dane pochodzą z <strong>symulatora</strong> (model E-300) — prawdziwa drukarka nie jest wykrywana ani odczytywana.
          </p>
          <p className={p}>
            Program tylko odczytuje dane. Nie ma w nim funkcji zapisu, resetu ani płatności, nie zmienia niczego w drukarce i nic nie wysyła do internetu.
          </p>
        </div>
      ),
    },
    {
      heading: 'Pobierz',
      body: (
        <div className="space-y-1.5">
          <a
            href={ZIP_URL}
            download
            className="inline-block rounded-sm bg-[#3a2e24] px-5 py-2 font-sans text-sm md:text-base font-semibold text-[#f5ecd7] hover:bg-[#3a2e24]/85"
          >
            Pobierz AutoReset (Windows, ZIP, ok. 32 MB)
          </a>
          <p className={p}>Wymagany Windows 10 lub 11. Instalowanie Node.js ani innych programów nie jest potrzebne.</p>
        </div>
      ),
    },
    {
      heading: 'Jak uruchomić',
      body: (
        <ol className={list}>
          <li>Pobierz plik ZIP i rozpakuj go w całości do zwykłego folderu (np. na Pulpit lub do Dokumentów). Nie uruchamiaj programu z wnętrza archiwum.</li>
          <li>Kliknij dwukrotnie plik <strong>Diagnostyka.cmd</strong>.</li>
          <li>Wynik pojawi się w oknie, a raport zapisze się w folderze <strong>raporty</strong> obok programu (plik .json).</li>
        </ol>
      ),
    },
    {
      heading: 'Windows pokazuje ostrzeżenie',
      body: (
        <div className="space-y-1.5">
          <p className={p}>Program nie jest jeszcze podpisany cyfrowo, dlatego Windows może napisać „Zabezpieczył komputer”. Kliknij „Więcej informacji”, a potem „Uruchom mimo to”.</p>
          <p className={p}>Jeśli pliki są zablokowane po pobraniu: kliknij prawym przyciskiem plik ZIP, wybierz „Właściwości”, zaznacz „Odblokuj”, a następnie rozpakuj ponownie.</p>
        </div>
      ),
    },
    {
      heading: 'Czego ta wersja nie robi',
      body: (
        <ul className={bullets}>
          <li>nie łączy się z prawdziwą drukarką,</li>
          <li>nie zapisuje do drukarki i nie resetuje liczników,</li>
          <li>nie przyjmuje płatności i nie wysyła danych.</li>
        </ul>
      ),
    },
    {
      heading: 'Pytania',
      body: (
        <p className={p}>
          Napisz do nas: <a className="underline hover:text-[#3a2e24]/70" href="mailto:serwis@omobonus.com.pl">serwis@omobonus.com.pl</a>
        </p>
      ),
    },
  ],
}

export default function AutoResetPage() {
  return <LegalPageTemplate content={content} cardMarginBottomClass="-mb-[15%]" locale="pl" />
}
