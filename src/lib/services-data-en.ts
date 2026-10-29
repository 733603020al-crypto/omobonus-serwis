import manifest from '@/config/manifest'
import { printerHubFaqEn } from './services-data-printer-hub-faq'
import type { ServiceData, PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection } from './services-data-en-shared'
import { laptopDiagnostaSection, laptopDojazdSection, laptopKonserwacja, laptopNaprawy, laptopFaqSection } from './services-data-en-laptop'
import { desktopKonserwacja, desktopNaprawy, desktopFaqSection } from './services-data-en-desktop'
import { outsourcingKonsultacja, outsourcingKonserwacja, outsourcingNaprawy, outsourcingFaq } from './services-data-en-outsourcing'
import { laserFaq, laserKonserwacjaEn, laserNaprawy } from './services-data-en-laser'
import { inkjetFaq, inkjetKonserwacjaEn, inkjetNaprawy } from './services-data-en-inkjet'
import { thermalFaq, thermalKonserwacja, thermalNaprawy } from './services-data-en-thermal'
import { needleFaq, needleKonserwacja, needleNaprawyIglowe } from './services-data-en-needle'
import { printer3dFaq, printer3dKonserwacja, printer3dNaprawy } from './services-data-en-3dprinter'
import { plotterDojazd, plotterFaq, plotterKonserwacja, plotterNaprawy } from './services-data-en-plotter'
import { wynajemAkordeon1, wynajemAkordeon2, wynajemFaq } from './services-data-en-wynajem'
import { zastepczaAkordeon1, zastepczaAkordeon2, zastepczaFaq } from './services-data-en-drukarka-zastepcza'
import { niszczarkiPricingSectionsEn, NISZCZARKI_PRICE_TOOLTIP_EN } from './services-data-en-niszczarki'
import { upsPricingSectionsEn } from './services-data-ups'
import { projektoryPricingSectionsEn } from './services-data-projektory'
import { kartyPricingSectionsEn, KARTY_PRICE_TOOLTIP_EN } from './services-data-en-karty'
import { dtgPricingSectionsEn, DTG_PRICE_TOOLTIP_EN } from './services-data-en-dtg'
import { dtfPricingSectionsEn, DTF_PRICE_TOOLTIP_EN } from './services-data-en-dtf'
import { sublimacjaPricingSectionsEn, SUBLIMACJA_PRICE_TOOLTIP_EN } from './services-data-en-sublimacja'
import { spozywczePricingSectionsEn, SPOZYWCZE_PRICE_TOOLTIP_EN } from './services-data-en-spozywcze'
import { kawaPricingSectionsEn, KAWA_PRICE_TOOLTIP_EN } from './services-data-en-kawa'

