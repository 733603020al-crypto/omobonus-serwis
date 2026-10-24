import type { PricingSection } from './services-data-types'
import { faqSectionEn } from './services-data-en-shared'

export const outsourcingFaq = (): PricingSection => ({
  ...faqSectionEn(),
  subcategories: [
    { id: 'faq-1', title: 'What does IT outsourcing for a company involve?', items: [], answer: 'It is ongoing, external care of your company’s IT: users, computers, the network, backups and security, and depending on the package also servers / NAS.' },
    { id: 'faq-2', title: 'Which companies is subscription IT support designed for?', items: [], answer: 'For small and medium-sized companies that need ongoing IT support but don’t want to maintain their own full IT department.' },
    { id: 'faq-3', title: 'How does the cooperation start?', items: [], answer: 'We start with a consultation and an analysis of your company’s needs, and then prepare a quote for the scope of support. If needed, we carry out an infrastructure audit before the support begins.' },
    { id: 'faq-4', title: 'Are the consultation and quote free?', items: [], answer: 'Yes. The consultation and the initial subscription quote are free.' },
    { id: 'faq-5', title: 'How much does the infrastructure audit before starting cooperation cost?', items: [], answer: 'The audit costs **200 zł**. We deduct the cost of the audit from the first subscription once ongoing cooperation begins.' },
    { id: 'faq-6', title: 'What IT outsourcing packages do you offer?', items: [], answer: 'We offer three packages:\n• START — **1–5 workstations**\n• BUSINESS — **6–15 workstations**\n• PRO — **16+ workstations**' },
    { id: 'faq-7', title: 'Does the subscription price depend on the number of workstations?', items: [], answer: 'Yes. We charge per workstation per month, and each package has a minimum subscription amount.' },
    { id: 'faq-8', title: 'What are the minimum subscriptions?', items: [], answer: '• START — **500 zł/month**\n• BUSINESS — **900 zł/month**\n• PRO — **1600 zł/month**' },
    { id: 'faq-9', title: 'How many hours of work does the subscription include?', items: [], answer: '• START — up to **3 h/month**\n• BUSINESS — up to **8 h/month**\n• PRO — up to **15 h/month**' },
    { id: 'faq-10', title: 'What happens when the hour limit is exceeded?', items: [], answer: 'Additional work beyond the package limit costs **180 zł/h**.' },
    { id: 'faq-11', title: 'What does “response time” mean?', items: [], answer: 'It is the time until we take up your request, not a guaranteed time to fully resolve the problem.\n• START — up to **4 working hours**\n• BUSINESS — up to **2 working hours**\n• PRO — up to **1 working hour**' },
    { id: 'faq-12', title: 'How can I report a problem?', items: [], answer: 'We accept requests through the contact channels agreed with your company, and we handle most of them remotely.' },
    { id: 'faq-13', title: 'Can most problems be solved remotely?', items: [], answer: 'Yes. We often solve typical problems with the system, software, accounts, configuration or office devices remotely. If physical work is needed, we arrange an on-site visit.' },
    { id: 'faq-14', title: 'Are technician visits included in the subscription?', items: [], answer: '• START — no visits included\n• BUSINESS — **1 visit/month** up to 2 h\n• PRO — **2 visits/month** up to 2 h each' },
    { id: 'faq-15', title: 'How much does an additional visit beyond the package limit cost?', items: [], answer: 'A visit beyond the package limit costs **180 zł/h**.' },
    { id: 'faq-16', title: 'Are parts, equipment and licences included in the subscription?', items: [], answer: 'No. The following are paid for separately:\n• spare parts\n• equipment\n• licences\n• materials\n• third-party services' },
    { id: 'faq-17', title: 'Do you support LAN / Wi-Fi networks and office devices?', items: [], answer: 'Yes, and the scope depends on the package. BUSINESS and PRO include network administration and support for network printers and scanners.' },
    { id: 'faq-18', title: 'Do you look after servers and NAS?', items: [], answer: 'Yes. In the PRO package, server and NAS administration is part of the subscription scope.' },
    { id: 'faq-19', title: 'Do you take care of data backup?', items: [], answer: 'Yes. Depending on the package or service, we monitor or configure backups. It is also worth checking backups regularly to make sure the data can be restored.' },
    { id: 'faq-20', title: 'Does outsourcing include IT security?', items: [], answer: 'Yes. Depending on the package, it includes checking updates, antivirus protection, the firewall and user permissions, as well as infrastructure monitoring.' },
    { id: 'faq-21', title: 'Can I order urgent help outside the standard SLA?', items: [], answer: 'Yes.\n• Urgent intervention outside the standard SLA: **+50%**\n• Work outside service hours / at weekends / on public holidays: **+100%**' },
    { id: 'faq-22', title: 'Can I use IT services without a subscription?', items: [], answer: 'Yes. A company can order one-off interventions and IT services outside the subscription according to the current price list.' },
  ],
})

export const outsourcingKonsultacja: PricingSection = {
  id: 'diagnoza',
  title: 'IT support consultation and quote',
  status: 'Free',
  items: [
    { service: 'Consultation and analysis of your company’s needs\n(a short analysis of the number of workstations, infrastructure, scope of support and company needs)' },
    { service: 'Initial IT subscription quote' },
    { service: 'Infrastructure audit before support begins\n(inventory of workstations, network, servers / NAS, backup and basic security)' },
  ],
  notes: [
    'We deduct the cost of the audit from the first subscription once ongoing cooperation begins.',
  ],
}

