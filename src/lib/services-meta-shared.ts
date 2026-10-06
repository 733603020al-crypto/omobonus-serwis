// Dane usług, które są identyczne dla wszystkich wersji językowych
// (ścieżki obrazów/ikon, marki, lista usług powiązanych).

export const serviceImageSrc: Record<string, string> = {
  'serwis-niszczarek': '/images/niszczarki-carousel-v1-01.webp',
  'serwis-drukarek-do-kart-plastikowych': '/images/karty-carousel-v1-01.webp',
  'serwis-drukarek-dtg': '/images/dtg-carousel-v1-01.webp',
  'serwis-drukarek-termicznych': '/images/termiczne-carousel-v3-01.webp',
  'serwis-laptopow': '/images/serwis-laptopow-hero-animated.webp',
  'serwis-komputerow-stacjonarnych': '/images/02_serwis-komputerow-stacjonarnych.webp',
  'outsourcing-it': '/images/03_outsourcing-it-v3-static.webp',
  'serwis-drukarek-laserowych': '/images/laser-carousel-v3-01.webp',
  'serwis-drukarek-atramentowych': '/images/atrament-carousel-v3-01.webp',
  'serwis-drukarek-3d': '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
  'druk-3d-na-zamowienie': '/images/Druk_3D_animation.svg?v=15',
  'serwis-plotterow': '/images/plotter-carousel-v3-00.webp',
  'serwis-drukarek-iglowych': '/images/iglowe-carousel-v3-01.webp',
  'naprawa-drukarek': '/images/Serwis_Drukarek.webp',
  'wynajem-drukarek': '/images/10_wynajem-drukarek.webp',
  'drukarka-zastepcza': '/images/11_drukarka-zastepcza.webp',
}

// Единый стандарт card-icon для карточек услуг (главная + related-services):
// прозрачный холст 160×160, объект центрирован, длинная сторона ≈80% холста.
// Используется и в sections/services.tsx (карточки главной), и здесь для
// related-services на страницах /uslugi/[slug].
export const serviceIconSrc: Record<string, string> = {
  'serwis-komputerow-stacjonarnych': '/images/serwis-komputerow-stacjonarnych-card-icon.webp',
  'serwis-laptopow': '/images/serwis-laptopow-card-icon.webp',
  'outsourcing-it': '/images/outsourcing-it-card-icon.webp',
  'serwis-drukarek-laserowych': '/images/laser-card-icon-v3.webp',
  'serwis-drukarek-atramentowych': '/images/atrament-card-icon-v3.webp',
  'serwis-drukarek-3d': '/images/serwis-drukarek-3d-card-icon.webp',
  'druk-3d-na-zamowienie': '/images/druk-3d-na-zamowienie-card-icon.webp',
  'serwis-plotterow': '/images/plotter-card-icon-v3.webp',
  'serwis-drukarek-termicznych': '/images/termiczne-card-icon-v3.webp',
  'serwis-drukarek-iglowych': '/images/iglowe-card-icon-v3.webp',
  'wynajem-drukarek': '/images/wynajem-drukarek-card-icon.webp',
  'drukarka-zastepcza': '/images/drukarka-zastepcza-card-icon.webp',
  'naprawa-drukarek': '/images/naprawa-drukarek-card-icon.webp',
}

