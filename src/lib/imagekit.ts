/**
 * ImageKit URL helpers.
 *
 * Portfolio media lives on ImageKit and is requested with inline
 * transformations (`tr:w-450,q-70`). Paths in the project data are bare file
 * names, sometimes carrying a cache-busting query string.
 */

import { env } from '@/lib/env'

interface TransformOptions {
  /** Target width in pixels. */
  width?: number
  /** Quality 1–100. */
  quality?: number
  /** Enable ImageKit's progressive rendering. */
  progressive?: boolean
}

function buildTransform({
  width,
  quality,
  progressive,
}: TransformOptions): string {
  const parts: string[] = []
  if (width) parts.push(`w-${String(width)}`)
  if (progressive) parts.push('pr-true')
  if (quality) parts.push(`q-${String(quality)}`)
  return parts.join(',')
}

/** Builds a fully qualified ImageKit URL for a media path fragment. */
export function imagekitUrl(
  path: string,
  options: TransformOptions = {},
): string {
  const transform = buildTransform(options)
  const prefix = transform ? `/tr:${transform}` : ''
  const cleanPath = path.replace(/^\/+/, '')
  return `${env.imagekitBaseUrl}${prefix}/${cleanPath}`
}

/** Responsive `srcset` for a still image, used by the grid and the lightbox. */
export function imagekitSrcSet(
  path: string,
  widths: readonly number[] = [450, 500, 800, 1000],
): string {
  return widths
    .map(
      (width) =>
        `${imagekitUrl(path, { width, progressive: true })} ${String(width)}w`,
    )
    .join(', ')
}
