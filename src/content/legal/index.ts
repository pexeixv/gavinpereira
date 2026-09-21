import privacyPolicy from '@/content/legal/privacy-policy.md?raw'
import terms from '@/content/legal/terms.md?raw'
import uses from '@/content/legal/uses.md?raw'

export interface LegalDocument {
  /** Route path, without the leading slash. */
  slug: string
  /** Page title used for `<title>` and the meta description fallback. */
  title: string
  description: string
  /** Raw markdown, rendered at runtime by `MarkdownContent`. */
  body: string
}

/**
 * Long-form documents.
 *
 * The prose lives in the `.md` files next to this module and is imported raw —
 * never inlined into JSX — so it can be edited without touching components.
 */
export const legalDocuments: LegalDocument[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'What this site collects, what it stores in your browser, and which third-party services it uses.',
    body: privacyPolicy,
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    description: 'The terms that apply to browsing and using this site.',
    body: terms,
  },
  {
    slug: 'uses',
    title: 'Uses',
    description:
      'The editor, terminal, apps and hardware Gavin Pereira works with.',
    body: uses,
  },
]

export function findLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments.find((document) => document.slug === slug)
}
