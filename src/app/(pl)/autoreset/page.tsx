import { Metadata } from 'next'
import { LegalPageTemplate } from '@/components/legal-page-template'
import type { LegalPageContent } from '@/lib/legal/legal-render'
import { AutoResetStart } from './autoreset-start'

// Strona testowa: poza menu, poza mapą strony, zablokowana dla wyszukiwarek.
export const metadata: Metadata = {
  title: 'AutoReset — wersja testowa',
  description: 'Wersja testowa programu AutoReset (tylko diagnostyka, bez zapisu do drukarki).',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-static'

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
            Program sprawdza drukarkę Epson: model, błędy i liczniki. Na początku wybierasz źródło danych: <strong>symulator</strong> (dane przykładowe, wyraźnie oznaczone jako symulator) albo <strong>prawdziwą drukarkę</strong> podłączoną kablem USB.
          </p>
          <p className={p}>
            Program tylko odczytuje dane. Nie ma w nim funkcji zapisu, resetu ani płatności, nie zmienia niczego w drukarce i nic nie wysyła do internetu.
          </p>
        </div>
      ),
    },
    {
      heading: 'Uruchom',
      body: (
        <div className="space-y-1.5">
          <AutoResetStart />
          <p className={p}>Wymagany Windows 10 lub 11. To jeden plik — nie trzeba instalować Node.js ani rozpakowywać archiwum.</p>
        </div>
      ),
    },
    {
      heading: 'Jak to działa',
      body: (
        <ol className={list}>
          <li>Pierwszy raz: kliknij „Rozpocznij diagnostykę”, pobierz plik <strong>AutoReset.exe</strong> i otwórz go.</li>
          <li>Pojawi się okno diagnostyki. Wybierz 1 (symulator) lub 2 (prawdziwa drukarka — wymaga potwierdzenia słowem TAK).</li>
          <li>Raport zapisze się w Dokumentach, w folderze <strong>AutoReset-raporty</strong>.</li>
          <li>Kolejne wizyty: ten sam przycisk uruchamia już zainstalowany program, bez pobierania.</li>
        </ol>
      ),
    },
    {
      heading: 'Informacja o wydawcy',
      body: (
        <p className={p}>
          To wersja testowa i nie ma jeszcze cyfrowego podpisu wydawcy, dlatego Windows może pokazać dodatkową informację o nieznanym wydawcy. Uruchamiaj program tylko wtedy, gdy ufasz źródłu. Program usuniesz poleceniem <strong>AutoReset.exe --usun</strong>; zapisuje tylko w swoim folderze użytkownika i nie wymaga uprawnień administratora.
        </p>
      ),
    },
    {
      heading: 'Czego ta wersja nie robi',
      body: (
        <ul className={bullets}>
          <li>nie zapisuje do drukarki i nie resetuje liczników,</li>
          <li>nie przyjmuje płatności i nie wysyła danych,</li>
          <li>nie łączy się z drukarką bez Twojego wyboru i potwierdzenia.</li>
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
