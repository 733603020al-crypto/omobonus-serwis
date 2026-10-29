import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const thermalKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (without repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the printer\n• thorough cleaning of the printer interior and the entire label / thermal transfer ribbon path,\n• cleaning of the thermal print head, platen roller, sensors, guides and feed parts,\n• inspection of the print head, roller, drive and main mechanical parts; lubrication if specified by the manufacturer,\n• cleaning and inspection of additional modules: cutter, peeler and rewinder – if fitted,\n• calibration of sensors and media, and a check of print settings,\n• final test of print quality, barcode readability and correct label feed.',
    },
  ],
}

export const thermalNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Label transport and drive mechanism',
      items: [
        { service: 'Clearing jams in the label path\n(labels or liner get stuck inside the printer)' },
        { service: 'Cleaning the label guide path\n(jamming, curling or labels feeding skewed)' },
        { service: 'Adjusting the label path and guides\n(the label moves skewed or the print shifts position)' },
        { service: 'Cleaning and restoring feed rollers\n(slipping, uneven or intermittent label feed)' },
        { service: 'Replacing feed and guide rollers\n(worn rollers, persistent label feed problems)' },
        { service: 'Replacing the drive belt\n(skipping, noise or label transport problems)' },
        { service: 'Replacing the drive motor\n(labels do not advance or the mechanism stops)' },
      ],
    },
    {
      id: 'naprawy-glowica-platen',
      title: 'Print head and platen roller',
      items: [
        { service: 'Cleaning the print head and platen roller\n(faded print, streaks or poorly readable barcodes)' },
        { service: 'Adjusting print head pressure\n(uneven print intensity on the two sides of the label)' },
        { service: 'Replacing the platen roller\n(media slipping, uneven print or a damaged roller surface)' },
        { service: 'Replacing the print head\n(persistent gaps, white lines or a damaged print head)' },
        { service: 'Print quality calibration\n(incorrect print temperature, speed or darkness)' },
      ],
    },
    {
      id: 'naprawy-czujniki-kalibracja',
      title: 'Sensors and media calibration',
      items: [
        { service: 'Cleaning label and ribbon sensors\n(“label out”, “paper out” errors or ribbon not detected)' },
        { service: 'Calibrating gap / black mark sensors\n(printing on empty space, skipped labels or incorrect positioning)' },
        { service: 'Calibrating label length and feed-out\n(too much or too little label feed-out after printing)' },
        { service: 'Repairing the sensor system\n(detection errors persist despite cleaning and calibration)' },
        { service: 'Replacing the label / ribbon / head sensor\n(media, ribbon or head closure not detected correctly)' },
      ],
    },
    {
      id: 'naprawy-tasma-ribbon',
      title: 'Ribbon and thermal transfer mechanism',
      items: [
        { service: 'Correcting ribbon routing\n(ribbon wrinkling, shifting or breaking)' },
        { service: 'Cleaning the ribbon path\n(streaks, smudges or uneven ribbon movement)' },
        { service: 'Adjusting ribbon tension and winding\n(the ribbon slips, stops or winds unevenly)' },
        { service: 'Replacing ribbon guide parts\n(damaged rollers, spindles or ribbon holders)' },
        { service: 'Ribbon selection and print setting calibration\n(poor print durability, print head overheating or inadequate quality)' },
      ],
    },
    {
      id: 'naprawy-moduly-dodatkowe',
      title: 'Cutter, peeler and rewinder',
      items: [
        { service: 'Cleaning and adjusting the peeler (peel-off)\n(the label does not peel off the liner correctly)' },
        { service: 'Repairing the peeler (peel-off)\n(the peeling mechanism does not work or causes jams)' },
        { service: 'Replacing the peeler module\n(worn or cracked peeler module — repair not cost-effective)' },
        { service: 'Cleaning and adjusting the cutter\n(incomplete cuts, jamming or labels being torn)' },
        { service: 'Replacing the cutter blade\n(ragged edges or incorrect cutting)' },
        { service: 'Repairing the cutter module\n(the cutter does not start or jams during operation)' },
        { service: 'Replacing the cutter module\n(damaged motor or blade mechanism — repair not cost-effective)' },
        { service: 'Cleaning and adjusting the rewinder\n(the roll winds loosely, skewed or stops)' },
        { service: 'Repairing the rewinder mechanism\n(the rewinder does not work or does not hold the correct tension)' },
        { service: 'Replacing the rewinder mechanism\n(damaged rewinder motor or clutch — repair not cost-effective)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Electronics, power supply and communication',
      items: [
        { service: 'Repairing the power supply\n(the printer does not turn on or switches off during operation)' },
        { service: 'Replacing the power supply\n(damaged power module)' },
        { service: 'Repairing the mainboard\n(restarts, freezes or electronics errors)' },
        { service: 'Replacing the mainboard\n(damaged printer control electronics)' },
        { service: 'Repairing wiring and connectors\n(power or signal loss, or unstable operation)' },
        { service: 'Repairing the control panel\n(buttons, screen or panel do not respond properly)' },
        { service: 'Replacing the control panel\n(damaged display or panel module)' },
        { service: 'Repairing communication modules\n(no communication via USB, Ethernet, Wi-Fi or RS232)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software and configuration',
      items: [
        { service: 'Installing and configuring drivers\n(printing is not possible or communication with the computer is incorrect)' },
        { service: 'Configuring label format and settings\n(shifted print, wrong size or cut-off label elements)' },
        { service: 'Firmware update / configuration\n(software errors or problems after an update)' },
        { service: 'Printer network configuration\n(no printing over the network or from multiple workstations)' },
        { service: 'Configuring label design software\n(problems with the template, barcodes, fonts or data)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// Dot matrix printers
// -------------------------------------------------------

export const thermalFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the label printer repair process look like?', items: [], answer: 'First we carry out an initial diagnosis, then a full diagnosis, and give you the exact cost and turnaround time. We start the repair only after the customer\'s approval.' },
    { id: 'faq-2', title: 'How much does a diagnosis cost?', items: [], answer: '**The initial diagnosis online and when you bring the device in is free.**\n\nIf we carry out the repair, the full diagnosis is also free.\n\nIf you decide not to go ahead with the repair, the full diagnosis costs 100 / 150 / 200 zł net, depending on the device category.' },
    { id: 'faq-3', title: 'How long does a repair take?', items: [], answer: 'Most standard repairs are completed within 1–3 working days. More complex electronics or waiting for parts may extend the turnaround time.' },
    { id: 'faq-4', title: 'Which brands do you service?', items: [], answer: 'We service, among others, Zebra, TSC, SATO, Honeywell, Citizen, Brother, Godex, Datalogic and other label printers.' },
    { id: 'faq-5', title: 'Is it worth repairing an older label printer?', items: [], answer: 'It depends on the type of fault, the condition of the device, the availability of parts and the value of the printer. After the diagnosis we tell you whether the repair makes economic sense.' },
    { id: 'faq-6', title: 'The printer shows “Media Out” although labels are loaded — why?', items: [], answer: 'The cause may be a dirty or incorrectly set sensor, the wrong media type or missing gap / black mark calibration.' },
    { id: 'faq-7', title: 'Why does the printer skip labels or print on every other one?', items: [], answer: 'Most often the problem comes from sensor calibration, the media type setting or an incorrect label length.' },
    { id: 'faq-8', title: 'What does the “Ribbon Out” error mean when the ribbon is loaded?', items: [], answer: 'A possible cause is incorrect ribbon routing, a dirty sensor, the wrong ribbon width or Direct Thermal mode being set instead of Thermal Transfer.' },
    { id: 'faq-9', title: 'Why does the ribbon wrinkle or break?', items: [], answer: 'The reason may be incorrect tension, ribbon routing, print head pressure or a worn winding mechanism.' },
    { id: 'faq-10', title: 'How do I choose the right ribbon?', items: [], answer: '**The type of ribbon is matched to the label material and the required print durability.**\n\nWax, wax/resin and resin ribbons are among those used.\n\nWe can select the ribbon and the right print settings for you.' },
    { id: 'faq-11', title: 'Why is the print faded?', items: [], answer: 'The cause may be a dirty or worn print head, a temperature that is too low, a speed that is too high, the wrong ribbon or a pressure problem.' },
    { id: 'faq-12', title: 'What causes white vertical lines on the print?', items: [], answer: 'Persistent white lines may point to dirt or damaged heating dots on the print head. We first clean and inspect the print head.' },
    { id: 'faq-13', title: 'When does the print head need to be replaced?', items: [], answer: 'If persistent print gaps or damaged heating lines remain after proper cleaning, the print head may need to be replaced.' },
    { id: 'faq-14', title: 'When does the platen roller need to be replaced?', items: [], answer: 'When the roller is worn, cracked or deformed, labels may slip, feed unevenly or print quality may deteriorate.' },
    { id: 'faq-15', title: 'The printer shows “Head Open” although the head is closed — why?', items: [], answer: 'A possible cause is the head closure sensor, its adjustment, the wiring or the head assembly not closing fully.' },
    { id: 'faq-16', title: 'Why does the cutter not cut labels?', items: [], answer: 'The cause may be adhesive and dirt, a blunt or damaged blade, a jammed mechanism or a faulty cutter module.' },
    { id: 'faq-17', title: 'Why does the peel-off module not peel labels?', items: [], answer: 'The problem may be caused by dirt, sensor adjustment or liner routing, a worn mechanism or incorrect peel-off mode settings.' },
    { id: 'faq-18', title: 'The printer does not connect via USB, Ethernet, Wi-Fi or RS232 — what do you check?', items: [], answer: 'We check the driver, port and network configuration, cables, connectors and communication modules.' },
    { id: 'faq-19', title: 'Could the problem be caused by settings or materials rather than a fault?', items: [], answer: 'Yes. The wrong media type, ribbon, temperature, speed, direct thermal / thermal transfer mode or incorrect configuration can cause symptoms similar to a fault.' },
    { id: 'faq-20', title: 'Does the printer need recalibrating after changing labels?', items: [], answer: 'Often yes, especially after changing the size, media type, gap, black mark or the way the material is routed.' },
    { id: 'faq-21', title: 'Are parts included in the price?', items: [], answer: 'If a service is marked “+ parts”, the price covers labour, and parts are charged separately. We tell you the cost of parts before starting the repair.' },
    { id: 'faq-22', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a warranty of 3 to 12 months on completed repairs, depending on the type of work and the parts used.' },
    { id: 'faq-23', title: 'Can I bring the printer in myself?', items: [], answer: 'Yes. If you can transport it safely, you can bring the device directly to our service centre. You can also order a pickup according to the current price list.' },
    { id: 'faq-24', title: 'How much does label printer pickup or delivery cost?', items: [], answer: 'Pickup or delivery within 2.5 km of our service centre costs 25 zł net. For longer routes we add 2 zł net for each kilometre above 5 km of the total round trip.' },
    { id: 'faq-25', title: 'How often should I clean the print head and maintain my label printer?', items: [], answer: 'It is worth cleaning the print head every time you change the ribbon or label roll, and more often with heavy use. We recommend full maintenance every 6–12 months, or sooner if faded areas, white lines or label feed problems appear.' },
  ],
})
