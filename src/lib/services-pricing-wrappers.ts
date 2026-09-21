export interface WrapperTemplate {
  pl: string
  ru: string
  uk: string
}

export const PRICE_WRAPPERS: Record<string, WrapperTemplate> = {
  "p_n_n_n": { pl: "{0} / {1} / {2}", ru: "{0} / {1} / {2}", uk: "{0} / {1} / {2}" },
  "p_n_zl": { pl: "{0} zł", ru: "{0} zł", uk: "{0} zł" },
  "p_gratis": { pl: "GRATIS", ru: "Бесплатно", uk: "Безкоштовно" },
  "p_n": { pl: "{0}", ru: "{0}", uk: "{0}" },
  "p_n_zl_v2": { pl: "{0} zł", ru: "{0}", uk: "{0}" },
  "p_n_zl_czesc": { pl: "{0} zł + część", ru: "{0} + деталь", uk: "{0} + деталь" },
  "p_n_n_n_nl_czesci": { pl: "{0} / {1} / {2}\n+ części", ru: "{0} / {1} / {2}\n+ детали", uk: "{0} / {1} / {2}\n+ частини" },
  "p_npct_nl_do_ceny": { pl: "+ {0}%\ndo ceny", ru: "+ {0}%\nк цене", uk: "+ {0}%\nдо ціни" },
  "p_n_zl_czesci": { pl: "{0} zł + części", ru: "{0} zł + детали", uk: "{0} zł + частини" },
  "p_n_n_n_czesci": { pl: "{0} / {1} / {2} + części", ru: "{0} / {1} / {2} + детали", uk: "{0} / {1} / {2} + частини" },
  "p_n_n_n_czesci_v2": { pl: "{0} / {1} / {2} + części", ru: "{0} / {1} / {2} + детали", uk: "{0} / {1} / {2} + деталі" },
  "p_n_n_zl": { pl: "{0}-{1} zł", ru: "{0}-{1}", uk: "{0}-{1}" },
  "p_n_zl_km": { pl: "{0} zł/km", ru: "{0} zł/км", uk: "{0} zł/km" },
  "p_n_n_n_czesc": { pl: "{0} / {1} / {2} + część", ru: "{0} / {1} / {2} + деталь", uk: "{0} / {1} / {2} + деталь" },
  "p_n_czesc": { pl: "{0} + część", ru: "{0} + деталь", uk: "{0} + деталь" },
  "p_n_n_n_nl_czesci_v2": { pl: "{0} / {1} / {2}\n+ części", ru: "{0} / {1} / {2}\n+ детали", uk: "{0} / {1} / {2}\n+ деталі" },
  "p_n_n_n_nl_czesc": { pl: "{0} / {1} / {2}\n+ część", ru: "{0} / {1} / {2}\n+ деталь", uk: "{0} / {1} / {2}\n+ деталь" },
  "p_n_n": { pl: "{0}-{1}", ru: "{0}-{1}", uk: "{0}-{1}" },
  "p_n_nl_godzine": { pl: "{0}\n/ godzinę", ru: "{0}\n/ час", uk: "{0}\n/ годину" },
  "p_n_n_n_material": { pl: "{0} / {1} / {2} + materiał", ru: "{0} / {1} / {2} + материал", uk: "{0} / {1} / {2} + матеріал" },
  "p_link": { pl: "Link", ru: "Link", uk: "Link" },
  "p_n_zl_gram_n_zl_godz": { pl: "{0} zł/gram + {1} zł/godz.", ru: "{0} zł/грамм + {1} zł/час", uk: "{0} zł/грам + {1} zł/год." },
  "p_n_zl_nl_do_n_min_pracy": { pl: "{0} zł\ndo {1} min pracy", ru: "{0} zł\nдо {1} мин работы", uk: "{0} zł\nдо {1} хв роботи" },
  "p_n_zl_nl_godzine": { pl: "{0} zł\n/ godzinę", ru: "{0}\n/ час", uk: "{0}\n/ годину" },
  "p_n_n_zl_czesci": { pl: "{0}-{1} zł + części", ru: "{0}-{1} + детали", uk: "{0}-{1} + деталі" },
  "p_n_n_czesci": { pl: "{0}-{1} + części", ru: "{0}-{1} + детали", uk: "{0}-{1} + деталі" },
  "p_n_zl_nl_stanowisko": { pl: "{0} zł\n/ stanowisko", ru: "{0} zł\n/ станция", uk: "{0} zł\n/ станція" },
  "p_n_zl_nl_godzine_v2": { pl: "{0} zł\n/ godzinę", ru: "{0} zł\n/ час", uk: "{0} zł\n/ годину" },
  "p_npct_nl_do_ceny_v2": { pl: "+{0}%\ndo ceny", ru: "+{0}%\nк цене", uk: "+{0}%\nдо ціни" },
  "p_n_godzine": { pl: "{0} / godzinę", ru: "{0} / час", uk: "{0} / годину" },
  "p_n_zl_nl_stanowisko_v2": { pl: "{0} zł\n/ stanowisko", ru: "{0} zł\n/ место", uk: "{0} zł\n/ місце" },

  // Бывшие 19 спецслучаев цены — уникальные, по 1 использованию каждая
  "p_plus_n_zl": { pl: "+ {0} zł", ru: "+ {0} zł", uk: "+ {0} zł" },
  "p_n_zl_plus_n_zl_km": { pl: "{0} zł + {1} zł/km", ru: "{0} zł + {1} zł/км", uk: "{0} zł + {1} zł/km" },
  "p_n_zl_nosnik": { pl: "{0} zł + nośnik", ru: "{0} + носитель", uk: "{0} + носій" },
  "p_od_n_zl": { pl: "od {0} zł", ru: "от {0}", uk: "від {0}" },
  "p_n_n_zl_czesc": { pl: "{0}-{1} zł + część", ru: "{0}-{1} + деталь", uk: "{0}-{1} + деталь" },
  "p_n_n_czesc": { pl: "{0}-{1} + część", ru: "{0}-{1} + деталь", uk: "{0}-{1} + деталь" },
  "p_n_czesci": { pl: "{0} + części", ru: "{0} + детали", uk: "{0} + деталі" },
  "p_n_nosnik": { pl: "{0} + nośnik", ru: "{0} + носитель", uk: "{0} + носій" },
  "p_od_n": { pl: "od {0}", ru: "от {0}", uk: "від {0}" },
  "p_n_n_n_koszt_tonera": { pl: "{0} / {1} / {2} + koszt tonera", ru: "{0} / {1} / {2} + стоимость тонера", uk: "{0} / {1} / {2} + вартість тонера" },
  "p_n_n_n_koszt_tuszu": { pl: "{0} / {1} / {2} + koszt tuszu", ru: "{0} / {1} / {2} + стоимость чернил", uk: "{0} / {1} / {2} + вартість чорнила" },
  "p_od_n_zl_v2": { pl: "od {0} zł", ru: "от {0} zł", uk: "від {0} zł" },
  "p_od_n_n_n_nl_za_dzien": { pl: "od {0} / {1} / {2}\nza dzień", ru: "от {0} / {1} / {2}\nза день", uk: "від {0} / {1} / {2}\nза день" },
  "p_n_zl_godz": { pl: "{0} zł / godz.", ru: "{0} zł / час.", uk: "{0} zł / год." },
  "p_dash": { pl: "—", ru: "—", uk: "—" },
  "p_wg_cennika_przewoznika": { pl: "według cennika\nprzewoźnika", ru: "по тарифу\nперевозчика", uk: "за тарифом\nперевізника" },
  "p_gratis_nl_do_n_min_konsultacji": { pl: "GRATIS\ndo {0} min konsultacji", ru: "БЕСПЛАТНО\nдо {0} мин консультации", uk: "БЕЗКОШТОВНО\nдо {0} хв консультації" },
  "p_n_zl_nl_do_n_godz_pracy": { pl: "{0} zł\ndo {1} godz. pracy", ru: "{0} zł\nдо {1} ч работы", uk: "{0} zł\nдо {1} год роботи" },
  "p_n_zl_nl_za_kazde_dodatkowe_n_min_pracy": { pl: "{0} zł\nza każde {1} min pracy", ru: "{0} zł\nза каждые {1} мин работы", uk: "{0} zł\nза кожні {1} хв роботи" },

  // wynajem-drukarek / drukarka-zastepcza (tariff limity stron + ceny)
  "p_n_str_mies": { pl: "{0} (str./mies.)", ru: "{0} (стр./мес.)", uk: "{0} (стор./міс.)" },
  "p_n_str_mono_plus_n_str_kolor": { pl: "{0} str. (mono) / + {1} str. (kolor)", ru: "{0} стр. (моно) / + {1} стр. (цвет)", uk: "{0} стор. (моно) / + {1} стор. (колір)" },
  "p_n_zl_mono_n_zl_kolor": { pl: "{0} zł (mono) / {1} zł (kolor)", ru: "{0} zł (моно) / {1} zł (цвет)", uk: "{0} zł (моно) / {1} zł (колір)" },
  "p_n_slash_n": { pl: "{0} / {1}", ru: "{0} / {1}", uk: "{0} / {1}" },
}

