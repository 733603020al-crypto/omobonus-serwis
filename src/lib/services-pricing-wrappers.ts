export interface WrapperTemplate {
  pl: string
  ru: string
  uk: string
}

export const PRICE_WRAPPERS: Record<string, WrapperTemplate> = {
  "p_n_n_n": { pl: "{0} / {1} / {2}", ru: "{0} / {1} / {2}", uk: "{0} / {1} / {2}" },
  "p_n_zl": { pl: "{0} zł", ru: "{0} zł", uk: "{0} zł" },
  "p_gratis": { pl: "GRATIS", ru: "Бесплатно", uk: "Безкоштовно" },
  "p_do_ustalenia": { pl: "do ustalenia", ru: "Индивидуально", uk: "за домовленістю" },
  "p_n": { pl: "{0}", ru: "{0}", uk: "{0}" },
  "p_n_zl_czesci_v2": { pl: "{0} zł + części", ru: "{0} zł + детали", uk: "{0} zł + деталі" },
  "p_n_zl_czesc_zl": { pl: "{0} zł + część", ru: "{0} zł + деталь", uk: "{0} zł + деталь" },
  "p_n_n_zl_v2": { pl: "{0}-{1} zł", ru: "{0}-{1} zł", uk: "{0}-{1} zł" },
  "p_n_n_zl_czesc_zl": { pl: "{0}-{1} zł + część", ru: "{0}-{1} zł + деталь", uk: "{0}-{1} zł + деталь" },
  "p_n_n_n_czesci": { pl: "{0} / {1} / {2} + części", ru: "{0} / {1} / {2} + детали", uk: "{0} / {1} / {2} + частини" },
  "p_n_n_n_czesci_v2": { pl: "{0} / {1} / {2} + części", ru: "{0} / {1} / {2} + детали", uk: "{0} / {1} / {2} + деталі" },
  "p_n_n_n_zl_materialy": { pl: "{0} / {1} / {2} zł + materiały", ru: "{0} / {1} / {2} zł + материалы", uk: "{0} / {1} / {2} zł + матеріали" },
  "p_n_zl_gram_n_zl_godz": { pl: "{0} zł/gram + {1} zł/h", ru: "{0} zł/грамм + {1} zł/ч", uk: "{0} zł/грам + {1} zł/год." },
  "p_n_zl_nl_do_n_min_pracy": { pl: "{0} zł\ndo {1} min pracy", ru: "{0} zł\nдо {1} мин работы", uk: "{0} zł\nдо {1} хв роботи" },
  "p_npct_nl_do_ceny_v2": { pl: "+{0}%\ndo ceny", ru: "+{0}%\nк цене", uk: "+{0}%\nдо ціни" },

  // Бывшие 19 спецслучаев цены — уникальные, по 1 использованию каждая
  "p_plus_n_zl": { pl: "+ {0} zł", ru: "+ {0} zł", uk: "+ {0} zł" },
  "p_n_zl_plus_n_zl_km": { pl: "{0} zł + {1} zł/km", ru: "{0} zł + {1} zł/км", uk: "{0} zł + {1} zł/km" },
  "p_n_n_n_plus_n_zl_km": { pl: "{0} / {1} / {2} + {3} zł/km", ru: "{0} / {1} / {2} + {3} zł/км", uk: "{0} / {1} / {2} + {3} zł/km" },
  "p_od_n_zl_v2": { pl: "od {0} zł", ru: "от {0} zł", uk: "від {0} zł" },
  "p_wg_cennika_przewoznika": { pl: "według cennika\nprzewoźnika", ru: "по тарифу\nперевозчика", uk: "за тарифом\nперевізника" },
  "p_gratis_nl_do_n_min_konsultacji": { pl: "GRATIS\ndo {0} min konsultacji", ru: "БЕСПЛАТНО\nдо {0} мин консультации", uk: "БЕЗКОШТОВНО\nдо {0} хв консультації" },
  "p_n_zl_nl_do_n_godz_pracy": { pl: "{0} zł\ndo {1} godz. pracy", ru: "{0} zł\nдо {1} ч работы", uk: "{0} zł\nдо {1} год роботи" },
  "p_n_zl_nl_za_kazde_dodatkowe_n_min_pracy": { pl: "{0} zł\nza każde {1} min pracy", ru: "{0} zł\nза каждые {1} мин работы", uk: "{0} zł\nза кожні {1} хв роботи" },

  // wynajem-drukarek / drukarka-zastepcza (tariff limity stron + ceny)
  "p_n_str_mies": { pl: "{0} str./mies.", ru: "{0} стр./мес.", uk: "{0} стор./міс." },
  "p_n_str_mono_plus_n_str_kolor": { pl: "{0} str. mono + {1} str. kolor", ru: "{0} стр. моно + {1} стр. цвет", uk: "{0} стор. моно + {1} стор. колір" },
  "p_n_zl_mono_n_zl_kolor": { pl: "{0} zł mono / {1} zł kolor", ru: "{0} zł моно / {1} zł цвет", uk: "{0} zł моно / {1} zł колір" },
  "p_n_slash_n": { pl: "{0} / {1}", ru: "{0} / {1}", uk: "{0} / {1}" },

  // outsourcing-it (abonament IT, stawki godzinowe)
  "p_n_zl_nl_stanowisko_mies": { pl: "{0} zł\n/stanowisko/mies.", ru: "{0} zł\n/рабочее место/мес.", uk: "{0} zł\n/робоче місце/міс." },
  "p_n_zl_nl_stanowisko_v3": { pl: "{0} zł\n/stanowisko", ru: "{0} zł\n/рабочее место", uk: "{0} zł\n/робоче місце" },
  "p_n_zl_nl_h": { pl: "{0} zł\n/h", ru: "{0} zł\n/ч", uk: "{0} zł\n/год." },
  "p_n_zl_licencja": { pl: "{0} zł + licencja", ru: "{0} zł + лицензия", uk: "{0} zł + ліцензія" },
}

