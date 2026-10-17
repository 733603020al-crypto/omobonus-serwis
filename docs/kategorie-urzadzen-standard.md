# Standard okna „Kategorie urządzeń”

Status: **zatwierdzony** (2026-10-17); decyzje i odpowiedzi na pytania — rozdział 5, stan wdrożenia — 5.8. Dokument opisuje okno informacyjne z kategoriami urządzeń w cenniku stron usług (`/uslugi/[slug]`). Jest samodzielny: do zbudowania nowego okna nie trzeba zaglądać na żadną konkretną stronę.

Rozdział 1–3 opisują **stan faktyczny z kodu przed etapem 1** (wartości zmierzone w przeglądarce: 1440, 1024 i 390 px); zmiany etapu 1 — 5.1–5.3. Rozdział 4 to **zasady treści**. Rozdział 5 to **zatwierdzone decyzje**.

---

## 1. Gdzie to jest w kodzie

| Element | Plik |
|---|---|
| Treść okna (nagłówek, opis, `(np. …)`, karty, obrazki) | `src/components/PriceTooltipContent.tsx` → `PriceTooltipContent` |
| Lista stron z oknem | `src/components/service-accordion.tsx` → `SPECIAL_TOOLTIP_SERVICES` |
| Wyzwalacz desktop (ikona ⓘ obok „Cena, zł”, `Tooltip`) | `service-accordion.tsx` — blok `TooltipContent` z `isSpecialTooltipService` (dwa miejsca w pliku, oba renderują `PriceTooltipContent`) |
| Okno mobilne (modal pełnoekranowy) | `service-accordion.tsx` — blok „БОЛЬШАЯ ПОДСКАЗКА (МОДАЛЬНОЕ ОКНО) ДЛЯ МОБИЛЬНЫХ” |
| Tooltip (Radix, portal, animacja) | `src/components/ui/tooltip.tsx` |
| **Konfiguracja okien (dane po slug)** | `PriceTooltipContent.tsx` → `DEVICE_CATEGORIES_WINDOWS` (opis w 5.5) |
| Teksty: nagłówek, opisy okna, uwaga pod kartami | `src/lib/i18n/service-accordion.ts` → `deviceCategoriesTitle`, `deviceCategoriesDescription.<klucz>`, `deviceCategoriesNote.<klucz>` |
| Tłumaczenia kart UK/RU | `service-accordion.ts` → `categoryTranslations*` (klucz = polski tytuł karty) |
| Wiersz cen `(np. …)` | `renderPriceLines` w `service-accordion.tsx` (wartość — `priceExample` w konfiguracji) |
| Karty (tytuł, opis PL, obrazek) | `categories` w konfiguracji |
| Fonty | `.font-cormorant`, `.font-inter`, `.font-table-sub` — `src/app/globals.css`; `cormorant` w `tailwind.config.ts` |
| Tło | `--bg-parchment` — `globals.css` (`Background_1.webp`, mobile `<768px`: `Background_1-mobile.webp`) |

Przełącznik desktop/mobile: `isMobile = window.innerWidth < 768`. Siatka 3 kolumn: Tailwind `md:` (≥768 px).

---

## 2. Zachowanie

**Desktop / tablet (≥768 px)** — tooltip po najechaniu na ikonę ⓘ w nagłówku kolumny „Cena, zł”:
- `side: 'left'`, `align: 'center'`, `sideOffset: -80`, `collisionPadding: 16`, `TooltipProvider delayDuration={100}`;
- klasa treści: `p-0 border-none bg-transparent shadow-none max-w-none rounded-none` + `SPECIAL_TOOLTIP_FIT_CLASS` = `[translate:max(0px,calc(100%_-_var(--radix-tooltip-content-available-width)))_0]` (przesuwa okno w prawo, gdy brakuje miejsca po lewej; przy 1440 px przesunięcie = 0);
- animacja wejścia z `tooltip.tsx`: `fade-in-0 zoom-in-95`, `data-[side=left]:slide-in-from-right-2`;
- `TooltipContent` dodaje domyślnie `text-xs` (12px / line-height 16px) — **dziedziczą to elementy bez własnego `leading-*`** (patrz 3.3).

