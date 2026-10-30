import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const desktopKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Cleaning and maintenance (no repair)',
  mobileOpenTitle: 'Cleaning\u00a0and maintenance',
  items: [
    {
      service: 'CLEANING AND MAINTENANCE — STANDARD COMPUTER cleaning of the interior and cooling system, replacement of thermal materials\n• thorough cleaning of the inside of the case, filters, fans and heatsinks,\n• cleaning of the processor cooling system,\n• replacement of thermal paste on the CPU,\n• inspection and, if needed, replacement / fitting of thermal pads,\n• check of fans and airflow,\n• reassembly and a temperature and stability test.',
    },
    {
      service: 'CLEANING AND MAINTENANCE — GAMING COMPUTER extended CPU/GPU cleaning and replacement of thermal materials\n• thorough cleaning of the interior, filters, fans and heatsinks,\n• disassembly and maintenance of the CPU cooling system,\n• disassembly and maintenance of the graphics card cooling system,\n• replacement of thermal paste on the CPU and GPU,\n• inspection and, if needed, replacement / fitting of VRAM and VRM thermal pads,\n• check of fans and airflow,\n• extended CPU/GPU stress test and temperature monitoring.',
    },
    {
      service: 'CLEANING AFTER LIQUID DAMAGE disassembly, cleaning and diagnosis of the device\n• disassembly of the computer and disconnection from power,\n• locating traces of liquid and corrosion,\n• thorough cleaning of the motherboard and affected components,\n• removal of liquid residue and corrosion,\n• cleaning of connectors, ports and other affected parts,\n• protecting the cleaned areas against further corrosion, where technically justified,\n• electronics diagnosis,\n• reassembly and a test of the device’s basic functions.\n\nImportant!!! After a spill, disconnect the computer from power immediately and do not switch it on again.',
    },
  ],
}

// FAQ only for serwis-komputerow-stacjonarnych.
export const desktopFaqSection = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does the desktop computer repair process look like?', items: [], answer: 'First we carry out a diagnosis and give you a quote. We only start the repair once you accept the cost.' },
    { id: 'faq-2', title: 'How long does a computer diagnosis take?', items: [], answer: 'A full diagnosis usually takes **1–2 days**.' },
    { id: 'faq-3', title: 'Is the diagnosis free?', items: [], answer: 'Yes, if you go ahead with the repair. If you decide not to go ahead after the full diagnosis, it costs **80 zł**.' },
    { id: 'faq-4', title: 'Will I know the exact cost before the repair?', items: [], answer: 'Yes. We confirm the cost before starting any paid work — we don’t start the repair without your approval.' },
    { id: 'faq-5', title: 'How long does a computer repair take?', items: [], answer: 'Standard repairs usually take **1–3 days**. Electronics repairs, data recovery or waiting for parts may take longer.' },
    { id: 'faq-6', title: 'Do the prices in the price list include spare parts?', items: [], answer: 'If the price says “+ parts”, it covers labour only, and the cost of parts is agreed separately.' },
    { id: 'faq-7', title: 'Do you give a warranty on the repair?', items: [], answer: 'Yes. **3–12 months**, depending on the type of repair and the parts replaced.' },
    { id: 'faq-8', title: 'Do you repair computers built from various components?', items: [], answer: 'Yes — including self-built computers and gaming PCs.' },
    { id: 'faq-9', title: 'My computer won’t switch on at all — what could be the cause?', items: [], answer: 'The cause may be, among other things, the power supply, the POWER button, the motherboard, a short circuit or another damaged component. We identify the exact cause during the diagnosis.' },
    { id: 'faq-10', title: 'My computer starts, but there is no picture — what could be damaged?', items: [], answer: 'It may be, among other things, the graphics card, the RAM, the motherboard, a cable or the monitor. No picture alone doesn’t clearly show which component is damaged.' },
    { id: 'faq-11', title: 'My computer restarts or switches off by itself — what could be the cause?', items: [], answer: 'Possible causes include overheating, the power supply, the RAM, the motherboard, drivers or the system.' },
    { id: 'faq-12', title: 'My computer gets very hot or is noisy — what should I do?', items: [], answer: 'It’s worth checking the fans, heatsinks, thermal paste and airflow inside the case.' },
    { id: 'faq-13', title: 'How often should a desktop computer be cleaned?', items: [], answer: 'It depends on the working conditions. If temperatures rise, the computer gets louder or a lot of dust builds up inside — it’s worth having it maintained.' },
    { id: 'faq-14', title: 'Is it worth replacing the HDD with an SSD?', items: [], answer: 'In many older computers, yes — an SSD noticeably speeds up the start-up of the system and programs.' },
    { id: 'faq-15', title: 'Can the RAM be upgraded or the graphics card replaced?', items: [], answer: 'Yes, if the new components are compatible with the motherboard, power supply and case. Before an upgrade, we can check compatibility.' },
    { id: 'faq-16', title: 'Can you upgrade an older computer?', items: [], answer: 'Yes. We can select and install RAM, an SSD, a graphics card, a processor or a power supply, among other things, and then check the stability of the system.' },
    { id: 'faq-17', title: 'Do you build computers from parts supplied by the customer?', items: [], answer: 'Yes. We assemble the computer, connect the components, carry out the basic configuration and test that it works.' },
    { id: 'faq-18', title: 'Is my data safe during the repair?', items: [], answer: 'During hardware repairs we don’t touch your data unless necessary. If a planned step carries a risk of losing it, we tell you in advance.' },
    { id: 'faq-19', title: 'Should I make a backup before handing in my computer?', items: [], answer: 'If the computer works and you are able to — yes. If needed, we can also back up your data.' },
    { id: 'faq-20', title: 'Do you recover data from damaged HDDs and SSDs?', items: [], answer: 'Yes — from accidental deletion and logical damage to more complex cases of damaged storage devices.' },
    { id: 'faq-21', title: 'Is it worth repairing an old computer, or is it better to buy a new one?', items: [], answer: 'It depends on the fault, the specifications of the equipment and the cost of the repair or upgrade. After the diagnosis we tell you the cost, so you can make a decision.' },
    { id: 'faq-22', title: 'Can I bring the computer in myself, order a pickup or send it by courier?', items: [], answer: 'Yes. You can bring the computer in yourself or send it by courier.\n\nPickup or delivery within 2.5 km of our service centre costs **25 zł**, beyond that — **25 zł + 2 zł/km**.' },
  ],
})

