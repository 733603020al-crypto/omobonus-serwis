import type { PricingSection } from './services-data-types'
import { createNiszczarkiPricingSections } from './services-data-niszczarki'
import { niszczarkiPricingSectionsUk } from './services-data-uk-niszczarki'
import { niszczarkiPricingSectionsEn } from './services-data-en-niszczarki'
import { niszczarkiPricingSectionsRu } from './services-data-ru-niszczarki'

// naprawa-projektorow — strona zbudowana na szkielecie serwis-niszczarek (diagnoza i dojazd).
// Konserwacja, naprawy (małe / średnie / duże) i FAQ — docelowe treści projektorów
// (ceny i terminy w services-pricing-data.ts). PL — źródło, UK/RU — tłumaczenia poniżej.
// Strona w noindexSlugs, poza menu/główną/sitemap.

const PROJEKTORY_KONSERWACJA_PL =
  'CZYSZCZENIE I KONSERWACJA [[kompleksowe ]]czyszczenie, kontrola i test urządzenia\n• czyszczenie wnętrza projektora z kurzu i zabrudzeń;\n• czyszczenie układu chłodzenia i wentylatorów;\n• czyszczenie lub kontrola filtrów powietrza;\n• czyszczenie dostępnych elementów układu optycznego;\n• wymiana pasty termoprzewodzącej układu DMD (w projektorach DLP, których konstrukcja tego wymaga);\n• kontrola układu zasilania i elektroniki;\n• kontrola temperatury i pracy wentylatorów;\n• kontrola jakości obrazu, jasności i kolorów;\n• kontrola złączy i podstawowych funkcji urządzenia;\n• końcowy test działania i zalecenia serwisowe.'

type NaprawyGroup = [id: string, title: string, items: string[]]

const PROJEKTORY_NAPRAWY_PL: NaprawyGroup[] = [
  ['naprawy-lampy', 'Lampy i źródła światła', [
    'Wymiana lampy projektora\n(obraz jest ciemny, lampa nie świeci lub projektor sygnalizuje konieczność jej wymiany)',
    'Naprawa układu zapłonowego lampy (balastu)\n(lampa nie zapala się, gaśnie po uruchomieniu lub projektor zgłasza błąd lampy)',
    'Naprawa zasilania modułu LED / laser\n(źródło światła nie uruchamia się, gaśnie lub działa niestabilnie)',
    'Wymiana modułu źródła światła LED / laser\n(projektor nie wyświetla obrazu lub źródło światła jest uszkodzone)',
  ]],
  ['naprawy-zasilanie', 'Zasilanie i elektronika', [
    'Naprawa zasilacza projektora\n(projektor nie włącza się, samoczynnie się wyłącza lub nie reaguje na przycisk zasilania)',
    'Naprawa płyty głównej\n(projektor nie uruchamia się, zawiesza się lub nie działają jego podstawowe funkcje)',
    'Naprawa układów sterowania\n(projektor nie reaguje na polecenia, przyciski lub nieprawidłowo steruje podzespołami)',
    'Wymiana modułu elektronicznego\n(uszkodzony moduł powoduje brak działania określonych funkcji projektora)',
  ]],
  ['naprawy-optyka', 'Układ optyczny i obraz', [
    'Wymiana układu DMD\n(na obrazie pojawiają się białe lub czarne kropki, które stopniowo się mnożą)',
    'Wymiana koła kolorów\n(obraz ma nieprawidłowe kolory, migocze lub projektor wydaje nietypowe dźwięki)',
    'Wymiana matrycy LCD / panelu obrazowego\n(na obrazie występują przebarwienia, plamy, pasy lub brak jednego z kolorów)',
    'Wymiana polaryzatora\n(na obrazie pojawiają się żółte, różowe lub fioletowe przebarwienia)',
    'Ultradźwiękowe czyszczenie polaryzatorów\n(na obrazie projektora LCD widać plamy lub przebarwienia z powodu zabrudzenia polaryzatorów; wykonujemy, gdy materiał i konstrukcja elementu na to pozwalają)',
    'Naprawa tunelu świetlnego\n(na obrazie widać ciemne pasy, cienie lub nierównomierne oświetlenie)',
    'Naprawa lub wymiana modułu optycznego\n(obraz jest zniekształcony, nierównomiernie oświetlony lub ma trwałe plamy)',
    'Regulacja układu optycznego\n(obraz jest nieostry, nierówny lub nie można uzyskać prawidłowej ostrości)',
  ]],
  ['naprawy-chlodzenie', 'Chłodzenie i wentylacja', [
    'Wymiana wentylatora\n(wentylator hałasuje, nie obraca się lub projektor zgłasza błąd chłodzenia)',
    'Naprawa układu chłodzenia\n(projektor przegrzewa się, wyłącza podczas pracy lub zgłasza błąd temperatury)',
    'Naprawa sterowania wentylatorami\n(wentylatory pracują z nieprawidłową prędkością lub nie uruchamiają się)',
    'Wymiana czujnika temperatury\n(projektor zgłasza błąd temperatury lub wyłącza się mimo prawidłowego chłodzenia)',
  ]],
  ['naprawy-zlacza', 'Złącza i komunikacja', [
    'Naprawa lub wymiana gniazda HDMI\n(projektor nie wykrywa urządzenia, obraz zanika lub gniazdo jest uszkodzone)',
    'Naprawa gniazd USB / VGA / audio\n(podłączone urządzenia nie działają, brak obrazu lub dźwięku przez dane złącze)',
    'Naprawa modułu Wi-Fi / Bluetooth\n(projektor nie łączy się z siecią lub nie wykrywa urządzeń bezprzewodowych)',
    'Naprawa układów komunikacji i przesyłania obrazu\n(projektor nie odbiera sygnału, traci połączenie lub nieprawidłowo wyświetla obraz z wejścia)',
  ]],
  ['naprawy-mechanika', 'Mechanika i obudowa', [
    'Naprawa przycisków i panelu sterowania\n(przyciski nie reagują, zacinają się lub panel sterowania nie działa)',
    'Naprawa mechanizmu ostrości i zoomu\n(nie można wyostrzyć obrazu lub zmienić jego wielkości)',
    'Naprawa mechanizmu przesuwu obiektywu (lens shift)\n(nie można przesunąć obrazu za pomocą regulacji położenia obiektywu)',
    'Wymiana uszkodzonych elementów obudowy\n(obudowa jest pęknięta, mocowania uszkodzone lub elementy nie trzymają się prawidłowo)',
  ]],
  ['naprawy-oprogramowanie', 'Oprogramowanie i konfiguracja', [
    'Przywracanie ustawień i konfiguracja projektora\n(nieprawidłowe ustawienia powodują problemy z obrazem lub działaniem urządzenia)',
    'Aktualizacja lub przywracanie oprogramowania (firmware)\n(projektor zawiesza się, działa niestabilnie lub występują błędy oprogramowania)',
    'Diagnostyka i usuwanie błędów systemowych\n(projektor wyświetla komunikaty o błędach, nie uruchamia funkcji lub działa nieprawidłowo)',
  ]],
]

