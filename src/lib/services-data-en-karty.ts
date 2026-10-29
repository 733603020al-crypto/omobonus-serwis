import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

// serwis-drukarek-do-kart-plastikowych — EN version, synchronised with PL (services-data-karty.ts).
export const KARTY_PRICE_TOOLTIP_EN =
  'Net prices listed separately for card printers: basic / business / retransfer (labour, excluding consumables)'

export const kartyKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repairs)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the card printer\n• thorough cleaning of the printer interior and the entire card transport path;\n• cleaning of the print head and feed rollers;\n• cleaning / replacement of the cleaning roller and the cleaning cartridge / cassette, if the model has them;\n• cleaning and inspection of the card feeder, output hopper and flipper module (dual-sided printing), if present;\n• inspection of the colour ribbon guide mechanism and sensors;\n• inspection of the lamination / retransfer module and encoders (magnetic stripe, chip, RFID), if present;\n• calibration of sensors and print parameters;\n• final test of print quality and correct card feeding.',
    },
  ],
}

export const kartyNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  items: [],
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Card feeding and transport',
      items: [
        { service: 'Removal of a jammed card / foreign object\n(a card is stuck in the printer, the device reports Card Jam or the card does not come out)' },
        { service: 'Card pick-up mechanism repair\n(the printer does not pick up cards, picks them up irregularly or tries to take several at once)' },
        { service: 'Feed / transport roller replacement\n(cards slip, stop inside or the printer has trouble moving them)' },
        { service: 'Card feeder / output hopper repair\n(cards do not leave the feeder or do not reach the output hopper properly)' },
        { service: 'Card transport path adjustment\n(cards often jam, move crookedly or stop in the same place)' },
        { service: 'Card thickness / separator adjustment\n(the printer takes two cards at once or does not take cards of a different thickness)' },
        { service: 'Card sensor repair / replacement\n(the printer does not detect the card, reports it missing or stops it in the wrong place)' },
        { service: 'Card sensor calibration\n(the card is in the printer, but the device does not see it or misjudges its position)' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Print head and print quality',
      items: [
        { service: 'Print head / print quality calibration\n(colours or the image are shifted, the print is uneven or does not cover the card properly)' },
        { service: 'Diagnosis and removal of the cause of print defects\n(streaks, stripes, discolouration, white lines or incomplete printing appear on cards)' },
        { service: 'Print head replacement\n(permanent white lines appear on every card or parts of the image are not printed)' },
        { service: 'Print head pressure / position adjustment\n(the print is weaker on one side, uneven or shifted relative to the card)' },
        { service: 'Platen roller replacement\n(the print is faded or uneven along the whole length of the card, and the roller is worn or damaged)' },
        { service: 'Print head lift mechanism repair\n(the printer reports a head-up error, and the head does not lower or lift)' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Colour ribbon: guiding, drive and sensors',
      items: [
        { service: 'Diagnosis and repair of colour ribbon problems\n(the printer reports Invalid ribbon or a ribbon chip error, does not recognise the ribbon, or the ribbon jams or breaks)' },
        { service: 'Ribbon guide mechanism repair\n(the ribbon moves unevenly, wrinkles, breaks or winds incorrectly)' },
        { service: 'Ribbon sensor repair / replacement\n(the printer does not detect a new ribbon or wrongly reports it missing / finished)' },
        { service: 'Ribbon sensor calibration\n(the printer does not recognise the colour panels or stops printing even though the ribbon is correct)' },
        { service: 'Ribbon drive mechanism repair\n(the ribbon does not wind on, stops during printing, or the drive can be heard running without the ribbon moving)' },
      ],
    },
    {
      id: 'naprawy-mechanika-czujniki',
      title: 'Drive and mechanics',
      items: [
        { service: 'Drive mechanism repair\n(the printer runs loudly, the mechanism does not start or stops during printing)' },
        { service: 'Gearbox / gear repair\n(cracking or skipping can be heard, and the card or ribbon does not move properly)' },
        { service: 'Repair of mechanical housing parts / guides\n(the cover, guides or mounting parts are damaged and prevent the printer from working properly)' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Dual-sided printing, retransfer and lamination',
      items: [
        { service: 'Card flipper module repair\n(dual-sided printing does not work, the card jams while turning or a Flip Jam error appears)' },
        { service: 'Retransfer module repair\n(the retransfer film jams, wrinkles or the image is not transferred to the card properly)' },
        { service: 'Lamination module repair\n(the laminate is not applied, shifts, wrinkles or the card gets stuck in the laminator)' },
        { service: 'Retransfer module adjustment / calibration\n(the image is shifted, the film does not cover the whole card or unevenness appears)' },
        { service: 'Laminator adjustment / calibration\n(the laminate is shifted, unevenly applied or does not cover the card properly)' },
        { service: 'Retransfer or laminator heater / heated roller repair\n(the film or laminate does not stick, a temperature error appears or the device takes a long time to heat up)' },
      ],
    },
    {
      id: 'naprawy-kodowanie',
      title: 'Card encoding',
      items: [
        { service: 'Magnetic stripe encoder repair\n(the printer prints the card but does not write data to the magnetic stripe or reports an encoding error)' },
        { service: 'Chip encoder repair\n(the card is printed, but the chip is not written or read)' },
        { service: 'RFID / contactless encoder repair\n(the printer does not write data to a contactless card or does not detect the RFID module)' },
        { service: 'Encoder configuration / calibration\n(encoding works irregularly, data is written incorrectly or the card does not reach the encoding position properly)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Electronics, power and communication',
      items: [
        { service: 'Power supply replacement / repair\n(the printer does not switch on, switches off during operation or responds unreliably to power)' },
        { service: 'Mainboard repair\n(the printer does not start properly, freezes or reports unusual hardware errors)' },
        { service: 'USB port repair\n(the computer does not see the printer via USB despite a working cable and driver)' },
        { service: 'Ethernet / Wi-Fi network module repair\n(the printer loses its network connection, does not get an IP address or is not available to computers)' },
        { service: 'Control panel / display repair\n(the display does not work, the buttons do not respond or the panel shows incorrect information)' },
        { service: 'Fan replacement / overheating fix\n(the printer stops working, reports a temperature error or runs loudly)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software and configuration',
      items: [
        { service: 'Driver installation / configuration\n(the computer does not detect the printer, printing does not start or the driver does not work properly)' },
        { service: 'Firmware update\n(the printer freezes, reports errors or needs a device software update)' },
        { service: 'LAN / Wi-Fi network configuration\n(the printer is not visible on the network or you cannot print from other computers)' },
        { service: 'Print parameter configuration\n(colours, orientation, image position or other print settings are incorrect)' },
        { service: 'Printer configuration with the customer’s system / software\n(the printer works on its own but does not work properly with the program or system in use)' },
      ],
    },
  ],
}

export const kartyFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'Which plastic card printer brands do you service?', items: [], answer: 'We service Evolis, Zebra, HID Fargo, Magicard, Entrust Datacard, Matica, IDP Smart, HiTi, DASCOM, Swiftcolor, XID, EDIsecure, DNP, Nisca, Javelin, Pointman, Seaory, Polaroid, Kanematsu, CIM, Valid and Ultra Electronics, among others.\n\nIf your brand is not on the list, contact us — we will check whether it can be repaired.' },
    { id: 'faq-2', title: 'Do you repair printers bought from another company?', items: [], answer: 'Yes. We service devices regardless of where they were bought.' },
    { id: 'faq-3', title: 'What faults do you repair?', items: [], answer: 'We repair, among other things: card feeding and transport (feed and transport rollers, feeders, output hoppers, guides), print heads and print quality (diagnosis, replacement, calibration), the colour ribbon mechanism and sensors, card sensors, dual-sided printing, retransfer and lamination modules, magnetic stripe, chip card and RFID encoders, electronics (mainboards, power supplies, ports, network modules, panels and displays), as well as firmware, drivers and LAN / Wi-Fi network configuration, if the model supports it.' },
    { id: 'faq-4', title: 'Do you carry out a diagnosis before the repair?', items: [], answer: 'Yes. First we diagnose the device, determine the scope of work and prepare a quote.' },
    { id: 'faq-5', title: 'Is the diagnosis free?', items: [], answer: 'If we carry out the repair, the diagnosis is free. If you decide not to go ahead with the repair, a fee according to the price list applies.' },
    { id: 'faq-6', title: 'Will I get a quote before the repair starts?', items: [], answer: 'Yes. Before starting the repair, we present the scope of work and the cost for your approval.' },
    { id: 'faq-7', title: 'What if I do not accept the quote?', items: [], answer: 'We do not carry out a repair without your approval. If you decide not to go ahead after the diagnosis, only the diagnosis fee according to the price list applies, and we return the printer without carrying out the repair.' },
    { id: 'faq-8', title: 'What does the repair price depend on?', items: [], answer: '**On the printer category (basic, business, retransfer), the type of fault and whether parts need to be replaced.**\n\nThe price list shows the cost of labour; the price of parts — if needed — is added separately and always agreed with you before the repair.\n\nThe most expensive part is usually the print head.' },
    { id: 'faq-9', title: 'How long does a card printer repair take?', items: [], answer: 'Minor work usually takes 1–3 days, standard repairs 3–5 days, and complex repairs 5–7 days plus the time waiting for parts. We give you the exact time after the diagnosis.' },
    { id: 'faq-10', title: 'Can I order an urgent repair?', items: [], answer: 'Yes. We offer faster turnaround at no extra charge, if the type of fault and the availability of the necessary parts allow it.' },
    { id: 'faq-11', title: 'Can I send the printer by courier?', items: [], answer: 'Yes. You can send the device by courier from anywhere in Poland or bring the printer to the service centre yourself. On-site visits to customers in Wrocław are charged according to the call-out price list.' },
    { id: 'faq-12', title: 'How do I prepare the printer for shipping?', items: [], answer: 'Remove the cards and consumables, disconnect the cables and protect the device carefully. If you have the original packaging, it is best to use it for transport.' },
    { id: 'faq-13', title: 'The printer jams cards or does not pick them up — what should I do?', items: [], answer: 'Check that the cards are not stuck together, bent or dirty and that they are placed correctly in the feeder. If the problem keeps happening, the cause is often worn or dirty rollers, a damaged pick-up mechanism or a card sensor — we remove jams and foreign objects, replace rollers and adjust the card transport path.' },
    { id: 'faq-14', title: 'Lines or stripes appear on the cards — what does that mean?', items: [], answer: 'White lines or stripes most often mean a dirty or damaged print head, less often a problem with the colour ribbon or the rollers. It is worth cleaning the printer first according to the manufacturer’s instructions; if the lines do not disappear, we diagnose the print head and, if necessary, clean, calibrate or replace it.' },
    { id: 'faq-15', title: 'The printer reports a ribbon error — what should I do?', items: [], answer: 'A ribbon error can be caused by an incorrectly fitted, incompatible or used-up ribbon, but also by a damaged sensor, ribbon chip or ribbon drive mechanism. Check that the ribbon is intended for your model and fitted correctly; if the error does not go away, we service the sensors and the ribbon guide and drive mechanism.' },
    { id: 'faq-16', title: 'What if the fault comes back?', items: [], answer: 'Contact us and describe the symptoms — we will check whether the problem is related to the repair carried out or has another cause. Recurring jams or lines on the print are often caused by dirty rollers, a worn print head or poor-quality cards; during the diagnosis we will point out what is causing them.' },
    { id: 'faq-17', title: 'What is the warranty on a repair?', items: [], answer: 'We give a 3-month warranty on the service carried out. Installed parts are covered by the manufacturer’s or supplier’s warranty.' },
    { id: 'faq-18', title: 'Do you clean and maintain printers?', items: [], answer: 'Yes. We clean the print head, rollers, card transport path, sensors and mechanisms, and carry out the necessary inspection and calibration of the device.\n\nYou can also bring in a working printer just for a periodic check-up, without reporting a specific fault.' },
    { id: 'faq-19', title: 'How often should the printer be cleaned and serviced?', items: [], answer: 'Manufacturers usually recommend replacing the cleaning roller (if the model has one) with every new ribbon, and cleaning the interior and the print head regularly according to the model’s instructions or at the first signs of declining print quality. With intensive use, it is worth ordering full maintenance and a check-up periodically.' },
    { id: 'faq-20', title: 'Do you service older card printers and do you have parts for them?', items: [], answer: 'Yes, if suitable parts are available and the repair is technically possible — we confirm this after the diagnosis. Parts availability depends on the manufacturer and the specific model; if we do not have them in stock, we check whether they can be ordered.' },
    { id: 'faq-21', title: 'Do you use original spare parts?', items: [], answer: 'The choice of parts depends on the model, availability and the type of repair. Before starting, we inform you of the scope of work and the costs.' },
    { id: 'faq-22', title: 'Is repairing a card printer always worthwhile?', items: [], answer: 'Not always. If the repair cost is high compared with the value of the device, we tell you after the diagnosis, before any work starts.' },
    { id: 'faq-23', title: 'Do you service PVC card, ID badge and employee card printers?', items: [], answer: 'Yes. Our service covers printers used for PVC cards, ID badges, student and other ID cards, employee cards, access cards and other plastic cards.' },
  ],
})

export const kartyPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  dojazdSection(),
  kartyKonserwacjaEn,
  kartyNaprawyEn,
  kartyFaqEn(),
]
