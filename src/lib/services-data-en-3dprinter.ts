import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const printer3dKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repairs)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE [[comprehensive ]]cleaning, inspection and calibration of the 3D printer\n• thorough cleaning of the printer interior, guide rails, lead screws, axes and build plate,\n• **cleaning of the hotend, nozzle and extruder, plus inspection of the filament feed system,**\n• inspection and adjustment of belts, guide rails, bearings and drive mechanisms,\n• lubrication of mechanical parts that need it,\n• inspection of sensors, limit switches, cooling and basic connections,\n• calibration of the bed and axes, followed by a final test print and parameter correction.',
    },
  ],
}

export const printer3dNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and service work',
  subcategories: [
    {
      id: '3d-mechanics',
      title: 'Mechanics and motion system',
      items: [
        { service: 'X / Y / Z axis adjustment and calibration\n(layer shifts, uneven motion, knocking during operation)', },
        { service: 'Belt and tensioner adjustment\n(play, skipping, loss of print accuracy)', },
        { service: 'Belt and tensioner replacement\n(worn or damaged axis drive parts)', },
        { service: 'Bearing and guide wheel replacement\n(play, noise, uneven axis motion)', },
        { service: 'Z-axis service / adjustment\n(axis binding, uneven layers, problems with Z motion)', },
        { service: 'Z-axis lead screw or guide rail replacement\n(bent lead screw, play in the nut, worn or bent Z-axis rail)', },
        { service: 'Stepper motor replacement\n(no axis motion, skipping or noisy operation)', },
      ],
    },
    {
      id: '3d-extruder',
      title: 'Extruder, hotend and filament feed',
      items: [
        { service: 'Filament feed system cleaning\n(filament slipping, irregular feeding)', },
        { service: 'Hotend clog removal\n(clogged nozzle, no or weak filament flow)', },
        { service: 'Nozzle replacement\n(worn or damaged nozzle, lower print quality)', },
        { service: 'Extruder repair\n(filament not fed properly or skipping)', },
        { service: 'AMS / multi-material feeder repair\n(filament jams, is not detected or does not switch properly)', },
        { service: 'Extruder replacement\n(damaged filament feed mechanism)', },
        { service: 'Hotend repair\n(filament leaks, heating or extrusion problems)', },
        { service: 'Hotend replacement\n(damaged or worn hotend assembly)', },
      ],
    },
    {
      id: '3d-heating',
      title: 'Bed, heating and cooling',
      items: [
        { service: 'Heated bed repair\n(bed does not heat up or does not hold temperature)', },
        { service: 'Hotend heater replacement\n(hotend does not heat up or reports a temperature error)', },
        { service: 'Thermistor / temperature sensor replacement\n(incorrect temperature readings, interrupted prints)', },
        { service: 'Fan replacement\n(no cooling, noise or overheating)', },
        { service: 'Part cooling system repair\n(warping, poor bridging or overheated models)', },
      ],
    },
    {
      id: '3d-electronics',
      title: 'Electronics, power and sensors',
      items: [
        { service: 'Mainboard repair\n(no response, resets or control errors)', },
        { service: 'Mainboard replacement\n(damaged control electronics)', },
        { service: 'Power supply repair\n(no power or the printer switches off)', },
        { service: 'Power supply replacement\n(damaged power supply — repair not cost-effective or not possible)', },
        { service: 'Sensor and limit switch replacement\n(axis, homing or levelling errors)', },
        { service: 'Wiring and connector repair\n(interrupted operation, signal loss or instability)', },
        { service: 'Control panel repair\n(no display, touch or panel response)', },
        { service: 'Screen / control panel replacement\n(cracked screen, dead touch or damaged panel module)', },
      ],
    },
    {
      id: '3d-calibration',
      title: 'Calibration and print quality',
      items: [
        { service: 'Bed calibration and levelling\n(first layer problems, poor adhesion)', },
        { service: 'Extruder and flow calibration\n(under-extrusion, over-extrusion or uneven extrusion)', },
        { service: 'Retraction calibration\n(stringing, filament oozing during travel moves)', },
        { service: 'Axis and printer geometry calibration\n(skewing, dimensional errors or layer shifts)', },
        { service: 'PID temperature calibration\n(hotend or bed temperature fluctuations)', },
        { service: 'Material profile calibration\n(problems printing PLA, PETG, ABS, ASA, TPU or other materials)', },
      ],
    },
    {
      id: '3d-software',
      title: 'Software and configuration',
      items: [
        { service: 'Firmware update\n(software errors or problems after an update)', },
        { service: 'Marlin or Klipper installation / configuration\n(control configuration or firmware change)', },
        { service: 'Slicer configuration\n(incorrect parameters or problems preparing prints)', },
        { service: 'Network and remote control configuration\n(OctoPrint, Klipper UI or network access)', },
        { service: 'Configuration backup / restore\n(after a failure, an update or electronics replacement)', },
      ],
    },
    {
      id: '3d-resin',
      title: 'SLA / MSLA / DLP resin printers',
      items: [
        { service: 'Resin vat cleaning and maintenance\n(resin residue, contamination or print problems)', },
        { service: 'FEP / nFEP film replacement\n(damaged, scratched or leaking film)', },
        { service: 'Build platform calibration\n(print does not stick or detaches during printing)', },
        { service: 'LCD screen replacement\n(dead pixels, no curing or damaged screen)', },
        { service: 'UV system repair\n(resin does not cure or the print is incomplete)', },
        { service: 'UV module replacement\n(worn or damaged diodes / UV LED array)', },
        { service: 'Z-axis mechanism repair\n(platform motion problems or uneven layers)', },
      ],
    },
    {
      id: '3d-additional',
      title: 'Modifications and upgrades',
      items: [
        { service: 'Auto-levelling installation and configuration\n(BL-Touch, CR-Touch or a similar system)', },
        { service: 'Extruder upgrade\n(direct drive or a more efficient feed system)', },
        { service: 'Hotend upgrade\n(all-metal or a hotend for higher temperatures)', },
        { service: 'Modification for engineering materials\n(ABS, ASA, nylon, PC, CF/GF fibre-filled materials)', },
        { service: 'Installation of additional sensors and modules\n(filament sensor, camera, ADXL, additional control modules)', },
      ],
    },
  ],
  items: [],
}

