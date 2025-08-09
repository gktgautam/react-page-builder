
import type { AppData } from '../types'

const KEY = 'unbounceBuilderData'

export async function save(data: AppData) {
  await new Promise(r => setTimeout(r, 300))
  localStorage.setItem(KEY, JSON.stringify(data))
}

export async function load(): Promise<AppData | null> {
  await new Promise(r => setTimeout(r, 300))
  const raw = localStorage.getItem(KEY)
  return raw ? (JSON.parse(raw) as AppData) : null
}
