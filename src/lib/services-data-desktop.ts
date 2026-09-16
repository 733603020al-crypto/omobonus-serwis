import type { PricingSection } from './services-data-types'
import { createPricingSections, getRecoveryItems } from './services-data-shared'

const applyDesktopCleaningSection = (sections: PricingSection[]) => {
  const cleaningSection = sections.find(section => section.id === 'konserwacja')
  if (!cleaningSection) return
  cleaningSection.items = [
    {
      service:
        'PODSTAWOWY (przegląd i profilaktyka)\n\nzakres usługi obejmuje:\n• demontarz obudowy,\n• czyszczenie wentylatorów i radiatorów,\n• wymiana past termoprzewodzących CPU/GPU,\n• usunięcie kurzu i zanieczyszczeń,\n• testy obciążeniowe + test temperatur.',
      duration: '1-3 dni',
    },
    {
      service:
        'STANDARD (standardowa konserwacja)\n\nzakres PODSTAWOWY +\n• wymiana / dopasowanie termopadów,\n• konserwacja portów,\n• krótki test pamięci RAM i dysku SMART.',
      duration: '1-3 dni',
    },
    {
      service:
        'PREMIUM (pełna konserwacja)\n\nzakres STANDARD +\n• porządkowanie okablowania i kanałów powietrznych,\n• czyszczenie klawiatury i portów wewnętrznych,\n• aktualizacja BIOS/UEFI (jeśli wskazana),\n• długie testy obciążeniowe (CPU / GPU / RAM).',
      duration: '1-3 dni',
    },
  ]
}

const applyDesktopSoftwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const softwareSubcategory = serviceSection?.subcategories?.[0]
  if (!softwareSubcategory) return
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
        'Instalacja i konfiguracja oprogramowania\n(pakietów biurowych/multimedialnych) / sterowników',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa i optymalizacja systemu operacyjnego Windows (problemy z uruchomieniem systemu, zapętlanie się przy starcie, restartowanie się, zawieszanie się lub wolna praca)',
      duration: '1-2 dni',
    },
    {
      service:
        'Kopia (odzyskanie) danych z uszkodzonego systemu\n(w przypadku awarii systemu Windows, aby odzyskać dokumenty (word, excel, itp), zdjęcia, filmy i inne pliki)',
      duration: '1-3 dni',
    },
    {
      service: 'Przywracanie systemu z partycji Recovery (jeśli dostępne)',
      duration: '1-2 dni',
    },
    {
      service:
        'Rozwiązywanie problemów z aktualizacjami Windows (odzyskiwanie systemu po błędnej aktualizacji / BSOD)',
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
      service: 'Konfiguracja RAID (0/1/5/10)',
      duration: '1-3 dni',
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

const applyDesktopHardwareSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const hardwareSubcategory = serviceSection?.subcategories?.[1]
  if (!hardwareSubcategory) return
  hardwareSubcategory.title = 'Płyta główna / zasilanie / podzespoły'
  hardwareSubcategory.items = [
    {
      service: 'Wymiana procesora',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana płyty głównej (przekładka + konfiguracja)',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa płyty głównej (przerwane ścieżki, zimne luty, mikrolutowanie)',
      duration: '2-7 dni',
    },
    {
      service: 'Wymiana gniazda USB / HDMI / Audio / DC-jack, …',
      duration: '2-5 dni',
    },
    {
      service:
        'Wymiana baterii dla układu CMOS (BIOS) na płycie głównej',
      duration: '1-3 dni',
    },
    {
      service:
        'Naprawa układu ładowania (charge controller / MOSFET / BQ / ISL)',
      duration: '2-7 dni',
    },
    {
      service: 'Wymiana układów zasilania (PU, PD, KBC/EC)',
      duration: '3-7 dni',
    },
    {
      service:
        'Wymiana części/podzespołów w komputerze stacjonarnym\n(karta grafiki, pamięć RAM, …). Testy diagnostyczne',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana zasilacza',
      duration: '1-2 dni',
    },
    {
      service:
        'Naprawa problemów z kartą sieciową (sterowniki / usługi / reset)',
      duration: '1 dzień',
    },
    {
      service:
        'Naprawa Bluetooth (sterowniki / konflikty / parowanie urządzeń)',
      duration: '1-2 dni',
    },
    {
      service: 'Wymiana napędu / nagrywarki',
      duration: '1-3 dni',
    },
    {
      service: 'Naprawa przycisku POWER / panelu przedniego',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana obudowy (pełna przekładka)',
      duration: '1-2 dni',
    },
    {
      service:
        'Montaż komputera stacjonarnego\n(możemy zamontować z części dostarczonych przez Klienta, lub zakupionych przez nas)',
      duration: '1-3 dni',
    },
  ]
}

const applyDesktopCoolingSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const coolingSubcategory = serviceSection?.subcategories?.[2]
  if (!coolingSubcategory) return
  coolingSubcategory.title = 'Układ chłodzenia i czystość'
  coolingSubcategory.items = [
    {
      service:
        'Diagnostyka układu chłodzenia (pomiar temperatur przed/po czyszczeniu)',
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
  ]
}

const applyDesktopStorageSubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const storageSubcategory = serviceSection?.subcategories?.[3]
  if (!storageSubcategory) return
  storageSubcategory.title = 'Dyski i dane'
  storageSubcategory.items = [
    {
      service: 'Diagnoza dysku + SMART / test powierzchni',
      duration: '1-2 dni',
    },
    {
      service: 'Kopia zapasowa danych',
      duration: '1-2 dni',
    },
    {
      service:
        'Migracja danych / klonowanie dysku (stary dysk → nowy dysk)',
      duration: '1-3 dni',
    },
    {
      service: 'Wymiana dysku HDD → SSD + migracja danych',
      duration: '1-3 dni',
    },
    {
      service: 'Montaż dysku M.2 NVMe / SATA (z konfiguracją)',
      duration: '1-2 dni',
    },
  ]
}

const applyDesktopRecoverySubcategory = (sections: PricingSection[]) => {
  const serviceSection = sections.find(section => section.id === 'naprawy')
  const recoverySubcategory = serviceSection?.subcategories?.[4]
  if (!recoverySubcategory) return
  recoverySubcategory.title = 'Odzyskanie / usuwanie danych'
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
