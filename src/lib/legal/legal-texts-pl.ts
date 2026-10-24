import type { LegalDoc } from './legal-render'

// PL is the source of truth for all language versions of the legal pages.
// Date of entry into force / last update of both documents (set on publication).
export const LEGAL_DATE = '2026-10-24'

export const regulaminPl: LegalDoc = {
  intro: '“Chcesz zapoznać się z naszym Regulaminem? Przeczytaj poniżej.”',
  title: 'Regulamin świadczenia usług serwisowych przez Omobonus',
  lastUpdatedLabel: 'Ostatnia aktualizacja',
  dateLocale: 'pl-PL',
  lastUpdated: LEGAL_DATE,
  sections: [
    {
      heading: '§1. Postanowienia ogólne',
      blocks: [{ ol: [
        'Regulamin określa zasady świadczenia usług przez Omobonus Sp. z o.o. (dalej: „Omobonus”, „my”) oraz zasady korzystania z usług dostępnych na stronie serwis.omobonus.com.pl.',
        'Dane firmy: Omobonus Sp. z o.o., siedziba: ul. Saperów 45/8, 53-151 Wrocław; adres serwisu: ul. Marcina Bukowskiego 174, 52-418 Wrocław; spółka wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla Wrocławia-Fabrycznej we Wrocławiu, VI Wydział Gospodarczy KRS, pod numerem KRS 0000869086; NIP: 8943160773, REGON: 387509703; kapitał zakładowy: 5 000,00 zł; e-mail: serwis@omobonus.com.pl, telefon: +48 793 759 262.',
        'Regulamin dotyczy w szczególności: diagnozy, naprawy i serwisu komputerów, laptopów, drukarek i innych urządzeń; dojazdu do Klienta; odbioru i dostawy urządzeń; obsługi przesyłek kurierskich; wynajmu drukarek i urządzeń zastępczych; druku 3D i projektowania modeli 3D; outsourcingu IT.',
        'Regulamin jest dostępny bezpłatnie na stronie internetowej. Można go zapisać i wydrukować. Na prośbę Klienta prześlemy go e-mailem lub wydamy w serwisie.',
        'Jeżeli strony zawarły odrębną umowę (np. umowę wynajmu lub umowę outsourcingu IT), w sprawach w niej uregulowanych stosuje się tę umowę, a w pozostałych — Regulamin.',
        'Żadne postanowienie Regulaminu ani odrębnej umowy nie wyłącza i nie ogranicza praw, które Konsumentowi lub Przedsiębiorcy na prawach konsumenta przysługują na podstawie bezwzględnie obowiązujących przepisów. W razie sprzeczności stosuje się przepisy.',
        'Zasady przetwarzania danych osobowych opisuje [Polityka prywatności](/polityka-prywatnosci).',
      ] }],
    },
    {
      heading: '§2. Definicje',
      blocks: [{ ol: [
        '**Klient** — osoba fizyczna, osoba prawna lub jednostka organizacyjna, która korzysta z naszych usług.',
        '**Konsument** — osoba fizyczna, która zawiera z nami umowę niezwiązaną bezpośrednio z jej działalnością gospodarczą lub zawodową (art. 22¹ Kodeksu cywilnego).',
        '**Przedsiębiorca na prawach konsumenta** — osoba fizyczna prowadząca jednoosobową działalność gospodarczą, która zawiera umowę bezpośrednio związaną z tą działalnością, jeżeli z treści umowy wynika, że nie ma ona dla niej charakteru zawodowego, w szczególności w świetle przedmiotu działalności wpisanego do CEIDG.',
        '**Przedsiębiorca** — Klient, który nie jest Konsumentem ani Przedsiębiorcą na prawach konsumenta.',
        '**Urządzenie** — sprzęt przekazany nam do diagnozy, naprawy lub serwisu albo objęty usługą u Klienta.',
        '**Zgłoszenie** — zapytanie lub prośba o kontakt przesłana przez formularz, telefonicznie, e-mailem, przez komunikator lub osobiście.',
        '**Wycena** — informacja o zakresie prac, częściach, cenie i przewidywanym terminie, przekazana Klientowi po diagnozie.',
        '**Potwierdzenie przyjęcia** — papierowy lub elektroniczny dokument potwierdzający przekazanie Urządzenia.',
        '**Trwały nośnik** — nośnik, który pozwala przechowywać i odtwarzać informacje w niezmienionej postaci, np. papier, e-mail, SMS, plik PDF.',
        '**Dni robocze** — dni od poniedziałku do piątku z wyjątkiem dni ustawowo wolnych od pracy.',
      ] }],
    },
    {
      heading: '§3. Usługi na stronie internetowej',
      blocks: [{ ol: [
        'Na stronie udostępniamy bezpłatnie: formularz zgłoszenia (z możliwością dodania załączników do 4 MB), prośbę o oddzwonienie, kalkulator kosztu dojazdu oraz informacje o usługach i cenach.',
        'Do korzystania ze strony potrzebne są: urządzenie z dostępem do Internetu, aktualna przeglądarka z włączoną obsługą JavaScript oraz — do otrzymania odpowiedzi — aktywny adres e-mail lub numer telefonu.',
        'Umowa o korzystanie z formularza, prośby o oddzwonienie lub kalkulatora zostaje zawarta z chwilą rozpoczęcia korzystania z danej funkcji i wygasa po wysłaniu formularza, wyświetleniu wyniku lub wcześniejszym przerwaniu korzystania. Klient może zrezygnować w każdej chwili, zamykając stronę.',
        'Zabronione jest przesyłanie treści bezprawnych, w tym naruszających prawa osób trzecich, oraz plików zawierających złośliwe oprogramowanie.',
        'Wynik kalkulatora kosztu dojazdu ma charakter informacyjny i opiera się na trasie wyznaczonej przez usługę map Google. Ostateczny koszt dojazdu potwierdzamy przy umawianiu wizyty, przed jej realizacją.',
        'Reklamacje dotyczące działania strony można zgłaszać na zasadach §14 ust. 4–5.',
      ] }],
    },
    {
      heading: '§4. Zgłoszenie i zawarcie umowy',
      blocks: [{ ol: [
        'Zlecenia przyjmujemy telefonicznie, przez formularz na stronie, e-mailem, przez komunikator oraz osobiście w serwisie. Świadczymy też usługi z dojazdem do Klienta.',
        'Zgłoszenie nie jest zawarciem umowy i nie zobowiązuje Klienta do zapłaty.',
        'Po otrzymaniu Zgłoszenia kontaktujemy się z Klientem i uzgadniamy: rodzaj usługi, sposób dostarczenia Urządzenia albo termin wizyty, koszt diagnozy w razie rezygnacji z naprawy, koszt dojazdu, odbioru lub wysyłki oraz inne koszty, jeżeli występują.',
        'Umowa o wykonanie diagnozy zostaje zawarta, gdy obie strony potwierdzą warunki z ust. 3 — najpóźniej w chwili przyjęcia Urządzenia do serwisu albo rozpoczęcia wizyty u Klienta. Uzgodnione warunki potwierdzamy na Trwałym nośniku (Potwierdzenie przyjęcia, e-mail lub SMS).',
        'Umowa o naprawę lub inną usługę objętą Wyceną zostaje zawarta dopiero po akceptacji Wyceny przez Klienta (§6).',
        'Wynajem urządzeń i outsourcing IT realizujemy na podstawie odrębnej umowy (§17, §19).',
        'Możemy odmówić przyjęcia zlecenia, w szczególności gdy usługa wykracza poza nasz zakres, naprawa jest technicznie niemożliwa, nie mamy dostępu do części lub stan Urządzenia stwarza zagrożenie dla bezpieczeństwa. Informujemy o tym Klienta bez zbędnej zwłoki.',
        'Część prac możemy powierzyć podwykonawcom. Za ich działania odpowiadamy jak za własne. Jeżeli Urządzenie ma zostać przekazane poza nasz serwis, uprzedzamy o tym Klienta.',
      ] }],
    },
    {
      heading: '§5. Przyjęcie Urządzenia',
      blocks: [{ ol: [
        'Przy przyjęciu Urządzenia wydajemy Klientowi Potwierdzenie przyjęcia w formie papierowej lub elektronicznej. Potwierdzenie zawiera, w zakresie, w jakim ma to zastosowanie: numer zlecenia, opis Urządzenia (rodzaj, marka, model, numer seryjny, jeżeli jest dostępny), przekazane wyposażenie, stan Urządzenia i widoczne uszkodzenia, opis usterki zgłoszonej przez Klienta oraz uzgodnione warunki diagnozy.',
        'Przy przesyłce kurierskiej sporządzamy Potwierdzenie przyjęcia po rozpakowaniu przesyłki i przesyłamy je Klientowi e-mailem.',
        'Prosimy o przekazanie tylko wyposażenia potrzebnego do usługi oraz o wyjęcie kart pamięci, pendrive’ów i innych nośników, które nie są potrzebne do naprawy.',
        'Hasła dostępu prosimy przekazywać tylko wtedy, gdy są niezbędne do wykonania usługi.',
      ] }],
    },
    {
      heading: '§6. Diagnoza i Wycena',
      blocks: [{ ol: [
        'Konsultacja oraz wstępne sprawdzenie Urządzenia przy przyjęciu są bezpłatne, chyba że cennik danej usługi stanowi inaczej, o czym informujemy przed przyjęciem Urządzenia.',
        'Pełna diagnoza jest bezpłatna, jeżeli Klient zleci naprawę. Jeżeli Klient zrezygnuje z naprawy po wykonaniu pełnej diagnozy albo naprawa okaże się niemożliwa lub nieopłacalna, Klient płaci za wykonaną pełną diagnozę cenę uzgodnioną z nim przed przyjęciem Urządzenia. Uzgodnioną cenę wpisujemy do Potwierdzenia przyjęcia albo potwierdzamy na Trwałym nośniku. Samo podanie ceny w cenniku na stronie nie wystarcza — bez takiego uzgodnienia nie pobieramy opłaty za diagnozę.',
        'Jeżeli w wyniku diagnozy okaże się, że naprawa jest niemożliwa lub nieopłacalna, niezwłocznie informujemy o tym Klienta, podając powód, i nie wykonujemy dalszych płatnych prac.',
        'Po diagnozie przekazujemy Klientowi Wycenę. Konsumentowi i Przedsiębiorcy na prawach konsumenta podajemy cenę brutto, czyli z podatkiem VAT.',
        'Naprawy nie rozpoczynamy bez akceptacji Wyceny. Akceptację można wyrazić osobiście, telefonicznie, e-mailem, SMS-em lub przez komunikator. Akceptację telefoniczną potwierdzamy na Trwałym nośniku.',
        'Jeżeli w trakcie naprawy okaże się, że potrzebne są dodatkowe prace lub części albo cena ma być wyższa niż w Wycenie, przerywamy prace i prosimy Klienta o zgodę. Bez tej zgody nie wykonujemy dodatkowych prac i nie pobieramy za nie opłat.',
        'Jeżeli Klient nie odpowie na Wycenę w ciągu 14 dni od jej przekazania i od ponownej próby kontaktu, traktujemy to jako rezygnację z naprawy, a nie jako jej akceptację, i informujemy Klienta o możliwości odbioru Urządzenia (§11).',
      ] }],
    },
    {
      heading: '§7. Terminy',
      blocks: [{ ol: [
        'Przewidywany termin wykonania usługi podajemy po diagnozie, w Wycenie. Termin liczymy od akceptacji Wyceny, a jeżeli uzgodniono przedpłatę — od jej zaksięgowania. Terminy podane w opisach usług na stronie są orientacyjne.',
        'Jeżeli potrzebne są części, których nie mamy na miejscu, lub dodatkowe prace, informujemy o tym Klienta i uzgadniamy z nim nowy termin.',
        'Jeżeli nowy termin nie odpowiada Klientowi, może on zrezygnować z usługi i odebrać Urządzenie. Rozliczenie następuje zgodnie z §12 ust. 5.',
        'Opóźnienie dostawcy części nie jest siłą wyższą. W razie opóźnienia Klient zachowuje uprawnienia wynikające z przepisów, w tym prawo odstąpienia od umowy przewidziane w art. 635 Kodeksu cywilnego.',
      ] }],
    },
    {
      heading: '§8. Części zamienne',
      blocks: [{ ol: [
        'Rodzaj części (oryginalne, zamienniki, odnowione lub używane) podajemy w Wycenie. Części innych niż nowe używamy wyłącznie za zgodą Klienta.',
        'Na zamontowane części udzielamy gwarancji na zasadach §13. Niezależnie od tego może przysługiwać gwarancja producenta lub dostawcy części — w razie potrzeby pomagamy z niej skorzystać.',
        'Wymienione części proponujemy zwrócić Klientowi przy wydaniu Urządzenia. Jeżeli Klient z nich zrezygnuje, przekazujemy je do utylizacji zgodnie z przepisami.',
        'Wyjątek stanowią części, które musimy oddać dostawcy lub producentowi (np. przy wymianie w ramach gwarancji producenta albo w systemie wymiany, w którym cena uwzględnia zwrot starej części), oraz części, których wydanie byłoby niebezpieczne lub niezgodne z przepisami (np. uszkodzone lub spuchnięte akumulatory). O takim wyjątku informujemy Klienta przed naprawą, najpóźniej w Wycenie.',
        'Części zamawiane specjalnie dla Klienta mogą wymagać przedpłaty (§12 ust. 4).',
      ] }],
    },
    {
      heading: '§9. Dane na Urządzeniach',
      blocks: [{ ol: [
        'Niektóre prace, np. wymiana dysku, aktualizacja oprogramowania lub ponowna instalacja systemu, mogą wiązać się z ryzykiem utraty danych. O takim ryzyku informujemy przed rozpoczęciem prac i wykonujemy je za zgodą Klienta.',
        'Zalecamy wykonanie kopii zapasowej danych przed przekazaniem Urządzenia. Na życzenie Klienta wykonamy kopię jako odpłatną usługę według cennika.',
        'Z danymi Klienta zapoznajemy się tylko w zakresie niezbędnym do wykonania usługi i zachowujemy je w tajemnicy.',
        'Wobec Konsumentów i Przedsiębiorców na prawach konsumenta odpowiadamy za utratę lub uszkodzenie danych na zasadach ogólnych, jeżeli wynika ona z naszego działania lub zaniechania. Przy ustalaniu wysokości odszkodowania może zostać uwzględnione, czy Klient wykonał kopię zapasową (art. 362 Kodeksu cywilnego).',
        'Wobec Przedsiębiorców stosuje się ograniczenie odpowiedzialności z §15 ust. 2.',
        'Jeżeli w ramach usługi przetwarzamy dane osobowe w imieniu Klienta, który jest ich administratorem (np. przy outsourcingu IT), zawieramy umowę powierzenia przetwarzania danych (art. 28 RODO), jeżeli jest wymagana.',
        'Odzyskiwanie danych jest odrębną usługą płatną według cennika. Polega na starannym działaniu i nie gwarantuje odzyskania wszystkich danych. Przed rozpoczęciem informujemy o szansach i kosztach.',
      ] }],
    },
    {
      heading: '§10. Dojazd, odbiór i dostawa, wysyłka kurierska',
      blocks: [{ ol: [
        'Koszty dojazdu do Klienta oraz odbioru i dostawy Urządzenia określa cennik na stronie. Koszt potwierdzamy przy umawianiu terminu.',
        'Klient sam organizuje i opłaca wysyłkę Urządzenia do serwisu. Przed wysyłką przekazujemy instrukcję bezpiecznego pakowania i adres serwisu. Urządzenie należy zapakować w sztywny karton z wypełnieniem chroniącym przed wstrząsami, a drukarki — w miarę możliwości zabezpieczyć zgodnie z instrukcją producenta (np. zablokować głowicę, wyjąć lub zabezpieczyć wkłady).',
        'Do chwili doręczenia nam przesyłki ryzyko jej utraty lub uszkodzenia w transporcie ponosi Klient jako nadawca. Roszczenia wobec przewoźnika przysługują nadawcy. Pomagamy w udokumentowaniu szkody.',
        'Jeżeli przesyłka dotrze do nas uszkodzona, w miarę możliwości sporządzamy z przewoźnikiem protokół szkody, wykonujemy zdjęcia i niezwłocznie informujemy Klienta, zanim rozpoczniemy prace.',
        'Wysyłkę zwrotną organizujemy my. Urządzenie pakujemy starannie, odpowiednio do jego rodzaju, i ubezpieczamy przesyłkę na zadeklarowaną wartość Urządzenia. Wartość Urządzenia do ubezpieczenia oraz koszt wysyłki i ubezpieczenia według cennika przewoźnika uzgadniamy z Klientem przed wysyłką. Koszty te ponosi Klient.',
        { t: 'Ryzyko w wysyłce zwrotnej:', sub: [
          'wobec Konsumenta i Przedsiębiorcy na prawach konsumenta — ponosimy je do chwili wydania Urządzenia Klientowi, chyba że Klient sam wybrał przewoźnika innego niż przez nas proponowany;',
          'wobec Przedsiębiorcy — przechodzi na Klienta z chwilą przekazania Urządzenia przewoźnikowi, chyba że strony uzgodniły inaczej.',
        ] },
        'Przy odbiorze przesyłki prosimy sprawdzić jej stan w obecności kuriera, a w razie uszkodzenia sporządzić protokół szkody. Nie jest to warunek skorzystania przez Konsumenta z jego praw.',
      ] }],
    },
    {
      heading: '§11. Odbiór Urządzenia i przechowywanie',
      blocks: [{ ol: [
        'O zakończeniu usługi albo o zakończeniu prac bez naprawy informujemy Klienta telefonicznie, SMS-em lub e-mailem (dalej: „zawiadomienie”).',
        'Urządzenie można odebrać w serwisie w godzinach pracy, zamówić jego dostawę albo wysyłkę zwrotną (§10).',
        'Przez pierwsze 30 dni od dnia zawiadomienia przechowujemy Urządzenie bezpłatnie.',
        'Od 31. do 90. dnia po zawiadomieniu pobieramy opłatę za przechowywanie w wysokości 5 zł netto (6,15 zł brutto) za każdy rozpoczęty dzień, do dnia odbioru albo wysłania Urządzenia, jeżeli nastąpi wcześniej — łącznie nie więcej niż 300 zł netto (369 zł brutto). Po 90. dniu nie naliczamy automatycznie dalszych opłat. Nie pobieramy jej, jeżeli opóźnienie odbioru wynika z przyczyn leżących po naszej stronie albo jeżeli uzgodniliśmy z Klientem późniejszy termin odbioru.',
        { t: 'Przypominamy Klientowi o odbiorze:', sub: [
          'około 7 dni przed końcem bezpłatnego okresu — z informacją o dacie, od której naliczamy opłatę;',
          'po 60 dniach od zawiadomienia — z informacją o naliczonej kwocie;',
          'po 90 dniach od zawiadomienia — wezwaniem przesłanym e-mailem oraz listem poleconym na adres podany przez Klienta, z wyznaczeniem terminu odbioru nie krótszego niż 14 dni i informacją o dalszym postępowaniu.',
        ] },
        { t: 'Nieodebrane Urządzenie nie staje się naszą własnością i nie zostanie zutylizowane bez zgody Klienta. Jeżeli Klient nie odbierze Urządzenia mimo wezwania, możemy:', sub: [
          'nadal je przechowywać — bez automatycznego naliczania dalszych opłat;',
          'zatrzymać je do czasu zapłaty należności (prawo zatrzymania, art. 461 Kodeksu cywilnego);',
          'złożyć je do depozytu sądowego na koszt Klienta, na zasadach przepisów Kodeksu cywilnego i Kodeksu postępowania cywilnego;',
          'dochodzić należności na drodze prawnej.',
        ] },
        'Klient może w każdej chwili oświadczyć na piśmie lub e-mailem, że rezygnuje z odbioru Urządzenia i zgadza się na jego nieodpłatną utylizację. W takim przypadku usuwamy dane z nośników i przekazujemy Urządzenie do uprawnionego zakładu przetwarzania zużytego sprzętu.',
        'Wydajemy Urządzenie osobie, która przedstawi numer zlecenia lub Potwierdzenie przyjęcia, albo osobie wskazanej przez Klienta.',
      ] }],
    },
    {
      heading: '§12. Ceny, płatności i przedpłata',
      blocks: [{ ol: [
        'Ceny usług podane są w cennikach na stronach poszczególnych usług. Ceny w cennikach są cenami netto — do ceny dolicza się podatek VAT według obowiązującej stawki. Przed zawarciem umowy, w tym w Wycenie, podajemy Konsumentowi i Przedsiębiorcy na prawach konsumenta cenę brutto.',
        'Płatności przyjmujemy wyłącznie przelewem bankowym na rachunek wskazany na fakturze lub w wiadomości od nas. Konsumenci i Przedsiębiorcy na prawach konsumenta płacą przed wydaniem lub wysłaniem Urządzenia, a Przedsiębiorcy — w terminie wskazanym na fakturze.',
        'Za usługi wystawiamy faktury zgodnie z przepisami, w tym — gdy jest to wymagane — w Krajowym Systemie e-Faktur.',
        'W uzasadnionych przypadkach, np. przy zamawianiu drogich części albo przy zamówieniach indywidualnych (np. druk 3D), możemy poprosić o przedpłatę. Jej wysokość i warunki uzgadniamy z Klientem przed wpłatą i potwierdzamy na Trwałym nośniku. Przedpłata jest zaliczana na poczet ceny i nie jest zadatkiem.',
        { t: 'Zwrot przedpłaty:', sub: [
          'jeżeli nie wykonamy usługi z przyczyn leżących po naszej stronie — zwracamy całą przedpłatę w ciągu 14 dni;',
          'jeżeli Konsument lub Przedsiębiorca na prawach konsumenta odstąpi od umowy w terminie 14 dni (§16) — zwracamy płatności w ciągu 14 dni od otrzymania oświadczenia, z potrąceniem wyłącznie wartości usług wykonanych na jego wyraźne żądanie przed odstąpieniem (art. 35 ustawy o prawach konsumenta);',
          'w pozostałych przypadkach rezygnacji Klienta przed zakończeniem usługi — rozliczamy wynagrodzenie za wykonaną część oraz udokumentowane koszty, np. części zamówione specjalnie dla Klienta, których nie można zwrócić dostawcy, z uwzględnieniem kosztów zaoszczędzonych (art. 644 Kodeksu cywilnego). Pozostałą kwotę zwracamy w ciągu 14 dni.',
        ] },
        'Zwrot następuje przelewem na rachunek, z którego dokonano płatności, albo na inny rachunek wskazany przez Klienta.',
      ] }],
    },
    {
      heading: '§13. Gwarancja Omobonus',
      blocks: [{ ol: [
        'Gwarantem jest Omobonus Sp. z o.o. (dane w §1 ust. 2). Udzielamy dobrowolnej gwarancji na wykonane przez nas prace i zamontowane przez nas części. Gwarancja nie obejmuje całego Urządzenia.',
        'Okres gwarancji zależy od usługi. Jest podany w opisie usługi na stronie oraz w dokumencie naprawy (np. fakturze lub karcie naprawy). Gwarancja biegnie od dnia wydania Urządzenia po usłudze i obowiązuje na terytorium Polski.',
        'Jeżeli w okresie gwarancji wystąpi wada, której przyczyna tkwi w wykonanej przez nas pracy lub w zamontowanej części, usuniemy ją bezpłatnie — przez ponowną naprawę albo wymianę części.',
        'Termin naprawy gwarancyjnej podajemy Klientowi po sprawdzeniu Urządzenia i potwierdzamy na Trwałym nośniku. Zmianę tego terminu uzgadniamy z Klientem. Nie narusza to bezwzględnie obowiązujących przepisów — w szczególności na reklamację Konsumenta i Przedsiębiorcy na prawach konsumenta odpowiadamy w ciągu 14 dni, a niezgodność usługi z umową usuwamy w rozsądnym czasie (§14).',
        'Urządzenie w ramach gwarancji należy dostarczyć do serwisu (ul. Marcina Bukowskiego 174, Wrocław). Koszt dostarczenia z terenu Polski ponosimy my — sposób dostarczenia uzgadniamy z Klientem.',
        'Gwarancja nie obejmuje usterek, których przyczyną jest: uszkodzenie mechaniczne, zalanie, przepięcie lub inne zdarzenie zewnętrzne; używanie Urządzenia niezgodnie z instrukcją producenta; ingerencja osób trzecich w naprawiony element; naturalne zużycie części eksploatacyjnych; użycie materiałów eksploatacyjnych niespełniających wymagań producenta — jeżeli to one spowodowały usterkę. Wyłączenie dotyczy wyłącznie usterek wynikających z tych przyczyn.',
        'Przy usługach, których efekt w dużej mierze zależy od stanu Urządzenia (np. czyszczenie lub regeneracja głowicy drukującej), okres gwarancji jest krótszy i podany w opisie usługi.',
        'Uprawnienia z gwarancji można zgłosić e-mailem, telefonicznie lub osobiście, podając numer zlecenia lub numer faktury i opis usterki.',
        'Gwarancja nie wyłącza, nie ogranicza i nie zawiesza uprawnień Klienta wynikających z przepisów o odpowiedzialności za wady lub o zgodności usługi z umową (§14). Klient może wybrać, z której podstawy korzysta.',
      ] }],
    },
    {
      heading: '§14. Odpowiedzialność za wady i reklamacje',
      blocks: [{ ol: [
        'Wobec Konsumentów i Przedsiębiorców na prawach konsumenta odpowiadamy za wady i niezgodność usługi z umową na zasadach przepisów prawa, w szczególności Kodeksu cywilnego (rękojmia za wady dzieła, art. 638) oraz ustawy o prawach konsumenta — w przypadkach w niej przewidzianych (np. gdy wynikiem usługi jest nowa rzecz, taka jak wydruk 3D).',
        'Odpowiadamy za wady, które ujawnią się w terminach przewidzianych w przepisach (co do zasady w ciągu 2 lat od wydania Urządzenia lub rzeczy).',
        'Wobec Przedsiębiorców odpowiadamy na zasadach Kodeksu cywilnego, z ograniczeniem z §15 ust. 2.',
        'Reklamację można złożyć e-mailem na adres serwis@omobonus.com.pl, pisemnie na adres serwisu lub osobiście. Prosimy podać: imię i nazwisko lub nazwę firmy, dane kontaktowe, numer zlecenia lub faktury, opis problemu i oczekiwany sposób rozwiązania. Brak któregoś z tych elementów nie powoduje odrzucenia reklamacji — w razie potrzeby poprosimy o uzupełnienie.',
        'Na reklamację Konsumenta lub Przedsiębiorcy na prawach konsumenta odpowiadamy w ciągu 14 dni kalendarzowych od jej otrzymania, na papierze lub innym Trwałym nośniku. Jeżeli nie odpowiemy w tym terminie, uznaje się, że reklamację uznaliśmy. Na reklamacje Przedsiębiorców odpowiadamy w miarę możliwości w tym samym terminie.',
      ] }],
    },
    {
      heading: '§15. Zakres odpowiedzialności',
      blocks: [{ ol: [
        'Wobec Konsumentów i Przedsiębiorców na prawach konsumenta odpowiadamy na zasadach przepisów, bez ograniczeń wynikających z Regulaminu.',
        'Wobec Przedsiębiorców nasza odpowiedzialność z tytułu niewykonania lub nienależytego wykonania umowy jest ograniczona do wysokości wynagrodzenia za daną usługę i nie obejmuje utraconych korzyści. Ograniczenie nie dotyczy szkody wyrządzonej umyślnie.',
        'Nie odpowiadamy za niewykonanie lub opóźnienie spowodowane siłą wyższą, czyli zdarzeniem zewnętrznym, którego nie można było przewidzieć ani mu zapobiec. O takim zdarzeniu informujemy Klienta bez zbędnej zwłoki.',
      ] }],
    },
    {
      heading: '§16. Prawo odstąpienia od umowy (Konsumenci i Przedsiębiorcy na prawach konsumenta)',
      blocks: [{ ol: [
        'Prawo odstąpienia dotyczy umów zawartych na odległość (np. telefonicznie, e-mailem, przez formularz lub komunikator, bez jednoczesnej obecności stron — w tym przy wysyłce kurierskiej) oraz poza lokalem przedsiębiorstwa (np. w domu Klienta). Nie dotyczy umów zawartych w serwisie przy ul. Marcina Bukowskiego 174.',
        'Klient może odstąpić od umowy w terminie 14 dni od jej zawarcia, bez podawania przyczyny. Wystarczy przed upływem terminu wysłać oświadczenie e-mailem na adres serwis@omobonus.com.pl lub pisemnie na adres serwisu. Można skorzystać ze wzoru formularza (Załącznik nr 1), ale nie jest to obowiązkowe. Otrzymanie oświadczenia potwierdzamy e-mailem.',
        'Przed upływem terminu odstąpienia rozpoczynamy usługę tylko na wyraźne żądanie Klienta. Przy umowie zawartej poza lokalem żądanie musi być złożone na Trwałym nośniku. Jeżeli Klient odstąpi od umowy po rozpoczęciu usługi, płaci za świadczenia spełnione do chwili odstąpienia, proporcjonalnie do uzgodnionej ceny (art. 35 ustawy o prawach konsumenta).',
        { t: 'Prawo odstąpienia nie przysługuje (art. 38 ustawy o prawach konsumenta) w szczególności:', sub: [
          'gdy usługa została w pełni wykonana za wyraźną i uprzednią zgodą Klienta, który przed rozpoczęciem usługi został poinformowany, że po jej wykonaniu utraci prawo odstąpienia, i przyjął to do wiadomości;',
          'w odniesieniu do pilnej naprawy lub konserwacji, jeżeli Klient wyraźnie zażądał przyjazdu w tym celu. Prawo odstąpienia przysługuje jednak w odniesieniu do innych usług i rzeczy niż części niezbędne do tej naprawy lub konserwacji;',
          'gdy Klient wyraźnie zażądał przyjazdu w celu naprawy, a usługa została w pełni wykonana za jego wyraźną i uprzednią zgodą;',
          'gdy przedmiotem umowy jest rzecz wykonana według specyfikacji Klienta lub służąca zaspokojeniu jego zindywidualizowanych potrzeb (np. wydruk 3D według modelu Klienta). Wyłączenie stosuje się tylko wtedy, gdy rzecz rzeczywiście ma taki charakter.',
        ] },
        'Wyłączeń z ust. 4 lit. b i c nie stosuje się, jeżeli przyjechaliśmy do Klienta bez wcześniejszego umówienia wizyty. Takich wizyt nie składamy.',
        'Zwrot płatności następuje zgodnie z §12 ust. 5 lit. b. Urządzenie Klienta wydajemy na zasadach §11.',
      ] }],
    },
    {
      heading: '§17. Wynajem drukarek i urządzenia zastępcze',
      blocks: [{ ol: [
        'Wynajem drukarek i urządzeń zastępczych realizujemy dla osób prywatnych i firm na podstawie odrębnej umowy. Nie pobieramy kaucji.',
        'Wynajem: miesięczny abonament z pakietem stron. W cenie są toner, części i naprawy wynikające z normalnej eksploatacji oraz dostawa i instalacja. Papier i energię elektryczną zapewnia Klient. Minimalny okres to 1 miesiąc, bez długoterminowego zobowiązania. Na zgłoszenia awarii reagujemy do 24 godzin w Dni robocze.',
        'Warunki korzystania, zwrotu urządzenia oraz odpowiedzialności za uszkodzenia wykraczające poza normalne zużycie określa umowa. Przed jej zawarciem przekazujemy jej treść Klientowi.',
        'Urządzenie zastępcze: bez opłaty abonamentowej. Klient płaci za wykonane wydruki według licznika (toner w cenie), papier zapewnia Klient. Dostępność urządzeń zastępczych nie jest gwarantowana — zależy od aktualnych zasobów.',
        'Jeżeli umowa z Konsumentem lub Przedsiębiorcą na prawach konsumenta zostanie zawarta na odległość lub poza lokalem, przysługuje mu prawo odstąpienia (§16).',
      ] }],
    },
    {
      heading: '§18. Druk 3D i projektowanie modeli 3D',
      blocks: [{ ol: [
        'Cenę druku 3D ustalamy indywidualnie (przygotowanie, materiał, czas druku) i podajemy w Wycenie przed realizacją. Możemy poprosić o przedpłatę (§12 ust. 4).',
        'Jeżeli Klient przekazuje własny model (np. plik STL), oświadcza, że ma prawo do korzystania z niego i do wykonania wydruku. Odmawiamy wykonania wydruków naruszających prawo, w tym prawa osób trzecich.',
        'Jeżeli na zamówienie Klienta projektujemy model 3D, po zapłacie Klient otrzymuje niewyłączną licencję na korzystanie z modelu w celach uzgodnionych w zamówieniu. Autorskie prawa majątkowe nie przechodzą na Klienta automatycznie. Ich przeniesienie jest możliwe na podstawie odrębnej umowy zawartej na piśmie. Pliki modelu przekazujemy, jeżeli uzgodniono to w zamówieniu.',
        'Wydruki 3D mają cechy wynikające z technologii, np. widoczne warstwy i tolerancje wymiarowe. Parametry, w tym materiał i dokładność, podajemy w Wycenie. Cechy mieszczące się w uzgodnionych parametrach nie są wadą.',
        'Gotowe wydruki można odebrać osobiście albo otrzymać kurierem lub do paczkomatu. Do wysyłki stosuje się §10.',
        'Do prawa odstąpienia stosuje się §16. Do reklamacji stosuje się §14.',
      ] }],
    },
    {
      heading: '§19. Outsourcing IT',
      blocks: [{ ol: [
        'Outsourcing IT świadczymy dla firm i osób prywatnych na podstawie odrębnej umowy, która określa zakres, sposób i czas reakcji oraz cenę.',
        'Jeżeli w ramach usługi przetwarzamy dane osobowe w imieniu Klienta, który jest ich administratorem, zawieramy umowę powierzenia przetwarzania danych (art. 28 RODO).',
        'Jeżeli Klient jest osobą prywatną i korzysta z usługi wyłącznie do celów osobistych lub domowych, przepisy RODO o powierzeniu nie mają zastosowania. Dane zachowujemy wtedy w tajemnicy zgodnie z §9 ust. 3.',
        'Konsumentom i Przedsiębiorcom na prawach konsumenta przysługują uprawnienia wynikające z przepisów, w tym prawo odstąpienia (§16).',
      ] }],
    },
    {
      heading: '§20. Pozasądowe rozwiązywanie sporów i właściwość sądów',
      blocks: [{ ol: [
        { t: 'Konsument może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, w szczególności:', sub: [
          'zwrócić się do stałego polubownego sądu konsumenckiego przy Wojewódzkim Inspektoracie Inspekcji Handlowej we Wrocławiu;',
          'złożyć wniosek o mediację do Wojewódzkiego Inspektora Inspekcji Handlowej we Wrocławiu;',
          'uzyskać bezpłatną pomoc Miejskiego Rzecznika Konsumentów we Wrocławiu lub organizacji konsumenckich (np. Federacji Konsumentów, Stowarzyszenia Konsumentów Polskich);',
          'w sporach transgranicznych — zwrócić się do Europejskiego Centrum Konsumenckiego.',
        ] },
        'Informacje i adresy znajdują się na stronie UOKiK: [prawakonsumenta.uokik.gov.pl](https://prawakonsumenta.uokik.gov.pl).',
        'Decyzję o udziale w postępowaniu pozasądowym podejmujemy indywidualnie w każdej sprawie. Udział jest dobrowolny dla obu stron.',
        'Do umów stosuje się prawo polskie. Wobec Konsumenta wybór prawa nie pozbawia go ochrony przysługującej mu na podstawie przepisów, których nie można wyłączyć w drodze umowy, obowiązujących w państwie jego zwykłego pobytu.',
        'Spory z Konsumentami i Przedsiębiorcami na prawach konsumenta rozpoznaje sąd właściwy według przepisów ogólnych. Spory z Przedsiębiorcami rozpoznaje sąd właściwy dla siedziby Omobonus.',
      ] }],
    },
    {
      heading: '§21. Zmiany Regulaminu i postanowienia końcowe',
      blocks: [{ ol: [
        'Możemy zmienić Regulamin z ważnych przyczyn, w szczególności przy zmianie przepisów, zakresu usług lub sposobu ich świadczenia. Nową wersję publikujemy na stronie z podaniem daty wejścia w życie.',
        'Do zleceń przyjętych przed zmianą stosuje się Regulamin w brzmieniu obowiązującym w dniu ich przyjęcia. Zmiany w umowach zawartych na czas dłuższy (np. wynajem, outsourcing IT) następują na zasadach tych umów.',
        'Regulamin sporządzono w języku polskim. Wersje w innych językach są tłumaczeniami pomocniczymi; w razie rozbieżności rozstrzyga wersja polska.',
        'Regulamin obowiązuje od dnia 24 października 2026 r.',
        'Załącznik nr 1 — wzór formularza odstąpienia od umowy (poniżej).',
      ] }],
    },
    {
      heading: 'Załącznik nr 1 — Wzór formularza odstąpienia od umowy',
      blocks: [
        { p: '(formularz ten należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)' },
        { ul: [
          'Adresat: Omobonus Sp. z o.o., ul. Marcina Bukowskiego 174, 52-418 Wrocław, e-mail: serwis@omobonus.com.pl',
          'Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym odstąpieniu od umowy o świadczenie następującej usługi(*) / umowy o dzieło polegającej na wykonaniu następującej rzeczy(*): …………………………',
          'Data zawarcia umowy: ……………',
          'Numer zlecenia (jeśli jest): ……………',
          'Imię i nazwisko konsumenta(-ów): ……………',
          'Adres konsumenta(-ów): ……………',
          'Podpis konsumenta(-ów) (tylko jeżeli formularz jest przesyłany w wersji papierowej): ……………',
          'Data: ……………',
        ] },
        { p: '(*) Niepotrzebne skreślić.' },
      ],
    },
  ],
}

