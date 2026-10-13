import type { PricingSection } from './services-data-types'
import { createNiszczarkiPricingSections } from './services-data-niszczarki'
import { niszczarkiPricingSectionsUk } from './services-data-uk-niszczarki'
import { niszczarkiPricingSectionsRu } from './services-data-ru-niszczarki'

// naprawa-zasilaczy-ups: sekcje „Diagnoza” i „Dojazd” to wspólne zasady serwisu (ta sama baza co niszczarki);
// własne dla UPS: konserwacja, naprawy, FAQ i wysyłka kurierem. PL = źródło prawdy dla UK/RU.

const UPS_KONSERWACJA_PL =
  'PRZEGLĄD I KONSERWACJA UPS [[kompleksowe ]]czyszczenie, kontrola i test urządzenia\n• czyszczenie wnętrza UPS, wentylatorów i układów chłodzenia;\n• kontrola połączeń elektrycznych i przyłączy kablowych;\n• kontrola elektroniki, kondensatorów i wentylatorów;\n• kontrola akumulatorów i pomiar rezystancji wewnętrznej;\n• pomiar parametrów wejściowych i wyjściowych;\n• kontrola komunikatów, alarmów i historii błędów;\n• test pracy normalnej, bateryjnej i bypass;\n• końcowy test działania i zalecenia serwisowe.'

const UPS_KONSERWACJA_UK =
  'ОГЛЯД І ОБСЛУГОВУВАННЯ ДБЖ (UPS) [[комплексне ]]чищення, перевірка та тестування пристрою\n• чищення внутрішньої частини ДБЖ, вентиляторів і системи охолодження;\n• перевірка електричних з’єднань і кабельних підключень;\n• перевірка електроніки, конденсаторів і вентиляторів;\n• перевірка акумуляторів і вимірювання внутрішнього опору;\n• вимірювання вхідних і вихідних параметрів;\n• перевірка повідомлень, аварійних сигналів та історії помилок;\n• тест роботи у звичайному режимі, від батареї та в режимі bypass;\n• фінальний тест роботи та сервісні рекомендації.'

const UPS_KONSERWACJA_RU =
  'ОСМОТР И ОБСЛУЖИВАНИЕ ИБП (UPS) [[комплексная ]]чистка, проверка и тестирование устройства\n• чистка внутренней части ИБП, вентиляторов и системы охлаждения;\n• проверка электрических соединений и кабельных подключений;\n• проверка электроники, конденсаторов и вентиляторов;\n• проверка аккумуляторов и измерение внутреннего сопротивления;\n• измерение входных и выходных параметров;\n• проверка сообщений, аварийных сигналов и истории ошибок;\n• тест работы в обычном режиме, от батареи и в режиме bypass;\n• финальный тест работы и сервисные рекомендации.'

// Naprawy UPS: [id podkategorii, tytuł, usługi 'Tytuł\n(objawy)']; ceny/czasy — services-pricing-data.ts
type NaprawyGroup = [id: string, title: string, items: string[]]

const UPS_NAPRAWY_PL: NaprawyGroup[] = [
  ['naprawy-akumulatory', 'Baterie i akumulatory', [
    'Test akumulatorów / pomiar rezystancji\n(UPS krótko podtrzymuje, zgłasza słabą baterię lub szybko się rozładowuje)',
    'Wymiana akumulatorów + kalibracja\n(UPS nie podtrzymuje zasilania, bateria jest zużyta lub wymaga wymiany)',
    'Naprawa przewodów / połączeń baterii\n(UPS nie wykrywa baterii, przerywa pracę na baterii lub zgłasza jej błąd)',
    'Test czasu podtrzymania\n(sprawdzenie, jak długo UPS rzeczywiście pracuje po zaniku zasilania)',
  ]],
  ['naprawy-ladowanie-dc', 'Ładowanie i zasilanie', [
    'Naprawa układu ładowania\n(UPS nie ładuje akumulatorów, ładuje je zbyt wolno lub zgłasza błąd ładowania)',
    'Naprawa prostownika / układu PFC\n(UPS nie uruchamia się z sieci, zgłasza błąd zasilania lub nie ładuje baterii)',
    'Naprawa przetwornicy pomocniczej\n(UPS nie uruchamia się, resetuje się lub część elektroniki nie działa)',
    'Wymiana kondensatorów DC\n(UPS pracuje niestabilnie, wyłącza się lub pojawiają się błędy sekcji zasilania)',
  ]],
  ['naprawy-falownik', 'Falownik i sekcja mocy', [
    'Naprawa falownika / inwertera\n(UPS nie podaje napięcia, wyłącza się pod obciążeniem lub przechodzi w błąd)',
    'Wymiana tranzystorów mocy (MOSFET / IGBT)\n(UPS nie uruchamia wyjścia, wybija zabezpieczenia lub zgłasza błąd mocy)',
    'Naprawa sekcji mocy\n(UPS nie zasila urządzeń, wyłącza się lub pracuje niestabilnie pod obciążeniem)',
    'Wymiana kondensatorów AC\n(UPS pracuje niestabilnie, hałasuje lub pojawiają się problemy z napięciem wyjściowym)',
    'Naprawa po przepięciu / burzy\n(UPS przestał działać po burzy, skoku napięcia lub awarii sieci, czuć spaleniznę lub wybija zabezpieczenie)',
  ]],
  ['naprawy-bypass', 'Bypass i przełączanie', [
    'Naprawa układu Static Bypass\n(UPS nie przełącza się na bypass lub zgłasza błąd podczas przełączania)',
    'Naprawa / wymiana przekaźników bypass\n(UPS nie przełącza zasilania, przerywa pracę lub słychać nieprawidłowe przełączanie)',
    'Naprawa układu przełączania sieć / bateria\n(UPS nie przechodzi na baterię lub nie wraca na zasilanie sieciowe)',
  ]],
  ['naprawy-elektronika', 'Elektronika i sterowanie', [
    'Naprawa płyty sterującej / głównej\n(UPS nie uruchamia się, zawiesza się, resetuje lub zgłasza błędy sterowania)',
    'Naprawa układów sterowania, pomiarowych i zabezpieczeń\n(błędne wskazania, fałszywe alarmy lub nieprawidłowe działanie zabezpieczeń)',
    'Naprawa panelu sterowania / wyświetlacza\n(wyświetlacz nie działa, przyciski nie reagują lub nie można sterować UPS-em)',
    'Naprawa płyty zasilania\n(UPS nie włącza się, resetuje się lub nie zasila części układów)',
    'Aktualizacja / przywrócenie oprogramowania UPS\n(błąd oprogramowania, UPS nie uruchamia się po nieudanej aktualizacji lub wymaga nowszej wersji — jeśli producent ją udostępnia)',
  ]],
  ['naprawy-chlodzenie', 'Chłodzenie', [
    'Wymiana wentylatora / wentylatorów\n(wentylator hałasuje, nie obraca się lub UPS nadmiernie się nagrzewa)',
    'Naprawa sterowania chłodzeniem\n(wentylatory pracują cały czas, nie uruchamiają się lub UPS zgłasza temperaturę)',
  ]],
  ['naprawy-komunikacja', 'Komunikacja i monitoring', [
    'Naprawa / wymiana karty sieciowej SNMP\n(brak monitoringu UPS, karta nie odpowiada lub urządzenie znika z sieci)',
    'Naprawa interfejsu komunikacyjnego\n(brak komunikacji przez USB, RS232 lub sieć)',
    'Konfiguracja komunikacji UPS\n(UPS działa, ale nie komunikuje się poprawnie z komputerem, serwerem lub monitoringiem)',
  ]],
]

