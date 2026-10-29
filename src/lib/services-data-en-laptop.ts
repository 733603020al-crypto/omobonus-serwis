import type { PricingSection } from './services-data-types'
import { dojazdSection, faqSectionEn } from './services-data-en-shared'

export const laptopDiagnostaSection = (): PricingSection => ({
  id: 'diagnoza',
  title: 'Diagnosis and quote',
  status: 'Free',
  items: [
    {
      service: 'Initial online consultation, up to 15 min (describe the problem via WhatsApp, the form or by phone)',
    },
    {
      service: 'Initial check when we receive the device (a quick check of the symptoms and an initial assessment; does not replace a full diagnosis)',
    },
    {
      service: 'Full diagnosis and repair quote\n(free if you order the repair or if we can’t find the cause of the fault)',
    },
    {
      service: 'Full diagnosis and repair quote\n(only if you decide not to go ahead after the full diagnosis)',
    },
    {
      service: 'Written technical report\n(in addition to the full diagnosis, with photo documentation)',
    },
    {
      service: 'Urgent service (where possible, we speed up the repair at no extra charge)',
    },
  ],
})

export const laptopDojazdSection = (): PricingSection => ({
  ...dojazdSection(),
  items: [
    {
      service: 'Pickup of the device from the customer (up to 2.5 km from our service centre; 5 km in total, both ways)',
    },
    {
      service: 'Delivery of the repaired device to the customer (up to 2.5 km from our service centre; 5 km in total, both ways)',
    },
    {
      service: 'Pickup or delivery beyond 2.5 km from our service centre (round trip; extra charge after the first 5 km)',
    },
    {
      service: 'Urgent service (where possible, we handle your pickup or delivery first)',
    },
  ],
})

export const laptopKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE — STANDARD LAPTOP cleaning of the interior and cooling system, replacement of thermal materials\n• disassembly and thorough cleaning of the cooling system,\n• cleaning of fans, heatsinks and air vents,\n• replacement of thermal paste on the CPU/GPU,\n• inspection and, if needed, replacement/fitting of thermal pads,\n• check of fan operation,\n• cleaning of the casing and keyboard,\n• reassembly and a temperature and stability test.',
    },
    {
      service: 'CLEANING AND MAINTENANCE — GAMING LAPTOP extended CPU/GPU cleaning and replacement of thermal materials\n• thorough cleaning of the extended CPU/GPU cooling system,\n• cleaning of fans, heatsinks and air vents,\n• replacement of thermal paste on the CPU/GPU,\n• inspection and replacement/fitting of thermal pads on VRAM, VRM and other cooled components,\n• reassembly and an extended CPU/GPU stress test with temperature monitoring.',
    },
    {
      service: 'CLEANING AFTER LIQUID DAMAGE disassembly, cleaning and diagnosis of the device\n• disassembly of the laptop and disconnection of the battery,\n• locating traces of liquid and corrosion,\n• thorough cleaning of the motherboard and affected components,\n• removal of liquid residue and corrosion,\n• cleaning of connectors, ports and other affected parts,\n• electronics diagnosis,\n• reassembly and a test of the device’s basic functions.\n\nImportant!!! Please switch off the laptop and remove the battery immediately after a spill.',
    },
  ],
}

