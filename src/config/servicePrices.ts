export interface ServiceBasePrices {
    diagnosisTime: string
    dojazdReturn: string
    expressMultiplier: string
}

// ШАБЛОН блока diagnoza — БЕЗ ЦЕНЫ
export const DIAGNOSIS_TEMPLATE = {
    service: 'Wycena naprawy (bez naprawy)',
    duration: '1–3 dni',
}

// ВАЖНО:
// В этом файле БОЛЬШЕ НЕТ цен на "Wycena naprawy (bez naprawy)"
// Цены будут прописываться ЯВНО в каждой услуге

export const servicePrices: Record<string, ServiceBasePrices> = {
    'serwis-laptopow': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '100',
        expressMultiplier: '+100%',
    },

    'serwis-komputerow-stacjonarnych': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '100',
        expressMultiplier: '+100%',
    },

    'outsourcing-it': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '100',
        expressMultiplier: '+50% / +100%',
    },

    'serwis-drukarek-laserowych': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '50 / 80 / 100',
        expressMultiplier: '+100%',
    },

    'serwis-drukarek-atramentowych': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '50 / 80 / 100',
        expressMultiplier: '+100%',
    },

    'serwis-drukarek-iglowych': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '50 / 80 / 100',
        expressMultiplier: '+100%',
    },

    'serwis-drukarek-3d': {
        diagnosisTime: '1–3 dni',
        dojazdReturn: '100',
        expressMultiplier: '+100%',
    },

    'serwis-plotterow': {
        diagnosisTime: '2–5 dni',
        dojazdReturn: '100',
        expressMultiplier: '+100%',
    },

    'serwis-drukarek-termicznych': {
        diagnosisTime: '2–5 dni',
        dojazdReturn: '100',
        expressMultiplier: '+100%',
    },
}
