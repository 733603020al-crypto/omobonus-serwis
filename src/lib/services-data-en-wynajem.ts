import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'
import { faqSectionEn } from './services-data-en-shared'

const SLUG = 'wynajem-drukarek'
const rent = (path: string) => getDisplayPrice(SLUG, `${path}.rent`, 'en')
const pages = (path: string) => getDisplayPrice(SLUG, `${path}.pages`, 'en')
const overLimit = (path: string) => getDisplayPrice(SLUG, `${path}.overLimitPrice`, 'en')
const label = (path: string) => `${rent(path)}/month`

export const wynajemAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Laser (A4 format)',
  items: [],
  subcategories: [
    {
      id: 'drukarki-mono',
      title: 'A4 printers (mono)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-mono.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-mono.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-mono.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-mono.tier0') },
            { label: 'Duplex', value: 'no' },
            { label: 'Print speed up to:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-mono.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-mono.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-mono.tier1') },
            { label: 'Duplex', value: 'optional' },
            { label: 'Print speed up to:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-mono.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-mono.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-mono.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-mono.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'drukarki-kolor',
      title: 'A4 printers (mono+colour)',
      items: [],
      icon: '/images/wynajem-a4-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.drukarki-kolor.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-kolor.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-kolor.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-kolor.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '20' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-kolor.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-kolor.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-kolor.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '40' },
          ],
        },
        {
          label: label('akordeon-1.drukarki-kolor.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.drukarki-kolor.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.drukarki-kolor.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.drukarki-kolor.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
          ],
        },
      ],
    },
    {
      id: 'mfu-mono',
      title: 'A4 MFPs (mono)',
      items: [],
      icon: '/images/wynajem-a4-mfu-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-mono.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-mono.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-mono.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-mono.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '20' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-mono.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-mono.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-mono.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '40' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-1.mfu-mono.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-mono.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-mono.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-mono.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
      ],
    },
    {
      id: 'mfu-kolor',
      title: 'A4 MFPs (mono+colour)',
      items: [],
      icon: '/images/wynajem-a4-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-1.mfu-kolor.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-kolor.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-kolor.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-kolor.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '20' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-kolor.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-kolor.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-kolor.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '30' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-1.mfu-kolor.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-1.mfu-kolor.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-1.mfu-kolor.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-1.mfu-kolor.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '40' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
      ],
    },
  ],
}

export const wynajemAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Laser (A3/A4 format)',
  footer: 'Each printed A3 page counts as two A4 pages',
  items: [],
  subcategories: [
    {
      id: 'a3-drukarki-mono',
      title: 'A3 printers (mono)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-mono.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-mono.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-mono.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-mono.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-mono.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-drukarki-kolor',
      title: 'A3 printers (mono+colour)',
      items: [],
      icon: '/images/wynajem-a3-drukarki-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '50' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
          ],
        },
        {
          label: label('akordeon-2.a3-drukarki-kolor.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-drukarki-kolor.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '90' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-mono',
      title: 'A3 MFPs (mono)',
      items: [],
      icon: '/images/wynajem-a3-mfu-mono-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-mono.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-mono.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '50' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-mono.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-mono.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-mono.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '90' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
      ],
    },
    {
      id: 'a3-mfu-kolor',
      title: 'A3 MFPs (mono+colour)',
      items: [],
      icon: '/images/wynajem-a3-mfu-kolor-v2.webp',
      priceTiers: [
        {
          label: label('akordeon-2.a3-mfu-kolor.tier0'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-kolor.tier0') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '50' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier1'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-kolor.tier1') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '60' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
        {
          label: label('akordeon-2.a3-mfu-kolor.tier2'),
          rows: [
            { label: 'Rental fee (zł/month)', value: rent('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'A4 pages included in the rental fee', value: pages('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'A4 print price (above the limit)', value: overLimit('akordeon-2.a3-mfu-kolor.tier2') },
            { label: 'Duplex', value: 'yes' },
            { label: 'Print speed up to:', value: '90' },
            { label: 'Scanning', value: 'yes' },
          ],
        },
      ],
    },
  ],
}

// FAQ about rental only (mirrors PL)
export const wynajemFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'How does printer rental work?', items: [], answer: 'You pay a monthly rental fee for the device and use the page package included in the price. Prints above the limit are charged at the rates in the price list.' },
    { id: 'faq-2', title: 'What does the rental price include?', items: [], answer: 'The device, servicing, repairs resulting from normal use, toners, and the standard parts and consumables needed for the device to work properly.' },
    { id: 'faq-3', title: 'Are toners included in the price?', items: [], answer: 'Yes, toners are included in the rental price.' },
    { id: 'faq-4', title: 'Are drums and spare parts included in the price?', items: [], answer: 'Yes. Standard parts and consumables needed during normal use are covered by us.' },
    { id: 'faq-5', title: 'Is paper included in the price?', items: [], answer: 'No. Paper and electricity are provided by the customer.' },
    { id: 'faq-6', title: 'Are the prices net or gross?', items: [], answer: 'All prices on the website are **net** prices.' },
    { id: 'faq-7', title: 'How are prints charged?', items: [], answer: 'The monthly rental fee includes a set number of A4 pages. Once the limit is used up, each additional page is charged at the rate shown in the table.' },
    { id: 'faq-8', title: 'What happens if I exceed the monthly page limit?', items: [], answer: 'The device works as normal, and the additional pages are charged at the price per print above the limit.' },
    { id: 'faq-9', title: 'How are A3 prints counted?', items: [], answer: 'Each printed A3 page counts as **two A4 pages**.' },
    { id: 'faq-10', title: 'Do unused pages carry over to the next month?', items: [], answer: 'The terms for settling an unused limit are agreed when the contract is signed.' },
    { id: 'faq-11', title: 'Are delivery and installation of the device included in the price?', items: [], answer: 'Yes. We deliver the device, install it and carry out the basic configuration.' },
    { id: 'faq-12', title: 'Do you set up network printing and scanning?', items: [], answer: 'Yes. During installation we can carry out the basic configuration of printing and scanning on the customer’s workstations.' },
    { id: 'faq-13', title: 'What is the minimum rental period?', items: [], answer: '**1 month**.' },
    { id: 'faq-14', title: 'Do I have to sign a long-term contract?', items: [], answer: 'No, we do not require a long-term contract.' },
    { id: 'faq-15', title: 'What should I do if the printer breaks down?', items: [], answer: 'Report the problem to the service team. Repairs resulting from normal use are covered by the rental.' },
    { id: 'faq-16', title: 'What is the service response time?', items: [], answer: 'Up to **24 working hours**. This is the response time to your report, not a guaranteed time for completing the repair.' },
    { id: 'faq-17', title: 'Will I get a replacement device if there is a serious fault?', items: [], answer: 'If the repair takes longer, the option of providing a replacement device is agreed individually.' },
    { id: 'faq-18', title: 'Can I change the device to a different model?', items: [], answer: 'If your company’s needs change, the option of changing the device is agreed individually.' },
    { id: 'faq-19', title: 'What happens to the device when the rental ends?', items: [], answer: 'When the rental ends, we collect the device.' },
    { id: 'faq-20', title: 'How do I choose the right printer and page package?', items: [], answer: 'The choice depends mainly on the format (A4 / A3), mono or colour printing, the monthly number of pages, the required speed and whether you need scanning and copying.' },
  ],
})