**Mobile (<768 px)** — kliknięcie ⓘ (`aria-label` = `categoryInfoAriaLabel`, „Informacja o kategoriach”) otwiera modal:
- warstwa: `fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm`;
- przewijany kontener: `absolute inset-0 overflow-y-auto`, `paddingTop: calc(65px + env(safe-area-inset-top) + 16px)`, `paddingBottom: calc(env(safe-area-inset-bottom) + 32px)`;
- szerokość treści: `mx-auto w-[calc(100vw-32px)]`;
- zamykanie: przycisk X, klik w tło, klawisz Escape; `body overflow: hidden` w czasie otwarcia;
- przycisk X: `absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/70 active:bg-black/90 text-white shadow-lg`, ikona `X` `w-5 h-5`.

---

## 3. Oprawa wizualna (wartości faktyczne)

### 3.1 Ramka okna

| Właściwość | Klasa | Wartość |
|---|---|---|
| Szerokość desktop | `w-[min(calc(100vw-32px),900px)] md:w-[min(calc(100vw-64px),900px)]` | 900 px przy 1024 i 1440 |
| Maks. wysokość desktop | `max-h-[90vh] md:max-h-[88vh]` (ramka i wnętrze) | 792 px przy 900 px wys. okna |
| Przewijanie desktop | wnętrze `overflow-y-auto` | — |
| Mobile | `w-full min-h-fit`, bez limitu wysokości | 358 px przy 390 |
| Obramowanie | `border-2 border-[rgba(200,169,107,0.5)]` | 2px |
| Zaokrąglenie | `rounded-lg` | 8px |
| Cień | `shadow-[0_8px_32px_rgba(0,0,0,0.5)]` | — |
| Tło | `backgroundImage: var(--bg-parchment)`, `cover`, `center` | `Background_1.webp` |
| Przyciemnienie | warstwa `absolute inset-0 rounded-lg bg-black/55` | rgba(0,0,0,.55) |
| Kolor tekstu bazowy | `text-[#f8eacd]` | — |
| Wnętrze | `relative p-6 md:p-7 pb-8 md:pb-7 space-y-6` | 28px (md+), 24px / dół 32px (mobile); odstęp nagłówek → karty 24px |

Uwaga: w kodzie istnieje jeszcze wariant bez `menuBacking` (`rounded-2xl`, `services-background.webp`, `bg-[rgba(0,0,0,0.5)]`), ale wszystkie 14 stron z oknem mają `menuBacking = true`, więc jest nieużywany.

### 3.2 Nagłówek i trzy linie pod nim

Kontener: `text-center space-y-2`.

| Element | Klasy | Zmierzone (desktop / mobile) |
|---|---|---|
| Nagłówek „Kategorie urządzeń” `<h4>` | `text-[22px] md:text-[26px] font-cormorant font-semibold tracking-wide text-[#f3df9a]` | 26px / 22px, waga 600, `letter-spacing` 0.65px, kolor #f3df9a; line-height **16px** (desktop, dziedziczony z `text-xs`) / 33px (mobile) |
| Opis `<p>` — od etapu 1 dwa wiersze `<span className="block">` („Cena zależy od…:” i „pierwsza – …”) | `text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant` | 17px / 15px, waga 400, line-height 1.375 (23.4 / 20.6px) |
| Wiersz `(np. …)` | kontener `mt-1 flex items-center justify-center gap-1` | odstęp od opisu 8px, gap 4px |
| — „(np.” i „)” | `text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] font-cormorant` | 17px / 15px |
| — wartości | `renderPriceLines(...)` → `.price-value-text font-inter text-[13px] md:text-[14px] text-[rgba(255,255,255,0.9)] leading-[1.3]`, w opakowaniu `drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]` | Inter 14px / 13px, line-height 18.2px, biała poświata |

`renderPriceLines` w wersji mobile skleja zapis „80 / 120 / 180” do „80/120/180” (pełny zapis od `md:`).

### 3.3 Karty