type FaqEntry = [title: string, answer: string]

const PROJEKTORY_FAQ_PL: FaqEntry[] = [
  ['Jakie marki projektorów naprawiacie?', 'Naprawiamy projektory wszystkich marek, m.in. Epson, BenQ, Optoma, Acer, Sony, Panasonic, ViewSonic, Samsung, LG, Xiaomi, Philips, NEC, Sharp, Vivitek, JVC, Canon, XGIMI i Hisense. Obsługujemy projektory multimedialne (rzutniki) domowe, biurowe i szkolne oraz profesjonalne urządzenia instalacyjne.'],
  ['Czy naprawiacie projektory innych, mniej popularnych marek?', 'Tak. Serwisujemy również projektory ASUS, JMGO, Wanbo, Dangbei, Anker Nebula, Overmax, Kiano, Kodak, Barco, Christie, EIKI, Ricoh, Hitachi, Sanyo, Mitsubishi, Casio, InFocus, Toshiba, Dell, HP, Lenovo, 3M, ASK Proxima, Boxlight, PLUS, Digital Projection, SIM2, Projectiondesign, Runco i Marantz. Możliwość konkretnej naprawy zależy od rodzaju usterki i dostępności części.'],
  ['Czy naprawiacie stare projektory, do których trudno znaleźć części?', 'Tak, przyjmujemy również starsze i wycofane z produkcji modele. Sprawdzamy możliwość naprawy istniejących podzespołów lub pozyskania odpowiednich części. Jeśli naprawa okaże się nieopłacalna, informujemy o tym przed rozpoczęciem prac.'],
  ['Czy naprawiacie projektory laserowe, LED, LCD i DLP?', 'Tak. Obsługujemy projektory wykorzystujące lampy, diody LED i laserowe źródła światła oraz technologie obrazu DLP, LCD i 3LCD. Zakres naprawy zależy od konstrukcji konkretnego modelu.'],
  ['Dlaczego projektor nie włącza się lub wyłącza po kilku minutach?', 'Przyczyną może być uszkodzony zasilacz, układ zapłonowy lampy, wentylator, czujnik temperatury lub elektronika sterująca. Projektor może także wyłączać się z powodu przegrzewania. Dokładną przyczynę ustalamy podczas diagnostyki. Na diagnostykę przyjmujemy również projektory po zalaniu, upadku lub skoku napięcia.'],
  ['Dlaczego projektor działa, ale nie wyświetla obrazu?', 'Problem może wynikać z uszkodzenia źródła światła, układu optycznego, elektroniki lub wejścia sygnałowego. Czasami przyczyną jest nieprawidłowo wybrane wejście HDMI albo uszkodzony przewód. Jeśli podstawowe sprawdzenie połączeń nie pomaga, potrzebna jest diagnostyka.'],
  ['Skąd biorą się białe lub czarne kropki na obrazie projektora?', 'W projektorach DLP nieruchome białe lub czarne kropki mogą świadczyć o uszkodzeniu mikroluster układu DMD. Zwykle konieczna jest wymiana uszkodzonego układu, po wcześniejszym potwierdzeniu usterki.'],
  ['Dlaczego projektor wyświetla żółte, różowe lub fioletowe plamy?', 'Przebarwienia mogą być skutkiem zużycia polaryzatorów, uszkodzenia paneli LCD lub problemów z układem optycznym. Przyczynę ustalamy na podstawie rodzaju przebarwień i konstrukcji projektora. W projektorach LCD przebarwienia mogą też wynikać z zabrudzenia polaryzatorów — jeśli materiał i konstrukcja elementu na to pozwalają, można je oczyścić ultradźwiękowo; w przeciwnym razie może być potrzebna wymiana polaryzatora.'],
  ['Dlaczego projektor głośno pracuje lub przegrzewa się?', 'Najczęstsze możliwe przyczyny to zabrudzone filtry, nagromadzony kurz, ograniczony przepływ powietrza lub niesprawny wentylator. W takich przypadkach może być potrzebna konserwacja układu chłodzenia albo naprawa uszkodzonego podzespołu.'],
  ['Co oznacza migająca dioda LAMP lub TEMP?', 'Dioda LAMP zwykle wskazuje na problem z lampą lub jej zasilaczem (balastem), a TEMP — na przegrzewanie: zabrudzony układ chłodzenia, niesprawny wentylator lub czujnik temperatury. Dokładne znaczenie sygnałów zależy od modelu projektora, dlatego przyczynę potwierdzamy podczas diagnostyki.'],
  ['Czy zawsze trzeba wymieniać lampę, gdy obraz jest zbyt ciemny?', 'Nie. Słaby obraz może być spowodowany zużyciem lampy, ale również zabrudzeniem optyki, uszkodzeniem polaryzatorów lub innymi problemami. Przed wymianą lampy warto sprawdzić rzeczywistą przyczynę spadku jasności. Przy wymianie montujemy lampy oryginalne, zamienniki lub lampę dostarczoną przez Klienta. Wymiana lampy trwa zwykle 1–3 dni.'],
  ['Czy naprawiacie projektory z uszkodzonym HDMI?', 'Tak. Diagnozujemy i naprawiamy uszkodzone gniazda HDMI oraz układy odpowiedzialne za odbiór sygnału. Jeśli projektor nie wykrywa komputera lub obraz zanika, sprawdzamy również inne możliwe przyczyny.'],
  ['Na czym polega czyszczenie i konserwacja projektora?', 'Usługa obejmuje czyszczenie wnętrza, układu chłodzenia, wentylatorów, filtrów i dostępnych elementów optycznych. W projektorach DLP, których konstrukcja tego wymaga, wymieniamy też pastę termoprzewodzącą układu DMD. Sprawdzamy także działanie elektroniki, temperaturę pracy i jakość wyświetlanego obrazu. Zakres czynności dostosowujemy do konstrukcji urządzenia.'],
  ['Jak często czyścić projektor?', 'To zależy od warunków pracy. W domu lub biurze zwykle wystarcza czyszczenie raz w roku. W zapylonym pomieszczeniu, przy codziennej wielogodzinnej pracy lub w obecności zwierząt warto robić to częściej. Sygnałem do czyszczenia są głośniejsza praca wentylatorów, komunikaty o temperaturze i spadek jasności obrazu.'],
  ['Ile kosztuje diagnoza projektora?', 'Wstępna konsultacja online oraz wstępna diagnoza przy dostarczeniu urządzenia są bezpłatne. Pełna diagnoza jest również bezpłatna w przypadku realizacji naprawy. Przy rezygnacji z naprawy koszt wynosi 60 / 100 / 180 zł, zależnie od kategorii projektora.'],
  ['Ile kosztuje naprawa projektora?', 'Koszt zależy od rodzaju usterki i kategorii urządzenia. Ceny poszczególnych prac znajdują się w naszym cenniku, z podziałem na projektory kompaktowe, domowe i biurowe oraz profesjonalne i instalacyjne. Ceny w cenniku dotyczą wykonania usługi — jeśli naprawa wymaga części, ich koszt doliczamy osobno. Koszt części ustalamy po diagnostyce konkretnego modelu, a przed naprawą przedstawiamy zakres prac i pełny koszt.'],
  ['Czy przed naprawą poznam jej koszt?', 'Tak. Po diagnostyce przedstawiamy zakres prac i pełny koszt naprawy, wraz z kosztem potrzebnych części. Naprawę rozpoczynamy dopiero po akceptacji kosztów przez Klienta. Jeśli zdecydujesz się na naprawę, diagnoza jest bezpłatna. Jeśli zrezygnujesz, płacisz tylko za diagnozę: 60 / 100 / 180 zł, zależnie od kategorii projektora.'],
  ['Jak długo trwa naprawa projektora?', 'Diagnoza i wycena zajmują zwykle 1–3 dni. Czas naprawy zależy od rodzaju usterki, konstrukcji urządzenia i dostępności części. Przewidywane terminy poszczególnych prac podajemy w cenniku.'],
  ['Czy udzielacie gwarancji na naprawę projektora?', 'Tak. Na wykonaną naprawę projektora udzielamy 3 miesięcy gwarancji. Jeśli w tym czasie usterka objęta gwarancją pojawi się ponownie, usuwamy ją bezpłatnie.'],
  ['Czy mogę wysłać projektor do serwisu kurierem?', 'Tak, przyjmujemy projektory kurierem z całej Polski. Koszt przesyłki do serwisu i odesłania po naprawie pokrywa Klient według cennika przewoźnika. Przed wysyłką wyłącz projektor i poczekaj, aż ostygnie, zabezpiecz obiektyw, zapakuj urządzenie w solidny karton (najlepiej oryginalny) i wypełnij wolną przestrzeń tak, aby projektor nie przesuwał się w środku. Możesz też dostarczyć projektor do serwisu osobiście. Jeśli projektor jest zamontowany pod sufitem, dojazd i demontaż ustalamy indywidualnie.'],
  ['Czy opłaca się naprawiać stary projektor?', 'To zależy od wartości urządzenia, kosztu naprawy i dostępności części. Wymiana lampy, naprawa zasilania lub konserwacja mogą przedłużyć użytkowanie starszego projektora. Przy kosztownym uszkodzeniu układu optycznego warto porównać wycenę z ceną urządzenia o podobnych parametrach.'],
]

