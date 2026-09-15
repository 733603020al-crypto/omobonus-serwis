import type { PricingSection, PricingSubcategory } from './services-data-types'
import { createPricingSections, updateDojazdReturnPrice } from './services-data-shared'

const updateKonserwacjaForOutsourcing = (sections: PricingSection[]) => {
  const konserwacjaSection = sections.find(section => section.id === 'konserwacja')
  if (!konserwacjaSection) return

  konserwacjaSection.title = 'Obsługa firm (abonament miesięczny)'
  konserwacjaSection.items = [
    {
      service: 'Pakiet START dla małych firm i biur (1–3 komputery)\n\nzakres paketu obejmuje:\n• zdalne wsparcie użytkowników (rozwiązywanie problemów z programami, drukowaniem, pocztą - pomoc telefoniczna/chat) - do 4 h miesięcznie,\n• aktualizacje systemów i oprogramowania,\n• administracja systemami Windows / macOS (utrzymanie stabilności i aktualności),\n• monitoring bezpieczeństwa (aktualizacje antywirusa, kontrola zapór i zagrożeń),\n• zarządzanie kopiami zapasowymi (backup + test odtwarzania).',
      price: '70 zł\n/ stanowisko',
      duration: 'do 4 h',
    },
    {
      service: 'Pakiet BIZNES dla rozwijających się firm (4–10 komputerów)\n\nzakres START +\n• zdalne wsparcie użytkowników - pomoc telefoniczna/chat - do 10 h miesięcznie,\n• monitoring bezpieczeństwa (aktualizacje antywirusa, kontrola zapór i zagrożeń),\n• zarządzanie kopiami zapasowymi (backup + test odtwarzania),\n• administracja siecią LAN / Wi-Fi / Router,\n• konfiguracja drukarek i skanowania w sieci (SMB / e-mail),\n• wizyta serwisanta na miejscu: 1× / miesiąc.',
      price: '55 zł\n/ stanowisko',
      duration: 'do 2 h',
    },
    {
      service: 'Pakiet PRO dla firm z rozbudowaną infrastrukturą (11+ komputerów)\n\nzakres BIZNES +\n• zdalne wsparcie użytkowników - pomoc telefoniczna/chat – nielimitowane,\n• zarządzanie użytkownikami i uprawnieniami,\n• administracja serwerami i usługami sieciowymi,\n• wizyta serwisanta na miejscu: 2× / miesiąc,\n• audyt sprzętu i raport miesięczny,\n• priorytetowa obsługa (pomijanie kolejki).',
      price: '40 zł\n/ stanowisko',
      duration: 'do 1 h',
    },
  ]
}

const updateNaprawyKaretkaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const karetkaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-karetka'
  )
  if (!karetkaSubcategory) return

  karetkaSubcategory.title = 'Naprawy sprzętu komputerowego (na miejscu u Klienta)'
  karetkaSubcategory.items = [
    {
      service: 'Wymiana zasilacza / dysku / RAM u Klienta\n(wymiana uszkodzonych lub rozbudowa podzespołów bezpośrednio w siedzibie firmy)',
      price: '150 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Czyszczenie wnętrza komputera i chłodzenia\n(usunięcie kurzu i zabrudzeń – poprawa wydajności i chłodzenia podzespołów)',
      price: '180 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana wentylatora / chłodzenia CPU\n(montaż nowego układu chłodzenia lub wymiana niesprawnego wentylatora)',
      price: '160 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wymiana past termoprzewodzących CPU / GPU\n(odświeżenie połączenia termicznego dla lepszego odprowadzania ciepła)',
      price: '120 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konserwacja stacji roboczej lub terminala\n(czyszczenie, kontrola połączeń, test stabilności – utrzymanie sprawności sprzętu)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Montaż nowego sprzętu\n(instalacja i podłączenie komputera, monitora, zasilacza UPS w miejscu pracy)',
      price: '100 zł\n/ stanowisko',
      duration: '1–3 dni',
    },
  ]
}

const updateNaprawyGlowicaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const glowicaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-glowica'
  )
  if (!glowicaSubcategory) return

  glowicaSubcategory.title = 'Konfiguracja i sieć biurowa'
  glowicaSubcategory.items = [
    {
      service: 'Diagnostyka i konfiguracja sieci LAN / Wi-Fi\n(analiza połączeń, usuwanie błędów komunikacji, optymalizacja ustawień sieci firmowej)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja routera, modemu, punktu dostępowego\n(ustawienie parametrów dostępu do Internetu, zabezpieczeń i sieci bezprzewodowej)',
      price: '120 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja lub ponowne uruchomienie urządzeń sieciowych (drukarka, skaner, router)\n(przywrócenie komunikacji w sieci lokalnej, ponowna instalacja i test urządzeń)',
      price: '100 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Udostępnianie plików i drukarek w sieci\n(tworzenie wspólnych zasobów w sieci lokalnej, konfiguracja uprawnień użytkowników)',
      price: '80 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Test prędkości i stabilności połączenia\n(pomiar wydajności i jakości łącza internetowego lub sieci wewnętrznej)',
      price: '50 zł',
      duration: 'do 24 h',
    },
    {
      service: 'Podłączenie nowych stanowisk do sieci\n(instalacja kabli, konfiguracja adresów IP i włączenie komputerów do sieci biurowej)',
      price: '70 zł\n/ stanowisko',
      duration: '1–3 dni',
    },
  ]
}

const updateNaprawyTasmaForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const tasmaSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-tasma'
  )
  if (!tasmaSubcategory) return

  tasmaSubcategory.title = 'Bezpieczeństwo i kopie zapasowe'
  tasmaSubcategory.items = [
    {
      service: 'Usuwanie wirusów, trojanów, adware\n(czyszczenie systemu z oprogramowania szkodliwego, przywrócenie stabilności i wydajności)',
      price: '150 zł',
      duration: '1–3 dni',
    },
    {
      service: 'Aktualizacja i konfiguracja antywirusa\n(instalacja, konfiguracja ochrony w czasie rzeczywistym, aktualizacja baz zagrożeń)',
      price: '80 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Konfiguracja zapory sieciowej (firewall)\n(ustawienie reguł dostępu, blokowanie nieautoryzowanych połączeń i zagrożeń sieciowych)',
      price: '100 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Wykonanie i test kopii zapasowej (backup + test odtwarzania)\n(tworzenie automatycznych kopii danych oraz kontrola poprawności odtwarzania)',
      price: '150 zł',
      duration: '1–2 dni',
    },
    {
      service: 'Odzyskiwanie danych z dysku lub pendrive\'a (prosty przypadek)\n(odzyskanie skasowanych lub utraconych plików po awarii lub formatowaniu)',
      price: '250 zł',
      duration: '1–5 dni',
    },
    {
      service: 'Przywrócenie dostępu do systemu lub konta użytkownika (po błędzie lub infekcji)\n(naprawa uszkodzonych profili, reset uprawnień, przywrócenie logowania do systemu)',
      price: '200 zł',
      duration: '1–3 dni',
    },
  ]
}

const removeUnwantedSubcategoriesForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  if (!naprawySection?.subcategories) return

  // Удаляем три подкатегории: Naprawy elektroniczne, Oprogramowanie i konfiguracja, Usługi dodatkowe
  naprawySection.subcategories = naprawySection.subcategories.filter(
    sub =>
      sub.id !== 'naprawy-elektronika' &&
      sub.id !== 'naprawy-software' &&
      sub.id !== 'naprawy-dodatkowe'
  )

  // Добавляем footer для секции naprawy на странице Outsourcing IT
  naprawySection.footer = '"Pogotowie komputerowe" - interwencje serwisowe poza abonamentem'
}

const addAudytSubcategoryForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  if (!naprawySection?.subcategories) return

  // Проверяем, не существует ли уже эта подкатегория
  const existingAudyt = naprawySection.subcategories.find(sub => sub.id === 'naprawy-audyt')
  if (existingAudyt) return

  // Находим индекс подкатегории "naprawy-tasma" (Bezpieczeństwo i kopie zapasowe)
  const tasmaIndex = naprawySection.subcategories.findIndex(sub => sub.id === 'naprawy-tasma')

  // Создаем новую подкатегорию
  const audytSubcategory: PricingSubcategory = {
    id: 'naprawy-audyt',
    title: 'Audyt i optymalizacja IT (opcjonalnie / rozszerzenie)',
    items: [
      {
        service: 'Audyt infrastruktury komputerowej\n(kompleksowa kontrola stacji roboczych, serwerów i urządzeń sieciowych – wykrycie usterek sprzętowych i programowych)',
        price: '200 zł',
        duration: '1–3 dni',
      },
      {
        service: 'Analiza konfiguracji systemów i oprogramowania\n(ocena poprawności ustawień, legalności licencji oraz wydajności systemów operacyjnych i aplikacji)',
        price: '150 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Optymalizacja środowiska pracy\n(usprawnienie działania komputerów biurowych, usunięcie zbędnych procesów, poprawa szybkości i stabilności systemów)',
        price: '120 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Raport z audytu i rekomendacje modernizacji\n(szczegółowy raport z wynikami kontroli i sugestiami aktualizacji sprzętu, sieci i zabezpieczeń)',
        price: '100 zł',
        duration: '1–2 dni',
      },
      {
        service: 'Weryfikacja kopii zapasowych i bezpieczeństwa danych\n(sprawdzenie procedur tworzenia backupów, test odtwarzania danych, ocena zabezpieczeń przed utratą informacji)',
        price: '150 zł',
        duration: '1–3 dni',
      },
    ],
  }

  // Вставляем новую подкатегорию после "naprawy-tasma"
  if (tasmaIndex !== -1) {
    naprawySection.subcategories.splice(tasmaIndex + 1, 0, audytSubcategory)
  } else {
    // Если не нашли, просто добавляем в конец
    naprawySection.subcategories.push(audytSubcategory)
  }
}

const updateNaprawyMechanizmForOutsourcing = (sections: PricingSection[]) => {
  const naprawySection = sections.find(section => section.id === 'naprawy')
  const mechanizmSubcategory = naprawySection?.subcategories?.find(
    sub => sub.id === 'naprawy-mechanizm'
  )
  if (!mechanizmSubcategory) return

  mechanizmSubcategory.title = 'Serwis ogólny (praca serwisanta u Klienta)'
  mechanizmSubcategory.items = [
    {
      service: 'Wizyta serwisanta u Klienta\n(pierwsza godzina pracy – diagnostyka i usunięcie drobnych usterek bezpośrednio w siedzibie Klienta)',
      price: '150 zł\n/ godzinę',
      duration: '1–3 dni',
    },
    {
      service: 'Każda kolejna rozpoczęta godzina pracy serwisanta\n(kontynuacja naprawy, konfiguracji lub wdrożenia po przekroczeniu pierwszej godziny)',
      price: '100 zł\n/ godzinę',
      duration: '—',
    },
    {
      service: 'Pomoc zdalna\n(diagnostyka lub konfiguracja systemu, urządzeń biurowych i oprogramowania online)',
      price: '120 zł\n/ godzinę',
      duration: 'do 24 h',
    },
    {
      service: 'Pilna interwencja\n(czas reakcji do 4 h w dni robocze – szybkie wsparcie w nagłych awariach)',
      price: '+50%\ndo ceny',
      duration: 'do 4 h',
    },
    {
      service: 'Usługi poza godzinami pracy / weekendy / święta\n(realizacja zleceń w trybie awaryjnym – po godzinach pracy serwisu)',
      price: '+100%\ndo ceny',
      duration: 'do 4 h',
    },
  ]
}

export const createOutsourcingItPricingSections = (): PricingSection[] => {
  const sections = createPricingSections()
  const diagnosisSection = sections.find(section => section.id === 'diagnoza')
  const diagnosisItem = diagnosisSection?.items.find(
    item => item.service === 'Diagnoza i wycena naprawy\n(w przypadku rezygnacji z naprawy)'
  )
  if (diagnosisItem) {
    diagnosisItem.price = '90'
  }


  updateDojazdReturnPrice(sections, '100')
  updateKonserwacjaForOutsourcing(sections)
  updateNaprawyMechanizmForOutsourcing(sections)
  updateNaprawyKaretkaForOutsourcing(sections)
  updateNaprawyGlowicaForOutsourcing(sections)
  updateNaprawyTasmaForOutsourcing(sections)
  removeUnwantedSubcategoriesForOutsourcing(sections)
  addAudytSubcategoryForOutsourcing(sections)
  return sections
}
