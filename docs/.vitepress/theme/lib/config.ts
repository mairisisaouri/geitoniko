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
  honeypotField: '_honeypot',
  /**
   * true όταν το Moderated Content Feed είναι ενεργό (θέλει πλάνο Pro).
   * Όσο είναι false, ο χάρτης δείχνει demo δεδομένα, αλλά οι φόρμες στέλνουν κανονικά.
   */
  feedReady: true,
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
  /** Κέντρο: Αθήνα */
  center: [38.0, 23.76] as [number, number],
  zoom: 11,
  /** Όρια χάρτη: λεκανοπέδιο Αττικής (+ λίγο περιθώριο) */
  bounds: [
    [37.8, 23.52],
    [38.2, 24.05],
  ] as [[number, number], [number, number]],
}

/** Περιοχές που καλύπτει το Γειτονικό (το πεδίο στη φόρμα λέγεται `municipality`) */
export const AREAS: Record<string, { center: [number, number]; zoom: number }> = {
  // Κέντρο
  Αθήνα: { center: [37.984, 23.728], zoom: 14 },
  Καισαριανή: { center: [37.97, 23.765], zoom: 15 },
  Βύρωνας: { center: [37.96, 23.753], zoom: 15 },
  Ζωγράφου: { center: [37.976, 23.77], zoom: 15 },
  Γαλάτσι: { center: [38.018, 23.75], zoom: 15 },
  // Βόρεια
  Μαρούσι: { center: [38.049, 23.807], zoom: 15 },
  Βριλήσσια: { center: [38.034, 23.832], zoom: 15 },
  Μελίσσια: { center: [38.052, 23.833], zoom: 15 },
  'Νέα Πεντέλη': { center: [38.064, 23.86], zoom: 15 },
  Πεντέλη: { center: [38.049, 23.868], zoom: 15 },
  Κηφισιά: { center: [38.074, 23.811], zoom: 14 },
  Χαλάνδρι: { center: [38.021, 23.8], zoom: 15 },
  'Αγία Παρασκευή': { center: [38.011, 23.82], zoom: 15 },
  Χολαργός: { center: [38.004, 23.8], zoom: 15 },
  Παπάγου: { center: [37.99, 23.795], zoom: 15 },
  Ψυχικό: { center: [38.01, 23.77], zoom: 15 },
  'Φιλοθέη': { center: [38.024, 23.785], zoom: 15 },
  'Νέα Ιωνία': { center: [38.036, 23.757], zoom: 15 },
  Ηράκλειο: { center: [38.054, 23.768], zoom: 15 },
  Λυκόβρυση: { center: [38.07, 23.783], zoom: 15 },
  Πεύκη: { center: [38.062, 23.792], zoom: 15 },
  'Νέα Ερυθραία': { center: [38.096, 23.817], zoom: 15 },
  Μεταμόρφωση: { center: [38.062, 23.76], zoom: 15 },
  'Νέα Φιλαδέλφεια': { center: [38.035, 23.738], zoom: 15 },
  // Νότια
  'Νέα Σμύρνη': { center: [37.946, 23.713], zoom: 15 },
  Καλλιθέα: { center: [37.955, 23.702], zoom: 15 },
  'Παλαιό Φάληρο': { center: [37.928, 23.7], zoom: 15 },
  Άλιμος: { center: [37.91, 23.722], zoom: 15 },
  Γλυφάδα: { center: [37.865, 23.755], zoom: 14 },
  Βούλα: { center: [37.845, 23.775], zoom: 15 },
  Ηλιούπολη: { center: [37.932, 23.756], zoom: 15 },
  Αργυρούπολη: { center: [37.905, 23.75], zoom: 15 },
  'Άγιος Δημήτριος': { center: [37.935, 23.73], zoom: 15 },
  Δάφνη: { center: [37.947, 23.737], zoom: 15 },
  // Δυτικά
  Περιστέρι: { center: [38.015, 23.69], zoom: 14 },
  Αιγάλεω: { center: [37.993, 23.676], zoom: 15 },
  Χαϊδάρι: { center: [38.012, 23.66], zoom: 15 },
  Πετρούπολη: { center: [38.04, 23.685], zoom: 15 },
  Ίλιον: { center: [38.035, 23.703], zoom: 15 },
  'Αγία Βαρβάρα': { center: [37.99, 23.66], zoom: 15 },
  // Πειραιάς
  Πειραιάς: { center: [37.942, 23.647], zoom: 14 },
  Κορυδαλλός: { center: [37.98, 23.65], zoom: 15 },
  Νίκαια: { center: [37.965, 23.645], zoom: 15 },
  Κερατσίνι: { center: [37.962, 23.62], zoom: 15 },
  Δραπετσώνα: { center: [37.947, 23.625], zoom: 15 },
  Πέραμα: { center: [37.965, 23.565], zoom: 15 },
  // Ανατολικά
  Γέρακας: { center: [38.023, 23.86], zoom: 15 },
  Παλλήνη: { center: [38.0, 23.88], zoom: 15 },
  Βάρη: { center: [37.835, 23.8], zoom: 14 },
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