const UPS_NAPRAWY_UK: NaprawyGroup[] = [
  ['naprawy-akumulatory', 'Батареї та акумулятори', [
    'Тестування акумуляторів / вимірювання опору\n(ДБЖ недовго тримає живлення, повідомляє про слабку батарею або швидко розряджається)',
    'Заміна акумуляторів + калібрування\n(ДБЖ не тримає живлення, батарея зношена або потребує заміни)',
    'Ремонт проводів / з’єднань батареї\n(ДБЖ не виявляє батарею, перериває роботу від батареї або повідомляє про її помилку)',
    'Тест часу автономної роботи\n(перевірка, скільки ДБЖ насправді працює після зникнення живлення)',
  ]],
  ['naprawy-ladowanie-dc', 'Заряджання та живлення', [
    'Ремонт схеми заряджання\n(ДБЖ не заряджає акумулятори, заряджає їх надто повільно або повідомляє про помилку заряджання)',
    'Ремонт випрямляча / схеми PFC\n(ДБЖ не запускається від мережі, повідомляє про помилку живлення або не заряджає батарею)',
    'Ремонт допоміжного перетворювача\n(ДБЖ не запускається, перезавантажується або частина електроніки не працює)',
    'Заміна конденсаторів DC\n(ДБЖ працює нестабільно, вимикається або з’являються помилки секції живлення)',
  ]],
  ['naprawy-falownik', 'Інвертор і силова секція', [
    'Ремонт інвертора\n(ДБЖ не подає напругу, вимикається під навантаженням або переходить у стан помилки)',
    'Заміна силових транзисторів (MOSFET / IGBT)\n(ДБЖ не вмикає вихід, спрацьовує захист або повідомляє про помилку потужності)',
    'Ремонт силової секції\n(ДБЖ не живить пристрої, вимикається або працює нестабільно під навантаженням)',
    'Заміна конденсаторів AC\n(ДБЖ працює нестабільно, шумить або з’являються проблеми з вихідною напругою)',
    'Ремонт після перенапруги / грози\n(ДБЖ перестав працювати після грози, стрибка напруги або аварії мережі, відчувається запах гару або вибиває захист)',
  ]],
  ['naprawy-bypass', 'Bypass і перемикання', [
    'Ремонт схеми Static Bypass\n(ДБЖ не перемикається на bypass або повідомляє про помилку під час перемикання)',
    'Ремонт / заміна реле bypass\n(ДБЖ не перемикає живлення, перериває роботу або чутно неправильне перемикання)',
    'Ремонт схеми перемикання мережа / батарея\n(ДБЖ не переходить на батарею або не повертається на мережеве живлення)',
  ]],
  ['naprawy-elektronika', 'Електроніка та керування', [
    'Ремонт плати керування / основної плати\n(ДБЖ не запускається, зависає, перезавантажується або повідомляє про помилки керування)',
    'Ремонт схем керування, вимірювання та захисту\n(хибні показники, помилкові тривоги або неправильна робота захисту)',
    'Ремонт панелі керування / дисплея\n(дисплей не працює, кнопки не реагують або неможливо керувати ДБЖ)',
    'Ремонт плати живлення\n(ДБЖ не вмикається, перезавантажується або не живить частину схем)',
    'Оновлення / відновлення програмного забезпечення ДБЖ\n(помилка ПЗ, ДБЖ не запускається після невдалого оновлення або потребує новішої версії — якщо виробник її надає)',
  ]],
  ['naprawy-chlodzenie', 'Охолодження', [
    'Заміна вентилятора / вентиляторів\n(вентилятор шумить, не обертається або ДБЖ надмірно нагрівається)',
    'Ремонт керування охолодженням\n(вентилятори працюють постійно, не запускаються або ДБЖ повідомляє про перегрів)',
  ]],
  ['naprawy-komunikacja', 'Зв’язок і моніторинг', [
    'Ремонт / заміна мережевої карти SNMP\n(немає моніторингу ДБЖ, карта не відповідає або пристрій зникає з мережі)',
    'Ремонт комунікаційного інтерфейсу\n(немає зв’язку через USB, RS232 або мережу)',
    'Налаштування зв’язку ДБЖ\n(ДБЖ працює, але неправильно взаємодіє з комп’ютером, сервером або системою моніторингу)',
  ]],
]

