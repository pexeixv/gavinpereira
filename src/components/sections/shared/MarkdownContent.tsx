import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'

/**
 * External links in long-form content open in a new tab, matching the previous
 * site. Internal links stay in place.
 */
const components: Components = {
  a: ({ href, children, ...props }) => {
    const isExternal = Boolean(href && /^https?:\/\//.test(href))
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer noopener' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  },
}

interface MarkdownContentProps {
  children: string
  className?: string
}

/** Renders a markdown document with the shared prose styling. */
export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        'prose max-w-none prose-neutral dark:prose-invert',
        // Headings pick up the brand tint; links use the accent with an
        // underline that only colours in on hover.
        'prose-headings:font-heading prose-headings:tracking-tight',
        'prose-h1:text-3xl prose-h1:text-heading sm:prose-h1:text-4xl',
        'prose-h2:mt-10 prose-h2:text-2xl prose-h2:text-heading',
        'prose-a:font-medium prose-a:text-primary prose-a:underline-offset-4',
        'prose-strong:text-foreground prose-li:marker:text-primary',
        'prose-hr:border-border',
        className,
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </Markdown>
    </div>
  )
}
