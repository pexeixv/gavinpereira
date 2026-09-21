import { useEffect } from 'react'

import { applyThemeToDocument, useThemeStore } from '@/store/theme-store'
import type { ThemeMode } from '@/types'

interface UseThemeResult {
  mode: ThemeMode
  isDark: boolean
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

/**
 * Reads the persisted theme and keeps `<html>` in sync with it.
 *
 * Mount this once (it is mounted by `BaseLayout`/`MarkdownLayout` through the
 * theme provider); everywhere else just read `useThemeStore`.
 */
export function useTheme(): UseThemeResult {
  const mode = useThemeStore((state) => state.mode)
  const setMode = useThemeStore((state) => state.setMode)
  const toggle = useThemeStore((state) => state.toggle)

  useEffect(() => {
    applyThemeToDocument(mode)
  }, [mode])

  return { mode, isDark: mode === 'dark', setMode, toggle }
}
