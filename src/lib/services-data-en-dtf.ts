import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

// serwis-drukarek-dtf — EN version, synchronised with PL (services-data-dtf.ts).
export const DTF_PRICE_TOOLTIP_EN =
  'Net prices for labour, excluding parts and ink. With full maintenance, standard cleaning fluids and small service materials are included in the price. Turnaround time does not include waiting for parts.'

export const dtfKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the DTF printer\n• cleaning the heads and the area around them;\n• cleaning the cap tops, wipers and service station;\n• checking the ink system, hoses, dampers and filters;\n• checking the pumps and waste ink drain;\n• checking and cleaning the white ink system;\n• cleaning the encoder and sensors;\n• cleaning and checking the guide rails and carriage mechanism;\n• checking the belts, drives and rollers;\n• cleaning and checking the film path;\n• nozzle check;\n• head and media feed calibration;\n• test print after maintenance.',
    },
  ],
  notes: [
    'Included in the price: standard cleaning fluids and small service materials.',
    'Spare parts — extra, if they need to be replaced.',
  ],
}

export const dtfNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  items: [],
  subcategories: [
    {
      id: 'naprawy-glowica',
      title: 'Print heads and print quality',
      items: [
        { service: 'Head cleaning / unclogging\n(missing nozzles, stripes, gaps or uneven printing)' },
        { service: 'Print head replacement\n(the head is damaged or cannot be effectively unclogged)' },
        { service: 'Head and bi-direction calibration\n(shifted colours, double outlines or blurred printing)' },
        { service: 'Head position / height adjustment\n(the head rubs against the film or the distance from the material is incorrect)' },
      ],
    },
    {
      id: 'naprawy-atrament',
      title: 'Ink system and white ink',
      items: [
        { service: 'Ink system flushing / unclogging\n(ink does not flow properly, there is air in the system or it is blocked)' },
        { service: 'Replacement of dampers, filters or hoses\n(unstable ink flow, air bubbles or colour dropouts)' },
        { service: 'Ink pump repair / replacement\n(the pump does not deliver ink or does not maintain the correct flow)' },
        { service: 'White ink circulation / mixing repair\n(white ink settles, separates or is fed unevenly)' },
        { service: 'Cleaning of ink tanks and ink deposits\n(sediment or contamination prevents proper ink feed)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Service station and ink drain system',
      items: [
        { service: 'Service station cleaning / reconditioning\n(the head is not properly cleaned or parked)' },
        { service: 'Cap top / wiper replacement\n(problems with head cleaning, ink suction or missing nozzles)' },
        { service: 'Suction pump repair / replacement\n(the station does not suck out ink during head cleaning)' },
        { service: 'Ink drain system unclogging\n(waste ink does not drain or leaks appear)' },
        { service: 'Waste ink tank / sensor replacement\n(the printer reports a full tank or does not detect its status)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Carriage, drive and encoder',
      items: [
        { service: 'Carriage belt replacement\n(the carriage jerks, skips or does not move properly)' },
        { service: 'Carriage motor repair / replacement\n(the carriage does not move, stops or the printer reports a drive error)' },
        { service: 'Encoder cleaning / replacement\n(positioning errors, shifted prints or incorrect carriage movement)' },
        { service: 'Guide rail and carriage mechanism adjustment\n(noise, resistance to movement, play or uneven carriage operation)' },
      ],
    },
    {
      id: 'naprawy-folia',
      title: 'Film feed and guiding',
      items: [
        { service: 'Film feed calibration\n(the print is stretched, compressed or horizontal stripes appear)' },
        { service: 'Pinch roller repair / replacement\n(the film slips, moves sideways or is fed unevenly)' },
        { service: 'Film feed motor repair / replacement\n(the film does not move or stops during printing)' },
        { service: 'Unwinder / take-up winder repair\n(the roll does not unwind or wind the film properly)' },
        { service: 'Film guiding adjustment\n(the film drifts sideways, wrinkles or shifts during printing)' },
      ],
    },
    {
      id: 'naprawy-grzanie',
      title: 'Film heating and vacuum',
      items: [
        { service: 'Heater repair / replacement\n(the film is not heated or the temperature is too low)' },
        { service: 'Temperature control / sensor repair\n(the temperature is unstable, too high or the printer reports a heating error)' },
        { service: 'Vacuum / fan repair\n(the film does not lie flat or shifts during printing)' },
        { service: 'Heating temperature calibration\n(the actual temperature differs from the set value or heating is uneven)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Electronics, power supply and sensors',
      items: [
        { service: 'Main board diagnostics / repair\n(the printer does not start, freezes or reports electronics errors)' },
        { service: 'Main board / controller replacement\n(the board is damaged and cannot be repaired)' },
        { service: 'Power supply repair / replacement\n(no power, switching off by itself or unstable operation)' },
        { service: 'Sensor repair / replacement\n(the printer misdetects the film, the position of components or the device status)' },
        { service: 'Repair of cables, ribbon cables and electronic connections\n(intermittent communication, random errors or no control of a component)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software, firmware and RIP',
      items: [
        { service: 'RIP installation / configuration\n(the software does not print correctly or the printer and DTF parameters need configuring)' },
        { service: 'Firmware update / recovery\n(printer software errors, problems after an update or incorrect control behaviour)' },
        { service: 'Driver and PC–printer communication configuration\n(the computer does not detect the printer or jobs are not transferred)' },
        { service: 'Colour calibration / ICC profile configuration\n(colours in the print do not match the design or need correcting)' },
        { service: 'Printer settings recovery / configuration\n(lost settings, wrong parameters or configuration after electronics replacement)' },
      ],
    },
  ],
}

export const dtfFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'Which DTF printers do we repair?', items: [], answer: 'We service DTF printers of different classes — from compact A3 devices to professional and industrial roll systems. We work with Epson, Roland DG, Mimaki, Mutoh, Fedar, Audley, Pegasus, TruJet, Artemis, IronPrinter, Dias, Cobe, Keditec and DTF Station / Prestige, among others.' },
    { id: 'faq-2', title: 'Do we also repair less common and Chinese DTF printers?', items: [], answer: 'Yes. Whether a repair is possible depends mainly on the design of the device, the components used and the availability of parts. Many DTF printers use common Epson heads and standard ink system components.' },
    { id: 'faq-3', title: 'How long does a DTF printer diagnosis take?', items: [], answer: 'An initial assessment online or when the printer is accepted at our service centre takes up to 15 minutes. A full technical diagnosis and repair quote usually takes 1–2 working days, and up to 3 days for more complex faults.' },
    { id: 'faq-4', title: 'Do I have to pay for the diagnosis?', items: [], answer: 'If we carry out the repair, the diagnosis and quote are FREE. If you decline the repair, the diagnosis costs 250 / 350 / 500 zł, depending on the device class.' },
    { id: 'faq-5', title: 'How long does a DTF printer repair take?', items: [], answer: 'We complete most repairs in 1–3 working days, and electronics repairs in 2–5 days. The price list shows an approximate turnaround time for each service. This time does not include waiting for parts.' },
    { id: 'faq-6', title: 'Is an urgent repair possible?', items: [], answer: 'Yes — if possible, we speed up the repair at no extra charge. The timing depends on the type of fault and the availability of parts.' },
    { id: 'faq-7', title: 'Can a clogged DTF head be saved?', items: [], answer: 'Often, yes. First we check the condition of the nozzles, cap top, pump, dampers and ink system. If the head can be safely unclogged, we clean or flush it. We only suggest a replacement when reconditioning makes no technical or economic sense.' },
    { id: 'faq-8', title: 'Why does DTF white ink stop printing properly?', items: [], answer: 'The most common causes are pigment sedimentation, poor circulation, blocked filters or dampers, air in the system, or problems with the pump and head. That is why we diagnose the whole white ink system, not just the head.' },
    { id: 'faq-9', title: 'What should I do if the DTF printer has not been used for a long time?', items: [], answer: 'Do not run many intensive cleaning cycles straight away. After a long downtime, ink may dry in the head, cap tops, dampers and hoses. It is safer to check the condition of the ink system first.' },
    { id: 'faq-10', title: 'Why does DTF film drift sideways or wrinkle during printing?', items: [], answer: 'The cause may be the pinch rollers, incorrect film tension, the unwinder or take-up winder, the media guide setting or incorrect feed calibration. We check the entire film path.' },
    { id: 'faq-11', title: 'Do we fix problems with the RIP, firmware and communication with the computer?', items: [], answer: 'Yes. We help with problems with the RIP, drivers, firmware, PC–printer communication, print settings and ICC profile configuration. We can configure the RIP, drivers and firmware remotely — at the prices in the price list. Only the initial online assessment is free.' },
    { id: 'faq-12', title: 'Are spare parts included in the price, and will I get a quote before replacement?', items: [], answer: 'No, if the service is marked “+ parts”. In that case the price list covers the service work. After the diagnosis we tell you what is damaged, what work is needed and how much the parts cost. We only replace expensive components after you approve the costs.' },
    { id: 'faq-13', title: 'Do we offer cleaning and maintenance of a DTF printer only, without repair?', items: [], answer: 'Yes. Full maintenance includes, among other things, cleaning the heads and service station, checking the ink and white ink systems, the guide rails, carriage, encoder and film path, plus calibration and a test print.' },
    { id: 'faq-14', title: 'How much does DTF printer maintenance cost?', items: [], answer: 'Full maintenance costs 400 / 600 / 900 zł net, depending on the device class. Standard cleaning fluids and small service materials are included in the price; spare parts are extra, if they need to be replaced.' },
    { id: 'faq-15', title: 'How often should a DTF printer be maintained?', items: [], answer: 'It depends on how intensively it is used, the type of ink and the design of the device. With regular production, the ink system, service station, heads and mechanics should be checked systematically, before print quality problems appear.' },
    { id: 'faq-16', title: 'Does a DTF printer need daily care?', items: [], answer: 'Yes. For most DTF printers, a daily nozzle check and regular mixing or circulation of the white ink are recommended, in line with the manufacturer’s instructions. Neglecting daily care is the most common cause of dried-out heads and white ink problems.' },
    { id: 'faq-17', title: 'Does the DTF printer have to be brought to the service centre?', items: [], answer: 'Not always. First we can assess the problem based on a description, photos or a conversation. If a detailed diagnosis or mechanical repair is needed, you can bring the device to our service centre or use our pickup service. On-site service is available in Wrocław and the surrounding area — travel cost according to the price list. Pickup of large DTF printers (60 cm, on a stand) is charged at the same rate as other devices — from 150 zł.' },
    { id: 'faq-18', title: 'How do I report a DTF printer fault?', items: [], answer: 'Describe the problem via WhatsApp, the form on our website or by phone — ideally with the model name and a photo of the nozzle check. The initial online assessment is free and takes up to 15 minutes.' },
    { id: 'faq-19', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. 3-month warranty on the service work carried out. 7-day warranty on head unclogging / reconditioning. Installed parts are covered by the manufacturer’s or supplier’s warranty, in accordance with its terms.' },
  ],
})

export const dtfPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  dojazdSection(),
  dtfKonserwacjaEn,
  dtfNaprawyEn,
  dtfFaqEn(),
]
