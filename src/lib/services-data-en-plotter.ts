import type { PricingSection } from './services-data-types'
import { dojazdSection, faqSectionEn } from './services-data-en-shared'

export const plotterDojazd = (): PricingSection => {
  const section = dojazdSection()
  section.items = section.items.map((item, i) =>
    i === 2 ? { ...item, service: 'Pickup or delivery beyond 2.5 km from our service centre (surcharge for each kilometre above 5 km of the total route)' } : item
  )
  return section
}

export const plotterKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (without repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the plotter\n• thorough cleaning of the plotter interior, guides, rollers and media path,\n• cleaning and inspection of the carriage, encoder strip and drive parts,\n• cleaning and inspection of the service station and ink supply system,\n• inspection of the print head and the ink system for blockages,\n• inspection and maintenance of mechanical parts; lubrication as recommended by the manufacturer,\n• calibration of the device and a final test of print quality and media feed.',
    },
  ],
}

export const plotterNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: 'plotter-mechanics',
      title: 'Media transport and feed',
      items: [
        { service: 'Clearing jams in the media path\n(paper or material gets stuck during printing)' },
        { service: 'Adjusting the media transport path\n(skewed feeding, skewed prints)' },
        { service: 'Cleaning and adjusting transport rollers\n(slipping, uneven or intermittent feed)' },
        { service: 'Replacing transport rollers\n(worn rollers, material pickup problems)' },
        { service: 'Repairing the roll feed mechanism\n(material is not picked up or unwound)' },
        { service: 'Replacing the roll feed mechanism\n(damaged roll feed or unwinding mechanism)' },
        { service: 'Repairing the paper cutter\n(paper is not cut or jams during cutting)' },
        { service: 'Replacing the paper cutter\n(blunt, chipped or broken blade, damaged cutter carriage)' },
      ],
    },
    {
      id: 'plotter-carriage',
      title: 'Carriage and drive mechanism',
      items: [
        { service: 'Cleaning and maintaining the carriage rail\n(noisy operation, uneven carriage movement)' },
        { service: 'Replacing the carriage drive belt\n(skipping, noise or no carriage movement)' },
        { service: 'Replacing the encoder\n(positioning errors, uneven or shifted print)' },
        { service: 'Replacing the carriage signal ribbon cable\n(print head communication errors, interrupted operation)' },
        { service: 'Repairing the carriage drive\n(the carriage does not move or stops during operation)' },
        { service: 'Replacing the carriage drive motor\n(no movement, drive errors or the carriage stopping)' },
        { service: 'Replacing the carriage\n(damaged mechanism or print head mounting)' },
      ],
    },
    {
      id: 'plotter-ink',
      title: 'Print head and ink system',
      items: [
        { service: 'Cleaning / unclogging the print head\n(missing lines, colours or nozzles)' },
        { service: 'Restorative print head flushing\n(dried-out print head, missing nozzles or persistent print gaps despite standard cleaning)' },
        { service: 'Replacing the print head\n(damaged print head, persistent print problems)' },
        { service: 'Cleaning / restoring the service station\n(print head drying out, streaks, cleaning problems)' },
        { service: 'Replacing the service station\n(the print head is not cleaned or parked correctly)' },
        { service: 'Removing air from the ink system\n(air in the tubes, intermittent printing)' },
        { service: 'Flushing the ink system\n(dried or contaminated ink)' },
        { service: 'Repairing the ink supply system / dampers / tubes\n(no ink flow, air in the system, uneven colour or a print head supply problem)' },
        { service: 'Replacing the ink supply system\n(damaged ink delivery system)' },
      ],
    },
    {
      id: 'plotter-electronics',
      title: 'Electronics, power supply and sensors',
      items: [
        { service: 'Replacing sensors\n(paper, cover, position or movement errors)' },
        { service: 'Repairing wiring and connections\n(random errors, communication dropouts)' },
        { service: 'Repairing the power supply\n(the plotter does not start or switches off during operation)' },
        { service: 'Replacing the power supply\n(no power or a damaged power module)' },
        { service: 'Repairing the control board\n(no communication, electronics or control errors)' },
        { service: 'Replacing the control board\n(damaged mainboard or control module)' },
      ],
    },
    {
      id: 'plotter-calibration',
      title: 'Calibration and print quality',
      items: [
        { service: 'Media advance calibration\n(shifts, uneven spacing or skew)' },
        { service: 'Print head and positioning calibration\n(misaligned lines, outlines or colours)' },
        { service: 'ICC colour profiling\n(incorrect colour reproduction or the need to match the plotter to a specific ink and media)' },
        { service: 'Print quality check and settings correction\n(drop in quality without a fault — material, density or speed settings)' },
      ],
    },
    {
      id: 'plotter-software',
      title: 'Software and configuration',
      items: [
        { service: 'Firmware update\n(software errors or stability problems)' },
        { service: 'Installing / configuring drivers\n(the computer does not see the plotter or prints incorrectly)' },
        { service: 'Network configuration\n(no connection to the plotter over the network)' },
        { service: 'Configuring RIP software\n(problems with sending jobs, media and colour settings, or communication with the plotter)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// Printer rental
// -------------------------------------------------------

export const plotterFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the plotter repair process look like?', items: [], answer: 'First we carry out an initial diagnosis and identify the likely cause of the fault. Then we carry out a full diagnosis and give you the exact repair cost and turnaround time. We start the repair only after the customer\'s approval.' },
    { id: 'faq-2', title: 'How much does a plotter diagnosis cost?', items: [], answer: 'The initial diagnosis online and when you bring the device to our service centre is free. The full diagnosis is also free if we carry out the repair. If you decide not to go ahead with the repair, the full diagnosis costs 150 zł net.' },
    { id: 'faq-3', title: 'How long does a plotter repair take?', items: [], answer: 'Most standard repairs are completed within 1–3 working days. More complex electronics repairs or waiting for parts may extend this time. We give you the exact turnaround time after the diagnosis.' },
    { id: 'faq-4', title: 'Which plotter brands do you service?', items: [], answer: 'We service plotters from many manufacturers, including HP, Canon, Epson, Roland, Mimaki, Mutoh and others. Before accepting a device, we can confirm that the specific model can be repaired and that parts are available.' },
    { id: 'faq-5', title: 'Is it worth repairing an older plotter?', items: [], answer: 'It depends on the type of fault, the condition of the device, the availability of parts and the cost of the repair. After the diagnosis we tell you whether the repair makes economic sense. If we think it does not, we will tell you before any work begins.' },
    { id: 'faq-6', title: 'Do I have to bring the plotter to your service centre?', items: [], answer: 'You don\'t have to, but if you can transport it safely, you can bring the plotter directly to our service centre. If transport is difficult, you can order a pickup from us according to the price list.' },
    { id: 'faq-7', title: 'How much does plotter pickup or delivery cost?', items: [], answer: 'Within 2.5 km of our service centre, pickup or delivery costs 60 / 100 / 150 zł net for a small, medium and large plotter respectively. For longer routes we add 2 zł for each kilometre above the first 5 km of the total route.' },
    { id: 'faq-8', title: 'How should I prepare the plotter for transport?', items: [], answer: 'Contact us before transport. Depending on the model, we will advise you how to secure the print head, carriage, ink and moving parts of the device to reduce the risk of damage in transit.' },
    { id: 'faq-9', title: 'Are parts included in the repair price?', items: [], answer: 'No. If a service is marked “+ parts”, the price covers labour, and the required parts are charged separately. We tell you their cost before starting the repair.' },
    { id: 'faq-10', title: 'What parts do you use?', items: [], answer: 'Depending on the model and availability, we use suitable service parts. Before the repair we inform the customer about the type and cost of the parts to be used.' },
    { id: 'faq-11', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a warranty of 3 to 12 months on completed repairs, depending on the type of work carried out and the parts used.' },
    { id: 'faq-12', title: 'Why do streaks or smears appear on prints?', items: [], answer: 'The cause may be a dirty or clogged print head, or a problem with the ink system, service station, calibration or media advance. During the diagnosis we identify the specific cause before carrying out the repair.' },
    { id: 'faq-13', title: 'Why is one colour or some of the nozzles missing?', items: [], answer: 'The most common cause is a clogged or dried-out print head, air in the ink system, damaged dampers or an ink flow problem. Depending on the condition, we carry out cleaning, flushing, air removal or replacement of the damaged part.' },
    { id: 'faq-25', title: 'Why does the plotter not draw ink even though the tanks are full?', items: [], answer: 'The cause may be air in the tubes, damaged dampers, the pump, the service station or a leak in the ink system.' },
    { id: 'faq-14', title: 'When does the print head need to be replaced?', items: [], answer: 'Replacement is needed when the print head is permanently damaged or worn, and proper cleaning and unclogging do not restore print quality. We always check first whether the print head can be saved.' },
    { id: 'faq-24', title: 'What is the difference between regular print head cleaning and restorative flushing?', items: [], answer: 'Standard cleaning removes light dirt and partial clogging. We use restorative flushing for badly dried-out print heads or persistently missing nozzles.' },
    { id: 'faq-28', title: 'The plotter shows a print head error — does the head always need replacing?', items: [], answer: 'No. First we check for clogging, the electronics, connections, the ink system and the condition of the print head itself. Replacement is needed only if it is permanently damaged.' },
    { id: 'faq-15', title: 'Why does the media move skewed or wrinkle?', items: [], answer: 'Most often the problem is with the rollers, guides, advance settings, a dirty media path or incorrect feed calibration.' },
    { id: 'faq-16', title: 'Why is the carriage noisy or stopping during operation?', items: [], answer: 'A possible cause is a dirty rail, a worn belt, the encoder, the motor or a mechanical blockage of the carriage.' },
    { id: 'faq-17', title: 'The plotter shows an error but still starts — can I keep using it?', items: [], answer: 'It depends on the type of error. Continuing to work with a mechanical, ink system or electronics fault may cause further damage. It is best to send us the error code or a photo of the message for an initial diagnosis.' },
    { id: 'faq-18', title: 'The plotter does not turn on — what could be the cause?', items: [], answer: 'The problem may be with the power supply, control board, wiring or another electronic component. After the diagnosis we determine whether the component can be repaired or needs to be replaced.' },
    { id: 'faq-19', title: 'Do print quality problems always mean a fault?', items: [], answer: 'No. Some problems are caused by incorrect calibration, material settings, colour profile, driver or RIP. We check both the technical condition of the plotter and the settings that affect print quality.' },
    { id: 'faq-26', title: 'Why do the colours on the print differ from the design?', items: [], answer: 'The cause may be an incorrect ICC profile, RIP settings, a different type of ink or media, or a lack of colour calibration.' },
    { id: 'faq-27', title: 'Do you create ICC profiles for plotters?', items: [], answer: 'Yes. A profile can be prepared for a specific plotter, ink and media to improve colour reproduction and consistency.' },
    { id: 'faq-20', title: 'Do you configure RIP and media settings?', items: [], answer: 'Yes. We configure RIP parameters, communication with the plotter, material settings and basic colour parameters.' },
    { id: 'faq-21', title: 'How often should a plotter be maintained?', items: [], answer: 'The frequency depends on how intensively it is used, the type of ink and the operating conditions. For regularly used devices it is worth carrying out periodic inspection and maintenance before problems with the print head, media feed or mechanics appear.' },
    { id: 'faq-22', title: 'What does full plotter maintenance include?', items: [], answer: 'It includes cleaning the interior and the media path, inspecting the carriage, drive, service station and ink system, inspecting mechanical parts, calibration, and a final test of printing and media feed.' },
  ],
})
