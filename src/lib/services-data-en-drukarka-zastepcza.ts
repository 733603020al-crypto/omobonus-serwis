import type { PricingSection } from './services-data-types'
import { getDisplayPrice } from './services-pricing'
import { faqSectionEn } from './services-data-en-shared'

const SLUG = 'drukarka-zastepcza'
const price = (path: string) => getDisplayPrice(SLUG, `${path}.price`, 'en')

export const zastepczaAkordeon1: PricingSection = {
  id: 'akordeon-1',
  title: 'Laser (A4 format)',
  items: [],
  subcategories: [
    { id: 'drukarki-mono', title: 'A4 printers (mono)', items: [], price: price('akordeon-1.drukarki-mono') },
    { id: 'drukarki-kolor', title: 'A4 printers (mono+colour)', items: [], price: price('akordeon-1.drukarki-kolor') },
    { id: 'mfu-mono', title: 'A4 MFPs (mono)', items: [], price: price('akordeon-1.mfu-mono') },
    { id: 'mfu-kolor', title: 'A4 MFPs (mono+colour)', items: [], price: price('akordeon-1.mfu-kolor') },
  ],
}

export const zastepczaAkordeon2: PricingSection = {
  id: 'akordeon-2',
  title: 'Laser (A3 format)',
  footer: 'Each printed A3 page counts as two A4 pages',
  items: [],
  subcategories: [
    { id: 'a3-drukarki-mono', title: 'A3 printers (mono)', items: [], price: price('akordeon-2.a3-drukarki-mono') },
    { id: 'a3-drukarki-kolor', title: 'A3 printers (mono+colour)', items: [], price: price('akordeon-2.a3-drukarki-kolor') },
    { id: 'a3-mfu-mono', title: 'A3 MFPs (mono)', items: [], price: price('akordeon-2.a3-mfu-mono') },
    { id: 'a3-mfu-kolor', title: 'A3 MFPs (mono+colour)', items: [], price: price('akordeon-2.a3-mfu-kolor') },
  ],
}

// FAQ: only the rules for using a replacement printer during a repair (mirrors PL)
export const zastepczaFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'When can I get a replacement printer?', items: [], answer: 'When the device being repaired needs a longer service and we have a suitable replacement device available.' },
    { id: 'faq-2', title: 'Do I pay a subscription just for being provided with a replacement printer?', items: [], answer: 'No. We do not charge a subscription fee just for providing the device for the duration of the repair.' },
    { id: 'faq-3', title: 'What do I pay for while using a replacement printer?', items: [], answer: 'For the prints you make, according to the current price list.' },
    { id: 'faq-4', title: 'Are the print prices net?', items: [], answer: 'Yes. All prices in the price list are **net** prices.' },
    { id: 'faq-5', title: 'Is toner included in the price?', items: [], answer: 'Yes. Toner and standard consumables are covered by us.' },
    { id: 'faq-6', title: 'Is paper included in the price?', items: [], answer: 'No. Paper is provided by the customer.' },
    { id: 'faq-7', title: 'Can I get a device with the same functions as my printer?', items: [], answer: 'We choose a device that is as close as possible in function to the equipment being repaired, depending on current availability.' },
    { id: 'faq-8', title: 'Are colour and monochrome printers available?', items: [], answer: 'Yes, we offer mono and colour devices, depending on availability.' },
    { id: 'faq-9', title: 'Are A4 and A3 devices available?', items: [], answer: 'Yes, depending on the equipment currently available.' },
    { id: 'faq-10', title: 'Are multifunction devices with scanning available?', items: [], answer: 'Yes, our range also includes multifunction devices with scanning.' },
    { id: 'faq-11', title: 'How are A3 prints counted?', items: [], answer: 'Each printed A3 page counts as **two A4 pages**.' },
    { id: 'faq-12', title: 'How quickly can you provide a replacement device?', items: [], answer: 'In typical cases within **24 working hours**, depending on the availability of a suitable device.' },
    { id: 'faq-13', title: 'Do you deliver the replacement printer to the customer?', items: [], answer: 'Delivery terms are agreed when the service request is made.' },
    { id: 'faq-14', title: 'Do you configure the printer after delivery?', items: [], answer: 'We can carry out the basic configuration of the device and its connection to the workstation / network, depending on the scope of the request.' },
    { id: 'faq-15', title: 'What should I do if the replacement printer breaks down?', items: [], answer: 'Contact the service team. We will arrange a repair or a replacement device, depending on availability.' },
    { id: 'faq-16', title: 'How long can I use the replacement device?', items: [], answer: 'For the agreed period related to the repair of the customer’s device.' },
    { id: 'faq-17', title: 'Do I have to return the replacement printer myself when the repair is finished?', items: [], answer: 'How the device is collected / returned is agreed when the repair is completed.' },
    { id: 'faq-18', title: 'Is a replacement printer always available?', items: [], answer: 'We cannot guarantee that a specific model will be available at any given time. Availability depends on the current pool of replacement devices.' },
  ],
})
