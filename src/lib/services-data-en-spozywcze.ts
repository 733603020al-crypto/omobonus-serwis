import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection, faqSectionEn } from './services-data-en-shared'

// serwis-drukarek-spozywczych — EN version, synchronised with PL (services-data-spozywcze.ts).
export const SPOZYWCZE_PRICE_TOOLTIP_EN =
  'Net prices for labour, excluding parts and ink. With full maintenance, standard cleaning fluids and small service materials are included in the price. Turnaround time does not include waiting for parts.'

export const spozywczeKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[full ]]cleaning and inspection of the edible printer\n• nozzle inspection and nozzle check;\n• standard head cleaning cycle;\n• cleaning the head / nozzle surface;\n• cleaning the caps and wiper;\n• cleaning the waste ink drain;\n• cleaning the filters;\n• cleaning the rollers and sheet feed path;\n• cleaning the platform / work table in direct-to-food printers;\n• cleaning the product and position sensors;\n• test print after maintenance.',
    },
  ],
  notes: [
    'Included in the price: standard cleaning fluids and small service materials.',
    'Spare parts — extra, if they need to be replaced.',
  ],
}

export const spozywczeNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  items: [],
  subcategories: [
    {
      id: 'naprawy-glowica',
      title: 'Print head and print quality',
      items: [
        { service: 'Print head unclogging\n(some nozzles missing, colour dropouts, stripes on the print, dried ink)' },
        { service: 'Print head reconditioning\n(standard cleaning and unclogging do not restore correct printing)' },
        { service: 'Print head replacement\n(the head does not print, is permanently damaged or cannot be reconditioned)' },
        { service: 'Calibration and print quality correction\n(the print is shifted, blurred, doubled or the colours do not line up properly)' },
      ],
    },
    {
      id: 'naprawy-kartridze',
      title: 'Cartridges and edible ink system',
      items: [
        { service: 'Fixing cartridge recognition problems\n(the printer does not detect the cartridge or shows a cartridge error although it is installed)' },
        { service: 'Cartridge / head contact repair\n(the cartridge is detected intermittently or the error appears when the cartridge is moved)' },
        { service: 'Ink hose / CISS repair\n(ink leaks, does not reach the head or air appears in the hoses)' },
        { service: 'Removing air from the ink system\n(ink does not reach the head properly after downtime or an ink change)' },
        { service: 'Damper (ink damper) replacement\n(ink flow is uneven, a colour fades out or the system draws in air)' },
        { service: 'Ink system flushing\n(a contaminated or partly blocked system restricts the flow of edible ink)' },
      ],
    },
    {
      id: 'naprawy-stacja-serwisowa',
      title: 'Service station and waste ink',
      items: [
        { service: 'Cap station repair / replacement\n(the head is not properly sealed or cleaning does not work effectively)' },
        { service: 'Wiper replacement\n(ink residue remains on the head after the cleaning cycle)' },
        { service: 'Wiper drive repair\n(the wiper does not move or the printer reports a cleaning mechanism error)' },
        { service: 'Ink pump repair / replacement\n(the printer does not draw off ink during cleaning)' },
        { service: 'Waste ink absorber replacement / servicing\n(the printer reports a full absorber or waste ink is not being stored properly)' },
        { service: 'Waste ink drain repair\n(leaks appear or ink does not drain from the service station)' },
        { service: 'Ink trough and filter repair in direct-to-food printers\n(ink collects in the chamber or flow through the filter is restricted)' },
      ],
    },
    {
      id: 'naprawy-podawanie',
      title: 'Edible sheet feed',
      items: [
        { service: 'Sheet pickup mechanism repair\n(the printer does not pick up sugar sheets, wafer paper or frosting sheets)' },
        { service: 'Pickup roller replacement / repair\n(the sheet slips, is picked up several times or goes in crooked)' },
        { service: 'Sheet guiding repair\n(the sheet moves unevenly, skews or rubs against printer parts)' },
        { service: 'Clearing feed mechanism jams\n(the sheet stops inside the printer or does not pass through the whole path)' },
        { service: 'Paper / sheet sensor repair\n(the printer does not detect the sheet or reports it missing although it is loaded correctly)' },
      ],
    },
    {
      id: 'naprawy-platforma',
      title: 'Direct-to-food platform / table',
      items: [
        { service: 'Platform raising and lowering mechanism repair\n(the table does not set the correct height relative to the product)' },
        { service: 'Platform drive repair\n(the platform does not move, stops or runs unevenly)' },
        { service: 'Platform guide rail repair\n(the table jams, has play or moves unevenly)' },
        { service: 'Table in / out mechanism repair\n(the platform does not move under the head or does not return to the start position)' },
        { service: 'Fixing Platform Feed / Lift errors\n(the printer stops working and reports a platform movement or height error)' },
      ],
    },
    {
      id: 'naprawy-pozycjonowanie',
      title: 'Product positioning and carousel',
      items: [
        { service: 'Product position calibration\n(the print does not land in the centre of the product or is constantly shifted)' },
        { service: 'Product centring mechanism repair\n(the product is not positioned correctly relative to the head)' },
        { service: 'Carousel repair / calibration\n(the carousel stops, rotates unevenly or puts the product in the wrong position)' },
        { service: 'Carousel drive repair\n(the carousel does not rotate even though the product is positioned correctly)' },
        { service: 'Product tray / holder repair\n(the product moves during printing or the tray does not position correctly)' },
      ],
    },
    {
      id: 'naprawy-czujniki',
      title: 'Product and height sensors',
      items: [
        { service: 'Product sensor replacement\n(the printer does not detect the product on the platform)' },
        { service: 'Sensor board repair / replacement\n(the sensors do not work properly even though the mechanics are fine)' },
        { service: 'Product height sensor repair\n(the printer sets the wrong distance between the head and the product)' },
        { service: 'Platform position sensor repair\n(the printer does not recognise the table position or stops its movement)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Carriage, drive and encoders',
      items: [
        { service: 'Carriage drive repair\n(the carriage stops, moves unevenly or the printer reports a motion error)' },
        { service: 'Carriage belt replacement / adjustment\n(the carriage jerks, loses its position or the belt is loose or damaged)' },
        { service: 'Carriage motor repair / replacement\n(the carriage does not move even though the belt and guiding are fine)' },
        { service: 'Encoder strip cleaning / replacement\n(the print is shifted, the carriage loses its position or motion errors appear)' },
        { service: 'Platform encoder / encoder wheel repair\n(the platform stops in the wrong position or does not measure movement correctly)' },
      ],
    },
    {
      id: 'naprawy-elektronika-zasilanie',
      title: 'Electronics, power supply and control panel',
      subtitle: 'Not every edible printer has a separate panel or display — these items apply to models equipped with one.',
      items: [
        { service: 'Power supply / power circuit repair\n(the printer does not switch on, switches off or runs unstably)' },
        { service: 'Power supply / power module replacement\n(damaged power module)' },
        { service: 'Main board / control electronics repair\n(resets, freezing or printer control errors)' },
        { service: 'Main board / control module replacement\n(permanently damaged device electronics)' },
        { service: 'Wiring and signal ribbon cable repair\n(random errors, signal dropouts or interrupted operation)' },
        { service: 'USB / LAN port repair\n(the computer or network does not detect the printer despite correct configuration)' },
        { service: 'Control panel repair\n(buttons, screen or touch panel do not respond properly)' },
        { service: 'Control panel / display replacement\n(damaged screen, panel or control module)' },
      ],
    },
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software and configuration',
      subtitle: 'Configuration, firmware, calibration or restoring settings needed to complete our repair are included in its price. A separate price applies only when you order such a service on its own.',
      items: [
        { service: 'Driver installation and configuration\n(the computer does not see the printer or printing does not work properly)' },
        { service: 'Wi-Fi / LAN network configuration\n(the printer does not connect to the network or to the computer over the network)' },
        { service: 'Manufacturer’s app / software configuration\n(problems configuring the program used to operate the printer and print)' },
        { service: 'Firmware update / configuration\n(device software errors or a problem after an update)' },
        { service: 'Restoring settings and reconfiguring the printer\n(problems after an incorrect settings change, a reset or a change to the device configuration)' },
      ],
    },
  ],
}