const PROJEKTORY_KONSERWACJA_UK =
  'ЧИЩЕННЯ ТА ОБСЛУГОВУВАННЯ [[комплексне ]]чищення, перевірка та тестування пристрою\n• чищення внутрішньої частини проєктора від пилу та забруднень;\n• чищення системи охолодження та вентиляторів;\n• чищення або перевірка повітряних фільтрів;\n• чищення доступних елементів оптичної системи;\n• заміна термопасти чипа DMD (у DLP-проєкторах, конструкція яких цього потребує);\n• перевірка системи живлення та електроніки;\n• перевірка температури та роботи вентиляторів;\n• перевірка якості зображення, яскравості та кольорів;\n• перевірка роз’ємів і основних функцій пристрою;\n• фінальний тест роботи та сервісні рекомендації.'

const PROJEKTORY_KONSERWACJA_RU =
  'ЧИСТКА И ОБСЛУЖИВАНИЕ [[комплексная ]]чистка, проверка и тестирование устройства\n• чистка внутренней части проектора от пыли и загрязнений;\n• чистка системы охлаждения и вентиляторов;\n• чистка или проверка воздушных фильтров;\n• чистка доступных элементов оптической системы;\n• замена термопасты чипа DMD (в DLP-проекторах, конструкция которых этого требует);\n• проверка системы питания и электроники;\n• проверка температуры и работы вентиляторов;\n• проверка качества изображения, яркости и цветов;\n• проверка разъёмов и основных функций устройства;\n• финальный тест работы и сервисные рекомендации.'

const PROJEKTORY_NAPRAWY_UK: NaprawyGroup[] = [
  ['naprawy-lampy', 'Лампи та джерела світла', [
    'Заміна лампи проєктора\n(зображення темне, лампа не світить або проєктор повідомляє про необхідність її заміни)',
    'Ремонт системи запалювання лампи (баласту)\n(лампа не вмикається, гасне після запуску або проєктор повідомляє про помилку лампи)',
    'Ремонт живлення модуля LED / лазер\n(джерело світла не запускається, гасне або працює нестабільно)',
    'Заміна модуля джерела світла LED / лазер\n(проєктор не відображає зображення або джерело світла пошкоджене)',
  ]],
  ['naprawy-zasilanie', 'Живлення та електроніка', [
    'Ремонт блока живлення проєктора\n(проєктор не вмикається, самовільно вимикається або не реагує на кнопку живлення)',
    'Ремонт материнської плати\n(проєктор не запускається, зависає або не працюють його основні функції)',
    'Ремонт систем керування\n(проєктор не реагує на команди, кнопки або неправильно керує вузлами)',
    'Заміна електронного модуля\n(пошкоджений модуль спричиняє непрацездатність окремих функцій проєктора)',
  ]],
  ['naprawy-optyka', 'Оптична система та зображення', [
    'Заміна чипа DMD\n(на зображенні з’являються білі або чорні точки, яких поступово стає більше)',
    'Заміна колірного колеса\n(зображення має неправильні кольори, мерехтить або проєктор видає незвичні звуки)',
    'Заміна матриці LCD / панелі зображення\n(на зображенні з’являються знебарвлення, плями, смуги або відсутній один із кольорів)',
    'Заміна поляризатора\n(на зображенні з’являються жовті, рожеві або фіолетові знебарвлення)',
    'Ультразвукове чищення поляризаторів\n(на зображенні LCD-проєктора видно плями або знебарвлення через забруднення поляризаторів; виконуємо, якщо матеріал і конструкція деталі це допускають)',
    'Ремонт світлового тунелю\n(на зображенні видно темні смуги, тіні або нерівномірне освітлення)',
    'Ремонт або заміна оптичного модуля\n(зображення спотворене, нерівномірно освітлене або має стійкі плями)',
    'Регулювання оптичної системи\n(зображення нечітке, нерівне або не вдається налаштувати правильну різкість)',
  ]],
  ['naprawy-chlodzenie', 'Охолодження та вентиляція', [
    'Заміна вентилятора\n(вентилятор шумить, не обертається або проєктор повідомляє про помилку охолодження)',
    'Ремонт системи охолодження\n(проєктор перегрівається, вимикається під час роботи або повідомляє про помилку температури)',
    'Ремонт керування вентиляторами\n(вентилятори працюють з неправильною швидкістю або не запускаються)',
    'Заміна датчика температури\n(проєктор повідомляє про помилку температури або вимикається, хоча охолодження працює справно)',
  ]],
  ['naprawy-zlacza', 'Роз’єми та зв’язок', [
    'Ремонт або заміна роз’єму HDMI\n(проєктор не бачить пристрій, зображення зникає або роз’єм пошкоджений)',
    'Ремонт роз’ємів USB / VGA / аудіо\n(підключені пристрої не працюють, немає зображення або звуку через цей роз’єм)',
    'Ремонт модуля Wi-Fi / Bluetooth\n(проєктор не підключається до мережі або не бачить бездротові пристрої)',
    'Ремонт систем зв’язку та передавання зображення\n(проєктор не отримує сигнал, втрачає з’єднання або неправильно відображає зображення з входу)',
  ]],
  ['naprawy-mechanika', 'Механіка та корпус', [
    'Ремонт кнопок і панелі керування\n(кнопки не реагують, западають або панель керування не працює)',
    'Ремонт механізму фокусування та зуму\n(не вдається навести різкість або змінити розмір зображення)',
    'Ремонт механізму зсуву об’єктива (lens shift)\n(не вдається зсунути зображення за допомогою регулювання положення об’єктива)',
    'Заміна пошкоджених елементів корпусу\n(корпус тріснув, кріплення пошкоджені або елементи погано тримаються)',
  ]],
  ['naprawy-oprogramowanie', 'Програмне забезпечення та налаштування', [
    'Відновлення налаштувань і конфігурація проєктора\n(неправильні налаштування спричиняють проблеми із зображенням або роботою пристрою)',
    'Оновлення або відновлення програмного забезпечення (firmware)\n(проєктор зависає, працює нестабільно або виникають програмні помилки)',
    'Діагностика та усунення системних помилок\n(проєктор показує повідомлення про помилки, не запускає функції або працює неправильно)',
  ]],
]