export const slugBrands: Record<string, string[]> = {
  // Własna lista niszczarek; marka bez logo w brand-ticker.tsx jest na razie pomijana
  'serwis-niszczarek': ['fellowes', 'hsm', 'kobra', 'rexel', 'ideal', 'dahle', 'opus', 'leitz', 'wallner', 'argo', 'eba', 'hp', 'tracer', 'tarnator', 'genie', 'olympia', 'intimus', 'aurora', 'peach', 'lanberg'],
  'serwis-drukarek-do-kart-plastikowych': ['evolis', 'zebra', 'hid', 'magicard', 'entrust', 'matica', 'idp', 'hiti', 'dascom', 'swiftcolor', 'edisecure'],
  'serwis-drukarek-dtg': ['epson', 'brother', 'kornit', 'ricoh', 'polyprint', 'aeoon', 'mr', 'roq', 'omniprint', 'coldesi', 'pigment', 'anajet', 'roland-dg', 'mimaki', 'azonprinter', 'resolute', 'lawson', 'durst'],
  'serwis-laptopow': ['microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'toshiba', 'huawei', 'lg', 'gigabyte', 'razer', 'honor', 'xiaomi', 'medion', 'dynabook', 'vaio', 'panasonic', 'framework', 'chuwi', 'alienware'],
  'serwis-komputerow-stacjonarnych': ['hp', 'dell', 'lenovo', 'asus', 'acer', 'msi', 'microsoft', 'samsung', 'gigabyte', 'alienware', 'fujitsu', 'corsair', 'zotac', 'minisforum', 'framework', 'actina', 'komputronik'],
  'outsourcing-it': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'apc', 'cisco', 'ubiquiti', 'mikrotik', 'eaton'],
  'naprawa-drukarek': ['hp', 'samsung', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'dell', 'pantum', 'toshiba', 'olivetti', 'oki', 'fujifilm'],
  'serwis-plotterow': ['hp', 'canon', 'epson', 'xerox', 'ricoh', 'mimaki', 'roland-dg', 'mutoh', 'oki', 'fujifilm', 'agfa', 'kip', 'durst', 'swissqprint'],
  'serwis-drukarek-termicznych': ['zebra', 'tsc', 'toshiba-tec', 'honeywell', 'godex', 'sato', 'brother', 'dymo', 'citizen', 'bixolon', 'epson', 'cab', 'star-micronics', 'oki', 'argox', 'brady', 'avery-dennison', 'datamax-oneil'],
  'wynajem-drukarek': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'drukarka-zastepcza': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'serwis-drukarek-laserowych': ['hp', 'samsung', 'canon', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'pantum', 'toshiba', 'oki', 'epson', 'fujifilm', 'develop', 'utax', 'sindoh', 'triumph-adler', 'olivetti'],
  'serwis-drukarek-atramentowych': ['hp', 'canon', 'epson', 'brother', 'lexmark', 'ricoh', 'riso', 'xerox'],
  'serwis-drukarek-iglowych': ['epson', 'oki', 'bixolon', 'citizen', 'star-micronics', 'dascom', 'printronix', 'fujitsu', 'olivetti', 'panasonic', 'tallygenicom'],
  'serwis-drukarek-3d': ['bambulab', 'prusa', 'creality', 'anycubic', 'elegoo', 'formlabs', 'ultimaker', 'flashforge', 'snapmaker', 'qidi', 'makerbot', 'raise3d', 'zortrax', 'sovol', 'artillery', 'phrozen', 'bcn3d', 'peopoly', 'uniformation', 'tronxy', 'flyingbear', 'hbot3d', '3dgence', 'markforged', 'stratasys'],
  'druk-3d-na-zamowienie': ['bambulab', 'formlabs', 'creality', 'anycubic', 'prusa', 'flashforge', 'elegoo', 'zortrax', 'ultimaker', 'phrozen', 'artillery', 'snapmaker'],
}

export const relatedServiceSlugs = [
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-3d',
  'serwis-plotterow',
]

// Strony tymczasowo wyłączone z indeksowania (kopie w trakcie przepisywania treści).
// Usuń slug stąd, gdy treść strony zostanie docelowo zastąpiona.
export const noindexSlugs: string[] = ['serwis-niszczarek', 'serwis-drukarek-do-kart-plastikowych', 'serwis-drukarek-dtg']

// Home cards drawn as one finished picture (parchment + device + light and
// shadow, no text) — desktop and mobile proportions. The text stays live HTML.
// Also used by the card grid on /uslugi/naprawa-drukarek.
const bakedCard = (name: string) => ({ d: `/images/services-card-v2-${name}.webp`, m: `/images/services-card-v2-${name}-mobile.webp` })
export const serviceCardBaked: Record<string, { d: string; m: string }> = {
  'serwis-laptopow': bakedCard('laptop'),
  'serwis-komputerow-stacjonarnych': bakedCard('desktop'),
  'naprawa-drukarek': bakedCard('printer'),
  'serwis-drukarek-3d': bakedCard('3d'),
  'serwis-drukarek-termicznych': bakedCard('label'),
  'serwis-plotterow': bakedCard('plotter4'),
  'serwis-drukarek-laserowych': bakedCard('laser'),
  'serwis-drukarek-atramentowych': bakedCard('inkjet3'),
  'serwis-drukarek-iglowych': bakedCard('needle'),
  'druk-3d-na-zamowienie': bakedCard('3d-print'),
  'serwis-niszczarek': bakedCard('shredder'),
  'wynajem-drukarek': bakedCard('rental'),
  'drukarka-zastepcza': bakedCard('replacement'),
}