export const DURATION_WRAPPERS: Record<string, WrapperTemplate> = {
  "d_n_n_dni": { pl: "{0}-{1} dni", ru: "{0}-{1} дня", uk: "{0}-{1} дні" },
  "d_n_n_dni_v2": { pl: "{0}–{1} dni", ru: "{0}–{1} дня", uk: "{0}–{1} дні" },
  "d_n_n_dni_v3": { pl: "{0}-{1} dni", ru: "{0}-{1} дней", uk: "{0}-{1} днів" },
  "d_n_n_dni_v4": { pl: "{0}–{1} dni", ru: "{0}–{1} дней", uk: "{0}–{1} днів" },
  "d_n_n_dni_czesci": { pl: "{0}–{1} dni\n+ czas na części", ru: "{0}–{1} дней\n+ время на запчасти", uk: "{0}–{1} днів\n+ час на запчастини" },
  "d_do_n_h": { pl: "do {0} h", ru: "до {0} ч", uk: "до {0} год" },
  "d_od_reki": { pl: "od ręki", ru: "сразу", uk: "одразу" },
  "d_do_n_dnia": { pl: "do {0} dnia", ru: "до {0} дня", uk: "до {0} дня" },
  "d_do_n_min": { pl: "do {0} min", ru: "до {0} мин", uk: "до {0} хв" },
  "d_do_ustalenia": { pl: "do ustalenia", ru: "Индивидуально", uk: "за домовленістю" },
  "d_x_v2": { pl: "—", ru: "—", uk: "—" },
  "d_do_n_h_roboczych": { pl: "do {0} h roboczych", ru: "до {0} рабочих часов", uk: "до {0} робочих годин" },
  "d_do_n_h_roboczej": { pl: "do {0} h roboczej", ru: "до {0} рабочего часа", uk: "до {0} робочої години" },

  // Бывшие 3 спецслучая срока
  "d_wg_projektu": { pl: "wg projektu", ru: "по проекту", uk: "за проєктом" },
}
