$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot # файлы исследования лежат рядом со скриптом
$html = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'research-coffee-market.html')
function X([string]$s) { if ($null -eq $s) { return '' }; return [System.Security.SecurityElement]::Escape($s) }
function Cell([string]$s) { return "<Cell><Data ss:Type='String'>$(X $s)</Data></Cell>" }
function Row([object[]]$v) { return '<Row>' + (($v | ForEach-Object { Cell ([string]$_) }) -join '') + '</Row>' }
$all = @([regex]::Matches($html, 'href="(https?://[^" ]+)"') | ForEach-Object { $_.Groups[1].Value })
$urls = @($all | Sort-Object -Unique)
$counts = @{}
foreach ($u in $all) { if ($counts.ContainsKey($u)) { $counts[$u]++ } else { $counts[$u] = 1 } }
$rows = New-Object System.Collections.Generic.List[string]; $i = 0
foreach ($u in $urls) { $i++; $domain = ([Uri]$u).Host.ToLowerInvariant(); $rep = if ($counts[$u] -gt 1) { 'Tak' } else { 'Nie' }; $ind = if ($domain -in @('jura.com','delonghi.com','franke.com','siemens-home.bsh-group.com','philips.pl','krups.com.pl')) { 'Nie - producent lub wspolny operator' } else { 'Tak - niezalezny domenowo; operator do interpretacji' }; $rows.Add((Row @($i,$u,$domain,$rep,$ind,'URL obecny w raporcie; wynik i kontekst w research-coffee-market.html'))) }
$ops = @(
@('01','Pompy i cisnienie','Wymiana pompy; regulator/OPV; odpowietrzanie; kontrola cisnienia','Domowe; biurowe/premium; profesjonalne','100-350 zl; czesc osobno lub razem','Nieopublikowane','24 h-7 dni'),
@('02','Bojlery, termobloki i grzalki','Wymiana grzalki, termobloku lub bojlera; termostat; bezpiecznik; obwod grzania','Wszystkie; profesjonalne wymagaja oceny','Od 100 zl za prace; profesjonalne zwykle wycena','Nieopublikowane','1-10 dni'),
@('03','Uklad wodny i przeplywomierze','Przeplywomierz; udroznienie; doplyw; rurki; zlaczki; dozowanie','Wszystkie','150-300 zl; czesci czesto osobno','Nieopublikowane','24 h-10 dni'),
@('04','Zawory i elektrozawory','Elektrozawor; trojdrozny; drenazowy; doplywowy; cieplej wody; cewka','Wszystkie','100 zl robocizny + 50 zl zawor albo 180-320 zl + czesc','Nieopublikowane','Zalezne od czesci'),
@('05','Mlynki i mielenie','Zarna; silnik; kompletny mlynek; regulacja; przekladnia; dozownik','Domowe i biurowe; profesjonalne osobno','150 zl regulacja; 250-450 zl + czesc','Nieopublikowane','1-7 dni'),
@('06','Bloki zaparzajace i napedy','Odblokowanie; regeneracja; naped; silnik; kola; pozycjonowanie; tlok','Automatyczne; profesjonalne grupy osobno','50 zl uszczelki; 90-250 zl regeneracja; naped 250 zl + czesci','Nieopublikowane','24 h-10 dni'),
@('07','Uklad mleczny','Cappuccinatore; pobor mleka; zawory; modul; dysze; pompa','Automatyczne i profesjonalne','90-150 zl czyszczenie lub naprawa','Nieopublikowane','Zalezne od czesci'),
@('08','Uszczelki, przewody i wycieki','Usuwanie wycieku; przewody; krocce; uszczelnienia bojlera; odplyw','Wszystkie','150-300 zl; O-ringi czesto w konserwacji','Nieopublikowane','1-7 dni'),
@('09','Elektronika i zasilanie','Plyta zasilania lub sterowania; polaczenia; sterowanie pompa, grzalka i silnikiem','Wszystkie; profesjonalne po diagnozie','200-500 zl w znalezionym cenniku','Nieopublikowane','Zalezne od diagnozy'),
@('10','Wyswietlacze i panele','Wyswietlacz; panel dotykowy; przyciski; mikrowlaczniki; enkoder','Wszystkie','Brak porownywalnej ceny publicznej','Nieopublikowane','Nieopublikowane'),
@('11','Czujniki i zabezpieczenia','Temperatura; poziom wody; pozycja zaparzacza; tacka; cisnienie; sonda; termozabezpieczenie','Wszystkie','Zwykle wycena po diagnozie; czesc osobno','Nieopublikowane','Zalezne od czesci'),
@('12','Mechanizmy i obudowa','Drzwiczki; prowadnice; wylewka; dozowanie; obudowa; przekladnia','Wszystkie','Brak jednej porownywalnej ceny','Nieopublikowane','Zalezne od czesci'),
@('13','Grupy kolbowe','Grupa; elektrozawor; dyfuzor; grupa dzwigniowa; dozowanie; obieg wody; uszczelka grupy','Profesjonalne i domowe kolbowe','80-150 zl uszczelka grupy; remont indywidualnie','Nieopublikowane','1-10 dni'),
@('14','Para i napelnianie bojlerow','Zawor pary; presostat; bezpieczenstwa; anti-vacuum; autodoladowanie; dysza','Profesjonalne i gastronomiczne','Brak stabilnej ceny; czesci osobno','Nieopublikowane','Zalezne od czesci'))
$opRows = New-Object System.Collections.Generic.List[string]; foreach ($o in $ops) { $opRows.Add((Row $o)) }
$catRows = New-Object System.Collections.Generic.List[string]; $catRows.Add((Row @('Operacja / grupa','Ekspresy domowe','Ekspresy biurowe i premium','Ekspresy profesjonalne i gastronomiczne','Czas realizacji','Ceny / czesci'))); foreach ($o in $ops) { $catRows.Add((Row @($o[1],'Tak, jesli funkcja wystepuje','Tak, ocena modelu i czesci','Tak, inna konstrukcja i czesto wycena indywidualna',$o[6],$o[4]))) }
$domains = @($urls | ForEach-Object { ([Uri]$_).Host.ToLowerInvariant() } | Sort-Object -Unique)
$summary = @((Row @('Metryka','Wartosc','Wyjasnienie')),(Row @('Unikalne URL',$urls.Count,'Po deduplikacji')),(Row @('Wszystkie wystapienia',$all.Count,'Przed deduplikacja')),(Row @('Powtorzone URL',($all.Count-$urls.Count),'Nie sa dodatkowymi zrodlami')),(Row @('Unikalne domeny',$domains.Count,'Kontrolna liczba domen')),(Row @('Grupy operacji',14,'Pelny zakres')),(Row @('Kategorie sprzetu',3,'Domowe; biurowe/premium; profesjonalne/gastronomiczne')),(Row @('Ceny Omobonus','Nie obliczano','Zgodnie z poleceniem')))
$xml = "<?xml version='1.0' encoding='UTF-8'?>`n<Workbook xmlns='urn:schemas-microsoft-com:office:spreadsheet' xmlns:ss='urn:schemas-microsoft-com:office:spreadsheet'><Worksheet ss:Name='00 Kontrola'><Table>$($summary -join '')</Table></Worksheet><Worksheet ss:Name='01 Zrodla'><Table>$(Row @('Lp','URL','Domena','Powtorzenie URL','Niezalezny zrodlo','Wynik weryfikacji'))$($rows -join '')</Table></Worksheet><Worksheet ss:Name='03 Operacje'><Table>$(Row @('ID','Grupa','Operacje','Kategorie','Ceny konkurencji','Normogodziny','Terminy'))$($opRows -join '')</Table></Worksheet><Worksheet ss:Name='07 Kategorie'><Table>$($catRows -join '')</Table></Worksheet></Workbook>"
[IO.File]::WriteAllText((Join-Path $root 'research-coffee-registry.xls'),$xml,(New-Object Text.UTF8Encoding($false)))
Write-Output "URL=$($urls.Count); wystapienia=$($all.Count); domeny=$($domains.Count)"