| Element | Klasy | Zmierzone |
|---|---|---|
| Siatka | `grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-4` | desktop 3 × 264px, gap 24px; mobile 1 kolumna 306px, gap 16px; dół 16px |
| Karta | `bg-[rgba(255,255,255,0.08)] border border-[rgba(191,167,106,0.35)] rounded-xl p-4 flex flex-col shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-center` | 12px zaokrąglenie, 16px padding; w rzędzie wszystkie karty mają tę samą wysokość (siatka rozciąga, desktop 354px) |
| Tytuł karty | `text-xl font-cormorant font-semibold text-[#f3df9a]` | 20px / line-height 28px, waga 600 |
| Opis karty | `text-[rgba(255,255,245,0.85)] leading-snug mt-1 whitespace-pre-line text-[14px] md:text-[16px] font-cormorant` | odstęp od tytułu 4px; 16px / 14px; line-height faktycznie **16px** desktop i 21px mobile — `leading-snug` jest usuwany przez `cn()` (tailwind-merge traktuje późniejsze `text-[..px]` jako konflikt), więc line-height dziedziczy się z rodzica |
| Opakowanie obrazka | `flex justify-center items-center my-3` (+ `mt-auto` **tylko** na stronie ekspresów) | 12px nad i pod obrazkiem |
| Obrazek | `next/image`, `width={200} height={150}`, `unoptimized`, `w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain`, `alt` = polski tytuł karty | 200×200 (md+), 150×150 (mobile) |
| Podpis cech (opcjonalny) | `text-[13px] text-[rgba(255,255,245,0.85)] leading-snug font-table-sub text-center mt-auto pt-2` | dziś na żadnej stronie nie jest wypełniony (`features: []`) |
| Podświetlenie obrazka | `BacklitImage`, sterowane `backlit = false` | wyłączone |

Źródło obrazków: zdjęcia z karuzeli tej samej strony usługi (`/images/<prefiks>-carousel-v…-NN.webp`), przypisywane polem `image` karty w konfiguracji.

### 3.4 Responsywność

| Szerokość | Zachowanie |
|---|---|
| ≥1280 px | tooltip 900px po lewej stronie ikony, bez przesunięcia |
| 1024–1279 px | tooltip 900px, przesuwany w prawo przez `SPECIAL_TOOLTIP_FIT_CLASS`, margines 16px |
| 768–1023 px | tooltip `min(100vw − 64px, 900px)`, 3 kolumny |
| <768 px | modal pełnoekranowy, szerokość `100vw − 32px`, 1 kolumna, mniejsze fonty i obrazki 150px |

### 3.5 Problem wyrównania (stan przed etapem 1 — rozwiązany, patrz 5.1)

Zmierzono na 1440 px dla karty z tytułem w dwóch liniach: tytuł 56px zamiast 28px, więc jej opis zaczyna się **28px niżej** niż w sąsiednich kartach (435 vs 407 px). Obrazki są na jednej wysokości tylko tam, gdzie opakowanie obrazka ma `mt-auto` (dziś jedna strona); na pozostałych obrazek idzie zaraz za tekstem i przy różnej długości opisów „skacze”.

---

## 4. Zasady treści

Kolejność elementów (stała):

1. **Nagłówek:** `Kategorie urządzeń` (UK: `Категорії пристроїв`, RU: `Категории устройств`).
2. **Linia 1 (osobny wiersz):** `Cena zależy od …:` — od czego zależy cena (np. klasa, konstrukcja, wielkość, moc).
3. **Linia 2 (osobny wiersz):** `pierwsza – …, druga – …, trzecia – … .` — nazwy trzech kategorii w tej samej kolejności co karty i co ceny w cenniku. Myślnik: półpauza `–`.
4. **Linia 3:** `(np. A / B / C zł netto)` — trzy realne ceny jednej usługi z cennika tej strony, w kolejności kategorii. Nie wymyślać cen.
5. **Trzy karty:** tytuł kategorii, krótki opis (1–2 zdania: czym jest to urządzenie, do jakiej pracy; bez kropki na końcu), obrazek.
6. **Uwaga pod kartami (opcjonalna):** tylko dla przypadków szczególnych, np. „Urządzenia powyżej … — wycena indywidualna.”

