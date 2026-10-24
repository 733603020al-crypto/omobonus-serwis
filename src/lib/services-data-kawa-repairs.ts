import type { PricingSubcategory } from './services-data-types'

type Lang = 'pl' | 'ru' | 'uk' | 'en'
type Item = [string, string, string, string, string]
type Group = [string, string, string, string, string, Item[]]

const groups: Group[] = [
  ['Pompy i układ ciśnienia','Насосы и система давления','Насоси та система тиску','Pumps and pressure system','naprawy-pompy',[
    ['Wymiana pompy wibracyjnej\n(ekspres nie pobiera wody, pompa głośno pracuje, brak ciśnienia)','Замена вибрационного насоса\n(кофемашина не набирает воду, насос шумит, нет давления)','Заміна вібраційної помпи\n(кавомашина не набирає воду, помпа шумить, немає тиску)','Vibration pump replacement\n(the machine does not draw water, the pump is noisy, no pressure)','1–3'],
    ['Wymiana pompy rotacyjnej\n(słabe ciśnienie, głośna praca pompy, brak przepływu wody)','Замена ротационного насоса\n(низкое давление, шумная работа, нет потока воды)','Заміна ротаційної помпи\n(низький тиск, шумна робота, немає потоку води)','Rotary pump replacement\n(low pressure, noisy pump, no water flow)','2–5'],
    ['Wymiana regulatora ciśnienia\n(słabe lub niestabilne ciśnienie, kawa wypływa zbyt wolno)','Замена регулятора давления\n(низкое или нестабильное давление, кофе течёт слишком медленно)','Заміна регулятора тиску\n(низький або нестабільний тиск, кава тече надто повільно)','Pressure regulator replacement\n(low or unstable pressure, coffee flows too slowly)','1–3'],
    ['Wymiana zaworu OPV\n(zbyt wysokie ciśnienie, woda przelewa się, nierówne parzenie kawy)','Замена клапана OPV\n(слишком высокое давление, перелив воды, неравномерное приготовление)','Заміна клапана OPV\n(надто високий тиск, переливання води, нерівне приготування)','OPV valve replacement\n(pressure too high, water overflows, uneven brewing)','1–4'],
  ]],
  ['Bojlery, termobloki i grzanie','Бойлеры, термоблоки и нагрев','Бойлери, термоблоки та нагрівання','Boilers, thermoblocks and heating','naprawy-grzanie',[
    ['Wymiana termobloku\n(kawa jest zimna, ekspres nie nagrzewa wody, błąd temperatury)','Замена термоблока\n(кофе холодный, вода не нагревается, ошибка температуры)','Заміна термоблока\n(кава холодна, вода не нагрівається, помилка температури)','Thermoblock replacement\n(coffee is cold, the machine does not heat water, temperature error)','2–5'],
    ['Wymiana grzałki bojlera\n(woda nie osiąga temperatury, brak gorącej kawy lub pary)','Замена нагревателя бойлера\n(вода не нагревается, нет горячего кофе или пара)','Заміна нагрівача бойлера\n(вода не досягає температури, немає гарячої кави або пари)','Boiler heating element replacement\n(water does not reach temperature, no hot coffee or steam)','2–6'],
    ['Wymiana termostatu\n(ekspres przegrzewa wodę, nie nagrzewa się lub wyłącza podczas pracy)','Замена термостата\n(перегрев воды, отсутствие нагрева или отключение)','Заміна термостата\n(перегрів води, відсутність нагрівання або вимкнення)','Thermostat replacement\n(the machine overheats water, does not heat up or switches off during operation)','1–3'],
    ['Wymiana bezpiecznika termicznego\n(ekspres przestał grzać, nie uruchamia podgrzewania wody)','Замена термопредохранителя\n(кофемашина перестала нагревать воду)','Заміна термозапобіжника\n(кавомашина перестала нагрівати воду)','Thermal fuse replacement\n(the machine has stopped heating and does not start water heating)','1–3'],
  ]],
  ['Układ wodny i przepływ','Водяная система и поток','Водяна система та потік','Water system and flow','naprawy-woda',[
    ['Wymiana przepływomierza\n(ekspres nie odmierza wody, przerywa parzenie, błąd obiegu)','Замена расходомера\n(не дозирует воду, прерывает приготовление, ошибка контура)','Заміна витратоміра\n(не дозує воду, перериває приготування, помилка контуру)','Flow meter replacement\n(the machine does not measure water, interrupts brewing, circuit error)','1–3'],
    ['Udrożnienie przewodu lub króćca\n(woda nie przepływa, kawa nie leci mimo pracy pompy)','Прочистка трубки или штуцера\n(вода не проходит, кофе не течёт при работающем насосе)','Прочищення трубки або штуцера\n(вода не проходить, кава не тече за роботи помпи)','Unblocking a hose or nozzle fitting\n(water does not flow, no coffee comes out although the pump is running)','1–3'],
    ['Wymiana przewodu lub złączki wodnej\n(woda wycieka, pęknięty wężyk lub nieszczelne połączenie)','Замена водяной трубки или соединителя\n(утечка воды, треснувшая трубка или негерметичное соединение)','Заміна водяної трубки або з’єднувача\n(витік води, тріснута трубка або негерметичне з’єднання)','Water hose or connector replacement\n(water leaks, cracked hose or leaking connection)','1–3'],
  ]],
  ['Zawory i elektrozawory','Клапаны и электроклапаны','Клапани та електроклапани','Valves and solenoid valves','naprawy-zawory',[
    ['Wymiana elektrozaworu dopływowego\n(ekspres nie pobiera wody, zawór przepuszcza lub nie otwiera się)','Замена впускного электроклапана\n(не набирает воду, клапан пропускает или не открывается)','Заміна впускного електроклапана\n(не набирає воду, клапан пропускає або не відкривається)','Inlet solenoid valve replacement\n(the machine does not draw water, the valve leaks through or does not open)','2–4'],
    ['Wymiana zaworu trójdrożnego\n(woda nie odpływa prawidłowo, wyciek po parzeniu)','Замена трёхходового клапана\n(вода неправильно отводится, утечка после приготовления)','Заміна триходового клапана\n(вода неправильно відводиться, витік після приготування)','Three-way valve replacement\n(water does not drain properly, leak after brewing)','2–4'],
    ['Wymiana zaworu drenażowego\n(woda w tacce, mokre fusy, kawa nie trafia do filiżanki)','Замена дренажного клапана\n(вода в поддоне, мокрый жмых, кофе не попадает в чашку)','Заміна дренажного клапана\n(вода в піддоні, мокра кавова таблетка, кава не потрапляє в чашку)','Drain valve replacement\n(water in the drip tray, wet coffee grounds, coffee does not reach the cup)','2–4'],
    ['Wymiana zaworu pary\n(brak pary, para ucieka z zaworu, dysza nie działa)','Замена парового клапана\n(нет пара, пар выходит из клапана, форсунка не работает)','Заміна парового клапана\n(немає пари, пара виходить із клапана, форсунка не працює)','Steam valve replacement\n(no steam, steam escapes from the valve, the steam wand does not work)','2–4'],
    ['Wymiana zaworu gorącej wody\n(brak gorącej wody, zawór przecieka lub nie zamyka przepływu)','Замена клапана горячей воды\n(нет горячей воды, клапан протекает или не закрывает поток)','Заміна клапана гарячої води\n(немає гарячої води, клапан протікає або не перекриває потік)','Hot water valve replacement\n(no hot water, the valve leaks or does not shut off the flow)','1–4'],
  ]],
  ['Młynki i mechanizmy mielenia','Кофемолки и механизмы помола','Кавомолки та механізми помелу','Grinders and grinding mechanisms','naprawy-mlynki',[
    ['Wymiana żaren stalowych\n(kawa mieli się nierówno, młynek nie uzyskuje właściwej grubości)','Замена стальных жерновов\n(неравномерный помол, неправильная крупность)','Заміна сталевих жорен\n(нерівномірний помел, неправильна крупність)','Steel burr replacement\n(coffee is ground unevenly, the grinder does not achieve the right coarseness)','1–3'],
    ['Wymiana żaren ceramicznych\n(kawa mieli się zbyt grubo, młynek pracuje głośno lub nierówno)','Замена керамических жерновов\n(слишком крупный, шумный или неравномерный помол)','Заміна керамічних жорен\n(надто грубий, шумний або нерівномірний помел)','Ceramic burr replacement\n(coffee is ground too coarsely, the grinder is noisy or runs unevenly)','1–3'],
    ['Wymiana silnika młynka\n(młynek nie startuje, silnik buczy, żarna się nie obracają)','Замена двигателя кофемолки\n(кофемолка не запускается, мотор гудит, жернова не вращаются)','Заміна двигуна кавомолки\n(кавомолка не запускається, двигун гуде, жорна не обертаються)','Grinder motor replacement\n(the grinder does not start, the motor hums, the burrs do not turn)','2–5'],
    ['Wymiana kompletnego młynka\n(młynek nie mieli, mechanizm zatarty lub poważnie uszkodzony)','Замена кофемолки в сборе\n(не мелет, механизм заклинил или серьёзно повреждён)','Заміна кавомолки в зборі\n(не меле, механізм заклинив або серйозно пошкоджений)','Complete grinder replacement\n(the grinder does not grind, the mechanism is seized or seriously damaged)','2–5'],
  ]],
  ['Blok zaparzający i napęd','Заварочный блок и привод','Заварювальний блок і привід','Brewing unit and drive','naprawy-zaparzacz',[
    ['Odblokowanie bloku zaparzającego\n(blok się zacina, ekspres nie kończy cyklu, błąd mechanizmu)','Разблокировка заварочного блока\n(блок заедает, цикл не заканчивается, ошибка механизма)','Розблокування заварювального блока\n(блок заїдає, цикл не завершується, помилка механізму)','Unjamming the brewing unit\n(the unit jams, the machine does not complete the cycle, mechanism error)','1–3'],
    ['Regeneracja bloku lub tłoka\n(kawa jest słaba, blok przecieka lub nie parzy prawidłowo)','Восстановление блока или поршня\n(слабый кофе, протечка или неправильное заваривание)','Відновлення блока або поршня\n(слабка кава, витік або неправильне заварювання)','Brewing unit or piston reconditioning\n(coffee is weak, the unit leaks or does not brew properly)','2–5'],
    ['Wymiana napędu, silnika lub zębatek bloku zaparzającego\n(mechanizm hałasuje, blok nie przesuwa się, cykl się przerywa)','Замена привода, двигателя или шестерён заварочного блока\n(шум, блок не движется, цикл прерывается)','Заміна приводу, двигуна або шестерень заварювального блока\n(шум, блок не рухається, цикл переривається)','Brewing unit drive, motor or gear replacement\n(the mechanism is noisy, the unit does not move, the cycle is interrupted)','2–5'],
  ]],
  ['Układ mleczny i spienianie','Молочная система и вспенивание','Молочна система та спінювання','Milk system and frothing','naprawy-mleko',[
    ['Wymiana cappuccinatore\n(mleko nie jest pobierane, brak pianki lub nierówne spienianie)','Замена капучинатора\n(молоко не забирается, нет пены или вспенивание неравномерно)','Заміна капучинатора\n(молоко не забирається, немає піни або спінювання нерівномірне)','Cappuccinatore replacement\n(milk is not drawn in, no foam or uneven frothing)','1–3'],
    ['Wymiana modułu lub zaworu mlecznego\n(mleko nie przepływa, brak napojów mlecznych)','Замена молочного модуля или клапана\n(молоко не проходит, нет молочных напитков)','Заміна молочного модуля або клапана\n(молоко не проходить, немає молочних напоїв)','Milk module or milk valve replacement\n(milk does not flow, no milk drinks)','2–5'],
  ]],
  ['Uszczelnienia i wycieki','Уплотнения и протечки','Ущільнення та витоки','Seals and leaks','naprawy-uszczelnienia',[
    ['Wymiana uszczelki bojlera\n(woda lub para wycieka przy bojlerze, ekspres traci szczelność)','Замена уплотнителя бойлера\n(вода или пар протекают у бойлера, потеря герметичности)','Заміна ущільнювача бойлера\n(вода або пара протікає біля бойлера, втрата герметичності)','Boiler seal replacement\n(water or steam leaks around the boiler, the machine is no longer watertight)','2–5'],
    ['Wymiana przewodu wysokiego ciśnienia\n(woda wycieka pod ciśnieniem, uszkodzony przewód lub połączenie)','Замена трубки высокого давления\n(вода протекает под давлением, повреждена трубка или соединение)','Заміна трубки високого тиску\n(вода протікає під тиском, пошкоджена трубка або з’єднання)','High-pressure hose replacement\n(water leaks under pressure, damaged hose or connection)','2–5'],
    ['Lokalizacja i usunięcie wycieku\n(woda zbiera się pod ekspresem, kapie z obudowy lub zbiornika)','Поиск и устранение протечки\n(вода под машиной, капает из корпуса или бака)','Пошук і усунення витоку\n(вода під кавомашиною, капає з корпусу або бака)','Locating and fixing a leak\n(water collects under the machine, drips from the housing or tank)','1–4'],
  ]],
  ['Elektronika i zasilanie','Электроника и питание','Електроніка та живлення','Electronics and power supply','naprawy-elektronika',[
    ['Wymiana płyty zasilania\n(ekspres nie włącza się, brak zasilania, nagle gaśnie)','Замена платы питания\n(не включается, нет питания, внезапно выключается)','Заміна плати живлення\n(не вмикається, немає живлення, раптово вимикається)','Power board replacement\n(the machine does not switch on, no power, suddenly shuts down)','2–6'],
    ['Wymiana płyty sterowania\n(błędy, zawieszanie lub samoczynne przerywanie pracy)','Замена платы управления\n(ошибки, зависания или самопроизвольные остановки)','Заміна плати керування\n(помилки, зависання або самовільне переривання роботи)','Control board replacement\n(errors, freezing or the machine stopping by itself)','2–6'],
  ]],
  ['Wyświetlacze i panele sterowania','Дисплеи и панели управления','Дисплеї та панелі керування','Displays and control panels','naprawy-panele',[
    ['Wymiana wyświetlacza lub panelu dotykowego\n(ekran nie działa, panel nie reaguje, brak komunikatów)','Замена дисплея или сенсорной панели\n(экран не работает, панель не реагирует, нет сообщений)','Заміна дисплея або сенсорної панелі\n(екран не працює, панель не реагує, немає повідомлень)','Display or touch panel replacement\n(the screen does not work, the panel does not respond, no messages shown)','2–5'],
    ['Wymiana przycisku, mikrowłącznika lub enkodera\n(przycisk nie reaguje, funkcja nie działa, wybór napoju się zacina)','Замена кнопки, микровыключателя или энкодера\n(кнопка не реагирует, функция не работает, выбор напитка заедает)','Заміна кнопки, мікровимикача або енкодера\n(кнопка не реагує, функція не працює, вибір напою заїдає)','Button, microswitch or encoder replacement\n(a button does not respond, a function does not work, drink selection sticks)','1–3'],
  ]],
  ['Czujniki i zabezpieczenia','Датчики и защиты','Датчики та захист','Sensors and safety devices','naprawy-czujniki',[
    ['Wymiana czujnika temperatury\n(ekspres błędnie mierzy temperaturę, przegrzewa lub nie grzeje)','Замена датчика температуры\n(неверное измерение, перегрев или отсутствие нагрева)','Заміна датчика температури\n(неправильне вимірювання, перегрів або відсутність нагрівання)','Temperature sensor replacement\n(the machine measures temperature incorrectly, overheats or does not heat)','1–4'],
    ['Wymiana czujnika poziomu wody\n(ekspres pokazuje brak wody mimo pełnego zbiornika, przerywa parzenie)','Замена датчика уровня воды\n(кофемашина показывает отсутствие воды при полном резервуаре, прерывает приготовление)','Заміна датчика рівня води\n(кавомашина показує відсутність води при повному резервуарі, перериває приготування)','Water level sensor replacement\n(the machine shows no water although the tank is full, interrupts brewing)','1–4'],
    ['Wymiana czujnika pozycji bloku lub tacki\n(nie rozpoznaje tacki/bloku, nie rozpoczyna parzenia)','Замена датчика положения блока или поддона\n(не видит поддон/блок, не начинает приготовление)','Заміна датчика положення блока або піддона\n(не розпізнає піддон/блок, не починає приготування)','Brewing unit or drip tray position sensor replacement\n(does not detect the tray/unit, does not start brewing)','1–3'],
  ]],
  ['Mechanizmy i elementy obudowy','Механизмы и элементы корпуса','Механізми та елементи корпусу','Mechanisms and housing parts','naprawy-mechanika',[
    ['Wymiana prowadnicy lub drzwiczek\n(drzwiczki nie zamykają się, prowadnica zacina się lub pęka)','Замена направляющей или дверцы\n(дверца не закрывается, направляющая заедает или сломана)','Заміна напрямної або дверцят\n(дверцята не закриваються, напрямна заїдає або зламана)','Guide rail or door replacement\n(the door does not close, the guide rail sticks or cracks)','1–3'],
    ['Wymiana wylewki, dyszy lub dozownika\n(kawa wypływa nierówno, dysza przecieka lub jest uszkodzona)','Замена носика, форсунки или дозатора\n(кофе течёт неровно, форсунка протекает или повреждена)','Заміна носика, форсунки або дозатора\n(кава тече нерівно, форсунка протікає або пошкоджена)','Spout, nozzle or dispenser replacement\n(coffee flows unevenly, the nozzle leaks or is damaged)','1–4'],
    ['Wymiana przekładni mechanizmu ekspresu\n(mechanizm przeskakuje, głośno pracuje lub się blokuje)','Замена передачи механизма кофемашины\n(механизм перескакивает, шумит или блокируется)','Заміна передачі механізму кавомашини\n(механізм перескакує, шумить або блокується)','Machine gearbox replacement\n(the mechanism skips, runs noisily or locks up)','2–5'],
  ]],
  ['Grupy zaparzające ekspresów kolbowych','Заварочные группы рожковых машин','Заварювальні групи ріжкових машин','Brew groups of espresso (portafilter) machines','naprawy-kolbowe',[
    ['Wymiana uszczelki grupy\n(woda wycieka wokół kolby, uchwyt nie uszczelnia)','Замена прокладки группы\n(вода протекает вокруг рожка, держатель не герметичен)','Заміна ущільнювача групи\n(вода протікає навколо холдера, тримач не герметичний)','Group gasket replacement\n(water leaks around the portafilter, the holder does not seal)','1–3'],
    ['Wymiana elektrozaworu grupy\n(woda nie przepływa przez grupę, kawa nie wypływa)','Замена электроклапана группы\n(вода не проходит через группу, кофе не выходит)','Заміна електроклапана групи\n(вода не проходить через групу, кава не виходить)','Group solenoid valve replacement\n(water does not flow through the group, no coffee comes out)','2–5'],
    ['Wymiana dyfuzora grupy\n(woda wypływa nierówno, kawa parzy się nierównomiernie)','Замена диффузора группы\n(вода выходит неравномерно, кофе заваривается неравномерно)','Заміна дифузора групи\n(вода виходить нерівномірно, кава заварюється нерівномірно)','Group shower screen (diffuser) replacement\n(water flows out unevenly, coffee brews unevenly)','1–3'],
  ]],
  ['Układ parowy i napełnianie bojlerów','Паровая система и наполнение бойлеров','Парова система та наповнення бойлерів','Steam system and boiler filling','naprawy-para',[
    ['Wymiana presostatu\n(ciśnienie pary niestabilne, bojler przegrzewa się lub nie grzeje)','Замена прессостата\n(нестабильное давление пара, перегрев или отсутствие нагрева бойлера)','Заміна пресостату\n(нестабільний тиск пари, перегрів або відсутність нагрівання бойлера)','Pressurestat replacement\n(unstable steam pressure, the boiler overheats or does not heat)','2–5'],
    ['Wymiana zaworu bezpieczeństwa lub anti-vacuum\n(para ucieka z bojlera, zawór przecieka lub nie zamyka się)','Замена предохранительного или anti-vacuum клапана\n(пар выходит из бойлера, клапан протекает или не закрывается)','Заміна запобіжного або anti-vacuum клапана\n(пара виходить із бойлера, клапан протікає або не закривається)','Safety valve or anti-vacuum valve replacement\n(steam escapes from the boiler, the valve leaks or does not close)','2–5'],
    ['Naprawa autodopełniania bojlera\n(bojler nie pobiera wody, przepełnia się, pompa pracuje bez przerwy)','Ремонт автодолива бойлера\n(бойлер не набирает воду, переполняется, насос работает постоянно)','Ремонт автоматичного доливання бойлера\n(бойлер не набирає воду, переповнюється, помпа працює безперервно)','Boiler auto-fill repair\n(the boiler does not take in water, overfills, the pump runs non-stop)','2–6'],
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

const enDayWord = (duration: string): string => (duration.trim() === '1' ? 'day' : 'days')

const pick = <T,>(lang: Lang, pl: T, ru: T, uk: T, en: T): T =>
  lang === 'pl' ? pl : lang === 'ru' ? ru : lang === 'uk' ? uk : en

export const kawaRepairSubcategories = (lang: Lang): PricingSubcategory[] => groups.map(([pl, ru, uk, en, id, items]) => ({
  id,
  title: pick(lang, pl, ru, uk, en),
  items: items.map(([plItem, ruItem, ukItem, enItem, duration]) => ({
    service: pick(lang, plItem, ruItem, ukItem, enItem),
    duration: pick(
      lang,
      `${duration} dni`,
      `${duration} ${ruDayWord(duration)}`,
      `${duration} ${ukDayWord(duration)}`,
      `${duration} ${enDayWord(duration)}`,
    ),
  })),
}))

