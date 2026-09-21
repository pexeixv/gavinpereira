import { create } from 'zustand'

import { env } from '@/lib/env'
import type { Season } from '@/types'

/**
 * Date windows for the seasonal branding, as `[month, day]` pairs where month
 * is 1-based and the range is inclusive. Diwali moves every year, so a
 * generous late-October to mid-November window is used; set
 * `VITE_SEASON_OVERRIDE` to pin an exact date range for a given year.
 */
const SEASON_WINDOWS: Record<
  Exclude<Season, 'default'>,
  { from: [number, number]; to: [number, number] }
> = {
  halloween: { from: [10, 24], to: [10, 31] },
  diwali: { from: [11, 1], to: [11, 15] },
  xmas: { from: [12, 1], to: [12, 31] },
}

function isWithin(
  date: Date,
  from: [number, number],
  to: [number, number],
): boolean {
  const value = (date.getMonth() + 1) * 100 + date.getDate()
  return value >= from[0] * 100 + from[1] && value <= to[0] * 100 + to[1]
}

/** Season implied by the calendar, ignoring any override. */
export function detectSeason(date: Date = new Date()): Season {
  for (const [season, window] of Object.entries(SEASON_WINDOWS)) {
    if (isWithin(date, window.from, window.to)) return season as Season
  }
  return 'default'
}

/** Season actually in effect: the env override wins over the calendar. */
export function resolveSeason(date: Date = new Date()): Season {
  return env.seasonOverride ?? detectSeason(date)
}

interface SeasonState {
  season: Season
  /** Re-evaluates the season, e.g. when the tab regains focus past midnight. */
  refresh: () => void
  /** Escape hatch for previewing a season without restarting the dev server. */
  setSeason: (season: Season) => void
}

export const useSeasonStore = create<SeasonState>()((set) => ({
  season: resolveSeason(),
  refresh: () => {
    set({ season: resolveSeason() })
  },
  setSeason: (season) => {
    set({ season })
  },
}))
