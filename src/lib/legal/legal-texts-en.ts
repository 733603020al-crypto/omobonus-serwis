import type { LegalDoc } from './legal-render'
import { LEGAL_DATE } from './legal-texts-pl'

// Translation of the PL texts (legal-texts-pl.ts) — the PL version is binding.
const NOTICE = 'The Polish version is legally binding; this translation is provided for convenience.'

export const regulaminEn: LegalDoc = {
  intro: '“Want to read our Terms and Conditions? See below.”',
  title: 'Terms and Conditions of Omobonus Service',
  lastUpdatedLabel: 'Last updated',
  dateLocale: 'en-GB',
  lastUpdated: LEGAL_DATE,
  notice: NOTICE,
  sections: [
    {
      heading: '§1. General provisions',
      blocks: [{ ol: [
        'These Terms and Conditions (the “Terms”) set out the rules on which Omobonus Sp. z o.o. (“Omobonus”, “we”) provides its services and the rules for using the services available on serwis.omobonus.com.pl.',
        'Company details: Omobonus Sp. z o.o., registered office: ul. Saperów 45/8, 53-151 Wrocław; service centre: ul. Marcina Bukowskiego 174, 52-418 Wrocław; entered in the Register of Entrepreneurs of the National Court Register (KRS) kept by Sąd Rejonowy dla Wrocławia-Fabrycznej we Wrocławiu, VI Wydział Gospodarczy KRS, under KRS number 0000869086; NIP (tax ID): 8943160773, REGON: 387509703; share capital: PLN 5,000.00; e-mail: serwis@omobonus.com.pl, phone: +48 793 759 262.',
        'The Terms apply in particular to: diagnosis, repair and servicing of computers, laptops, printers and other devices; call-outs to the Client; collection and delivery of devices; courier shipments; rental of printers and replacement devices; 3D printing and 3D model design; IT outsourcing.',
        'The Terms are available free of charge on the website. They can be saved and printed. At the Client’s request we will send them by e-mail or hand them over at the service centre.',
        'Where the parties have concluded a separate agreement (e.g. a rental agreement or an IT outsourcing agreement), that agreement applies to the matters it governs, and the Terms apply to all other matters.',
        'No provision of the Terms or of a separate agreement excludes or limits the rights that a Consumer or a Sole Trader with Consumer Rights has under mandatory provisions of law. In the event of conflict, the law prevails.',
        'The processing of personal data is described in the [Privacy Policy](/en/polityka-prywatnosci).',
      ] }],
    },
    {
      heading: '§2. Definitions',
      blocks: [{ ol: [
        '**Client** — a natural person, legal person or organisational unit using our services.',
        '**Consumer** — a natural person who concludes an agreement with us that is not directly related to their business or professional activity (Article 22¹ of the Polish Civil Code).',
        '**Sole Trader with Consumer Rights** — a natural person running a sole proprietorship who concludes an agreement directly related to that business, where the content of the agreement shows that it is not of a professional nature for them, in particular in light of the business activity entered in CEIDG (the Polish business register).',
        '**Business Client** — a Client who is neither a Consumer nor a Sole Trader with Consumer Rights.',
        '**Device** — equipment handed over to us for diagnosis, repair or servicing, or covered by a service at the Client’s premises.',
        '**Request** — an enquiry or contact request sent via the form, by phone, by e-mail, via a messaging app or in person.',
        '**Quote (Wycena)** — information on the scope of work, parts, price and expected completion time provided to the Client after diagnosis.',
        '**Acceptance Confirmation** — a paper or electronic document confirming that the Device has been handed over.',
        '**Durable Medium** — a medium that allows information to be stored and reproduced unchanged, e.g. paper, e-mail, text message, PDF file.',
        '**Business Days** — Monday to Friday, excluding public holidays.',
      ] }],
    },
    {
      heading: '§3. Services on the website',
      blocks: [{ ol: [
        'The website offers free of charge: a request form (with attachments of up to 4 MB), a call-back request, a call-out cost calculator, and information about our services and prices.',
        'To use the website you need: a device with Internet access, an up-to-date browser with JavaScript enabled and — to receive a reply — an active e-mail address or phone number.',
        'The agreement for using the form, call-back request or calculator is concluded when you start using the relevant function and ends when the form is sent, the result is displayed or you stop using it earlier. The Client may withdraw at any time by closing the page.',
        'It is forbidden to submit unlawful content, including content infringing the rights of third parties, and files containing malware.',
        'The result of the call-out cost calculator is for information only and is based on the route determined by Google’s map service. We confirm the final call-out cost when arranging the visit, before it takes place.',
        'Complaints about the operation of the website may be submitted under §14(4)–(5).',
      ] }],
    },
    {
      heading: '§4. Requests and conclusion of the agreement',
      blocks: [{ ol: [
        'We accept orders by phone, via the website form, by e-mail, via messaging apps and in person at the service centre. We also provide services at the Client’s premises.',
        'A Request does not constitute an agreement and does not oblige the Client to pay.',
        'After receiving a Request we contact the Client and agree on: the type of service, how the Device will be delivered or the date of the visit, the cost of diagnosis if the repair is declined, the cost of the call-out, collection or shipping, and any other costs.',
        'The agreement for diagnosis is concluded when both parties confirm the terms referred to in paragraph 3 — at the latest when the Device is accepted at the service centre or when the visit to the Client begins. We confirm the agreed terms on a Durable Medium (Acceptance Confirmation, e-mail or text message).',
        'The agreement for a repair or other service covered by a Quote is concluded only once the Client accepts the Quote (§6).',
        'Device rental and IT outsourcing are provided under a separate agreement (§17, §19).',
        'We may decline an order, in particular where the service is outside our scope, the repair is technically impossible, parts are unavailable, or the condition of the Device poses a safety risk. We inform the Client of this without undue delay.',
        'We may entrust part of the work to subcontractors. We are liable for their actions as for our own. If the Device is to be sent outside our service centre, we inform the Client in advance.',
      ] }],
    },
    {
      heading: '§5. Acceptance of the Device',
      blocks: [{ ol: [
        'When accepting a Device we give the Client an Acceptance Confirmation on paper or electronically. Where applicable, it includes: the order number, a description of the Device (type, make, model, serial number if available), accessories handed over, the condition of the Device and any visible damage, a description of the fault reported by the Client, and the agreed terms of diagnosis.',
        'For courier shipments we prepare the Acceptance Confirmation after unpacking the parcel and send it to the Client by e-mail.',
        'Please hand over only the accessories needed for the service and remove memory cards, USB drives and other media not needed for the repair.',
        'Please provide access passwords only where they are necessary to perform the service.',
      ] }],
    },
    {
      heading: '§6. Diagnosis and Quote',
      blocks: [{ ol: [
        'Consultation and an initial check of the Device on acceptance are free of charge, unless the price list for the given service states otherwise, of which we inform the Client before accepting the Device.',
        'Full diagnosis is free of charge if the Client orders the repair. If the Client declines the repair after full diagnosis, or the repair turns out to be impossible or not economically viable, the Client pays for the full diagnosis performed at the price agreed with them before the Device was accepted. We enter the agreed price in the Acceptance Confirmation or confirm it on a Durable Medium. A price in the website price list alone is not enough — without such agreement we do not charge for the diagnosis.',
        'If the diagnosis shows that the repair is impossible or not economically viable, we inform the Client without undue delay, giving the reason, and do not carry out any further paid work.',
        'After diagnosis we provide the Client with a Quote. Consumers and Sole Traders with Consumer Rights are given the gross price, i.e. including VAT.',
        'We do not start a repair without acceptance of the Quote. It may be accepted in person, by phone, e-mail, text message or messaging app. Acceptance by phone is confirmed on a Durable Medium.',
        'If during the repair it turns out that additional work or parts are needed, or the price would be higher than in the Quote, we stop work and ask for the Client’s consent. Without that consent we do not carry out the additional work and do not charge for it.',
        'If the Client does not respond to the Quote within 14 days of receiving it and of a further attempt to contact them, we treat this as declining the repair, not as accepting it, and inform the Client that the Device can be collected (§11).',
      ] }],
    },
    {
      heading: '§7. Completion times',
      blocks: [{ ol: [
        'We state the expected completion time after diagnosis, in the Quote. It runs from acceptance of the Quote or, if a prepayment has been agreed, from receipt of the prepayment. Times stated in service descriptions on the website are indicative.',
        'If parts we do not have in stock or additional work are needed, we inform the Client and agree a new completion time with them.',
        'If the new time does not suit the Client, they may cancel the service and collect the Device. Settlement is made in accordance with §12(5).',
        'A delay by a parts supplier is not force majeure. In the event of delay the Client retains their statutory rights, including the right to withdraw from the agreement under Article 635 of the Polish Civil Code.',
      ] }],
    },
    {
      heading: '§8. Spare parts',
      blocks: [{ ol: [
        'The type of parts (original, compatible, refurbished or used) is stated in the Quote. We use parts other than new ones only with the Client’s consent.',
        'Parts we install are covered by our guarantee under §13. Separately, a manufacturer’s or supplier’s guarantee may apply — we will help the Client use it if needed.',
        'We offer to return replaced parts to the Client when the Device is handed over. If the Client declines them, we dispose of them in accordance with the law.',
        'Exceptions are parts that we must return to the supplier or manufacturer (e.g. for a replacement under the manufacturer’s warranty or in an exchange scheme where the price includes return of the old part), and parts whose handover would be dangerous or unlawful (e.g. damaged or swollen batteries). We inform the Client of any such exception before the repair, at the latest in the Quote.',
        'Parts ordered specifically for the Client may require a prepayment (§12(4)).',
      ] }],
    },
    {
      heading: '§9. Data on Devices',
      blocks: [{ ol: [
        'Some work, e.g. replacing a drive, updating software or reinstalling the operating system, may involve a risk of data loss. We inform the Client of this risk before starting and carry out such work with the Client’s consent.',
        'We recommend making a backup of your data before handing over the Device. At the Client’s request we can make a backup as a paid service according to the price list.',
        'We access the Client’s data only to the extent necessary to perform the service and keep it confidential.',
        'Towards Consumers and Sole Traders with Consumer Rights we are liable for loss of or damage to data on general principles where it results from our act or omission. When determining the amount of compensation, whether the Client made a backup may be taken into account (Article 362 of the Polish Civil Code).',
        'Towards Business Clients the limitation of liability in §15(2) applies.',
        'Where, as part of a service, we process personal data on behalf of a Client who is its controller (e.g. in IT outsourcing), we conclude a data processing agreement (Article 28 GDPR) where required.',
        'Data recovery is a separate paid service according to the price list. It is performed with due care and does not guarantee that all data will be recovered. Before starting, we inform the Client of the chances of success and the cost.',
      ] }],
    },
    {
      heading: '§10. Call-outs, collection and delivery, courier shipments',
      blocks: [{ ol: [
        'The costs of call-outs to the Client and of collecting and delivering the Device are set out in the price list on the website. We confirm the cost when arranging the date.',
        'The Client arranges and pays for shipping the Device to the service centre. Before shipping, we provide packing instructions and the service centre address. The Device should be packed in a rigid box with shock-absorbing filling, and printers should, where possible, be secured according to the manufacturer’s instructions (e.g. locking the print head, removing or securing cartridges).',
        'Until the parcel is delivered to us, the risk of loss or damage in transit lies with the Client as the sender. Claims against the carrier belong to the sender. We help document any damage.',
        'If a parcel reaches us damaged, we will, where possible, draw up a damage report with the carrier, take photos and inform the Client immediately, before starting any work.',
        'We arrange the return shipment. We pack the Device carefully, appropriately for its type, and insure the parcel for the declared value of the Device. We agree the Device value to be insured and the cost of shipping and insurance according to the carrier’s rates with the Client before shipping. The Client bears these costs.',
        { t: 'Risk during return shipment:', sub: [
          'for Consumers and Sole Traders with Consumer Rights — we bear it until the Device is delivered to the Client, unless the Client chose a carrier other than the one we proposed;',
          'for Business Clients — it passes to the Client when the Device is handed to the carrier, unless the parties agreed otherwise.',
        ] },
        'When receiving the parcel, please check its condition in the courier’s presence and, if it is damaged, draw up a damage report. This is not a condition for a Consumer exercising their rights.',
      ] }],
    },
    {
      heading: '§11. Collection of the Device and storage',
      blocks: [{ ol: [
        'We inform the Client by phone, text message or e-mail that the service has been completed or that work has ended without a repair (the “notification”).',
        'The Device can be collected from the service centre during opening hours, or the Client can order delivery or a return shipment (§10).',
        'For the first 30 days from the date of notification we store the Device free of charge.',
        'From the 31st to the 90th day after notification we charge a storage fee of PLN 5 net (PLN 6.15 gross) for each day or part of a day, until the Device is collected or shipped, if earlier — in total no more than PLN 300 net (PLN 369 gross). After the 90th day no further fees are charged automatically. We do not charge the fee if the delay is due to reasons on our side or if we have agreed a later collection date with the Client.',
        { t: 'We remind the Client to collect the Device:', sub: [
          'about 7 days before the free period ends — stating the date from which the fee will be charged;',
          '60 days after notification — stating the amount accrued;',
          '90 days after notification — with a formal request sent by e-mail and by registered letter to the address provided by the Client, setting a collection deadline of no less than 14 days and explaining the next steps.',
        ] },
        { t: 'An uncollected Device does not become our property and will not be disposed of without the Client’s consent. If the Client does not collect the Device despite the request, we may:', sub: [
          'continue to store it — without any further fees being charged automatically;',
          'retain it until the amounts due are paid (right of retention, Article 461 of the Polish Civil Code);',
          'deposit it with the court at the Client’s expense, in accordance with the Polish Civil Code and Code of Civil Procedure;',
          'pursue the amounts due through legal channels.',
        ] },
        'The Client may at any time declare in writing or by e-mail that they will not collect the Device and agree to its free disposal. In that case we erase the data from storage media and hand the Device over to an authorised waste electrical equipment processing facility.',
        'We release the Device to a person who presents the order number or the Acceptance Confirmation, or to a person designated by the Client.',
      ] }],
    },
    {
      heading: '§12. Prices, payment and prepayment',
      blocks: [{ ol: [
        'Service prices are given in the price lists on the individual service pages. Prices in the price lists are net prices — VAT is added at the applicable rate. Before the agreement is concluded, including in the Quote, Consumers and Sole Traders with Consumer Rights are given the gross price.',
        'We accept payment by bank transfer only, to the account stated on the invoice or in our message. Consumers and Sole Traders with Consumer Rights pay before the Device is released or shipped; Business Clients pay within the term stated on the invoice.',
        'We issue invoices for our services in accordance with the law, including — where required — via the National e-Invoicing System (KSeF).',
        'In justified cases, e.g. when ordering expensive parts or for custom orders (e.g. 3D printing), we may ask for a prepayment. Its amount and terms are agreed with the Client before payment and confirmed on a Durable Medium. The prepayment is credited towards the price and is not a deposit (zadatek).',
        { t: 'Refund of prepayment:', sub: [
          'if we do not perform the service for reasons on our side — we refund the full prepayment within 14 days;',
          'if a Consumer or Sole Trader with Consumer Rights withdraws from the agreement within 14 days (§16) — we refund payments within 14 days of receiving the statement, deducting only the value of services performed at their express request before withdrawal (Article 35 of the Polish Consumer Rights Act);',
          'in other cases where the Client cancels before the service is completed — we settle the fee for the work done and documented costs, e.g. parts ordered specifically for the Client that cannot be returned to the supplier, taking into account costs saved (Article 644 of the Polish Civil Code). We refund the remaining amount within 14 days.',
        ] },
        'Refunds are made by bank transfer to the account from which payment was made or to another account indicated by the Client.',
      ] }],
    },
    {
      heading: '§13. Omobonus guarantee',
      blocks: [{ ol: [
        'The guarantor is Omobonus Sp. z o.o. (details in §1(2)). We provide a voluntary guarantee on work we have carried out and parts we have installed. The guarantee does not cover the entire Device.',
        'The guarantee period depends on the service. It is stated in the service description on the website and in the repair document (e.g. invoice or repair card). The guarantee runs from the date the Device is released after the service and is valid in Poland.',
        'If, during the guarantee period, a defect arises whose cause lies in our work or in a part we installed, we will remedy it free of charge — by repeating the repair or replacing the part.',
        'We inform the Client of the time needed for the guarantee repair after inspecting the Device and confirm it on a Durable Medium. Any change to this time is agreed with the Client. This does not affect mandatory provisions of law — in particular, we respond to a complaint from a Consumer or Sole Trader with Consumer Rights within 14 days and remedy any non-conformity of the service within a reasonable time (§14).',
        'Under the guarantee, the Device should be delivered to the service centre (ul. Marcina Bukowskiego 174, Wrocław). We pay the cost of delivery from within Poland — the method of delivery is agreed with the Client.',
        'The guarantee does not cover faults caused by: mechanical damage, liquid damage, power surges or other external events; use of the Device contrary to the manufacturer’s instructions; interference by third parties with the repaired component; natural wear of consumable parts; use of consumables not meeting the manufacturer’s requirements — where these caused the fault. The exclusion applies only to faults resulting from these causes.',
        'For services whose result largely depends on the condition of the Device (e.g. cleaning or restoring a print head), the guarantee period is shorter and stated in the service description.',
        'Guarantee claims can be made by e-mail, by phone or in person, giving the order or invoice number and a description of the fault.',
        'The guarantee does not exclude, limit or suspend the Client’s statutory rights regarding liability for defects or conformity of the service with the agreement (§14). The Client may choose which basis to rely on.',
      ] }],
    },
    {
      heading: '§14. Liability for defects and complaints',
      blocks: [{ ol: [
        'Towards Consumers and Sole Traders with Consumer Rights we are liable for defects and lack of conformity of the service with the agreement in accordance with the law, in particular the Polish Civil Code (statutory warranty for defects in work, Article 638) and the Polish Consumer Rights Act — in the cases it provides for (e.g. where the result of the service is a new item, such as a 3D print).',
        'We are liable for defects that become apparent within the periods provided by law (as a rule, within 2 years of the Device or item being released).',
        'Towards Business Clients we are liable under the Polish Civil Code, subject to the limitation in §15(2).',
        'Complaints can be submitted by e-mail to serwis@omobonus.com.pl, in writing to the service centre address, or in person. Please include: your name or company name, contact details, order or invoice number, a description of the problem and how you would like it resolved. A missing item will not cause the complaint to be rejected — if needed, we will ask you to complete it.',
        'We reply to complaints from Consumers and Sole Traders with Consumer Rights within 14 calendar days of receipt, on paper or another Durable Medium. If we do not reply within this period, the complaint is deemed accepted. We reply to complaints from Business Clients within the same period where possible.',
      ] }],
    },
    {
      heading: '§15. Scope of liability',
      blocks: [{ ol: [
        'Towards Consumers and Sole Traders with Consumer Rights we are liable in accordance with the law, without limitations arising from these Terms.',
        'Towards Business Clients our liability for non-performance or improper performance of the agreement is limited to the fee for the given service and does not cover lost profits. This limitation does not apply to damage caused intentionally.',
        'We are not liable for non-performance or delay caused by force majeure, i.e. an external event that could not have been foreseen or prevented. We inform the Client of such an event without undue delay.',
      ] }],
    },
    {
      heading: '§16. Right of withdrawal (Consumers and Sole Traders with Consumer Rights)',
      blocks: [{ ol: [
        'The right of withdrawal applies to agreements concluded at a distance (e.g. by phone, e-mail, form or messaging app, without the simultaneous physical presence of the parties — including courier shipments) and off-premises (e.g. at the Client’s home). It does not apply to agreements concluded at the service centre at ul. Marcina Bukowskiego 174.',
        'The Client may withdraw from the agreement within 14 days of its conclusion without giving a reason. It is enough to send a statement before the deadline by e-mail to serwis@omobonus.com.pl or in writing to the service centre address. The model form (Annex 1) may be used but is not mandatory. We confirm receipt of the statement by e-mail.',
        'Before the withdrawal period ends, we start the service only at the Client’s express request. For off-premises agreements the request must be made on a Durable Medium. If the Client withdraws after the service has started, they pay for what was provided up to the withdrawal, in proportion to the agreed price (Article 35 of the Polish Consumer Rights Act).',
        { t: 'The right of withdrawal does not apply (Article 38 of the Polish Consumer Rights Act), in particular:', sub: [
          'where the service has been fully performed with the Client’s express prior consent, after the Client was informed before the start of the service that they would lose the right of withdrawal once it was performed, and acknowledged this;',
          'to urgent repairs or maintenance where the Client expressly requested a visit for that purpose. However, the right of withdrawal does apply to services and items other than the parts necessary for that repair or maintenance;',
          'where the Client expressly requested a visit for a repair and the service has been fully performed with their express prior consent;',
          'where the subject of the agreement is an item made to the Client’s specifications or to meet their individual needs (e.g. a 3D print from the Client’s model). This exclusion applies only where the item genuinely has that character.',
        ] },
        'The exclusions in paragraph 4(b) and (c) do not apply if we visited the Client without a prior appointment. We do not make such visits.',
        'Refunds are made in accordance with §12(5)(b). The Client’s Device is released under §11.',
      ] }],
    },
    {
      heading: '§17. Printer rental and replacement devices',
      blocks: [{ ol: [
        'We rent printers and replacement devices to private individuals and businesses under a separate agreement. We do not charge a deposit.',
        'Rental: a monthly subscription with a page allowance. The price includes toner, parts and repairs resulting from normal use, as well as delivery and installation. The Client provides paper and electricity. The minimum term is 1 month, with no long-term commitment. We respond to fault reports within 24 hours on Business Days.',
        'The terms of use, return of the device and liability for damage beyond normal wear are set out in the agreement. We provide its content to the Client before it is concluded.',
        'Replacement device: no subscription fee. The Client pays for prints made according to the meter (toner included); the Client provides paper. Availability of replacement devices is not guaranteed and depends on current resources.',
        'If the agreement with a Consumer or Sole Trader with Consumer Rights is concluded at a distance or off-premises, they have the right of withdrawal (§16).',
      ] }],
    },
    {
      heading: '§18. 3D printing and 3D model design',
      blocks: [{ ol: [
        'The price of 3D printing is set individually (preparation, material, print time) and stated in the Quote before production. We may ask for a prepayment (§12(4)).',
        'If the Client provides their own model (e.g. an STL file), they declare that they have the right to use it and to have it printed. We refuse to print items that infringe the law, including the rights of third parties.',
        'If we design a 3D model to the Client’s order, after payment the Client receives a non-exclusive licence to use the model for the purposes agreed in the order. Economic copyright does not pass to the Client automatically; it may be transferred under a separate written agreement. We provide the model files if this was agreed in the order.',
        '3D prints have characteristics resulting from the technology, e.g. visible layers and dimensional tolerances. Parameters, including material and accuracy, are stated in the Quote. Characteristics within the agreed parameters are not defects.',
        'Finished prints can be collected in person or sent by courier or to a parcel locker. Shipping is governed by §10.',
        'The right of withdrawal is governed by §16. Complaints are governed by §14.',
      ] }],
    },
    {
      heading: '§19. IT outsourcing',
      blocks: [{ ol: [
        'We provide IT outsourcing to businesses and private individuals under a separate agreement setting out the scope, method and response time, and the price.',
        'Where, as part of the service, we process personal data on behalf of a Client who is its controller, we conclude a data processing agreement (Article 28 GDPR).',
        'If the Client is a private individual using the service solely for personal or household purposes, the GDPR provisions on data processors do not apply. In that case we keep the data confidential in accordance with §9(3).',
        'Consumers and Sole Traders with Consumer Rights have their statutory rights, including the right of withdrawal (§16).',
      ] }],
    },
    {
      heading: '§20. Out-of-court dispute resolution and jurisdiction',
      blocks: [{ ol: [
        { t: 'Consumers may use out-of-court methods of handling complaints and pursuing claims, in particular:', sub: [
          'apply to the permanent consumer arbitration court at the Provincial Inspectorate of Trade Inspection in Wrocław (Wojewódzki Inspektorat Inspekcji Handlowej we Wrocławiu);',
          'request mediation from the Provincial Inspector of Trade Inspection in Wrocław;',
          'obtain free assistance from the Municipal Consumer Ombudsman in Wrocław (Miejski Rzecznik Konsumentów) or consumer organisations (e.g. Federacja Konsumentów, Stowarzyszenie Konsumentów Polskich);',
          'in cross-border disputes — contact the European Consumer Centre.',
        ] },
        'Information and addresses are available on the UOKiK website: [prawakonsumenta.uokik.gov.pl](https://prawakonsumenta.uokik.gov.pl).',
        'We decide on participation in out-of-court proceedings individually in each case. Participation is voluntary for both parties.',
        'Agreements are governed by Polish law. For Consumers, this choice of law does not deprive them of the protection afforded by the mandatory provisions of the country of their habitual residence.',
        'Disputes with Consumers and Sole Traders with Consumer Rights are heard by the court having jurisdiction under general rules. Disputes with Business Clients are heard by the court having jurisdiction over Omobonus’s registered office.',
      ] }],
    },
    {
      heading: '§21. Amendments and final provisions',
      blocks: [{ ol: [
        'We may amend these Terms for important reasons, in particular changes in the law, in the scope of our services or in how they are provided. We publish the new version on the website, stating its effective date.',
        'Orders accepted before an amendment are governed by the Terms in force on the date they were accepted. Changes to long-term agreements (e.g. rental, IT outsourcing) are made in accordance with those agreements.',
        'These Terms have been drawn up in Polish. Versions in other languages are convenience translations; in the event of discrepancies the Polish version prevails.',
        'These Terms apply from 24 October 2026.',
        'Annex 1 — model withdrawal form (below).',
      ] }],
    },
    {
      heading: 'Annex 1 — Model withdrawal form',
      blocks: [
        { p: '(complete and return this form only if you wish to withdraw from the agreement; it may be completed in Polish or English)' },
        { ul: [
          'To: Omobonus Sp. z o.o., ul. Marcina Bukowskiego 174, 52-418 Wrocław, e-mail: serwis@omobonus.com.pl',
          'I/We(*) hereby give notice that I/We(*) withdraw from my/our(*) agreement for the provision of the following service(*) / the agreement for making the following item(*): …………………………',
          'Date of conclusion of the agreement: ……………',
          'Order number (if any): ……………',
          'Name of consumer(s): ……………',
          'Address of consumer(s): ……………',
          'Signature of consumer(s) (only if this form is sent on paper): ……………',
          'Date: ……………',
        ] },
        { p: '(*) Delete as appropriate.' },
      ],
    },
  ],
}

