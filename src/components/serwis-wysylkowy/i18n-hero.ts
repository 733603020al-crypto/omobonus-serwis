// Hero of the "Serwis wysyłkowy" page in UK/RU/EN: the translated home hero with the carousel of this page
// (same 16 devices as the Polish carousel, in the same order). Polish is the source.
import type { HeroT } from '@/components/serwis-wysylkowy/sections/hero'
import type { HeroMid } from '@/components/serwis-wysylkowy/sections/home-hero-showcase'
import { uk } from '@/lib/i18n/uk'
import { ru } from '@/lib/i18n/ru'
import { en } from '@/lib/i18n/en'

const mids = (list: [HeroMid['group'], [string, string]][]): readonly HeroMid[] => list.map(([group, parts]) => ({ group, parts }))

export const HERO_UK: HeroT = {
  ...uk.hero,
  carouselLine1: 'Сервіс з відправкою',
  carouselLine3: 'Заберемо техніку з усієї Польщі',
  carouselAlt: 'Сервіс ноутбуків, комп\'ютерів і принтерів з відправкою поштою',
  carouselMids: mids([
    ['laptop', ['ноутбуків', '']],
    ['pc', ['стаціонарних', 'комп\'ютерів']],
    ['printer', ['лазерних', 'принтерів']],
    ['printer', ['струменевих', 'принтерів']],
    ['printer', ['матричних', 'принтерів']],
    ['printer', ['принтерів', 'етикеток']],
    ['printer', ['3D-принтерів', '']],
    ['printer', ['сублімаційних', 'принтерів']],
    ['printer', ['DTF-принтерів', '']],
    ['printer', ['DTG-принтерів', '']],
    ['printer', ['харчових', 'принтерів']],
    ['printer', ['принтерів', 'для пластикових карток']],
    ['shredder', ['знищувачів', 'документів']],
    ['ups', ['джерел безперебійного', 'живлення UPS']],
    ['projector', ['проєкторів', '']],
    ['coffee', ['кавомашин', '']],
  ]),
}

export const HERO_RU: HeroT = {
  ...ru.hero,
  carouselLine1: 'Сервис с отправкой',
  carouselLine3: 'Заберём технику со всей Польши',
  carouselAlt: 'Сервис ноутбуков, компьютеров и принтеров с отправкой по почте',
  carouselMids: mids([
    ['laptop', ['ноутбуков', '']],
    ['pc', ['стационарных', 'компьютеров']],
    ['printer', ['лазерных', 'принтеров']],
    ['printer', ['струйных', 'принтеров']],
    ['printer', ['матричных', 'принтеров']],
    ['printer', ['принтеров', 'этикеток']],
    ['printer', ['3D-принтеров', '']],
    ['printer', ['сублимационных', 'принтеров']],
    ['printer', ['DTF-принтеров', '']],
    ['printer', ['DTG-принтеров', '']],
    ['printer', ['пищевых', 'принтеров']],
    ['printer', ['принтеров', 'для пластиковых карт']],
    ['shredder', ['уничтожителей', 'документов']],
    ['ups', ['источников бесперебойного', 'питания UPS']],
    ['projector', ['проекторов', '']],
    ['coffee', ['кофемашин', '']],
  ]),
}

export const HERO_EN: HeroT = {
  ...en.hero,
  carouselLine1: 'Mail-in service for',
  carouselLine3: 'We collect equipment from all over Poland',
  carouselAlt: 'Mail-in service for laptops, computers and printers',
  carouselMids: mids([
    ['laptop', ['laptops', '']],
    ['pc', ['desktop', 'computers']],
    ['printer', ['laser', 'printers']],
    ['printer', ['inkjet', 'printers']],
    ['printer', ['dot matrix', 'printers']],
    ['printer', ['label', 'printers']],
    ['printer', ['3D printers', '']],
    ['printer', ['sublimation', 'printers']],
    ['printer', ['DTF printers', '']],
    ['printer', ['DTG printers', '']],
    ['printer', ['edible', 'printers']],
    ['printer', ['plastic card', 'printers']],
    ['shredder', ['paper shredders', '']],
    ['ups', ['UPS', 'power supplies']],
    ['projector', ['projectors', '']],
    ['coffee', ['coffee machines', '']],
  ]),
}