export const printer3dFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'How does the 3D printer repair process work?', items: [], answer: 'First we carry out an initial diagnosis, then a full diagnosis of the device, and give you the exact cost and repair time. We start work only after the customer has approved it.' },
    { id: 'faq-2', title: 'How much does a 3D printer diagnosis cost?', items: [], answer: '**The initial diagnosis online and when you bring the device in is free.**\n\nThe full diagnosis is also free if we carry out the repair.\n\nIf you decide not to go ahead, the full diagnosis costs 150 zł net.' },
    { id: 'faq-3', title: 'How long does a repair take?', items: [], answer: 'Most standard repairs are done within 1–3 working days. It may take longer with complex electronics faults or when parts need to be ordered.' },
    { id: 'faq-4', title: 'Which 3D printer technologies do you service?', items: [], answer: 'We service FDM filament printers and SLA / MSLA / DLP resin printers. The scope of repairs depends on the technology and design of the specific device.' },
    { id: 'faq-5', title: 'Which brands do you service?', items: [], answer: 'We service Bambu Lab, Prusa, Creality, Anycubic, Elegoo, Zortrax, FlashForge and other popular brands. Before accepting the device, we can confirm whether a specific model can be repaired.' },
    { id: 'faq-6', title: 'Is it worth repairing a cheap or older 3D printer?', items: [], answer: 'It depends on the type of fault, the price of parts and the value of the device. After the diagnosis we tell you whether the repair makes economic sense.' },
    { id: 'faq-7', title: 'Are parts included in the price?', items: [], answer: 'If a service is marked “+ parts”, the price shown covers labour and parts are charged separately. We tell you their cost before the repair.' },
    { id: 'faq-8', title: 'Do you give a warranty on repairs?', items: [], answer: 'Yes. We give a warranty of 3 to 12 months on completed repairs, depending on the type of work and the parts used.' },
    { id: 'faq-9', title: 'Do I have to bring the printer to the service centre?', items: [], answer: 'No, you don’t. If you can transport the device safely, you can bring it in yourself. If transport is difficult, you can order a pickup according to the price list.' },
    { id: 'faq-10', title: 'Why is the printer not feeding filament?', items: [], answer: 'The cause may be a clogged nozzle, a dirty or damaged extruder, incorrect filament tension, or a problem with the hotend or the feed motor.' },
    { id: 'faq-25', title: 'My Bambu Lab printer has a problem with the AMS — do you repair that?', items: [], answer: 'Yes. We service AMS and AMS lite systems, including feed mechanisms, filament sensors, guides, and problems with loading and switching material.' },
    { id: 'faq-11', title: 'Why does the filament skip in the extruder?', items: [], answer: 'Most often this is caused by a clogged hotend, too low a temperature, excessive filament resistance or a problem with the extruder mechanism.' },
    { id: 'faq-12', title: 'Why does the first layer not stick to the bed?', items: [], answer: 'The cause may be incorrect levelling, wrong nozzle height, a dirty bed surface, the wrong temperature or incorrect first layer settings.' },
    { id: 'faq-13', title: 'Why do layers shift during printing?', items: [], answer: 'The most common causes are incorrect belt tension, mechanical play, a problem with the guide rails or a stepper motor, or too high a speed or acceleration.' },
    { id: 'faq-14', title: 'Why is there stringing on the print?', items: [], answer: 'Stringing can be caused by incorrect retraction, temperature, damp filament or slicer settings. We check both the mechanics and the print parameters.' },
    { id: 'faq-15', title: 'Why does the hotend not heat up or show the wrong temperature?', items: [], answer: 'The problem may be the heater, the thermistor, the wiring, the control board or the firmware configuration.' },
    { id: 'faq-16', title: 'Why does the heated bed not reach temperature?', items: [], answer: 'The cause may be the bed heater, the temperature sensor, the power supply, the wiring or the control electronics.' },
    { id: 'faq-17', title: 'The printer makes unusual noises when moving — what do you check?', items: [], answer: 'We check the belts, tensioners, wheels, bearings, guide rails, Z-axis lead screws and stepper motors.' },
    { id: 'faq-18', title: 'Can the problem be caused only by slicer or firmware settings?', items: [], answer: 'Yes. Not every problem means a mechanical fault. A wrong material profile, slicer, firmware or calibration can cause symptoms similar to printer damage.' },
    { id: 'faq-19', title: 'Do you configure Klipper, Marlin and slicers?', items: [], answer: 'Yes. We install and configure firmware, Klipper / Marlin, slicers, material profiles and remote control.' },
    { id: 'faq-20', title: 'Do you carry out modifications and upgrades?', items: [], answer: 'Yes. We install auto-levelling, upgraded extruders, hotends, sensors and additional modules, among others.' },
    { id: 'faq-21', title: 'Why does the resin print not stick to the platform?', items: [], answer: 'The most common causes are incorrect platform levelling, the wrong exposure time, a problem with the FEP/nFEP film or the condition of the resin.' },
    { id: 'faq-22', title: 'When does the FEP / nFEP film need replacing?', items: [], answer: 'When it is damaged, punctured, heavily scratched or cloudy, or when it causes problems with peeling off successive layers.' },
    { id: 'faq-23', title: 'How can I tell if the LCD screen in a resin printer is damaged?', items: [], answer: 'Typical symptoms are no curing in part of the build area, dead zones, stripes or recurring gaps in models. We test the screen before deciding on a replacement.' },
    { id: 'faq-24', title: 'How do I prepare a 3D printer for transport?', items: [], answer: '**Contact us before transport.**\n\nOn an FDM printer, the moving parts, the bed and the print head must be secured.\n\nOn a resin device, the resin must be emptied from the vat and the vat, platform and Z axis secured.' },
    { id: 'faq-26', title: 'How much does pickup or delivery of a 3D printer cost?', items: [], answer: 'Pickup or delivery within 2.5 km of the service centre costs 25 zł net. For a longer route we add 2 zł net for every kilometre above 5 km of the total round trip.' },
    { id: 'faq-27', title: 'How often should a 3D printer be maintained?', items: [], answer: 'With daily printing we recommend maintenance every 3–6 months, and sooner if knocking, layer shifts, first layer problems or uneven extrusion appear.' },
  ],
})