const PROJEKTORY_NAPRAWY_RU: NaprawyGroup[] = [
  ['naprawy-lampy', 'Лампы и источники света', [
    'Замена лампы проектора\n(изображение тёмное, лампа не светит или проектор сообщает о необходимости её замены)',
    'Ремонт системы поджига лампы (балласта)\n(лампа не зажигается, гаснет после запуска или проектор сообщает об ошибке лампы)',
    'Ремонт питания модуля LED / лазер\n(источник света не запускается, гаснет или работает нестабильно)',
    'Замена модуля источника света LED / лазер\n(проектор не выводит изображение или источник света повреждён)',
  ]],
  ['naprawy-zasilanie', 'Питание и электроника', [
    'Ремонт блока питания проектора\n(проектор не включается, самопроизвольно выключается или не реагирует на кнопку питания)',
    'Ремонт материнской платы\n(проектор не запускается, зависает или не работают его основные функции)',
    'Ремонт систем управления\n(проектор не реагирует на команды, кнопки или неправильно управляет узлами)',
    'Замена электронного модуля\n(повреждённый модуль приводит к тому, что отдельные функции проектора не работают)',
  ]],
  ['naprawy-optyka', 'Оптическая система и изображение', [
    'Замена чипа DMD\n(на изображении появляются белые или чёрные точки, которых постепенно становится больше)',
    'Замена цветового колеса\n(изображение имеет неправильные цвета, мерцает или проектор издаёт необычные звуки)',
    'Замена матрицы LCD / панели изображения\n(на изображении появляются искажения цвета, пятна, полосы или отсутствует один из цветов)',
    'Замена поляризатора\n(на изображении появляются жёлтые, розовые или фиолетовые оттенки)',
    'Ультразвуковая чистка поляризаторов\n(на изображении LCD-проектора видны пятна или искажения цвета из-за загрязнения поляризаторов; выполняем, если материал и конструкция детали это допускают)',
    'Ремонт светового туннеля\n(на изображении видны тёмные полосы, тени или неравномерная подсветка)',
    'Ремонт или замена оптического модуля\n(изображение искажено, неравномерно освещено или имеет стойкие пятна)',
    'Регулировка оптической системы\n(изображение нечёткое, неровное или не удаётся настроить правильную резкость)',
  ]],
  ['naprawy-chlodzenie', 'Охлаждение и вентиляция', [
    'Замена вентилятора\n(вентилятор шумит, не вращается или проектор сообщает об ошибке охлаждения)',
    'Ремонт системы охлаждения\n(проектор перегревается, выключается во время работы или сообщает об ошибке температуры)',
    'Ремонт управления вентиляторами\n(вентиляторы работают с неправильной скоростью или не запускаются)',
    'Замена датчика температуры\n(проектор сообщает об ошибке температуры или выключается, хотя охлаждение работает исправно)',
  ]],
  ['naprawy-zlacza', 'Разъёмы и связь', [
    'Ремонт или замена разъёма HDMI\n(проектор не видит устройство, изображение пропадает или разъём повреждён)',
    'Ремонт разъёмов USB / VGA / аудио\n(подключённые устройства не работают, нет изображения или звука через этот разъём)',
    'Ремонт модуля Wi-Fi / Bluetooth\n(проектор не подключается к сети или не видит беспроводные устройства)',
    'Ремонт систем связи и передачи изображения\n(проектор не получает сигнал, теряет соединение или неправильно отображает изображение со входа)',
  ]],
  ['naprawy-mechanika', 'Механика и корпус', [
    'Ремонт кнопок и панели управления\n(кнопки не реагируют, западают или панель управления не работает)',
    'Ремонт механизма фокусировки и зума\n(не удаётся навести резкость или изменить размер изображения)',
    'Ремонт механизма сдвига объектива (lens shift)\n(не удаётся сдвинуть изображение с помощью регулировки положения объектива)',
    'Замена повреждённых элементов корпуса\n(корпус треснул, крепления повреждены или элементы плохо держатся)',
  ]],
  ['naprawy-oprogramowanie', 'Программное обеспечение и настройка', [
    'Восстановление настроек и конфигурация проектора\n(неправильные настройки вызывают проблемы с изображением или работой устройства)',
    'Обновление или восстановление программного обеспечения (firmware)\n(проектор зависает, работает нестабильно или возникают программные ошибки)',
    'Диагностика и устранение системных ошибок\n(проектор выводит сообщения об ошибках, не запускает функции или работает неправильно)',
  ]],
]

