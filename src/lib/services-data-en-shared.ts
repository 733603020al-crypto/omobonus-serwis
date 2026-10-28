import type { PricingSection } from './services-data-types'

export const diagnostaSection = (): PricingSection => ({
  id: 'diagnoza',
  title: 'Diagnosis and quote',
  status: 'Free',
  items: [
    {
      service: 'Online initial diagnosis\n(describe the problem via WhatsApp, our website or by phone)',
    },
    {
      service: 'Initial diagnosis when the device is accepted at our service centre\n(indicative assessment of the fault — does not replace a full diagnosis and repair quote)',
    },
    {
      service: 'Diagnosis and repair quote\n(free if you order the repair or if we can’t find the cause of the fault)',
    },
    {
      service: 'Diagnosis and repair quote\n(if you decide not to go ahead with the repair)',
    },
    {
      service: 'Written technical report\n(in addition to the full diagnosis, with photo documentation)',
    },
    {
      service: 'Urgent service (where possible, we speed up the repair at no extra charge)',
    },
  ],
})

// "Diagnosis and quote" section for serwis-laptopow — its own, extended
// list of items (not the shared diagnostaSection), matches the PL version
// createLaptopPricingSections in services-data.ts.

export const dojazdSection = (): PricingSection => ({
  id: 'dojazd',
  title: 'Pickup and delivery',
  status: '25 zł',
  footer: 'We don’t tell you that pickup or delivery is “free” and then add that cost to the price of the repair',
  items: [
    {
      service: 'Pickup of the device from the customer (up to 2.5 km from our service centre; 5 km in total, both ways)',
    },
    {
      service: 'Delivery of the repaired device to the customer (up to 2.5 km from our service centre; 5 km in total, both ways)',
    },
    {
      service: 'Pickup or delivery beyond 2.5 km from our service centre (round trip; extra charge after the first 5 km)',
    },
    {
      service: 'Urgent service (where possible, we handle your pickup or delivery first)',
    },
  ],
})

// "Pickup and delivery" section for serwis-laptopow — its own list of items
// (2.5 km / 5 km wording + "Urgent service" row), matches the PL version
// createLaptopPricingSections in services-data.ts.

export const faqSectionEn = (): PricingSection => ({
  id: 'faq',
  title: 'Frequently asked questions (FAQ)',
  subcategories: [
    {
      id: 'faq-1',
      title: 'Is it worth repairing, or is it better to buy a new one?',
      items: [],
      answer: 'It depends on the fault and the availability of parts. A free initial diagnosis gives a rough assessment of the problem, and after the full diagnosis we tell you whether the repair makes financial sense. If it doesn’t, we will say so openly.',
    },
    {
      id: 'faq-2',
      title: 'What does the repair process look like?',
      items: [],
      answer: 'First we run a quick diagnosis and prepare a quote, and once you accept it, we start the repair. If needed, we order the necessary parts and let you know how long it will take.',
    },
    {
      id: 'faq-3',
      title: 'How long does a repair take?',
      items: [],
      answer: 'Typically 1–3 working days. If parts need to be ordered or the fault is complex (e.g. the motherboard), it may take longer; we keep you updated on the status.',
    },
    {
      id: 'faq-4',
      title: 'Do you offer pickup from the customer? Can I bring the device in myself?',
      items: [],
      answer: 'Yes, we provide our services in Wrocław and the surrounding area.\n\nPickup of the device from the customer or delivery of the repaired device costs 25 zł net within 2.5 km of our service centre (5 km in total, both ways). For a longer route, we charge 2 zł net for each additional kilometre of the whole round trip beyond the first 5 km. For simple faults we can repair the device on site, and if necessary we will take it to our service centre.\n\nOf course, you can also bring the device to our office in Wrocław yourself. On site we provide a fast, free initial diagnosis in the customer’s presence, a warm welcome and free coffee or tea.',
    },
    {
      id: 'faq-5',
      title: 'Can I send the device by courier?',
      items: [],
      answer: 'Yes. We will send you instructions on how to pack it safely.\n\nAfter the repair, we will send the device back to you.',
    },
    {
      id: 'faq-6',
      title: 'Does the repair affect the manufacturer’s warranty?',
      items: [],
      answer: 'If the repair requires work that would breach the warranty terms, we will tell you before we carry it out.',
    },
    {
      id: 'faq-7',
      title: 'Do you give a warranty on repairs?',
      items: [],
      answer: 'Yes. **3–12 months**, depending on the type of repair and the parts replaced.',
    },
    {
      id: 'faq-8',
      title: 'Do you repair computers / printers of all brands?',
      items: [],
      answer: 'Yes. We repair HP, Dell, Lenovo, ASUS, Acer, MSI and others.',
    },
    {
      id: 'faq-9',
      title: 'Do you offer a replacement printer during the repair?',
      items: [],
      answer: 'Yes. If needed, we provide a replacement printer — so your work doesn’t stop.',
    },
    {
      id: 'faq-10',
      title: 'Will I lose my data?',
      items: [],
      answer: 'No. During system and mechanical repairs we protect your data. For risky operations (e.g. replacing a drive, reinstalling after a failure), we offer a backup or data recovery before the work starts.',
    },
    {
      id: 'faq-11',
      title: 'Can you recover data after a failure?',
      items: [],
      answer: 'Yes — from simple cases (logical damage) to more complex ones (a damaged storage device). We always tell you the chances and costs before starting work.',
    },
    {
      id: 'faq-12',
      title: 'Do you repair devices after liquid damage?',
      items: [],
      answer: 'Yes. We clean the board in an ultrasonic cleaner, remove corrosion and replace damaged components. Time and cost depend on the extent of the damage — the sooner the device reaches our service centre, the better the chance of success.',
    },
    {
      id: 'faq-13',
      title: 'Are these prices gross or net?',
      items: [],
      answer: 'All prices shown are net.',
    },
  ],
  items: [],
})

// -------------------------------------------------------
// Laptop service
// -------------------------------------------------------