export const politykaEn: LegalDoc = {
  intro: '“Want to read our Privacy Policy? See below.”',
  title: 'Privacy Policy',
  lastUpdatedLabel: 'Last updated',
  dateLocale: 'en-GB',
  lastUpdated: LEGAL_DATE,
  notice: NOTICE,
  sections: [
    {
      heading: '1. Data controller',
      blocks: [
        { p: 'The controller of your personal data is Omobonus Sp. z o.o., ul. Saperów 45/8, 53-151 Wrocław, NIP 8943160773, KRS 0000869086. For all matters concerning personal data you can contact us by e-mail: serwis@omobonus.com.pl, by phone: +48 793 759 262, or in writing at the service centre address: ul. Marcina Bukowskiego 174, 52-418 Wrocław.' },
        { p: 'We have not appointed a data protection officer, as we are not required to do so.' },
      ],
    },
    {
      heading: '2. Where we get your data from',
      blocks: [{ ul: [
        'from you — when you fill in a form, request a call-back, call us, write an e-mail or a message in a messaging app, or hand over a Device at the service centre;',
        'automatically — when you use the website (technical data and, once you consent, cookies and similar technologies);',
        'from the company you work for — if you contact us on its behalf;',
        'from Google — if you have posted a review of Omobonus on Google (section 9).',
      ] }],
    },
    {
      heading: '3. Purposes, legal bases and retention periods',
      blocks: [
        { rows: [
          { title: 'Replying to a request from the form, a call-back request, e-mail, phone call or messaging app message; preparing a quote', lines: [
            ['Data', 'name, phone, e-mail, address, device type and model, description of the problem, attachments, website language, phone number country'],
            ['Legal basis', 'Article 6(1)(b) GDPR — steps taken at your request before entering into an agreement; for persons acting on behalf of a company — Article 6(1)(f) GDPR (contact with a business client)'],
            ['Retention', '12 months from the last contact if no order was placed'],
          ] },
          { title: 'Concluding and performing the agreement: diagnosis, repair, call-out, shipping, rental, 3D printing, IT outsourcing; Acceptance Confirmation', lines: [
            ['Data', 'as above, plus order number, description and condition of the device, delivery address, invoicing details, correspondence'],
            ['Legal basis', 'Article 6(1)(b) GDPR'],
            ['Retention', 'for the duration of the agreement and then about 3 years after it ends (guarantee, statutory warranty, complaints)'],
          ] },
          { title: 'Handling complaints and guarantee claims', lines: [
            ['Data', 'contact details, order details, content of the complaint'],
            ['Legal basis', 'Article 6(1)(b) and (c) GDPR (obligations under the Polish Consumer Rights Act and Civil Code)'],
            ['Retention', 'as above'],
          ] },
          { title: 'Accounting and taxes', lines: [
            ['Data', 'data from invoices and accounting documents'],
            ['Legal basis', 'Article 6(1)(c) GDPR — accounting and tax laws'],
            ['Retention', 'for the period required by law, as a rule 5 years from the end of the calendar year in which the tax payment deadline expired'],
          ] },
          { title: 'Establishing, pursuing and defending claims', lines: [
            ['Data', 'data needed to prove the facts'],
            ['Legal basis', 'Article 6(1)(f) GDPR — our legitimate interest'],
            ['Retention', 'until the limitation periods expire and, in the event of a dispute, until it ends'],
          ] },
          { title: 'Call-out cost calculator', lines: [
            ['Data', 'the address entered; device location — only if you allow it in your browser'],
            ['Legal basis', 'Article 6(1)(b) GDPR — a quote at your request'],
            ['Retention', 'we do not store this data in our systems; it is sent to Google Maps Platform solely to calculate the route'],
          ] },
          { title: 'Website security, protecting forms against spam and abuse', lines: [
            ['Data', 'IP address, technical request data'],
            ['Legal basis', 'Article 6(1)(f) GDPR'],
            ['Retention', 'request counter — briefly in server memory; the hosting provider’s technical logs — for the short period provided by the hosting service'],
          ] },
          { title: 'Statistics and analysis of website use (Google Analytics 4, Microsoft Clarity)', lines: [
            ['Data', 'cookie identifiers, device and browser information, pages visited, clicks, scrolling, approximate location'],
            ['Legal basis', 'Article 6(1)(a) GDPR — your consent (in connection with Article 399 of the Polish Electronic Communications Law)'],
            ['Retention', 'until consent is withdrawn; Google Analytics data — no longer than 14 months; Microsoft Clarity — session recordings 30 days, aggregate data up to 13 months'],
          ] },
          { title: 'Measuring Google Ads effectiveness, including enhanced conversions and Google Signals', lines: [
            ['Data', 'advertising identifiers, information about an ad click and an action taken (e.g. sending the form, clicking the phone number), hashed e-mail and phone number from the form'],
            ['Legal basis', 'Article 6(1)(a) GDPR — your consent'],
            ['Retention', 'until consent is withdrawn; cookies — up to 90 days; on Google’s side — according to Google’s policies'],
          ] },
          { title: 'Google map in the website footer', lines: [
            ['Data', 'IP address, browser information'],
            ['Legal basis', 'Article 6(1)(f) GDPR — showing how to reach us'],
            ['Retention', 'we do not store this data; on Google’s side — according to Google’s policies'],
          ] },
          { title: 'Displaying Google reviews on the website', lines: [
            ['Data', 'author’s name, profile photo, review text, rating and date'],
            ['Legal basis', 'Article 6(1)(f) GDPR — presenting reviews of our services'],
            ['Retention', 'until the review is deleted on Google (it disappears from the website at the next weekly update) or until your objection is upheld'],
          ] },
          { title: 'Managing cookie consents', lines: [
            ['Data', 'your choice, date, consent ID, browser information, truncated IP address'],
            ['Legal basis', 'Article 6(1)(c) in connection with Article 7(1) GDPR (demonstrating consent)'],
            ['Retention', 'the cookie storing your choice — 1 year; the consent log in CookieYes — for the period provided by that service, no longer than necessary to demonstrate consent'],
          ] },
        ] },
        { p: 'In justified cases — where a complaint, guarantee claim or dispute is ongoing, or the law requires it — we keep data longer, until the matter is closed or the statutory period expires. Paper documents (e.g. Acceptance Confirmations) are kept for the same periods and then destroyed.' },
      ],
    },
    {
      heading: '4. Request form and call-back request',
      blocks: [{ ul: [
        'Messages from the form are delivered to our e-mail inbox. We send a copy to the e-mail address you provide.',
        'You can attach photos, videos or documents to the form. Please do not send identity documents, health information or other special categories of data.',
        'The form contains a hidden anti-spam field. The number of requests from a single IP address is briefly limited.',
        'Providing the data marked as required is necessary for us to reply to your request.',
        'Sending the form does not mean consenting to data processing or accepting the Terms and Conditions — we process the form data in order to reply to your request (section 3). An agreement is concluded only as set out in the Terms and Conditions.',
        'Order data are kept in our repair management software and — for Acceptance Confirmations and other documents — on paper.',
      ] }],
    },
    {
      heading: '5. Messaging apps',
      blocks: [{ p: 'The website contains links for contacting us via WhatsApp, Viber and Telegram. If you use them, the operator of the messaging app (WhatsApp — Meta, Viber — Rakuten Viber, Telegram) processes your data as a separate controller under its own privacy policy. We process the content of the conversation for the purposes described in section 3.' }],
    },
    {
      heading: '6. Call-out cost calculator and map',
      blocks: [{ ul: [
        'The calculator sends the address you enter (or your location, if you allow it in your browser) from our server to Google Maps Platform services (address lookup, route calculation, address suggestions, static map) to calculate the distance and cost. We do not store this data.',
        'The map in the website footer is provided by Google Maps. When it is displayed, Google receives your IP address and browser information and may store its own cookies under Google’s rules.',
      ] }],
    },
    {
      heading: '7. Analytics and advertising',
      blocks: [
        { p: '**Google Analytics 4 and Google Tag Manager.** We use Google Analytics 4 to understand how visitors use the website (e.g. pages visited, link clicks, scrolling, form submissions, copying the e-mail address or phone number). Google Signals is enabled: if you are signed in to a Google account and have allowed Google to personalise ads, Google may combine data from different devices into aggregate reports. We deploy these tools via Google Tag Manager.' },
        { p: '**Google Ads and enhanced conversions.** We measure whether Google Ads lead to contact (e.g. a form submission or a click on the phone number or a messaging app). If you consent to sharing data for advertising purposes, after you submit the form your e-mail address and phone number are converted in your browser using a hash function (SHA-256) and sent to Google to match the conversion with a Google account. Hashing is not anonymisation — such data remain personal data. For some of these activities Google acts as a separate controller.' },
        { p: '**Microsoft Clarity.** Only with your consent to analytics cookies, we use Microsoft Clarity, which creates click heatmaps and session recordings (cursor movements, clicks, scrolling) so that we can improve the website.' },
        { p: '**Google consent mode.** By default, all consents for analytics and advertising cookies are set to “denied”. The website uses basic consent mode: until you accept analytics or advertising cookies, Google Tag Manager is not loaded, so Google Analytics, Google Ads and Microsoft Clarity do not run and receive no data from us. Actions taken before you give consent (e.g. submitting the form) are not passed on later. Once you consent, the tools work only within the categories you chose — for example, consenting to analytics only does not enable advertising measurement. After you withdraw consent, the tools stop setting and reading cookies and are no longer loaded from the next page view.' },
        { p: 'We do not send newsletters or marketing messages by e-mail or text message.' },
      ],
    },
    {
      heading: '8. Cookies and similar technologies',
      blocks: [
        { p: 'Cookies are small files stored on your device. In accordance with Article 399 of the Polish Electronic Communications Law, we set and read them only with your consent — except for those strictly necessary for the website to work. You give consent in the CookieYes banner on your first visit. You can change or withdraw it at any time — as easily as you gave it — using the button below or the “Cookie settings” button in the footer of every page. You can also delete cookies in your browser settings.' },
        { cookieButton: 'Change cookie settings' },
        { rows: [
          { title: 'Necessary — CookieYes: cookieyes-consent', lines: [['Purpose', 'remembering your choice'], ['Duration', '1 year']] },
          { title: 'Analytics — Google Analytics: _ga, _ga_*', lines: [['Purpose', 'visit statistics'], ['Duration', '1 year and 1 month']] },
          { title: 'Analytics — Microsoft Clarity: _clck, _clsk', lines: [['Purpose', 'click heatmaps, session recordings'], ['Duration', '1 year / 1 day']] },
          { title: 'Advertising — Google Ads: _gcl_au; doubleclick.net: test_cookie', lines: [['Purpose', 'measuring ad conversions; checking whether the browser supports cookies'], ['Duration', '3 months / 15 minutes']] },
          { title: 'Google map — Google cookies (e.g. NID)', lines: [['Purpose', 'operation of the map; the cookies are set by Google under its own rules'], ['Duration', 'according to Google’s policies']] },
          { title: 'Technical (our staff only) — internal', lines: [['Purpose', 'excluding staff visits from statistics'], ['Duration', '1 day']] },
        ] },
      ],
    },
    {
      heading: '9. Google reviews',
      blocks: [{ p: 'We display selected Google reviews of Omobonus on the website: the author’s name, profile photo, text, rating and date. We fetch reviews once a week via Google’s interface and translate them into the website’s other languages using Google Cloud Translation. If you delete your review on Google, it will disappear from the website at the next update. You can also object — we will then remove the review from the website.' }],
    },
    {
      heading: '10. Data recipients',
      blocks: [{ ul: [
        'Vercel Inc. (USA) — website hosting; forms are processed on servers in the European Union (Frankfurt);',
        'cyber_Folks S.A., based in Poznań (Zenbox brand) — e-mail hosting;',
        'Google Ireland Limited and Google LLC — Google Tag Manager, Google Analytics, Google Ads, Google Maps Platform, fetching and translating reviews;',
        'Microsoft Ireland Operations Limited and Microsoft Corporation — Microsoft Clarity;',
        'CookieYes Limited (United Kingdom) — cookie consent management;',
        'the provider of our repair management software;',
        'providers of accounting services, our bank, courier companies (when we ship a Device) and subcontractors, where we use them to perform a service;',
        'entities authorised by law (e.g. public authorities) — where they so require.',
      ] }],
    },
    {
      heading: '11. Transfers outside the European Economic Area',
      blocks: [{ p: 'Some recipients (Google LLC, Microsoft Corporation, Vercel Inc.) may process data in the USA. Transfers are based on the European Commission’s decision on the EU-U.S. Data Privacy Framework (for certified entities) or on standard contractual clauses approved by the Commission. Transfers to the United Kingdom (CookieYes) are based on the Commission’s adequacy decision. You can obtain information on the safeguards on request.' }],
    },
    {
      heading: '12. Your rights',
      blocks: [{ p: 'You have the right to: access your data, rectify it, have it erased, restrict processing, data portability, and to object to processing based on our legitimate interest. Where we process data on the basis of consent, you may withdraw it at any time. This does not affect the lawfulness of processing before withdrawal. Send requests to serwis@omobonus.com.pl — we reply within one month. You also have the right to lodge a complaint with the President of the Polish Personal Data Protection Office (Prezes UODO, ul. Stawki 2, 00-193 Warszawa, [uodo.gov.pl](https://uodo.gov.pl)).' }],
    },
    {
      heading: '13. Do you have to provide your data?',
      blocks: [{ p: 'Providing data is voluntary, but without it we cannot reply to your request or perform the service. Invoicing details are required by tax law.' }],
    },
    {
      heading: '14. Automated decision-making',
      blocks: [{ p: 'We do not make decisions based solely on automated processing that produce legal effects concerning you or similarly significantly affect you. Google may profile users for advertising only within the scope of your consent.' }],
    },
    {
      heading: '15. Changes to this policy',
      blocks: [{ p: 'We update this policy when the law or the tools we use change. The current version is always available on this page, and the date of the last update is given below. This policy has been drawn up in Polish; versions in other languages are convenience translations. Our service terms are set out in the [Terms and Conditions](/en/regulamin).' }],
    },
  ],
}
