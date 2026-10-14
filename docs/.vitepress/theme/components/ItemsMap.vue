<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type * as Leaflet from 'leaflet'
import { withBase } from 'vitepress'
import { BOOTFORM, CATEGORIES, MUNICIPALITIES, AREAS, MAP, categoryOf } from '../lib/config'
import { loadItems, react, report, loadVotes, saveVote, isFeedDemo, type Item } from '../lib/bootform'
import { statusOf, STATUS_META, timeAgo, formatDateTime } from '../lib/status'

const items = ref<Item[]>([])
const loading = ref(true)
const loadError = ref(false)

const category = ref('')
const municipality = ref('')
const showStale = ref(false)
const view = ref<'map' | 'list'>('map')

const selectedId = ref<string | null>(null)
const votes = ref<Record<string, string>>({})
const busy = ref(false)
const actionMsg = ref('')
const reportArmed = ref(false)
const copied = ref(false)

const demo = isFeedDemo(BOOTFORM.itemsFormId)

const filtered = computed(() =>
  items.value
    .filter(
      (it) =>
        (!category.value || it.category === category.value) &&
        (!municipality.value || it.municipality === municipality.value) &&
        (showStale.value || statusOf(it) !== 'stale'),
    )
    .sort((a, b) => +b.createdAt - +a.createdAt),
)

const selected = computed(() => items.value.find((i) => i.id === selectedId.value) ?? null)

// ── Χάρτης ────────────────────────────────────────────────────

const mapEl = ref<HTMLElement | null>(null)
let L: typeof Leaflet
let map: Leaflet.Map | null = null
let markers: Leaflet.LayerGroup | null = null

