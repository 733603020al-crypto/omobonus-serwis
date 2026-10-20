// Service categories shared by the header "Usługi" menu and the home page
// "Serwis i naprawa" catalogue, so both always list the same services.
// Labels are nominative (menu); the home cards keep their own genitive labels.

import type { ComponentType } from 'react'
import { ProjectorFilled } from '@/components/icons/projector-filled'

/** An svg pictogram drawn in currentColor (the menu gold). */
export type MenuIconComponent = ComponentType<{ size?: number; className?: string }>

export type ServiceLocale = 'pl' | 'uk' | 'ru'

export type ServiceCategoryItem = {
  label: Record<ServiceLocale, string>
  href: string
  /** Gold menu webp, or an svg pictogram drawn in the menu gold. */
  icon: string | MenuIconComponent
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
  /** A second titled block stacked below `items` in the same menu column. */
  subgroup?: {
    title: Record<ServiceLocale, string>
    items: ServiceCategoryItem[]
  }
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: { pl: 'Komputerów i IT', uk: 'Комп\'ютерів та ІТ', ru: 'Компьютеров и IT' },
    icon: '/images/menu-icon-laptopy.webp',
    items: [
      { label: { pl: 'Laptopów', uk: 'Ноутбуки', ru: 'Ноутбуки' }, href: '/uslugi/serwis-laptopow', icon: '/images/menu-icon-laptopy.webp' },
      { label: { pl: 'Komputerów stacjonarnych', uk: 'Стаціонарні комп\'ютери', ru: 'Стационарные компьютеры' }, href: '/uslugi/serwis-komputerow-stacjonarnych', icon: '/images/menu-icon-komputery-stacjonarne.webp' },
      { label: { pl: 'Outsourcing IT', uk: 'ІТ-аутсорсинг', ru: 'IT-аутсорсинг' }, href: '/uslugi/outsourcing-it', icon: '/images/menu-icon-outsourcing-it.webp' },
    ],
  },
  {
    title: { pl: 'Drukarek (kserokopiarek) biurowych', uk: 'Офісних принтерів (копірів)', ru: 'Офисных принтеров (копиров)' },
    titleMobile: { pl: 'Drukarek biurowych', uk: 'Офісних принтерів', ru: 'Офисных принтеров' },
    href: '/uslugi/naprawa-drukarek',
    icon: '/images/menu-icon-drukarki-laserowe.webp',
    items: [
      { label: { pl: 'Drukarek laserowych', uk: 'Лазерні принтери', ru: 'Лазерные принтеры' }, href: '/uslugi/serwis-drukarek-laserowych', icon: '/images/menu-icon-drukarki-laserowe.webp' },
      { label: { pl: 'Drukarek atramentowych', uk: 'Струменеві принтери', ru: 'Струйные принтеры' }, href: '/uslugi/serwis-drukarek-atramentowych', icon: '/images/menu-icon-drukarki-atramentowe.webp' },
      { label: { pl: 'Drukarek igłowych', uk: 'Матричні принтери', ru: 'Матричные принтеры' }, href: '/uslugi/serwis-drukarek-iglowych', icon: '/images/menu-icon-drukarki-iglowe.webp' },
      { label: { pl: 'Drukarek etykiet termicznych', uk: 'Термопринтери етикеток', ru: 'Термопринтеры этикеток' }, href: '/uslugi/serwis-drukarek-termicznych', icon: '/images/menu-icon-drukarki-etykiet-termicznych.webp' },
    ],
  },
  {
    title: { pl: 'Drukarek specjalistycznych', uk: 'Спеціалізованих принтерів', ru: 'Специализированных принтеров' },
    icon: '/images/menu-icon-drukarki-dtg.webp',
    items: [
      { label: { pl: 'Drukarek 3D', uk: '3D-принтери', ru: '3D-принтеры' }, href: '/uslugi/serwis-drukarek-3d', icon: '/images/menu-icon-drukarki-3d.webp' },
      { label: { pl: 'Drukarek sublimacyjnych', uk: 'Сублімаційні принтери', ru: 'Сублимационные принтеры' }, href: '/uslugi/serwis-drukarek-sublimacyjnych', icon: '/images/menu-icon-drukarki-sublimacyjne.webp' },
      { label: { pl: 'Drukarek DTF', uk: 'DTF-принтери', ru: 'DTF-принтеры' }, href: '/uslugi/serwis-drukarek-dtf', icon: '/images/menu-icon-drukarki-dtf.webp' },
      { label: { pl: 'Drukarek DTG', uk: 'DTG-принтери', ru: 'DTG-принтеры' }, href: '/uslugi/serwis-drukarek-dtg', icon: '/images/menu-icon-drukarki-dtg.webp' },
      { label: { pl: 'Drukarek spożywczych', uk: 'Харчові принтери', ru: 'Пищевые принтеры' }, href: '/uslugi/serwis-drukarek-spozywczych', icon: '/images/menu-icon-drukarki-spozywcze.webp', iconTall: true },
      { label: { pl: 'Drukarek do kart plastikowych', uk: 'Принтери пластикових карток', ru: 'Принтеры пластиковых карт' }, href: '/uslugi/serwis-drukarek-do-kart-plastikowych', icon: '/images/menu-icon-drukarki-do-kart-plastikowych.webp' },
    ],
  },
  {
    title: { pl: 'Innych urządzeń', uk: 'Інших пристроїв', ru: 'Других устройств' },
    homeTitle: { pl: 'Innych urządzeń i usług', uk: 'Інших пристроїв та послуг', ru: 'Других устройств и услуг' },
    icon: '/images/menu-icon-plotery.webp',
    items: [
      { label: { pl: 'Ploterów', uk: 'Плотери', ru: 'Плоттеры' }, href: '/uslugi/serwis-plotterow', icon: '/images/menu-icon-plotery.webp' },
      { label: { pl: 'Niszczarek', uk: 'Шредери', ru: 'Шредеры' }, href: '/uslugi/serwis-niszczarek', icon: '/images/menu-icon-niszczarki.webp' },
      { label: { pl: 'Zasilaczy UPS', uk: 'ДБЖ (UPS)', ru: 'ИБП (UPS)' }, href: '/uslugi/naprawa-zasilaczy-ups', icon: '/images/menu-icon-zasilacze-ups.webp' },
      { label: { pl: 'Projektorów', uk: 'Проєктори', ru: 'Проекторы' }, href: '/uslugi/naprawa-projektorow', icon: ProjectorFilled },
      { label: { pl: 'Ekspresów do kawy', uk: 'Кавомашини', ru: 'Кофемашины' }, href: '/uslugi/serwis-ekspresow-do-kawy', icon: '/images/menu-icon-serwis-ekspresow-do-kawy.webp' },
    ],
    subgroup: {
      title: { pl: 'Dodatkowe usługi', uk: 'Додаткові послуги', ru: 'Дополнительные услуги' },
      items: [
        { label: { pl: 'Druk 3D na zamówienie', uk: '3D-друк на замовлення', ru: '3D-печать на заказ' }, href: '/uslugi/druk-3d-na-zamowienie', icon: '/images/menu-icon-druk-3d-na-zamowienie.webp' },
        { label: { pl: 'Wynajem drukarek', uk: 'Оренда принтерів', ru: 'Аренда принтеров' }, href: '/uslugi/wynajem-drukarek', icon: '/images/menu-icon-wynajem.webp' },
        { label: { pl: 'Drukarka zastępcza', uk: 'Підмінний принтер', ru: 'Подменный принтер' }, href: '/uslugi/drukarka-zastepcza', icon: '/images/menu-icon-drukarka-zastepcza.webp', menuOnly: true },
      ],
    },
  },
]

// /uslugi/naprawa-drukarek: the same category tabs and cards as the home
// catalogue, printers only — office and specialist printers as on the home
// page, plus plotters, rental and a replacement printer.
export const PRINTER_HUB_CATEGORIES: ServiceCategory[] = [
  SERVICE_CATEGORIES[1],
  SERVICE_CATEGORIES[2],
  {
    title: { pl: 'Ploterów i usług', uk: 'Плотерів та послуг', ru: 'Плоттеров и услуг' },
    icon: '/images/menu-icon-plotery.webp',
    items: [
      { label: { pl: 'Ploterów', uk: 'Плотери', ru: 'Плоттеры' }, href: '/uslugi/serwis-plotterow', icon: '/images/menu-icon-plotery.webp' },
      { label: { pl: 'Wynajem drukarek', uk: 'Оренда принтерів', ru: 'Аренда принтеров' }, href: '/uslugi/wynajem-drukarek', icon: '/images/menu-icon-wynajem.webp' },
      { label: { pl: 'Drukarka zastępcza', uk: 'Підмінний принтер', ru: 'Подменный принтер' }, href: '/uslugi/drukarka-zastepcza', icon: '/images/menu-icon-drukarka-zastepcza.webp' },
    ],
  },
]
