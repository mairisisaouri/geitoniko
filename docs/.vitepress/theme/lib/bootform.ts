import { BOOTFORM, isPlaceholder } from './config'

export interface Item {
  id: string
  title: string
  category: string
  description: string
  municipality: string
  lat: number
  lng: number
  availableFrom: Date | null
  availableUntil: Date | null
  createdAt: Date
  photo: string | null
  up: number
  down: number
}

export interface Story {
  id: string
  text: string
  nickname: string
  municipality: string
  itemId: string
  photo: string | null
  createdAt: Date
  up: number
}

export const isDemo = (formId: string) => isPlaceholder(formId)
/** Ο χάρτης/οι ιστορίες δείχνουν demo δεδομένα αν δεν υπάρχει φόρμα ή δεν είναι ενεργό το feed */
export const isFeedDemo = (formId: string) => isDemo(formId) || !BOOTFORM.feedReady

// ── Feed ──────────────────────────────────────────────────────

async function fetchFeed(formId: string): Promise<any[]> {
  const out: any[] = []
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `${BOOTFORM.base}/forms/${encodeURIComponent(formId)}/feed?page=${page}&per_page=50`,
    )
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(`Feed ${res.status}: ${json.code ?? ''} ${json.error ?? ''}`)
    const items = json.items ?? []
    out.push(...items)
    if (items.length === 0 || out.length >= (json.total ?? 0)) break
  }
  return out
}

// Το ακριβές σχήμα του PublicFeedItemResponse δεν είναι πλήρως τεκμηριωμένο,
// οπότε διαβάζουμε τα πεδία ανεκτικά. Επιβεβαίωση με την πρώτη πραγματική φόρμα.
const fieldsOf = (raw: any) => raw.data ?? raw.fields ?? raw.values ?? raw.payload ?? raw

