/**
 * Runtime configuration.
 *
 * Every value is read from `import.meta.env` exactly once here so the rest of
 * the app never touches `import.meta.env` directly and missing configuration
 * shows up in one place.
 */

import type { Season } from '@/types'

const SEASONS: readonly string[] = ['xmas', 'halloween', 'diwali', 'default']

function readSeasonOverride(raw: string | undefined): Season | null {
  if (!raw) return null
  const value = raw.trim().toLowerCase()
  if (value === '' || value === 'none' || value === 'auto') return null
  return SEASONS.includes(value) ? (value as Season) : null
}

export const env = {
  /** Base URL every axios request is resolved against. */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  /** Path (or absolute URL) the contact form posts to. */
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '/contact',
  /** Google reCAPTCHA v2 site key. Empty disables the widget. */
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? '',
  /** ImageKit delivery endpoint for portfolio media. */
  imagekitBaseUrl:
    import.meta.env.VITE_IMAGEKIT_BASE_URL ??
    'https://ik.imagekit.io/gavin/gavinpereira',
  /** Canonical origin, used for canonical links and Open Graph URLs. */
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://gavn.in',
  /** Forces a seasonal theme; `null` means detect from the current date. */
  seasonOverride: readSeasonOverride(import.meta.env.VITE_SEASON_OVERRIDE),
  isDev: import.meta.env.DEV,
} as const
