<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import LocationPicker from './LocationPicker.vue'
import PhotoInput from './PhotoInput.vue'
import { BOOTFORM, CATEGORIES, MUNICIPALITIES } from '../lib/config'
import { submitForm, isDemo } from '../lib/bootform'

const pad = (n: number) => String(n).padStart(2, '0')
const toLocalInput = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`

const photo = ref<Blob | null>(null)
const title = ref('')
const category = ref('')
const description = ref('')
const municipality = ref('')
const location = ref<{ lat: number; lng: number } | null>(null)
const availableFrom = ref(toLocalInput(new Date()))
const availableUntil = ref('')
const consent = ref(false)
const honeypot = ref('')

const state = ref<'idle' | 'sending' | 'done'>('idle')
const error = ref('')
const demo = isDemo(BOOTFORM.itemsFormId)

const missing = computed(() => {
  const m: string[] = []
  if (!photo.value) m.push('φωτογραφία')
  if (!title.value.trim()) m.push('τίτλος')
  if (!category.value) m.push('κατηγορία')
  if (!municipality.value) m.push('περιοχή')
  if (!location.value) m.push('σημείο στον χάρτη')
  if (!availableFrom.value) m.push('ώρα')
  if (!consent.value) m.push('αποδοχή κανόνων')
  return m
})

async function submit() {
  error.value = ''
  if (missing.value.length) {
    error.value = `Λείπουν: ${missing.value.join(', ')}.`
    return
  }
  if (availableUntil.value && availableUntil.value <= availableFrom.value) {
    error.value = 'Η ώρα «μέχρι» πρέπει να είναι μετά την ώρα «από».'
    return
  }
  state.value = 'sending'
  const fd = new FormData()
  fd.append('photo', photo.value!, 'photo.jpg')
  fd.append('title', title.value.trim())
  fd.append('category', category.value)
  fd.append('description', description.value.trim())
  fd.append('municipality', municipality.value)
  fd.append('lat', String(location.value!.lat))
  fd.append('lng', String(location.value!.lng))
  fd.append('available_from', new Date(availableFrom.value).toISOString())
  if (availableUntil.value) fd.append('available_until', new Date(availableUntil.value).toISOString())
  fd.append(BOOTFORM.honeypotField, honeypot.value)
  try {
    await submitForm(BOOTFORM.itemsFormId, fd)
    state.value = 'done'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    console.error(e)
    state.value = 'idle'
    error.value = 'Η αποστολή απέτυχε. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.'
  }
}
</script>

<template>
  <div
    v-if="state === 'done'"
    class="rounded-2xl border border-green-300 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/40"
  >
    <p class="text-5xl">🎉</p>
    <h2 class="mt-2 text-2xl font-bold text-green-900 dark:text-green-100">Ευχαριστούμε, γείτονα!</h2>
    <p class="mt-2 text-green-900 dark:text-green-200">
      Η καταχώρησή σου θα εμφανιστεί στον χάρτη μόλις εγκριθεί.
      <span v-if="demo" class="block text-sm">(Demo mode: δεν στάλθηκε πραγματικά.)</span>
    </p>
    <p class="mx-auto mt-4 max-w-md text-sm text-zinc-700 dark:text-zinc-300">
      ♻️ Αν δεν το πάρει κανείς, κλείσε ραντεβού για αποκομιδή ογκωδών με τον δήμο.
      <a :href="withBase('/pos-leitourgei#apokomidi')" class="font-medium text-green-700 underline dark:text-green-400">Δες πώς</a>.
    </p>
    <a :href="withBase('/')" class="mt-5 inline-block rounded-xl bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800">
      Πίσω στον χάρτη
    </a>
  </div>

  <form v-else class="space-y-6" novalidate @submit.prevent="submit">
    <p
      v-if="demo"
      class="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      🧪 Demo mode: η φόρμα δεν στέλνει ακόμα πραγματικά δεδομένα.
    </p>

    <fieldset class="space-y-2">
      <legend class="gk-label">1. Φωτογραφία *</legend>
      <PhotoInput v-model="photo" />
    </fieldset>

    <fieldset class="space-y-3">
      <legend class="gk-label">2. Τι αφήνεις;</legend>
      <div>
        <label for="title" class="gk-sublabel">Τίτλος *</label>
        <input id="title" v-model="title" maxlength="80" placeholder="π.χ. Ξύλινο τραπέζι κουζίνας" class="gk-input" />
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label for="category" class="gk-sublabel">Κατηγορία *</label>
          <select id="category" v-model="category" class="gk-input">
            <option value="" disabled>Διάλεξε…</option>
            <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.emoji }} {{ c.label }}</option>
          </select>
        </div>
        <div>
          <label for="municipality" class="gk-sublabel">Περιοχή *</label>
          <select id="municipality" v-model="municipality" class="gk-input">
            <option value="" disabled>Διάλεξε…</option>
            <option v-for="m in MUNICIPALITIES" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
      </div>
      <div>
        <label for="description" class="gk-sublabel">Περιγραφή (προαιρετικά)</label>
        <textarea
          id="description"
          v-model="description"
          rows="3"
          maxlength="500"
          placeholder="Κατάσταση, διαστάσεις, αν χρειάζεται δύο άτομα για μεταφορά…"
          class="gk-input"
        />
      </div>
    </fieldset>

    <fieldset class="space-y-2">
      <legend class="gk-label">3. Πού; *</legend>
      <p class="text-sm text-zinc-600 dark:text-zinc-400">Βάλε την πινέζα στο σημείο του πεζοδρομίου όπου θα είναι τα αντικείμενα.</p>
      <ClientOnly>
        <LocationPicker v-model="location" :area="municipality" />
      </ClientOnly>
    </fieldset>

    <fieldset class="space-y-3">
      <legend class="gk-label">4. Πότε;</legend>
      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label for="from" class="gk-sublabel">Θα είναι εκεί από *</label>
          <input id="from" v-model="availableFrom" type="datetime-local" class="gk-input" />
        </div>
        <div>
          <label for="until" class="gk-sublabel">Μέχρι (προαιρετικά)</label>
          <input id="until" v-model="availableUntil" type="datetime-local" class="gk-input" />
        </div>
      </div>
    </fieldset>

    <!-- honeypot για bots: κρυφό από ανθρώπους -->
    <div class="absolute -left-[9999px]" aria-hidden="true">
      <label>Μην το συμπληρώνεις <input v-model="honeypot" tabindex="-1" autocomplete="off" /></label>
    </div>

    <label class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
      <input v-model="consent" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 accent-green-700" />
      <span>
        Η φωτογραφία δεν δείχνει πρόσωπα, πινακίδες αυτοκινήτων ή αριθμούς σπιτιών, και αποδέχομαι τους
        <a :href="withBase('/pos-leitourgei#kanones')" target="_blank" class="font-medium text-green-700 underline dark:text-green-400">κανόνες</a>
        και την
        <a :href="withBase('/aporrito')" target="_blank" class="font-medium text-green-700 underline dark:text-green-400">πολιτική απορρήτου</a>. *
      </span>
    </label>

    <p v-if="error" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">{{ error }}</p>

    <button
      type="submit"
      :disabled="state === 'sending'"
      class="w-full rounded-xl bg-green-700 px-5 py-3 text-lg font-semibold text-white hover:bg-green-800 disabled:opacity-60 sm:w-auto"
    >
      {{ state === 'sending' ? 'Αποστολή…' : 'Δημοσίευση στη γειτονιά' }}
    </button>
    <p class="text-xs text-zinc-500">Δεν χρειάζεται λογαριασμός. Δεν ζητάμε όνομα, email ή τηλέφωνο.</p>
  </form>
</template>