const UPS_NAPRAWY_RU: NaprawyGroup[] = [
  ['naprawy-akumulatory', 'Батареи и аккумуляторы', [
    'Тестирование аккумуляторов / измерение сопротивления\n(ИБП недолго держит питание, сообщает о слабой батарее или быстро разряжается)',
    'Замена аккумуляторов + калибровка\n(ИБП не держит питание, батарея изношена или требует замены)',
    'Ремонт проводов / соединений батареи\n(ИБП не обнаруживает батарею, прерывает работу от батареи или сообщает о её ошибке)',
    'Тест времени автономной работы\n(проверка, сколько ИБП на самом деле работает после пропадания питания)',
  ]],
  ['naprawy-ladowanie-dc', 'Зарядка и питание', [
    'Ремонт схемы зарядки\n(ИБП не заряжает аккумуляторы, заряжает их слишком медленно или сообщает об ошибке зарядки)',
    'Ремонт выпрямителя / схемы PFC\n(ИБП не запускается от сети, сообщает об ошибке питания или не заряжает батарею)',
    'Ремонт вспомогательного преобразователя\n(ИБП не запускается, перезагружается или часть электроники не работает)',
    'Замена конденсаторов DC\n(ИБП работает нестабильно, выключается или появляются ошибки секции питания)',
  ]],
  ['naprawy-falownik', 'Инвертор и силовая секция', [
    'Ремонт инвертора\n(ИБП не подаёт напряжение, выключается под нагрузкой или переходит в состояние ошибки)',
    'Замена силовых транзисторов (MOSFET / IGBT)\n(ИБП не включает выход, срабатывает защита или сообщает об ошибке мощности)',
    'Ремонт силовой секции\n(ИБП не питает устройства, выключается или работает нестабильно под нагрузкой)',
    'Замена конденсаторов AC\n(ИБП работает нестабильно, шумит или появляются проблемы с выходным напряжением)',
    'Ремонт после перенапряжения / грозы\n(ИБП перестал работать после грозы, скачка напряжения или аварии сети, чувствуется запах гари или выбивает защиту)',
  ]],
  ['naprawy-bypass', 'Bypass и переключение', [
    'Ремонт схемы Static Bypass\n(ИБП не переключается на bypass или сообщает об ошибке при переключении)',
    'Ремонт / замена реле bypass\n(ИБП не переключает питание, прерывает работу или слышно неправильное переключение)',
    'Ремонт схемы переключения сеть / батарея\n(ИБП не переходит на батарею или не возвращается на сетевое питание)',
  ]],
  ['naprawy-elektronika', 'Электроника и управление', [
    'Ремонт платы управления / основной платы\n(ИБП не запускается, зависает, перезагружается или сообщает об ошибках управления)',
    'Ремонт схем управления, измерения и защиты\n(неверные показания, ложные тревоги или неправильная работа защиты)',
    'Ремонт панели управления / дисплея\n(дисплей не работает, кнопки не реагируют или невозможно управлять ИБП)',
    'Ремонт платы питания\n(ИБП не включается, перезагружается или не питает часть схем)',
    'Обновление / восстановление программного обеспечения ИБП\n(ошибка ПО, ИБП не запускается после неудачного обновления или требует более новой версии — если производитель её предоставляет)',
  ]],
  ['naprawy-chlodzenie', 'Охлаждение', [
    'Замена вентилятора / вентиляторов\n(вентилятор шумит, не вращается или ИБП чрезмерно нагревается)',
    'Ремонт управления охлаждением\n(вентиляторы работают постоянно, не запускаются или ИБП сообщает о перегреве)',
  ]],
  ['naprawy-komunikacja', 'Связь и мониторинг', [
    'Ремонт / замена сетевой карты SNMP\n(нет мониторинга ИБП, карта не отвечает или устройство пропадает из сети)',
    'Ремонт коммуникационного интерфейса\n(нет связи через USB, RS232 или сеть)',
    'Настройка связи ИБП\n(ИБП работает, но неправильно взаимодействует с компьютером, сервером или системой мониторинга)',
  ]],
]

// FAQ UPS: [pytanie, odpowiedź]
type FaqEntry = [title: string, answer: string]

