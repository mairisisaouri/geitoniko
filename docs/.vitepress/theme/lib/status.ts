import { STALE_HOURS } from './config'
import type { Item } from './bootform'

export type Status = 'available' | 'scheduled' | 'stale'

export const STATUS_META: Record<Status, { label: string; badge: string }> = {
  available: { label: 'Διαθέσιμο', badge: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' },
  scheduled: { label: 'Προγραμματισμένο', badge: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200' },
  stale: { label: 'Ίσως έχει φύγει', badge: 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200' },
}

export function statusOf(it: Item, now = Date.now()): Status {
  if (it.availableFrom && +it.availableFrom > now) return 'scheduled'
  if (it.availableUntil && +it.availableUntil < now) return 'stale'
  const since = +(it.availableFrom ?? it.createdAt)
  if (now - since > STALE_HOURS * 3600e3) return 'stale'
  if (it.down >= it.up + 2) return 'stale'
  return 'available'
}

const rtf = new Intl.RelativeTimeFormat('el', { numeric: 'auto' })

export function timeAgo(d: Date, now = Date.now()): string {
  const mins = Math.round((+d - now) / 60000)
  if (Math.abs(mins) < 60) return rtf.format(mins, 'minute')
  const hours = Math.round(mins / 60)
  if (Math.abs(hours) < 48) return rtf.format(hours, 'hour')
  return rtf.format(Math.round(hours / 24), 'day')
}

const dtf = new Intl.DateTimeFormat('el-GR', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatDateTime = (d: Date) => dtf.format(d)
