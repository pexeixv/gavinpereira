/**
 * Shared helpers.
 *
 * `cn` is re-exported from the `cn` package so the generated shadcn primitives
 * and hand-written components use exactly the same class merger.
 */
export { cn } from 'cn'

/** Turns "Adobe Illustrator" into "adobe-illustrator". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '-')
}

/** Decodes a base64 string in the browser. Returns `''` if the input is bad. */
export function decodeBase64(value: string): string {
  try {
    return atob(value)
  } catch {
    return ''
  }
}
