import type { Item } from './bootform'

// ─────────────────────────────────────────────────────────────
//  Καταχωρήσεις που προσθέτουμε με το χέρι (π.χ. από αγγελίες
//  σε ομάδες Facebook). Εμφανίζονται στον χάρτη μαζί με όσες
//  έρχονται από τη φόρμα του BootForm.
//
//  Για νέα καταχώρηση: πρόσθεσε ένα αντικείμενο στη λίστα.
//  - id: μοναδικό, πάντα με πρόθεμα `manual-`
//  - category: ένα από τα ids στο CATEGORIES (config.ts)
//  - lat/lng: το σημείο παραλαβής. Μπαίνουν ΜΟΝΟ αγγελίες που
//    λένε έστω περίπου πού είναι (στάση, εκκλησία, πλατεία ή
//    τουλάχιστον περιοχή). Αν το σημείο είναι κατά προσέγγιση,
//    το γράφουμε στην περιγραφή. Όχι αγγελίες χωρίς καμία
//    πληροφορία ή μόνο με αποστολή (π.χ. BoxNow).
//  - availableFrom: πότε δημοσιεύτηκε η αγγελία (ISO)
//  - source: από πού την πήραμε, sourceUrl: link στην ανάρτηση
//  Μετά από 48 ώρες εμφανίζεται ως «Ίσως έχει φύγει».
//  Χωρίς ονόματα, τηλέφωνα ή φωτογραφίες ιδιωτών.
// ─────────────────────────────────────────────────────────────

export interface ManualItem {
  id: string
  title: string
  category: string
  description?: string
  municipality: string
  lat: number
  lng: number
  availableFrom: string
  availableUntil?: string
  source?: string
  sourceUrl?: string
}

