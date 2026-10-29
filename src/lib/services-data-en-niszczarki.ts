import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

export const NISZCZARKI_DEVICE_CLASSES_EN = ['Small', 'Office', 'Professional'] as const

export const NISZCZARKI_PRICE_TOOLTIP_EN = `Shredder classes: ${NISZCZARKI_DEVICE_CLASSES_EN.join(' / ')}`

export const niszczarkiKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repairs)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and maintenance of the shredder\n• thorough cleaning of the inside of the device to remove paper dust and leftover shreds;\n• cleaning of the cutting mechanism, the feed slot and the sensors;\n• lubrication of the cutting mechanism with suitable oil;\n• inspection of the blades / cutting shafts and the drive unit;\n• inspection of the gears, motor and main mechanical parts;\n• check of the reverse, start/stop and safety features, where present;\n• final test of operation and document shredding.',
    },
  ],
}

export const niszczarkiNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Cutting mechanism and jams',
      items: [
        { service: 'Removal of jams and foreign objects\n(paper stuck in the mechanism, the shredder jams or does not accept documents)' },
        { service: 'Cutting mechanism repair\n(blades do not turn, the device cuts unevenly or stops during operation)' },
        { service: 'Blade / cutting shaft replacement\n(worn or damaged cutting parts do not shred paper properly)' },
      ],
    },
    {
      id: 'naprawy-naped',
      title: 'Drive and mechanical parts',
      items: [
        { service: 'Gearbox and gear repair\n(cracking noises, the mechanism skips or the drive is not transferred to the blades)' },
        { service: 'Drive mechanism repair\n(the shredder runs loudly, sticks or the mechanism does not turn properly)' },
        { service: 'Motor repair / replacement\n(the motor does not start, stops during operation or runs unevenly)' },
        { service: 'Automatic feeder (AutoFeed) repair\n(paper is not fed automatically, the feeder sticks or takes documents incorrectly)' },
      ],
    },
    {
      id: 'naprawy-czujniki',
      title: 'Sensors and controls',
      items: [
        { service: 'Paper sensor / photocell repair\n(the shredder does not react to paper, starts by itself or does not stop when finished)' },
        { service: 'Mechanism operation sensor repair\n(the device stops although there is no jam, or detects the mechanism’s operation incorrectly)' },
        { service: 'Start/stop / reverse function repair\n(automatic start, stop or paper reverse does not work properly)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Electronics and power',
      items: [
        { service: 'Power system repair\n(the shredder does not switch on, switches off during operation or works unreliably)' },
        { service: 'Electronics / control board repair\n(the device does not respond properly, performs random actions or does not start functions)' },
        { service: 'Control panel / button repair\n(buttons, the switch or the control panel do not respond or work incorrectly)' },
      ],
    },
  ],
  items: [],
}