const PROJEKTORY_FAQ_UK: FaqEntry[] = [
  ['Які марки проєкторів ви ремонтуєте?', 'Ремонтуємо проєктори всіх марок, зокрема Epson, BenQ, Optoma, Acer, Sony, Panasonic, ViewSonic, Samsung, LG, Xiaomi, Philips, NEC, Sharp, Vivitek, JVC, Canon, XGIMI і Hisense. Обслуговуємо домашні, офісні, шкільні проєктори, а також професійні інсталяційні пристрої.'],
  ['Чи ремонтуєте ви проєктори інших, менш популярних марок?', 'Так. Обслуговуємо також проєктори ASUS, JMGO, Wanbo, Dangbei, Anker Nebula, Overmax, Kiano, Kodak, Barco, Christie, EIKI, Ricoh, Hitachi, Sanyo, Mitsubishi, Casio, InFocus, Toshiba, Dell, HP, Lenovo, 3M, ASK Proxima, Boxlight, PLUS, Digital Projection, SIM2, Projectiondesign, Runco і Marantz. Можливість конкретного ремонту залежить від типу несправності та наявності запчастин.'],
  ['Чи ремонтуєте ви старі проєктори, до яких важко знайти запчастини?', 'Так, приймаємо також старіші моделі та моделі, зняті з виробництва. Перевіряємо можливість ремонту наявних вузлів або пошуку відповідних запчастин. Якщо ремонт виявиться невигідним, повідомляємо про це до початку робіт.'],
  ['Чи ремонтуєте ви лазерні, LED, LCD та DLP-проєктори?', 'Так. Обслуговуємо проєктори з лампами, світлодіодами LED і лазерними джерелами світла, а також з технологіями зображення DLP, LCD і 3LCD. Обсяг ремонту залежить від конструкції конкретної моделі.'],
  ['Чому проєктор не вмикається або вимикається через кілька хвилин?', 'Причиною може бути пошкоджений блок живлення, система запалювання лампи, вентилятор, датчик температури або електроніка керування. Проєктор може також вимикатися через перегрівання. Точну причину встановлюємо під час діагностики. На діагностику приймаємо також проєктори після залиття, падіння або стрибка напруги.'],
  ['Чому проєктор працює, але не показує зображення?', 'Проблема може бути пов’язана з пошкодженням джерела світла, оптичної системи, електроніки або сигнального входу. Іноді причина — неправильно вибраний вхід HDMI або пошкоджений кабель. Якщо базова перевірка підключень не допомагає, потрібна діагностика.'],
  ['Звідки на зображенні проєктора білі або чорні точки?', 'У DLP-проєкторах нерухомі білі або чорні точки можуть свідчити про пошкодження мікродзеркал чипа DMD. Зазвичай потрібна заміна пошкодженого чипа після попереднього підтвердження несправності.'],
  ['Чому проєктор показує жовті, рожеві або фіолетові плями?', 'Знебарвлення можуть бути наслідком зношення поляризаторів, пошкодження панелей LCD або проблем з оптичною системою. Причину встановлюємо залежно від характеру знебарвлень і конструкції проєктора. У LCD-проєкторах знебарвлення можуть бути спричинені й забрудненням поляризаторів — якщо матеріал і конструкція деталі це дозволяють, їх можна очистити ультразвуком; інакше може знадобитися заміна поляризатора.'],
  ['Чому проєктор голосно працює або перегрівається?', 'Найчастіші можливі причини — забруднені фільтри, накопичений пил, обмежений потік повітря або несправний вентилятор. У таких випадках може знадобитися обслуговування системи охолодження або ремонт пошкодженого вузла.'],
  ['Що означає блимання індикатора LAMP або TEMP?', 'Індикатор LAMP зазвичай вказує на проблему з лампою або її блоком живлення (баластом), а TEMP — на перегрівання: забруднену систему охолодження, несправний вентилятор або датчик температури. Точне значення сигналів залежить від моделі проєктора, тому причину підтверджуємо під час діагностики.'],
  ['Чи завжди потрібно міняти лампу, якщо зображення надто темне?', 'Ні. Слабке зображення може бути спричинене зношенням лампи, але також забрудненням оптики, пошкодженням поляризаторів або іншими проблемами. Перед заміною лампи варто з’ясувати справжню причину зниження яскравості. Під час заміни встановлюємо оригінальні лампи, аналоги або лампу, надану Клієнтом. Заміна лампи зазвичай триває 1–3 дні.'],
  ['Чи ремонтуєте ви проєктори з пошкодженим HDMI?', 'Так. Діагностуємо та ремонтуємо пошкоджені роз’єми HDMI і схеми, що відповідають за прийом сигналу. Якщо проєктор не бачить комп’ютер або зображення зникає, перевіряємо також інші можливі причини.'],
  ['У чому полягає чищення та обслуговування проєктора?', 'Послуга включає чищення внутрішньої частини, системи охолодження, вентиляторів, фільтрів і доступних оптичних елементів. У DLP-проєкторах, конструкція яких цього потребує, замінюємо й термопасту чипа DMD. Також перевіряємо роботу електроніки, робочу температуру та якість зображення. Обсяг робіт підбираємо відповідно до конструкції пристрою.'],
  ['Як часто потрібно чистити проєктор?', 'Це залежить від умов роботи. Удома чи в офісі зазвичай достатньо чищення раз на рік. У запиленому приміщенні, за щоденної багатогодинної роботи або за наявності тварин варто робити це частіше. Сигналом до чищення є гучніша робота вентиляторів, повідомлення про температуру та зниження яскравості зображення.'],
  ['Скільки коштує діагностика проєктора?', 'Попередня онлайн-консультація та попередня діагностика під час доставки пристрою безкоштовні. Повна діагностика також безкоштовна, якщо ви замовляєте ремонт. У разі відмови від ремонту вартість становить 60 / 100 / 180 zł залежно від категорії проєктора.'],
  ['Скільки коштує ремонт проєктора?', 'Вартість залежить від типу несправності та категорії пристрою. Ціни окремих робіт наведено в нашому прайс-листі з поділом на компактні, домашні й офісні, а також професійні та інсталяційні проєктори. Ціни в прайс-листі стосуються виконання послуги — якщо для ремонту потрібні деталі, їхню вартість додаємо окремо. Вартість деталей визначаємо після діагностики конкретної моделі, а перед ремонтом повідомляємо обсяг робіт і повну вартість.'],
  ['Чи дізнаюся я вартість до початку ремонту?', 'Так. Після діагностики повідомляємо обсяг робіт і повну вартість ремонту разом із вартістю потрібних деталей. Ремонт починаємо лише після погодження вартості з Клієнтом. Якщо ви погоджуєтеся на ремонт, діагностика безкоштовна. Якщо відмовляєтеся, оплачуєте лише діагностику: 60 / 100 / 180 zł залежно від категорії проєктора.'],
  ['Скільки триває ремонт проєктора?', 'Діагностика та оцінка вартості зазвичай займають 1–3 дні. Час ремонту залежить від типу несправності, конструкції пристрою та наявності запчастин. Орієнтовні терміни окремих робіт наведено в прайс-листі.'],
  ['Чи надаєте ви гарантію на ремонт проєктора?', 'Так. На виконаний ремонт проєктора надаємо гарантію 3 місяці. Якщо за цей час несправність, на яку поширюється гарантія, з’явиться знову, усуваємо її безкоштовно.'],
  ['Чи можна надіслати проєктор у сервіс кур’єром?', 'Так, приймаємо проєктори кур’єром з усієї Польщі. Вартість доставки в сервіс і повернення після ремонту оплачує Клієнт за тарифом перевізника. Перед відправкою вимкніть проєктор і дочекайтеся, поки він охолоне, захистіть об’єктив, запакуйте пристрій у міцну коробку (найкраще оригінальну) і заповніть вільний простір так, щоб проєктор не зсувався всередині. Ви також можете привезти проєктор у сервіс особисто. Якщо проєктор змонтовано під стелею, виїзд і демонтаж погоджуємо індивідуально.'],
  ['Чи варто ремонтувати старий проєктор?', 'Це залежить від вартості пристрою, ціни ремонту та наявності запчастин. Заміна лампи, ремонт живлення або обслуговування можуть продовжити термін служби старішого проєктора. У разі дорогого пошкодження оптичної системи варто порівняти вартість ремонту з ціною пристрою з подібними характеристиками.'],
]