Zasady językowe:
- prosty polski, zrozumiały dla klienta; bez żargonu i parametrów, których klient nie zna;
- w oknie tylko to, co dotyczy podziału na kategorie — bez czasu realizacji, części, warunków itp.;
- tytuły kart krótkie (najlepiej jedna linia na desktopie);
- **bez kropki na końcu** tytułu kategorii i opisu karty (PL, UK, RU; dotyczy istniejących i nowych okien); w opisie pod nagłówkiem i w uwadze pod kartami — zwykła interpunkcja;
- PL jest źródłem; UK i RU — przez `categoryTranslations*` / `deviceCategoriesDescription` w i18n, bez kopiowania JSX.

Nowe okno = ten sam komponent `PriceTooltipContent`, wpis slug w `SPECIAL_TOOLTIP_SERVICES`, dane (opis, przykład, karty, obrazki) — według zasad wyżej. Nie tworzyć osobnego komponentu ani własnych stylów dla jednej strony.

---

## 5. Zatwierdzone decyzje (obowiązują wszystkie okna)

Zatwierdzone 2026-10-17 (5.1–5.4), odpowiedzi na pytania — 2026-10-17 (5.7). Stan wdrożenia — 5.8.

### 5.1 Wspólne wyrównanie kart — ZATWIERDZONE, WDROŻONE (etap 1)

Każde okno, niezależnie od strony, ma ten sam układ karty (od góry): strefa tytułu → opis → obrazek. Wyrównanie jest w całości w CSS (subgrid), bez stałych wysokości.

| Zasada | Implementacja w `PriceTooltipContent` |
|---|---|
| Wiersze kart wspólne dla wszystkich trzech kart | siatka: `md:grid-rows-[auto_auto_auto_auto] md:gap-x-6 md:gap-y-0`; karta: `md:grid md:grid-rows-subgrid md:row-span-4 md:gap-0` |
| Strefa tytułu ma tę samą wysokość we wszystkich kartach — automatycznie, także dla tytułu w 3 liniach na tablecie | tytuł i opis są bezpośrednimi dziećmi karty (bez opakowania `<div>`); wiersz tytułu = najwyższy tytuł w rzędzie. Font tytułu się nie zmniejsza |
| Tytuł wyśrodkowany w pionie i w poziomie | tytuł: `md:flex md:items-center md:justify-center` (`text-center` karty zostaje) |
| Opisy zaczynają się na tej samej wysokości | wynika ze wspólnego wiersza tytułu; odstęp tytuł → opis bez zmian (`mt-1`, 4px) |
| Obrazki na jednej linii niezależnie od długości opisu | wspólny wiersz opisu = najdłuższy opis; opakowanie obrazka `my-3` (warunkowe `mt-auto` dla jednej strony usunięte) |
| Mobile (<768 px, 1 kolumna) | bez zmian: `flex flex-col`, karty jedna pod drugą |

Rozmiary, kolory, fonty, obrazki i odstępy z rozdziału 3 się nie zmieniają.

### 5.2 Uwaga pod kartami — ZATWIERDZONE, MECHANIZM WDROŻONY (etap 1)

- Przeznaczenie: tylko przypadki szczególne, np. duże urządzenia przemysłowe / centralne z wyceną indywidualną (niszczarki, UPS). Brak uwagi = element się nie renderuje.
- Miejsce: pod siatką kart, wewnątrz tego samego kontenera (odstęp z `space-y-6` = 24px; siatka ma `pb-4`).
- Styl (jak opis pod nagłówkiem): `<p>` z klasami `text-center text-[15px] md:text-[17px] text-[rgba(255,255,245,0.85)] leading-snug font-cormorant`.
- Treść: jedno krótkie zdanie, np. `Urządzenia powyżej … – wycena indywidualna.` Bez cen, terminów i warunków. Zwykła interpunkcja.
- Dane: `deviceCategoriesNote` w `src/lib/i18n/service-accordion.ts` (opcjonalne, te same klucze co `deviceCategoriesDescription`; PL źródło, UK/RU tłumaczenie). Uwaga jest wyświetlana tylko tam, gdzie klucz ma wpisany tekst.

