// Обычный (не client) модуль: шаблон страницы услуги берёт эти классы отсюда,
// не подтягивая в браузер всю клиентскую секцию услуг главной.

// Written out as literal strings (not built via template interpolation) so
// Tailwind's static content scanner can actually find them — a class name
// assembled as `zakres-edge-${x}` is invisible to that scanner and the
// whole custom @layer utilities rule gets silently purged from the CSS
// build even though the DOM ends up with the right class name.
export const ORIENT_CLASSES = [
  'zakres-orient-normal',
  'zakres-orient-flipx',
  'zakres-orient-flipy',
  'zakres-orient-rotate180',
]
export const EDGE_CLASSES = [
  'zakres-edge-a',
  'zakres-edge-b',
  'zakres-edge-c',
  'zakres-edge-d',
  'zakres-edge-e',
  'zakres-edge-f',
  'zakres-edge-g',
  'zakres-edge-h',
]
// '' = corner-none (no ::after at all — 4 of the 10 cards use this)
export const CORNER_CLASSES = [
  '',
  'zakres-corner-tl',
  'zakres-corner-tr',
  'zakres-corner-bl',
  'zakres-corner-br',
]
