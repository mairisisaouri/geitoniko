import { withBase } from 'vitepress'
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
//  - street: true για ό,τι είναι αφημένο στον δρόμο. Χωρίς αυτό
//    η καταχώρηση πάει στο τμήμα «Χαρίζεται».
//  - photo: αρχείο στο docs/public/photos, π.χ. /photos/x.jpg.
//    Όποιος άνθρωπος ή πινακίδα φαίνεται, θολώνεται.
//  Ποτέ ονόματα ή τηλέφωνα.
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
  street?: boolean
  photo?: string
}

const TH = 'Facebook · Treasurehunters Athens'
const thPost = (id: string) => `https://www.facebook.com/groups/1398434993674038/posts/${id}/`

export const MANUAL_ITEMS: ManualItem[] = [
  // ── Αφημένα στον δρόμο ──
  {
    id: 'street-2026-11-12-01',
    street: true,
    title: 'Τρεις ξύλινες καρέκλες με ταπετσαρία',
    category: 'furniture',
    description: 'Σε πολύ καλή κατάσταση, στο πεζοδρόμιο της Θεοτοκόπουλου. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Χολαργός',
    lat: 38.001,
    lng: 23.7985,
    availableFrom: '2026-11-12T12:26:00+02:00',
    source: TH,
    sourceUrl: thPost('3354187061432145'),
    photo: '/photos/fb-3354187061432145.jpg',
  },
  {
    id: 'street-2026-11-12-02',
    street: true,
    title: 'Ξύλινα ραφάκια / βιβλιοθήκες',
    category: 'furniture',
    description: 'Θεαγένους και Αλκμαιωνιδών. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Καισαριανή',
    lat: 37.9635,
    lng: 23.763,
    availableFrom: '2026-11-12T12:10:00+02:00',
    source: TH,
    sourceUrl: thPost('3354172754766909'),
    photo: '/photos/fb-3354172754766909.jpg',
  },
  {
    id: 'street-2026-11-12-03',
    street: true,
    title: 'Γκρι βελούδινη καρέκλα γραφείου',
    category: 'furniture',
    description: 'Αρκαδίου και Σπ. Ματσούκα, δίπλα στους κάδους. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Αγία Παρασκευή',
    lat: 38.0095,
    lng: 23.825,
    availableFrom: '2026-11-12T11:30:00+02:00',
    source: TH,
    sourceUrl: thPost('3354110938106424'),
    photo: '/photos/fb-3354110938106424.jpg',
  },
  {
    id: 'street-2026-11-12-04',
    street: true,
    title: 'Ονυχοδρόμιο / σπιτάκι για γάτα',
    category: 'home',
    description: 'Γερό και καθαρό, σχεδόν άθικτο. Επτανήσου και Αγίου Μελετίου, έξω από σούπερ μάρκετ. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Αθήνα',
    lat: 38.0005,
    lng: 23.7365,
    availableFrom: '2026-11-12T10:00:00+02:00',
    source: TH,
    sourceUrl: thPost('3354072178110300'),
    photo: '/photos/fb-3354072178110300.jpg',
  },
  {
    id: 'street-2026-11-12-05',
    street: true,
    title: 'Καρέκλες, κομοδίνο, χαλί και τραπεζάκι',
    category: 'furniture',
    description: 'Λεωφόρος Ιωνίας, λίγο πάνω από την παιδική χαρά. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Άλιμος',
    lat: 37.916,
    lng: 23.723,
    availableFrom: '2026-11-12T08:00:00+02:00',
    source: TH,
    sourceUrl: thPost('3353962148121303'),
    photo: '/photos/fb-3353962148121303.jpg',
  },
  {
    id: 'street-2026-11-12-06',
    street: true,
    title: 'Εγκυκλοπαίδεια σε τσάντες',
    category: 'books',
    description: 'Τόμοι της Μεγάλης Αμερικανικής Εγκυκλοπαίδειας, στη Σπύρου Μελά. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Μεταμόρφωση',
    lat: 38.06,
    lng: 23.758,
    availableFrom: '2026-11-12T07:30:00+02:00',
    source: TH,
    sourceUrl: thPost('3353936798123838'),
    photo: '/photos/fb-3353936798123838.jpg',
  },
  {
    id: 'street-2026-11-11-01',
    street: true,
    title: 'Πέδιλα θαλάσσιου σκι',
    category: 'sports',
    description: 'Σε μέτρια κατάσταση. Π. Μελά, κοντά στο Κρατικό Νοσοκομείο. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Νίκαια',
    lat: 37.962,
    lng: 23.648,
    availableFrom: '2026-11-11T19:00:00+02:00',
    source: TH,
    sourceUrl: thPost('3353324908185027'),
    photo: '/photos/fb-3353324908185027.jpg',
  },
  {
    id: 'street-2026-11-11-02',
    street: true,
    title: 'Υφασμάτινη πολυθρόνα με μεταλλικό σκελετό',
    category: 'furniture',
    description: 'Σε καλή κατάσταση. Ηρώων Πολυτεχνείου, Δάσος Χαϊδαρίου. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Χαϊδάρι',
    lat: 38.013,
    lng: 23.654,
    availableFrom: '2026-11-11T14:59:00+02:00',
    source: TH,
    sourceUrl: thPost('3353062608211257'),
    photo: '/photos/fb-3353062608211257.jpg',
  },
  {
    id: 'street-2026-11-11-03',
    street: true,
    title: 'Παιδικό σκαλάκι τουαλέτας και κρεβατάκι',
    category: 'home',
    description: 'Δαρδανελλίων και Αθανάτου, Άνω Γλυφάδα, δίπλα στον κάδο ρούχων. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Γλυφάδα',
    lat: 37.878,
    lng: 23.76,
    availableFrom: '2026-11-11T14:00:00+02:00',
    source: TH,
    sourceUrl: thPost('3353023508215167'),
    photo: '/photos/fb-3353023508215167.jpg',
  },
  {
    id: 'street-2026-11-11-04',
    street: true,
    title: 'Είδη από άδειασμα σπιτιού',
    category: 'furniture',
    description: 'Στρώμα, πολυθρόνες, κρεβάτι, μικρά έπιπλα. Σακελλαρίου, Κερατσίνι. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Κερατσίνι',
    lat: 37.963,
    lng: 23.62,
    availableFrom: '2026-11-11T14:22:00+02:00',
    source: TH,
    sourceUrl: thPost('3353026698214848'),
    photo: '/photos/fb-3353026698214848.jpg',
  },

  // ── Χαρίζεται ──
  {
    id: 'manual-2026-11-12-01',
    title: 'Μεγάλος εκσκαφέας παιχνίδι και κουκλόσπιτο',
    category: 'toys',
    description: 'Little Tikes εκσκαφέας και μικρό κουκλόσπιτο με χερούλι σαν βαλίτσα. Παραλαβή άμεσα. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Δροσιά',
    lat: 38.118,
    lng: 23.864,
    availableFrom: '2026-11-12T11:45:00+02:00',
    source: TH,
    sourceUrl: thPost('3354150728102445'),
    photo: '/photos/fb-3354150728102445.jpg',
  },
  {
    id: 'manual-2026-11-12-02',
    title: 'Γυναικεία παπούτσια νο. 37',
    category: 'clothes',
    description: 'Παραλαβή μόνο πρωινές ώρες. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Αθήνα',
    lat: 38.004,
    lng: 23.744,
    availableFrom: '2026-11-12T07:45:00+02:00',
    source: TH,
    sourceUrl: thPost('3353940381456813'),
    photo: '/photos/fb-3353940381456813.jpg',
  },
  {
    id: 'manual-2026-11-12-03',
    title: 'Σύνθετο σαλονιού (3 κομμάτια)',
    category: 'furniture',
    description: 'Από 2ο όροφο χωρίς ασανσέρ, χρειάζεται μεταφορά. Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Βουλιαγμένη.',
    municipality: 'Βουλιαγμένη',
    lat: 37.813,
    lng: 23.78,
    availableFrom: '2026-11-12T06:54:00+02:00',
    source: TH,
    sourceUrl: thPost('3353906144793570'),
    photo: '/photos/fb-3353906144793570.jpg',
  },
  {
    id: 'manual-2026-11-11-01',
    title: 'Τριθέσιος λευκός καναπές',
    category: 'furniture',
    description: 'Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Κορυδαλλό. Παραλαβή απογευματινές ώρες, κατά προτίμηση έως Παρασκευή.',
    municipality: 'Κορυδαλλός',
    lat: 37.983,
    lng: 23.651,
    availableFrom: '2026-11-11T23:50:00+02:00',
    source: TH,
    sourceUrl: thPost('3353573368160181'),
    photo: '/photos/fb-3353573368160181.jpg',
  },
  {
    id: 'manual-2026-11-11-02',
    title: 'Καρότσι Maclaren',
    category: 'toys',
    description: 'Σε πολύ καλή κατάσταση. Μαυροβουνιώτου και Παλικαρίδη. Το σημείο στον χάρτη είναι κατά προσέγγιση.',
    municipality: 'Γέρακας',
    lat: 38.023,
    lng: 23.856,
    availableFrom: '2026-11-11T21:50:00+02:00',
    source: TH,
    sourceUrl: thPost('3353490661501785'),
    photo: '/photos/fb-3353490661501785.jpg',
  },
  {
    id: 'manual-2026-11-11-03',
    title: 'Βελούδινη πολυθρόνα',
    category: 'furniture',
    description: 'Μουσταρδί βελούδινη πολυθρόνα. Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Παλαιό Φάληρο.',
    municipality: 'Παλαιό Φάληρο',
    lat: 37.931,
    lng: 23.7,
    availableFrom: '2026-11-11T17:22:00+02:00',
    source: TH,
    sourceUrl: thPost('3351642728353245'),
    photo: '/photos/fb-3351642728353245.jpg',
  },
  {
    id: 'manual-2026-11-11-04',
    title: 'Ξύλινο έπιπλο τηλεόρασης',
    category: 'furniture',
    description: 'Παραλαβή με δικό σας μέσο. Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Άγιο Δημήτριο.',
    municipality: 'Άγιος Δημήτριος',
    lat: 37.933,
    lng: 23.73,
    availableFrom: '2026-11-11T16:17:00+02:00',
    source: TH,
    sourceUrl: thPost('3351910158326502'),
    photo: '/photos/fb-3351910158326502.jpg',
  },
  {
    id: 'manual-2026-11-11-05',
    title: 'Αρκουδάκια',
    category: 'toys',
    description: 'Παραλαβή απόγευμα. Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Καλλιθέα.',
    municipality: 'Καλλιθέα',
    lat: 37.955,
    lng: 23.702,
    availableFrom: '2026-11-11T15:38:00+02:00',
    source: TH,
    sourceUrl: thPost('3353099588207559'),
  },
  {
    id: 'manual-2026-11-11-06',
    title: 'Μεγάλα λούτρινα και κούκλα',
    category: 'toys',
    description: 'Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Μαρούσι. Γράψτε στα σχόλια της ανάρτησης.',
    municipality: 'Μαρούσι',
    lat: 38.05,
    lng: 23.807,
    availableFrom: '2026-11-11T14:30:00+02:00',
    source: TH,
    sourceUrl: thPost('3353037598213758'),
    photo: '/photos/fb-3353037598213758.jpg',
  },
  {
    id: 'manual-2026-11-11-07',
    title: 'Παζλ 1000 κομματιών',
    category: 'toys',
    description: 'Ανοιγμένο, με ψάρια. Παραλαβή άμεσα. Το σημείο στον χάρτη είναι κατά προσέγγιση: η αγγελία αναφέρει μόνο Κερατσίνι.',
    municipality: 'Κερατσίνι',
    lat: 37.96,
    lng: 23.626,
    availableFrom: '2026-11-11T13:24:00+02:00',
    source: TH,
    sourceUrl: thPost('3352969778220540'),
    photo: '/photos/fb-3352969778220540.jpg',
  },
]

export const isManualId = (id: string) => id.startsWith('manual-') || id.startsWith('street-')

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
      photo: m.photo ? withBase(m.photo) : null,
      giveaway: !m.street,
      up: 0,
      down: 0,
      source: m.source,
      sourceUrl: m.sourceUrl,
    }
  })
}
