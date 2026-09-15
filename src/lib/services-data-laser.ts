import type { PricingSection } from './services-data-types'
import { createPricingSections } from './services-data-shared'

const applyLaserCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• czyszczenie wnętrza urządzenia (kurz, resztki tonera),\n• kontrola i czyszczenie rolek poboru papieru (pickup roller) / separatora,\n• kontrola głównych elementów mechanicznych,\n• szybki przegląd sekcji obrazu i utrwalania (drum / transfer / fuser),\n• test jakości wydruku.',
      price: '50 / 100 / 150',
      duration: '1-3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• czyszczenie czujników papieru,\n• czyszczenie elementów prowadzenia papieru,\n• smarowanie głównych elementów mechanicznych,\n• sprawdzenie modułu bębna i pasa transferowego.',
      price: '100 / 150 / 200',
      duration: '1-3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• czyszczenie optyki lasera,\n• konserwacja modułu bębna, pasa transferowego i fusera,\n• reset liczników serwisowych (jeśli możliwe),\n• kontrola tonera i pojemnika na zużyty toner (ew. czyszczenie / wymiana),\n• kalibracja kolorów i rejestracji.',
      price: '150 / 200 / 250',
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
      price: '40 / 70 / 100',
      duration: 'od ręki',
    },
    {
      service:
        'Czyszczenie lub wymiana rolki pobierającej i separatora\n(usuwa zacięcia, „pobieranie kilku kartek naraz”, ślizganie papieru)',
      price: '80 / 120 / 160 + części',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana prowadnic, rolek lub klap rejestracji papieru.\nRównież w module duplex, eliminuje przechylone wydruki i „krzywe prowadzenie”',
      price: '90 / 140 / 180 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie lub wymiana czujników papieru (optycznych i mechanicznych)\n(usuwa błędy typu „brak papieru”, zatrzymania papieru, fałszywe komunikaty)',
      price: '80 / 130 / 170 + części',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana sprzęgła poboru / solenoidu\n(typowa usterka HP/Brother – papier wchodzi za wcześnie lub wcale nie wchodzi)',
      price: '100 / 150 / 200 + części',
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
      price: '120 / 180 / 240',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana modułu lasera (DC Controller / LSU)\n(rozwiązuje całkowity brak wydruku lub komunikat „błąd lasera”)',
      price: '220 / 320 / 450 + części',
      duration: '1–3 dni',
    },
    {
      service:
        'Usunięcie komunikatu „Błąd lasera / błąd LSU / błąd skanera optycznego”\n(diagnostyka + kalibracja + czyszczenie)',
      price: '120 / 180 / 240',
      duration: '1–3 dni',
    },
    {
      service:
        'Wymiana taśmy / przewodów sterujących modułem optycznym\n(usuwa zaniki wydruku spowodowane przerwą lub niestabilnym sygnałem)',
      price: '80 / 130 / 180 + części',
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
      price: '120 / 160 / 250',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa mechanizmu skanera (optyka, napęd, prowadnice)',
      price: '130 / 180 / 230\n+ części',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana silnika napędu skanera',
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
      price: '120 / 170 / 240 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana pasa transferowego lub rolki transferowej.\nKalibracja kolorów / rejestracji po wymianie modułów\n(usuwa kolorowe smugi, przesunięcia kolorów i brudzenie papieru)',
      price: '160 / 240 / 320 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Czyszczenie pasa transferowego i rolek prowadzących\n(zapobiega przenoszeniu tonera i powtarzalnym zabrudzeniom)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Wymiana listwy czyszczącej pasa transferowego.\nKalibracja kolorów / rejestracji po wymianie modułów',
      price: '80 / 120 / 160 + części',
      duration: '1-3 dni',
    },
    {
      service:
        'Regeneracja / serwis zespołu utrwalającego (fuser)\n(czyszczenie, wymiana folii / wałka dociskowego, elementu grzejnego, termistora, bezpiecznika fusera, kół zębatych, łożysk, tulei, smarowanie, testy - usuwa rozmazywanie tonera i zaginanie papieru)',
      price: '150 / 200 / 250 + części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana w całości zespołu utrwalającego (fuser)',
      price: '150 / 220 / 300 + część',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników modułów obrazu (usuwa komunikaty „wymień bęben / fuser / pas” po wymianie)',
      price: '40 / 70 / 100',
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
      price: '90 / 130 / 170\n+ części',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa lub wymiana zasilacza (PSU / płytka zasilająca)\n(po awarii po przepięciu / skoku napięcia)',
      price: '150 / 200 / 250\n+ części',
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
      price: '160 / 220 / 280\n+ części',
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
        'Naprawa lub wymiana modułu HV (wysokiego napięcia)\ndla sekcji obrazu / transferu',
      price: '160 / 260 / 330\n+ część',
      duration: '2-5 dni',
    },
    {
      service:
        'Naprawa lub wymiana wentylatora / modułu chłodzenia\n(hałas, przegrzewanie, zabrudzenie)',
      price: '90 / 130 / 170\n+ części',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana taśm sygnałowych / kabli wewnętrznych',
      price: '70 / 110 / 150\n+ część',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa lub wymiana uszkodzonego panelu sterowania\n(przyciski, taśmy, sensory), panelu dotykowego / ekranu LCD)',
      price: '140 / 200 / 260\n+ część',
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
      price: '50 / 100 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Instalacja aplikacji mobilnych (AirPrint / Mopria / aplikacje producenta) (drukowanie ze smartfona bez kabli)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Aktualizacja firmware / reset systemu drukarki (usuwa błędy i komunikaty serwisowe)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Reset liczników serwisowych bez ingerencji w moduły (odblokowanie funkcji po komunikacie o konserwacji)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Przywrócenie ustawień fabrycznych i ponowna konfiguracja (rozwiązuje problemy po błędnych zmianach ustawień)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Usunięcie komunikatów błędów systemowych (diagnostyka + reset) (drukarka wraca do pracy bez błędów)',
      price: '80 / 120 / 160',
      duration: '1-2 dni',
    },
    {
      service:
        'Usuwanie konfliktów sterowników (przywraca poprawną komunikację drukarka ↔ komputer)',
      price: '50 / 80 / 110',
      duration: '1 dzień',
    },
    {
      service:
        'Konfiguracja skanowania do komputera (SMB/FTP) (skany trafiają bezpośrednio do folderu użytkownika)',
      price: '70 / 110 / 150',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja skanowania do e-mail (SMTP, TLS, porty, uwierzytelnienie) / do chmury (Google Drive / OneDrive / SharePoint) (skanowanie jednym przyciskiem)',
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Konfiguracja panelu webowego drukarki (IP, DHCP, DNS, zabezpieczenia) (ustawienia sieciowe pod kontrolą)',
      price: '60 / 100 / 140',
      duration: '1 dzień',
    },
    {
      service:
        'Migracja drukarki na nowy komputer / serwer (przeniesienie profili, skrótów, udziałów)',
      price: '80 / 120 / 160',
      duration: '1 dzień',
    },
    {
      service:
        'Zabezpieczenie dostępu (PIN / hasło administratora) (chroni urządzenie przed nieautoryzowanym użyciem)',
      price: '60 / 90 / 120',
      duration: '1 dzień',
    },
    {
      service:
        'Szkolenie użytkownika (5-15 min) (pokazanie podstaw obsługi: skan, druk, wymiana tuszu/tonera)',
      price: '30 / 50 / 70',
      duration: 'od ręki',
    },
    {
      service:
        'Wsparcie zdalne - konfiguracja / sterowniki / diagnostyka (pomoc bez wizyty serwisanta)',
      price: '120\n/ godzinę',
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
      price: '100 / 150 / 200',
      duration: '1-2 dni',
    },
    {
      service:
        'Czyszczenie po „silnym zalaniu tonerem”\n(pełna dekontaminacja i demontaż wszystkich podzespołów drukarki)',
      price: '200 / 280 / 360',
      duration: '1-3 dni',
    },
    {
      service:
        'Wymiana wadliwego toneru lub po wyczerpaniu proszku.\nCzyszczenie gniazda tonera',
      price: '20 / 40 / 60 + koszt tonera',
      duration: '1 dzień',
    },
    {
      service: 'Wymiana pojemnika na zużyty toner (waste toner)',
      price: '60 / 90 / 120\n+ część',
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
    {
      service:
        'NOWOŚĆ – Odnowienie obudowy (wybielenie pożółkłego plastiku)\nUsługa estetyczna polegająca na przywróceniu pierwotnego koloru obudowy drukarki poprzez wybielenie plastiku, który zżółkł pod wpływem światła i promieniowania UV. Obejmuje demontaż, wybielenie UV, czyszczenie oraz ponowny montaż obudowy.\nUwagi: efekt zależy od rodzaju tworzywa i stopnia zżółknięcia; w przypadku silnych przebarwień możliwa dopłata +20–40 zł.',
      price: '70 / 90 / 120',
      duration: '1-5 dni',
    },
  ]
}

export const createLaserPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Diagnoza i wycena naprawy\n(w przypadku rezygnacji z naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '70 / 100 / 150'
  }


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
