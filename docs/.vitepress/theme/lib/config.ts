// ─────────────────────────────────────────────────────────────
//  Όλες οι ρυθμίσεις του Γειτονικού σε ένα σημείο.
//  Τα PLACEHOLDER_* αντικαθίστανται με τα πραγματικά IDs.
//  Όσο υπάρχουν placeholders, το site δουλεύει σε «demo mode»
//  με δοκιμαστικά δεδομένα και δεν στέλνει τίποτα πουθενά.
// ─────────────────────────────────────────────────────────────

export const BOOTFORM = {
  /** Host για υποβολές και δημόσιο feed */
  base: 'https://f.bootform.com',
  /** Φόρμα «Αφήνω κάτι» (με ενεργό Moderated Content Feed) */
  itemsFormId: 'ece2af40-bb13-4b16-b36f-21802deb24fa',
  /** Φόρμα «Ιστορίες» (με ενεργό Moderated Content Feed) */
  storiesFormId: 'PLACEHOLDER_STORIES_FORM_ID',
  /** Όνομα του honeypot πεδίου από το snippet του BootForm */
  honeypotField: '_gotcha',
  /**
   * true όταν το Moderated Content Feed είναι ενεργό (θέλει πλάνο Pro).
   * Όσο είναι false, ο χάρτης δείχνει demo δεδομένα, αλλά οι φόρμες στέλνουν κανονικά.
   */
  feedReady: false,
}

export const KIT = {
  /** Kit (ConvertKit) form ID για το newsletter */
  formId: 'PLACEHOLDER_KIT_FORM_ID',
}

export const CONTACT_EMAIL = 'PLACEHOLDER@geitoniko.gr'

export const isPlaceholder = (v: string) => v.startsWith('PLACEHOLDER')

/** Μετά από πόσες ώρες μια καταχώρηση θεωρείται «ίσως έχει φύγει» */
export const STALE_HOURS = 48

export const MAP = {
  /** Κέντρο: Μελίσσια */
  center: [38.0525, 23.8335] as [number, number],
  zoom: 14,
  /** Όρια χάρτη: Μαρούσι · Βριλήσσια · Μελίσσια · Νέα Πεντέλη · Πεντέλη · Κηφισιά (+ λίγο περιθώριο) */
  bounds: [
    [38.0, 23.76],
    [38.13, 23.92],
  ] as [[number, number], [number, number]],
}

/** Περιοχές που καλύπτει το Γειτονικό (το πεδίο στη φόρμα λέγεται `municipality`) */
export const AREAS: Record<string, { center: [number, number]; zoom: number }> = {
  Μαρούσι: { center: [38.049, 23.807], zoom: 15 },
  Βριλήσσια: { center: [38.034, 23.832], zoom: 15 },
  Μελίσσια: { center: [38.052, 23.833], zoom: 15 },
  'Νέα Πεντέλη': { center: [38.064, 23.86], zoom: 15 },
  Πεντέλη: { center: [38.049, 23.868], zoom: 15 },
  Κηφισιά: { center: [38.074, 23.811], zoom: 14 },
}

export const MUNICIPALITIES = Object.keys(AREAS)

export const CATEGORIES = [
  { id: 'furniture', label: 'Έπιπλα', emoji: '🛋️' },
  { id: 'appliances', label: 'Ηλεκτρικές συσκευές', emoji: '🔌' },
  { id: 'toys', label: 'Παιχνίδια', emoji: '🧸' },
  { id: 'clothes', label: 'Ρούχα & παπούτσια', emoji: '👕' },
  { id: 'books', label: 'Βιβλία', emoji: '📚' },
  { id: 'home', label: 'Είδη σπιτιού & κουζίνας', emoji: '🍳' },
  { id: 'sports', label: 'Αθλητικά & ποδήλατα', emoji: '🚲' },
  { id: 'garden', label: 'Κήπος', emoji: '🪴' },
  { id: 'other', label: 'Άλλο', emoji: '📦' },
]

export const categoryOf = (id: string) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
