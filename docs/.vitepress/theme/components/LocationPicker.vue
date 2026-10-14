<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type * as Leaflet from 'leaflet'
import { MAP, AREAS } from '../lib/config'

type LatLng = { lat: number; lng: number }

const model = defineModel<LatLng | null>({ default: null })
const props = defineProps<{ area?: string }>()

const el = ref<HTMLElement | null>(null)
const locating = ref(false)
const geoError = ref('')

let L: typeof Leaflet
let map: Leaflet.Map | null = null
let marker: Leaflet.Marker | null = null

const pinIcon = () =>
  L.divIcon({ className: '', html: '<div class="gk-pin gk-pin--pick"><span>📍</span></div>', iconSize: [36, 36], iconAnchor: [18, 34] })

function place(p: LatLng, pan = false) {
  model.value = { lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) }
  if (!map) return
  if (marker) marker.setLatLng(p)
  else {
    marker = L.marker(p, { draggable: true, icon: pinIcon() }).addTo(map)
    marker.on('dragend', () => place(marker!.getLatLng()))
  }
  if (pan) map.setView(p, Math.max(map.getZoom(), 17))
}

function useMyLocation() {
  geoError.value = ''
  if (!navigator.geolocation) {
    geoError.value = 'Ο browser σου δεν υποστηρίζει εντοπισμό τοποθεσίας.'
    return
  }
  locating.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      locating.value = false
      place({ lat: pos.coords.latitude, lng: pos.coords.longitude }, true)
    },
    () => {
      locating.value = false
      geoError.value = 'Δεν βρέθηκε η τοποθεσία. Πάτησε πάνω στον χάρτη για να τη διαλέξεις.'
    },
    { enableHighAccuracy: true, timeout: 10000 },
  )
}

onMounted(async () => {
  L = (await import('leaflet')).default
  map = L.map(el.value!, { maxBounds: MAP.bounds, maxBoundsViscosity: 0.8, minZoom: 11 }).setView(MAP.center, MAP.zoom)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map)
  map.on('click', (e: Leaflet.LeafletMouseEvent) => place(e.latlng))
  if (model.value) place(model.value, true)
})

// Όταν αλλάζει η περιοχή στη φόρμα, ο χάρτης πηγαίνει εκεί
watch(
  () => props.area,
  (area) => {
    const v = area ? AREAS[area] : null
    if (v) map?.flyTo(v.center, Math.max(v.zoom, 16), { duration: 0.8 })
  },
)

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div class="space-y-2">
    <div ref="el" class="relative isolate h-72 w-full overflow-hidden rounded-xl border border-zinc-300 sm:h-96 dark:border-zinc-700" />
    <div class="flex flex-wrap items-center gap-3 text-sm">
      <button
        type="button"
        class="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        :disabled="locating"
        @click="useMyLocation"
      >
        {{ locating ? 'Εντοπισμός…' : '📍 Η τοποθεσία μου' }}
      </button>
      <span v-if="model" class="text-zinc-600 dark:text-zinc-400">
        ✓ Σημείο: {{ model.lat.toFixed(5) }}, {{ model.lng.toFixed(5) }} · μπορείς να σύρεις την πινέζα
      </span>
      <span v-else class="text-zinc-500">Πάτησε πάνω στον χάρτη για να βάλεις πινέζα.</span>
    </div>
    <p v-if="geoError" class="text-sm text-amber-700 dark:text-amber-400">{{ geoError }}</p>
  </div>
</template>
