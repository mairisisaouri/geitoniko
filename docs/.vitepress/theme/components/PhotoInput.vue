<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { prepareImage } from '../lib/image'

const model = defineModel<Blob | null>({ default: null })
defineProps<{ label?: string }>()

const preview = ref('')
const busy = ref(false)
const error = ref('')

async function onChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  error.value = ''
  busy.value = true
  try {
    const blob = await prepareImage(file)
    if (preview.value) URL.revokeObjectURL(preview.value)
    preview.value = URL.createObjectURL(blob)
    model.value = blob
  } catch {
    error.value = 'Δεν μπόρεσα να διαβάσω τη φωτογραφία. Δοκίμασε άλλη.'
  } finally {
    busy.value = false
  }
}

onBeforeUnmount(() => preview.value && URL.revokeObjectURL(preview.value))
</script>

<template>
  <div>
    <label
      class="flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-center hover:border-green-600 dark:border-zinc-600 dark:bg-zinc-800/50"
      :class="preview ? 'p-0' : 'p-8'"
    >
      <img v-if="preview" :src="preview" alt="Προεπισκόπηση" class="max-h-80 w-full object-contain" />
      <template v-else>
        <span class="text-4xl">📷</span>
        <span class="font-medium text-zinc-800 dark:text-zinc-200">{{ busy ? 'Επεξεργασία…' : (label ?? 'Τράβηξε ή διάλεξε φωτογραφία') }}</span>
        <span class="text-xs text-zinc-500">Αφαιρούμε αυτόματα την τοποθεσία (GPS) από τα metadata της φωτογραφίας.</span>
      </template>
      <input type="file" accept="image/*" capture="environment" class="sr-only" @change="onChange" />
    </label>
    <p v-if="preview" class="mt-1 text-xs text-zinc-500">Πάτησε τη φωτογραφία για να την αλλάξεις.</p>
    <p v-if="error" class="mt-1 text-sm text-red-700 dark:text-red-400">{{ error }}</p>
  </div>
</template>
