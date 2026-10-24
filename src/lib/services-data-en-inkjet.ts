import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const inkjetKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (without repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the printer\n• thorough cleaning of the printer interior and casing,\n• cleaning of the paper path, pickup rollers and sensors,\n• cleaning and maintenance of the carriage, guides and encoder,\n• inspection of the print head and the ink system for blockages,\n• cleaning of the service station and pump, and inspection of the printer mechanisms,\n• calibration and a final test of print quality and paper feed.',
    },
    {
      service: 'Replacing / cleaning the waste ink pad + counter reset\n• removal of the parts needed to access the waste ink pad;\n• replacement or thorough cleaning of the waste ink pad (the “nappy”);\n• cleaning of ink residue from the pad compartment;\n• inspection and cleaning of the waste ink drain system;\n• reset of the waste ink counter / removal of the service lock;\n• reassembly and a test of correct printer operation.',
    },
  ],
}

export const inkjetNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Paper transport, rollers and trays',
      items: [
        { service: 'Clearing jams in the paper path\n(paper gets stuck or stops during printing)' },
        { service: 'Cleaning and restoring the pickup roller / separator\n(the printer does not pick up paper or feeds several sheets at once)' },
        { service: 'Replacing the pickup roller / separator\n(worn parts cause slipping or paper pickup problems)' },
        { service: 'Cleaning paper sensors\n(false out-of-paper message or incorrect sheet detection)' },
        { service: 'Adjusting the paper path and guides\n(paper moves skewed, jams or the print is shifted)' },
        { service: 'Repairing the paper feed mechanism\n(the tray does not pick up, stops or does not move paper correctly)' },
        { service: 'Repairing the duplex (double-sided printing) unit\n(paper jams or is not turned over correctly during double-sided printing)' },
      ],
    },
    {
      id: 'naprawy-karetka',
      title: 'Carriage, encoder and drive mechanism',
      items: [
        { service: 'Cleaning and lubricating the carriage rail\n(jerking, noise or uneven print head movement)' },
        { service: 'Cleaning the encoder strip\n(misalignment, shadows or incorrect print positioning)' },
        { service: 'Replacing the encoder strip\n(persistent positioning errors despite proper cleaning)' },
        { service: 'Adjusting the carriage drive belt\n(vibration, skipping or uneven carriage movement)' },
        { service: 'Replacing the carriage drive belt\n(a worn or damaged belt causes grinding or no print head movement)' },
        { service: 'Repairing the carriage drive mechanism\n(the carriage stops, gets stuck or moves incorrectly)' },
        { service: 'Replacing the carriage drive motor\n(the print head does not move or the printer reports a drive error)' },
      ],
    },
    {
      id: 'naprawy-glowica',
      title: 'Print head and print quality',
      items: [
        { service: 'Cleaning and unclogging the print head\n(missing colour, gaps, streaks or blank areas on prints)' },
        { service: 'Replacing the print head\n(persistent missing nozzles or a damaged print head)' },
        { service: 'Print head calibration / alignment\n(misaligned lines, shadows or incorrect colour registration)' },
      ],
    },
    {
      id: 'naprawy-uklad-tuszu',
      title: 'Ink system, service station and pump',
      items: [
        { service: 'Flushing and removing air from the ink system\n(interrupted ink flow, air bubbles or one colour missing)' },
        { service: 'Repairing the ink supply system / Ink Tank / EcoTank\n(ink does not flow properly to the print head or the ink level does not even out)' },
        { service: 'Fixing ink leaks\n(ink appears inside the printer or under the device)' },
        { service: 'Cleaning the service station (capping / wiper)\n(the print head dries out, smudges or automatic cleaning does not work properly)' },
        { service: 'Repairing the service station / ink pump\n(the print head is not cleaned properly, does not park or ink is not drained during cleaning)' },
      ],
    },
    {
      id: 'naprawy-skaner',
      title: 'Scanner and automatic document feeder (ADF)',
      items: [
        { service: 'Cleaning and calibrating the scanner\n(streaks, smudges or poor scan reproduction)' },
        { service: 'Repairing the scanner mechanism\n(the scanner stops, makes noise or does not move the optical module)' },
        { service: 'Repairing the automatic document feeder (ADF)\n(documents are not picked up, jam or go through skewed)' },
        { service: 'Replacing ADF rollers / separator\n(the feeder picks up several sheets or does not pick up documents)' },
        { service: 'Repairing ADF / scanner sensors\n(the device detects documents incorrectly or reports a jam)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Electronics, power supply and control panel',
      items: [
        { service: 'Repairing the power supply / power circuit\n(the printer does not turn on, switches off or works unstably)' },
        { service: 'Replacing the power supply / power module\n(damaged power module)' },
        { service: 'Repairing the mainboard / control electronics\n(restarts, freezes or printer control errors)' },
        { service: 'Replacing the mainboard / control module\n(permanently damaged device electronics)' },
        { service: 'Repairing wiring and signal ribbon cables\n(random errors, signal loss or interrupted operation)' },
        { service: 'Repairing USB / LAN ports\n(the computer or network does not detect the printer)' },
        { service: 'Repairing the control panel\n(buttons, screen or touch panel do not respond properly)' },
        { service: 'Replacing the control panel / display\n(damaged screen or panel module)' },
      ],
    },
    {
      id: 'naprawy-software',
      title: 'Software and configuration',
      items: [
        { service: 'Installing and configuring drivers\n(the computer does not see the printer or printing works incorrectly)' },
        { service: 'Configuring Wi-Fi / LAN network\n(the printer does not connect to the network or other devices)' },
        { service: 'Configuring AirPrint / Mopria / the manufacturer\'s app\n(printing from a smartphone or tablet is not possible)' },
        { service: 'Firmware update / configuration\n(software errors or problems after an update)' },
        { service: 'Restoring settings and reconfiguring the printer\n(problems after incorrect settings changes or a device reset)' },
        { service: 'Configuring scan to computer / folder\n(scans do not reach the computer or the selected folder)' },
        { service: 'Configuring scan to e-mail / cloud\n(problems sending scans via SMTP or to a cloud service)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// Thermal transfer printers
// -------------------------------------------------------

export const inkjetFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the inkjet printer repair process look like?', items: [], answer: 'First we carry out a diagnosis and identify the cause of the fault. Then we give you the cost and the expected turnaround time. We start the repair only after the customer\'s approval.' },
    { id: 'faq-2', title: 'How much does a printer diagnosis cost?', items: [], answer: 'The initial diagnosis online and when you bring the device in is free. The full diagnosis is also free if we carry out the repair. If you decide not to go ahead, the price shown in the current price list applies.' },
    { id: 'faq-3', title: 'How long does a repair take?', items: [], answer: 'Most standard repairs take 1–3 working days. More complex electronics repairs or waiting for parts may extend this time.' },
    { id: 'faq-4', title: 'Which inkjet printer brands do you service?', items: [], answer: 'We service, among others, Epson, Canon, HP, Brother and other popular inkjet printers and multifunction printers.' },
    { id: 'faq-5', title: 'Is it worth repairing an older inkjet printer?', items: [], answer: 'It depends on the value of the device, the type of fault, the cost of parts and the overall condition of the printer. After the diagnosis we tell you whether the repair makes economic sense.' },
    { id: 'faq-6', title: 'Why does my printer print with streaks?', items: [], answer: 'The most common cause is a partially clogged print head, an ink flow problem, a dirty encoder or incorrect print head alignment.' },
    { id: 'faq-7', title: 'Why does my printer not print one colour?', items: [], answer: 'The cause may be a dried-out print head, air in the ink system, a blocked ink tube or a problem with the service station.' },
    { id: 'faq-8', title: 'Why does my printer print blank pages?', items: [], answer: 'The most common causes are a completely clogged print head, no ink flow or a damaged print head.' },
    { id: 'faq-9', title: 'Does automatic print head cleaning always help?', items: [], answer: 'No. It may be enough for light clogging, but a badly dried-out print head often needs to be removed and professionally cleaned or unclogged.' },
    { id: 'faq-10', title: 'Can every dried-out print head be unclogged?', items: [], answer: 'No. If the nozzles or the print head electronics are permanently damaged, cleaning may not restore correct operation.' },
    { id: 'faq-11', title: 'When does the print head need to be replaced?', items: [], answer: 'When professional cleaning and unclogging do not restore it to working order, or the print head is electrically or mechanically damaged. When replacing it, the cost of a new print head is added to the labour price.' },
    { id: 'faq-12', title: 'Why does my EcoTank / Ink Tank printer not draw ink?', items: [], answer: 'A possible cause is air in the system, blocked tubes, a leak or a problem with the service station and pump.' },
    { id: 'faq-13', title: 'Why do air bubbles appear in EcoTank tubes?', items: [], answer: 'Air can get into the system after the tank has run empty, through a leak or after the device has been idle for a long time. The system may then need to be bled of air.' },
    { id: 'faq-14', title: 'Why is my printer leaking or is there ink inside?', items: [], answer: 'The cause may be a leak in the ink system, a damaged tank, tube, service station or an overfilled waste ink pad.' },
    { id: 'faq-15', title: 'What does the full waste ink pad / “nappy” message mean?', items: [], answer: 'The waste ink pad collects ink used during automatic print head cleaning. Once the limit is reached, the device may display a service message or block printing.' },
    { id: 'faq-16', title: 'Is it enough to just reset the waste ink pad counter?', items: [], answer: 'No. The physical condition of the pad and the ink drain system must also be checked. A reset alone may lead to overflow and leaks.' },
    { id: 'faq-17', title: 'Why does my printer not pick up paper?', items: [], answer: 'The most common causes are dirty or worn rollers, the separator, sensors or a damaged paper pickup mechanism.' },
    { id: 'faq-18', title: 'Why does my printer pick up several sheets at once?', items: [], answer: 'This is most often caused by a worn separator or pickup roller.' },
    { id: 'faq-19', title: 'Why does paper jam or feed in skewed?', items: [], answer: 'The cause may be the rollers, guides, sensors, a dirty paper path or a problem with the duplex mechanism.' },
    { id: 'faq-20', title: 'Why is the print head carriage noisy, jerky or stopping?', items: [], answer: 'A possible cause is a dirty rail, the encoder strip, a worn belt, the motor or a mechanical blockage of the carriage.' },
    { id: 'faq-21', title: 'The printer shows an ink error or does not recognise the cartridge — why?', items: [], answer: 'The cause may be a damaged or incompatible cartridge, dirty contacts, a chip problem or the device electronics.' },
    { id: 'faq-22', title: 'Why does the ADF not pick up documents or pick up several sheets?', items: [], answer: 'The most common cause is dirty or worn ADF rollers and separator, or a sensor problem.' },
    { id: 'faq-23', title: 'The scanner does not scan or there are streaks on the scan — do you repair this?', items: [], answer: 'Yes. We repair scanners and ADFs in multifunction printers. Streaks may be caused by dirt, a scanner mechanism problem or the sensors.' },
    { id: 'faq-24', title: 'The printer does not connect via Wi-Fi / LAN or the computer cannot see it — do you fix this?', items: [], answer: 'Yes. We check drivers, network settings, firmware, USB/LAN ports and the printer and computer configuration.' },
    { id: 'faq-25', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a warranty of 3 to 12 months on completed repairs, depending on the type of work and the parts used.' },
    { id: 'faq-26', title: 'Are parts included in the price?', items: [], answer: 'It depends on the service. If a service is marked “+ parts”, the price covers labour, and the required parts are charged separately. For replacing / cleaning the waste ink pad, the price of 250 zł already includes the pad and the materials needed to carry out the service.' },
    { id: 'faq-27', title: 'How much does printer pickup or delivery cost?', items: [], answer: 'Pickup or delivery within 2.5 km of our service centre costs 25 zł net. For longer routes we add 2 zł net for each kilometre above 5 km of the total round trip.' },
  ],
})
