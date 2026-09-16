import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyLaserCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wnętrza urządzenia (kurz, resztki tonera),\n• kontrola i czyszczenie rolek poboru papieru (pickup roller) / separatora,\n• kontrola głównych elementów mechanicznych,\n• szybki przegląd sekcji obrazu i utrwalania (drum / transfer / fuser),\n• test jakości wydruku.',
      duration: '1-3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie czujników papieru,\n• czyszczenie elementów prowadzenia papieru,\n• smarowanie głównych elementów mechanicznych,\n• sprawdzenie modułu bębna i pasa transferowego.',
      duration: '1-3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• czyszczenie optyki lasera,\n• konserwacja modułu bębna, pasa transferowego i fusera,\n• reset liczników serwisowych (jeśli możliwe),\n• kontrola tonera i pojemnika na zużyty toner (ew. czyszczenie / wymiana),\n• kalibracja kolorów i rejestracji.',
      duration: '1-3 dni',
    },
  ]
}

const applyLaserPaperFeedSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const paperSubcategory = serviceSection?.subcategories?.[0]
  if (!paperSubcategory) return
  paperSubcategory.title =
    'Mechanizm poboru papieru, rolki, separatory, …'
  paperSubcategory.items = [
    {
      service:
        'Usuwanie zaciętego papieru / ciał obcych z toru papieru\n(spinacze, resztki papieru, kurz, ... - typowa przyczyna powtarzających się zacięć)',
      duration: 'od ręki',
    },
    {
      service:
        'Czyszczenie lub wymiana rolki pobierającej i separatora\n(usuwa zacięcia, „pobieranie kilku kartek naraz”, ślizganie papieru)',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana prowadnic, rolek lub klap rejestracji papieru.\nRównież w module duplex, eliminuje przechylone wydruki i „krzywe prowadzenie”',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana czujników papieru (optycznych i mechanicznych)\n(usuwa błędy typu „brak papieru”, zatrzymania papieru, fałszywe komunikaty)',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana sprzęgła poboru / solenoidu\n(typowa usterka HP/Brother – papier wchodzi za wcześnie lub wcale nie wchodzi)',
      duration: '1-3 dni',
    },
  ]
}

const applyLaserOpticsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const opticsSubcategory =
    serviceSection?.subcategories?.find(sub => sub.id === 'naprawy-glowica') ||
    serviceSection?.subcategories?.find(
      sub => sub.title === 'Głowica drukująca i układ tuszu'
    )

  if (!opticsSubcategory) return

  opticsSubcategory.title = 'Optyka i laser'
  opticsSubcategory.items = [
    {
      service:
        'Czyszczenie modułu lasera / lusterek skanera\n(usuwa blade wydruki, pasy, brak czerni – przywraca właściwy kontrast)',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana modułu lasera (DC Controller / LSU)\n(rozwiązuje całkowity brak wydruku lub komunikat „błąd lasera”)',
      duration: '1–3 dni',
    },
    {
      service:
        'Usunięcie komunikatu „Błąd lasera / błąd LSU / błąd skanera optycznego”\n(diagnostyka + kalibracja + czyszczenie)',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana taśmy / przewodów sterujących modułem optycznym\n(usuwa zaniki wydruku spowodowane przerwą lub niestabilnym sygnałem)',
      duration: '1–3 dni',
    },
  ]
}

const applyLaserScannerSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const scannerSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Skaner / ADF'
  )
  if (!scannerSubcategory) return
  scannerSubcategory.title = 'Skaner / ADF (dla MFP)'
  scannerSubcategory.items = [
    {
      service:
        'Czyszczenie optyki skanera (lustra, soczewki, lampa LED/CCD).\nUsuwanie pasów i smug spowodowanych zabrudzeniem optyki',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa mechanizmu skanera (optyka, napęd, prowadnice)',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana silnika napędu skanera',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana taśmy transmisyjnej CCD / przewodu sygnałowego skanera',
      duration: '2-5 dni',
    },
    {
      service: 'Wymiana szkła skanera (głównego)',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana rolek ADF i separatorów\n(zapobiega pobieraniu wielu kartek naraz)',
      duration: '2-5 dni',
    },
    {
      service:
        'Czyszczenie szyby skanera i szyby „pod ADF”\n(usuwa smugi i linie przy skanowaniu)',
      duration: '-',
    },
    {
      service:
        'Wymiana wąskiej szyby pod ADF\n(tzw. „szyba skanowania z podajnika”)',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa silnika ADF / sprzęgła pobierania',
      duration: '1-4 dni',
    },
  ]
}

const applyLaserImagingSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const imagingSubcategory = serviceSection?.subcategories?.[1]
  if (!imagingSubcategory) return
  imagingSubcategory.title =
    'Moduły obrazu i utrwalania (bęben, pas transferowy, fuser, ...)'
  imagingSubcategory.items = [
    {
      service:
        'Wymiana bębna obrazującego i listwy czyszczącej bębna (cleaning blade)\n(drum / image unit). Reset licznika. Kalibracja kolorów / rejestracji po wymianie modułów\n(eliminuje pasy i zabrudzenia powtarzalne na kartce)',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana pasa transferowego lub rolki transferowej.\nKalibracja kolorów / rejestracji po wymianie modułów\n(usuwa kolorowe smugi, przesunięcia kolorów i brudzenie papieru)',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie pasa transferowego i rolek prowadzących\n(zapobiega przenoszeniu tonera i powtarzalnym zabrudzeniom)',
      duration: '1-2 dni',
    },
    {
      service:
        'Wymiana listwy czyszczącej pasa transferowego.\nKalibracja kolorów / rejestracji po wymianie modułów',
      duration: '1-3 dni',
    },
    {
      service:
        'Regeneracja / serwis zespołu utrwalającego (fuser)\n(czyszczenie, wymiana folii / wałka dociskowego, elementu grzejnego, termistora, bezpiecznika fusera, kół zębatych, łożysk, tulei, smarowanie, testy - usuwa rozmazywanie tonera i zaginanie papieru)',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana w całości zespołu utrwalającego (fuser)',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników modułów obrazu (usuwa komunikaty „wymień bęben / fuser / pas” po wymianie)',
      duration: '1-2 dni',
    },
  ]
}

const applyLaserElectronicsSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  if (serviceSection?.subcategories) {
    serviceSection.subcategories = serviceSection.subcategories.filter(
      sub => sub.id !== 'naprawy-tasma'
    )
  }
  const electronicsSubcategory = serviceSection?.subcategories?.find(
    sub => sub.id === 'naprawy-elektronika'
  )
  if (!electronicsSubcategory) return
  electronicsSubcategory.title = 'Naprawy elektroniczne'
  electronicsSubcategory.items = [
    {
      service:
        'Naprawa lub wymiana złączki lub gniazda LAN/USB uszkodzone / poluzowane\n(usuwa brak wykrywania drukarki przez komputer / LAN)',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa lub wymiana zasilacza (PSU / płytka zasilająca)\n(po awarii po przepięciu / skoku napięcia)',
      duration: '1-5 dni',
    },
    {
      service:
        'Diagnostyka płyty głównej / elektroniki sterującej\n(ustala źródło błędów, zwarć, braku komunikacji)',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana płyty głównej (formatera) / interfejsów I/O / HVPS\n(błędy firmware, usuwa problemy z uruchamianiem drukarki, samoczynnym wyłączaniem)',
      duration: '1-5 dni',
    },
    {
      service:
        'Odbudowa ścieżek / lutów po zalaniu lub przepięciu\n(przywraca ciągłość sygnałów płyty głównej)',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana modułu HV (wysokiego napięcia)\ndla sekcji obrazu / transferu',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana wentylatora / modułu chłodzenia\n(hałas, przegrzewanie, zabrudzenie)',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana taśm sygnałowych / kabli wewnętrznych',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana uszkodzonego panelu sterowania\n(przyciski, taśmy, sensory), panelu dotykowego / ekranu LCD)',
      duration: '2-5 dni',
    },
  ]
}

const applyLaserSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Oprogramowanie i konfiguracja'
  )
  if (!softwareSubcategory) return
  softwareSubcategory.items = [
    {
      service:
        'Instalacja sterowników i konfiguracja w sieci (router / Wi-Fi / LAN /) (zdalnie lub lokalnie)',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja aplikacji mobilnych (AirPrint / Mopria / aplikacje producenta) (drukowanie ze smartfona bez kabli)',
      duration: '1 dzień',
    },
    {
      service:
        'Aktualizacja firmware / reset systemu drukarki (usuwa błędy i komunikaty serwisowe)',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników serwisowych bez ingerencji w moduły (odblokowanie funkcji po komunikacie o konserwacji)',
      duration: '1 dzień',
    },
    {
      service:
        'Przywrócenie ustawień fabrycznych i ponowna konfiguracja (rozwiązuje problemy po błędnych zmianach ustawień)',
      duration: '1 dzień',
    },
    {
      service:
        'Usunięcie komunikatów błędów systemowych (diagnostyka + reset) (drukarka wraca do pracy bez błędów)',
      duration: '1-2 dni',
    },
    {
      service:
        'Usuwanie konfliktów sterowników (przywraca poprawną komunikację drukarka ↔ komputer)',
      duration: '1 dzień',
    },
    {
      service:
        'Konfiguracja skanowania do komputera (SMB/FTP) (skany trafiają bezpośrednio do folderu użytkownika)',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja skanowania do e-mail (SMTP, TLS, porty, uwierzytelnienie) / do chmury (Google Drive / OneDrive / SharePoint) (skanowanie jednym przyciskiem)',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja panelu webowego drukarki (IP, DHCP, DNS, zabezpieczenia) (ustawienia sieciowe pod kontrolą)',
      duration: '1 dzień',
    },
    {
      service:
        'Migracja drukarki na nowy komputer / serwer (przeniesienie profili, skrótów, udziałów)',
      duration: '1 dzień',
    },
    {
      service:
        'Zabezpieczenie dostępu (PIN / hasło administratora) (chroni urządzenie przed nieautoryzowanym użyciem)',
      duration: '1 dzień',
    },
    {
      service:
        'Szkolenie użytkownika (5-15 min) (pokazanie podstaw obsługi: skan, druk, wymiana tuszu/tonera)',
      duration: 'od ręki',
    },
    {
      service:
        'Wsparcie zdalne - konfiguracja / sterowniki / diagnostyka (pomoc bez wizyty serwisanta)',
      duration: '1-2 dni',
    },
  ]
}

const applyLaserAdditionalSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const additionalSubcategory = serviceSection?.subcategories?.find(
    subcategory => subcategory.title === 'Usługi dodatkowe'
  )
  if (!additionalSubcategory) return
  additionalSubcategory.title = 'Dodatkowe usługi'
  additionalSubcategory.items = [
    {
      service:
        'Odkurzanie wnętrza po rozsypaniu tonera (podstawowe czyszczenie)',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie po „silnym zalaniu tonerem”\n(pełna dekontaminacja i demontaż wszystkich podzespołów drukarki)',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana wadliwego toneru lub po wyczerpaniu proszku.\nCzyszczenie gniazda tonera',
      duration: '1 dzień',
    },
    {
      service: 'Wymiana pojemnika na zużyty toner (waste toner)',
      duration: '1 dzień',
    },
    {
      service: 'Ocena stanu urządzenia przed zakupem (ekspertyza)',
      duration: '1 dzień',
    },
    {
      service: 'Drukarka zastępcza (na czas naprawy)',
      duration: '1 dzień',
      link: '/uslugi/drukarka-zastepcza',
    },
    {
      service:
        'NOWOŚĆ – Odnowienie obudowy (wybielenie pożółkłego plastiku)\nUsługa estetyczna polegająca na przywróceniu pierwotnego koloru obudowy drukarki poprzez wybielenie plastiku, który zżółkł pod wpływem światła i promieniowania UV. Obejmuje demontaż, wybielenie UV, czyszczenie oraz ponowny montaż obudowy.\nUwagi: efekt zależy od rodzaju tworzywa i stopnia zżółknięcia; w przypadku silnych przebarwień możliwa dopłata +20–40 zł.',
      duration: '1-5 dni',
    },
  ]
}

export const createLaserPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyLaserCleaningSection(sections)
  applyLaserPaperFeedSubcategory(sections)
  applyLaserOpticsSubcategory(sections)
  applyLaserImagingSubcategory(sections)
  applyLaserElectronicsSubcategory(sections)
  applyLaserSoftwareSubcategory(sections)
  applyLaserScannerSubcategory(sections)
  applyLaserAdditionalSubcategory(sections)
  return sections
}
