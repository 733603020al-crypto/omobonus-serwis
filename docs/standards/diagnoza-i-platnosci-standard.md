# Диагностика и платежи

## Что это
Правила, как везде на сайте описывать диагностику и оплату (утверждено 2026-10-28): в прайсах, окнах, FAQ, формах, шаблонах ответов клиентам и regulamin, на всех языках.

## Главное
- Бесплатная консультация и короткий осмотр при приёме не заменяют полную диагностику.
- Если клиент заказывает ремонт — диагностика отдельно не оплачивается, входит в цену ремонта.
- Если причина найдена, названа цена, а клиент отказался — диагностика платная по заранее названной цене.
- Если причину найти не удалось — диагностика бесплатна.
- Деления на «простую» и «сложную» диагностику нет, дополнительных платежей не вводим.
- Транспорт платный отдельно; действующие условия транспорта не меняем.

## Для Claude (техническое)
Всё ниже — для Claude: исходный текст правил, как он был. Читать не обязательно.

## Diagnoza i płatności — zasady (utwierdzone przez użytkownika 2026-10-28)

Obowiązują wszystkie teksty o diagnozie i opłatach: cenniki, karty, okna, FAQ, podpowiedzi, formularze, potwierdzenia, szablony odpowiedzi klientom, regulamin — we wszystkich językach (PL źródłem, UK/RU/EN zsynchronizowane).

1. Bezpłatna konsultacja wstępna i krótkie sprawdzenie przy przyjęciu nie zastępują pełnej diagnozy.
2. Pełna diagnoza i wycena = ustalenie przyczyny usterki i czynności potrzebnych do naprawy.
3. Gdy Klient zleca naprawę — brak osobnej opłaty za diagnozę, jest wliczona w cenę naprawy.
4. Gdy przyczyna jest ustalona i podana wycena, a Klient rezygnuje — diagnoza płatna według ceny podanej i uzgodnionej wcześniej. Przy serwisie wysyłkowym Klient zna tę cenę przed wysłaniem urządzenia.
5. Gdy nie uda się ustalić przyczyny usterki — brak opłaty za diagnozę.
6. Nie ma podziału na diagnozę standardową i złożoną. Nie wprowadzać takich kategorii ani dodatkowych opłat.
7. Naprawa droga, nieopłacalna albo chwilowy brak części to rezygnacja Klienta po wycenie — diagnoza płatna (praca została wykonana; część Klient może też dostarczyć sam). Nie pisać „naprawa niemożliwa” ani „serwis odmawia naprawy” — takich sytuacji nie ma. Bezpłatna diagnoza tylko przy zleceniu naprawy lub nieustalonej przyczynie.
8. Transport jest płatny osobno. Istniejących warunków i taryf transportu nie zmieniać.

Zatwierdzony dopisek w cenniku (nie zmieniać): «Pełna diagnoza i wycena naprawy (bezpłatna przy zleceniu naprawy lub gdy nie znajdziemy przyczyny usterki)», cena «GRATIS».

Źródła tekstów: `src/lib/services-data-*-shared.ts` (wspólne pozycje i FAQ), `src/lib/services-data-*.ts` (FAQ usług), `src/lib/legal/legal-texts-{pl,uk,ru,en}.ts` (§6.2), `src/components/serwis-wysylkowy/sections/services.tsx` (okna kroków serwisu wysyłkowego), `.claude/skills/odpowiedzi-klientom/SKILL.md` (odpowiedzi klientom).