const UPS_FAQ_PL: FaqEntry[] = [
  ['Jakie marki zasilaczy UPS naprawiacie?', 'Serwisujemy m.in. APC, Schneider Electric, Eaton, Powerware, Riello, Vertiv, Liebert, Emerson, MGE, Socomec, Delta, Ever, Fideltronik, CyberPower, PowerWalker, Legrand, AEG, ABB, GE, Siemens, G-Tec, Borri, Orvaldi, Salicru, Tripp Lite, Huawei, Mustek, Inform, Gamatronic, Chloride, Masterguard, Schrack, Cover, Aros i CES. Jeśli Twojej marki nie ma na liście, podaj nam producenta i dokładny model UPS-a.'],
  ['Jakie rodzaje UPS serwisujecie?', 'Serwisujemy zasilacze UPS Online / Double Conversion, Line-Interactive i Offline / Standby — od małych UPS-ów do komputerów i urządzeń biurowych, przez profesjonalne UPS-y do serwerowni, w tym rack 19”, po większe systemy przemysłowe. Naprawiamy zarówno zasilacze jednofazowe, jak i trójfazowe. Duże i trójfazowe UPS-y przyjmujemy do naszego serwisu i naprawiamy je w serwisie, bez wyjazdu do klienta. Zasilacze powyżej 10 kVA wyceniamy indywidualnie.'],
  ['UPS nie włącza się – co może być przyczyną?', 'Przyczyną może być m.in. uszkodzenie akumulatorów, układu zasilania, prostownika, przetwornicy, falownika, sekcji mocy albo elektroniki sterującej. Dokładną przyczynę określamy podczas diagnostyki.'],
  ['UPS działa, ale nie podtrzymuje zasilania – czy wystarczy wymienić baterię?', 'Nie zawsze. Najczęstszą przyczyną są zużyte akumulatory, ale problem może również dotyczyć układu ładowania, połączeń baterii, falownika lub elektroniki UPS-a.'],
  ['UPS cały czas przechodzi na bypass – co to oznacza?', 'Przyczyną może być przeciążenie, problem z falownikiem, parametrami zasilania, elektroniką sterującą albo samym układem bypass. Dokładną przyczynę ustalamy po diagnostyce.'],
  ['UPS piszczy lub pokazuje „Replace Battery” — co to oznacza?', 'Najczęściej oznacza to zużyte akumulatory, ale sygnał może też wskazywać na przeciążenie, pracę na baterii, przegrzanie lub usterkę układu ładowania. Dokładną przyczynę ustalamy podczas diagnostyki.'],
  ['Jak rozpoznać zużyte akumulatory w UPS?', 'Typowe objawy to krótki czas podtrzymania, nagłe wyłączenie po zaniku zasilania, komunikat o słabej baterii albo problem z przejściem na pracę bateryjną.'],
  ['Jak sprawdzacie stan akumulatorów UPS?', 'Stan akumulatorów możemy ocenić m.in. poprzez pomiar parametrów i rezystancji wewnętrznej oraz odpowiednie testy pracy urządzenia.'],
  ['Ile lat wytrzymują akumulatory w UPS?', 'Zwykle 3–5 lat, w zależności od jakości akumulatorów i warunków pracy. Najbardziej skraca ich żywotność wysoka temperatura — UPS najlepiej pracuje w chłodnym pomieszczeniu (około 20–25°C), z dala od grzejników i z odsłoniętymi otworami wentylacyjnymi.'],
  ['Czy trzeba wymieniać wszystkie akumulatory w UPS jednocześnie?', 'W systemach złożonych z kilku lub kilkunastu akumulatorów często zalecana jest wymiana całego zestawu. Ostateczna decyzja zależy od wieku, stanu i wyników pomiarów poszczególnych baterii.'],
  ['Czy można zamontować akumulatory innego producenta niż oryginalne?', 'Tak, jeśli mają odpowiednie napięcie, pojemność, technologię, wymiary i parametry pracy wymagane przez dany UPS.'],
  ['Czy po wymianie akumulatorów wykonujecie kalibrację UPS?', 'Jeżeli dany model wymaga kalibracji, resetu informacji o baterii lub dodatkowych testów po wymianie, wykonujemy niezbędne czynności w ramach usługi wymiany.'],
  ['Jakie podzespoły UPS naprawiacie?', 'Naprawiamy m.in. układy ładowania akumulatorów, płyty główne i elektronikę sterującą, układy pomiarowe i zabezpieczenia, wyświetlacze i panele sterowania, wentylatory, kondensatory AC i DC oraz komunikację SNMP, USB i RS232. Zakres naprawy ustalamy po diagnostyce.'],
  ['Czy naprawiacie sekcję mocy — falowniki, prostowniki, MOSFET/IGBT i bypass?', 'Tak. W zależności od konstrukcji urządzenia naprawiamy falowniki, prostowniki, układy PFC i przetwornice, wymieniamy tranzystory mocy MOSFET / IGBT oraz naprawiamy układy Static Bypass, przekaźniki i elementy odpowiedzialne za przełączanie pomiędzy zasilaniem sieciowym, bateryjnym i bypass.'],
  ['Ile trwa naprawa zasilacza UPS?', 'Większość napraw wykonujemy w ciągu 1–3 dni od akceptacji wyceny. Jeżeli potrzebne są części, których nie mamy na miejscu, czas naprawy może się wydłużyć — informujemy o tym przy wycenie. W pilnych przypadkach, jeśli to możliwe, przyspieszamy naprawę bez dodatkowej opłaty.'],
  ['Ile kosztuje naprawa UPS i od czego zależy cena?', 'Cena zależy od rodzaju usterki i mocy zasilacza — w cenniku podajemy osobne ceny dla UPS do 1 kVA, 1–3 kVA i 3–10 kVA. Dokładny koszt naprawy otrzymasz po diagnostyce, przed rozpoczęciem prac. Zasilacze powyżej 10 kVA wyceniamy indywidualnie.'],
  ['Czy diagnoza jest płatna?', 'Diagnoza jest bezpłatna, jeżeli po otrzymaniu wyceny zdecydujesz się na naprawę. W przypadku rezygnacji z naprawy pobieramy opłatę za diagnozę zgodnie z cennikiem — zależną od mocy zasilacza.'],
  ['Czy przed naprawą otrzymam wycenę?', 'Tak. Najpierw diagnozujemy urządzenie i przedstawiamy zakres oraz koszt naprawy. Naprawę realizujemy po zaakceptowaniu wyceny.'],
  ['Czy UPS jest testowany po naprawie?', 'Tak. Po naprawie wykonujemy testy odpowiednie do rodzaju wykonanych prac. Jeżeli do prawidłowego zakończenia naprawy potrzebny jest test pod obciążeniem lub kalibracja, są one częścią naprawy i nie doliczamy ich ponownie jako osobnej usługi.'],
  ['Jaką gwarancję dajecie na naprawę UPS?', 'Na wykonaną naprawę udzielamy 6 miesięcy gwarancji, a na nowe akumulatory wymienione w naszym serwisie — 12 miesięcy.'],
  ['Co jeśli usterka powróci?', 'Jeżeli ta sama usterka powróci w okresie gwarancji, ponownie diagnozujemy i naprawiamy urządzenie bezpłatnie.'],
  ['Jak często należy wykonywać przegląd UPS?', 'W typowych warunkach warto wykonywać przegląd co najmniej raz w roku. W przypadku intensywnej eksploatacji, wysokiej temperatury, zapylenia lub infrastruktury krytycznej przeglądy mogą być potrzebne częściej.'],
  ['Co obejmuje przegląd i konserwacja UPS?', 'Może obejmować czyszczenie wnętrza urządzenia, kontrolę połączeń, elektroniki, kondensatorów i wentylatorów, kontrolę akumulatorów, pomiary parametrów, analizę błędów oraz testy pracy sieciowej, bateryjnej i bypass.'],
  ['Czy wystawiacie fakturę VAT i obsługujecie firmy?', 'Tak, wystawiamy fakturę VAT. Dla firm możliwe są też regularne przeglądy okresowe UPS i stała obsługa serwisowa — zakres i terminy ustalamy indywidualnie. Przeglądy i naprawy wykonujemy w naszym serwisie.'],
  ['Czy mogę wysłać UPS do serwisu kurierem?', 'Tak, UPS można wysłać do serwisu kurierem z całej Polski. Przed wysyłką wyłącz UPS i odłącz go od zasilania, zapakuj w solidny karton (najlepiej oryginalny) i zabezpiecz wypełnieniem tak, aby nie przesuwał się w środku — akumulatory sprawiają, że UPS jest ciężki. W przypadku dużych lub ciężkich urządzeń (np. rack lub z modułami bateryjnymi) skontaktuj się z nami przed wysyłką. Możesz też dostarczyć UPS do serwisu osobiście lub zamówić odbiór i dostawę według cennika (sekcja „Dojazd”).'],
  ['Czy warto naprawiać starszy UPS?', 'Zależy to od rodzaju uszkodzenia, stanu urządzenia, dostępności części oraz kosztu naprawy. Po diagnostyce można ocenić, czy naprawa jest ekonomicznie uzasadniona w porównaniu z wymianą urządzenia.'],
]