const PROJEKTORY_FAQ_RU: FaqEntry[] = [
  ['Какие марки проекторов вы ремонтируете?', 'Ремонтируем проекторы всех марок, в том числе Epson, BenQ, Optoma, Acer, Sony, Panasonic, ViewSonic, Samsung, LG, Xiaomi, Philips, NEC, Sharp, Vivitek, JVC, Canon, XGIMI и Hisense. Обслуживаем домашние, офисные, школьные проекторы, а также профессиональные инсталляционные устройства.'],
  ['Ремонтируете ли вы проекторы других, менее популярных марок?', 'Да. Обслуживаем также проекторы ASUS, JMGO, Wanbo, Dangbei, Anker Nebula, Overmax, Kiano, Kodak, Barco, Christie, EIKI, Ricoh, Hitachi, Sanyo, Mitsubishi, Casio, InFocus, Toshiba, Dell, HP, Lenovo, 3M, ASK Proxima, Boxlight, PLUS, Digital Projection, SIM2, Projectiondesign, Runco и Marantz. Возможность конкретного ремонта зависит от типа неисправности и наличия запчастей.'],
  ['Ремонтируете ли вы старые проекторы, к которым трудно найти запчасти?', 'Да, принимаем также более старые модели и модели, снятые с производства. Проверяем возможность ремонта имеющихся узлов или поиска подходящих запчастей. Если ремонт окажется невыгодным, сообщаем об этом до начала работ.'],
  ['Ремонтируете ли вы лазерные, LED, LCD и DLP-проекторы?', 'Да. Обслуживаем проекторы с лампами, светодиодами LED и лазерными источниками света, а также с технологиями изображения DLP, LCD и 3LCD. Объём ремонта зависит от конструкции конкретной модели.'],
  ['Почему проектор не включается или выключается через несколько минут?', 'Причиной может быть повреждённый блок питания, система поджига лампы, вентилятор, датчик температуры или управляющая электроника. Проектор может также выключаться из-за перегрева. Точную причину устанавливаем во время диагностики. На диагностику принимаем также проекторы после залития, падения или скачка напряжения.'],
  ['Почему проектор работает, но не показывает изображение?', 'Проблема может быть связана с повреждением источника света, оптической системы, электроники или сигнального входа. Иногда причина — неправильно выбранный вход HDMI или повреждённый кабель. Если базовая проверка подключений не помогает, нужна диагностика.'],
  ['Откуда на изображении проектора белые или чёрные точки?', 'В DLP-проекторах неподвижные белые или чёрные точки могут указывать на повреждение микрозеркал чипа DMD. Обычно требуется замена повреждённого чипа после предварительного подтверждения неисправности.'],
  ['Почему проектор показывает жёлтые, розовые или фиолетовые пятна?', 'Искажения цвета могут быть следствием износа поляризаторов, повреждения панелей LCD или проблем с оптической системой. Причину устанавливаем в зависимости от характера пятен и конструкции проектора. В LCD-проекторах пятна могут быть вызваны и загрязнением поляризаторов — если материал и конструкция детали это позволяют, их можно очистить ультразвуком; иначе может потребоваться замена поляризатора.'],
  ['Почему проектор громко работает или перегревается?', 'Самые частые возможные причины — загрязнённые фильтры, скопившаяся пыль, ограниченный поток воздуха или неисправный вентилятор. В таких случаях может потребоваться обслуживание системы охлаждения или ремонт повреждённого узла.'],
  ['Что означает мигание индикатора LAMP или TEMP?', 'Индикатор LAMP обычно указывает на проблему с лампой или её блоком питания (балластом), а TEMP — на перегрев: загрязнённую систему охлаждения, неисправный вентилятор или датчик температуры. Точное значение сигналов зависит от модели проектора, поэтому причину подтверждаем во время диагностики.'],
  ['Всегда ли нужно менять лампу, если изображение слишком тёмное?', 'Нет. Слабое изображение может быть вызвано износом лампы, но также загрязнением оптики, повреждением поляризаторов или другими проблемами. Перед заменой лампы стоит выяснить настоящую причину снижения яркости. При замене устанавливаем оригинальные лампы, аналоги или лампу, предоставленную Клиентом. Замена лампы обычно занимает 1–3 дня.'],
  ['Ремонтируете ли вы проекторы с повреждённым HDMI?', 'Да. Диагностируем и ремонтируем повреждённые разъёмы HDMI и схемы, отвечающие за приём сигнала. Если проектор не видит компьютер или изображение пропадает, проверяем также другие возможные причины.'],
  ['В чём заключается чистка и обслуживание проектора?', 'Услуга включает чистку внутренней части, системы охлаждения, вентиляторов, фильтров и доступных оптических элементов. В DLP-проекторах, конструкция которых этого требует, меняем и термопасту чипа DMD. Также проверяем работу электроники, рабочую температуру и качество изображения. Объём работ подбираем в соответствии с конструкцией устройства.'],
  ['Как часто нужно чистить проектор?', 'Это зависит от условий работы. Дома или в офисе обычно достаточно чистки раз в год. В запылённом помещении, при ежедневной многочасовой работе или при наличии животных стоит делать это чаще. Сигналом к чистке служат более громкая работа вентиляторов, сообщения о температуре и снижение яркости изображения.'],
  ['Сколько стоит диагностика проектора?', 'Предварительная онлайн-консультация и предварительная диагностика при доставке устройства бесплатны. Полная диагностика также бесплатна, если вы заказываете ремонт. При отказе от ремонта стоимость составляет 60 / 100 / 180 zł в зависимости от категории проектора.'],
  ['Сколько стоит ремонт проектора?', 'Стоимость зависит от типа неисправности и категории устройства. Цены отдельных работ указаны в нашем прайс-листе с разделением на компактные, домашние и офисные, а также профессиональные и инсталляционные проекторы. Цены в прайс-листе относятся к выполнению услуги — если для ремонта нужны детали, их стоимость добавляется отдельно. Стоимость деталей определяем после диагностики конкретной модели, а перед ремонтом сообщаем объём работ и полную стоимость.'],
  ['Узнаю ли я стоимость до начала ремонта?', 'Да. После диагностики сообщаем объём работ и полную стоимость ремонта вместе со стоимостью нужных деталей. Ремонт начинаем только после согласования стоимости с Клиентом. Если вы соглашаетесь на ремонт, диагностика бесплатна. Если отказываетесь, оплачиваете только диагностику: 60 / 100 / 180 zł в зависимости от категории проектора.'],
  ['Сколько длится ремонт проектора?', 'Диагностика и оценка стоимости обычно занимают 1–3 дня. Время ремонта зависит от типа неисправности, конструкции устройства и наличия запчастей. Ориентировочные сроки отдельных работ указаны в прайс-листе.'],
  ['Даёте ли вы гарантию на ремонт проектора?', 'Да. На выполненный ремонт проектора даём гарантию 3 месяца. Если за это время неисправность, на которую распространяется гарантия, появится снова, устраняем её бесплатно.'],
  ['Можно ли отправить проектор в сервис курьером?', 'Да, принимаем проекторы курьером из любой точки Польши. Стоимость доставки в сервис и возврата после ремонта оплачивает Клиент по тарифу перевозчика. Перед отправкой выключите проектор и дождитесь, пока он остынет, защитите объектив, упакуйте устройство в прочную коробку (лучше оригинальную) и заполните свободное место так, чтобы проектор не смещался внутри. Вы также можете привезти проектор в сервис лично. Если проектор смонтирован под потолком, выезд и демонтаж согласовываем индивидуально.'],
  ['Стоит ли ремонтировать старый проектор?', 'Это зависит от стоимости устройства, цены ремонта и наличия запчастей. Замена лампы, ремонт питания или обслуживание могут продлить срок службы более старого проектора. При дорогостоящем повреждении оптической системы стоит сравнить стоимость ремонта с ценой устройства с похожими характеристиками.'],
]

