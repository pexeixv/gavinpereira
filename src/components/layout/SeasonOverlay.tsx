import { Snowfall } from '@/components/layout/Snowfall'
import { useSeason } from '@/hooks/use-season'

/**
 * Renders whatever ornament the current season calls for. Today that is the
 * Christmas snowfall; other seasons only swap the logo.
 */
export function SeasonOverlay() {
  const { isChristmas } = useSeason()

  if (!isChristmas) return null

  return <Snowfall />
}