const UPS_FAQ_UK: FaqEntry[] = [
  ['Які марки ДБЖ (UPS) ви ремонтуєте?', 'Обслуговуємо, зокрема, APC, Schneider Electric, Eaton, Powerware, Riello, Vertiv, Liebert, Emerson, MGE, Socomec, Delta, Ever, Fideltronik, CyberPower, PowerWalker, Legrand, AEG, ABB, GE, Siemens, G-Tec, Borri, Orvaldi, Salicru, Tripp Lite, Huawei, Mustek, Inform, Gamatronic, Chloride, Masterguard, Schrack, Cover, Aros і CES. Якщо вашої марки немає в списку, повідомте нам виробника та точну модель ДБЖ.'],
  ['Які типи ДБЖ ви обслуговуєте?', 'Обслуговуємо ДБЖ Online / Double Conversion, Line-Interactive та Offline / Standby — від малих ДБЖ для комп’ютерів і офісної техніки, через професійні ДБЖ для серверних, зокрема стійкові rack 19”, до більших промислових систем. Ремонтуємо як однофазні, так і трифазні ДБЖ. Великі та трифазні ДБЖ приймаємо в наш сервіс і ремонтуємо їх у сервісі, без виїзду до клієнта. ДБЖ понад 10 kVA оцінюємо індивідуально.'],
  ['ДБЖ не вмикається — що може бути причиною?', 'Причиною може бути, зокрема, пошкодження акумуляторів, схеми живлення, випрямляча, перетворювача, інвертора, силової секції або електроніки керування. Точну причину визначаємо під час діагностики.'],
  ['ДБЖ працює, але не тримає живлення — чи достатньо замінити батарею?', 'Не завжди. Найчастіше причина у зношених акумуляторах, але проблема може стосуватися також схеми заряджання, з’єднань батареї, інвертора або електроніки ДБЖ.'],
  ['ДБЖ постійно переходить на bypass — що це означає?', 'Причиною може бути перевантаження, проблема з інвертором, параметрами живлення, електронікою керування або самою схемою bypass. Точну причину встановлюємо після діагностики.'],
  ['ДБЖ пищить або показує «Replace Battery» — що це означає?', 'Найчастіше це означає зношені акумулятори, але сигнал може також вказувати на перевантаження, роботу від батареї, перегрів або несправність схеми заряджання. Точну причину встановлюємо під час діагностики.'],
  ['Як розпізнати зношені акумулятори в ДБЖ?', 'Типові ознаки — короткий час автономної роботи, раптове вимкнення після зникнення живлення, повідомлення про слабку батарею або проблеми з переходом на роботу від батареї.'],
  ['Як ви перевіряєте стан акумуляторів ДБЖ?', 'Стан акумуляторів можемо оцінити, зокрема, вимірюванням параметрів і внутрішнього опору, а також відповідними тестами роботи пристрою.'],
  ['Скільки років служать акумулятори в ДБЖ?', 'Зазвичай 3–5 років — залежно від якості акумуляторів і умов роботи. Найбільше скорочує їхній термін служби висока температура — ДБЖ найкраще працює в прохолодному приміщенні (близько 20–25°C), подалі від радіаторів опалення та з відкритими вентиляційними отворами.'],
  ['Чи потрібно замінювати всі акумулятори в ДБЖ одночасно?', 'У системах із кількох або кільканадцяти акумуляторів часто рекомендується замінювати весь комплект. Остаточне рішення залежить від віку, стану та результатів вимірювань окремих батарей.'],
  ['Чи можна встановити акумулятори іншого виробника, ніж оригінальні?', 'Так, якщо вони мають відповідну напругу, ємність, технологію, розміри та робочі параметри, яких вимагає конкретний ДБЖ.'],
  ['Чи виконуєте ви калібрування ДБЖ після заміни акумуляторів?', 'Якщо конкретна модель потребує калібрування, скидання інформації про батарею або додаткових тестів після заміни, виконуємо необхідні дії в межах послуги заміни.'],
  ['Які вузли ДБЖ ви ремонтуєте?', 'Ремонтуємо, зокрема, схеми заряджання акумуляторів, основні плати та електроніку керування, вимірювальні схеми й захист, дисплеї та панелі керування, вентилятори, конденсатори AC і DC, а також зв’язок SNMP, USB і RS232. Обсяг ремонту визначаємо після діагностики.'],
  ['Чи ремонтуєте ви силову секцію — інвертори, випрямлячі, MOSFET/IGBT і bypass?', 'Так. Залежно від конструкції пристрою ремонтуємо інвертори, випрямлячі, схеми PFC і перетворювачі, замінюємо силові транзистори MOSFET / IGBT, а також ремонтуємо схеми Static Bypass, реле та елементи, що відповідають за перемикання між мережевим живленням, батареєю та bypass.'],
  ['Скільки триває ремонт ДБЖ?', 'Більшість ремонтів виконуємо протягом 1–3 днів після погодження кошторису. Якщо потрібні запчастини, яких немає в наявності, час ремонту може збільшитися — повідомляємо про це під час оцінки. У термінових випадках, якщо це можливо, пришвидшуємо ремонт без додаткової оплати.'],
  ['Скільки коштує ремонт ДБЖ і від чого залежить ціна?', 'Ціна залежить від виду несправності та потужності ДБЖ — у прайсі вказуємо окремі ціни для ДБЖ до 1 kVA, 1–3 kVA і 3–10 kVA. Точну вартість ремонту ви отримаєте після діагностики, перед початком робіт. ДБЖ понад 10 kVA оцінюємо індивідуально.'],
  ['Чи платна діагностика?', 'Діагностика безкоштовна, якщо після отримання кошторису ви погоджуєтеся на ремонт. У разі відмови від ремонту стягуємо плату за діагностику згідно з прайсом — залежно від потужності ДБЖ.'],
  ['Чи отримаю я кошторис перед ремонтом?', 'Так. Спочатку діагностуємо пристрій і повідомляємо обсяг та вартість ремонту. Ремонт виконуємо після погодження кошторису.'],
  ['Чи тестується ДБЖ після ремонту?', 'Так. Після ремонту виконуємо тести, що відповідають виду виконаних робіт. Якщо для правильного завершення ремонту потрібен тест під навантаженням або калібрування, вони входять у ремонт, і ми не нараховуємо їх повторно як окрему послугу.'],
  ['Яку гарантію ви надаєте на ремонт ДБЖ?', 'На виконаний ремонт надаємо 6 місяців гарантії, а на нові акумулятори, замінені в нашому сервісі, — 12 місяців.'],
  ['Що, якщо несправність повториться?', 'Якщо та сама несправність повториться в гарантійний період, ми повторно діагностуємо та ремонтуємо пристрій безкоштовно.'],
  ['Як часто потрібно проводити огляд ДБЖ?', 'У звичайних умовах варто проводити огляд щонайменше раз на рік. За інтенсивної експлуатації, високої температури, запиленості або для критичної інфраструктури огляди можуть бути потрібні частіше.'],
  ['Що входить в огляд і обслуговування ДБЖ?', 'Може включати чищення внутрішньої частини пристрою, перевірку з’єднань, електроніки, конденсаторів і вентиляторів, перевірку акумуляторів, вимірювання параметрів, аналіз помилок, а також тести роботи від мережі, від батареї та в режимі bypass.'],
  ['Чи виставляєте ви фактуру VAT і чи обслуговуєте фірми?', 'Так, виставляємо фактуру VAT. Для фірм також можливі регулярні періодичні огляди ДБЖ і постійне сервісне обслуговування — обсяг і терміни узгоджуємо індивідуально. Огляди та ремонти виконуємо в нашому сервісі.'],
  ['Чи можна надіслати ДБЖ у сервіс кур’єром?', 'Так, ДБЖ можна надіслати в сервіс кур’єром з усієї Польщі. Перед відправкою вимкніть ДБЖ і від’єднайте його від живлення, запакуйте в міцну коробку (найкраще оригінальну) та закріпіть наповнювачем, щоб він не переміщувався всередині — через акумулятори ДБЖ важкий. Якщо пристрій великий або важкий (наприклад, rack або з батарейними модулями), зв’яжіться з нами перед відправкою. Ви також можете доставити ДБЖ у сервіс особисто або замовити забір і доставку згідно з прайсом.'],
  ['Чи варто ремонтувати старіший ДБЖ?', 'Це залежить від виду пошкодження, стану пристрою, наявності запчастин і вартості ремонту. Після діагностики можна оцінити, чи ремонт економічно виправданий порівняно із заміною пристрою.'],
]

