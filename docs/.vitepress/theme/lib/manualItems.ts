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

  // ── Χαρίζεται ──
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
