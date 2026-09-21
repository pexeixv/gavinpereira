import { useLocation } from 'react-router-dom'

import { MarkdownContent } from '@/components/sections/shared/MarkdownContent'
import { findLegalDocument } from '@/content/legal'
import { usePageMeta } from '@/hooks/use-page-meta'
import NotFoundPage from '@/pages/NotFoundPage'

/**
 * Renders whichever markdown document matches the current path. All three
 * markdown routes share this page — the content itself lives in
 * `src/content/legal/*.md`.
 */
export default function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\/+|\/+$/g, '')
  const document = findLegalDocument(slug)

  usePageMeta({
    title: document?.title,
    description: document?.description,
    path: `/${slug}`,
  })

  if (!document) {
    return <NotFoundPage />
  }

  return <MarkdownContent>{document.body}</MarkdownContent>
}
