import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

// serwis-drukarek-sublimacyjnych — EN version, synchronised with PL (services-data-sublimacja.ts).
export const SUBLIMACJA_PRICE_TOOLTIP_EN =
  'Net prices for labour, excluding parts and ink. With full maintenance, standard cleaning fluids and small service materials are included in the price. Turnaround time does not include waiting for parts.'

export const sublimacjaKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE full cleaning, inspection and maintenance of the sublimation printer\n• cleaning the service station and caps;\n• cleaning the wipers;\n• cleaning around the head and the underside of the carriage;\n• checking and cleaning the waste ink drain system;\n• checking the ink system;\n• cleaning the rollers and the media path;\n• cleaning the media sensors;\n• checking the guide rails and carriage mechanism;\n• nozzle check and standard cleaning cycle;\n• test print after maintenance.',
    },
  ],
  notes: [
    'Included in the price: standard cleaning fluids and small service materials.',
    'Spare parts — extra, if they need to be replaced.',
  ],
}

export const sublimacjaNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  items: [],
  subcategories: [
    {
      id: 'naprawy-glowica',
      title: 'Print head and print quality',
      items: [
        { service: 'Print head unclogging\n(some nozzles missing, stripes, one or more colours dropping out)' },
        { service: 'Print head reconditioning\n(standard cleaning and unclogging do not restore a correct nozzle check)' },
        { service: 'Print head replacement\n(the head is damaged, does not print or cannot be reconditioned)' },
        { service: 'Calibration and print quality correction\n(stripes, colour shifts or incorrect image overlay despite clear nozzles)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Ink system',
      items: [
        { service: 'Damper replacement\n(uneven ink flow, colour dropouts or air getting in at the head)' },
        { service: 'Ink hose repair\n(ink leaks, air bubbles or interruptions in ink flow)' },
        { service: 'Removing air from the ink system\n(ink does not reach the head properly after downtime or work on the system)' },
        { service: 'Ink system flushing\n(a contaminated or partly blocked system causes ink flow problems)' },
        { service: 'Ink system filter replacement\n(restricted ink flow or contamination in the system)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Service station and ink drain',
      items: [
        { service: 'Service station cap (cap top) replacement\n(the head is not properly sealed during cleaning or downtime)' },
        { service: 'Wiper replacement\n(ink or dirt remains on the head after the cleaning cycle)' },
        { service: 'Ink pump replacement\n(the printer does not draw off ink during the cleaning cycle)' },
        { service: 'Service station repair\n(head cleaning does not work properly or the station does not position itself correctly)' },
        { service: 'Waste ink drain repair\n(ink does not drain properly, there is a leak or overflow)' },
      ],
    },
    {
      id: 'naprawy-podawanie',
      title: 'Media feed and guiding',
      items: [
        { service: 'Media feed mechanism repair\n(paper or media is not picked up, moves unevenly or stops during printing)' },
        { service: 'Feed roller replacement / repair\n(the media slips, skews or is fed unevenly)' },
        { service: 'Media roll guiding repair\n(the roll moves unevenly, the media leaves its path or wrinkles)' },
        { service: 'Cutter mechanism repair\n(the printer does not cut the media or the blade jams)' },
        { service: 'Take-up system repair\n(the print does not wind up, winds unevenly or the system stops)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Carriage, drive and encoders',
      items: [
        { service: 'Carriage drive repair\n(the carriage stops, moves unevenly or the printer reports a motion error)' },
        { service: 'Carriage motor replacement (CR motor)\n(the carriage does not move even though the belt and guiding are fine)' },
        { service: 'Media feed motor replacement (PF motor)\n(the media does not move or the printer reports a feed drive error)' },
        { service: 'Carriage belt replacement\n(the carriage jerks, loses its position or the belt is worn or damaged)' },
        { service: 'Encoder strip cleaning / replacement\n(the carriage loses its position, the print is shifted or positioning errors appear)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Sensors, electronics and power supply',
      items: [
        { service: 'Media sensor replacement\n(the printer does not detect paper or media, or misreads its position)' },
        { service: 'Position sensor repair / replacement\n(the printer does not recognise the mechanism position or reports motion errors)' },
        { service: 'Main board repair\n(the printer does not start properly, freezes or reports electronics errors)' },
        { service: 'Head control electronics repair\n(the head does not receive correct control signals even though the ink system works)' },
        { service: 'Power supply repair\n(the printer does not start, switches off or has unstable voltages)' },
        { service: 'Repair of cables and signal ribbon cables\n(communication with the head, sensors or other components keeps dropping out)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software, firmware and configuration',
      items: [
        { service: 'Firmware update / recovery\n(the printer freezes, reports system errors or does not work properly after an update)' },
        { service: 'Fixing communication problems\n(the computer or RIP does not detect the printer or the connection is unstable)' },
        { service: 'Driver and network connection configuration\n(the printer is visible on the network but printing cannot be started properly)' },
        { service: 'RIP configuration\n(jobs are not sent correctly or the media or profile settings are wrong)' },
      ],
    },
  ],
}

export const sublimacjaFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'How much does a sublimation printer diagnosis cost?', items: [], answer: 'If you decline the repair: 150 / 250 / 400 zł, depending on the device category.' },
    { id: 'faq-2', title: 'Do I pay for the diagnosis if I decide to go ahead with the repair?', items: [], answer: 'No — the fee only applies if you decline the repair.' },
    { id: 'faq-3', title: 'How long does the diagnosis take?', items: [], answer: 'Usually 1–3 working days.' },
    { id: 'faq-4', title: 'What does the repair price depend on?', items: [], answer: 'On the device class, the type of fault, the scope of work and the price of the parts needed.' },
    { id: 'faq-5', title: 'Will I know the cost before the repair?', items: [], answer: 'Yes. After the diagnosis we give you the scope of work and the cost of the repair. We only start the repair after you approve it.' },
    { id: 'faq-6', title: 'How long does the repair take?', items: [], answer: 'We complete most repairs from the price list in 1–2 working days. More complex work, such as head reconditioning or electronics repair, takes up to 2–4 working days. Turnaround time does not include waiting for parts.' },
    { id: 'faq-7', title: 'Do you repair Epson, Mimaki, Mutoh, Roland DG, Sawgrass, HP and Brother?', items: [], answer: 'Yes — these brands are covered by our service.' },
    { id: 'faq-8', title: 'Do you repair older sublimation printer models?', items: [], answer: 'Yes, if the necessary parts are available and the device can be repaired technically.' },
    { id: 'faq-9', title: 'The printer prints in stripes — is the head always to blame?', items: [], answer: 'No. The cause may also be blocked nozzles, media settings, calibration, media feed or the ink system.' },
    { id: 'faq-10', title: 'What do missing lines in the nozzle check mean?', items: [], answer: 'Most often they mean that some nozzles are not working properly and need cleaning or further diagnostics.' },
    { id: 'faq-11', title: 'Can every clogged head be unclogged?', items: [], answer: 'No. If standard cleaning and unclogging do not help, the head may need reconditioning or replacement.' },
    { id: 'faq-12', title: 'Do you repair the ink system?', items: [], answer: 'Yes — including dampers, hoses, filters, air in the system and ink flow problems.' },
    { id: 'faq-13', title: 'Do you repair the service station and the pump?', items: [], answer: 'Yes — this covers the caps, wiper, pump and waste ink drain, among other things.' },
    { id: 'faq-14', title: 'The printer does not pick up paper or feeds it crooked — do you fix this?', items: [], answer: 'Yes — we diagnose the rollers, the feed mechanism, the media guiding and its drive.' },
    { id: 'faq-15', title: 'Do you repair the take-up system in roll printers?', items: [], answer: 'Yes, if the model has such a system.' },
    { id: 'faq-16', title: 'Do you repair printer electronics?', items: [], answer: 'Yes — including the main board, power supply, head control electronics, sensors and signal cables.' },
    { id: 'faq-17', title: 'Do you solve problems with the RIP and communication with the computer?', items: [], answer: 'Yes — we configure the connection, the driver and the RIP, and diagnose communication problems.' },
    { id: 'faq-18', title: 'Do you update firmware?', items: [], answer: 'Yes — we can update or restore the firmware if this is needed to fix the problem.' },
    { id: 'faq-19', title: 'What should I do if the printer has not been used for a long time?', items: [], answer: 'First check the nozzle check and the condition of the ink system. It is not a good idea to run many cleaning cycles in a row straight away.' },
    { id: 'faq-20', title: 'How often should maintenance be done?', items: [], answer: 'It depends on the model, how intensively it is used and the manufacturer’s recommendations. Regular maintenance covers the service station, wiper, media path and nozzle check, among other things.' },
    { id: 'faq-21', title: 'Is head unclogging part of regular maintenance?', items: [], answer: 'No. Maintenance applies to a working device. Unclogging or reconditioning a blocked head is treated as a repair.' },
    { id: 'faq-22', title: 'Are spare parts included in the repair price?', items: [], answer: 'Prices in the price list are for labour. For services marked “+ parts”, the cost of the parts needed is added separately — after agreeing it with you.' },
    { id: 'faq-23', title: 'Can I bring the printer to the service centre myself?', items: [], answer: 'Yes. Bringing the device to our service centre yourself is best — it is the simplest option. If you cannot do this, we can arrange pickup of the device.' },
    { id: 'faq-24', title: 'Can you collect the printer from my company?', items: [], answer: 'Yes, if you cannot bring the device yourself. Pickup or delivery up to 20 km costs 150 zł. Over 20 km: 150 zł + 2.50 zł for each kilometre over 20 km.' },
    { id: 'faq-25', title: 'How is the pickup or delivery fee calculated over 20 km?', items: [], answer: 'Up to 20 km there is a fixed price of 150 zł. Over 20 km we add 2.50 zł for each kilometre beyond the 20 km limit.' },
    { id: 'faq-26', title: 'Is urgent service possible?', items: [], answer: 'Yes, if we are able to put the job first in line — at no extra charge.' },
    { id: 'faq-27', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a 3-month warranty on the service work carried out, and 7 days on head unclogging and reconditioning. Parts are covered by the manufacturer’s or supplier’s warranty.' },
  ],
})

// Pickup and delivery: this page's own price list (up to 20 km), synchronised with PL
const sublimacjaDojazdEn = (): PricingSection => ({
  ...dojazdSection(),
  items: [
    { service: 'Pickup of the device from the customer (up to 20 km from the service centre)' },
    { service: 'Delivery of the repaired device to the customer (up to 20 km from the service centre)' },
    { service: 'Pickup or delivery over 20 km from the service centre (2.50 zł added only for each km over 20 km)' },
    { service: 'Urgent service (if possible, we do the pickup or delivery first)' },
  ],
})

export const sublimacjaPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  sublimacjaDojazdEn(),
  sublimacjaKonserwacjaEn,
  sublimacjaNaprawyEn,
  sublimacjaFaqEn(),
]