export const servicesEn: ServiceData[] = [
  {
    slug: 'serwis-laptopow',
    title: 'Laptop service and repair',
    subtitle: 'A full list of services and prices, with no hidden costs (not “repair from 50 zł” or “price to be agreed”)',
    icon: manifest['01_serwis_laptopow'],
    description: 'Comprehensive repair and maintenance of laptops of all brands.',
    pricingSections: [
      laptopDiagnostaSection(),
      laptopDojazdSection(),
      laptopKonserwacja,
      laptopNaprawy,
      laptopFaqSection(),
    ],
  },
  {
    slug: 'serwis-komputerow-stacjonarnych',
    title: 'Desktop computer service',
    subtitle: 'A full list of services and prices, with no hidden costs',
    icon: manifest['02_serwis_komputerow_stacjonarnych'],
    description: 'Diagnostics, repair and upgrades of desktop computers.',
    pricingSections: [
      laptopDiagnostaSection(),
      laptopDojazdSection(),
      desktopKonserwacja,
      desktopNaprawy,
      desktopFaqSection(),
    ],
  },
  {
    slug: 'outsourcing-it',
    title: 'IT outsourcing',
    subtitle: 'IT support for businesses',
    icon: manifest['03_outsourcing_it'],
    description: 'Full IT support for your business.',
    pricingSections: [
      outsourcingKonsultacja,
      outsourcingKonserwacja,
      outsourcingNaprawy,
      outsourcingFaq(),
    ],
  },
  {
    slug: 'naprawa-drukarek',
    title: 'Printer and copier repair',
    subtitle: 'Printer and copier repair and service',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Printer and copier repair and service.',
    // Hub: category tabs instead of a price list, plus one FAQ card (also feeds FAQPage JSON-LD).
    pricingSections: [printerHubFaqEn()],
  },
  {
    slug: 'serwis-drukarek-laserowych',
    title: 'Laser printer and copier service',
    subtitle: 'Professional repair of laser printers and multifunction printers',
    icon: manifest['04_serwis_drukarek_laserowych'],
    description: 'Professional repair and service of laser printers.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      laserKonserwacjaEn,
      laserNaprawy,
      laserFaq(),
    ],
  },
  {
    slug: 'serwis-drukarek-atramentowych',
    title: 'Inkjet printer service',
    subtitle: 'Specialist inkjet printer repair',
    icon: manifest['05_serwis_drukarek_atramentowych'],
    description: 'Repair, print head unclogging and maintenance of inkjet printers.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      inkjetKonserwacjaEn,
      inkjetNaprawy,
      inkjetFaq(),
    ],
  },
  {
    slug: 'serwis-plotterow',
    title: 'Plotter service and repair',
    subtitle: 'Service of HP, Epson and Canon large-format plotters',
    icon: manifest['08_serwis_ploterow'],
    description: 'Service and repair of large-format plotters.',
    pricingSections: [
      diagnostaSection(),
      plotterDojazd(),
      plotterKonserwacja,
      plotterNaprawy,
      plotterFaq(),
    ],
  },
  {
    slug: 'serwis-drukarek-termicznych',
    title: 'Thermal and label printer service',
    subtitle: 'Repair of label and barcode printers',
    icon: manifest['06_serwis_drukarek_termicznych'],
    description: 'Service of label and barcode printers.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      thermalKonserwacja,
      thermalNaprawy,
      thermalFaq(),
    ],
    priceTooltip: 'Net prices shown separately for desktop / semi-industrial / industrial printers (labour, excluding consumables)',
  },
  {
    slug: 'serwis-drukarek-iglowych',
    title: 'Dot matrix printer service',
    subtitle: 'Repair of specialist dot matrix printers',
    icon: manifest['07_serwis_drukarek_iglowych'],
    description: 'Repair of specialist dot matrix printers.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      needleKonserwacja,
      needleNaprawyIglowe,
      needleFaq(),
    ],
  },
  {
    slug: 'serwis-drukarek-3d',
    title: '3D printer service and repair',
    subtitle: 'A full list of services and prices, with no hidden costs',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: '3D printer service in Wrocław – 3D printer repair, bed calibration, axis adjustment and print quality improvement. Repair of FDM and SLA 3D printers, extruder and hotend cleaning, part replacement and print settings configuration. 3D printer service for businesses and workshops, firmware configuration and preparing the printer for ABS, PETG and nylon materials.',
    pricingSections: [
      diagnostaSection(),
      dojazdSection(),
      printer3dKonserwacja,
      printer3dNaprawy,
      printer3dFaq(),
    ],
  },
  {
    slug: 'druk-3d-na-zamowienie',
    title: '3D printing on demand',
    subtitle: 'A full list of services and prices, with no hidden costs',
    icon: '/images/Serwis_i_Naprawa_Drukarek_3D.webp',
    description: '3D printer service in Wrocław – 3D printer repair, bed calibration, axis adjustment and print quality improvement. Repair of FDM and SLA 3D printers, extruder and hotend cleaning, part replacement and print settings configuration. 3D printer service for businesses and workshops, firmware configuration and preparing the printer for ABS, PETG and nylon materials.',
    pricingSections: [
      {
        id: 'diagnoza',
        title: '3D printing from a ready-made design',
        items: [
          { service: 'Print preparation', },
          { service: 'PLA\nstandard material for prototypes, models and decorative items', },
          { service: 'PETG\nstrong and moisture-resistant, for functional and technical parts', },
          { service: 'ABS / ASA\nstrong materials for technical and temperature-resistant parts', },
          { service: 'TPU\nflexible material for seals, covers and flexible parts', },
          { service: 'Express service\nsame-day completion, if the print time allows', },
          { service: 'Shipping\nby courier or to a parcel locker', },
        ],
        priceFormula: 'Final price = print preparation + material + print time',
        example: 'Example: a PLA print using 100 g of material with 5 hours of printing — 25 zł (print preparation) + 100 g of material × 0.30 zł/gram + 5 hours of printing × 8 zł/h = 95 zł',
      },
      {
        id: 'projektowanie-modeli',
        title: '3D CAD design and modelling',
        mobileTitle: '3D CAD design',
        items: [
          { service: 'Initial project assessment\nchecking feasibility and the scope of work', },
          { service: 'Minor STL file modification\nchanging a dimension or hole, repairing or slightly correcting the model', },
          { service: 'Simple technical model\nbased on dimensions, a sketch or a technical drawing', },
          { service: 'Recreating a simple part\nbased on a sample, photos and exact dimensions', },
          { service: 'Technical design of medium complexity\ne.g. a housing, holder, adapter or a more complex part', },
          { service: 'Additional design work\nonce the time included in the chosen service has been exceeded', },
          { service: 'Additional revision package\nchanges to a finished design after it has been approved', },
        ],
      },
      {
        id: 'faq',
        title: 'Frequently asked questions (FAQ)',
        items: [],
        subcategories: [
          { id: 'faq-13', title: 'On-demand 3D printing services – how is an order carried out?', items: [], answer: 'Once we receive the model, we check whether it can be printed, prepare a quote and start work after you accept it. We make both single parts and short runs.' },
          { id: 'faq-16', title: 'Online 3D printing – how do I order a 3D print online?', items: [], answer: 'Send us the model file, and we will check whether it can be printed and prepare a quote. Once you accept it, we will make the print, which you can collect in person or have shipped.' },
          { id: 'faq-1', title: 'Can I order a 3D print without a ready-made model?', items: [], answer: 'Yes. You can send photos, a sketch or exact dimensions, or bring in an existing part. First, we will assess free of charge whether the project can be done, and then give you the cost of preparing it.' },
          { id: 'faq-2', title: 'What files can I send for 3D printing?', items: [], answer: 'Ideally, send a ready-made model in STL, STEP or 3MF format. If your file is in a different format, send it for an initial assessment — we will check whether we can use it or prepare it accordingly.' },
          { id: 'faq-8', title: 'Can you fix or modify my STL file?', items: [], answer: 'Yes. We can make minor changes, such as correcting dimensions, holes, fits or other simple elements of the model. Larger modifications are quoted as design work.' },
          { id: 'faq-3', title: '3D printing prices – cost and quote for a 3D print', items: [], answer: 'The price of a 3D print depends on the material, how much of it is used and the printer’s running time. We give you the exact price before starting work, in line with the price list on this page.' },
          { id: 'faq-4', title: 'How much does it cost to design a 3D model?', items: [], answer: '**It depends on the scope of the project.**\n\nThe initial project assessment is free, and the prices of simple modifications, technical models and recreating parts are given in the price list.\n\nIf the project requires more work, we charge the additional time at the stated rate.' },
          { id: 'faq-15', title: 'Are the prices net or gross?', items: [], answer: 'Prices in the price list are net prices.' },
          { id: 'faq-6', title: '3D prototyping and printing of 3D models, parts and components – can I order a single piece?', items: [], answer: 'Yes. We make both single pieces and short runs – depending on the customer’s needs and the type of project.' },
          { id: 'faq-12', title: 'Can I order several or several dozen identical parts?', items: [], answer: '**Yes. 3D printing works well for prototypes and short production runs.**\n\nFor larger quantities, we can check the production setup and method in advance to get consistent, repeatable parts.' },
          { id: 'faq-7', title: 'Can you recreate a damaged or unavailable part?', items: [], answer: '**Yes. We can recreate simple parts based on a sample you provide, photos and exact dimensions.**\n\nFor more complex geometry, we may ask you to bring in the original part so that we can reproduce its shape more accurately.' },
          { id: 'faq-17', title: 'Printing 3D figurines and car parts – do you also make 3D-printed seals?', items: [], answer: 'Yes. Depending on the project, we make figurines, car parts and 3D-printed seals from a suitably chosen material.\n\nBefore starting, we check the model and choose the material for the part’s intended use.' },
          { id: 'faq-5', title: 'Which material should I choose: PLA, PETG, ABS/ASA or TPU?', items: [], answer: '**We carry out FDM printing in PLA, PETG, ASA and TPU.**\n\nWe choose the material mainly according to the part’s intended use. PLA works well for models and prototypes, PETG for functional parts, ABS/ASA for technical parts exposed to temperature, and TPU for flexible parts.\n\nIf you are not sure which material to choose, we will advise you before starting.' },
          { id: 'faq-9', title: 'How accurate is a 3D print?', items: [], answer: 'Accuracy depends on the model’s geometry, the material, the print orientation and the required fits. If a particular dimension is especially important — for example a hole, diameter, snap fit or mounting point — please mention it when placing your order.' },
          { id: 'faq-10', title: 'Will the printed part be as strong as the original?', items: [], answer: 'Not always. Strength depends on the material, the design of the part, the direction of the layers and the conditions in which the part will work.\n\nIf we decide that 3D printing is not the right solution for a given use, we will tell you before starting.' },
          { id: 'faq-11', title: 'How long does an order take?', items: [], answer: '**The standard turnaround for prints is usually 1–2 days.**\n\nThe time needed for a design depends on its complexity.\n\nExpress service within 24 hours is also available, if the time needed to make the print allows.' },
          { id: 'faq-14', title: 'Do you ship finished prints?', items: [], answer: 'Yes. We can send your finished order by courier or to a parcel locker. Shipping is charged according to the carrier’s price list.' },
        ],
      },
    ],
  },
  {
    slug: 'serwis-niszczarek',
    title: 'Paper shredder service and repair',
    subtitle: 'Paper shredder service and repair in Wrocław',
    icon: '/images/niszczarki-carousel-v1-01.webp',
    description: 'Paper shredder service and repair.',
    pricingSections: niszczarkiPricingSectionsEn(),
    priceTooltip: NISZCZARKI_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'naprawa-zasilaczy-ups',
    title: 'UPS service and repair – uninterruptible power supplies',
    subtitle: 'Service and repair of UPS uninterruptible power supplies in Wrocław',
    icon: '/images/ups-carousel-v1-01.webp',
    description: 'UPS service and repair – uninterruptible power supplies.',
    pricingSections: upsPricingSectionsEn(),
  },
  {
    slug: 'naprawa-projektorow',
    title: 'Projector repair',
    subtitle: 'Projector repair in Wrocław',
    icon: '/images/projektory-carousel-v1-01.webp',
    description: 'Projector repair.',
    pricingSections: projektoryPricingSectionsEn(),
  },
  {
    slug: 'serwis-drukarek-do-kart-plastikowych',
    title: 'Plastic card printer service and repair',
    subtitle: 'Plastic card printer service and repair in Wrocław',
    icon: '/images/karty-carousel-v1-01.webp',
    description: 'Plastic card printer service and repair.',
    pricingSections: kartyPricingSectionsEn(),
    priceTooltip: KARTY_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'serwis-drukarek-dtg',
    title: 'DTG printer service and repair',
    subtitle: 'DTG printer service and repair in Wrocław',
    icon: '/images/dtg-carousel-v1-01.webp',
    description: 'Service and repair of DTG printers for T-shirt printing.',
    pricingSections: dtgPricingSectionsEn(),
    priceTooltip: DTG_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'serwis-drukarek-dtf',
    title: 'DTF printer service and repair',
    subtitle: 'DTF printer service and repair in Wrocław',
    icon: '/images/dtf-carousel-v3-01.webp',
    description: 'Service and repair of DTF printers for printing transfers on film.',
    pricingSections: dtfPricingSectionsEn(),
    priceTooltip: DTF_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'serwis-drukarek-sublimacyjnych',
    title: 'Sublimation printer service and repair',
    subtitle: 'Sublimation printer service and repair in Wrocław',
    icon: '/images/sublimacja-carousel-v1-01.webp',
    description: 'Service and repair of sublimation printers and plotters.',
    pricingSections: sublimacjaPricingSectionsEn(),
    priceTooltip: SUBLIMACJA_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'serwis-drukarek-spozywczych',
    title: 'Edible (food) printer service and repair',
    subtitle: 'Edible (food) printer service and repair in Wrocław',
    icon: '/images/spozywcze-carousel-v1-01.webp',
    description: 'Service and repair of edible (food) printers for printing on cakes and biscuits.',
    pricingSections: spozywczePricingSectionsEn(),
    priceTooltip: SPOZYWCZE_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'serwis-ekspresow-do-kawy',
    title: 'Coffee machine service and repair',
    subtitle: 'Coffee machine service and repair in Wrocław',
    icon: '/images/kawa-carousel-v1-01.webp',
    description: 'Service and repair of home, office and professional coffee machines.',
    pricingSections: kawaPricingSectionsEn(),
    priceTooltip: KAWA_PRICE_TOOLTIP_EN,
  },
  {
    slug: 'wynajem-drukarek',
    title: 'Printer rental (leasing)',
    subtitle: 'Leasing of printing devices for offices',
    icon: manifest['10_wynajem_drukarek'],
    description: 'Leasing of printing devices for offices and businesses.',
    pricingSections: [
      wynajemAkordeon1,
      wynajemAkordeon2,
      wynajemFaq(),
    ],
  },
  {
    slug: 'drukarka-zastepcza',
    title: 'Replacement printer',
    subtitle: 'A replacement device for the duration of the repair',
    icon: manifest['11_drukarka_zastepcza'],
    description: 'We offer a replacement device for the duration of the repair.',
    pricingSections: [
      zastepczaAkordeon1,
      zastepczaAkordeon2,
      zastepczaFaq(),
    ],
  },
]
