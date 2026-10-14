<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { BOOTFORM } from '../lib/config'
import { loadStories, react, loadVotes, saveVote, isFeedDemo, type Story } from '../lib/bootform'
import { timeAgo } from '../lib/status'

const props = defineProps<{ limit?: number }>()

const stories = ref<Story[]>([])
const loading = ref(true)
const loadError = ref(false)
const votes = ref<Record<string, string>>({})

const shown = computed(() => {
  const sorted = [...stories.value].sort((a, b) => +b.createdAt - +a.createdAt)
  return props.limit ? sorted.slice(0, props.limit) : sorted
})

async function like(s: Story) {
  if (votes.value[s.id]) return
  votes.value = { ...votes.value, [s.id]: 'up' }
  saveVote(s.id, 'up')
  s.up++
  try {
    const counts = await react(BOOTFORM.storiesFormId, s.id, 'up')
    if (counts?.up != null) s.up = counts.up
  } catch {}
}

onMounted(async () => {
  votes.value = loadVotes()
  try {
    stories.value = await loadStories()
  } catch (e) {
    console.error(e)
    loadError.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="isFeedDemo(BOOTFORM.storiesFormId) && !limit" class="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
      🧪 Demo mode: δοκιμαστικές ιστορίες.
    </p>
    <p v-if="loading" class="py-6 text-center text-zinc-500">Φόρτωση…</p>
    <p v-else-if="loadError" class="py-6 text-center text-red-700 dark:text-red-400">Δεν μπόρεσαν να φορτωθούν οι ιστορίες.</p>
    <p v-else-if="!shown.length" class="py-6 text-center text-zinc-500">Δεν υπάρχουν ακόμα ιστορίες. Γράψε εσύ την πρώτη!</p>
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="s in shown"
        :key="s.id"
        class="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
      >
        <img v-if="s.photo" :src="s.photo" alt="" loading="lazy" class="aspect-[4/3] w-full object-cover" />
        <div v-else class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-green-100 to-amber-100 text-6xl dark:from-green-950 dark:to-amber-950">
          💚
        </div>
        <div class="flex flex-1 flex-col gap-3 p-4">
          <p class="flex-1 text-zinc-800 dark:text-zinc-200">“{{ s.text }}”</p>
          <div class="flex items-center justify-between gap-2 text-sm text-zinc-500">
            <span>{{ s.nickname || 'Ένας γείτονας' }} · {{ s.municipality }} · {{ timeAgo(s.createdAt) }}</span>
            <button
              type="button"
              class="shrink-0 rounded-full border px-2.5 py-1"
              :class="votes[s.id] ? 'border-green-600 bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-300' : 'border-zinc-300 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800'"
              :aria-pressed="!!votes[s.id]"
              @click="like(s)"
            >
              💚 {{ s.up }}
            </button>
          </div>
          <a
            v-if="s.itemId"
            :href="withBase(`/?item=${encodeURIComponent(s.itemId)}`)"
            class="text-sm font-medium text-green-700 underline dark:text-green-400"
          >
            Δες την αρχική καταχώρηση
          </a>
        </div>
      </article>
    </div>
  </div>
</template>
