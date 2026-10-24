import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const needleKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (without repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and adjustment of the printer\n• thorough cleaning of the printer interior and the print mechanism,\n• cleaning and maintenance of the paper path, platens, rollers, belts and guides,\n• cleaning and maintenance of the carriage rail and the print head movement mechanism,\n• inspection of the print head, drive, ribbon mechanism and main mechanical parts; lubrication as recommended by the manufacturer,\n• adjustment of the paper feed mechanism and ribbon movement,\n• final test of print quality and correct paper feed.',
    },
  ],
}

// Only /uslugi/serwis-drukarek-iglowych — dedicated structure of repair groups
export const needleNaprawyIglowe: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Paper transport and tractor mechanism',
      items: [
        { service: 'Clearing jams in the paper path\n(paper gets stuck, stops or does not pass through the printer correctly)' },
        { service: 'Cleaning and adjusting the paper path\n(skewed feeding, uneven movement or paper pickup problems)' },
        { service: 'Adjusting the paper tractor mechanism\n(continuous paper moves skewed, skips or comes off the perforation)' },
        { service: 'Repairing the paper tractor mechanism\n(the tractor does not move paper or works unevenly)' },
        { service: 'Replacing paper tractor parts\n(worn sprockets, holders or continuous paper guide parts)' },
        { service: 'Repairing the single-sheet feed mechanism\n(the printer does not pick up sheets or picks them up unevenly)' },
        { service: 'Cleaning and adjusting the paper guide roller (platen)\n(paper slips, moves unevenly or is guided unstably)' },
        { service: 'Replacing the paper guide roller (platen)\n(a worn or damaged roller causes slipping, uneven movement or print problems)' },
      ],
    },
    {
      id: 'naprawy-glowica-matrycowa',
      title: 'Dot matrix print head and impact mechanism',
      items: [
        { service: 'Cleaning and adjusting the dot matrix print head\n(faded or uneven print, sticking pin mechanism)' },
        { service: 'Repairing the dot matrix print head\n(non-working pins, parts of characters missing or broken lines)' },
        { service: 'Replacing the dot matrix print head\n(permanently damaged or worn print head)' },
        { service: 'Adjusting the head gap\n(weak print, problems with multi-part forms or uneven pressure)' },
        { service: 'Adjusting the impact mechanism\n(uneven character intensity or incorrect pin operation)' },
      ],
    },
    {
      id: 'naprawy-naped-kartridza',
      title: 'Carriage, guides and drive',
      items: [
        { service: 'Cleaning and lubricating the carriage rail\n(noisy operation, resistance or uneven print head movement)' },
        { service: 'Adjusting the carriage drive belt tension\n(vibration, skipping or uneven movement while printing)' },
        { service: 'Replacing the carriage drive belt\n(worn or damaged belt, incorrect print head movement)' },
        { service: 'Repairing the carriage drive mechanism\n(the carriage stops, skips or moves incorrectly)' },
        { service: 'Replacing the carriage drive motor\n(no print head movement or drive errors)' },
        { service: 'Replacing carriage guide parts\n(worn parts cause play, noise or uneven print head movement)' },
      ],
    },
    {
      id: 'naprawy-tasma',
      title: 'Ribbon and ribbon mechanism',
      items: [
        { service: 'Cleaning the ribbon path\n(the ribbon moves unevenly, sticks or leaves smudges)' },
        { service: 'Adjusting the ribbon advance mechanism\n(the ribbon does not advance correctly or winds unevenly)' },
        { service: 'Repairing the ribbon drive mechanism\n(the ribbon stops, sticks or does not advance while printing)' },
        { service: 'Replacing ribbon mechanism parts\n(worn gears, holders or ribbon drive parts)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Electronics, power supply and control panel',
      items: [
        { service: 'Repairing the power supply\n(the printer does not start, switches off or works unstably)' },
        { service: 'Replacing the power supply\n(damaged power module)' },
        { service: 'Repairing the mainboard / control electronics\n(restarts, freezes or printer control errors)' },
        { service: 'Replacing the mainboard / control module\n(permanently damaged printer electronics)' },
        { service: 'Repairing wiring and signal ribbon cables\n(signal loss, random errors or interrupted operation)' },
        { service: 'Repairing the control panel\n(buttons or display do not work properly)' },
        { service: 'Replacing the control panel / display\n(damaged panel, screen or control module)' },
        { service: 'Repairing ports and communication interfaces\n(no communication via USB, LPT, RS232 or Ethernet)' },
      ],
    },
    {
      id: 'naprawy-software',
      title: 'Drivers and configuration',
      items: [
        { service: 'Installing and configuring drivers\n(the computer does not see the printer or printing works incorrectly)' },
        { service: 'Configuring the port and communication\n(problems with USB, LPT, RS232, Ethernet or a print server)' },
        { service: 'Configuring continuous paper and form formats\n(incorrect page length, shifted print or incorrect transition between forms)' },
        { service: 'Setting the print start position / Top of Form\n(printing starts too high or too low, or shifts between pages)' },
        { service: 'Configuring the Tear-Off / paper feed-out function\n(paper stops in the wrong position after printing)' },
        { service: 'Restoring settings and reconfiguring the printer\n(incorrect operation after changes to settings or device configuration)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// 3D printers
// -------------------------------------------------------

export const needleFaq = (): PricingSection => {
  const faq = faqSectionEn()
  // Shared FAQ without the questions about data and liquid damage; own answers on cost-effectiveness, delivery and brands
  const overrides: Record<string, { title?: string; answer: string }> = {
    'faq-1': { answer: 'Usually yes. Dot matrix printers are very durable, and parts and ribbons are inexpensive. Repair is especially worthwhile when the printer prints on continuous paper or multi-part forms, or works with an older LPT / RS232 system for which it is hard to find a new device. After the diagnosis we tell you straight whether the repair makes sense.' },
    'faq-4': { title: 'Can I bring the printer in myself or order a pickup?', answer: 'Yes. You can bring the printer to our service centre in Wrocław or order a pickup: within 2.5 km of our service centre 25 zł net, beyond that +2 zł net for each kilometre above 5 km of the total route.' },
    'faq-8': { title: 'Which dot matrix printer brands do you service?', answer: 'We service, among others, Epson LX, FX, LQ and DFX, OKI Microline, Tally Dascom, Citizen, Star and Panasonic. Before accepting a device, we confirm that the specific model can be repaired.' },
  }
  const subs = (faq.subcategories ?? [])
    .filter(sub => !['faq-9', 'faq-10', 'faq-11', 'faq-12'].includes(sub.id))
    .map(sub => overrides[sub.id] ? { ...sub, ...overrides[sub.id] } : sub)
  const afterIdx = subs.findIndex(sub => sub.id === 'faq-3') + 1
  return {
    ...faq,
    subcategories: [
      ...subs.slice(0, afterIdx),
      { id: 'faq-14', title: 'The computer cannot see the printer — what should I check?', items: [], answer: 'The cause may be the driver, cable, port configuration or the printer interface. With older models we especially often check the LPT and RS232 connections and communication settings.' },
      { id: 'faq-15', title: 'The printer turns on but does not start printing — what could be the cause?', items: [], answer: 'The cause may be a problem with the paper mechanism, a sensor, the carriage, the electronics or the port configuration. We identify the fault during the diagnosis.' },
      { id: 'faq-16', title: 'Why is the print faded or are parts of characters missing?', items: [], answer: 'The most common cause is a worn ribbon, a head gap that is too wide, a dirty print head or non-working pins.' },
      { id: 'faq-17', title: 'Why is one horizontal line missing in every row?', items: [], answer: 'This is a typical symptom of a non-working pin: broken, stuck or with a damaged control circuit.' },
      { id: 'faq-18', title: 'Why does continuous paper move skewed or come off the perforation?', items: [], answer: 'The most common cause is incorrect tractor settings, worn tractor parts, a dirty paper path or paper incorrectly positioned behind the printer.' },
      { id: 'faq-19', title: 'Why are copies on multi-part forms illegible?', items: [], answer: 'With carbon-copy forms, the head gap and impact force must be matched to the number of layers. The problem may also be caused by a worn ribbon or impact mechanism.' },
      { id: 'faq-20', title: 'Why does printing start too high or shift between pages?', items: [], answer: 'This is most often down to the Top of Form, page length or Tear-Off settings.' },
      { id: 'faq-21', title: 'How often should the ribbon be replaced?', items: [], answer: 'When the print fades noticeably or the ribbon is frayed. A worn ribbon can catch on the pins and damage the print head.' },
      { id: 'faq-22', title: 'Will the printer work with old software or a DOS / ERP / LPT / RS232 system?', items: [], answer: 'Usually yes. We configure LPT, RS232, USB and Ethernet ports, emulation modes and print servers.' },
      { id: 'faq-23', title: 'Why is the printer noisy or the carriage sticking?', items: [], answer: 'The cause may be a dirty or dry rail, a worn belt, the motor or a foreign object in the mechanism.' },
      { id: 'faq-24', title: 'Are parts included in the price?', items: [], answer: 'No. If a service is marked “+ parts”, the price covers labour, and parts are charged separately.' },
      { id: 'faq-25', title: 'How often should a dot matrix printer be maintained?', items: [], answer: 'With daily use we recommend maintenance every 6–12 months.' },
      ...subs.slice(afterIdx),
    ],
  }
}
