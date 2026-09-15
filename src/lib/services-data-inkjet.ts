import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyInkjetPaperFeedSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const paperSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-mechanizm') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Mechanizm poboru papieru')
    )

  if (!paperSubcategory) return

  paperSubcategory.items = [
    {
      service:
        'Czyszczenie lub wymiana rolki pobierającej / separatora\nusuwa zacięcia, „pobiera kilka kartek”',
      price: '80 / 120 / 160\n+ części',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie czujników papieru\nusuwa fałszywe komunikaty „brak papieru”',
      price: '80 / 130 / 170',
      duration: '1-2 dni',
    },
    {
      service:
        'Regulacja prowadnic i rolek rejestracji papieru\nwyrównuje tor papieru, zmniejsza zacięcia',
      price: '90 / 140 / 180\n+ części',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa mechanizmu poboru papieru\neliminuje ślizganie i blokady',
      price: '100 / 150 / 200\n+ części',
      duration: '1-3 dni',
    },
  ]
}

const applyInkjetCarriageSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const carriageSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-karetka') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Karetka i napęd')
    )

  if (!carriageSubcategory) return
  carriageSubcategory.title = 'Karetka i napęd (pasek, enkoder)'

  carriageSubcategory.items = [
    {
      service:
        'Czyszczenie i smarowanie prowadnic karetki\nusuwa szarpanie i hałas',
      price: '80 / 130 / 170',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana paska napędowego karetki\nusuwa „zgrzyt”',
      price: '120 / 170 / 220 + część',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie / wymiana taśmy enkodera\nusuwa przesunięcia i cienie',
      price: '100 / 150 / 200 + część',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa silnika karetki / mechanizmu przesuwu\ndrukarka nie rusza głowicy',
      price: '140 / 200 / 260 + część',
      duration: '1-5 dni',
    },
  ]
}

const applyInkjetHeadSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const headSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-glowica') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Głowica drukująca i układ tuszu')
    )

  if (!headSubcategory) return
  headSubcategory.title = 'Głowica drukująca i układ tuszu'

  headSubcategory.items = [
    {
      service: 'Udrażnianie głowicy drukującej\nusuwa przerwy w druku',
      price: '120 / 170 / 220',
      duration: '1-3 dni',
    },
    {
      service:
        'Płukanie i odpowietrzanie układu tuszu\nzapobiega pęcherzykom',
      price: '130 / 180 / 230 + materiał',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana głowicy drukującej\ngdy udrażnianie nie działa',
      price: '120 / 170 / 220 + część',
      duration: '1-3 dni',
    },
    {
      service: 'Serwis stacji serwisowej\nczyści głowicę',
      price: '120 / 170 / 220 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Reset blokad serwisowych\nodblokowuje drukarkę',
      price: '80 / 120 / 160',
      duration: '1 dzień',
    },
    {
      service:
        'Czyszczenie/wymiana pochłaniacza tuszu\npampers – gąbki',
      price: '80 / 120 / 160 + materiał',
      duration: '1-2 dni',
    },
  ]
}

const applyInkjetElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const electronicsSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-elektronika') ||
    serviceSection?.subcategories?.find(sub =>
      sub.title?.includes('Naprawy elektroniczne')
    )

  if (!electronicsSubcategory) return

  electronicsSubcategory.items = [
    {
      service:
        'Naprawa lub wymiana złączki lub gniazda LAN/USB uszkodzone / poluzowane\n(usuwa brak wykrywania drukarki przez komputer / LAN)',
      price: '90 / 130 / 170\n+ części',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa lub wymiana zasilacza (PSU / płytka zasilająca)\n(po awarii po przepięciu / skoku napięcia)',
      price: '150 / 200 / 250 + części',
      duration: '1-5 dni',
    },
    {
      service:
        'Diagnostyka płyty głównej / elektroniki sterującej\n(ustala źródło błędów, zwarć, braku komunikacji)',
      price: '60 / 90 / 120',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana płyty głównej (formatera) / interfejsów I/O / HVPS\n(błędy firmware, usuwa problemy z uruchamianiem drukarki, samoczynnym wyłączaniem)',
      price: '160 / 220 / 280 + części',
      duration: '1-5 dni',
    },
    {
      service:
        'Odbudowa ścieżek / lutów po zalaniu lub przepięciu\n(przywraca ciągłość sygnałów płyty głównej)',
      price: '140 / 210 / 300',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana modułu HV (wysokiego napięcia) dla sekcji obrazu / transferu',
      price: '160 / 260 / 330 + część',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana wentylatora / modułu chłodzenia\n(hałas, przegrzewanie, zabrudzenie)',
      price: '90 / 130 / 170 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana taśm sygnałowych / kabli wewnętrznych',
      price: '70 / 110 / 150 + część',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana uszkodzonego panelu sterowania (przyciski, taśmy, sensory), panelu dotykowego / ekranu LCD)',
      price: '140 / 200 / 260 + część',
      duration: '2-5 dni',
    },
  ]
}

const applyInkjetScannerSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const scannerSubcategory =
    serviceSection?.subcategories?.find(sub => sub.title === 'Skaner / ADF')

  if (!scannerSubcategory) return

  scannerSubcategory.title = 'Skaner / ADF (dla MFP)'
  scannerSubcategory.items = [
    {
      service:
        'Czyszczenie optyki skanera (lustra, soczewki, lampa LED/CCD).\nUsuwanie pasów i smug spowodowanych zabrudzeniem optyki',
      price: '120 / 160 / 250\n+ części',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa mechanizmu skanera (optyka, napęd, prowadnice)',
      price: '130 / 180 / 230\n+ części',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana silnika napędu skanera',
      price: '140 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana taśmy transmisyjnej CCD / przewodu sygnałowego skanera',
      price: '150 / 200 / 250\n+ część',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana szkła skanera (głównego)',
      price: '150 / 200 / 250\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana rolek ADF i separatorów\n(zapobiega pobieraniu wielu kartek naraz)',
      price: '100 / 150 / 200\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie szyby skanera i szyby „pod ADF”\n(usuwa smugi i linie przy skanowaniu)',
      price: '60 / 90 / 120',
      duration: '-',
    },
    {
      service:
        'Wymiana wąskiej szyby pod ADF\n(tzw. „szyba skanowania z podajnika”)',
      price: '100 / 150 / 200\n+ część',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa silnika ADF / sprzęgła pobierania',
      price: '150 / 200 / 250\n+ część',
      duration: '1-4 dni',
    },
  ]
}

const applyInkjetSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory =
    serviceSection?.subcategories?.find(
      sub => sub.title === 'Oprogramowanie i konfiguracja'
    )

  if (!softwareSubcategory) return

  softwareSubcategory.icon = '/images/naprawy-oprogramowanie-v3.webp'
  softwareSubcategory.items = [
    {
      service:
        'Instalacja sterowników i konfiguracja w sieci (router / Wi-Fi / LAN /)\n(zdalnie lub lokalnie)',
      price: '50 / 100 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja aplikacji mobilnych (AirPrint / Mopria / aplikacje producenta)\n(drukowanie ze smartfona bez kabli)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Aktualizacja firmware / reset systemu drukarki\n(usuwa błędy i komunikaty serwisowe)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników serwisowych bez ingerencji w moduły\n(odblokowanie funkcji po komunikacie o konserwacji)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Przywrócenie ustawień fabrycznych i ponowna konfiguracja\n(rozwiązuje problemy po błędnych zmianach ustawień)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Usunięcie komunikatów błędów systemowych (diagnostyka + reset)\n(drukarka wraca do pracy bez błędów)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Usuwanie konfliktów sterowników\n(przywraca poprawną komunikację drukarka ↔ komputer)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Konfiguracja skanowania do komputera (SMB/FTP)\n(skant trafia bezpośrednio do folderu użytkownika)',
      price: '70 / 110 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja skanowania do e-mail (SMTP, TLS, porty, uwierzytelnienie) / do chmury (Google Drive / OneDrive / SharePoint)\n(skanowanie jednym przyciskiem)',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja panelu webowego drukarki (IP, DHCP, DNS, zabezpieczenia)\n(ustawienia sieciowe pod kontrolą)',
      price: '60 / 100 / 140',
      duration: '1 dzień',
    },
    {
      service:
        'Migracja drukarki na nowy komputer / serwer\n(przeniesienie profili, skrótów, udziałów)',
      price: '80 / 120 / 160',
      duration: '1 dzień',
    },
    {
      service:
        'Zabezpieczenie dostępu (PIN / hasło administratora)\n(chronic urządzenie przed nieautoryzowanym użyciem)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Szkolenie użytkownika (5–15 min)\n(pokazanie podstaw obsługi: skan, druk, wymiana tuszu/tonera)',
      price: '30 / 50 / 70',
      duration: 'od ręki',
    },
    {
      service:
        'Wsparcie zdalne – konfiguracja / sterowniki / diagnostyka\n(pomoc bez wizyty serwisanta)',
      price: '120\n/ godzinę',
      duration: '1-2 dni',
    },
  ]
}

const applyInkjetAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory =
    serviceSection?.subcategories?.find(sub => sub.title === 'Usługi dodatkowe')

  if (!additionalSubcategory) return

  additionalSubcategory.title = 'Dodatkowe usługi'
  additionalSubcategory.items = [
    {
      service: 'Czyszczenie wnętrza po rozlaniu tuszu\npodstawowe czyszczenie',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie po „silnym zalaniu tuszem”\npełna dekontaminacja i demontaż wszystkich podzespołów drukarki',
      price: '200 / 280 / 360',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana wadliwego kartridża z tuszem lub po jego wyczerpaniu\nczyszczenie gniazda kartridża / pojemnika z tuszem',
      price: '20 / 40 / 60 + koszt tuszu',
      duration: '1 dzień',
    },
    {
      service:
        'Wymiana pojemnika / modułu na zużyty tusz (tzw. waste ink, „pampers”)',
      price: '60 / 90 / 120 + część',
      duration: '1 dzień',
    },
    {
      service: 'Ocena stanu urządzenia przed zakupem (ekspertyza)',
      price: '40 / 60 / 80',
      duration: '1 dzień',
    },
    {
      service: 'Drukarka zastępcza (na czas naprawy)',
      price: 'Link',
      duration: '1 dzień',
      link: '/uslugi/drukarka-zastepcza',
    },
  ]
}

const removeUnwantedSubcategoriesForInkjet = (sections: PricingSection[]) => {
  const repairsSection = sections.find(section => section.id === 'naprawy')
  if (!repairsSection?.subcategories) return

  repairsSection.subcategories = repairsSection.subcategories.filter(
    sub => sub.id !== 'naprawy-tasma'
  )
}

export const createInkjetPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items[3]
  if (diagnosisItem) {
    diagnosisItem.price = '50 / 70 / 90'
  }


  applyInkjetPaperFeedSubcategory(sections)
  applyInkjetCarriageSubcategory(sections)
  applyInkjetHeadSubcategory(sections)
  applyInkjetElectronicsSubcategory(sections)
  applyInkjetScannerSubcategory(sections)
  applyInkjetSoftwareSubcategory(sections)
  applyInkjetAdditionalSubcategory(sections)
  removeUnwantedSubcategoriesForInkjet(sections)
  return sections
}
