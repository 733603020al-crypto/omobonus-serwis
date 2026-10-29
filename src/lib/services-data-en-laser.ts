import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const laserKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (without repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the printer\n• thorough cleaning of the printer interior from dust, paper dust and toner residue,\n• cleaning of the paper path, pickup and transport rollers, separators and sensors,\n• cleaning of the optics and laser unit,\n• inspection of the drum, transfer belt, fuser and waste toner container,\n• inspection and maintenance of the main mechanical parts; lubrication if specified by the manufacturer,\n• print / colour calibration (if applicable) and a final test of print quality and paper feed.',
    },
  ],
}

export const laserNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'naprawy-mechanizm',
      title: 'Paper transport, rollers and trays',
      items: [
        { service: 'Clearing paper jams and foreign objects from the paper path\n(paper stops, crumples or jams regularly)' },
        { service: 'Cleaning and restoring pickup rollers / separators\n(the printer does not pick up paper, paper slips or several sheets are fed at once)' },
        { service: 'Replacing pickup rollers / separators\n(worn rollers cause recurring paper pickup problems)' },
        { service: 'Cleaning and adjusting the paper path\n(paper moves skewed, wrinkles or stops inside the device)' },
        { service: 'Repairing paper sensors\n(false paper jam, out-of-paper or wrong sheet position message)' },
        { service: 'Repairing the paper feed mechanism / clutch / solenoid\n(paper is picked up too early, too late or not at all)' },
        { service: 'Repairing a paper tray / cassette\n(the tray does not feed paper or the tray mechanism works incorrectly)' },
        { service: 'Repairing the duplex (double-sided printing) unit\n(paper jams or is not turned over correctly during double-sided printing)' },
      ],
    },
    {
      id: 'naprawy-modul-obrazu',
      title: 'Drum, developer and imaging system',
      items: [
        { service: 'Cleaning the imaging system\n(grey background, smudges, stains or repeating marks on prints)' },
        { service: 'Replacing the drum / drum unit\n(streaks, stains, repeating smudges or a worn drum unit)' },
        { service: 'Replacing the drum cleaning blade\n(toner stays on the drum and soils the following prints)' },
        { service: 'Servicing the drum charging system / charge roller\n(grey background, uneven print or problems with correct drum charging)' },
        { service: 'Servicing the developer unit\n(uneven coverage, faded areas or problems with toner application)' },
        { service: 'Replacing the developer / developer unit\n(persistent image quality problems despite a good toner and drum)' },
        { service: 'Image quality and colour calibration\n(colours are shifted or uneven, or the print lacks proper coverage)' },
        { service: 'Servicing / replacing the waste toner container\n(container full message or toner soiling inside the device)' },
      ],
    },
    {
      id: 'naprawy-transfer',
      title: 'Transfer belt and transfer system',
      items: [
        { service: 'Cleaning the transfer belt and transfer rollers\n(streaks, smudges or toner transferring onto the following pages)' },
        { service: 'Replacing the transfer belt\n(coloured streaks, stains, colour misregistration or a damaged belt surface)' },
        { service: 'Replacing the transfer roller\n(faded prints, uneven toner transfer or smudges)' },
        { service: 'Replacing the transfer belt cleaning blade\n(the belt is not cleaned properly and soils prints)' },
        { service: 'Repairing the transfer belt drive mechanism\n(transfer error, belt stopping or unusual noises while printing)' },
      ],
    },
    {
      id: 'naprawy-fuser',
      title: 'Fuser unit',
      items: [
        { service: 'Cleaning and inspecting the fuser unit\n(toner smudges, paper comes out dirty or marks appear on prints)' },
        { service: 'Refurbishing the fuser unit\n(toner smears, paper wrinkles or the fuser works incorrectly)' },
        { service: 'Replacing the fuser film / heat roller\n(repeating marks, a damaged surface or toner not fused properly)' },
        { service: 'Replacing the pressure roller\n(paper wrinkles or slips, or toner is fused unevenly)' },
        { service: 'Repairing the heating system / thermistor / temperature sensor\n(temperature error, no heating or fuser overheating)' },
        { service: 'Replacing the complete fuser unit\n(the fuser is permanently damaged or refurbishing is not cost-effective)' },
      ],
    },
    {
      id: 'naprawy-optyka-laser',
      title: 'Laser, LSU and optics',
      items: [
        { service: 'Cleaning the laser module / LSU optics\n(faded prints, white streaks or uneven contrast)' },
        { service: 'Repairing the laser module / LSU\n(laser error, no image or incorrect drum exposure)' },
        { service: 'Replacing the laser module / LSU\n(permanently damaged optical module)' },
      ],
    },
    {
      id: 'naprawy-skaner',
      title: 'Document scanner and ADF',
      items: [
        { service: 'Cleaning and calibrating the document scanner\n(streaks, smudges or distortion on scans and copies)' },
        { service: 'Repairing the scanner mechanism\n(the scanner module stops, makes noise or does not scan)' },
        { service: 'Repairing the automatic document feeder (ADF)\n(documents are not picked up, jam or go through skewed)' },
        { service: 'Cleaning and restoring ADF rollers / separator\n(the ADF does not pick up documents or feeds several sheets at once)' },
        { service: 'Replacing ADF rollers / separator\n(worn parts cause recurring document feed problems)' },
        { service: 'Repairing ADF / scanner sensors\n(the device detects documents incorrectly or reports a jam)' },
      ],
    },
    {
      id: 'naprawy-elektronika',
      title: 'Electronics, power supply and control panel',
      items: [
        { service: 'Repairing the power supply / power circuit\n(the printer does not turn on, switches off or works unstably)' },
        { service: 'Replacing the power supply / power module\n(permanently damaged power module)' },
        { service: 'Repairing the mainboard / formatter\n(the printer freezes, restarts or does not start properly)' },
        { service: 'Replacing the mainboard / formatter\n(permanently damaged control electronics)' },
        { service: 'Repairing the high-voltage power supply (HVPS)\n(problems with drum charging, toner transfer or image quality)' },
        { service: 'Repairing USB / LAN ports\n(the computer or network does not detect the printer)' },
        { service: 'Repairing wiring and signal ribbon cables\n(random errors, signal loss or unstable operation of the device)' },
        { service: 'Repairing the control panel\n(buttons, touch panel or screen do not respond properly)' },
        { service: 'Replacing the control panel / display\n(damaged screen or panel module)' },
        { service: 'Repairing the fan / cooling system\n(noise, overheating or fan error)' },
      ],
    },
    {
      id: 'naprawy-software',
      title: 'Software and configuration',
      items: [
        { service: 'Installing and configuring drivers\n(the computer does not see the printer or printing works incorrectly)' },
        { service: 'Configuring Wi-Fi / LAN network\n(the printer does not connect to the network or computers)' },
        { service: 'Configuring AirPrint / Mopria / the manufacturer\'s app\n(printing from a phone or tablet is not possible)' },
        { service: 'Firmware update\n(device software problems or a manufacturer update is required)' },
        { service: 'Restoring settings and reconfiguring the printer\n(problems after incorrect settings changes or a device reset)' },
        { service: 'Configuring scan to computer / folder\n(scans do not reach the computer or network share)' },
        { service: 'Configuring scan to e-mail / cloud\n(problems sending scans via SMTP or to a cloud service)' },
        { service: 'Configuring the web panel / network settings\n(problems with IP, DHCP, DNS or device administration)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// Inkjet printers
// -------------------------------------------------------

export const laserFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the laser printer repair process look like?', items: [], answer: '**First we carry out an initial diagnosis and identify the likely cause of the fault.**\n\nThen we carry out a full diagnosis and give you the exact repair cost and turnaround time.\n\nWe start the repair only after the customer\'s approval.' },
    { id: 'faq-2', title: 'How much does a laser printer diagnosis cost?', items: [], answer: '**The initial diagnosis online and when you bring the device to our service centre is free.**\n\nThe full diagnosis is also free if we carry out the repair.\n\nIf you decide not to go ahead with the repair, the price shown in the current price list for the relevant device category applies.' },
    { id: 'faq-3', title: 'How long does a laser printer repair take?', items: [], answer: '**Most standard repairs are completed within 1–3 working days.**\n\nMore complex repairs of electronics or the fuser, or waiting for parts, may extend this time.\n\nWe give you the exact turnaround time after the diagnosis.' },
    { id: 'faq-4', title: 'Which laser printer brands do you service?', items: [], answer: 'We service devices from many manufacturers, including HP, Brother, Canon, Samsung, OKI, Kyocera, Xerox, Lexmark, Konica Minolta, Ricoh and other popular laser printers and multifunction printers.' },
    { id: 'faq-5', title: 'Is it worth repairing an older laser printer?', items: [], answer: 'It depends on the type of fault, the condition of the device, the availability of parts and the cost of the repair. After the diagnosis we tell you whether the repair makes economic sense.' },
    { id: 'faq-6', title: 'Why does my laser printer jam paper?', items: [], answer: 'The most common causes are worn or dirty pickup rollers, the separator, paper sensors, parts of the paper path or a problem with the fuser unit.' },
    { id: 'faq-7', title: 'Why does my printer not pick up paper?', items: [], answer: 'This is most often caused by dirty or worn pickup rollers, the separator, clutch, solenoid or the tray mechanism.' },
    { id: 'faq-8', title: 'Why does my printer pick up several sheets at once?', items: [], answer: 'A typical cause is a worn paper separator, pickup rollers or incorrect operation of the tray mechanism.' },
    { id: 'faq-9', title: 'Why do I get a paper jam message when there is no paper in the printer?', items: [], answer: 'A possible cause is a damaged or dirty paper sensor, a stuck sensor flag or a small piece of paper left in the paper path.' },
    { id: 'faq-10', title: 'Why does paper jam only during double-sided printing?', items: [], answer: 'If the problem occurs only in duplex mode, the cause may be the sheet reversing mechanism, rollers, guides or sensors of the duplex unit.' },
    { id: 'faq-11', title: 'How can I tell a toner problem from a worn drum?', items: [], answer: '**Toner that is running out more often causes general, uneven fading of the print.**\n\nA worn drum more often produces repeating stains, streaks, a grey background or a shadow image at regular intervals.\n\nWe confirm the exact cause during the diagnosis.' },
    { id: 'faq-26', title: 'Why does my laser printer print blank pages?', items: [], answer: 'The cause may be an incorrectly installed or damaged toner, a problem with the drum, imaging system, transfer or control electronics. If the problem appeared right after replacing the toner, we first also check the cartridge itself and how it is installed.' },
    { id: 'faq-12', title: 'Why do streaks, smears or stains appear on prints?', items: [], answer: 'These symptoms may be caused by a worn drum, cleaning blade, transfer belt, toner, developer or a dirty optical system.' },
    { id: 'faq-13', title: 'Why do repeating marks or a “ghost” image appear on the page?', items: [], answer: 'Repeating smudges or so-called ghosting most often point to a problem with the drum, cleaning blade, fuser or another rotating part of the imaging system.' },
    { id: 'faq-14', title: 'Why does toner rub off the page or the print smear?', items: [], answer: 'Most often the problem is with the fuser unit, which does not reach the correct temperature or does not provide sufficient pressure.' },
    { id: 'faq-15', title: 'How can I recognise a faulty fuser?', items: [], answer: 'Typical symptoms are smearing toner, wrinkled paper, smudges, jams at the paper exit, temperature errors or unusual noises.' },
    { id: 'faq-17', title: 'What does the “Replace Drum” message mean?', items: [], answer: 'The message may mean that the drum has reached its rated page count or that it is actually worn. After replacement, some devices also require the relevant counter to be reset.' },
    { id: 'faq-18', title: 'After replacing the toner, the printer still does not print or does not recognise the cartridge — why?', items: [], answer: 'The cause may be an incorrectly installed or incompatible toner, a damaged chip, dirty contacts, a cartridge communication problem or a device error. If reinstalling the toner does not help, we also check the drum and the printer electronics.' },
    { id: 'faq-19', title: 'Why is my printer spilling toner inside?', items: [], answer: 'The most common cause is a damaged or leaking toner cartridge, a worn drum, cleaning blade or a problem with the waste toner container.' },
    { id: 'faq-20', title: 'What does a full waste toner container mean?', items: [], answer: '**The container collects toner removed during the operation of the device.**\n\nOnce it is full, the printer may display a message or block further operation.\n\nDepending on the model, the container needs to be emptied or replaced.' },
    { id: 'faq-21', title: 'Why is my printer very noisy?', items: [], answer: 'Unusual noises may come from rollers, gears, the fuser, the drive system, the transfer unit or other worn mechanical parts.' },
    { id: 'faq-22', title: 'The printer does not turn on or restarts by itself — what could be the cause?', items: [], answer: 'We most often check the power supply, mainboard, wiring and other electronic components. The cause may also be damage after a power surge.' },
    { id: 'faq-23', title: 'Why does the ADF not pick up documents or pick up several sheets?', items: [], answer: 'The most common cause is dirty or worn ADF rollers and separator, sensors or the document feed mechanism.' },
    { id: 'faq-24', title: 'The printer does not scan or scans have streaks — do you repair this?', items: [], answer: '**Yes. In multifunction printers we repair document scanners, carriage mechanisms, sensors and ADFs.**\n\nStreaks or smudges on scans may also be caused by dirty glass or optical parts.' },
    { id: 'faq-25', title: 'The printer is offline, does not connect via Wi-Fi / LAN or the computer cannot see it — do you fix this?', items: [], answer: 'Yes. We check drivers, network configuration, USB/LAN ports, firmware and the printer and computer settings. We also configure network scanning, SMB, e-mail and other functions of multifunction printers.' },
    { id: 'faq-27', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a warranty of 3 to 12 months on completed repairs, depending on the type of work and the parts used.' },
    { id: 'faq-28', title: 'Are parts included in the price?', items: [], answer: 'No. If a service is marked “+ parts”, the price covers labour, and the required parts are charged separately.' },
    { id: 'faq-29', title: 'How much does printer pickup or delivery cost?', items: [], answer: 'Pickup or delivery within 2.5 km of our service centre costs 25 zł net. For longer routes we add 2 zł net for each kilometre above 5 km of the total round trip.' },
  ],
})
