import type { PricingSection } from './services-data-types'
import { diagnostaSection, dojazdSection } from './services-data-en-shared'
import { kawaRepairSubcategories } from './services-data-kawa-repairs'

// serwis-ekspresow-do-kawy — EN version, synchronised with PL (services-data-kawa.ts).
export const KAWA_PRICE_TOOLTIP_EN =
  'Net prices for labour, excluding parts. With full maintenance, standard cleaning fluids and small service materials are included in the price. Turnaround time does not include waiting for parts.'

export const kawaKonserwacjaEn: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE Cleaning, maintenance and replacement of standard seals\n• descaling the water system;\n• cleaning the coffee system;\n• cleaning and maintaining the brewing unit;\n• cleaning the grinder, with adjustment if needed;\n• cleaning the milk system;\n• cleaning the spouts, nozzles and drains;\n• cleaning the inside of the machine;\n• checking the seals, valves and watertightness;\n• lubricating the mechanisms and replacing standard seals and O-rings;\n• checking the brewing parameters and a function test.\nThe scope of work depends on the design of the machine.',
          },
  ],
  notes: [
    'Included in the price: professional cleaning and descaling agents, food-safe lubricants, standard seals and O-rings, and small service materials.',
    'Charged extra: water filters, specialist seal kits, damaged spare parts and repairs — after prior approval by the customer.',
  ],
}

export const kawaNaprawyEn: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  items: [],
}

// This page's pickup and delivery: 2 zł/km for the whole round trip beyond the first 5 km
const kawaDojazdEn = (): PricingSection => {
  const section = dojazdSection()
  section.items = section.items.map((item, index) => (index === 2 ? { ...item, service: 'Pickup or delivery over 2.5 km from the service centre (2 zł for each additional km of the whole round trip beyond the first 5 km)' } : item))
  return section
}

