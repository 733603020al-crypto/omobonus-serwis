import type { PricingSection } from './services-data-types'
import { createPricingSections, getRecoveryItems } from './services-data-shared'

const applyDesktopCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PEŁNA KONSERWACJA — KOMPUTER STANDARDOWY\u2028czyszczenie wnętrza i układu chłodzenia, wymiana materiałów termicznych\n• dokładne czyszczenie wnętrza obudowy, filtrów, wentylatorów i radiatorów,\n• czyszczenie układu chłodzenia procesora,\n• wymiana pasty termoprzewodzącej na CPU,\n• kontrola i w razie potrzeby wymiana / dopasowanie termopadów,\n• kontrola wentylatorów i przepływu powietrza,\n• montaż oraz test temperatur i stabilności pracy.',
    },
    {
      service:
        'PEŁNA KONSERWACJA — KOMPUTER GAMINGOWY\u2028rozszerzone czyszczenie CPU/GPU i wymiana materiałów termicznych\n• dokładne czyszczenie wnętrza, filtrów, wentylatorów i radiatorów,\n• demontaż i konserwacja układu chłodzenia CPU,\n• demontaż i konserwacja układu chłodzenia karty graficznej,\n• wymiana pasty termoprzewodzącej na CPU i GPU,\n• kontrola i w razie potrzeby wymiana / dopasowanie termopadów VRAM i VRM,\n• kontrola wentylatorów i przepływu powietrza,\n• rozszerzony test obciążeniowy CPU/GPU oraz kontrola temperatur.',
    },
    {
      service:
        'CZYSZCZENIE PO ZALANIU\u2028demontaż, czyszczenie i diagnostyka urządzenia\n• demontaż komputera i odłączenie zasilania,\n• lokalizacja śladów zalania i korozji,\n• dokładne czyszczenie płyty głównej i zalanych podzespołów,\n• usuwanie pozostałości cieczy i korozji,\n• czyszczenie złączy, portów i pozostałych zalanych elementów,\n• zabezpieczenie oczyszczonych miejsc przed dalszą korozją, jeśli jest to technicznie uzasadnione,\n• diagnostyka elektroniki,\n• montaż i test podstawowych funkcji urządzenia.\n\nUwaga!!! Po zalaniu natychmiast odłącz komputer od zasilania i nie uruchamiaj go ponownie.',
    },
  ]
}

const applyDesktopSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[0]
  if (!softwareSubcategory) return
  softwareSubcategory.title = 'Oprogramowanie'
  softwareSubcategory.id = 'naprawy-oprogramowanie'
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
        'Instalacja i konfiguracja oprogramowania\n(pakietów biurowych/multimedialnych) / sterowników',
    },
    {
      service:
        'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
    },
    {
      service:
        'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty (word, excel, itp), zdjęcia, filmy i inne pliki)',
    },
    {
      service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
    },
    {
      service:
        'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
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
      service: 'Konfiguracja RAID (0/1/5/10)',
    },
    {
      service: 'Indywidualna konfiguracja/naprawa systemu Windows',
    },
    {
      service: 'Zdalna pomoc informatyka',
    },
  ]
}

const applyDesktopHardwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const hardwareSubcategory = serviceSection?.subcategories?.[1]
  if (!hardwareSubcategory) return
  hardwareSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
  hardwareSubcategory.id = 'naprawy-plyta-glowna'
  hardwareSubcategory.items = [
    {
      service: 'Wymiana procesora',
    },
    {
      service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
    },
    {
      service:
        'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
    },
    {
      service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
    },
    {
      service:
        'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
    },
    {
      service:
        'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
    },
    {
      service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
    },
    {
      service:
        'Wymiana części/podzespołów w komputerze stacjonarnym\n(karta grafiki, pamięć RAM, …). Testy diagnostyczne',
    },
    {
      service: 'Wymiana zasilacza',
    },
    {
      service:
        'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
    },
    {
      service:
        'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
    },
    {
      service: 'Wymiana napędu / nagrywarki',
    },
    {
      service: 'Naprawa przycisku POWER / panelu przedniego',
    },
    {
      service: 'Wymiana obudowy (pełna przekładka)',
    },
    {
      service:
        'Montaż komputera stacjonarnego\n(możemy zamontować z części dostarczonych przez Klienta, lub zakupionych przez nas)',
    },
  ]
}

const applyDesktopCoolingSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (!coolingSubcategory) return
  coolingSubcategory.title = 'Układ chłodzenia i czystość'
  coolingSubcategory.id = 'naprawy-chlodzenie'
  coolingSubcategory.items = [
    {
      service:
        'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
    },
    {
      service: 'Wymiana wentylatora chłodzenia (montaż nowego)',
    },
    {
      service: 'Wymiana radiatora',
    },
  ]
}

const applyDesktopStorageSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const storageSubcategory = serviceSection?.subcategories?.[3]
  if (!storageSubcategory) return
  storageSubcategory.title = 'Dyski i dane'
  storageSubcategory.id = 'naprawy-dyski-dane'
  storageSubcategory.items = [
    {
      service: 'Diagnoza dysku + SMART / test powierzchni',
    },
    {
      service: 'Kopia zapasowa danych',
    },
    {
      service:
        'Migracja danych / klonowanie dysku (stary dysk → nowy dysk)',
    },
    {
      service: 'Wymiana dysku HDD → SSD + migracja danych',
    },
    {
      service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
    },
  ]
}

const applyDesktopRecoverySubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const recoverySubcategory = serviceSection?.subcategories?.[4]
  if (!recoverySubcategory) return
  recoverySubcategory.title = 'Odzyskanie / usuwanie danych'
  recoverySubcategory.id = 'naprawy-odzyskiwanie-danych'
  recoverySubcategory.items = getRecoveryItems()
}

const removeDesktopExtraSubcategories = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  if (!serviceSection?.subcategories) return
  serviceSection.subcategories = serviceSection.subcategories.filter(
    subcategory =>
      subcategory.title !== 'Oprogramowanie i konfiguracja' &&
      subcategory.title !== 'Usługi dodatkowe'
  )
}

export const createDesktopPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  applyDesktopCleaningSection(sections)
  applyDesktopSoftwareSubcategory(sections)
  applyDesktopHardwareSubcategory(sections)
  applyDesktopCoolingSubcategory(sections)
  applyDesktopStorageSubcategory(sections)
  applyDesktopRecoverySubcategory(sections)
  removeDesktopExtraSubcategories(sections)
  return sections
}
