// Service categories shared by the header "Usługi" menu and the home page
// "Serwis i naprawa" catalogue, so both always list the same services.
// Labels are nominative (menu); the home cards keep their own genitive labels.

export type ServiceLocale = 'pl' | 'uk' | 'ru'

export type ServiceCategoryItem = {
  label: Record<ServiceLocale, string>
  href: string
  icon: string
  iconTall?: boolean
  locales?: ServiceLocale[]
  /** Listed in the header menu only, not among the home cards. */
  menuOnly?: boolean
}

export type ServiceCategory = {
  /** Column title in the header menu. */
  title: Record<ServiceLocale, string>
  /** Category button on the home page (defaults to `title`). */
  homeTitle?: Record<ServiceLocale, string>
  /** Shorter title on phones (mobile menu + home category button); desktop keeps `title`. */
  titleMobile?: Record<ServiceLocale, string>
  /** Makes the menu column title a link, looking the same as before. */
  href?: string
  /** Icon of the category button on the home page. */
  icon: string
  items: ServiceCategoryItem[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: { pl: 'Komputery i IT', uk: 'Комп\'ютери та ІТ', ru: 'Компьютеры и IT' },
    icon: '/images/menu-icon-laptopy.webp',
    items: [
      { label: { pl: 'Laptopy', uk: 'Ноутбуки', ru: 'Ноутбуки' }, href: '/uslugi/serwis-laptopow', icon: '/images/menu-icon-laptopy.webp' },
      { label: { pl: 'Komputery stacjonarne', uk: 'Стаціонарні комп\'ютери', ru: 'Стационарные компьютеры' }, href: '/uslugi/serwis-komputerow-stacjonarnych', icon: '/images/menu-icon-komputery-stacjonarne.webp' },
      { label: { pl: 'Outsourcing IT', uk: 'ІТ-аутсорсинг', ru: 'IT-аутсорсинг' }, href: '/uslugi/outsourcing-it', icon: '/images/menu-icon-outsourcing-it.webp' },
    ],
  },
  {
    title: { pl: 'Drukarki (kserokopiarki) biurowe', uk: 'Офісні принтери (копіри)', ru: 'Офисные принтеры (копиры)' },
    titleMobile: { pl: 'Drukarki biurowe', uk: 'Офісні принтери', ru: 'Офисные принтеры' },
    href: '/uslugi/naprawa-drukarek',
    icon: '/images/menu-icon-drukarki-laserowe.webp',
    items: [
      { label: { pl: 'Drukarki laserowe', uk: 'Лазерні принтери', ru: 'Лазерные принтеры' }, href: '/uslugi/serwis-drukarek-laserowych', icon: '/images/menu-icon-drukarki-laserowe.webp' },
      { label: { pl: 'Drukarki atramentowe', uk: 'Струменеві принтери', ru: 'Струйные принтеры' }, href: '/uslugi/serwis-drukarek-atramentowych', icon: '/images/menu-icon-drukarki-atramentowe.webp' },
      { label: { pl: 'Drukarki igłowe', uk: 'Матричні принтери', ru: 'Матричные принтеры' }, href: '/uslugi/serwis-drukarek-iglowych', icon: '/images/menu-icon-drukarki-iglowe.webp' },
      { label: { pl: 'Drukarki etykiet termicznych', uk: 'Термопринтери етикеток', ru: 'Термопринтеры этикеток' }, href: '/uslugi/serwis-drukarek-termicznych', icon: '/images/menu-icon-drukarki-etykiet-termicznych.webp' },
    ],
  },
  {
    title: { pl: 'Drukarki specjalistyczne', uk: 'Спеціалізовані принтери', ru: 'Специализированные принтеры' },
    icon: '/images/menu-icon-drukarki-dtg.webp',
    items: [
      { label: { pl: 'Drukarki sublimacyjne', uk: 'Сублімаційні принтери', ru: 'Сублимационные принтеры' }, href: '/uslugi/serwis-drukarek-sublimacyjnych', icon: '/images/menu-icon-drukarki-sublimacyjne.webp' },
      { label: { pl: 'Drukarki DTF', uk: 'DTF-принтери', ru: 'DTF-принтеры' }, href: '/uslugi/serwis-drukarek-dtf', icon: '/images/menu-icon-drukarki-dtf.webp' },
      { label: { pl: 'Drukarki DTG', uk: 'DTG-принтери', ru: 'DTG-принтеры' }, href: '/uslugi/serwis-drukarek-dtg', icon: '/images/menu-icon-drukarki-dtg.webp' },
      { label: { pl: 'Drukarki spożywcze', uk: 'Харчові принтери', ru: 'Пищевые принтеры' }, href: '/uslugi/serwis-drukarek-spozywczych', icon: '/images/menu-icon-drukarki-spozywcze.webp', iconTall: true },
      { label: { pl: 'Drukarki do kart plastikowych', uk: 'Принтери пластикових карток', ru: 'Принтеры пластиковых карт' }, href: '/uslugi/serwis-drukarek-do-kart-plastikowych', icon: '/images/menu-icon-drukarki-do-kart-plastikowych.webp' },
    ],
  },
  {
    title: { pl: 'Inne urządzenia i usługi', uk: 'Інші пристрої та послуги', ru: 'Другие устройства и услуги' },
    icon: '/images/menu-icon-drukarki-3d.webp',
    items: [
      { label: { pl: 'Drukarki 3D', uk: '3D-принтери', ru: '3D-принтеры' }, href: '/uslugi/serwis-drukarek-3d', icon: '/images/menu-icon-drukarki-3d.webp' },
      { label: { pl: 'Druk 3D na zamówienie', uk: '3D-друк на замовлення', ru: '3D-печать на заказ' }, href: '/uslugi/druk-3d-na-zamowienie', icon: '/images/menu-icon-druk-3d-na-zamowienie.webp' },
      { label: { pl: 'Plotery', uk: 'Плотери', ru: 'Плоттеры' }, href: '/uslugi/serwis-plotterow', icon: '/images/menu-icon-plotery.webp' },
      { label: { pl: 'Niszczarki', uk: 'Шредери', ru: 'Шредеры' }, href: '/uslugi/serwis-niszczarek', icon: '/images/menu-icon-niszczarki.webp' },
      { label: { pl: 'Zasilacze UPS', uk: 'ДБЖ (UPS)', ru: 'ИБП (UPS)' }, href: '/uslugi/naprawa-zasilaczy-ups', icon: '/images/menu-icon-zasilacze-ups.webp' },
      { label: { pl: 'Wynajem', uk: 'Оренда', ru: 'Аренда' }, href: '/uslugi/wynajem-drukarek', icon: '/images/menu-icon-wynajem.webp' },
      { label: { pl: 'Drukarka zastępcza', uk: 'Підмінний принтер', ru: 'Подменный принтер' }, href: '/uslugi/drukarka-zastepcza', icon: '/images/menu-icon-drukarka-zastepcza.webp', menuOnly: true },
    ],
  },
]
