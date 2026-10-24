import { toPageContent } from './legal-render'
import { regulaminPl, politykaPl } from './legal-texts-pl'
import { regulaminUk, politykaUk } from './legal-texts-uk'
import { regulaminRu, politykaRu } from './legal-texts-ru'

export type { LegalSection, LegalPageContent } from './legal-render'

// Texts live in legal-texts-<lang>.ts (PL is the source of truth); this file only
// keeps the export names the regulamin / polityka-prywatnosci routes import.
export const regulaminContent = toPageContent(regulaminPl)
export const politykaPrywatnosciContent = toPageContent(politykaPl)
export const regulaminContentUk = toPageContent(regulaminUk)
export const politykaPrywatnosciContentUk = toPageContent(politykaUk)
export const regulaminContentRu = toPageContent(regulaminRu)
export const politykaPrywatnosciContentRu = toPageContent(politykaRu)