export const DURATION_WRAPPERS: Record<string, WrapperTemplate> = {
  "d_n_n_dni": { pl: "{0}-{1} dni", ru: "{0}-{1} дня", uk: "{0}-{1} дні" },
  "d_n_n_dni_v2": { pl: "{0}–{1} dni", ru: "{0}–{1} дня", uk: "{0}–{1} дні" },
  "d_n_dzien": { pl: "{0} dzień", ru: "{0} день", uk: "{0} день" },
  "d_n_n_dni_v3": { pl: "{0}-{1} dni", ru: "{0}-{1} дней", uk: "{0}-{1} днів" },
  "d_n_min": { pl: "{0} min", ru: "{0} мин", uk: "{0} хв" },
  "d_n_h": { pl: "{0} h", ru: "{0} ч", uk: "{0} год" },
  "d_n_n_godz": { pl: "{0}–{1} godz.", ru: "{0}–{1} ч", uk: "{0}–{1} год" },
  "d_n_n_dni_v4": { pl: "{0}–{1} dni", ru: "{0}–{1} дней", uk: "{0}–{1} днів" },
  "d_do_n_h": { pl: "do {0} h", ru: "до {0} ч", uk: "до {0} год" },
  "d_od_reki": { pl: "od ręki", ru: "сразу", uk: "одразу" },
  "d_do_n_dnia": { pl: "do {0} dnia", ru: "до {0} дня", uk: "до {0} дня" },
  "d_x": { pl: "-", ru: "-", uk: "-" },
  "d_do_n_min": { pl: "do {0} min", ru: "до {0} мин", uk: "до {0} хв" },
  "d_do_ustalenia": { pl: "do ustalenia", ru: "Индивидуально", uk: "за домовленістю" },
  "d_x_v2": { pl: "—", ru: "—", uk: "—" },

  // Бывшие 3 спецслучая срока
  "d_wg_dostepnosci": { pl: "wg dostępności", ru: "по наличию моделей", uk: "за наявністю моделей" },
  "d_wg_ustalen": { pl: "wg ustaleń", ru: "Индивидуально", uk: "за домовленістю" },
  "d_wg_projektu": { pl: "wg projektu", ru: "по проекту", uk: "за проєктом" },
}