export const MANUAL_ITEMS: ManualItem[] = [
  {
    id: 'manual-2026-11-08-07',
    title: 'Αθλητικά παπούτσια νο. 35',
    category: 'clothes',
    description: 'Σε πολύ καλή κατάσταση. Παραλαβή από Αμπελόκηποι ή αποστολή με box, με έξοδα παραλήπτη. Το σημείο είναι κατά προσέγγιση στην περιοχή.',
    municipality: 'Αθήνα',
    lat: 37.9894,
    lng: 23.7611,
    availableFrom: '2026-11-08T23:11:00+02:00',
    source: 'Facebook · Χαρίζω!!',
  },
  {
    id: 'manual-2026-11-08-08',
    title: 'Συγγράμματα νοσηλευτικής',
    category: 'books',
    description: 'Για σχολή ή κατατακτήριες, μεμονωμένα ή όλα μαζί. Παραλαβή από Γλυφάδα ή αποστολή με έξοδα παραλήπτη. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Γλυφάδα.',
    municipality: 'Γλυφάδα',
    lat: 37.865,
    lng: 23.755,
    availableFrom: '2026-11-08T21:21:00+02:00',
    source: 'Facebook · ΧΑΡΙΖΟΝΤΑΙ ΒΙΒΛΙΑ',
  },
  {
    id: 'manual-2026-11-08-09',
    title: 'Κιθάρα',
    category: 'other',
    description: 'Μπορεί να έχει χαραγές. Παραλαβή στην Αθήνα. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Αθήνα.',
    municipality: 'Αθήνα',
    lat: 37.9862,
    lng: 23.7268,
    availableFrom: '2026-11-08T13:27:00+02:00',
    source: 'Facebook · Μόνο χαρίζω',
  },
  {
    id: 'manual-2026-11-08-11',
    title: 'Καλύμματα τριθέσιου καναπέ, μπεζ',
    category: 'home',
    description: 'Παραλαβή από Νέα Σμύρνη, μόνο χέρι με χέρι, έως την Τετάρτη 11 Νοεμβρίου. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Νέα Σμύρνη.',
    municipality: 'Νέα Σμύρνη',
    lat: 37.9472,
    lng: 23.7145,
    availableFrom: '2026-11-08T13:23:00+02:00',
    availableUntil: '2026-11-11T23:59:00+02:00',
    source: 'Facebook · Χαρίζω με ΑΓΑΠΗ ότι δεν χρειάζομαι',
  },
  {
    id: 'manual-2026-11-08-10',
    title: 'Γυναικεία μπλούζα',
    category: 'clothes',
    description: 'Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Μαρούσι.',
    municipality: 'Μαρούσι',
    lat: 38.049,
    lng: 23.807,
    availableFrom: '2026-11-08T10:47:00+02:00',
    source: 'Facebook · χαρίζω ότι δεν χρειάζομαι.',
  },
  {
    id: 'manual-2026-11-07-06',
    title: 'Καναπές',
    category: 'furniture',
    description: 'Περιοχή Άνω Νέα Σμύρνη. Η πινέζα είναι κατά προσέγγιση στη Νέα Σμύρνη.',
    municipality: 'Νέα Σμύρνη',
    lat: 37.946,
    lng: 23.713,
    availableFrom: '2026-11-07T18:24:00+02:00',
    source: 'Facebook · Νέα Σμύρνη η γειτονιά μας',
  },
  {
    id: 'manual-2026-11-07-07',
    title: 'Τριθέσιος καναπές',
    category: 'furniture',
    description: 'Σε πολύ καλή κατάσταση. Περιοχή Άνω Γλυφάδα. Το σημείο είναι κατά προσέγγιση στην περιοχή.',
    municipality: 'Γλυφάδα',
    lat: 37.8815,
    lng: 23.7657,
    availableFrom: '2026-11-07T13:47:00+02:00',
    source: 'Facebook · ΧΑΡΙΖΟΝΤΑΙ ΑΝΤΙΚΕΙΜΕΝΑ',
  },
  {
    id: 'manual-2026-11-08-01',
    title: 'Κάρτα γραφικών Gigabyte GV-R455D3-512I',
    category: 'appliances',
    description: 'Δούλευε όταν χρησιμοποιήθηκε τελευταία, πριν από χρόνια, και δεν έχει δοκιμαστεί από τότε. Προτιμάται αποστολή, αλλιώς κατόπιν συνεννόησης. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Περιστέρι.',
    municipality: 'Περιστέρι',
    lat: 38.015,
    lng: 23.69,
    availableFrom: '2026-11-08T22:02:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221980',
  },
  {
    id: 'manual-2026-11-08-02',
    title: 'Μεταλλικό κλειδί ηλεκτρικού πίνακα',
    category: 'other',
    description: 'Από κοντά ή σε στάση μετρό, κατόπιν συνεννόησης. Στο 2030.gr ζητά 20 coins. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.9852,
    lng: 23.728,
    availableFrom: '2026-11-08T17:42:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221977',
  },
  {
    id: 'manual-2026-11-08-03',
    title: 'Μπλε λάμπα',
    category: 'home',
    description: 'Λειτουργική. Από κοντά ή σε στάση μετρό, κατόπιν συνεννόησης. Στο 2030.gr ζητά 5 coins. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.9852,
    lng: 23.7296,
    availableFrom: '2026-11-08T17:04:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221974',
  },
  {
    id: 'manual-2026-11-08-04',
    title: 'Γρανάζια (όλα μαζί ή ξεχωριστά)',
    category: 'other',
    description: 'Σε στάση μετρό, κατόπιν συνεννόησης. Στο 2030.gr ζητά 10 coins. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.984,
    lng: 23.7262,
    availableFrom: '2026-11-08T17:00:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221972',
  },
  {
    id: 'manual-2026-11-08-05',
    title: 'Σετ 2 μαγνητών',
    category: 'other',
    description: 'Σε στάση μετρό, κατόπιν συνεννόησης. Στο 2030.gr ζητά 5 coins. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.984,
    lng: 23.7302,
    availableFrom: '2026-11-08T16:58:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221971',
  },
  {
    id: 'manual-2026-11-08-06',
    title: 'Πακέτο βιβλιαράκια και DVD (RAM, HITECH)',
    category: 'books',
    description: 'Από κοντά ή σε στάση μετρό, κατόπιν συνεννόησης. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Παπάγου-Χολαργού.',
    municipality: 'Χολαργός',
    lat: 38.004,
    lng: 23.8,
    availableFrom: '2026-11-08T10:27:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221965',
  },
  {
    id: 'manual-2026-11-07-01',
    title: 'Switch Linksys EZXS88W, 8 θύρες',
    category: 'appliances',
    description: 'Λειτουργικό. Παράδοση χέρι με χέρι. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.9826,
    lng: 23.727,
    availableFrom: '2026-11-07T23:25:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221963',
  },
  {
    id: 'manual-2026-11-07-02',
    title: 'Switch NetGear FS205, 5 θύρες',
    category: 'appliances',
    description: 'Λειτουργικό. Παράδοση χέρι με χέρι. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Αθηναίων.',
    municipality: 'Αθήνα',
    lat: 37.9826,
    lng: 23.729,
    availableFrom: '2026-11-07T23:21:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221962',
  },
  {
    id: 'manual-2026-11-07-03',
    title: '2 ατσάλινα τηλεσκοπικά τρίποδα',
    category: 'other',
    description: 'Το ένα έχει μικρή φθορά στα πλαστικά πατάκια και το άλλο δεν έχει κεφαλή. Παραλαβή μόνο πίσω από το Εφετείο Αθηνών. Η πινέζα είναι κατά προσέγγιση στο κέντρο της Αθήνας.',
    municipality: 'Αθήνα',
    lat: 37.9834,
    lng: 23.725,
    availableFrom: '2026-11-07T22:18:00+02:00',
    source: 'xariseto.gr',
    sourceUrl: 'https://xariseto.gr/viewtopic.php?t=221685',
  },
  {
    id: 'manual-2026-11-07-04',
    title: 'Μηχανή espresso Moulinex Type B21',
    category: 'appliances',
    description: 'Ήταν αποθηκευμένη πάνω από 10 χρόνια, με άγνωστη λειτουργικότητα, και θέλει καλό καθάρισμα. Έχει εξάρτημα για αφρόγαλο. Παραλαβή μόνο πίσω από το Εφετείο Αθηνών. Η πινέζα είναι κατά προσέγγιση στο κέντρο της Αθήνας.',
    municipality: 'Αθήνα',
    lat: 37.9848,
    lng: 23.7312,
    availableFrom: '2026-11-07T11:18:00+02:00',
    source: 'xariseto.gr',
    sourceUrl: 'https://xariseto.gr/viewtopic.php?t=221678',
  },
  {
    id: 'manual-2026-11-07-05',
    title: 'Σφραγισμένο λογισμικό CA PC Tune-Up 2.0 (2009)',
    category: 'other',
    description: 'Για Windows XP/Vista/7, αχρησιμοποίητο. Από κοντά, κατόπιν συνεννόησης. Στο 2030.gr ζητά 3 coins. Το σημείο είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Δήμο Πεντέλης.',
    municipality: 'Πεντέλη',
    lat: 38.049,
    lng: 23.868,
    availableFrom: '2026-11-07T10:43:00+02:00',
    source: '2030.gr (Xariseto)',
    sourceUrl: 'https://2030.gr/listings/view_post.php?id=221960',
  },
  {
    id: 'manual-2026-10-15-01',
    title: 'Πάνες ακράτειας για γάτα (7 τεμ., νούμερο S)',
    category: 'other',
    description: 'Για γάτα περίπου 5-7 κιλά. Από χέρι σε χέρι στο μετρό Πανόρμου (ή στη Ραφήνα), κατόπιν συνεννόησης.',
    municipality: 'Αθήνα',
    lat: 37.9932,
    lng: 23.7636,
    availableFrom: '2026-10-15T08:30:00+03:00',
    source: 'Facebook · Σατανισμός Και Γάτες',
  },
  {
    id: 'manual-2026-10-14-02',
    title: 'Παπούτσια νο. 37 και ρούχα S-M',
    category: 'clothes',
    description: 'Βραδινά παπούτσια, πέδιλα, μπότες (αφόρετα ή ελάχιστα φορεμένα), τζιν, καμπαρντίνες, φούστες, φορέματα. Παράδοση στη στάση τραμ Αιγαίου.',
    municipality: 'Νέα Σμύρνη',
    lat: 37.9501,
    lng: 23.7189,
    availableFrom: '2026-10-14T22:30:00+03:00',
    source: 'Facebook · Χαρίζω!!',
  },
  {
    id: 'manual-2026-10-14-03',
    title: 'Γυναικεία ρούχα L-XL',
    category: 'clothes',
    description: 'Χειμερινά και καλοκαιρινά: τζιν, φούτερ, παντελόνια, μπλούζες. Παραλαβή από Άγ. Φανούριο, Ίλιον.',
    municipality: 'Ίλιον',
    lat: 38.0239,
    lng: 23.7118,
    availableFrom: '2026-10-14T20:30:00+03:00',
    source: 'Facebook · χαρίζω ότι δεν χρειάζομαι.',
  },
]

export const isManualId = (id: string) => id.startsWith('manual-')

export function manualItems(): Item[] {
  return MANUAL_ITEMS.map((m) => {
    const from = new Date(m.availableFrom)
    return {
      id: m.id,
      title: m.title,
      category: m.category,
      description: m.description ?? '',
      municipality: m.municipality,
      lat: m.lat,
      lng: m.lng,
      availableFrom: from,
      availableUntil: m.availableUntil ? new Date(m.availableUntil) : null,
      createdAt: from,
      photo: null,
      up: 0,
      down: 0,
      source: m.source,
      sourceUrl: m.sourceUrl,
    }
  })
}
