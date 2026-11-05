// Labels of the switch per language (left = the local service, right = all of Poland by post).
// Kept outside the client component: server pages read these labels.
export const SCOPE_LABELS = {
  pl: { left: 'we Wrocławiu', right: 'cała Polska' },
  uk: { left: 'у Вроцлаві', right: 'вся Польща' },
  ru: { left: 'во Вроцлаве', right: 'вся Польша' },
  en: { left: 'in Wrocław', right: 'all of Poland' },
} as const
