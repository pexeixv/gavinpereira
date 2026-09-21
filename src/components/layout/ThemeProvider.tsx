import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useSeason } from '@/hooks/use-season'
import { useTheme } from '@/hooks/use-theme'

/**
 * Applies the persisted theme and the active season to `<html>`.
 *
 * Both are attributes rather than React context so the CSS in `index.css` can
 * key off them (`.dark`, `[data-season="xmas"]`) without any component having
 * to thread the value down.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useTheme()
  const { season } = useSeason()

  useEffect(() => {
    document.documentElement.dataset.season = season
  }, [season])

  return <>{children}</>
}
