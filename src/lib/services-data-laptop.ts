import type { PricingSection } from './services-data-types'
import { createPricingSections, getRecoveryItems } from './services-data-shared'

export const createLaptopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  if (diagnosisSection) {
    diagnosisSection.items = [
      {
        service: 'Wstępna konsultacja online do 15 min (opis problemu przez WhatsApp, formularz lub telefon)',
      },
      {
        service: 'Wstępne sprawdzenie przy przyjęciu sprzętu (krótkie sprawdzenie objawów i wstępna ocena; nie zastępuje pełnej diagnozy)',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(bezpłatna w przypadku realizacji naprawy)',
      },
      {
        service: 'Pełna diagnoza i wycena naprawy\n(tylko w przypadku rezygnacji po wykonaniu pełnej diagnozy)',
      },
      {
        service: 'Pisemna opinia techniczna\n(dodatkowo do pełnej diagnozy, z dokumentacją fotograficzną)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty)',
      },
    ]
  }

  const dojazdSection = sections.find(section => section.id === 'dojazd')
  if (dojazdSection) {
    dojazdSection.items = [
      {
        service: 'Odbiór urządzenia od Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
      },
      {
        service: 'Dostarczenie naprawionego urządzenia do Klienta (do 2,5 km od serwisu; 5 km łącznie w obie strony)',
      },
      {
        service: 'Odbiór lub dostawa powyżej 2,5 km od serwisu (trasa w obie strony; dopłata po przekroczeniu 5 km)',
      },
      {
        service: 'Pilna realizacja (jeśli to możliwe, realizujemy odbiór lub dostawę w pierwszej kolejności)',
      },
    ]
  }
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (cleaningSection) {
    cleaningSection.items = [
      {
        service:
          'Laptop — standardowy\n\nZakres usługi obejmuje:\n• demontaż obudowy i układu chłodzenia;\n• dokładne czyszczenie wnętrza, wentylatorów, radiatorów i kanałów wentylacyjnych;\n• wymiana pasty termoprzewodzącej na CPU oraz GPU, jeśli występuje;\n• kontrola stanu i, w razie potrzeby, wymiana lub dopasowanie termopadów;\n• sprawdzenie działania wentylatorów oraz widocznych uszkodzeń;\n• zewnętrzne czyszczenie obudowy i klawiatury;\n• ponowny montaż oraz test temperatur i stabilności pracy.',
      },
      {
        service:
          'Laptop — gamingowy\n\nZakres usługi obejmuje:\n• wszystkie czynności wykonywane w ramach konserwacji laptopa standardowego;\n• demontaż i dokładne czyszczenie rozbudowanego układu chłodzenia CPU/GPU;\n• czyszczenie dodatkowych wentylatorów, radiatorów i kanałów wentylacyjnych;\n• kontrola oraz, w razie potrzeby, wymiana lub dopasowanie termopadów pamięci VRAM, sekcji zasilania VRM i pozostałych chłodzonych elementów;\n• rozszerzony test obciążeniowy CPU/GPU oraz kontrola temperatur po rozgrzaniu urządzenia.',
      },
      {
        service:
          'SPECJALNE (po zalaniu laptopa)\n\nZakres usługi obejmuje:\n• demontaż laptopa i odłączenie baterii;\n• identyfikacja zalanych obszarów i śladów korozji;\n• dokładne czyszczenie płyty głównej oraz zalanych podzespołów;\n• usunięcie pozostałości cieczy i ognisk korozji;\n• czyszczenie wnętrza, klawiatury i portów;\n• osuszenie urządzenia;\n• diagnostyka elektroniczna i test podstawowych funkcji;\n• ponowny montaż i test działania.\n\nUwaga!!! Prosimy o wyłączenie laptopa i wyciągnięcie baterii natychmiast po zalaniu.',
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
      },
      {
        service: 'Instalacja systemu z zachowaniem danych',
      },
      {
        service: 'Instalacja systemu operacyjnego MAC OS X',
      },
      {
        service:
          'Instalacja i konfiguracja oprogramowania (pakietów biurowych/multimedialnych) / sterowników',
      },
      {
        service:
          'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
      },
      {
        service:
          'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty, zdjęcia, filmy i inne pliki)',
      },
      {
        service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
      },
      {
        service: 'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
      },
      {
        service:
          'Odwirusownie (usunięcie wirusów, trojanów, spyware, malware, adware, ransomware i innych złośliwych programów)',
      },
      {
        service:
          'Usunięcie haseł systemowych, zabezpieczających system operacyjny, dysk lub BIOS (jeśli legalne i możliwe)',
      },
      {
        service: 'Odzyskiwanie haseł użytkownika (jeśli legalne)',
      },
      {
        service: 'Upgrade (aktualizacja) BIOS-u (bez uszkodzenia kości i wylutowania)',
      },
      {
        service: 'Reset / naprawa / rekonstrukcja UEFI/BIOS ustawień',
      },
      {
        service: 'Reset/odzyskiwanie BIOS/UEFI (po błędnym flashu / update)',
      },
      {
        service: 'Programowanie BIOS (odczyt / rewrite / flash z pliku)',
      },
      {
        service: 'Programowanie BIOSu po wylutowaniu w programatorze',
      },
      {
        service: 'Indywidualna konfiguracja/naprawa systemu Windows',
      },
      {
        service: 'Zdalna pomoc informatyka',
      },
    ]
  }
  const boardSubcategory = serviceSection?.subcategories?.[1]
  if (boardSubcategory) {
    boardSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
    boardSubcategory.items = [
      {
        service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
      },
      {
        service: 'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
      },
      {
        service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
      },
      {
        service:
          'Wymiana lub przelutowanie uszkodzonego gniazda zasilającego (częste wkładanie/wyciąganie wtyczki zasilacza bądź spowodowane upadkiem laptopa)',
      },
      {
        service: 'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
      },
      {
        service: 'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
      },
      {
        service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
      },
      {
        service: 'Wymiana przewodu (zewnętrzny kabel) / gniazda zasilacza',
      },
      {
        service: 'Wymiana / rozbudowa pamięci RAM + test stabilności',
      },
      {
        service: 'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
      },
      {
        service: 'Wymiana karty Wi-Fi (M.2 / miniPCIe) + konfiguracja',
      },
      {
        service: 'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
      },
      {
        service: 'Wymiana napędu / nagrywarki',
      },
    ]
  }
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (coolingSubcategory) {
    coolingSubcategory.title = 'Układ chłodzenia i czystość'
    coolingSubcategory.items = [
      {
        service: 'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
      },
      {
        service: 'Wymiana wentylatora chłodzenia (montaż nowego)',
      },
      {
        service: 'Wymiana radiatora',
      },
      {
        service: 'Czyszczenie układu chłodzenia w laptopach gamingowych (2-3 wentylatory)',
      },
    ]
  }
  const disksSubcategory = serviceSection?.subcategories?.[3]
  if (disksSubcategory) {
    disksSubcategory.title = 'Dyski i dane'
    disksSubcategory.items = [
      {
        service: 'Diagnoza dysku + SMART / test powierzchni',
      },
      {
        service: 'Kopia zapasowa danych',
      },
      {
        service: 'Migracja danych / klonowanie dysku (stary dysk -> nowy dysk)',
      },
      {
        service: 'Wymiana dysku HDD -> SSD + migracja danych',
      },
      {
        service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
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
      },
      {
        service: 'Wymiana taśmy sygnałowej matrycy (brak podświetlenia matrycy)',
      },
      {
        service: 'Wymiana ramki ekranu (front bezel)',
      },
      {
        service: 'Wymiana zawiasów',
      },
      {
        service: 'Naprawa pękniętych mocowań zawiasów, obudowy (wzmocnienie / klejenie)',
      },
      {
        service: 'Wymiana obudowy – klapy ekranu (pokrywa matrycy) lub obudowy dolnej',
      },
      {
        service: 'Wymiana kamery internetowej / mikrofonu / audio',
      },
      {
        service: 'Wymiana lub uzupełnienie pojedynczych elementów obudowy (śruby, mocowania, klipsy)',
      },
      {
        service: 'Wymiana baterii wewnętrznej (integralnej w zamkniętej obudowie)',
      },
      {
        service: 'Naprawa lub wymiana przycisku zasilania',
      },
      {
        service: 'Przełożenie podzespołów do nowej obudowy',
      },
    ]
  }
  const keyboardSubcategory = serviceSection?.subcategories?.[6]
  if (keyboardSubcategory) {
    keyboardSubcategory.title = 'Klawiatura / touchpad'
    keyboardSubcategory.items = [
      {
        service: 'Czyszczenie klawiatury + dezynfekcja (bez rozkręcania / rozbierania)',
      },
      {
        service: 'Czyszczenie klawiatury przykręcanej po zalaniu',
      },
      {
        service: 'Czyszczenie klawiatury zintegrowanej z obudową po zalaniu',
      },
      {
        service: 'Czyszczenie lub wymiana pojedynczego klawisza (keycap / stabilizator, jeśli możliwe)',
      },
      {
        service: 'Naprawa lub wymiana klawiatury przykręcanej',
      },
      {
        service: 'Naprawa lub wymiana klawiatury zintegrowanej z obudową (lutowanej lub klejonej)',
      },
      {
        service: 'Wymiana klawiatury podświetlanej (RGB / LED)',
      },
      {
        service: 'Naprawa lub wymiana touchpada (trackpad)',
      },
    ]
  }
  return sections
}
