# Отчёт: Цены за час работы на сайте

Этот отчёт показывает все места на сайте, где используется цена за час работы (с форматом "/godzine" или "/ godzinę").

## Логика ценообразования:
- **120 zł/godzinę** - для работы в офисе или удаленно (zdalnie)
- **150 zł/godzinę** - для работы у клиента на выезде (u Klienta)

---

## Таблица всех случаев использования

| № | Страница | Категория | Подкатегория | Услуга | Текущая цена | Тип работы | Строка в коде |
|---|----------|-----------|--------------|--------|--------------|------------|---------------|
| 1 | **Outsourcing IT** | Naprawy i usługi serwisowe (opcjonalne) | Serwis ogólny (praca serwisanta u Klienta) | Wizyta serwisanta u Klienta (pierwsza godzina pracy) | 150\n/ godzinę | **NA WYJEŹDZIE** | 551 |
| 2 | **Outsourcing IT** | Naprawy i usługi serwisowe (opcjonalne) | Serwis ogólny (praca serwisanta u Klienta) | Każda kolejna rozpoczęta godzina pracy serwisanta | 100\n/ godzinę | **NA WYJEŹDZIE** | 556 |
| 3 | **Outsourcing IT** | Naprawy i usługi serwisowe (opcjonalne) | Serwis ogólny (praca serwisanta u Klienta) | Pomoc zdalna (diagnostyka / konfiguracja) | 120\n/ godzinę | **ZDALNIE** | 561 |
| 4 | **Serwis Laptopów** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Instalacja i konfiguracja oprogramowania (pakietów biurowych/multimedialnych) / sterowników | 120\n/ godzinę | W biurze/zdalnie | 634 |
| 5 | **Serwis Laptopów** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Indywidualna konfiguracja/naprawa systemu Windows | 120\n/ godzinę | W biurze/zdalnie | 703 |
| 6 | **Serwis Laptopów** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Zdalna pomoc informatyka | 120\n/ godzinę | **ZDALNIE** | 708 |
| 7 | **Serwis Komputerów Stacjonarnych** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Instalacja i konfiguracja oprogramowania (pakietów biurowych/multimedialnych) / sterowników | 120\n/ godzinę | W biurze/zdalnie | 997 |
| 8 | **Serwis Komputerów Stacjonarnych** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Indywidualna konfiguracja/naprawa systemu Windows | 120\n/ godzinę | W biurze/zdalnie | 1072 |
| 9 | **Serwis Komputerów Stacjonarnych** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Zdalna pomoc informatyka | 120\n/ godzinę | **ZDALNIE** | 1077 |
| 10 | **Serwis Komputerów Stacjonarnych** | Naprawy i usługi serwisowe (opcjonalne) | Naprawy sprzętu | Montaż komputera stacjonarnego | 120\n/ godzinę | W biurze | 1168 |
| 11 | **Serwis Drukarek Laserowych** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Wsparcie zdalne - konfiguracja / sterowniki / diagnostyka (pomoc bez wizyty serwisanta) | 120\n/ godzinę | **ZDALNIE** | 1651 |
| 12 | **Serwis Drukarek Atramentowych** | Naprawy i usługi serwisowe (opcjonalne) | Oprogramowanie i konfiguracja | Wsparcie zdalne – konfiguracja / sterowniki / diagnostyka (pomoc bez wizyty serwisanta) | 120\n/ godzinę | **ZDALNIE** | 2049 |

---

## Анализ по страницам

### 1. Outsourcing IT (3 случая)
- ✅ **150\n/ godzinę** - Wizyta serwisanta u Klienta (pierwsza godzina) - **ПРАВИЛЬНО** (на выезде)
- ✅ **100\n/ godzinę** - Każda kolejna rozpoczęta godzina pracy serwisanta - **ПРАВИЛЬНО** (специальная цена для последующих часов на выезде)
- ✅ **120\n/ godzinę** - Pomoc zdalna - **ИСПРАВЛЕНО** (было 80, теперь 120 для удаленной работы)

### 2. Serwis Laptopów (3 случая)
- ✅ **120\n/ godzinę** - все три услуги правильно для работы в офисе/удаленно (приведено к единому формату)

### 3. Serwis Komputerów Stacjonarnych (4 случая)
- ✅ **120\n/ godzinę** - все четыре услуги правильно для работы в офисе/удаленно (приведено к единому формату)

### 4. Serwis Drukarek Laserowych (1 случай)
- ✅ **120\n/ godzinę** - правильно для удаленной работы (уже был правильный формат)

### 5. Serwis Drukarek Atramentowych (1 случай)
- ✅ **120\n/ godzinę** - правильно для удаленной работы (приведено к единому формату)

---

## Выполненные исправления

1. ✅ **Outsourcing IT - Pomoc zdalna**
   - Изменено с: 80 /godzine
   - На: 120\n/ godzinę (удаленная работа)

2. ✅ **Приведение всех к единому формату**
   - Все цены за час теперь имеют формат: `число\n/ godzinę`
   - Вторая часть (после переноса строки) отображается золотым цветом
   - Все варианты "/godzine" заменены на "/ godzinę"

---

## Примечания

- ✅ Все цены приведены к единому формату: `120\n/ godzinę` (с переносом строки перед "/")
- ✅ Вторая часть (после переноса строки) отображается золотым цветом (как "+ części")
- ✅ Все варианты используют единое написание: "/ godzinę"
- Все цены указаны в злотых (zł)