### 5.3 Poprawka dziedziczenia `line-height` — ZATWIERDZONE, WDROŻONE (etap 1, wygląd bez zmian)

Problem: elementy bez własnego `leading-*` dziedziczyły wysokość linii od rodzica — na desktopie z `text-xs` tooltipa (16px), na mobile z `body` (1.5). W opisie karty `leading-snug` był usuwany przez `cn()` (tailwind-merge), bo stał **przed** `text-[14px] md:text-[16px]`.

Poprawka: jawne wartości równe dotychczas wyświetlanym.

| Element | Wartość (mobile / desktop) | Jawna klasa |
|---|---|---|
| Nagłówek `<h4>` | 33px / 16px | `leading-normal md:leading-4` |
| Opis karty `<p>` | 21px / 16px | `leading-normal md:leading-4` (nieskuteczne `leading-snug` usunięte) |
| „(np.” i „)” | 22.5px / 16px | `leading-normal md:leading-4` |
| Opis pod nagłówkiem, tytuł karty, wartości cen, podpis cech | własne line-height | bez zmian |

Zasada na przyszłość: w `cn()` klasa `leading-*` zawsze **po** klasach rozmiaru `text-[..px]`, inaczej tailwind-merge ją usunie.

### 5.4 Przykład cen `(np. …)` — ZATWIERDZONE

- Jednolity format: `(np. A / B / C zł netto)` (UK/RU: `zł нетто`).
- A / B / C — trzy ceny **jednej** usługi z cennika tej samej strony, w kolejności kategorii. Priorytet wyboru usługi: diagnostyka, potem konserwacja; jeśli brak usługi z trzema cenami — nie wymyślać, zostawić obecny tekst i zgłosić.
- Wartości zmienia się tylko po sprawdzeniu w cenniku; przy weryfikacji uzupełnić tabelę.

Zasady ogólne (bez odwołań do konkretnych stron):

- Wartość przykładu to pole `priceExample` (`'A / B / C'`) w konfiguracji okna (5.5). Dopisek `zł netto` / `zł нетто` dodaje komponent.
- A / B / C muszą odpowiadać cenom jednej usługi z cennika tej samej strony, w kolejności kart (1 → 2 → 3).
- Jeśli diagnostyka ma jedną cenę dla wszystkich kategorii, przykład bierze się z konserwacji.
- Przy każdej zmianie cennika sprawdzić, czy przykład w oknie nadal się zgadza.

### 5.5 Struktura danych — WDROŻONE (etap 3)

Wszystkie dane okna jednej strony to jeden wpis w `DEVICE_CATEGORIES_WINDOWS` (`src/components/PriceTooltipContent.tsx`), klucz = `slug` strony usługi. Komponent `PriceTooltipContent` nie zawiera warunków po slug — czyta tylko ten wpis.

```ts
'<slug>': {
  textKey: '<klucz i18n>',            // deviceCategoriesDescription.<klucz> (obowiązkowy) i deviceCategoriesNote.<klucz> (opcjonalny)
  priceExample: 'A / B / C',          // wiersz „(np. A / B / C zł netto)”; „zł netto” / „zł нетто” dodaje komponent
  translationsKey?: 'categoryTranslations<Nazwa>', // tylko gdy polskie tytuły kart powtarzają się na innej stronie
  categories: [                       // dokładnie 3 karty, kolejność = kolejność cen w priceExample
    { title: '<tytuł PL>', description: '<opis PL, bez kropki>', image: '/images/<plik>.webp' },
    …
  ],
}
```

- **Ramka / tło** (`menuBacking`) — automatycznie dla każdego slug obecnego w konfiguracji.
- **Tłumaczenia kart UK/RU** — z `i18n/service-accordion.ts`, klucz = polski `title`: najpierw mapa `translationsKey` (jeśli podana), potem wspólna `categoryTranslations`; brak tłumaczenia = tekst PL.
- **Slug spoza konfiguracji** — okno drukarek laserowych (zachowanie sprzed refaktoryzacji; w praktyce nie występuje).

**Nowe okno — kroki:**