const UPS_FAQ_RU: FaqEntry[] = [
  ['Какие марки ИБП (UPS) вы ремонтируете?', 'Обслуживаем, в частности, APC, Schneider Electric, Eaton, Powerware, Riello, Vertiv, Liebert, Emerson, MGE, Socomec, Delta, Ever, Fideltronik, CyberPower, PowerWalker, Legrand, AEG, ABB, GE, Siemens, G-Tec, Borri, Orvaldi, Salicru, Tripp Lite, Huawei, Mustek, Inform, Gamatronic, Chloride, Masterguard, Schrack, Cover, Aros и CES. Если вашей марки нет в списке, сообщите нам производителя и точную модель ИБП.'],
  ['Какие типы ИБП вы обслуживаете?', 'Обслуживаем ИБП Online / Double Conversion, Line-Interactive и Offline / Standby — от небольших ИБП для компьютеров и офисной техники, через профессиональные ИБП для серверных, в том числе стоечные rack 19”, до более крупных промышленных систем. Ремонтируем как однофазные, так и трёхфазные ИБП. Крупные и трёхфазные ИБП принимаем в наш сервис и ремонтируем их в сервисе, без выезда к клиенту. ИБП мощнее 10 kVA оцениваем индивидуально.'],
  ['ИБП не включается — что может быть причиной?', 'Причиной может быть, в частности, повреждение аккумуляторов, схемы питания, выпрямителя, преобразователя, инвертора, силовой секции или электроники управления. Точную причину определяем во время диагностики.'],
  ['ИБП работает, но не держит питание — достаточно ли заменить батарею?', 'Не всегда. Чаще всего причина в изношенных аккумуляторах, но проблема может касаться также схемы зарядки, соединений батареи, инвертора или электроники ИБП.'],
  ['ИБП постоянно переходит на bypass — что это значит?', 'Причиной может быть перегрузка, проблема с инвертором, параметрами питания, электроникой управления или самой схемой bypass. Точную причину устанавливаем после диагностики.'],
  ['ИБП пищит или показывает «Replace Battery» — что это значит?', 'Чаще всего это означает изношенные аккумуляторы, но сигнал может также указывать на перегрузку, работу от батареи, перегрев или неисправность схемы зарядки. Точную причину устанавливаем во время диагностики.'],
  ['Как распознать изношенные аккумуляторы в ИБП?', 'Типичные признаки — короткое время автономной работы, внезапное отключение после пропадания питания, сообщение о слабой батарее или проблемы с переходом на работу от батареи.'],
  ['Как вы проверяете состояние аккумуляторов ИБП?', 'Состояние аккумуляторов можем оценить, в частности, измерением параметров и внутреннего сопротивления, а также соответствующими тестами работы устройства.'],
  ['Сколько лет служат аккумуляторы в ИБП?', 'Обычно 3–5 лет — в зависимости от качества аккумуляторов и условий работы. Сильнее всего сокращает их срок службы высокая температура — ИБП лучше всего работает в прохладном помещении (около 20–25°C), вдали от батарей отопления и с открытыми вентиляционными отверстиями.'],
  ['Нужно ли менять все аккумуляторы в ИБП одновременно?', 'В системах из нескольких или более десятка аккумуляторов часто рекомендуется замена всего комплекта. Окончательное решение зависит от возраста, состояния и результатов измерений отдельных батарей.'],
  ['Можно ли установить аккумуляторы другого производителя, чем оригинальные?', 'Да, если они имеют соответствующее напряжение, ёмкость, технологию, размеры и рабочие параметры, требуемые конкретным ИБП.'],
  ['Выполняете ли вы калибровку ИБП после замены аккумуляторов?', 'Если конкретная модель требует калибровки, сброса информации о батарее или дополнительных тестов после замены, выполняем необходимые действия в рамках услуги замены.'],
  ['Какие узлы ИБП вы ремонтируете?', 'Ремонтируем, в частности, схемы зарядки аккумуляторов, основные платы и электронику управления, измерительные схемы и защиту, дисплеи и панели управления, вентиляторы, конденсаторы AC и DC, а также связь SNMP, USB и RS232. Объём ремонта определяем после диагностики.'],
  ['Ремонтируете ли вы силовую секцию — инверторы, выпрямители, MOSFET/IGBT и bypass?', 'Да. В зависимости от конструкции устройства ремонтируем инверторы, выпрямители, схемы PFC и преобразователи, заменяем силовые транзисторы MOSFET / IGBT, а также ремонтируем схемы Static Bypass, реле и элементы, отвечающие за переключение между сетевым питанием, батареей и bypass.'],
  ['Сколько длится ремонт ИБП?', 'Большинство ремонтов выполняем в течение 1–3 дней после согласования сметы. Если нужны запчасти, которых нет в наличии, время ремонта может увеличиться — сообщаем об этом при оценке. В срочных случаях, если это возможно, ускоряем ремонт без дополнительной оплаты.'],
  ['Сколько стоит ремонт ИБП и от чего зависит цена?', 'Цена зависит от вида неисправности и мощности ИБП — в прайсе указываем отдельные цены для ИБП до 1 kVA, 1–3 kVA и 3–10 kVA. Точную стоимость ремонта вы получите после диагностики, до начала работ. ИБП мощнее 10 kVA оцениваем индивидуально.'],
  ['Платная ли диагностика?', 'Диагностика бесплатна, если после получения сметы вы соглашаетесь на ремонт. В случае отказа от ремонта взимаем плату за диагностику согласно прайсу — в зависимости от мощности ИБП.'],
  ['Получу ли я смету перед ремонтом?', 'Да. Сначала диагностируем устройство и сообщаем объём и стоимость ремонта. Ремонт выполняем после согласования сметы.'],
  ['Тестируется ли ИБП после ремонта?', 'Да. После ремонта выполняем тесты, соответствующие виду выполненных работ. Если для правильного завершения ремонта нужен тест под нагрузкой или калибровка, они входят в ремонт, и мы не начисляем их повторно как отдельную услугу.'],
  ['Какую гарантию вы даёте на ремонт ИБП?', 'На выполненный ремонт даём 6 месяцев гарантии, а на новые аккумуляторы, заменённые в нашем сервисе, — 12 месяцев.'],
  ['Что, если неисправность повторится?', 'Если та же неисправность повторится в гарантийный период, мы повторно диагностируем и ремонтируем устройство бесплатно.'],
  ['Как часто нужно проводить осмотр ИБП?', 'В обычных условиях стоит проводить осмотр не реже одного раза в год. При интенсивной эксплуатации, высокой температуре, запылённости или для критической инфраструктуры осмотры могут требоваться чаще.'],
  ['Что входит в осмотр и обслуживание ИБП?', 'Может включать чистку внутренней части устройства, проверку соединений, электроники, конденсаторов и вентиляторов, проверку аккумуляторов, измерение параметров, анализ ошибок, а также тесты работы от сети, от батареи и в режиме bypass.'],
  ['Выставляете ли вы фактуру VAT и обслуживаете ли фирмы?', 'Да, выставляем фактуру VAT. Для фирм также возможны регулярные периодические осмотры ИБП и постоянное сервисное обслуживание — объём и сроки согласовываем индивидуально. Осмотры и ремонты выполняем в нашем сервисе.'],
  ['Можно ли отправить ИБП в сервис курьером?', 'Да, ИБП можно отправить в сервис курьером из любой точки Польши. Перед отправкой выключите ИБП и отключите его от сети, упакуйте в прочную коробку (лучше оригинальную) и зафиксируйте наполнителем, чтобы он не перемещался внутри — из-за аккумуляторов ИБП тяжёлый. Если устройство большое или тяжёлое (например, rack или с батарейными модулями), свяжитесь с нами перед отправкой. Вы также можете привезти ИБП в сервис лично или заказать забор и доставку согласно прайсу.'],
  ['Стоит ли ремонтировать более старый ИБП?', 'Это зависит от вида повреждения, состояния устройства, наличия запчастей и стоимости ремонта. После диагностики можно оценить, оправдан ли ремонт экономически по сравнению с заменой устройства.'],
]