function renderMarkers() {
  if (!map || !markers) return
  markers.clearLayers()
  for (const it of filtered.value) {
    const st = statusOf(it)
    const icon = L.divIcon({
      className: '',
      html: `<div class="gk-pin gk-pin--${st}"><span>${categoryOf(it.category).emoji}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 34],
    })
    L.marker([it.lat, it.lng], { icon, title: it.title, riseOnHover: true })
      .on('click', () => select(it.id))
      .addTo(markers)
  }
}

watch(filtered, renderMarkers)

// Εστίαση του χάρτη στην περιοχή που επιλέχθηκε
watch(municipality, (area) => {
  const v = AREAS[area] ?? MAP
  map?.flyTo(v.center, v.zoom, { duration: 0.8 })
})

watch(view, async (v) => {
  if (v === 'map') {
    await nextTick()
    map?.invalidateSize()
  }
})

// ── Επιλογή / URL ─────────────────────────────────────────────

function setUrlItem(id: string | null) {
  const u = new URL(location.href)
  if (id) u.searchParams.set('item', id)
  else u.searchParams.delete('item')
  history.replaceState(history.state, '', u)
}

function select(id: string, pan = false) {
  selectedId.value = id
  actionMsg.value = ''
  reportArmed.value = false
  copied.value = false
  setUrlItem(id)
  const it = selected.value
  if (pan && it && map) map.setView([it.lat, it.lng], Math.max(map.getZoom(), 16))
}

function close() {
  selectedId.value = null
  setUrlItem(null)
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && selectedId.value) close()
}

// ── Ενέργειες πολιτών ─────────────────────────────────────────

async function vote(type: 'up' | 'down') {
  const it = selected.value
  if (!it || votes.value[it.id] || busy.value) return
  busy.value = true
  actionMsg.value = ''
  try {
    const counts = await react(BOOTFORM.itemsFormId, it.id, type)
    if (counts) {
      it.up = counts.up ?? it.up
      it.down = counts.down ?? it.down
    } else if (type === 'up') it.up++
    else it.down++
    votes.value = { ...votes.value, [it.id]: type }
    saveVote(it.id, type)
    actionMsg.value = 'Ευχαριστούμε για την ενημέρωση! 💚'
  } catch {
    actionMsg.value = 'Κάτι πήγε στραβά. Δοκίμασε ξανά σε λίγο.'
  } finally {
    busy.value = false
  }
}

async function markGone() {
  const it = selected.value
  if (!it || busy.value) return
  if (!reportArmed.value) {
    reportArmed.value = true
    return
  }
  busy.value = true
  try {
    await report(BOOTFORM.itemsFormId, it.id)
    votes.value = { ...votes.value, [it.id]: 'gone' }
    saveVote(it.id, 'gone')
    reportArmed.value = false
    actionMsg.value = 'Καταγράφηκε. Όταν το αναφέρουν αρκετοί, η καταχώρηση θα κρυφτεί.'
  } catch {
    actionMsg.value = 'Κάτι πήγε στραβά. Δοκίμασε ξανά σε λίγο.'
  } finally {
    busy.value = false
  }
}

async function share() {
  try {
    await navigator.clipboard.writeText(location.href)
    copied.value = true
  } catch {}
}

const directionsUrl = (it: Item) => `https://www.google.com/maps/dir/?api=1&destination=${it.lat},${it.lng}`

// ── Lifecycle ─────────────────────────────────────────────────

onMounted(async () => {
  votes.value = loadVotes()
  window.addEventListener('keydown', onKey)

  L = (await import('leaflet')).default
  map = L.map(mapEl.value!, { maxBounds: MAP.bounds, maxBoundsViscosity: 0.8, minZoom: 11 }).setView(MAP.center, MAP.zoom)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)
  markers = L.layerGroup().addTo(map)

  try {
    items.value = await loadItems()
  } catch (e) {
    console.error(e)
    loadError.value = true
  } finally {
    loading.value = false
  }
  renderMarkers()

  const fromUrl = new URL(location.href).searchParams.get('item')
  if (fromUrl && items.value.some((i) => i.id === fromUrl)) select(fromUrl, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  map?.remove()
})
</script>

<template>
  <div class="space-y-4">
    <p
      v-if="demo"
      class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      🧪 Demo mode: βλέπεις δοκιμαστικές καταχωρήσεις. Οι πραγματικές θα εμφανίζονται μόλις ενεργοποιηθεί το δημόσιο feed του BootForm.
    </p>

    <!-- Φίλτρα -->
    <div class="flex flex-wrap items-center gap-2">
      <select v-model="category" aria-label="Κατηγορία" class="gk-input w-auto">
        <option value="">Όλες οι κατηγορίες</option>
        <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.emoji }} {{ c.label }}</option>
      </select>
      <select v-model="municipality" aria-label="Περιοχή" class="gk-input w-auto">
        <option value="">Όλες οι περιοχές</option>
        <option v-for="m in MUNICIPALITIES" :key="m" :value="m">{{ m }}</option>
      </select>
      <label class="flex items-center gap-2 px-1 text-sm text-zinc-700 dark:text-zinc-300">
        <input v-model="showStale" type="checkbox" class="h-4 w-4 accent-green-700" />
        Δείξε και παλιότερα
      </label>

      <div class="ml-auto flex overflow-hidden rounded-lg border border-zinc-300 text-sm lg:hidden dark:border-zinc-600">
        <button
          v-for="v in (['map', 'list'] as const)"
          :key="v"
          type="button"
          class="px-3 py-1.5 font-medium"
          :class="view === v ? 'bg-green-700 text-white' : 'bg-white text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'"
          @click="view = v"
        >
          {{ v === 'map' ? '🗺️ Χάρτης' : '📋 Λίστα' }}
        </button>
      </div>
    </div>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
      <!-- Χάρτης -->
      <div :class="view === 'map' ? 'block' : 'hidden lg:block'">
        <div
          ref="mapEl"
          class="relative isolate h-[65vh] min-h-80 w-full overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700"
        />
      </div>

      <!-- Λίστα -->
      <div :class="view === 'list' ? 'block' : 'hidden lg:block'" class="lg:h-[65vh] lg:overflow-y-auto lg:pr-1">
        <p v-if="loading" class="py-8 text-center text-zinc-500">Φόρτωση…</p>
        <p v-else-if="loadError" class="py-8 text-center text-red-700 dark:text-red-400">
          Δεν μπόρεσαν να φορτωθούν οι καταχωρήσεις. Δοκίμασε να ανανεώσεις τη σελίδα.
        </p>
        <div v-else-if="!filtered.length" class="py-8 text-center text-zinc-500">
          <p>Δεν υπάρχει κάτι εδώ αυτή τη στιγμή.</p>
          <a :href="withBase('/afino')" class="mt-2 inline-block font-medium text-green-700 underline dark:text-green-400">
            Άφησε εσύ το πρώτο!
          </a>
        </div>
        <ul v-else class="space-y-2">
          <li v-for="it in filtered" :key="it.id">
            <button
              type="button"
              class="flex w-full gap-3 rounded-xl border p-2 text-left transition hover:border-green-600 hover:bg-green-50/50 dark:hover:bg-green-950/30"
              :class="it.id === selectedId ? 'border-green-600 bg-green-50 dark:bg-green-950/40' : 'border-zinc-200 dark:border-zinc-700'"
              @click="select(it.id, true)"
            >
              <img v-if="it.photo" :src="it.photo" alt="" loading="lazy" class="h-16 w-16 shrink-0 rounded-lg object-cover" />
              <div v-else class="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-3xl dark:bg-zinc-800">
                {{ categoryOf(it.category).emoji }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold text-zinc-900 dark:text-zinc-100">{{ it.title || categoryOf(it.category).label }}</p>
                <p class="truncate text-sm text-zinc-600 dark:text-zinc-400">{{ it.municipality }} · {{ timeAgo(it.availableFrom ?? it.createdAt) }}</p>
                <span class="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="STATUS_META[statusOf(it)].badge">
                  {{ STATUS_META[statusOf(it)].label }}
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Λεπτομέρειες καταχώρησης -->
    <div
      v-if="selected"
      class="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      @click.self="close"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-label="selected.title"
        class="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl dark:bg-zinc-900"
      >
        <div class="relative">
          <img v-if="selected.photo" :src="selected.photo" :alt="selected.title" class="max-h-80 w-full object-cover" />
          <div v-else class="flex h-40 items-center justify-center bg-zinc-100 text-7xl dark:bg-zinc-800">
            {{ categoryOf(selected.category).emoji }}
          </div>
          <button
            type="button"
            aria-label="Κλείσιμο"
            class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white hover:bg-black/80"
            @click="close"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4 p-5">
          <div>
            <span class="rounded-full px-2 py-0.5 text-xs font-medium" :class="STATUS_META[statusOf(selected)].badge">
              {{ STATUS_META[statusOf(selected)].label }}
            </span>
            <h2 class="mt-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">{{ selected.title || categoryOf(selected.category).label }}</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              {{ categoryOf(selected.category).emoji }} {{ categoryOf(selected.category).label }} · {{ selected.municipality }}
            </p>
          </div>

          <dl class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <template v-if="selected.availableFrom">
              <dt class="text-zinc-500">Διαθέσιμο από</dt>
              <dd class="text-zinc-900 dark:text-zinc-100">{{ formatDateTime(selected.availableFrom) }} ({{ timeAgo(selected.availableFrom) }})</dd>
            </template>
            <template v-if="selected.availableUntil">
              <dt class="text-zinc-500">Μέχρι</dt>
              <dd class="text-zinc-900 dark:text-zinc-100">{{ formatDateTime(selected.availableUntil) }}</dd>
            </template>
            <dt class="text-zinc-500">Ενημερώσεις</dt>
            <dd class="text-zinc-900 dark:text-zinc-100">👍 {{ selected.up }} ακόμα εκεί · 👎 {{ selected.down }} λείπουν κάποια</dd>
          </dl>

          <p v-if="selected.description" class="whitespace-pre-line text-zinc-800 dark:text-zinc-200">{{ selected.description }}</p>

          <a
            :href="directionsUrl(selected)"
            target="_blank"
            rel="noopener"
            class="block rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white hover:bg-green-800"
          >
            🧭 Οδηγίες στο Google Maps
          </a>

          <div class="rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
            <p class="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Πέρασες από εκεί; Ενημέρωσε τους γείτονες:</p>
            <div v-if="!votes[selected.id]" class="grid grid-cols-2 gap-2">
              <button type="button" :disabled="busy" class="gk-btn-soft" @click="vote('up')">👍 Είναι ακόμα εκεί</button>
              <button type="button" :disabled="busy" class="gk-btn-soft" @click="vote('down')">👎 Πήρα / λείπουν κάποια</button>
              <button
                type="button"
                :disabled="busy"
                class="col-span-2 rounded-lg border px-3 py-2 text-sm font-medium"
                :class="reportArmed ? 'border-red-600 bg-red-600 text-white' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800'"
                @click="markGone"
              >
                {{ reportArmed ? 'Σίγουρα; Πάτα ξανά για επιβεβαίωση' : '🚫 Δεν υπάρχει πια τίποτα' }}
              </button>
            </div>
            <p v-else class="text-sm text-zinc-600 dark:text-zinc-400">✓ Έχεις ήδη ενημερώσει για αυτή την καταχώρηση.</p>
            <p v-if="actionMsg" class="mt-2 text-sm text-green-800 dark:text-green-300">{{ actionMsg }}</p>
          </div>

          <div class="flex flex-wrap gap-2 text-sm">
            <a :href="withBase(`/istories?item=${encodeURIComponent(selected.id)}#grapse`)" class="gk-btn-soft">
              🎉 Το πήρα! Γράψε την ιστορία
            </a>
            <button type="button" class="gk-btn-soft" @click="share">{{ copied ? '✓ Αντιγράφηκε' : '🔗 Κοινοποίηση' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