export const outsourcingKonserwacja: PricingSection = {
  id: 'konserwacja',
  title: 'Business IT support (monthly subscription)',
  items: [
    {
      service: 'START package — for small companies\n• 1–5 workstations\n• remote helpdesk for users\n• Windows / macOS system updates\n• basic workstation administration\n• checking that antivirus protection and the firewall are up to date\n• checking that backups are working\n• basic help with printers and office devices\n• up to **3 h** of work per month\n• on-site visits: not included\n• minimum subscription: **500 zł/month**',
    },
    {
      service: 'BUSINESS package — for growing companies\n• 6–15 workstations\n• everything in START\n• LAN / Wi-Fi administration\n• configuration of network printers and scanners\n• management of users and permissions\n• support when setting up new workstations\n• up to **8 h** of work per month\n• **1 on-site visit**/month up to 2 h\n• minimum subscription: **900 zł/month**',
    },
    {
      service: 'PRO package — for companies with extensive infrastructure\n• 16+ workstations\n• everything in BUSINESS\n• server and NAS administration\n• infrastructure monitoring\n• management of users and permissions\n• monthly IT status report\n• priority support\n• up to **15 h** of work per month\n• **2 on-site visits**/month up to 2 h each\n• minimum subscription: **1600 zł/month**',
    },
  ],
  notes: [
    'Beyond the hour limit: **180 zł/h**',
    'Visits beyond the package limit: **180 zł/h**',
    'Urgent intervention outside the standard SLA: **+50%**',
    'Work outside service hours / weekends / public holidays: **+100%**',
    'Paid separately: spare parts, equipment, licences, materials, third-party services.',
    'A basic monthly IT status report is included in the PRO package. The “IT audit and optimisation” group is for one-off orders, extended audits and companies without a subscription.',
  ],
}

export const outsourcingNaprawy: PricingSection = {
  id: 'naprawy',
  title: 'Repairs and services',
  footer: 'IT interventions and services outside the subscription',
  subcategories: [
    {
      id: 'naprawy-serwis-ogolny',
      title: 'General service (technician’s work at the customer’s premises)',
      items: [
        { service: 'Technician visit to the customer\n(diagnosis, configuration and troubleshooting at the company’s premises)' },
        { service: 'Each additional started hour of work\n(continuation of a repair, configuration or implementation)' },
        { service: 'Remote support\n(online diagnosis and configuration of the system, office devices and software)' },
        { service: 'Urgent intervention\n(fast support in sudden failures – surcharge on the base rate)' },
        { service: 'Work outside hours / weekends / public holidays\n(carrying out jobs outside our service hours – surcharge on the base rate)' },
      ],
    },
    {
      id: 'naprawy-sprzet-na-miejscu',
      title: 'Computer hardware repairs (on site at the customer’s premises)',
      items: [
        { service: 'Power supply / drive / RAM replacement at the customer’s premises\n(replacing damaged components or upgrading them directly at the company’s premises)' },
        { service: 'Cleaning of the computer interior and cooling\n(removing dust and dirt – better performance and component cooling)' },
        { service: 'Fan / CPU cooler replacement\n(installing a new cooling system or replacing a faulty fan)' },
        { service: 'CPU thermal paste replacement\n(renewing the thermal contact for better heat dissipation)' },
        { service: 'Workstation / terminal maintenance\n(cleaning, checking connections, stability test – keeping the equipment in working order)' },
        { service: 'Setting up a new workstation\n(connecting the computer, monitor and peripherals, plus basic configuration)' },
      ],
    },
    {
      id: 'naprawy-siec-konfiguracja',
      title: 'Configuration and office network',
      items: [
        { service: 'LAN / Wi-Fi network diagnosis and configuration\n(connection analysis, fixing communication errors, optimising company network settings)' },
        { service: 'Router / access point configuration\n(setting up internet access, security and wireless network parameters)' },
        { service: 'Network device configuration — printer / scanner / router\n(restoring communication on the local network, installing and testing the device)' },
        { service: 'Sharing files and printers on the network\n(creating shared resources on the local network, configuring user permissions)' },
        { service: 'Connection speed and stability test\n(measuring the performance and quality of the internet connection or internal network)' },
        { service: 'Connecting a new workstation to the network\n(IP address configuration and adding the computer to the office network)' },
      ],
    },
    {
      id: 'naprawy-bezpieczenstwo-backup',
      title: 'Security and backups',
      items: [
        { service: 'Virus and malware removal\n(cleaning the system, restoring stability and performance)' },
        { service: 'Antivirus protection configuration\n(installing and configuring real-time protection – the licence is not included in the price)' },
        { service: 'Network firewall configuration\n(setting access rules, blocking unauthorised connections and network threats)' },
        { service: 'Backup configuration + restore test\n(setting up automatic data backups and checking that restoring works correctly)' },
        { service: 'Data recovery — simple case\n(recovering deleted or lost files after a failure or formatting)' },
        { service: 'Restoring access to the system / user account\n(repairing damaged profiles, resetting permissions, restoring login)' },
      ],
    },
    {
      id: 'naprawy-audyt',
      title: 'IT audit and optimisation',
      items: [
        { service: 'IT infrastructure audit\n(comprehensive check of workstations, servers and network devices)' },
        { service: 'Analysis of system and software configuration\n(assessment of settings, licences and performance of systems and applications)' },
        { service: 'Optimisation of the work environment\n(improving how office computers work, better speed and stability)' },
        { service: 'Audit report and recommendations\n(a detailed report with the results of the check and suggestions for upgrading hardware, network and security)' },
        { service: 'Verification of backup and data security\n(checking backup procedures, restore test, security assessment)' },
      ],
    },
  ],
  items: [],
}

// -------------------------------------------------------
// Laser printers (shared maintenance for printers)
// -------------------------------------------------------