function fileUrl(raw: any, field: string): string | null {
  const files = raw.files ?? fieldsOf(raw).files
  if (Array.isArray(files) && files.length) {
    const f = files.find((f: any) => (f.field ?? f.field_name ?? f.name) === field) ?? files[0]
    if (f?.url) return f.url
  }
  let v = fieldsOf(raw)[field]
  if (Array.isArray(v)) v = v[0]
  if (typeof v === 'string' && /^https?:\/\//.test(v)) return v
  return v?.url ?? null
}

const toDate = (v: unknown) => {
  if (!v) return null
  const d = new Date(v as string)
  return isNaN(+d) ? null : d
}

const reactionCount = (raw: any, type: string) => Number(raw.reactions?.[type] ?? 0)

function toItem(raw: any): Item | null {
  const f = fieldsOf(raw)
  const lat = parseFloat(f.lat)
  const lng = parseFloat(f.lng)
  if (!isFinite(lat) || !isFinite(lng)) return null
  return {
    id: String(raw.id ?? raw.submission_id),
    title: f.title ?? '',
    category: f.category ?? 'other',
    description: f.description ?? '',
    municipality: f.municipality ?? '',
    lat,
    lng,
    availableFrom: toDate(f.available_from),
    availableUntil: toDate(f.available_until),
    createdAt: toDate(raw.created_at) ?? new Date(),
    photo: fileUrl(raw, 'photo'),
    up: reactionCount(raw, 'up'),
    down: reactionCount(raw, 'down'),
  }
}

function toStory(raw: any): Story {
  const f = fieldsOf(raw)
  return {
    id: String(raw.id ?? raw.submission_id),
    text: f.story ?? '',
    nickname: f.nickname ?? '',
    municipality: f.municipality ?? '',
    itemId: f.item_id ?? '',
    photo: fileUrl(raw, 'photo'),
    createdAt: toDate(raw.created_at) ?? new Date(),
    up: reactionCount(raw, 'up'),
  }
}

export async function loadItems(): Promise<Item[]> {
  if (isFeedDemo(BOOTFORM.itemsFormId)) return demoItems()
  const raw = await fetchFeed(BOOTFORM.itemsFormId)
  return raw.map(toItem).filter((i): i is Item => i !== null)
}

export async function loadStories(): Promise<Story[]> {
  if (isFeedDemo(BOOTFORM.storiesFormId)) return demoStories()
  return (await fetchFeed(BOOTFORM.storiesFormId)).map(toStory)
}

// ── Υποβολή, αντιδράσεις, αναφορές ───────────────────────────

export async function submitForm(formId: string, data: FormData): Promise<void> {
  if (isDemo(formId)) {
    console.info('[demo] Θα στελνόταν στο BootForm:', Object.fromEntries(data))
    await new Promise((r) => setTimeout(r, 800))
    return
  }
  const res = await fetch(`${BOOTFORM.base}/${encodeURIComponent(formId)}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: data,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || json.ok === false) throw new Error(json.error ?? `HTTP ${res.status}`)
}

export async function react(
  formId: string,
  submissionId: string,
  type: 'up' | 'down',
): Promise<Record<string, number> | null> {
  if (isFeedDemo(formId)) return null
  const res = await fetch(
    `${BOOTFORM.base}/forms/${encodeURIComponent(formId)}/feed/${encodeURIComponent(submissionId)}/react`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type }) },
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json().catch(() => ({}))
  return json.reactions ?? json.counts ?? null
}

export async function report(formId: string, submissionId: string): Promise<void> {
  if (isFeedDemo(formId)) return
  const res = await fetch(
    `${BOOTFORM.base}/forms/${encodeURIComponent(formId)}/feed/${encodeURIComponent(submissionId)}/report`,
    { method: 'POST' },
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
}

// ── Τοπική μνήμη «έχω ήδη ψηφίσει» (μόνο για το UI) ──────────

const VOTES_KEY = 'geitoniko:votes'

export function loadVotes(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function saveVote(id: string, type: string) {
  try {
    const v = loadVotes()
    v[id] = type
    localStorage.setItem(VOTES_KEY, JSON.stringify(v))
  } catch {}
}

// ── Demo δεδομένα (όσο τα form IDs είναι placeholders) ──────

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600e3)

function demoItems(): Item[] {
  const base = { photo: null, availableUntil: null }
  return [
    { ...base, id: 'demo-1', title: 'Ξύλινη καρέκλα κουζίνας (x2)', category: 'furniture', description: 'Γερές, θέλουν λίγο γυαλόχαρτο.', municipality: 'Μελίσσια', lat: 38.0528, lng: 23.8322, createdAt: hoursAgo(2), availableFrom: hoursAgo(2), up: 3, down: 0 },
    { ...base, id: 'demo-2', title: 'Κούτα με παιδικά βιβλία', category: 'books', description: 'Ηλικίες 4–8, σε καλή κατάσταση.', municipality: 'Μαρούσι', lat: 38.0502, lng: 23.8065, createdAt: hoursAgo(5), availableFrom: hoursAgo(5), up: 1, down: 0 },
    { ...base, id: 'demo-3', title: 'Μικροκύματα — δουλεύει', category: 'appliances', description: 'Το αλλάξαμε επειδή πήραμε μεγαλύτερο.', municipality: 'Κηφισιά', lat: 38.0742, lng: 23.8112, createdAt: hoursAgo(1), availableFrom: new Date(Date.now() + 20 * 3600e3), up: 0, down: 0 },
    { ...base, id: 'demo-4', title: 'Παιδικό ποδήλατο 16"', category: 'sports', description: '', municipality: 'Βριλήσσια', lat: 38.0345, lng: 23.8301, createdAt: hoursAgo(9), availableFrom: hoursAgo(9), up: 2, down: 1 },
    { ...base, id: 'demo-5', title: 'Γλάστρες πήλινες', category: 'garden', description: 'Διάφορα μεγέθη.', municipality: 'Πεντέλη', lat: 38.0496, lng: 23.8735, createdAt: hoursAgo(60), availableFrom: hoursAgo(60), up: 0, down: 2 },
    { ...base, id: 'demo-6', title: 'Χειμωνιάτικα μπουφάν (παιδικά)', category: 'clothes', description: 'Νούμερα 6–10 ετών.', municipality: 'Μελίσσια', lat: 38.0478, lng: 23.8401, createdAt: hoursAgo(3), availableFrom: hoursAgo(3), up: 4, down: 0 },
  ]
}

function demoStories(): Story[] {
  return [
    { id: 'story-1', text: 'Η παλιά καρέκλα από τα Μελίσσια έγινε το αγαπημένο κάθισμα στο μπαλκόνι μας. Ευχαριστούμε, γείτονα!', nickname: 'Ελένη', municipality: 'Μελίσσια', itemId: 'demo-1', photo: null, createdAt: hoursAgo(20), up: 12 },
    { id: 'story-2', text: 'Τα παιδικά βιβλία τα διαβάζουμε κάθε βράδυ. Ο μικρός ζήτησε να αφήσουμε κι εμείς τα δικά του όταν μεγαλώσει!', nickname: 'Νίκος', municipality: 'Μαρούσι', itemId: 'demo-2', photo: null, createdAt: hoursAgo(50), up: 8 },
    { id: 'story-3', text: 'Ένα ποδήλατο που θα κατέληγε στα ογκώδη, τώρα κάνει βόλτες στο άλσος κάθε Κυριακή.', nickname: '', municipality: 'Βριλήσσια', itemId: '', photo: null, createdAt: hoursAgo(100), up: 5 },
  ]
}
