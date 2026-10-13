import type { PricingSubcategory } from './services-data-types'

type Lang = 'pl' | 'ru' | 'uk'
type Item = [string, string, string, string, string]
type Group = [string, string, string, string, Item[]]

const groups: Group[] = [
  ['Pompy i układ ciśnienia','Насосы и система давления','Насоси та система тиску','naprawy-pompy',[
    ['Wymiana pompy wibracyjnej\n(ekspres nie pobiera wody, pompa głośno pracuje, brak ciśnienia)','Замена вибрационного насоса\n(кофемашина не набирает воду, насос шумит, нет давления)','Заміна вібраційної помпи\n(кавомашина не набирає воду, помпа шумить, немає тиску)','180 / 260 / 420','1–3'],
    ['Wymiana pompy rotacyjnej\n(słabe ciśnienie, głośna praca pompy, brak przepływu wody)','Замена ротационного насоса\n(низкое давление, шумная работа, нет потока воды)','Заміна ротаційної помпи\n(низький тиск, шумна робота, немає потоку води)','300 / 350 / 650','2–5'],
    ['Wymiana regulatora ciśnienia\n(słabe lub niestabilne ciśnienie, kawa wypływa zbyt wolno)','Замена регулятора давления\n(низкое или нестабильное давление, кофе течёт слишком медленно)','Заміна регулятора тиску\n(низький або нестабільний тиск, кава тече надто повільно)','180 / 240 / 390','1–3'],
    ['Wymiana zaworu OPV\n(zbyt wysokie ciśnienie, woda przelewa się, nierówne parzenie kawy)','Замена клапана OPV\n(слишком высокое давление, перелив воды, неравномерное приготовление)','Заміна клапана OPV\n(надто високий тиск, переливання води, нерівне приготування)','180 / 260 / 420','1–4'],
  ]],
  ['Bojlery, termobloki i grzanie','Бойлеры, термоблоки и нагрев','Бойлери, термоблоки та нагрівання','naprawy-grzanie',[
    ['Wymiana termobloku\n(kawa jest zimna, ekspres nie nagrzewa wody, błąd temperatury)','Замена термоблока\n(кофе холодный, вода не нагревается, ошибка температуры)','Заміна термоблока\n(кава холодна, вода не нагрівається, помилка температури)','220 / 350 / 550','2–5'],
    ['Wymiana grzałki bojlera\n(woda nie osiąga temperatury, brak gorącej kawy lub pary)','Замена нагревателя бойлера\n(вода не нагревается, нет горячего кофе или пара)','Заміна нагрівача бойлера\n(вода не досягає температури, немає гарячої кави або пари)','250 / 300 / 650','2–6'],
    ['Wymiana termostatu\n(ekspres przegrzewa wodę, nie nagrzewa się lub wyłącza podczas pracy)','Замена термостата\n(перегрев воды, отсутствие нагрева или отключение)','Заміна термостата\n(перегрів води, відсутність нагрівання або вимкнення)','160 / 240 / 390','1–3'],
    ['Wymiana bezpiecznika termicznego\n(ekspres przestał grzać, nie uruchamia podgrzewania wody)','Замена термопредохранителя\n(кофемашина перестала нагревать воду)','Заміна термозапобіжника\n(кавомашина перестала нагрівати воду)','140 / 220 / 350','1–3'],
  ]],
  ['Układ wodny i przepływ','Водяная система и поток','Водяна система та потік','naprawy-woda',[
    ['Wymiana przepływomierza\n(ekspres nie odmierza wody, przerywa parzenie, błąd obiegu)','Замена расходомера\n(не дозирует воду, прерывает приготовление, ошибка контура)','Заміна витратоміра\n(не дозує воду, перериває приготування, помилка контуру)','160 / 240 / 390','1–3'],
    ['Udrożnienie przewodu lub króćca\n(woda nie przepływa, kawa nie leci mimo pracy pompy)','Прочистка трубки или штуцера\n(вода не проходит, кофе не течёт при работающем насосе)','Прочищення трубки або штуцера\n(вода не проходить, кава не тече за роботи помпи)','170 / 260 / 420','1–3'],
    ['Wymiana przewodu lub złączki wodnej\n(woda wycieka, pęknięty wężyk lub nieszczelne połączenie)','Замена водяной трубки или соединителя\n(утечка воды, треснувшая трубка или негерметичное соединение)','Заміна водяної трубки або з’єднувача\n(витік води, тріснута трубка або негерметичне з’єднання)','150 / 230 / 380','1–3'],
  ]],
  ['Zawory i elektrozawory','Клапаны и электроклапаны','Клапани та електроклапани','naprawy-zawory',[
    ['Wymiana elektrozaworu dopływowego\n(ekspres nie pobiera wody, zawór przepuszcza lub nie otwiera się)','Замена впускного электроклапана\n(не набирает воду, клапан пропускает или не открывается)','Заміна впускного електроклапана\n(не набирає воду, клапан пропускає або не відкривається)','220 / 320 / 490','2–4'],
    ['Wymiana zaworu trójdrożnego\n(woda nie odpływa prawidłowo, wyciek po parzeniu)','Замена трёхходового клапана\n(вода неправильно отводится, утечка после приготовления)','Заміна триходового клапана\n(вода неправильно відводиться, витік після приготування)','210 / 320 / 480','2–4'],
    ['Wymiana zaworu drenażowego\n(woda w tacce, mokre fusy, kawa nie trafia do filiżanki)','Замена дренажного клапана\n(вода в поддоне, мокрый жмых, кофе не попадает в чашку)','Заміна дренажного клапана\n(вода в піддоні, мокра кавова таблетка, кава не потрапляє в чашку)','210 / 310 / 470','2–4'],
    ['Wymiana zaworu pary\n(brak pary, para ucieka z zaworu, dysza nie działa)','Замена парового клапана\n(нет пара, пар выходит из клапана, форсунка не работает)','Заміна парового клапана\n(немає пари, пара виходить із клапана, форсунка не працює)','200 / 300 / 460','2–4'],
    ['Wymiana zaworu gorącej wody\n(brak gorącej wody, zawór przecieka lub nie zamyka przepływu)','Замена клапана горячей воды\n(нет горячей воды, клапан протекает или не закрывает поток)','Заміна клапана гарячої води\n(немає гарячої води, клапан протікає або не перекриває потік)','180 / 270 / 430','1–4'],
  ]],
  ['Młynki i mechanizmy mielenia','Кофемолки и механизмы помола','Кавомолки та механізми помелу','naprawy-mlynki',[
    ['Wymiana żaren stalowych\n(kawa mieli się nierówno, młynek nie uzyskuje właściwej grubości)','Замена стальных жерновов\n(неравномерный помол, неправильная крупность)','Заміна сталевих жорен\n(нерівномірний помел, неправильна крупність)','180 / 270 / 420','1–3'],
    ['Wymiana żaren ceramicznych\n(kawa mieli się zbyt grubo, młynek pracuje głośno lub nierówno)','Замена керамических жерновов\n(слишком крупный, шумный или неравномерный помол)','Заміна керамічних жорен\n(надто грубий, шумний або нерівномірний помел)','190 / 280 / 440','1–3'],
    ['Wymiana silnika młynka\n(młynek nie startuje, silnik buczy, żarna się nie obracają)','Замена двигателя кофемолки\n(кофемолка не запускается, мотор гудит, жернова не вращаются)','Заміна двигуна кавомолки\n(кавомолка не запускається, двигун гуде, жорна не обертаються)','230 / 340 / 550','2–5'],
    ['Wymiana kompletnego młynka\n(młynek nie mieli, mechanizm zatarty lub poważnie uszkodzony)','Замена кофемолки в сборе\n(не мелет, механизм заклинил или серьёзно повреждён)','Заміна кавомолки в зборі\n(не меле, механізм заклинив або серйозно пошкоджений)','250 / 380 / 620','2–5'],
  ]],
  ['Blok zaparzający i napęd','Заварочный блок и привод','Заварювальний блок і привід','naprawy-zaparzacz',[
    ['Odblokowanie bloku zaparzającego\n(blok się zacina, ekspres nie kończy cyklu, błąd mechanizmu)','Разблокировка заварочного блока\n(блок заедает, цикл не заканчивается, ошибка механизма)','Розблокування заварювального блока\n(блок заїдає, цикл не завершується, помилка механізму)','170 / 250 / 400','1–3'],
    ['Regeneracja bloku lub tłoka\n(kawa jest słaba, blok przecieka lub nie parzy prawidłowo)','Восстановление блока или поршня\n(слабый кофе, протечка или неправильное заваривание)','Відновлення блока або поршня\n(слабка кава, витік або неправильне заварювання)','230 / 350 / 550','2–5'],
    ['Wymiana napędu, silnika lub zębatek bloku zaparzającego\n(mechanizm hałasuje, blok nie przesuwa się, cykl się przerywa)','Замена привода, двигателя или шестерён заварочного блока\n(шум, блок не движется, цикл прерывается)','Заміна приводу, двигуна або шестерень заварювального блока\n(шум, блок не рухається, цикл переривається)','260 / 400 / 650','2–5'],
  ]],
  ['Układ mleczny i spienianie','Молочная система и вспенивание','Молочна система та спінювання','naprawy-mleko',[
    ['Wymiana cappuccinatore\n(mleko nie jest pobierane, brak pianki lub nierówne spienianie)','Замена капучинатора\n(молоко не забирается, нет пены или вспенивание неравномерно)','Заміна капучинатора\n(молоко не забирається, немає піни або спінювання нерівномірне)','160 / 250 / 420','1–3'],
    ['Wymiana modułu lub zaworu mlecznego\n(mleko nie przepływa, brak napojów mlecznych)','Замена молочного модуля или клапана\n(молоко не проходит, нет молочных напитков)','Заміна молочного модуля або клапана\n(молоко не проходить, немає молочних напоїв)','210 / 330 / 550','2–5'],
  ]],
  ['Uszczelnienia i wycieki','Уплотнения и протечки','Ущільнення та витоки','naprawy-uszczelnienia',[
    ['Wymiana uszczelki bojlera\n(woda lub para wycieka przy bojlerze, ekspres traci szczelność)','Замена уплотнителя бойлера\n(вода или пар протекают у бойлера, потеря герметичности)','Заміна ущільнювача бойлера\n(вода або пара протікає біля бойлера, втрата герметичності)','230 / 350 / 600','2–5'],
    ['Wymiana przewodu wysokiego ciśnienia\n(woda wycieka pod ciśnieniem, uszkodzony przewód lub połączenie)','Замена трубки высокого давления\n(вода протекает под давлением, повреждена трубка или соединение)','Заміна трубки високого тиску\n(вода протікає під тиском, пошкоджена трубка або з’єднання)','230 / 360 / 550','2–5'],
    ['Lokalizacja i usunięcie wycieku\n(woda zbiera się pod ekspresem, kapie z obudowy lub zbiornika)','Поиск и устранение протечки\n(вода под машиной, капает из корпуса или бака)','Пошук і усунення витоку\n(вода під кавомашиною, капає з корпусу або бака)','190 / 290 / 460','1–4'],
  ]],
  ['Elektronika i zasilanie','Электроника и питание','Електроніка та живлення','naprawy-elektronika',[
    ['Wymiana płyty zasilania\n(ekspres nie włącza się, brak zasilania, nagle gaśnie)','Замена платы питания\n(не включается, нет питания, внезапно выключается)','Заміна плати живлення\n(не вмикається, немає живлення, раптово вимикається)','260 / 420 / 700','2–6'],
    ['Wymiana płyty sterowania\n(błędy, zawieszanie lub samoczynne przerywanie pracy)','Замена платы управления\n(ошибки, зависания или самопроизвольные остановки)','Заміна плати керування\n(помилки, зависання або самовільне переривання роботи)','300 / 480 / 850','2–6'],
  ]],
  ['Wyświetlacze i panele sterowania','Дисплеи и панели управления','Дисплеї та панелі керування','naprawy-panele',[
    ['Wymiana wyświetlacza lub panelu dotykowego\n(ekran nie działa, panel nie reaguje, brak komunikatów)','Замена дисплея или сенсорной панели\n(экран не работает, панель не реагирует, нет сообщений)','Заміна дисплея або сенсорної панелі\n(екран не працює, панель не реагує, немає повідомлень)','240 / 400 / 750','2–5'],
    ['Wymiana przycisku, mikrowłącznika lub enkodera\n(przycisk nie reaguje, funkcja nie działa, wybór napoju się zacina)','Замена кнопки, микровыключателя или энкодера\n(кнопка не реагирует, функция не работает, выбор напитка заедает)','Заміна кнопки, мікровимикача або енкодера\n(кнопка не реагує, функція не працює, вибір напою заїдає)','140 / 230 / 390','1–3'],
  ]],
  ['Czujniki i zabezpieczenia','Датчики и защиты','Датчики та захист','naprawy-czujniki',[
    ['Wymiana czujnika temperatury\n(ekspres błędnie mierzy temperaturę, przegrzewa lub nie grzeje)','Замена датчика температуры\n(неверное измерение, перегрев или отсутствие нагрева)','Заміна датчика температури\n(неправильне вимірювання, перегрів або відсутність нагрівання)','170 / 280 / 480','1–4'],
    ['Wymiana czujnika poziomu wody\n(ekspres pokazuje brak wody mimo pełnego zbiornika, przerywa parzenie)','Замена датчика уровня воды\n(кофемашина показывает отсутствие воды при полном резервуаре, прерывает приготовление)','Заміна датчика рівня води\n(кавомашина показує відсутність води при повному резервуарі, перериває приготування)','190 / 300 / 500','1–4'],
    ['Wymiana czujnika pozycji bloku lub tacki\n(nie rozpoznaje tacki/bloku, nie rozpoczyna parzenia)','Замена датчика положения блока или поддона\n(не видит поддон/блок, не начинает приготовление)','Заміна датчика положення блока або піддона\n(не розпізнає піддон/блок, не починає приготування)','150 / 240 / 430','1–3'],
  ]],
  ['Mechanizmy i elementy obudowy','Механизмы и элементы корпуса','Механізми та елементи корпусу','naprawy-mechanika',[
    ['Wymiana prowadnicy lub drzwiczek\n(drzwiczki nie zamykają się, prowadnica zacina się lub pęka)','Замена направляющей или дверцы\n(дверца не закрывается, направляющая заедает или сломана)','Заміна напрямної або дверцят\n(дверцята не закриваються, напрямна заїдає або зламана)','140 / 230 / 400','1–3'],
    ['Wymiana wylewki, dyszy lub dozownika\n(kawa wypływa nierówno, dysza przecieka lub jest uszkodzona)','Замена носика, форсунки или дозатора\n(кофе течёт неровно, форсунка протекает или повреждена)','Заміна носика, форсунки або дозатора\n(кава тече нерівно, форсунка протікає або пошкоджена)','170 / 260 / 460','1–4'],
    ['Wymiana przekładni mechanizmu ekspresu\n(mechanizm przeskakuje, głośno pracuje lub się blokuje)','Замена передачи механизма кофемашины\n(механизм перескакивает, шумит или блокируется)','Заміна передачі механізму кавомашини\n(механізм перескакує, шумить або блокується)','220 / 330 / 560','2–5'],
  ]],
  ['Grupy zaparzające ekspresów kolbowych','Заварочные группы рожковых машин','Заварювальні групи ріжкових машин','naprawy-kolbowe',[
    ['Wymiana uszczelki grupy\n(woda wycieka wokół kolby, uchwyt nie uszczelnia)','Замена прокладки группы\n(вода протекает вокруг рожка, держатель не герметичен)','Заміна ущільнювача групи\n(вода протікає навколо холдера, тримач не герметичний)','150 / 250 / 360','1–3'],
    ['Wymiana elektrozaworu grupy\n(woda nie przepływa przez grupę, kawa nie wypływa)','Замена электроклапана группы\n(вода не проходит через группу, кофе не выходит)','Заміна електроклапана групи\n(вода не проходить через групу, кава не виходить)','220 / 350 / 600','2–5'],
    ['Wymiana dyfuzora grupy\n(woda wypływa nierówno, kawa parzy się nierównomiernie)','Замена диффузора группы\n(вода выходит неравномерно, кофе заваривается неравномерно)','Заміна дифузора групи\n(вода виходить нерівномірно, кава заварюється нерівномірно)','180 / 280 / 460','1–3'],
  ]],
  ['Układ parowy i napełnianie bojlerów','Паровая система и наполнение бойлеров','Парова система та наповнення бойлерів','naprawy-para',[
    ['Wymiana presostatu\n(ciśnienie pary niestabilne, bojler przegrzewa się lub nie grzeje)','Замена прессостата\n(нестабильное давление пара, перегрев или отсутствие нагрева бойлера)','Заміна пресостату\n(нестабільний тиск пари, перегрів або відсутність нагрівання бойлера)','250 / 330 / 560','2–5'],
    ['Wymiana zaworu bezpieczeństwa lub anti-vacuum\n(para ucieka z bojlera, zawór przecieka lub nie zamyka się)','Замена предохранительного или anti-vacuum клапана\n(пар выходит из бойлера, клапан протекает или не закрывается)','Заміна запобіжного або anti-vacuum клапана\n(пара виходить із бойлера, клапан протікає або не закривається)','230 / 300 / 550','2–5'],
    ['Naprawa autodopełniania bojlera\n(bojler nie pobiera wody, przepełnia się, pompa pracuje bez przerwy)','Ремонт автодолива бойлера\n(бойлер не набирает воду, переполняется, насос работает постоянно)','Ремонт автоматичного доливання бойлера\n(бойлер не набирає воду, переповнюється, помпа працює безперервно)','280 / 350 / 650','2–6'],
  ]],
]