export const politykaPl: LegalDoc = {
  intro: '“Chcesz zapoznać się z naszą Polityką Prywatności? Przeczytaj poniżej.”',
  title: 'Polityka Prywatności',
  lastUpdatedLabel: 'Ostatnia aktualizacja',
  dateLocale: 'pl-PL',
  lastUpdated: LEGAL_DATE,
  sections: [
    {
      heading: '1. Administrator danych',
      blocks: [
        { p: 'Administratorem Twoich danych osobowych jest Omobonus Sp. z o.o., ul. Saperów 45/8, 53-151 Wrocław, NIP 8943160773, KRS 0000869086. We wszystkich sprawach dotyczących danych osobowych możesz kontaktować się z nami e-mailem: serwis@omobonus.com.pl, telefonicznie: +48 793 759 262 lub pisemnie na adres serwisu: ul. Marcina Bukowskiego 174, 52-418 Wrocław.' },
        { p: 'Nie wyznaczyliśmy inspektora ochrony danych, ponieważ nie mamy takiego obowiązku.' },
      ],
    },
    {
      heading: '2. Skąd mamy Twoje dane',
      blocks: [{ ul: [
        'od Ciebie — gdy wypełniasz formularz, prosisz o oddzwonienie, dzwonisz, piszesz e-mail lub wiadomość w komunikatorze albo oddajesz Urządzenie w serwisie;',
        'automatycznie — gdy korzystasz ze strony (dane techniczne, a po wyrażeniu zgody również pliki cookies i podobne technologie);',
        'od firmy, w której pracujesz — jeżeli kontaktujesz się z nami w jej imieniu;',
        'z serwisu Google — jeżeli wystawiłeś opinię o Omobonus w Google (pkt 9).',
      ] }],
    },
    {
      heading: '3. Cele, podstawy prawne i okresy przechowywania',
      blocks: [
        { rows: [
          { title: 'Odpowiedź na zgłoszenie z formularza, prośbę o oddzwonienie, e-mail, telefon lub wiadomość w komunikatorze; przygotowanie wyceny', lines: [
            ['Dane', 'imię, telefon, e-mail, adres, rodzaj i model urządzenia, opis problemu, załączniki, język strony, kraj numeru telefonu'],
            ['Podstawa', 'art. 6 ust. 1 lit. b RODO — działania przed zawarciem umowy na Twoje żądanie; dla osób działających w imieniu firmy — art. 6 ust. 1 lit. f RODO (kontakt z klientem biznesowym)'],
            ['Okres', '12 miesięcy od ostatniego kontaktu, jeżeli nie doszło do zlecenia'],
          ] },
          { title: 'Zawarcie i wykonanie umowy: diagnoza, naprawa, dojazd, wysyłka, wynajem, druk 3D, outsourcing IT; Potwierdzenie przyjęcia', lines: [
            ['Dane', 'jak wyżej oraz numer zlecenia, opis i stan urządzenia, adres dostawy, dane do faktury, korespondencja'],
            ['Podstawa', 'art. 6 ust. 1 lit. b RODO'],
            ['Okres', 'przez czas wykonywania umowy, a następnie około 3 lat od jej zakończenia (gwarancja, rękojmia, reklamacje)'],
          ] },
          { title: 'Rozpatrywanie reklamacji i zgłoszeń gwarancyjnych', lines: [
            ['Dane', 'dane kontaktowe, dane zlecenia, treść reklamacji'],
            ['Podstawa', 'art. 6 ust. 1 lit. b i c RODO (obowiązki z ustawy o prawach konsumenta i Kodeksu cywilnego)'],
            ['Okres', 'jak wyżej'],
          ] },
          { title: 'Księgowość i podatki', lines: [
            ['Dane', 'dane z faktur i dokumentów księgowych'],
            ['Podstawa', 'art. 6 ust. 1 lit. c RODO — przepisy o rachunkowości i podatkach'],
            ['Okres', 'przez okres wymagany przepisami, co do zasady 5 lat od końca roku kalendarzowego, w którym upłynął termin płatności podatku'],
          ] },
          { title: 'Ustalenie, dochodzenie i obrona roszczeń', lines: [
            ['Dane', 'dane potrzebne do wykazania faktów'],
            ['Podstawa', 'art. 6 ust. 1 lit. f RODO — nasz prawnie uzasadniony interes'],
            ['Okres', 'do upływu terminów przedawnienia roszczeń, a w razie sporu — do jego zakończenia'],
          ] },
          { title: 'Kalkulator kosztu dojazdu', lines: [
            ['Dane', 'wpisany adres; lokalizacja urządzenia — tylko jeśli zezwolisz na nią w przeglądarce'],
            ['Podstawa', 'art. 6 ust. 1 lit. b RODO — wycena na Twoje żądanie'],
            ['Okres', 'nie zapisujemy tych danych w naszych systemach; są przekazywane do Google Maps Platform wyłącznie w celu wyznaczenia trasy'],
          ] },
          { title: 'Bezpieczeństwo strony, ochrona formularzy przed spamem i nadużyciami', lines: [
            ['Dane', 'adres IP, dane techniczne zapytań'],
            ['Podstawa', 'art. 6 ust. 1 lit. f RODO'],
            ['Okres', 'licznik zapytań — krótkotrwale w pamięci serwera; logi techniczne hostingodawcy — przez krótki okres przewidziany w usłudze hostingu'],
          ] },
          { title: 'Statystyki i analiza korzystania ze strony (Google Analytics 4, Microsoft Clarity)', lines: [
            ['Dane', 'identyfikatory z plików cookies, informacje o urządzeniu i przeglądarce, odwiedzone strony, kliknięcia, przewijanie, przybliżona lokalizacja'],
            ['Podstawa', 'art. 6 ust. 1 lit. a RODO — Twoja zgoda (w związku z art. 399 Prawa komunikacji elektronicznej)'],
            ['Okres', 'do wycofania zgody; dane w Google Analytics — nie dłużej niż 14 miesięcy; w Microsoft Clarity — nagrania sesji 30 dni, dane zbiorcze do 13 miesięcy'],
          ] },
          { title: 'Pomiar skuteczności reklam Google Ads, w tym konwersje rozszerzone i Google Signals', lines: [
            ['Dane', 'identyfikatory reklamowe, informacja o kliknięciu reklamy i wykonaniu akcji (np. wysłanie formularza, kliknięcie numeru telefonu), zahaszowany e-mail i telefon z formularza'],
            ['Podstawa', 'art. 6 ust. 1 lit. a RODO — Twoja zgoda'],
            ['Okres', 'do wycofania zgody; pliki cookies — do 90 dni; po stronie Google według zasad Google'],
          ] },
          { title: 'Mapa Google w stopce strony', lines: [
            ['Dane', 'adres IP, informacje o przeglądarce'],
            ['Podstawa', 'art. 6 ust. 1 lit. f RODO — pokazanie, jak do nas dojechać, gdy sam włączysz mapę przyciskiem „Pokaż mapę”'],
            ['Okres', 'nie zapisujemy tych danych; po stronie Google według zasad Google'],
          ] },
          { title: 'Wyświetlanie opinii Google na stronie', lines: [
            ['Dane', 'imię lub nazwa autora, zdjęcie profilowe, treść, ocena i data opinii'],
            ['Podstawa', 'art. 6 ust. 1 lit. f RODO — prezentacja opinii o naszych usługach'],
            ['Okres', 'do usunięcia opinii w Google (znika ze strony przy najbliższej cotygodniowej aktualizacji) lub do uwzględnienia Twojego sprzeciwu'],
          ] },
          { title: 'Zarządzanie zgodami na pliki cookies', lines: [
            ['Dane', 'Twój wybór, data, identyfikator zgody, informacje o przeglądarce, skrócony adres IP'],
            ['Podstawa', 'art. 6 ust. 1 lit. c w związku z art. 7 ust. 1 RODO (wykazanie zgody)'],
            ['Okres', 'plik cookie z Twoim wyborem — 1 rok; dziennik zgód w CookieYes — przez okres przewidziany w tej usłudze, nie dłużej niż jest to potrzebne do wykazania zgody'],
          ] },
        ] },
        { p: 'W uzasadnionych przypadkach — gdy trwa reklamacja, gwarancja, spór lub wymagają tego przepisy — przechowujemy dane dłużej, do czasu zakończenia sprawy lub upływu terminu wynikającego z przepisów. Dokumenty papierowe (np. Potwierdzenia przyjęcia) przechowujemy przez te same okresy, a następnie je niszczymy.' },
      ],
    },
    {
      heading: '4. Formularz zgłoszenia i prośba o oddzwonienie',
      blocks: [{ ul: [
        'Wiadomość z formularza trafia na naszą skrzynkę e-mail. Kopię wysyłamy na podany przez Ciebie adres e-mail.',
        'Do formularza możesz dołączyć zdjęcia, filmy lub dokumenty. Prosimy nie przesyłać dokumentów tożsamości ani informacji o zdrowiu lub innych danych szczególnych kategorii.',
        'Formularz zawiera ukryte pole chroniące przed spamem. Liczba zapytań z jednego adresu IP jest krótkotrwale ograniczana.',
        'Podanie danych oznaczonych jako wymagane jest potrzebne do odpowiedzi na zgłoszenie.',
        'Wysłanie formularza nie oznacza zgody na przetwarzanie danych ani akceptacji Regulaminu — dane z formularza przetwarzamy, aby odpowiedzieć na zgłoszenie (pkt 3). Umowę zawieramy dopiero na zasadach Regulaminu.',
        'Dane zleceń prowadzimy w programie do ewidencji napraw oraz — w przypadku Potwierdzeń przyjęcia i innych dokumentów — w formie papierowej.',
      ] }],
    },
    {
      heading: '5. Komunikatory',
      blocks: [{ p: 'Na stronie znajdują się linki do kontaktu przez WhatsApp, Viber i Telegram. Jeżeli z nich skorzystasz, operator komunikatora (WhatsApp — Meta, Viber — Rakuten Viber, Telegram) przetwarza Twoje dane jako odrębny administrator, według własnej polityki prywatności. My przetwarzamy treść rozmowy w celach opisanych w pkt 3.' }],
    },
    {
      heading: '6. Kalkulator kosztu dojazdu i mapa',
      blocks: [{ ul: [
        'Kalkulator przekazuje wpisany adres (albo lokalizację, jeżeli zezwolisz na nią w przeglądarce) z naszego serwera do usług Google Maps Platform (wyszukiwanie adresu, wyznaczanie trasy, podpowiedzi adresów, mapa statyczna), aby obliczyć odległość i koszt. Nie zapisujemy tych danych.',
        'Mapa w stopce strony jest wyświetlana przez Google Maps, ale nie ładuje się automatycznie. W jej miejscu widzisz informację i przycisk „Pokaż mapę”. Dopiero po jego kliknięciu Google otrzymuje Twój adres IP i informacje o przeglądarce i może zapisać własne pliki cookies na zasadach Google. Wybór nie jest zapamiętywany — przy kolejnym wyświetleniu strony mapa znów czeka na kliknięcie.',
      ] }],
    },
    {
      heading: '7. Analityka i reklama',
      blocks: [
        { p: '**Google Analytics 4 i Google Tag Manager.** Korzystamy z Google Analytics 4, aby wiedzieć, jak odwiedzający korzystają ze strony (np. odwiedzone strony, kliknięcia w linki, przewijanie, wysłanie formularza, skopiowanie adresu e-mail lub numeru telefonu). Mamy włączoną funkcję Google Signals: jeżeli jesteś zalogowany na konto Google i zezwoliłeś Google na personalizację reklam, Google może łączyć dane z różnych urządzeń w zbiorcze raporty. Narzędzia uruchamiamy przez Google Tag Manager.' },
        { p: '**Google Ads i konwersje rozszerzone.** Mierzymy, czy reklamy Google Ads prowadzą do kontaktu (np. wysłania formularza lub kliknięcia numeru telefonu albo komunikatora). Jeżeli zgodzisz się na przekazywanie danych do celów reklamowych, po wysłaniu formularza Twój adres e-mail i numer telefonu są w przeglądarce przekształcane funkcją skrótu (hash SHA-256) i przekazywane do Google w celu dopasowania konwersji do konta Google. Haszowanie nie jest anonimizacją — takie dane nadal są danymi osobowymi. W części tych działań Google działa jako odrębny administrator.' },
        { p: '**Microsoft Clarity.** Wyłącznie za Twoją zgodą na pliki analityczne korzystamy z Microsoft Clarity, które tworzy mapy kliknięć i nagrania sesji (ruchy kursora, kliknięcia, przewijanie), abyśmy mogli poprawiać stronę.' },
        { p: '**Tryb zgody Google (Consent Mode).** Domyślnie wszystkie zgody na pliki analityczne i reklamowe są ustawione jako „odmowa”. Strona korzysta z podstawowego trybu zgody: dopóki nie zgodzisz się na pliki analityczne lub reklamowe, Google Tag Manager nie jest ładowany, więc Google Analytics, Google Ads i Microsoft Clarity nie są uruchamiane i nie otrzymują od nas żadnych danych. Działania wykonane przed wyrażeniem zgody (np. wysłanie formularza) nie są później przekazywane. Po wyrażeniu zgody narzędzia działają tylko w zakresie wybranych kategorii — np. zgoda wyłącznie na analitykę nie uruchamia pomiaru reklam. Po wycofaniu zgody narzędzia przestają zapisywać i odczytywać pliki cookies, a od kolejnej odsłony strony nie są ładowane.' },
        { p: 'Nie wysyłamy newsletterów ani wiadomości marketingowych e-mailem lub SMS-em.' },
      ],
    },
    {
      heading: '8. Pliki cookies i podobne technologie',
      blocks: [
        { p: 'Pliki cookies to małe pliki zapisywane na Twoim urządzeniu. Zgodnie z art. 399 Prawa komunikacji elektronicznej zapisujemy je i odczytujemy tylko za Twoją zgodą — z wyjątkiem plików niezbędnych do działania strony. Zgodę wyrażasz w banerze CookieYes przy pierwszej wizycie. Możesz ją w każdej chwili zmienić lub wycofać — tak samo łatwo, jak ją wyraziłeś — przyciskiem poniżej albo przyciskiem „Ustawienia cookies” w stopce każdej strony. Pliki cookies możesz też usuwać w ustawieniach przeglądarki.' },
        { cookieButton: 'Zmień ustawienia plików cookies' },
        { rows: [
          { title: 'Niezbędne — CookieYes: cookieyes-consent', lines: [['Cel', 'zapamiętanie Twojego wyboru'], ['Okres', '1 rok']] },
          { title: 'Analityczne — Google Analytics: _ga, _ga_*', lines: [['Cel', 'statystyki odwiedzin'], ['Okres', '1 rok i 1 miesiąc']] },
          { title: 'Analityczne — Microsoft Clarity: _clck, _clsk', lines: [['Cel', 'mapy kliknięć, nagrania sesji'], ['Okres', '1 rok / 1 dzień']] },
          { title: 'Reklamowe — Google Ads: _gcl_au; doubleclick.net: test_cookie', lines: [['Cel', 'pomiar konwersji z reklam; sprawdzenie, czy przeglądarka obsługuje pliki cookies'], ['Okres', '3 miesiące / 15 minut']] },
          { title: 'Mapa Google — pliki cookies Google (np. NID), tylko po kliknięciu „Pokaż mapę”', lines: [['Cel', 'działanie mapy; pliki zapisuje Google na własnych zasadach'], ['Okres', 'według zasad Google']] },
          { title: 'Techniczne (tylko nasi pracownicy) — internal', lines: [['Cel', 'wyłączenie wizyt pracowników ze statystyk'], ['Okres', '1 dzień']] },
        ] },
      ],
    },
    {
      heading: '9. Opinie Google',
      blocks: [{ p: 'Na stronie wyświetlamy wybrane opinie o Omobonus z Google: imię lub nazwę autora, zdjęcie profilowe, treść, ocenę i datę. Opinie pobieramy raz w tygodniu przez interfejs Google, a tłumaczenia na inne języki strony wykonujemy usługą Google Cloud Translation. Jeżeli usuniesz opinię w Google, zniknie ona ze strony przy najbliższej aktualizacji. Możesz też zgłosić sprzeciw — wtedy usuniemy opinię ze strony.' }],
    },
    {
      heading: '10. Odbiorcy danych',
      blocks: [{ ul: [
        'Vercel Inc. (USA) — hosting strony; formularze są obsługiwane na serwerach w Unii Europejskiej (Frankfurt);',
        'cyber_Folks S.A. z siedzibą w Poznaniu (marka Zenbox) — hosting poczty e-mail;',
        'Google Ireland Limited i Google LLC — Google Tag Manager, Google Analytics, Google Ads, Google Maps Platform, pobieranie i tłumaczenie opinii;',
        'Microsoft Ireland Operations Limited i Microsoft Corporation — Microsoft Clarity;',
        'CookieYes Limited (Wielka Brytania) — zarządzanie zgodami na pliki cookies;',
        'dostawca oprogramowania do ewidencji napraw;',
        'podmioty świadczące nam usługi księgowe, bank, firmy kurierskie (gdy wysyłamy Urządzenie) oraz podwykonawcy, jeżeli z ich pomocą wykonujemy usługę;',
        'podmioty uprawnione na podstawie przepisów (np. organy publiczne) — gdy tego wymagają.',
      ] }],
    },
    {
      heading: '11. Przekazywanie danych poza Europejski Obszar Gospodarczy',
      blocks: [{ p: 'Niektórzy odbiorcy (Google LLC, Microsoft Corporation, Vercel Inc.) mogą przetwarzać dane w USA. Podstawą przekazania jest decyzja Komisji Europejskiej w sprawie EU-U.S. Data Privacy Framework (w odniesieniu do podmiotów certyfikowanych) lub standardowe klauzule umowne zatwierdzone przez Komisję. Przekazanie danych do Wielkiej Brytanii (CookieYes) odbywa się na podstawie decyzji Komisji stwierdzającej odpowiedni stopień ochrony. Informację o zabezpieczeniach możesz otrzymać na prośbę.' }],
    },
    {
      heading: '12. Twoje prawa',
      blocks: [{ p: 'Masz prawo do: dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych oraz sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie. Jeżeli przetwarzamy dane na podstawie zgody, możesz ją wycofać w każdej chwili. Nie wpływa to na zgodność z prawem przetwarzania przed wycofaniem. Wniosek wyślij na adres serwis@omobonus.com.pl — odpowiadamy w ciągu miesiąca. Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, [uodo.gov.pl](https://uodo.gov.pl)).' }],
    },
    {
      heading: '13. Czy musisz podać dane',
      blocks: [{ p: 'Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na zgłoszenie i nie wykonamy usługi. Dane do faktury są wymagane przepisami podatkowymi.' }],
    },
    {
      heading: '14. Zautomatyzowane decyzje',
      blocks: [{ p: 'Nie podejmujemy decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, które wywołują wobec Ciebie skutki prawne lub podobnie istotnie na Ciebie wpływają. Google może profilować użytkowników na potrzeby reklam tylko w zakresie Twojej zgody.' }],
    },
    {
      heading: '15. Zmiany polityki',
      blocks: [{ p: 'Politykę aktualizujemy, gdy zmieniają się przepisy lub używane przez nas narzędzia. Aktualna wersja jest zawsze dostępna na tej stronie, a datę ostatniej aktualizacji podajemy poniżej. Polityka została sporządzona w języku polskim; wersje w innych językach są tłumaczeniami pomocniczymi. Warunki świadczenia usług opisuje [Regulamin](/regulamin).' }],
    },
  ],
}
