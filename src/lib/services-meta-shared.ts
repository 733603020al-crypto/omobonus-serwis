// Dane usług, które są identyczne dla wszystkich wersji językowych
// (ścieżki obrazów/ikon, marki, lista usług powiązanych).

export const serviceImageSrc: Record<string, string> = {
  'serwis-drukarek-termicznych': '/images/06_serwis-drukarek-termicznych.webp',
  'serwis-laptopow': '/images/serwis-laptopow-hero-animated.webp',
  'serwis-komputerow-stacjonarnych': '/images/02_serwis-komputerow-stacjonarnych.webp',
  'outsourcing-it': '/images/03_outsourcing-it.webp',
  'serwis-drukarek-laserowych': '/images/04_serwis-drukarek-laserowych.webp',
  'serwis-drukarek-atramentowych': '/images/05_serwis-drukarek-atramentowych.webp',
  'serwis-drukarek-3d': '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
  'druk-3d-na-zamowienie': '/images/Druk_3D_animation.svg?v=15',
  'serwis-plotterow': '/images/08_serwis-ploterow.webp',
  'serwis-drukarek-iglowych': '/images/07_serwis-drukarek-iglowych.webp',
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
  'serwis-drukarek-laserowych': '/images/serwis-drukarek-laserowych-card-icon.webp',
  'serwis-drukarek-atramentowych': '/images/serwis-drukarek-atramentowych-card-icon.webp',
  'serwis-drukarek-3d': '/images/serwis-drukarek-3d-card-icon.webp',
  'druk-3d-na-zamowienie': '/images/druk-3d-na-zamowienie-card-icon.webp',
  'serwis-plotterow': '/images/serwis-plotterow-card-icon.webp',
  'serwis-drukarek-termicznych': '/images/serwis-drukarek-termicznych-card-icon.webp',
  'serwis-drukarek-iglowych': '/images/serwis-drukarek-iglowych-card-icon.webp',
  'wynajem-drukarek': '/images/wynajem-drukarek-card-icon.webp',
  'drukarka-zastepcza': '/images/drukarka-zastepcza-card-icon.webp',
  'naprawa-drukarek': '/images/naprawa-drukarek-card-icon.webp',
}

export const slugBrands: Record<string, string[]> = {
  'serwis-laptopow': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'toshiba'],
  'serwis-komputerow-stacjonarnych': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung'],
  'outsourcing-it': ['apple', 'microsoft', 'dell', 'hp', 'lenovo', 'acer', 'asus', 'msi', 'fujitsu', 'samsung', 'apc'],
  'naprawa-drukarek': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'pantum', 'toshiba', 'olivetti', 'oki', 'samsung'],
  'serwis-plotterow': ['hp', 'canon', 'epson', 'xerox', 'ricoh'],
  'serwis-drukarek-termicznych': ['brother', 'zebra', 'dymo', 'godex', 'bixolon', 'oki'],
  'wynajem-drukarek': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'drukarka-zastepcza': ['hp', 'canon', 'epson', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'toshiba', 'oki'],
  'serwis-drukarek-laserowych': ['hp', 'canon', 'brother', 'xerox', 'ricoh', 'kyocera', 'konica-minolta', 'sharp', 'lexmark', 'pantum', 'samsung', 'oki', 'toshiba'],
  'serwis-drukarek-atramentowych': ['hp', 'canon', 'epson', 'brother'],
  'serwis-drukarek-iglowych': ['epson', 'oki', 'bixolon'],
  'serwis-drukarek-3d': ['bambulab', 'formlabs', 'creality', 'anycubic', 'prusa', 'flashforge', 'elegoo', 'zortrax', 'ultimaker', 'phrozen', 'artillery', 'snapmaker'],
  'druk-3d-na-zamowienie': ['bambulab', 'formlabs', 'creality', 'anycubic', 'prusa', 'flashforge', 'elegoo', 'zortrax', 'ultimaker', 'phrozen', 'artillery', 'snapmaker'],
}

export const relatedServiceSlugs = [
  'serwis-drukarek-laserowych',
  'serwis-drukarek-atramentowych',
  'serwis-drukarek-iglowych',
  'serwis-plotterow',
  'serwis-drukarek-termicznych',
  'serwis-drukarek-3d',
  'wynajem-drukarek',
  'drukarka-zastepcza',
]

// Strony tymczasowo wyłączone z indeksowania (kopie w trakcie przepisywania treści).
// Usuń slug stąd, gdy treść strony zostanie docelowo zastąpiona.
export const noindexSlugs: string[] = []