export const laptopNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  subcategories: [
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software and operating system',
      items: [
        { service: 'Windows / Linux installation\n(clean system installation, updates and drivers; data is not kept)' },
        { service: 'System installation with data kept\n(the system needs reinstalling, but your documents, photos and files must stay on the computer)' },
        { service: 'macOS installation\n(clean system installation and updates; data is not kept)' },
        { service: 'Software / driver installation and configuration\n(no sound, printer or another device not working, “unknown device” in the system)' },
        { service: 'Windows repair and optimisation\n(start-up problems, boot loops, restarts, freezing or slow performance)' },
        { service: 'System restore from the Recovery partition\n(serious system problems or malware — return to factory settings)' },
        { service: 'Fixing problems after a Windows update / BSOD\n(blue screen, constant restarts, “Automatic Repair” or a black screen after an update)' },
        { service: 'Virus and malware removal\n(pop-up ads, redirects to unknown websites, a changed browser, slowdowns)' },
        { service: 'Windows user password removal / recovery\n(forgotten password, unable to log in; only if legal and possible)' },
        { service: 'Custom Windows configuration\n(setting up the system for the user: accounts, updates, appearance, unnecessary programs, security)' },
        { service: 'Remote IT support\n(over the internet: programs, e-mail, printer, drivers; the computer must start and have internet access)' },
      ],
    },
    {
      id: 'naprawy-bios',
      title: 'BIOS / UEFI and hardware configuration',
      items: [
        { service: 'BIOS / UEFI update / configuration\n(a new version from the manufacturer or a change of settings, e.g. when a new component is not recognised)' },
        { service: 'BIOS repair / recovery after a failed update\n(black screen, no manufacturer logo, restart loop or no response after the update)' },
        { service: 'BIOS / UEFI programming\n(corrupted BIOS firmware — the computer won’t start even though the components work)' },
        { service: 'BIOS / UEFI password removal\n(forgotten password at start-up or for the BIOS settings)' },
        { service: 'BIOS restoration with data kept (serial number, Windows key)\n(when the serial number disappeared or Windows lost its activation after BIOS programming)' },
      ],
    },
    {
      id: 'naprawy-plyta-glowna',
      title: 'Motherboard and electronics',
      items: [
        { service: 'Motherboard repair\n(broken traces, cold solder joints, micro-soldering, damaged electronic components)' },
        { service: 'Motherboard replacement\n(when repairing the board is not possible or not worth it)' },
        { service: 'USB / HDMI / Audio port repair / replacement\n(loose socket, connection only at an angle, the system doesn’t detect the device)' },
        { service: 'CMOS battery replacement\n(date and time reset, BIOS settings lost, “CMOS Battery Failure” message)' },
        { service: 'Motherboard power circuit repair\n(the laptop won’t switch on or doesn’t respond to the button, restarts, keyboard or fan not working)' },
      ],
    },
    {
      id: 'naprawy-bateria',
      title: 'Battery',
      items: [
        { service: 'Laptop battery diagnosis / replacement\n(short battery life, switches off without the charger, not charging or wrong battery level)' },
        { service: 'Internal battery replacement\n(swollen battery, bulging casing or lifting touchpad, battery replacement message)' },
      ],
    },
    {
      id: 'naprawy-zasilanie-ladowanie',
      title: 'Power and charging',
      items: [
        { service: 'Power socket repair / replacement\n(charges only when the plug is pressed in, loose socket, the laptop doesn’t detect the charger)' },
        { service: 'USB-C socket repair / replacement\n(no charging via USB-C, loose or damaged socket, Power Delivery problems)' },
        { service: 'Charging circuit repair\n(“Plugged in, not charging”, the laptop works only on the charger or only on the battery)' },
      ],
    },
    {
      id: 'naprawy-zlacza-podzespoly',
      title: 'Components',
      items: [
        { service: 'RAM replacement / upgrade + stability test\n(freezing, blue screens, restarts or slow performance)' },
        { service: 'Wi-Fi / Bluetooth module replacement\n(networks not detected, dropped connection, Bluetooth not working)' },
        { service: 'Wi-Fi and Bluetooth repair / configuration\n(no connection, slow internet despite a good network, Bluetooth devices won’t pair)' },
        { service: 'Camera / microphone / speaker replacement\n(people on calls hear noise or a quiet voice, crackling, distorted sound or no sound)' },
        { service: 'Optical drive / burner replacement\n(doesn’t read or burn discs, ejects discs, unusual noises)' },
      ],
    },
    {
      id: 'naprawy-chlodzenie',
      title: 'Cooling system',
      items: [
        { service: 'Cooling fan replacement\n(loud rattling or squeaking, overheating, switching off by itself)' },
        { service: 'Heatsink / cooling system replacement\n(overheating and switching off under load, drop in performance)' },
      ],
    },
    {
      id: 'naprawy-dyski-dane',
      title: 'Drives and data',
      items: [
        { service: 'Drive diagnosis — health check and surface test\n(clicking or knocking drive, freezing when opening files, slow system start-up)' },
        { service: 'Data backup\n(securing photos, documents and files before a repair, reinstallation or moving to a new computer)' },
        { service: 'Drive cloning (moving data to a new drive)\n(system, programs and files 1:1 on a new or larger drive, without reinstalling)' },
        { service: 'HDD to SSD replacement + data migration\n(the system takes a long time to start, programs open slowly)' },
        { service: 'SSD replacement / installation (M.2 NVMe / SATA)\n(not enough space for files, installing an additional drive or replacing a damaged SSD)' },
        { service: 'Copying data from a damaged system\n(when Windows fails — documents, photos, videos and other files)' },
      ],
    },
    {
      id: 'naprawy-odzyskiwanie-danych',
      title: 'Data recovery and secure data deletion',
      items: [
        { service: 'Assessment of whether data can be recovered from a damaged storage device\n(checking the cause of the damage, whether the data can be recovered, how long it will take and how much it will cost)', },
        { service: 'Recovery of accidentally deleted data / after formatting\n(deleted files, formatted drive, reinstalled system)', },
        { service: 'Data recovery — logical damage\n(invisible partition, disappearing folders, “the disk needs to be formatted” message)', },
        { service: 'Data recovery from a physically / electronically damaged HDD / SSD\n(the drive clicks, isn’t detected or can’t be read)', },
        { service: 'Permanent data deletion\n(before selling, handing over or disposing of the equipment)', },
      ],
    },
    {
      id: 'naprawy-ekran-obudowa',
      title: 'Screen, hinges and casing',
      items: [
        { service: 'Display panel replacement (standard, no gluing)\n(cracks, stains, lines, flickering or a black screen while the laptop is running)', },
        { service: 'Display cable replacement\n(the image flickers or disappears when you move the lid, vertical or horizontal lines)', },
        { service: 'Screen bezel replacement\n(cracked or broken bezel after a drop or impact)', },
        { service: 'Hinge replacement\n(the lid moves stiffly or unevenly, cracking sounds, loose screen)', },
        { service: 'Hinge mount and casing repair\n(gap between parts of the casing, the casing lifts near the hinge)', },
        { service: 'Replacement of the display back cover or bottom casing\n(cracks or broken pieces after a drop or impact)', },
        { service: 'Replacement or refitting of individual casing parts (screws, mounts, clips)\n(missing or loose screws, unclipped or broken clips, loose individual casing parts)', },
        { service: 'Transferring components to a new casing\n(full disassembly and transfer of the motherboard, cooling, keyboard and other parts to a new casing)', },
      ],
    },
    {
      id: 'naprawy-klawiatura-touchpad',
      title: 'Keyboard, touchpad and controls',
      items: [
        { service: 'Keyboard cleaning + disinfection (no unscrewing / disassembly)\n(removing dust, crumbs and dirt from the keys and gaps, and disinfecting the surface)', },
        { service: 'Cleaning a screwed-in keyboard after liquid damage\n(keys stick, press stiffly or by themselves, the keyboard responds randomly)', },
        { service: 'Cleaning a keyboard built into the casing after liquid damage\n(keys stick, press stiffly or by themselves, the keyboard responds randomly)', },
        { service: 'Cleaning or replacing a single key (if possible)\n(a single key doesn’t respond or needs more force)', },
        { service: 'Keyboard repair or replacement (removable, screwed-in)\n(some keys don’t work, the keyboard responds randomly, damage after a spill)', },
        { service: 'Repair or replacement of a riveted keyboard / keyboard built into the casing (price depends on complexity)\n(some keys don’t work, the keyboard responds randomly, damage after a spill)', },
        { service: 'Touchpad repair or replacement\n(no response to touch, jumping cursor, clicks by itself)', },
        { service: 'Power button repair / replacement\n(the button sinks, doesn’t spring back or has to be pressed hard)' },
      ],
    },
  ],
  items: [],
}

