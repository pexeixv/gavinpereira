import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { ThemeMode } from '@/types'

/**
 * The previous site stored the theme under the `mode` key with the values
 * `dark` / `lite`. That key is read once on first load so returning visitors
 * keep the theme they picked.
 */
const LEGACY_KEY = 'mode'
const STORAGE_KEY = 'gp-theme'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

function readLegacyMode(): ThemeMode | null {
  try {
    const legacy = window.localStorage.getItem(LEGACY_KEY)
    if (legacy === 'lite') return 'light'
    if (legacy === 'dark') return 'dark'
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — ignore.
  }
  return null
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** Resolves the theme to use before any user interaction. */
function initialMode(): ThemeMode {
  return readLegacyMode() ?? (systemPrefersDark() ? 'dark' : 'light')
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: initialMode(),
      setMode: (mode) => {
        set({ mode })
      },
      toggle: () => {
        set({ mode: get().mode === 'dark' ? 'light' : 'dark' })
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ mode: state.mode }),
    },
  ),
)

/**
 * Reflects the current mode onto `<html>` so Tailwind's `dark:` variant and the
 * CSS custom properties in `index.css` pick it up, and keeps the legacy key in
 * sync so a rollback to the old site would still read the right theme.
 */
export function applyThemeToDocument(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.toggle('dark', mode === 'dark')
  root.style.colorScheme = mode
  try {
    window.localStorage.setItem(LEGACY_KEY, mode === 'dark' ? 'dark' : 'lite')
  } catch {
    // Ignore storage failures — the class on <html> is the source of truth.
  }
}