1. Dodać wpis do `DEVICE_CATEGORIES_WINDOWS` (3 karty z obrazkami, `priceExample` według 5.4).
2. W `i18n/service-accordion.ts` dla PL/UK/RU: dodać klucz do `deviceCategoriesDescription` (typ `ServiceAccordionDict` + 3 języki), opcjonalnie `deviceCategoriesNote`; tłumaczenia kart do `categoryTranslations` lub — przy kolizji tytułów — do nowej mapy `categoryTranslations<Nazwa>` (typ + 3 języki, PL `{}`), podanej w `translationsKey` (nazwę dopisać do typu `DeviceCategoriesTranslationsKey`).
3. Dodać slug do `SPECIAL_TOOLTIP_SERVICES` w `service-accordion.tsx` (włącza ikonę ⓘ i okno na stronie).

Bez nowych komponentów i bez warunków w JSX. W typach nadal jest nieużywany kształt `PriceTooltipRichContent` w `src/lib/services-data-types.ts` — poza zakresem etapu 3.

### 5.6 Różnice treści względem zasad z rozdziału 4 — POPRAWIONE (etap 2)

- „Czas realizacji nie obejmuje oczekiwania na części” (DTG, sublimacja, spożywcze) — **usunąć** z okna.
- Wycena indywidualna wpisana w opis (niszczarki, UPS) — **przenieść** do uwagi pod kartami (5.2).
- DTF: opis w innym schemacie („W cenniku kolejno podajemy…”) i brak wiersza `(np. …)` — **doprowadzić do wspólnej struktury** (do tego czasu opis DTF wyświetla się jednym akapitem).
- `zł netto` w wierszu `(np. …)` jest tylko na jednej stronie — **ujednolicić** według 5.4.
- Myślnik: część stron ma `—` zamiast `–` — **ujednolicić do `–`**.
- Wartości `(np. …)` 50 / 100 / 150 są wspólne dla 9 stron — weryfikacja według 5.4.

### 5.7 Odpowiedzi na pytania przed wdrożeniem (2026-10-17)

1. **Linia 1 i linia 2** — dwa osobne wiersze. Komponent dzieli opis po pierwszym `: `, jeśli dalej zaczyna się wyliczenie (`pierwsza` / `перша` / `первая`); każdy wiersz to `<span className="block">`. Inny schemat tekstu = jeden akapit.
2. **Tablet 768–1023 px** — strefa tytułów wspólna i automatyczna (także 3 linie); fontu nie zmniejszać, tytułów nie skracać.
3. **`zł netto`** — wszędzie jednolity format `(np. A / B / C zł netto)`, ale dopiero po sprawdzeniu realnych cen danej usługi.
4. **Wybór usługi do przykładu** — jedna usługa z trzema cenami; priorytet: diagnostyka lub konserwacja. Brak takiej usługi — nie wymyślać cen, zgłosić.
5. **DTF** — doprowadzić do wspólnej struktury.
6. **Teksty spoza klasyfikacji** — informacje o oczekiwaniu na części usunąć; wycenę indywidualną niszczarek i UPS przenieść pod karty.
7. **Myślnik** — wszędzie `–`.
8. **Ujednolicenie danych** — osobnym etapem.
9. **Kolejność** — 1) struktura i wyrównanie → 2) teksty i ceny → 3) refaktoryzacja danych.

### 5.8 Stan wdrożenia

| Etap | Zakres | Stan |
|---|---|---|
| 1 | Dwa wiersze opisu, wyrównanie kart (subgrid), jawne line-height, mechanizm uwagi pod kartami, usunięcie kropek na końcu tytułów i opisów kart (PL/UK/RU) — 14 stron | wdrożone 2026-10-17, bez commita |
| 2 | Teksty i ceny: nowe opisy kart i linii, DTF we wspólnej strukturze, usunięcie „części”, uwagi niszczarek/UPS, myślnik `–`, `(np. … zł netto)` na wszystkich 14 stronach (PL/UK/RU) | wdrożone 2026-10-17, bez commita |
| 3 | Refaktoryzacja danych: jedna konfiguracja `DEVICE_CATEGORIES_WINDOWS` po slug, bez warunków w komponencie (5.5); wygląd i teksty bez zmian | wdrożone 2026-10-17, bez commita |
