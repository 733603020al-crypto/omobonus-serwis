import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

// serwis-drukarek-dtg — EN version, synchronised with PL (services-data-dtg.ts).
export const DTG_PRICE_TOOLTIP_EN =
  'Net prices for labour, excluding parts and ink. With full maintenance, standard cleaning fluids and small service materials are included in the price. Turnaround time does not include waiting for parts.'

export const dtgKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the DTG printer\n• cleaning fibres and dried ink from around the heads, plus standard head cleaning cycles;\n• cleaning the caps, wipers and service station;\n• checking the ink system, hoses, dampers and filters for blockages and leaks;\n• checking white ink circulation / mixing;\n• checking and emptying the waste ink system;\n• cleaning the encoder;\n• cleaning and checking the guide rails and carriage mechanism;\n• cleaning and checking the table / platen;\n• checking the air filters / ventilation;\n• nozzle check, head alignment and test print.',
    },
  ],
  notes: [
    'Included in the price: standard cleaning fluids and small service materials.',
    'Spare parts — extra, if they need to be replaced.',
  ],
}

export const dtgNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  items: [],
  subcategories: [
    {
      id: 'naprawy-glowica',
      title: 'Print head and print quality',
      items: [
        { service: 'Print head unclogging\n(missing nozzles or gaps in the print that do not clear after standard cleaning)' },
        { service: 'Print head reconditioning\n(unclogging does not restore correct printing or some nozzles still do not fire)' },
        { service: 'Print head replacement\n(the head is damaged and correct printing cannot be restored)' },
        { service: 'Head calibration / alignment\n(shifted colours, double outlines or incorrect print position)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Ink system and white ink',
      items: [
        { service: 'Ink system flushing / unclogging\n(ink does not flow properly, there is air in the system or it is blocked)' },
        { service: 'Replacement of dampers, filters and hoses\n(unstable ink flow, air bubbles or ink feed problems)' },
        { service: 'Ink pump repair / replacement\n(the pump does not deliver ink or does not maintain the correct flow)' },
        { service: 'White ink circulation system repair\n(white ink does not circulate, settles or is fed unevenly)' },
        { service: 'Ink supply module repair / replacement\n(the printer does not draw ink or reports an ink supply error)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Service station and waste ink',
      items: [
        { service: 'Cap and wiper repair / replacement\n(the head is not properly sealed or cleaned)' },
        { service: 'Service station pump repair / replacement\n(head cleaning does not work or ink is not properly sucked out)' },
        { service: 'Service station replacement (maintenance unit)\n(the station does not clean or park the head properly)' },
        { service: 'Waste ink drain system repair\n(waste ink is not drained or there is a leak)' },
        { service: 'Waste ink absorber replacement (absorber, flushing box)\n(the part has reached its wear limit or the printer reports that it needs replacing)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Carriage and head drive',
      items: [
        { service: 'Carriage mechanism repair\n(the carriage jams, moves unevenly or stops during operation)' },
        { service: 'Carriage motor replacement\n(the carriage does not move or the printer reports a drive error)' },
        { service: 'Drive belt replacement\n(the carriage slips, skips or loses its correct position)' },
        { service: 'Encoder replacement / repair\n(the printer misreads the head position or reports an encoder error)' },
        { service: 'Carriage position sensor replacement\n(the printer does not correctly detect the carriage position)' },
      ],
    },
    {
      id: 'naprawy-stol',
      title: 'Table (platen) and its drive',
      items: [
        { service: 'Platen feed mechanism repair\n(the table does not move, stops or moves unevenly)' },
        { service: 'Table motor repair / replacement\n(the platen does not move or a drive error appears)' },
        { service: 'Lift mechanism repair\n(the table height cannot be set correctly)' },
        { service: 'Height / obstacle sensor repair\n(the printer misdetects the material or stops printing because of an obstacle)' },
        { service: 'Platen height / position calibration\n(the print is misplaced or the head is too close to the material)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Electronics, power supply and sensors',
      items: [
        { service: 'Main / control board repair\n(the printer does not start, freezes or reports electronics errors)' },
        { service: 'Main / control board replacement\n(the board is damaged and cannot be repaired)' },
        { service: 'Power supply repair / replacement\n(the printer does not switch on, switches off or has an unstable power supply)' },
        { service: 'Repair of cables, ribbon cables and connectors\n(signals drop out or connection errors occur between components)' },
        { service: 'Replacement of other sensors\n(the printer misdetects the position, level or condition of components)' },
        { service: 'Control panel / display repair / replacement\n(the panel does not respond, the screen does not work or shows information incorrectly)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software, firmware and RIP',
      items: [
        { service: 'Firmware update / recovery\n(errors after an update, start-up problems or the system not working properly)' },
        { service: 'Driver / RIP installation and configuration\n(the printer is not visible in the software or jobs are not sent correctly)' },
        { service: 'USB / LAN communication repair\n(the computer does not detect the printer or the connection is unstable)' },
      ],
    },
  ],
}

export const dtgFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'Which DTG printers do you repair?', items: [], answer: 'We service compact, professional and industrial DTG printers from Epson, Brother, Kornit Digital, Ricoh, Polyprint, aeoon Technologies, M&R, ROQ, OmniPrint, ColDesi, DTG Digital / Pigment.inc, AnaJet, Roland DG, Mimaki, Azonprinter, Resolute DTG, Lawson Screen & Digital and Durst. The scope and cost of a repair depend on the model, the design of the device and the type of fault.' },
    { id: 'faq-2', title: 'Do you repair older models, and is it worth it?', items: [], answer: 'Yes, if parts are available or the existing component can be repaired. Whether it is worth it depends on the value of the device, the extent of the damage and the availability of parts — after the diagnosis we tell you openly whether the repair makes sense.' },
    { id: 'faq-3', title: 'How much does a DTG printer diagnosis cost?', items: [], answer: 'The initial diagnosis online and when the printer is accepted at our service centre is free. The full diagnosis is free if you go ahead with the repair. If you decline the repair, it costs 150 / 250 / 450 zł net — depending on the printer class.' },
    { id: 'faq-4', title: 'What does the repair price depend on, and will I know it in advance?', items: [], answer: 'The price depends on the printer class (compact, professional, industrial), the type of fault and the parts needed. After the diagnosis we give you the scope and cost of the repair — work that requires approval only starts once you agree.' },
    { id: 'faq-5', title: 'Are parts included in the repair price?', items: [], answer: 'No, if the service is marked “+ parts”. In that case the price list covers labour only. All prices in the price list are net prices.' },
    { id: 'faq-6', title: 'What should I do if my DTG printer is missing some nozzles?', items: [], answer: 'First run a standard head cleaning from the printer panel and do a nozzle check. If the gaps do not clear, we check the head, the service station and the ink system — the cause may be dried ink or a problem with the caps, the pump or the ink flow.' },
    { id: 'faq-7', title: 'Can a dried-out head be saved — unclogging, reconditioning or replacement?', items: [], answer: 'We first try to unclog the head. If that does not restore correct printing, we recondition it, provided the head design and condition allow it. If the head cannot be recovered, we replace it and carry out the required settings and calibration as part of the replacement price. The success of unclogging and reconditioning depends on how badly the ink has dried, which is why the warranty on these services is 7 days.' },
    { id: 'faq-8', title: 'Why does white ink stop printing properly?', items: [], answer: 'White pigment settles easily. The problem may lie in the circulation, hoses, filters, dampers, pump or the head itself. We repair the white ink circulation system — checking the pump, hoses, filters, supply modules and the parts responsible for mixing.' },
    { id: 'faq-9', title: 'Do you repair the ink system and the service station?', items: [], answer: 'Yes. We flush a blocked ink system, replace dampers, filters and hoses, and in the service station we repair or replace the caps, wipers, pump and — if the printer has one — the complete station module (maintenance unit).' },
    { id: 'faq-10', title: 'The printer reports a full ink absorber — what should I do?', items: [], answer: 'Do not ignore this message — an overflowing absorber can cause waste ink to leak inside the printer. We replace the absorber (absorber, flushing box) and check the waste ink drain system.' },
    { id: 'faq-11', title: 'Ink is dripping or stains appear on the print — what should I do?', items: [], answer: 'The cause may be a dirty area around the head, worn wipers or caps, a leaking damper or hose, or too little distance between the head and the material. After the diagnosis we carry out maintenance or replace the damaged parts.' },
    { id: 'faq-12', title: 'Why does the printer leave stripes or shift colours?', items: [], answer: 'The cause may be blocked nozzles, an incorrect platen height, head calibration, the encoder or the carriage mechanism.' },
    { id: 'faq-13', title: 'Do you repair the carriage and the table (platen), and do you carry out calibration?', items: [], answer: 'Yes. We repair the carriage drive, belt, motor, encoder and sensors, as well as the table feed and lift mechanism, drive and sensors. We carry out head or platen calibration as a separate service or — if it is needed after our repair — as part of the repair price.' },
    { id: 'faq-14', title: 'My DTG printer will not switch on — can it be repaired?', items: [], answer: 'In many cases, yes. The cause is often the power supply, the control board, cables or connectors. After the diagnosis we repair or replace the damaged component.' },
    { id: 'faq-15', title: 'Do you help with firmware, drivers and RIP?', items: [], answer: 'Yes. We update and restore firmware, install drivers, repair USB/LAN communication and configure the RIP to work with the DTG printer we service.' },
    { id: 'faq-16', title: 'How often should a DTG printer be maintained?', items: [], answer: 'Daily and weekly tasks — nozzle check, cleaning the caps and wipers — are done by the operator according to the manufacturer’s instructions. Full maintenance at a service centre is worth doing regularly, more often with intensive production. Neglecting maintenance, especially in the white ink system, can lead to blocked hoses, a blocked service station or a blocked head.' },
    { id: 'faq-17', title: 'Do you offer cleaning and maintenance only, without repair?', items: [], answer: 'Yes. Full maintenance is available as a separate service and includes standard head cleaning cycles. If the nozzles remain blocked, head unclogging is a separate service from the price list.' },
    { id: 'faq-18', title: 'Can a DTG printer be switched off for a few days?', items: [], answer: 'It depends on the model. Many devices run automatic maintenance routines and should be left in the state required by the manufacturer. A longer downtime may require preparing the ink system.' },
    { id: 'faq-19', title: 'How long does a DTG printer repair take?', items: [], answer: 'Typical repairs take about 1–5 days. Turnaround time does not include waiting for parts.' },
    { id: 'faq-20', title: 'Can I send my DTG printer by courier?', items: [], answer: 'Yes. We accept devices sent from all over Poland. The printer should be secured in line with the transport requirements of the specific model. In Wrocław we can also collect the printer and deliver it back after the repair — according to the pickup and delivery price list.' },
    { id: 'faq-21', title: 'Do you check print quality after the repair?', items: [], answer: 'Yes. If the nature of the repair requires it, we check how the device works and do a test print. Calibration and configuration needed after our repair or replacement are included in its price.' },
    { id: 'faq-22', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a 3-month warranty on the service work carried out, and 7 days on head unclogging and reconditioning. Parts are covered by the manufacturer’s or supplier’s warranty.' },
  ],
})

export const dtgPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  dojazdSection(),
  dtgKonserwacjaEn,
  dtgNaprawyEn,
  dtgFaqEn(),
]
