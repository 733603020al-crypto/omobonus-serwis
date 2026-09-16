import type { PricingSection } from './services-data-types'
import { createPricingSections, getRecoveryItems } from './services-data-shared'

export const createLaptopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  if (diagnosisSection) {
    diagnosisSection.items = [
      {
        service: 'Wstępna konsultacja online do 15 min (opis problemu przez WhatsApp, formularz lub telefon)',
        duration: 'do 15 min',
      },
      {
        service: 'Wstępne sprawdzenie przy przyjęciu sprzętu (krótkie sprawdzenie objawów i wstępna ocena; nie zastępuje pełnej diagnozy)',
        duration: 'do 15 min',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(bezpłatna w przypadku realizacji naprawy)',
        duration: '1-2 dni',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(tylko w przypadku rezygnacji po wykonaniu pełnej diagnozy)',
        duration: '1-2 dni',
      },
      {
        service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)',
        duration: '1-2 dni',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)',
        duration: 'do ustalenia',
      },
    ]
  }

  const dojazdSection = sections.find(section => section.id === 'dojazd')
  if (dojazdSection) {
    dojazdSection.items = [
      {
        service: 'Odbiór urządzenia od Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
        duration: '1-2 dni',
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
        duration: '1-2 dni',
      },
      {
        service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (trasa w obie strony; dopłata po przekroczeniu 5 km)',
        duration: '1-2 dni',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)',
        duration: 'do ustalenia',
      },
    ]
  }
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (cleaningSection) {
    cleaningSection.items = [
      {
        service:
          'Laptop — standardowy\n\nZakres usługi obejmuje:\n• demontaż obudowy i układu chłodzenia;\n• dokładne czyszczenie wnętrza, wentylatorów, radiatorów i kanałów wentylacyjnych;\n• wymiana pasty termoprzewodzącej na CPU oraz GPU, jeśli występuje;\n• kontrola stanu i, w razie potrzeby, wymiana lub dopasowanie termopadów;\n• sprawdzenie działania wentylatorów oraz widocznych uszkodzeń;\n• zewnętrzne czyszczenie obudowy i klawiatury;\n• ponowny montaż oraz test temperatur i stabilności pracy.',
        duration: '1-2 dni',
      },
      {
        service:
          'Laptop — gamingowy\n\nZakres usługi obejmuje:\n• wszystkie czynności wykonywane w ramach konserwacji laptopa standardowego;\n• demontaż i dokładne czyszczenie rozbudowanego układu chłodzenia CPU/GPU;\n• czyszczenie dodatkowych wentylatorów, radiatorów i kanałów wentylacyjnych;\n• kontrola oraz, w razie potrzeby, wymiana lub dopasowanie termopadów pamięci VRAM, sekcji zasilania VRM i pozostałych chłodzonych elementów;\n• rozszerzony test obciążeniowy CPU/GPU oraz kontrola temperatur po rozgrzaniu urządzenia.',
        duration: '1-2 dni',
      },
      {
        service:
          'SPECJALNE (po zalaniu laptopa)\n\nZakres usługi obejmuje:\n• demontaż laptopa i odłączenie baterii;\n• identyfikacja zalanych obszarów i śladów korozji;\n• dokładne czyszczenie płyty głównej oraz zalanych podzespołów;\n• usunięcie pozostałości cieczy i ognisk korozji;\n• czyszczenie wnętrza, klawiatury i portów;\n• osuszenie urządzenia;\n• diagnostyka elektroniczna i test podstawowych funkcji;\n• ponowny montaż i test działania.\n\nUwaga!!! Prosimy o wyłączenie laptopa i wyciągnięcie baterii natychmiast po zalaniu.',
        duration: '1-3 dni',
      },
    ]
  }
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[0]
  if (softwareSubcategory) {
    softwareSubcategory.title = 'Oprogramowanie'
    softwareSubcategory.items = [
      {
        service:
          'Instalacja systemu Windows/Linux z aktualizacjami i sterownikami (bez zachowania danych) (system Windows instalujemy z licencją klienta. W razie jej braku pomagamy w zakupie odpowiedniej licencji)',
        duration: '1-2 dni',
      },
      {
        service: 'Instalacja systemu z zachowaniem danych',
        duration: '1-2 dni',
      },
      {
        service: 'Instalacja systemu operacyjnego MAC OS X',
        duration: '1-2 dni',
      },
      {
        service:
          'Instalacja i konfiguracja oprogramowania (pakietów biurowych/multimedialnych) / sterowników',
        duration: '1-2 dni',
      },
      {
        service:
          'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
        duration: '1-2 dni',
      },
      {
        service:
          'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty, zdjęcia, filmy i inne pliki)',
        duration: '1-3 dni',
      },
      {
        service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
        duration: '1-2 dni',
      },
      {
        service: 'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
        duration: '1-2 dni',
      },
      {
        service:
          'Odwirusownie (usunięcie wirusów, trojanów, spyware, malware, adware, ransomware i innych złośliwych programów)',
        duration: '1-2 dni',
      },
      {
        service:
          'Usunięcie haseł systemowych, zabezpieczających system operacyjny, dysk lub BIOS (jeśli legalne i możliwe)',
        duration: '1-2 dni',
      },
      {
        service: 'Odzyskiwanie haseł użytkownika (jeśli legalne)',
        duration: '1-2 dni',
      },
      {
        service: 'Upgrade (aktualizacja) BIOS-u (bez uszkodzenia kości i wylutowania)',
        duration: '1-2 dni',
      },
      {
        service: 'Reset / naprawa / rekonstrukcja UEFI/BIOS ustawień',
        duration: '1-2 dni',
      },
      {
        service: 'Reset/odzyskiwanie BIOS/UEFI (po błędnym flashu / update)',
        duration: '1-2 dni',
      },
      {
        service: 'Programowanie BIOS (odczyt / rewrite / flash z pliku)',
        duration: '1-2 dni',
      },
      {
        service: 'Programowanie BIOSu po wylutowaniu w programatorze',
        duration: '1-2 dni',
      },
      {
        service: 'Indywidualna konfiguracja/naprawa systemu Windows',
        duration: '-',
      },
      {
        service: 'Zdalna pomoc informatyka',
        duration: '-',
      },
    ]
  }
  const boardSubcategory = serviceSection?.subcategories?.[1]
  if (boardSubcategory) {
    boardSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
    boardSubcategory.items = [
      {
        service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
        duration: '2-7 dni',
      },
      {
        service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
        duration: '2-5 dni',
      },
      {
        service:
          'Wymiana lub przelutowanie uszkodzonego gniazda zasilającego (częste wkładanie/wyciąganie wtyczki zasilacza bądź spowodowane upadkiem laptopa)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
        duration: '2-7 dni',
      },
      {
        service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
        duration: '3-7 dni',
      },
      {
        service: 'Wymiana przewodu (zewnętrzny kabel) / gniazda zasilacza',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana / rozbudowa pamięci RAM + test stabilności',
        duration: '1-2 dni',
      },
      {
        service: 'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana karty Wi-Fi (M.2 / miniPCIe) + konfiguracja',
        duration: '1-2 dni',
      },
      {
        service: 'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
        duration: '1-2 dni',
      },
      {
        service: 'Wymiana napędu / nagrywarki',
        duration: '1-3 dni',
      },
    ]
  }
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (coolingSubcategory) {
    coolingSubcategory.title = 'Układ chłodzenia i czystość'
    coolingSubcategory.items = [
      {
        service: 'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
        duration: '1 dzień',
      },
      {
        service: 'Wymiana wentylatora chłodzenia (montaż nowego)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana radiatora',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie układu chłodzenia w laptopach gamingowych (2-3 wentylatory)',
        duration: '1-3 dni',
      },
    ]
  }
  const disksSubcategory = serviceSection?.subcategories?.[3]
  if (disksSubcategory) {
    disksSubcategory.title = 'Dyski i dane'
    disksSubcategory.items = [
      {
        service: 'Diagnoza dysku + SMART / test powierzchni',
        duration: '1-2 dni',
      },
      {
        service: 'Kopia zapasowa danych',
        duration: '1-2 dni',
      },
      {
        service: 'Migracja danych / klonowanie dysku (stary dysk -> nowy dysk)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana dysku HDD -> SSD + migracja danych',
        duration: '1-3 dni',
      },
      {
        service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
        duration: '1-2 dni',
      },
    ]
  }
  const recoverySubcategory = serviceSection?.subcategories?.[4]
  if (recoverySubcategory) {
    recoverySubcategory.title = 'Odzyskanie / usuwanie danych'
    recoverySubcategory.items = getRecoveryItems().map(item => ({
      ...item,
    }))
  }
  const screenSubcategory = serviceSection?.subcategories?.[5]
  if (screenSubcategory) {
    screenSubcategory.title = 'Ekran i obudowa'
    screenSubcategory.items = [
      {
        service: 'Wymiana uszkodzonej matrycy LCD/LED (standard, bez klejenia)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana taśmy sygnałowej matrycy (brak podświetlenia matrycy)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana ramki ekranu (front bezel)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana zawiasów',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa pękniętych mocowań zawiasów, obudowy (wzmocnienie / klejenie)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana obudowy – klapy ekranu (pokrywa matrycy) lub obudowy dolnej',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana kamery internetowej / mikrofonu / audio',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana lub uzupełnienie pojedynczych elementów obudowy (śruby, mocowania, klipsy)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana baterii wewnętrznej (integralnej w zamkniętej obudowie)',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana przycisku zasilania',
        duration: '1-3 dni',
      },
      {
        service: 'Przełożenie podzespołów do nowej obudowy',
        duration: '1-3 dni',
      },
    ]
  }
  const keyboardSubcategory = serviceSection?.subcategories?.[6]
  if (keyboardSubcategory) {
    keyboardSubcategory.title = 'Klawiatura / touchpad'
    keyboardSubcategory.items = [
      {
        service: 'Czyszczenie klawiatury + dezynfekcja (bez rozkręcania / rozbierania)',
        duration: 'od ręki',
      },
      {
        service: 'Czyszczenie klawiatury przykręcanej po zalaniu',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie klawiatury zintegrowanej z obudową po zalaniu',
        duration: '1-3 dni',
      },
      {
        service: 'Czyszczenie lub wymiana pojedynczego klawisza (keycap / stabilizator, jeśli możliwe)',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana klawiatury przykręcanej',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana klawiatury zintegrowanej z obudową (lutowanej lub klejonej)',
        duration: '1-3 dni',
      },
      {
        service: 'Wymiana klawiatury podświetlanej (RGB / LED)',
        duration: '1-3 dni',
      },
      {
        service: 'Naprawa lub wymiana touchpada (trackpad)',
        duration: '1-3 dni',
      },
    ]
  }
  return sections
}
