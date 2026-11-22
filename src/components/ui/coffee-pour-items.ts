import type { CoffeeItem } from "./coffee-pour-menu";

/** Kept apart from the menu so the page can read the list without loading the whole animation module. */
export const DEFAULT_COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    subtitle: "30 ml · bold",
    description: "a short, intense shot with golden crema",
    vessel: "demitasse",
    layers: [{ type: "espresso", amount: 0.72 }],
    crema: true,
  },
  {
    id: "americano",
    name: "Americano",
    subtitle: "240 ml · smooth",
    description: "espresso over hot water",
    vessel: "glass-mug",
    layers: [
      { type: "water", amount: 0.54 },
      { type: "espresso", amount: 0.24 },
    ],
    crema: true,
    blend: 0.9,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    subtitle: "180 ml · velvety",
    description: "espresso with steamed milk and foam",
    vessel: "cup",
    layers: [
      { type: "espresso", amount: 0.3 },
      { type: "milk", amount: 0.44 },
    ],
    foam: 0.14,
    art: "heart",
  },
  {
    id: "latte",
    name: "Latte",
    subtitle: "300 ml · mellow",
    description: "espresso with lots of steamed milk and microfoam",
    vessel: "tall-glass",
    layers: [
      { type: "espresso", amount: 0.25 },
      { type: "milk", amount: 0.51 },
    ],
    foam: 0.11,
    blend: 0.15,
  },
];