export const desktopNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  subcategories: [
    {
      id: 'naprawy-oprogramowanie',
      title: 'Software and operating system',
      items: [
        { service: 'Windows / Linux installation\n(clean system installation, updates and drivers; data is not kept)' },
        { service: 'System installation with data kept\n(the system needs reinstalling, but your documents, photos and files must stay on the computer)' },
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
        { service: 'BIOS restoration with data kept (serial number, Windows key)\n(in branded computers: when the serial number disappeared or Windows lost its activation after BIOS programming)' },
        { service: 'RAID 0 / 1 / 5 / 10 configuration\n(combining several drives into one — for faster performance or to protect data if a drive fails)' },
      ],
    },
    {
      id: 'naprawy-plyta-glowna',
      title: 'Motherboard and electronics',
      items: [
        { service: 'Motherboard repair\n(broken traces, cold solder joints, micro-soldering, damaged electronic components)' },
        { service: 'Motherboard replacement / installation\n(when repairing the board is not possible or not worth it)' },
        { service: 'USB / HDMI / Audio / LAN port repair / replacement\n(loose socket, connection only at an angle, the system doesn’t detect the device)' },
        { service: 'CMOS battery replacement\n(date and time reset, BIOS settings lost, “CMOS Battery Failure” message)' },
      ],
    },
    {
      id: 'naprawy-zasilanie',
      title: 'Power',
      items: [
        { service: 'Power supply replacement\n(the computer won’t switch on, switches off or restarts under load, squealing, burning smell)' },
        { service: 'Power button / front panel repair\n(no response to the button, the button is stuck in, or the computer switches on by itself)' },
      ],
    },
    {
      id: 'naprawy-podzespoly',
      title: 'Components and upgrades',
      items: [
        { service: 'Processor replacement / installation\n(the computer won’t start, freezing, blue screens, restarts under load)' },
        { service: 'Graphics card replacement / installation\n(artefacts, coloured lines, no picture while the computer is running, switching off during games)' },
        { service: 'RAM replacement / upgrade\n(freezing, blue screens, restarts or slow performance)' },
        { service: 'Expansion card replacement / installation\n(e.g. Wi-Fi, LAN, sound card, controller)' },
        { service: 'Wi-Fi and Bluetooth repair / configuration\n(no connection, slow internet despite a good network, Bluetooth devices won’t pair)' },
        { service: 'Optical drive / burner replacement\n(doesn’t read or burn discs, ejects discs, unusual noises)' },
        { service: 'Case replacement / full transfer of components\n(moving all components to a new case, cable management and a function test)' },
        { service: 'Building a computer from the customer’s parts\n(installing the supplied components, cable management, basic BIOS settings and a function test)' },
        { service: 'Computer upgrade\n(selecting and installing several components, e.g. RAM, SSD, graphics card or power supply, together with basic configuration and a test)' },
      ],
    },
    {
      id: 'naprawy-chlodzenie',
      title: 'Cooling system',
      items: [
        { service: 'Cooling fan replacement\n(loud rattling or squeaking, overheating, switching off by itself)' },
        { service: 'Heatsink or CPU cooler replacement / installation\n(high processor temperatures, switching off or slowing down under load, noisy operation)' },
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
        { service: 'Assessment of whether data can be recovered from a damaged storage device\n(checking the cause of the damage, whether the data can be recovered, how long it will take and how much it will cost)' },
        { service: 'Recovery of accidentally deleted data / after formatting\n(deleted files, formatted drive, reinstalled system)' },
        { service: 'Data recovery — logical damage\n(invisible partition, disappearing folders, “the disk needs to be formatted” message)' },
        { service: 'Data recovery from a physically / electronically damaged HDD / SSD\n(the drive clicks, isn’t detected or can’t be read)' },
        { service: 'Permanent data deletion\n(before selling, handing over or disposing of the equipment)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// IT outsourcing
// -------------------------------------------------------