export const spozywczeFaqEn = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'How much does an edible printer diagnosis cost?', items: [], answer: 'If you decline the repair: **50 / 100 / 150 zł**, depending on the device category.' },
    { id: 'faq-2', title: 'Do I pay for the diagnosis if I decide to go ahead with the repair?', items: [], answer: 'No — the fee only applies if you decline the repair.' },
    { id: 'faq-3', title: 'How long does the diagnosis take?', items: [], answer: 'Usually **1–3 working days**.' },
    { id: 'faq-4', title: 'How long does the repair take?', items: [], answer: 'We complete most repairs in **1–2 working days**. More complex work can take **2–4 days**, not counting the time spent waiting for parts.' },
    { id: 'faq-5', title: 'Will I know the cost before the repair?', items: [], answer: 'Yes. After the diagnosis we give you the scope of work and the cost. We only start the repair once you approve it.' },
    { id: 'faq-6', title: 'What does the repair price depend on?', items: [], answer: 'On the device category, the scope of work and the parts needed. We give you the exact cost after the diagnosis, before starting the repair.' },
    { id: 'faq-7', title: 'Is it worth repairing an older edible printer?', items: [], answer: 'After the diagnosis we assess the extent of the fault and whether the repair is worth it. If you decide not to go ahead, the diagnosis fee applies according to the price list.' },
    { id: 'faq-8', title: 'Which edible printers do you repair?', items: [], answer: 'We repair both sheet printers adapted for edible inks and compact direct-to-food printers.' },
    { id: 'faq-9', title: 'Do you repair Canon, Epson and Brother printers adapted for edible inks?', items: [], answer: 'Yes. We repair devices that have already been adapted to work with edible inks.' },
    { id: 'faq-10', title: 'Which brands of edible printers do you repair?', items: [], answer: 'Including Canon, Epson, Brother, Primera, JetLT, Icing Images, Icinginks, Kopykake, DecoPac / PhotoCake, EVEBOT, Cino Printer and others — within the range of devices covered by our service.' },
    { id: 'faq-11', title: 'The printer does not print one or more colours — what could be the cause?', items: [], answer: 'Most often the cause is blocked nozzles, a cartridge problem or incorrect ink flow.' },
    { id: 'faq-12', title: 'Can every clogged head be unclogged?', items: [], answer: 'No. If the head is permanently damaged, it may need reconditioning or replacement.' },
    { id: 'faq-13', title: 'Can edible ink dry in the head?', items: [], answer: 'Yes, especially if the printer has been idle for a longer time. If repeated cleaning cycles do not help, the head may need unclogging or reconditioning.' },
    { id: 'faq-14', title: 'Is it a good idea to run several head cleaning cycles in a row?', items: [], answer: 'Not always. If further cycles do not improve print quality, further diagnostics are needed.' },
    { id: 'faq-15', title: 'Why is the print blurred or shifted?', items: [], answer: 'The cause may be the head, calibration, the encoder, product positioning or an incorrect platform height.' },
    { id: 'faq-16', title: 'Why does the print not land in the centre of the biscuit?', items: [], answer: 'The cause may be positioning, calibration, the product sensor or the tray / carousel setting.' },
    { id: 'faq-17', title: 'The printer does not detect the product on the platform — do you fix this?', items: [], answer: 'Yes. We diagnose the product sensor, the sensor board, the platform and its setting.' },
    { id: 'faq-18', title: 'The head hits the biscuit or cake — what could be the cause?', items: [], answer: 'Most often a problem with the height sensor, platform calibration, a dirty sensor or the encoder.' },
    { id: 'faq-19', title: 'Do you repair the direct-to-food platform / table?', items: [], answer: 'Yes — including the drive, lift, guide rails, positioning and Platform Feed / Lift errors.' },
    { id: 'faq-20', title: 'Do you repair the carousel in biscuit printers?', items: [], answer: 'Yes — including its drive, setting and calibration.' },
    { id: 'faq-21', title: 'Do you fix problems with feeding sugar sheets or wafer paper?', items: [], answer: 'Yes — we diagnose the rollers, sheet guiding, sensors and jams.' },
    { id: 'faq-22', title: 'Can I use any edible ink and paper?', items: [], answer: 'Not always. You should use materials compatible with the specific device and print system.' },
    { id: 'faq-23', title: 'Are parts included in the repair price?', items: [], answer: 'Prices in the price list are for labour. For services marked **“+ parts”**, the cost of the parts needed is added separately — after agreeing it with you.' },
    { id: 'faq-24', title: 'Can I bring the printer to the service centre myself?', items: [], answer: 'Yes. This is the preferred option. If you cannot do this, we can arrange pickup of the device.' },
    { id: 'faq-25', title: 'Can I send the printer by courier from another city?', items: [], answer: '**Yes. You can send a well-protected printer by courier to our service centre yourself.**\n\nPlease contact us before sending it.\n\nWe do not currently arrange courier pickups across Poland.' },
    { id: 'faq-26', title: 'How much does pickup or delivery cost?', items: [], answer: '**25 zł** covers a route of up to 2.5 km from the service centre, i.e. up to 5 km in total both ways. Above this limit: **25 zł + 2 zł/km** — for each additional kilometre of the whole round trip beyond the first 5 km.' },
    { id: 'faq-27', title: 'How often should maintenance be done?', items: [], answer: 'It depends on the model and how intensively it is used. The head, service station, sensors, platform and ink system, among other things, need regular checks.' },
    { id: 'faq-28', title: 'Is head unclogging part of regular maintenance?', items: [], answer: 'No. Maintenance applies to a working device. Unclogging or reconditioning a blocked head is a repair service.' },
    { id: 'faq-29', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a **3-month warranty** on the service work carried out, and **7 days on head unclogging and reconditioning**. Parts are covered by the manufacturer’s or supplier’s warranty.' },
  ],
})

// This page's pickup and delivery: 2 zł/km for the whole round trip beyond the first 5 km
const spozywczeDojazdEn = (): PricingSection => {
  const section = dojazdSection()
  section.items = section.items.map((item, index) => (index === 2 ? { ...item, service: 'Pickup or delivery over 2.5 km from the service centre (2 zł for each additional km of the whole round trip beyond the first 5 km)' } : item))
  return section
}

export const spozywczePricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  spozywczeDojazdEn(),
  spozywczeKonserwacjaEn,
  spozywczeNaprawyEn,
  spozywczeFaqEn(),
]