const PROJEKTORY_KONSERWACJA_EN =
  'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and testing of the device\n• cleaning dust and dirt from the inside of the projector;\n• cleaning the cooling system and fans;\n• cleaning or checking the air filters;\n• cleaning the accessible parts of the optical system;\n• replacing the thermal paste of the DMD chip (in DLP projectors whose design requires it);\n• checking the power supply and electronics;\n• checking the temperature and fan operation;\n• checking image quality, brightness and colours;\n• checking the connectors and basic functions of the device;\n• final operation test and service recommendations.'

const PROJEKTORY_NAPRAWY_EN: NaprawyGroup[] = [
  ['naprawy-lampy', 'Lamps and light sources', [
    'Projector lamp replacement\n(the image is dark, the lamp does not light up or the projector signals that it needs replacing)',
    'Lamp ignition circuit (ballast) repair\n(the lamp does not light up, goes out after starting or the projector reports a lamp error)',
    'LED / laser module power supply repair\n(the light source does not start, goes out or works unstably)',
    'LED / laser light source module replacement\n(the projector does not display an image or the light source is damaged)',
  ]],
  ['naprawy-zasilanie', 'Power supply and electronics', [
    'Projector power supply repair\n(the projector does not switch on, switches off by itself or does not respond to the power button)',
    'Main board repair\n(the projector does not start, freezes or its basic functions do not work)',
    'Control circuit repair\n(the projector does not respond to commands or buttons, or controls its components incorrectly)',
    'Electronic module replacement\n(a damaged module stops certain projector functions from working)',
  ]],
  ['naprawy-optyka', 'Optical system and image', [
    'DMD chip replacement\n(white or black dots appear on the image and gradually multiply)',
    'Colour wheel replacement\n(the image has incorrect colours, flickers or the projector makes unusual noises)',
    'LCD panel / imaging panel replacement\n(the image shows discolouration, spots, stripes or one of the colours is missing)',
    'Polariser replacement\n(yellow, pink or purple discolouration appears on the image)',
    'Ultrasonic cleaning of polarisers\n(spots or discolouration are visible on the image of an LCD projector because the polarisers are dirty; we do this when the material and design of the part allow it)',
    'Light tunnel repair\n(dark stripes, shadows or uneven lighting are visible on the image)',
    'Optical module repair or replacement\n(the image is distorted, unevenly lit or has permanent spots)',
    'Optical system adjustment\n(the image is blurred, uneven or cannot be brought into proper focus)',
  ]],
  ['naprawy-chlodzenie', 'Cooling and ventilation', [
    'Fan replacement\n(the fan is noisy, does not turn or the projector reports a cooling error)',
    'Cooling system repair\n(the projector overheats, switches off during use or reports a temperature error)',
    'Fan control repair\n(the fans run at the wrong speed or do not start)',
    'Temperature sensor replacement\n(the projector reports a temperature error or switches off even though cooling works properly)',
  ]],
  ['naprawy-zlacza', 'Connectors and communication', [
    'HDMI port repair or replacement\n(the projector does not detect the device, the image drops out or the port is damaged)',
    'USB / VGA / audio port repair\n(connected devices do not work, or there is no image or sound through that port)',
    'Wi-Fi / Bluetooth module repair\n(the projector does not connect to the network or does not detect wireless devices)',
    'Repair of communication and image transmission circuits\n(the projector does not receive a signal, loses the connection or displays the input image incorrectly)',
  ]],
  ['naprawy-mechanika', 'Mechanics and housing', [
    'Button and control panel repair\n(the buttons do not respond, stick or the control panel does not work)',
    'Focus and zoom mechanism repair\n(you cannot focus the image or change its size)',
    'Lens shift mechanism repair\n(you cannot move the image using the lens position adjustment)',
    'Replacement of damaged housing parts\n(the housing is cracked, the mounts are damaged or parts do not stay in place properly)',
  ]],
  ['naprawy-oprogramowanie', 'Software and configuration', [
    'Restoring settings and configuring the projector\n(incorrect settings cause problems with the image or how the device works)',
    'Firmware update or restore\n(the projector freezes, works unstably or software errors occur)',
    'Diagnosing and fixing system errors\n(the projector shows error messages, does not start functions or works incorrectly)',
  ]],
]

