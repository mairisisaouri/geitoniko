<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import PhotoInput from './PhotoInput.vue'
import { BOOTFORM, MUNICIPALITIES } from '../lib/config'
import { submitForm, isDemo } from '../lib/bootform'

const photo = ref<Blob | null>(null)
const story = ref('')
const nickname = ref('')
const municipality = ref('')
const itemId = ref('')
const consent = ref(false)
const honeypot = ref('')

const state = ref<'idle' | 'sending' | 'done'>('idle')
const error = ref('')
const demo = isDemo(BOOTFORM.storiesFormId)

onMounted(() => {
  itemId.value = new URL(location.href).searchParams.get('item') ?? ''
})

async function submit() {
  error.value = ''
  const missing = [
    !photo.value && 'φωτογραφία',
    story.value.trim().length < 10 && 'ιστορία (τουλάχιστον λίγες λέξεις)',
    !municipality.value && 'περιοχή',
    !consent.value && 'αποδοχή κανόνων',
  ].filter(Boolean)
  if (missing.length) {
    error.value = `Λείπουν: ${missing.join(', ')}.`
    return
  }
  state.value = 'sending'
  const fd = new FormData()
  fd.append('photo', photo.value!, 'story.jpg')
  fd.append('story', story.value.trim())
  fd.append('nickname', nickname.value.trim())
  fd.append('municipality', municipality.value)
  if (itemId.value) fd.append('item_id', itemId.value)
  fd.append(BOOTFORM.honeypotField, honeypot.value)
  try {
    await submitForm(BOOTFORM.storiesFormId, fd)
    state.value = 'done'
  } catch (e) {
    console.error(e)
    state.value = 'idle'
    error.value = 'Η αποστολή απέτυχε. Δοκίμασε ξανά.'
  }
}
</script>

<template>
  <div v-if="state === 'done'" class="rounded-2xl border border-green-300 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950/40">
    <p class="text-5xl">💚</p>
    <h3 class="mt-2 text-xl font-bold text-green-900 dark:text-green-100">Ευχαριστούμε που τη μοιράστηκες!</h3>
    <p class="mt-1 text-green-900 dark:text-green-200">
      Η ιστορία σου θα εμφανιστεί μόλις εγκριθεί.
      <span v-if="demo" class="block text-sm">(Demo mode: δεν στάλθηκε πραγματικά.)</span>
    </p>
  </div>

  <form v-else class="space-y-4" novalidate @submit.prevent="submit">
    <p v-if="itemId" class="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-900 dark:bg-green-950/40 dark:text-green-200">
      🔗 Η ιστορία θα συνδεθεί με την
      <a :href="withBase(`/?item=${encodeURIComponent(itemId)}`)" class="font-medium underline">καταχώρηση που πήρες</a>.
    </p>

    <PhotoInput v-model="photo" label="Φωτογραφία του αντικειμένου στο νέο του σπίτι" />

    <div>
      <label for="story" class="gk-sublabel">Η ιστορία σου *</label>
      <textarea
        id="story"
        v-model="story"
        rows="4"
        maxlength="600"
        placeholder="π.χ. Η παλιά συρταριέρα έγινε πάγκος εργασίας στο μπαλκόνι μας…"
        class="gk-input"
      />
    </div>

    <div class="grid gap-3 sm:grid-cols-2">
      <div>
        <label for="nickname" class="gk-sublabel">Όνομα ή ψευδώνυμο (προαιρετικά, θα φαίνεται)</label>
        <input id="nickname" v-model="nickname" maxlength="30" placeholder="Ένας γείτονας" class="gk-input" />
      </div>
      <div>
        <label for="s-municipality" class="gk-sublabel">Περιοχή *</label>
        <select id="s-municipality" v-model="municipality" class="gk-input">
          <option value="" disabled>Διάλεξε…</option>
          <option v-for="m in MUNICIPALITIES" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
    </div>

    <div class="absolute -left-[9999px]" aria-hidden="true">
      <label>Μην το συμπληρώνεις <input v-model="honeypot" tabindex="-1" autocomplete="off" /></label>
    </div>

    <label class="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
      <input v-model="consent" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 accent-green-700" />
      <span>
        Η φωτογραφία δεν δείχνει πρόσωπα άλλων ή προσωπικά στοιχεία, και αποδέχομαι την
        <a :href="withBase('/aporrito')" target="_blank" class="font-medium text-green-700 underline dark:text-green-400">πολιτική απορρήτου</a>. *
      </span>
    </label>

    <p v-if="error" class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">{{ error }}</p>

    <button
      type="submit"
      :disabled="state === 'sending'"
      class="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
    >
      {{ state === 'sending' ? 'Αποστολή…' : 'Μοιράσου την ιστορία' }}
    </button>
  </form>
</template>
