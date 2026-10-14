---
layout: page
title: Χάρτης
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6">
  <section class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 class="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">Μην το πετάς. <span class="text-green-700 dark:text-green-400">Κάποιος γείτονας το χρειάζεται.</span></h1>
      <p class="mt-2 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">Έπιπλα, συσκευές, παιχνίδια, ρούχα που χαρίζονται σε όλη την Αθήνα. Βρες τα στον χάρτη, πέρνα να τα πάρεις.</p>
    </div>
    <a :href="withBase('/afino')" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-lg font-semibold text-white shadow hover:bg-green-800">📷 Αφήνω κάτι</a>
  </section>
  <ItemsMap />
  <section>
    <div class="mb-4 flex items-end justify-between gap-4">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">💚 Ιστορίες της γειτονιάς</h2>
      <a :href="withBase('/istories')" class="font-medium text-green-700 underline dark:text-green-400">Όλες οι ιστορίες</a>
    </div>
    <StoriesFeed :limit="3" />
  </section>
  <section class="rounded-2xl bg-green-50 p-6 sm:p-8 dark:bg-green-950/30">
    <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">📬 Newsletter</h2>
    <p class="mb-4 mt-1 text-zinc-700 dark:text-zinc-300">Οι ωραιότερες ιστορίες και τα νέα της γειτονιάς, μία φορά τον μήνα.</p>
    <NewsletterForm compact />
  </section>
</div>