const PROJEKTORY_FAQ_EN: FaqEntry[] = [
  ['Which projector brands do you repair?', 'We repair projectors of all brands, including Epson, BenQ, Optoma, Acer, Sony, Panasonic, ViewSonic, Samsung, LG, Xiaomi, Philips, NEC, Sharp, Vivitek, JVC, Canon, XGIMI and Hisense. We service home, office and school multimedia projectors, as well as professional installation devices.'],
  ['Do you repair projectors from other, less popular brands?', 'Yes. We also service projectors from ASUS, JMGO, Wanbo, Dangbei, Anker Nebula, Overmax, Kiano, Kodak, Barco, Christie, EIKI, Ricoh, Hitachi, Sanyo, Mitsubishi, Casio, InFocus, Toshiba, Dell, HP, Lenovo, 3M, ASK Proxima, Boxlight, PLUS, Digital Projection, SIM2, Projectiondesign, Runco and Marantz. Whether a specific repair is possible depends on the type of fault and the availability of parts.'],
  ['Do you repair old projectors for which parts are hard to find?', 'Yes, we also accept older and discontinued models. We check whether the existing components can be repaired or suitable parts can be sourced. If the repair turns out not to be worth it, we tell you before starting any work.'],
  ['Do you repair laser, LED, LCD and DLP projectors?', 'Yes. We service projectors that use lamps, LEDs and laser light sources, as well as DLP, LCD and 3LCD imaging technologies. The scope of the repair depends on the design of the specific model.'],
  ['Why does the projector not switch on, or switch off after a few minutes?', 'The cause may be a damaged power supply, lamp ignition circuit, fan, temperature sensor or control electronics. The projector may also switch off because it is overheating. We establish the exact cause during the diagnosis. We also accept projectors for diagnosis after liquid damage, a fall or a power surge.'],
  ['Why does the projector work but not display an image?', 'The problem may be caused by damage to the light source, optical system, electronics or signal input. Sometimes the cause is the wrong HDMI input being selected or a damaged cable. If a basic check of the connections does not help, a diagnosis is needed.'],
  ['What causes white or black dots on the projector image?', 'In DLP projectors, fixed white or black dots may indicate damaged micromirrors on the DMD chip. The damaged chip usually has to be replaced, once the fault has been confirmed.'],
  ['Why does the projector show yellow, pink or purple spots?', 'Discolouration may result from worn polarisers, damaged LCD panels or problems with the optical system. We identify the cause based on the type of discolouration and the design of the projector. In LCD projectors, discolouration may also be caused by dirty polarisers — if the material and design of the part allow it, they can be cleaned ultrasonically; otherwise, the polariser may need replacing.'],
  ['Why is the projector noisy or overheating?', 'The most common possible causes are dirty filters, built-up dust, restricted airflow or a faulty fan. In such cases, the cooling system may need maintenance or a damaged component may need repairing.'],
  ['What does a flashing LAMP or TEMP light mean?', 'The LAMP light usually indicates a problem with the lamp or its power supply (ballast), and TEMP indicates overheating: a dirty cooling system, a faulty fan or a faulty temperature sensor. The exact meaning of the signals depends on the projector model, so we confirm the cause during the diagnosis.'],
  ['Does the lamp always need replacing when the image is too dark?', 'No. A dim image may be caused by a worn lamp, but also by dirty optics, damaged polarisers or other problems. Before replacing the lamp, it is worth checking the real cause of the loss of brightness. When replacing it, we fit original lamps, compatible replacements or a lamp supplied by the customer. A lamp replacement usually takes 1–3 days.'],
  ['Do you repair projectors with a damaged HDMI port?', 'Yes. We diagnose and repair damaged HDMI ports and the circuits responsible for receiving the signal. If the projector does not detect the computer or the image drops out, we also check other possible causes.'],
  ['What does projector cleaning and maintenance involve?', 'The service includes cleaning the inside, the cooling system, fans, filters and accessible optical components. In DLP projectors whose design requires it, we also replace the thermal paste of the DMD chip. We also check how the electronics work, the operating temperature and the quality of the displayed image. We adapt the scope of work to the design of the device.'],
  ['How often should a projector be cleaned?', 'It depends on the operating conditions. At home or in the office, cleaning once a year is usually enough. In a dusty room, with many hours of daily use or with pets around, it is worth doing it more often. Signs that cleaning is needed are louder fans, temperature messages and a drop in image brightness.'],
  ['How much does a projector diagnosis cost?', 'The initial online consultation and the initial diagnosis when you bring in the device are free. The full diagnosis is also free if we carry out the repair. If you decide not to go ahead with the repair, the cost is 60 / 100 / 180 zł, depending on the projector category.'],
  ['How much does a projector repair cost?', 'The cost depends on the type of fault and the device category. The prices of individual jobs are in our price list, divided into compact, home and office, and professional and installation projectors. The prices in the price list cover the service itself — if the repair needs parts, their cost is added separately. We determine the cost of parts after diagnosing the specific model, and before the repair we give you the scope of work and the full cost.'],
  ['Will I know the cost before the repair?', 'Yes. After the diagnosis, we give you the scope of work and the full repair cost, including the cost of any parts needed. We start the repair only after the customer has accepted the costs. If you decide to go ahead with the repair, the diagnosis is free. If you decide not to, you pay only for the diagnosis: 60 / 100 / 180 zł, depending on the projector category.'],
  ['How long does a projector repair take?', 'Diagnosis and a quote usually take 1–3 days. The repair time depends on the type of fault, the design of the device and the availability of parts. The expected times for individual jobs are given in the price list.'],
  ['Do you give a warranty on projector repairs?', 'Yes. We give a 3-month warranty on projector repairs. If a fault covered by the warranty comes back during this time, we fix it free of charge.'],
  ['Can I send my projector to you by courier?', 'Yes, we accept projectors by courier from anywhere in Poland. The customer pays for shipping to our service centre and back after the repair, according to the carrier’s rates. Before sending, switch the projector off and wait for it to cool down, protect the lens, pack the device in a sturdy box (ideally the original one) and fill the empty space so that the projector cannot move inside. You can also bring the projector to our service centre in person. If the projector is ceiling-mounted, we agree the visit and removal individually.'],
  ['Is it worth repairing an old projector?', 'It depends on the value of the device, the repair cost and the availability of parts. A lamp replacement, power supply repair or maintenance can extend the life of an older projector. With costly damage to the optical system, it is worth comparing the quote with the price of a device with similar specifications.'],
]

const withProjektory = (sections: PricingSection[], konserwacja: string, naprawy: NaprawyGroup[], faq: FaqEntry[], courier: string): PricingSection[] =>
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

export const createProjektoryPricingSections = (): PricingSection[] =>
  withProjektory(createNiszczarkiPricingSections(), PROJEKTORY_KONSERWACJA_PL, PROJEKTORY_NAPRAWY_PL, PROJEKTORY_FAQ_PL, 'Wysyłka kurierem z całej Polski\n(projektor wysyłasz do serwisu kurierem, a po naprawie odsyłamy go tą samą drogą; przesyłkę w obie strony opłaca Klient)')

export const projektoryPricingSectionsUk = (): PricingSection[] =>
  withProjektory(niszczarkiPricingSectionsUk(), PROJEKTORY_KONSERWACJA_UK, PROJEKTORY_NAPRAWY_UK, PROJEKTORY_FAQ_UK, 'Відправка кур’єром з усієї Польщі\n(ви надсилаєте проєктор у сервіс кур’єром, а після ремонту ми повертаємо його так само; доставку в обидва боки оплачує Клієнт)')

export const projektoryPricingSectionsEn = (): PricingSection[] =>
  withProjektory(niszczarkiPricingSectionsEn(), PROJEKTORY_KONSERWACJA_EN, PROJEKTORY_NAPRAWY_EN, PROJEKTORY_FAQ_EN, 'Courier shipping from anywhere in Poland\n(you send the projector to our service centre by courier, and after the repair we send it back the same way; the customer pays for shipping both ways)')

export const projektoryPricingSectionsRu = (): PricingSection[] =>
  withProjektory(niszczarkiPricingSectionsRu(), PROJEKTORY_KONSERWACJA_RU, PROJEKTORY_NAPRAWY_RU, PROJEKTORY_FAQ_RU, 'Отправка курьером из любой точки Польши\n(вы отправляете проектор в сервис курьером, а после ремонта мы возвращаем его тем же способом; доставку в обе стороны оплачивает Клиент)')