const lastNumber = (duration: string): number => Number(duration.split(/[–-]/).pop())

const ruDayWord = (duration: string): string => {
  const n = lastNumber(duration)
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'дней'
  if (mod10 === 1) return 'день'
  if (mod10 >= 2 && mod10 <= 4) return 'дня'
  return 'дней'
}

const ukDayWord = (duration: string): string => {
  const n = lastNumber(duration)
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'днів'
  if (mod10 === 1) return 'день'
  if (mod10 >= 2 && mod10 <= 4) return 'дні'
  return 'днів'
}

const partsWord: Record<Lang, string> = { pl: 'części', ru: 'детали', uk: 'деталі' }

export const kawaRepairSubcategories = (lang: Lang): PricingSubcategory[] => groups.map(([pl, ru, uk, id, items]) => ({
  id,
  title: lang === 'pl' ? pl : lang === 'ru' ? ru : uk,
  items: items.map(([plItem, ruItem, ukItem, price, duration]) => ({
    service: lang === 'pl' ? plItem : lang === 'ru' ? ruItem : ukItem,
    price: `${price} + ${partsWord[lang]}`,
    duration: lang === 'pl' ? `${duration} dni` : lang === 'ru' ? `${duration} ${ruDayWord(duration)}` : `${duration} ${ukDayWord(duration)}`,
  })),
}))

