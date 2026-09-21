import { useEffect } from 'react'

import { useSeasonStore } from '@/store/season-store'
import { useThemeStore } from '@/store/theme-store'
import type { Season } from '@/types'

interface UseSeasonResult {
  season: Season
  /** Logo matching the season and the current theme. */
  logoSrc: string
  /** True while the Christmas branding (and the snowfall overlay) is active. */
  isChristmas: boolean
}

/**
 * Seasonal branding.
 *
 * The season comes from `VITE_SEASON_OVERRIDE` when set, otherwise from the
 * calendar. Logos live in `public/img/logos/logo-<season>-<black|white>.svg`;
 * the dark theme uses the white variant.
 */
export function useSeason(): UseSeasonResult {
  const season = useSeasonStore((state) => state.season)
  const refresh = useSeasonStore((state) => state.refresh)
  const isDark = useThemeStore((state) => state.mode === 'dark')

  // A long-lived tab can cross a season boundary; re-check when it wakes up.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [refresh])

  return {
    season,
    logoSrc: `/img/logos/logo-${season}-${isDark ? 'white' : 'black'}.svg`,
    isChristmas: season === 'xmas',
  }
}
