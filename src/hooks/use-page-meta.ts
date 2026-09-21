import { useEffect } from 'react'

import { env } from '@/lib/env'
import { site } from '@/content/data/site'

interface PageMeta {
  /** Page name; the site name is appended automatically. */
  title?: string
  description?: string
  /** Path the canonical link should point at, defaults to the current path. */
  path?: string
}

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    const [, name] = /\[(?:name|property)="([^"]+)"\]/.exec(selector) ?? []
    if (!name) return
    element.setAttribute(
      selector.includes('property') ? 'property' : 'name',
      name,
    )
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

/**
 * Keeps `<title>`, the description, the canonical link and the Open Graph tags
 * in step with the active route. The static tags in `index.html` remain the
 * defaults that crawlers see before the bundle runs.
 */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} • ${site.name}` : site.name
    const desc = description ?? site.description
    const url = `${env.siteUrl}${path ?? window.location.pathname}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path])
}