// FAQ only for serwis-laptopow (replaces the shared repair FAQ).
export const laptopFaqSection = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the laptop repair process look like?', items: [], answer: '**We take in the laptop, carry out a diagnosis and give you a quote.**\n\nWe only start the repair once you accept it.\n\nIf needed, we order parts and let you know the timeframe, and after the repair we test the laptop before handing it back.' },
    { id: 'faq-2', title: 'How long does a laptop diagnosis take?', items: [], answer: 'The initial check when we receive the device takes up to 15 minutes. A full diagnosis usually takes 1–2 days.' },
    { id: 'faq-3', title: 'Is the diagnosis free?', items: [], answer: 'Yes — the full diagnosis is **FREE** if you go ahead with the repair.\n\nIf you decide not to go ahead after the full diagnosis, it costs **100 zł**.\n\nThe online consultation and the initial check when we receive the device are always free.' },
    { id: 'faq-4', title: 'Will I know the exact cost before the repair?', items: [], answer: '**Yes. After the diagnosis we tell you the cost of the service and of any parts.**\n\nWe don’t start the repair without your approval, and if it turns out during the work that additional work is needed, we agree it with you first.' },
    { id: 'faq-5', title: 'How long does a laptop repair take?', items: [], answer: 'A standard repair usually takes **1–3 days**.\n\nMotherboard or charging circuit repairs, or waiting for parts, can make it take longer.\n\nThe timeframe for each service is shown in the price list.' },
    { id: 'faq-6', title: 'Do the prices in the price list include spare parts?', items: [], answer: 'Prices without a note cover the service only. If the price says “+ parts” or “+ part”, the spare part is paid for separately — we tell you its cost before the repair.' },
    { id: 'faq-7', title: 'Do you give a warranty on the repair?', items: [], answer: 'Yes. **3–12 months**, depending on the type of repair and the parts replaced.' },
    { id: 'faq-8', title: 'Can the repair affect the manufacturer’s warranty?', items: [], answer: 'If the repair could breach the terms of the manufacturer’s warranty, we tell you before starting work. The decision is always yours.' },
    { id: 'faq-9', title: 'Do you repair laptops of all brands?', items: [], answer: 'Yes. We repair laptops from HP, Dell, Lenovo, ASUS, Acer, MSI, Toshiba, Fujitsu, Samsung and Huawei, among others — including gaming and business models.' },
    { id: 'faq-10', title: 'Is my data safe during the repair?', items: [], answer: 'In most repairs (e.g. replacing the screen, keyboard or fan) we don’t touch your data. If the repair involves a risk of losing it — e.g. reinstalling the system, working on the drive or repairing the motherboard — we tell you in advance and offer a backup.' },
    { id: 'faq-11', title: 'Do I need to back up my data before the repair?', items: [], answer: '**It’s a good idea if the laptop works.**\n\nIf you can’t do it yourself, we will back up your data for 120 zł.\n\nBefore any risky operation, we always ask you about it before starting work.' },
    { id: 'faq-12', title: 'Do you recover data from damaged HDDs and SSDs?', items: [], answer: '**Yes. First we assess whether the data can be recovered (50 zł).**\n\nRecovering data from a physically or electronically damaged storage device costs from 500 zł and usually takes 5–15 days.\n\nIt is not always possible to recover all the data — we tell you the chances before starting work.' },
    { id: 'faq-13', title: 'What should I do immediately after spilling liquid on my laptop?', items: [], answer: '**Switch the laptop off straight away, unplug the charger and — if possible — remove the battery.**\n\nDon’t switch it back on to see if it works.\n\nBring the laptop to our service centre as soon as possible: the sooner, the better the chance of a repair.' },
    { id: 'faq-14', title: 'My laptop still works after a spill — do I need to take it in for service?', items: [], answer: '**Yes. Liquid residue causes corrosion, which can damage the electronics after a few days or weeks.**\n\nCleaning after liquid damage (250 zł) removes the liquid and corrosion before more serious faults appear.' },
    { id: 'faq-15', title: 'My laptop gets very hot or is noisy — what could be the cause?', items: [], answer: 'Most often a dirty cooling system, dried-out thermal paste or a worn fan. Full maintenance helps (200 zł, gaming laptop — 250 zł), and if the fan is damaged — a fan replacement (100 zł + parts).' },
    { id: 'faq-16', title: 'How often should a laptop’s cooling system be cleaned?', items: [], answer: '**Usually every 1–2 years.**\n\nGaming laptops, laptops used heavily or working in dusty surroundings — more often, e.g. once a year.\n\nSigns to watch for are higher temperatures, louder operation and a drop in performance.' },
    { id: 'faq-17', title: 'My laptop doesn’t charge the battery — does the battery always need replacing?', items: [], answer: 'No. The cause may be the battery, but also the charger, the DC or USB-C socket, or the charging circuit on the motherboard.\n\nWe first find out what is damaged, so that we don’t replace working parts.' },
    { id: 'faq-18', title: 'My laptop won’t switch on — what could be damaged?', items: [], answer: 'Most often the charger, the power socket, the battery, the power circuit on the motherboard or the BIOS — or the effects of liquid damage. We identify the exact cause during the diagnosis and tell you the cost before the repair.' },
    { id: 'faq-19', title: 'The display panel is cracked or there are lines on the screen — can the screen be replaced?', items: [], answer: '**Yes. Display panel replacement costs 180 zł + part.**\n\nLines or no backlight can also mean a damaged signal cable (150 zł + part), so we check the cause before replacing anything.' },
    { id: 'faq-20', title: 'Is it worth replacing the HDD with an SSD or upgrading the RAM in an older laptop?', items: [], answer: '**Usually yes — it is one of the cheapest ways to speed up an older laptop.**\n\nReplacing an HDD with an SSD with data migration costs 150 zł + parts, and a RAM upgrade costs 70 zł + parts.\n\nWe check in advance which components the model supports.' },
    { id: 'faq-21', title: 'Is it worth repairing an older laptop, or is it better to buy a new one?', items: [], answer: 'It depends on the fault, the cost of parts and the overall condition of the laptop. After the diagnosis we will tell you openly whether the repair is worth it — if not, we won’t suggest it.' },
    { id: 'faq-22', title: 'Can I bring the laptop in myself, order a pickup or send it by courier?', items: [], answer: 'Yes, any of these options is possible.\n\nYou can bring the laptop to our service centre in Wrocław. Pickup or delivery within 2.5 km of our service centre costs **25 zł**, beyond that — **25 zł + 2 zł/km**.\n\nYou can also send the laptop by courier — we will send you instructions on how to pack it safely, and after the repair we will send the device back.' },
  ],
})

// -------------------------------------------------------
// Desktop computer service
// -------------------------------------------------------