const withUps = (sections: PricingSection[], konserwacja: string, naprawy: NaprawyGroup[], faq: FaqEntry[], courier: string): PricingSection[] =>
  sections.map(section => {
    if (section.id === 'dojazd') return { ...section, items: [...(section.items ?? []), { service: courier }] }
    if (section.id === 'konserwacja') return { ...section, items: [{ service: konserwacja }] }
    if (section.id === 'faq') {
      return { ...section, subcategories: faq.map(([title, answer], i) => ({ id: `faq-${i + 1}`, title, items: [], answer })) }
    }
    if (section.id === 'naprawy') {
      return {
        ...section,
        subcategories: naprawy.map(([id, title, items]) => ({ id, title, items: items.map(service => ({ service })) })),
      }
    }
    return section
  })

export const createUpsPricingSections = (): PricingSection[] =>
  withUps(createNiszczarkiPricingSections(), UPS_KONSERWACJA_PL, UPS_NAPRAWY_PL, UPS_FAQ_PL, 'Wysyłka kurierem z całej Polski\n(UPS możesz wysłać do serwisu kurierem, a po naprawie odeślemy go tą samą drogą)')

export const upsPricingSectionsUk = (): PricingSection[] =>
  withUps(niszczarkiPricingSectionsUk(), UPS_KONSERWACJA_UK, UPS_NAPRAWY_UK, UPS_FAQ_UK, 'Відправка кур’єром з усієї Польщі\n(ДБЖ можна надіслати в сервіс кур’єром, а після ремонту ми повернемо його так само)')

export const upsPricingSectionsRu = (): PricingSection[] =>
  withUps(niszczarkiPricingSectionsRu(), UPS_KONSERWACJA_RU, UPS_NAPRAWY_RU, UPS_FAQ_RU, 'Отправка курьером из любой точки Польши\n(ИБП можно отправить в сервис курьером, а после ремонта мы вернём его тем же способом)')
