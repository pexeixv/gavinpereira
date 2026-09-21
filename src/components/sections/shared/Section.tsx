import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  children: ReactNode
  /**
   * Page band. `surface` is the tinted alternating band that replaces the old
   * `--background-secondary`; `plain` sits on the page background.
   */
  tone?: 'plain' | 'surface'
  className?: string
  innerClassName?: string
  'aria-labelledby'?: string
}

/** Full-bleed band with the standard page gutter and vertical rhythm. */
export function Section({
  id,
  children,
  tone = 'plain',
  className,
  innerClassName,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'py-16 md:py-24',
        tone === 'surface' ? 'bg-surface' : 'bg-background',
        className,
      )}
    >
      <div className={cn('container-page', innerClassName)}>{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id?: string
  title: string
  description?: string
  align?: 'center' | 'start'
  className?: string
  /** Renders as an `<h1>` instead of the default `<h2>`. */
  as?: 'h1' | 'h2'
}

/** Section title plus optional supporting line, with consistent spacing. */
export function SectionHeading({
  id,
  title,
  description,
  align = 'center',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <Tag
        id={id}
        className="font-heading text-3xl font-bold tracking-tight text-balance text-heading sm:text-4xl"
      >
        {title}
      </Tag>
      {description && (
        <p className="max-w-2xl text-base text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