const kawaCoffeeFaqEn = (): PricingSection => ({
  id: 'faq',
  title: 'Frequently asked questions (FAQ)',
  items: [],
  subcategories: [
    { id: 'faq-1', title: "How much does a coffee machine repair cost?", items: [], answer: "You will find the prices of individual repairs in our price list. The cost depends on the type of fault and the class of the machine: home, office or professional. The prices shown are net, and any spare parts needed are charged separately." },
    { id: 'faq-2', title: "Is the coffee machine diagnosis free?", items: [], answer: "Yes, the diagnosis is free if you go ahead with the repair. If you decline, it costs 80 zł net for home machines, 120 zł net for office and premium machines, and 180 zł net for professional and catering machines." },
    { id: 'faq-3', title: "Will I know the cost of the repair before work starts?", items: [], answer: "Yes. After the diagnosis we give you the scope of the repair and the cost of labour and the parts needed. We only carry out additional paid work with your approval." },
    { id: 'faq-4', title: "How long does a coffee machine repair take?", items: [], answer: "The price list gives an approximate turnaround time for each service, usually in working days. This is the expected time until you can collect a working machine, not the time the technician spends working on it. Parts availability may extend it." },
    { id: 'faq-5', title: "Do you repair home, office and catering coffee machines?", items: [], answer: "Yes, our service covers home, office and premium machines as well as professional and catering machines. Whether a specific device can be repaired depends on its brand, model and the type of fault." },
    { id: 'faq-6', title: "Do you repair espresso (portafilter) machines?", items: [], answer: "Yes, including espresso (portafilter) machines, both home and professional. Among other things, we repair pumps, valves, boilers and brew groups." },
    { id: 'faq-7', title: "Is it worth repairing an old or cheap coffee machine?", items: [], answer: "It depends on the value of the device, the type of fault and the cost of parts. If a repair is not worth it, we tell you before starting work. The final decision is yours." },
    { id: 'faq-8', title: "Why does the coffee machine not draw water?", items: [], answer: "The cause may be air in the circuit, a blocked hose, or a damaged pump, flow meter or valve. We first find the source of the problem and then choose the right repair." },
    { id: 'faq-9', title: "Why does coffee come out very slowly, or why does the machine have low pressure?", items: [], answer: "The problem may be caused by a blocked water system, a worn pump, a damaged valve or incorrectly ground coffee. We determine the exact cause during the diagnosis." },
    { id: 'faq-10', title: "Why does water collect under the coffee machine?", items: [], answer: "Most often the cause is leaking hoses, worn seals, or damaged fittings or valves. If water is coming out of the housing, it is best to unplug the device and not use it until it has been checked." },
    { id: 'faq-11', title: "Why does the machine not heat water, or make cold coffee?", items: [], answer: "This may mean a fault in the thermoblock, heating element, thermostat, temperature sensor or control system. We check the parts responsible for heating and replace the damaged ones." },
    { id: 'faq-12', title: "What should I do if the grinder does not grind coffee?", items: [], answer: "Check that there are beans in the container and that the mechanism is not blocked. If the grinder hums, stops or runs unusually loudly, the motor, the burrs or the whole unit may need repairing." },
    { id: 'faq-13', title: "Why does the coffee machine not froth milk?", items: [], answer: "The cause is often a blocked nozzle, a dirty milk system, a leaking hose or a damaged valve. If normal cleaning does not help, we check the parts responsible for drawing in and frothing the milk." },
    { id: 'faq-14', title: "What should I do if the coffee machine shows an error?", items: [], answer: "Write down the message text or code and the model of the device. Different errors may point to problems with the brewing unit, sensors, water flow or electronics. We do not recommend repeatedly restarting the device if the mechanism is blocked." },
    { id: 'faq-15', title: "Why does the brewing unit jam?", items: [], answer: "The cause may be a damaged drive, worn gears, a leaking piston or a mechanical blockage of the brewing unit. Do not pull the unit out by force — this may cause further damage." },
    { id: 'faq-16', title: "Do you repair electronics and control panels?", items: [], answer: "Yes, our service covers diagnostics and repair of electronic circuits, power supplies, displays and control panels. Whether a repair or replacement is possible depends on the type of damage and the availability of components." },
    { id: 'faq-17', title: "Do you remove limescale and deposits from inside the machine?", items: [], answer: "Yes. Cleaning, descaling and maintenance are services separate from repairs. If limescale has blocked a hose or damaged a component, additional unclogging or a repair may be needed." },
    { id: 'faq-18', title: "What is the difference between maintenance and repair of a coffee machine?", items: [], answer: "Maintenance covers work that prevents breakdowns, such as cleaning, descaling, checking the seals and servicing the mechanisms. A repair means fixing a specific fault or replacing a damaged part." },
    { id: 'faq-19', title: "Do I have to pay extra for tests after the repair?", items: [], answer: "We do not charge separately for the standard tests needed to check that the repaired component works properly. They are part of the repair." },
    { id: 'faq-20', title: "Are spare parts included in the repair price?", items: [], answer: "No. Repair prices in the price list cover the work carried out and are given net. We give you the cost of the spare parts needed separately, before starting the repair." },
    { id: 'faq-21', title: "Do you use original spare parts?", items: [], answer: "We choose parts suitable for the brand and model of the device. If different part options are available, we present them and include them in the quote before the repair." },
    { id: 'faq-22', title: "Can I send my coffee machine for repair by courier from another city?", items: [], answer: "Yes, we accept coffee machines from all over Poland. You can book a courier and send the device to our service centre in Wrocław. Before sending, empty the machine of water, milk and coffee beans and pack it carefully for transport." },
    { id: 'faq-23', title: "Do you repair coffee machines in offices, cafés and restaurants?", items: [], answer: "Yes, we also service devices used in businesses and catering. For larger machines, the scope of the repair and the possibility of working on site are agreed individually." },
    { id: 'faq-24', title: "Do you give a warranty on the repair?", items: [], answer: "We give a 6-month service warranty on the repair carried out. The warranty covers the work done and the fault that was repaired. It does not cover other failures unrelated to the repair." },
    { id: 'faq-25', title: "Can I bring in a coffee machine that has never been serviced before?", items: [], answer: "Yes. We also accept coffee machines that have not had regular maintenance. We first check the condition of the device and the cause of the fault, and then present the scope of work needed and its cost." },
    { id: 'faq-26', title: "Can I get the replaced parts back after the repair?", items: [], answer: "Yes. After the repair we return the replaced parts to the customer, so you can see which parts were replaced. Transparency and honesty matter to us — we tell you exactly what work was done and which spare parts were used." },
  ],
})

export const kawaPricingSectionsEn = (): PricingSection[] => [
  diagnostaSection(),
  kawaDojazdEn(),
  kawaKonserwacjaEn,
  { ...kawaNaprawyEn, subcategories: kawaRepairSubcategories('en') },
  kawaCoffeeFaqEn(),
]