export const niszczarkiFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'How does the shredder repair process work?', items: [], answer: 'First we carry out a diagnosis and determine the cost of the repair. Once you approve it, we carry out the repair, test the device and let you know that it is ready for collection or delivery.' },
    { id: 'faq-2', title: 'How much does a shredder diagnosis cost?', items: [], answer: 'The diagnosis and quote are free if we carry out the repair. If you decide not to go ahead with the repair, the diagnosis costs 50 zł net.' },
    { id: 'faq-3', title: 'How long does a shredder repair take?', items: [], answer: 'It depends on the type of fault and the availability of parts. Most services in the price list take 1 to 5 days.' },
    { id: 'faq-4', title: 'What does the repair price depend on?', items: [], answer: '**On the shredder class (small, office, professional), the type of fault and the parts needed.**\n\nThe price list gives three prices — one for each class.\n\nIf an item is marked “+ parts”, parts are charged separately.' },
    { id: 'faq-5', title: 'Will I know the cost before the repair?', items: [], answer: 'Yes. After the diagnosis we give you the cost of the repair, and we carry out the repair only after you approve it. If you decide not to go ahead, you pay only for the diagnosis — 50 zł net.' },
    { id: 'faq-6', title: 'Are the prices net or gross?', items: [], answer: 'All prices in the price list are net prices (excluding VAT).' },
    { id: 'faq-7', title: 'Is it worth repairing an old shredder?', items: [], answer: 'It depends on the fault, the device class and the availability of parts. After the diagnosis we will tell you whether the repair is worthwhile — and if it is not, we will say so openly.' },
    { id: 'faq-8', title: 'Which shredders do you repair?', items: [], answer: 'We repair small, office and professional shredders of various designs and sizes.' },
    { id: 'faq-9', title: 'Which shredder brands do you service?', items: [], answer: 'We service Fellowes, HSM, Kobra, Rexel, IDEAL, Dahle, OPUS, Leitz, Wallner, Argo, EBA, HP, Tracer, Tarnator, Genie, Olympia, Intimus, Aurora, Peach and Lanberg, as well as other brands.' },
    { id: 'faq-10', title: 'Do you repair large and professional shredders?', items: [], answer: 'Yes. We also accept large and professional devices. We do not limit ourselves to small office shredders only.' },
    { id: 'faq-11', title: 'Do you repair shredders at the customer’s premises?', items: [], answer: 'We repair typical shredders at our service centre, because a proper diagnosis may require taking the device apart, testing it and ordering the right parts.\n\nYou can bring the device in yourself, send it by courier or order pickup and delivery according to the price list.\n\nFor large or heavy professional shredders, an on-site visit to the customer is possible by prior arrangement.' },
    { id: 'faq-12', title: 'Can I order pickup and delivery of a shredder?', items: [], answer: 'Yes. Pickup within 2.5 km of the service centre costs 25 zł net, and delivery of the device within 2.5 km also costs 25 zł net.\n\nAbove 2.5 km the rate is 25 zł + 2 zł/km.' },
    { id: 'faq-13', title: 'Can I send a shredder by courier?', items: [], answer: 'Yes. You can send the shredder by courier from anywhere in Poland — we will send you instructions on how to pack it safely, and after the repair we will send the device back.\n\nYou can also bring it in person to our service centre in Wrocław.' },
    { id: 'faq-14', title: 'What should I do if paper gets stuck in the shredder?', items: [], answer: 'If the device has a reverse function, you can carefully try to back the paper out according to the manufacturer’s instructions. If the jam does not clear, do not pull the paper out by force or take the device apart — you could damage the blades, the gearbox or the motor.' },
    { id: 'faq-15', title: 'Why does the shredder not take in paper?', items: [], answer: 'The cause may be a blocked cutting mechanism, a dirty or damaged photocell, worn cutting shafts, damaged gears or the drive.' },
    { id: 'faq-16', title: 'Why does the shredder run, but the blades do not turn?', items: [], answer: 'There may be a fault in the gearbox, the gears, the drive, the motor or the cutting mechanism itself. The exact cause can be determined after a diagnosis.' },
    { id: 'faq-17', title: 'Why is the shredder very loud or rattling?', items: [], answer: 'Unusual noise may be caused by a lack of lubrication, a foreign object in the mechanism, worn gears, the gearbox or parts of the cutting mechanism.' },
    { id: 'faq-18', title: 'Why does the shredder not switch off after shredding the paper?', items: [], answer: 'A common cause is a dirty or damaged photocell or a problem with the start/stop system.' },
    { id: 'faq-19', title: 'Why does the shredder not respond when paper is inserted?', items: [], answer: 'This may be caused by a dirty or damaged paper sensor, the photocell, the control system or the device’s power supply.' },
    { id: 'faq-20', title: 'Why does the shredder pull the paper in and immediately push it back?', items: [], answer: 'One possible cause is a problem with the rotation sensor or with the operation of the cutting mechanism. This symptom requires the device to be checked.' },
    { id: 'faq-21', title: 'Why does the reverse not work?', items: [], answer: 'The cause may be damage to the switch, the control panel, the electronics or the circuit responsible for changing the motor’s direction.' },
    { id: 'faq-22', title: 'Why does the shredder overheat and stop?', items: [], answer: 'During intensive use the thermal protection may kick in. If the device overheats quickly even with normal use, the cause may be an overloaded mechanism, lack of maintenance or a fault in the drive or motor.' },
    { id: 'faq-23', title: 'Should I oil the shredder, and with what?', items: [], answer: 'Many Cross-Cut and Micro-Cut shredders need regular lubrication of the cutting mechanism — how often and how depends on the model and the manufacturer’s recommendations.\n\nUse oil designed for shredders.\n\nDo not use WD-40 or flammable aerosol lubricants.' },
    { id: 'faq-24', title: 'How often should a shredder be maintained?', items: [], answer: '**It depends on how intensively it is used and on the manufacturer’s recommendations.**\n\nMaintenance is worth doing when the shredder runs louder, shreds more slowly, jams more often or has been used intensively.\n\nRegular maintenance reduces wear on the blades and the drive.' },
    { id: 'faq-25', title: 'Are parts included in the repair price?', items: [], answer: 'If an item in the price list is marked “+ parts”, the price shown covers labour. The parts needed are charged separately.' },
    { id: 'faq-26', title: 'How do I prepare a shredder for service?', items: [], answer: 'Unplug the device, empty the shred bin and prepare a short description of the fault. Hand over the complete device — do not take the cutting mechanism apart yourself before bringing it in for service.' },
  ],
})

export const niszczarkiPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  dojazdSection(),
  niszczarkiKonserwacjaEn,
  niszczarkiNaprawyEn,
  niszczarkiFaqEn(),
]
