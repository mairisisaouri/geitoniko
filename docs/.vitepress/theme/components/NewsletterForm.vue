<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { KIT, isPlaceholder } from '../lib/config'

defineProps<{ compact?: boolean }>()

const email = ref('')
const state = ref<'idle' | 'sending' | 'done'>('idle')
const error = ref('')
const demo = isPlaceholder(KIT.formId)
const action = `https://app.kit.com/forms/${KIT.formId}/subscriptions`

async function submit(e: Event) {
  error.value = ''
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Γράψε ένα έγκυρο email.'
    return
  }
  state.value = 'sending'
  if (demo) {
    await new Promise((r) => setTimeout(r, 600))
    state.value = 'done'
    return
  }
  try {
    const res = await fetch(action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(e.target as HTMLFormElement),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    state.value = 'done'
  } catch {
    // Αν το fetch μπλοκαριστεί (π.χ. CORS), στέλνουμε την κλασική φόρμα σε νέα καρτέλα.
    ;(e.target as HTMLFormElement).submit()
    state.value = 'done'
  }
}
</script>

<template>
  <div :class="compact ? '' : 'rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900'">
    <div v-if="state === 'done'" class="text-center">
      <p class="text-4xl">📬</p>
      <p class="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">Σχεδόν έτοιμο! Έλεγξε το email σου για να επιβεβαιώσεις την εγγραφή.</p>
      <p v-if="demo" class="text-sm text-zinc-500">(Demo mode: δεν έγινε πραγματική εγγραφή.)</p>
    </div>
    <form v-else :action="action" method="post" target="_blank" class="space-y-3" novalidate @submit.prevent="submit">
      <div class="flex flex-col gap-2 sm:flex-row">
        <label for="nl-email" class="sr-only">Email</label>
        <input
          id="nl-email"
          v-model="email"
          name="email_address"
          type="email"
          required
          autocomplete="email"
          placeholder="το email σου"
          class="gk-input flex-1"
        />
        <button
          type="submit"
          :disabled="state === 'sending'"
          class="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {{ state === 'sending' ? '…' : 'Εγγραφή' }}
        </button>
      </div>
      <p v-if="error" class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
      <p class="text-xs text-zinc-500">
        Ιστορίες της γειτονιάς και νέα του Γειτονικού, το πολύ μία φορά τον μήνα. Διαγραφή με ένα κλικ.
        <a :href="withBase('/aporrito')" class="underline">Απόρρητο</a>.
      </p>
    </form>
  </div>
</template>
