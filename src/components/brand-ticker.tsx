"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react"
import Image from "next/image"
import { LOGO_METRICS } from "@/lib/brand-logo-metrics"

// listedOnly: marka pokazywana tylko tam, gdzie jest jawnie wymieniona w brandNames
// (nie trafia do ogólnego paska na stronie głównej / "O nas").
// hidden: logo zostaje w projekcie, ale na razie nigdzie się nie wyświetla
// (np. Apple — tych urządzeń jeszcze nie naprawiamy).
// scale: opcjonalny ręczny współczynnik dla jednej marki (mnoży rozmiar z autoLogoHeight),
// działa wszędzie, gdzie jest pasek — na komputerze i telefonie.
const brands: { name: string; src?: string; label?: string; scale?: number; heightClass?: string; maxWidthClass?: string; listedOnly?: boolean; hidden?: boolean }[] = [
  // компьютеры / ноутбуки
  { name: "apple", src: "/images/brands/apple.svg?v=2", hidden: true, heightClass: "h-[44px] md:h-[42px]", maxWidthClass: "max-w-[155px]" },
  { name: "microsoft", src: "/images/brands/microsoft.svg?v=2", heightClass: "h-[47px] md:h-[48px]", maxWidthClass: "max-w-[180px] md:max-w-[180px]" },
  { name: "dell", src: "/images/brands/dell.svg?v=4", heightClass: "h-[55px] md:h-[60px]", maxWidthClass: "max-w-[155px] md:max-w-[170px]" },
  { name: "hp",             heightClass: "h-[55px] md:h-[60px]", maxWidthClass: "max-w-[155px] md:max-w-[170px]" },
  { name: "lenovo",         heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "acer",           heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[195px] md:max-w-[190px]" },
  { name: "asus",           heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "msi", src: "/images/brands/msi.svg?v=2", heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[195px] md:max-w-[200px]" },
  { name: "fujitsu",        heightClass: "h-[44px] md:h-[46px]", maxWidthClass: "max-w-[220px] md:max-w-[230px]" },
  { name: "samsung",        heightClass: "h-[49px] md:h-[52px]", maxWidthClass: "max-w-[220px] md:max-w-[240px]" },
  // принтеры / офисная техника
  { name: "canon",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "epson",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "brother", src: "/images/brands/brother.svg?v=4", heightClass: "h-[34px] md:h-[34px]", maxWidthClass: "max-w-[210px] md:max-w-[220px]" },
  { name: "xerox",          heightClass: "h-[39px] md:h-[42px]", maxWidthClass: "max-w-[220px] md:max-w-[240px]" },
  { name: "ricoh",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "kyocera",        heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[195px] md:max-w-[190px]" },
  { name: "konica-minolta", heightClass: "h-[47px] md:h-[48px]", maxWidthClass: "max-w-[260px]" },
  { name: "sharp",          heightClass: "h-[31px] md:h-[30px]", maxWidthClass: "max-w-[155px] md:max-w-[160px]" },
  { name: "lexmark", src: "/images/brands/lexmark.webp", heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "pantum",         heightClass: "h-[42px] md:h-[43px]", maxWidthClass: "max-w-[210px] md:max-w-[216px]" },
  { name: "toshiba",        heightClass: "h-[33px] md:h-[31px]", maxWidthClass: "max-w-[175px] md:max-w-[171px]" },
  { name: "olivetti",       heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "oki",            heightClass: "h-[35px] md:h-[34px]", maxWidthClass: "max-w-[150px] md:max-w-[153px]" },
  { name: "bixolon",       heightClass: "h-[44px] md:h-[45px]", maxWidthClass: "max-w-[200px] md:max-w-[198px]" },
  { name: "dymo",           heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "zebra",          heightClass: "h-[88px] md:h-[38px]", maxWidthClass: "max-w-[300px] md:max-w-[170px]" },
  { name: "godex",          heightClass: "h-[35px] md:h-[34px]", maxWidthClass: "max-w-[185px] md:max-w-[189px]" },
  { name: "tsc",            src: "/images/brands/tsc.webp",            listedOnly: true, heightClass: "h-[38px] md:h-[38px]", maxWidthClass: "max-w-[150px] md:max-w-[150px]" },
  { name: "toshiba-tec",    src: "/images/brands/toshiba-tec.webp?v=2",    listedOnly: true, heightClass: "h-[24px] md:h-[24px]", maxWidthClass: "max-w-[220px] md:max-w-[220px]" },
  { name: "honeywell",      listedOnly: true, heightClass: "h-[34px] md:h-[34px]", maxWidthClass: "max-w-[200px] md:max-w-[200px]" },
  { name: "sato",           src: "/images/brands/sato.webp?v=3",       listedOnly: true, heightClass: "h-[40px] md:h-[40px]", maxWidthClass: "max-w-[140px] md:max-w-[140px]" },
  { name: "citizen",        src: "/images/brands/citizen.svg?v=2", listedOnly: true, heightClass: "h-[27px] md:h-[27px]", maxWidthClass: "max-w-[180px] md:max-w-[180px]" },
  { name: "cab",            src: "/images/brands/cab.webp",            listedOnly: true, heightClass: "h-[36px] md:h-[36px]", maxWidthClass: "max-w-[150px] md:max-w-[150px]" },
  { name: "star-micronics", src: "/images/brands/star-micronics.webp?v=2", listedOnly: true, heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[150px] md:max-w-[150px]" },
  { name: "argox",          src: "/images/brands/argox.webp",          listedOnly: true, heightClass: "h-[33px] md:h-[33px]", maxWidthClass: "max-w-[160px] md:max-w-[160px]" },
  { name: "mimaki",        src: "/images/brands/mimaki.webp", listedOnly: true, heightClass: "h-[30px] md:h-[30px]", maxWidthClass: "max-w-[169px] md:max-w-[169px]" },
  { name: "roland-dg",     src: "/images/brands/roland-dg.webp?v=2", listedOnly: true, heightClass: "h-[30px] md:h-[30px]", maxWidthClass: "max-w-[213px] md:max-w-[213px]" },
  { name: "mutoh",         src: "/images/brands/mutoh.webp", listedOnly: true, heightClass: "h-[30px] md:h-[30px]", maxWidthClass: "max-w-[178px] md:max-w-[178px]" },
  { name: "fujifilm",      src: "/images/brands/fujifilm.webp?v=2", listedOnly: true, heightClass: "h-[29px] md:h-[29px]", maxWidthClass: "max-w-[181px] md:max-w-[181px]" },
  { name: "agfa",          src: "/images/brands/agfa.webp?v=2", listedOnly: true, heightClass: "h-[40px] md:h-[40px]", maxWidthClass: "max-w-[165px] md:max-w-[165px]" },
  { name: "kip",           src: "/images/brands/kip.webp", listedOnly: true, heightClass: "h-[48px] md:h-[48px]", maxWidthClass: "max-w-[120px] md:max-w-[120px]" },
  { name: "durst",         src: "/images/brands/durst.webp", listedOnly: true, heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[152px] md:max-w-[152px]" },
  { name: "swissqprint",   src: "/images/brands/swissqprint.webp?v=2", listedOnly: true, heightClass: "h-[32px] md:h-[32px]", maxWidthClass: "max-w-[182px] md:max-w-[182px]" },
  { name: "sawgrass",      src: "/images/brands/sawgrass.svg", listedOnly: true, heightClass: "h-[30px] md:h-[30px]", maxWidthClass: "max-w-[228px] md:max-w-[228px]" },
  { name: "apc", src: "/images/brands/apc.svg?v=2", heightClass: "h-[39px] md:h-[38px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  // drukarki 3D
  { name: "bambulab",  src: "/images/brands/bambulab.svg?v=2", heightClass: "h-[36px] md:h-[34px]", maxWidthClass: "max-w-[210px] md:max-w-[210px]" },
  { name: "formlabs",  heightClass: "h-[29px] md:h-[28px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "creality",  heightClass: "h-[44px] md:h-[44px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "anycubic",  src: "/images/brands/anycubic.svg?v=3",   heightClass: "h-[39px] md:h-[40px]", maxWidthClass: "max-w-[235px] md:max-w-[240px]" },
  { name: "prusa",      heightClass: "h-[52px] md:h-[52px]", maxWidthClass: "max-w-[170px] md:max-w-[170px]" },
  { name: "flashforge", src: "/images/brands/flashforge.svg?v=3", heightClass: "h-[39px] md:h-[40px]", maxWidthClass: "max-w-[245px] md:max-w-[250px]" },
  { name: "elegoo",     src: "/images/brands/elegoo.svg?v=4",    heightClass: "h-[35px] md:h-[36px]", maxWidthClass: "max-w-[245px] md:max-w-[250px]" },
  { name: "zortrax",    heightClass: "h-[26px] md:h-[25px]", maxWidthClass: "max-w-[210px] md:max-w-[200px]" },
  { name: "ultimaker",  src: "/images/brands/ultimaker.svg?v=5", heightClass: "h-[29px] md:h-[26px]", maxWidthClass: "max-w-[195px] md:max-w-[180px]" },
  { name: "phrozen",    src: "/images/brands/phrozen.svg?v=2", heightClass: "h-[70px] md:h-[62px]", maxWidthClass: "max-w-[85px] md:max-w-[76px]" },
  { name: "artillery",  src: "/images/brands/artillery.svg?v=2", heightClass: "h-[36px] md:h-[36px]", maxWidthClass: "max-w-[260px] md:max-w-[240px]" },
  { name: "snapmaker",  src: "/images/brands/snapmaker.svg?v=2", heightClass: "h-[34px] md:h-[34px]", maxWidthClass: "max-w-[155px] md:max-w-[155px]" },
  { name: "hbot3d", src: "/images/brands/hbot3d.webp", listedOnly: true },
  { name: "dascom", src: "/images/brands/dascom.webp", listedOnly: true },
  { name: "printronix", src: "/images/brands/printronix.webp", listedOnly: true },
  { name: "panasonic", src: "/images/brands/panasonic.webp", listedOnly: true },
  { name: "tallygenicom", src: "/images/brands/tallygenicom.webp", listedOnly: true },
  { name: "riso", src: "/images/brands/riso.webp", listedOnly: true },
  { name: "develop", src: "/images/brands/develop.webp", listedOnly: true },
  { name: "utax", src: "/images/brands/utax.webp", listedOnly: true },
  { name: "sindoh", src: "/images/brands/sindoh.webp", listedOnly: true },
  { name: "huawei", src: "/images/brands/huawei.webp", listedOnly: true },
  { name: "lg", src: "/images/brands/lg.webp", listedOnly: true },
  { name: "gigabyte", src: "/images/brands/gigabyte.webp", listedOnly: true },
  { name: "razer", src: "/images/brands/razer.webp", listedOnly: true },
  { name: "honor", src: "/images/brands/honor.webp", listedOnly: true },
  { name: "xiaomi", src: "/images/brands/xiaomi.webp", listedOnly: true },
  { name: "medion", src: "/images/brands/medion.webp", listedOnly: true },
  { name: "dynabook", src: "/images/brands/dynabook.webp", listedOnly: true },
  { name: "vaio", src: "/images/brands/vaio.webp", listedOnly: true },
  { name: "chuwi", src: "/images/brands/chuwi.webp", listedOnly: true },
  { name: "framework", src: "/images/brands/framework.webp", listedOnly: true },
  { name: "alienware", src: "/images/brands/alienware.webp", listedOnly: true },
  { name: "zotac", src: "/images/brands/zotac.webp", listedOnly: true },
  { name: "corsair", src: "/images/brands/corsair.webp", listedOnly: true },
  { name: "minisforum", src: "/images/brands/minisforum.webp", listedOnly: true },
  { name: "qidi", src: "/images/brands/qidi.webp", listedOnly: true },
  { name: "flyingbear", src: "/images/brands/flyingbear.webp", listedOnly: true },
  { name: "raise3d", src: "/images/brands/raise3d.webp", listedOnly: true },
  { name: "sovol", src: "/images/brands/sovol.webp", listedOnly: true },
  { name: "makerbot", src: "/images/brands/makerbot.webp", listedOnly: true },
  { name: "uniformation", src: "/images/brands/uniformation.webp", listedOnly: true },
  { name: "peopoly", src: "/images/brands/peopoly.webp", listedOnly: true },
  { name: "tronxy", src: "/images/brands/tronxy.webp", listedOnly: true },
  { name: "bcn3d", src: "/images/brands/bcn3d.webp", listedOnly: true },
  // niszczarki (logo z oficjalnych stron producentów)
  { name: "fellowes", listedOnly: true },
  { name: "hsm", src: "/images/brands/hsm.webp", listedOnly: true },
  { name: "kobra", listedOnly: true },
  { name: "rexel", listedOnly: true },
  { name: "ideal", src: "/images/brands/ideal.webp", listedOnly: true },
  { name: "dahle", src: "/images/brands/dahle.webp", listedOnly: true },
  { name: "opus", listedOnly: true },
  { name: "leitz", listedOnly: true },
  { name: "argo", src: "/images/brands/argo.webp", listedOnly: true },
  { name: "eba", listedOnly: true },
  { name: "tracer", listedOnly: true },
  { name: "genie", listedOnly: true },
  { name: "olympia", listedOnly: true },
  { name: "intimus", listedOnly: true },
  { name: "aurora", src: "/images/brands/aurora.webp", listedOnly: true },
  // scale: ciemne tło plakietki liczy się jako "gęste" logo, choć na ciemnym pasku go nie widać
  { name: "wallner", src: "/images/brands/wallner.webp", listedOnly: true, scale: 1.22 },
  { name: "tarnator", src: "/images/brands/tarnator.webp", listedOnly: true },
  { name: "peach", src: "/images/brands/peach.webp", listedOnly: true },
  // marki dodane po audycie logo (oficjalne logo producentów)
  { name: "3dgence", src: "/images/brands/3dgence.webp", listedOnly: true },
  { name: "markforged", src: "/images/brands/markforged.webp", listedOnly: true },
  { name: "stratasys", src: "/images/brands/stratasys.webp", listedOnly: true },
  { name: "lanberg", src: "/images/brands/lanberg.webp", listedOnly: true },
  { name: "actina", src: "/images/brands/actina.webp", listedOnly: true },
  { name: "komputronik", src: "/images/brands/komputronik.webp", listedOnly: true },
  { name: "cisco", src: "/images/brands/cisco.webp", listedOnly: true },
  { name: "ubiquiti", src: "/images/brands/ubiquiti.webp", listedOnly: true },
  { name: "mikrotik", src: "/images/brands/mikrotik.webp", listedOnly: true },
  { name: "eaton", src: "/images/brands/eaton.webp", listedOnly: true },
  { name: "triumph-adler", src: "/images/brands/triumph-adler.webp", listedOnly: true, scale: 1.25 }, // drobne hasło pod nazwą zaniża wagę logo
  { name: "brady", src: "/images/brands/brady.webp", listedOnly: true },
  { name: "avery-dennison", src: "/images/brands/avery-dennison.webp", listedOnly: true },
  { name: "datamax-oneil", src: "/images/brands/datamax-oneil.webp", listedOnly: true },
  // drukarki do kart plastikowych (oficjalne logo producentów; XID nie ma osobnego logo — to seria drukarek Matica)
  { name: "evolis", listedOnly: true },
  { name: "hid", listedOnly: true },
  { name: "magicard", listedOnly: true },
  { name: "entrust", listedOnly: true },
  { name: "matica", src: "/images/brands/matica.webp", listedOnly: true },
  { name: "idp", src: "/images/brands/idp.webp", listedOnly: true },
  { name: "hiti", src: "/images/brands/hiti.webp", listedOnly: true },
  { name: "swiftcolor", listedOnly: true },
  { name: "edisecure", listedOnly: true },
  // zasilacze UPS (oficjalne logo producentów; ABB, Liebert — Wikimedia Commons; Powerware, MGE — archiwum oficjalnych stron)
  { name: "schneider-electric", listedOnly: true },
  { name: "powerware", src: "/images/brands/powerware.webp", listedOnly: true },
  { name: "riello", src: "/images/brands/riello.webp", listedOnly: true },
  { name: "vertiv", listedOnly: true },
  { name: "liebert", listedOnly: true },
  { name: "emerson", listedOnly: true },
  { name: "mge", src: "/images/brands/mge.webp", listedOnly: true },
  { name: "socomec", src: "/images/brands/socomec.webp", listedOnly: true },
  { name: "delta", listedOnly: true },
  { name: "ever", src: "/images/brands/ever.webp", listedOnly: true },
  { name: "fideltronik", listedOnly: true },
  { name: "cyberpower", listedOnly: true },
  { name: "powerwalker", src: "/images/brands/powerwalker.webp", listedOnly: true },
  { name: "legrand", listedOnly: true },
  { name: "aeg", listedOnly: true },
  { name: "abb", listedOnly: true },
  { name: "ge", listedOnly: true },
  { name: "siemens", listedOnly: true },
  { name: "g-tec", src: "/images/brands/g-tec.webp", listedOnly: true },
  { name: "borri", src: "/images/brands/borri.webp", listedOnly: true },
  { name: "orvaldi", listedOnly: true },
  { name: "salicru", src: "/images/brands/salicru.webp", listedOnly: true },
  // drukarki DTG (oficjalne logo producentów)
  { name: "kornit", src: "/images/brands/kornit.webp", listedOnly: true, scale: 1.15 },
  { name: "polyprint", src: "/images/brands/polyprint.webp", listedOnly: true },
  { name: "aeoon", src: "/images/brands/aeoon.webp", listedOnly: true },
  { name: "mr", src: "/images/brands/mr.webp", listedOnly: true, scale: 1.15 },
  { name: "roq", src: "/images/brands/roq.webp", listedOnly: true },
  { name: "omniprint", src: "/images/brands/omniprint.webp", listedOnly: true, scale: 1.2 },
  { name: "coldesi", src: "/images/brands/coldesi.webp", listedOnly: true },
  { name: "pigment", src: "/images/brands/pigment.webp", listedOnly: true },
  { name: "anajet", src: "/images/brands/anajet.webp", listedOnly: true },
  { name: "azonprinter", src: "/images/brands/azonprinter.webp", listedOnly: true },
  { name: "resolute", src: "/images/brands/resolute.webp", listedOnly: true },
  { name: "lawson", src: "/images/brands/lawson.webp", listedOnly: true },
  // DTF
  { name: "fedar", src: "/images/brands/fedar.webp", listedOnly: true },
  { name: "audley", src: "/images/brands/audley.webp", listedOnly: true },
  { name: "pegasus", src: "/images/brands/pegasus.webp", listedOnly: true },
  { name: "trujet", src: "/images/brands/trujet.webp", listedOnly: true },
  { name: "artemis", src: "/images/brands/artemis.webp", listedOnly: true },
  { name: "ironprinter", src: "/images/brands/ironprinter.webp", listedOnly: true },
  { name: "dias", src: "/images/brands/dias.svg", listedOnly: true },
  { name: "cobe", src: "/images/brands/cobe.svg", listedOnly: true },
  { name: "keditec", src: "/images/brands/keditec.svg", listedOnly: true },
  { name: "dtf-station", src: "/images/brands/dtf-station.webp", listedOnly: true },
  // drukarki spożywcze (oficjalne logo producentów)
  { name: "jetlt", src: "/images/brands/jetlt.webp", listedOnly: true },
  { name: "primera", src: "/images/brands/primera.webp", listedOnly: true },
  { name: "icing-images", src: "/images/brands/icing-images.webp", listedOnly: true },
  { name: "icinginks", src: "/images/brands/icinginks.webp", listedOnly: true },
  { name: "kopykake", src: "/images/brands/kopykake.webp", listedOnly: true, scale: 1.3 }, // drobny napis + grafika kucharza zaniżają wagę logo
  { name: "decopac", src: "/images/brands/decopac.webp", listedOnly: true },
  { name: "evebot", src: "/images/brands/evebot.webp", listedOnly: true },
  { name: "cino-printer", src: "/images/brands/cino-printer.webp", listedOnly: true },
]

// Proporcje (szerokość / wysokość) plików logo. Dzięki nim <img> ma poprawną
// szerokość jeszcze przed załadowaniem (loading="lazy") — bez tego doładowanie
// logo zmieniało szerokość toru, przesuwało kolejne logo i przeliczało czas
// animacji w trakcie ruchu (widoczne "szarpnięcie"). Przy nowej marce dopisać.
const LOGO_RATIO: Record<string, number> = {
  "apple": 0.814, "microsoft": 4.689, "dell": 1.000, "hp": 1.002, "lenovo": 3.000, "acer": 4.151,
  "asus": 4.673, "msi": 3.084, "fujitsu": 2.055, "samsung": 2.947, "canon": 4.781, "epson": 4.068,
  "brother": 3.740, "xerox": 3.554, "ricoh": 5.541, "kyocera": 3.985, "konica-minolta": 1.723,
  "sharp": 7.018, "lexmark": 5.194, "pantum": 9.179, "toshiba": 6.563, "olivetti": 2.817,
  "oki": 3.369, "bixolon": 6.760, "dymo": 3.121, "zebra": 3.429, "godex": 4.196, "tsc": 2.682,
  "toshiba-tec": 9.042, "honeywell": 5.635, "sato": 3.375, "citizen": 5.473, "cab": 2.690,
  "star-micronics": 1.852, "argox": 3.908, "apc": 2.097, "bambulab": 3.593, "formlabs": 6.846,
  "creality": 4.352, "anycubic": 5.074, "prusa": 1.566, "flashforge": 4.853, "elegoo": 4.044,
  "zortrax": 4.435, "ultimaker": 6.818, "phrozen": 1.000, "artillery": 5.242, "snapmaker": 4.386,
  "mimaki": 5.460, "roland-dg": 6.911, "mutoh": 5.742, "fujifilm": 6.065, "agfa": 3.976, "kip": 2.395,
  "durst": 3.331, "swissqprint": 5.508, "sawgrass": 7.605,
  "hbot3d": 5.900, "qidi": 5.605, "flyingbear": 4.121, "raise3d": 4.21, "sovol": 5.855, "makerbot": 4.984, "uniformation": 8.387, "peopoly": 4.04, "tronxy": 8.323, "bcn3d": 3.984,
  "dascom": 8.895, "printronix": 6.339, "panasonic": 6.806, "tallygenicom": 4.266, "riso": 4.379,
  "develop": 6.226, "utax": 5.452, "sindoh": 5.435,
  "huawei": 3.839, "lg": 2.161, "gigabyte": 7.363, "razer": 3.427, "honor": 5.113, "xiaomi": 3.645, "medion": 6.855, "dynabook": 7.331, "vaio": 4.524, "chuwi": 4.879, "framework": 7.161,
  "alienware": 0.774, "zotac": 5.129, "corsair": 4.048, "minisforum": 9.331,
  "fellowes": 4.388, "hsm": 3.383, "kobra": 3.989, "rexel": 1.920, "ideal": 3.939, "dahle": 4.775, "opus": 2.260, "leitz": 4.534,
  "argo": 2.292, "eba": 5.620, "tracer": 5.800, "genie": 5.973, "olympia": 6.134, "intimus": 3.613, "aurora": 5.712, "peach": 3.450, "wallner": 2.407, "tarnator": 10.548,
  "3dgence": 4.075, "markforged": 0.942, "stratasys": 3.317, "lanberg": 4.950, "actina": 6.383, "komputronik": 5.925, "cisco": 1.892,
  "ubiquiti": 0.807, "mikrotik": 5.808, "eaton": 3.650, "triumph-adler": 3.300, "brady": 5.267, "avery-dennison": 3.100, "datamax-oneil": 1.615,
  "evolis": 5.125, "hid": 2.550, "magicard": 2.805, "entrust": 9.230, "matica": 6.900, "idp": 2.490, "hiti": 3.290, "swiftcolor": 5.375, "edisecure": 8.360,
  "schneider-electric": 3.385, "powerware": 5.375, "riello": 3.465, "vertiv": 4.040, "liebert": 5.345, "emerson": 2.385, "mge": 1.610, "socomec": 5.975,
  "delta": 3.245, "ever": 2.975, "fideltronik": 5.670, "cyberpower": 5.430, "powerwalker": 2.255, "legrand": 4.040, "aeg": 5.875, "abb": 2.605,
  "ge": 1.000, "siemens": 6.315, "g-tec": 2.050, "borri": 3.900, "orvaldi": 1.610, "salicru": 7.710,
  "kornit": 4.120, "polyprint": 4.210, "aeoon": 3.880, "mr": 2.845, "roq": 2.345, "omniprint": 2.160, "coldesi": 4.200, "pigment": 4.205, "anajet": 2.765, "azonprinter": 1.545, "resolute": 1.000, "lawson": 5.530,
  "fedar": 4.070, "audley": 7.595, "pegasus": 3.875, "trujet": 4.880, "artemis": 4.090, "ironprinter": 2.605, "dias": 2.645, "cobe": 7.200, "keditec": 5.055, "dtf-station": 3.110,
  "jetlt": 4.411, "primera": 3.443, "icing-images": 6.563, "icinginks": 2.275, "kopykake": 2.519, "decopac": 6.131, "evebot": 3.682, "cino-printer": 2.706,
}

// Rozmiar liczony z pomiarów logo (scripts/brand-logo-metrics.mjs)
// zamiast ręcznych heightClass — każde logo ma podobną "wagę" wizualną:
// długie napisy niższe, zwarte znaki wyższe, bardzo gęste/pełne trochę mniejsze.
// Reguła: wysokość ∝ ratio^-0.4 (pomiędzy równą wysokością a równą
// powierzchnią — przy równej powierzchni zwarte/kwadratowe znaki wychodziły
// za duże); bardzo gęste/pełne logo trochę mniejsze, cienkie NIE są
// powiększane (wtedy ich prostokąt urastał ponad resztę); wspólny limit
// wysokości/szerokości. BRAND_SIZE_K — ogólna wielkość wszystkich logo,
// ta sama na każdej stronie (compact zmienia tylko wysokość paska).
const BRAND_SIZE_K = 60
const BRAND_RATIO_EXP = 0.4
const BRAND_INK_EXP = 0.3
const BRAND_MIN_H = 22
const BRAND_MAX_H = 50
const BRAND_MAX_W = 240
function autoLogoHeight(name: string, scale = 1): number | undefined {
  const m = LOGO_METRICS[name]
  if (!m) return undefined
  let h = BRAND_SIZE_K * Math.pow(m.ratio, -BRAND_RATIO_EXP) * Math.pow(Math.min(1, 0.5 / m.ink), BRAND_INK_EXP)
  h = Math.min(BRAND_MAX_H, Math.max(BRAND_MIN_H, h), BRAND_MAX_W / m.ratio)
  // wysokość pliku razem z jego pustym marginesem
  return Math.round((h * scale) / (1 - m.pad))
}

const gap = 48
const subscribeNoop = () => () => {}
// Stała referencja: React 19 przy nowym obiekcie ponownie ustawia innerHTML.
const KEEP_SERVER_HTML = { __html: "" }
// Docelowa prędkość ruchu identyczna z poprzednią implementacją JS (rAF):
// 0.4px/klatkę przy ~60fps = 24px/s. Ta sama stała co w PrintedPartsTicker.
const TARGET_SPEED_PX_PER_SEC = 24

function BrandGroup({ displayBrands, compact, muted, ariaHidden }: { displayBrands: typeof brands; compact?: boolean; muted?: boolean; ariaHidden?: boolean }) {
  return (
    <>
      {displayBrands.map((brand, i) => {
        const autoH = autoLogoHeight(brand.name, brand.scale)
        return (
        <div
          key={i}
          className={`inline-flex shrink-0 items-center h-[78px] transition-opacity duration-300 ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}${muted ? ' brand-ticker-logo-muted' : ''}`}
          aria-hidden={ariaHidden}
        >
          {brand.label ? (
            <span
              className="whitespace-nowrap text-white shrink-0"
              style={{
                fontFamily: "'Arial Black','Arial Bold',Arial,sans-serif",
                fontWeight: 900,
                fontSize: "25px",
                filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))"
              }}
            >
              {brand.label}
            </span>
          ) : (
            <Image
              src={brand.src ?? `/images/brands/${brand.name}.svg`}
              alt={ariaHidden ? "" : brand.name}
              width={Math.round(62 * (LOGO_RATIO[brand.name] ?? 240 / 62))}
              height={62}
              loading="lazy"
              unoptimized
              className={autoH ? "w-auto object-contain" : `w-auto object-contain ${brand.heightClass ?? ''} ${brand.maxWidthClass ?? ''}${compact ? ' md:max-h-[44px]' : ''}`}
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.45))", ...(autoH ? { height: autoH } : {}) }}
              draggable={false}
            />
          )}
        </div>
        )
      })}
    </>
  )
}

// muted — przygaszone logo na desktopie (pierwszy ekran głównej), pełny kolor po najechaniu.
export default function BrandTicker({ brandNames, compact, muted }: { brandNames?: string[]; compact?: boolean; muted?: boolean } = {}) {
  // Kolejność = kolejność w brandNames (slugBrands), żeby dało się ją ustawić per strona.
  const displayBrands = brandNames
    ? brandNames.map(n => brands.find(b => b.name === n)).filter((b): b is (typeof brands)[number] => !!b && !b.hidden)
    : brands.filter(b => !b.listedOnly && !b.hidden)
  // Tyle kopii, żeby jedna "grupa" (100%/copies szerokości toru) zawsze
  // przekraczała szerokość viewportu — pętla translateX(-100%/copies) zostaje
  // wizualnie bezszwowa nawet przy krótkich listach marek (np. slugBrands).
  const copies = displayBrands.length > 0
    ? Math.max(2, Math.ceil(4000 / (displayBrands.length * 200)) + 1)
    : 2
  const trackRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const hoverRef = useRef<HTMLDivElement | null>(null)
  const [durationSec, setDurationSec] = useState(0)
  // Logo z serwera nie są hydratowane — React zostawia ich HTML bez zmian
  // (statyczne obrazki). Przy montowaniu na kliencie (przejście między
  // stronami) renderują się normalnie.
  const mountedAfterHydration = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const [staticLogos] = useState(() => typeof window !== "undefined" && !mountedAfterHydration)

  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    const hoverEl = hoverRef.current
    if (!track || !section) return

    const updateDuration = () => {
      const oneGroupWidth = track.scrollWidth / copies
      if (oneGroupWidth > 0) setDurationSec(oneGroupWidth / TARGET_SPEED_PX_PER_SEC)
    }
    updateDuration()
    const resizeObserver = new ResizeObserver(updateDuration)
    resizeObserver.observe(track)

    // Animacja CSS działa na compositorze bez JS na klatkę, ale pauzujemy ją,
    // gdy pasek jest poza ekranem, karta w tle, lub kursor nad paskiem — po co
    // animować coś, czego i tak nikt nie widzi (albo co ktoś chce obejrzeć).
    // Hover jest tu, a nie w CSS :hover, bo ten sam inline style ustawiają też
    // IntersectionObserver/visibilitychange — jeden wspólny "właściciel" stanu
    // zamiast dwóch reguł nadpisujących się nawzajem.
    let isIntersecting = false
    let isHovered = false
    const applyPlayState = () => {
      track.style.animationPlayState = isIntersecting && !document.hidden && !isHovered ? 'running' : 'paused'
    }

    const sectionObserver = new IntersectionObserver(([entry]) => {
      // ruch tylko gdy widać co najmniej połowę paska
      isIntersecting = entry.intersectionRatio >= 0.5
      applyPlayState()
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] })
    sectionObserver.observe(section)

    document.addEventListener("visibilitychange", applyPlayState)

    const handleMouseEnter = () => { isHovered = true; applyPlayState() }
    const handleMouseLeave = () => { isHovered = false; applyPlayState() }
    hoverEl?.addEventListener("mouseenter", handleMouseEnter)
    hoverEl?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("visibilitychange", applyPlayState)
      hoverEl?.removeEventListener("mouseenter", handleMouseEnter)
      hoverEl?.removeEventListener("mouseleave", handleMouseLeave)
      sectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [copies])

  const toPercent = 100 / copies
  const trackStyle = { gap: `${gap}px`, width: "max-content", willChange: "transform", animationDuration: `${durationSec}s`, "--brand-ticker-shift": `-${toPercent}%`, "--brand-ticker-play": durationSec > 0 ? "running" : "paused" } as CSSProperties

  return (
    <section ref={sectionRef} className={`relative w-full h-[78px] -mt-[39px] -mb-[39px] md:-mt-[34px] md:-mb-[34px] z-10 overflow-hidden ${compact ? 'md:h-[56px]' : 'md:h-[68px]'}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.22) 0%, transparent 72%)" }}
      />
      <div ref={hoverRef} className="relative z-10 w-screen -mx-[calc((100vw-100%)/2)] overflow-visible brand-ticker-hover-pause">
        {staticLogos ? (
          <div
            ref={trackRef}
            className="flex items-center brand-ticker-track"
            style={trackStyle}
            dangerouslySetInnerHTML={KEEP_SERVER_HTML}
            suppressHydrationWarning
          />
        ) : (
          <div ref={trackRef} className="flex items-center brand-ticker-track" style={trackStyle}>
            {Array.from({ length: copies }).map((_, i) => (
              <BrandGroup key={i} displayBrands={displayBrands} compact={compact} muted={muted} ariaHidden={i > 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
