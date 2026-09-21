import { Card, CardContent } from '@/components/ui/card'
import type { TimelineEntry } from '@/types'

interface TimelineItemProps {
  entry: TimelineEntry
}

/** One role or qualification in the experience timeline. */
export function TimelineItem({ entry }: TimelineItemProps) {
  return (
    <Card className="h-full transition-colors hover:border-primary/40">
      <CardContent className="flex h-full flex-col items-start gap-3 py-2">
        <span className="text-sm text-muted-foreground italic">
          {entry.duration}
        </span>

        <h3 className="font-heading text-lg leading-snug font-bold">
          {entry.position}
        </h3>

        <a
          href={entry.link}
          target="_blank"
          rel="noreferrer noopener"
          title={entry.organisation}
          className="focus-ring mt-auto inline-block"
        >
          <img
            src={entry.logo}
            alt={entry.organisation}
            loading="lazy"
            decoding="async"
            className="max-h-12 w-auto max-w-[200px] object-contain grayscale transition-all duration-300 hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
          />
          <span className="sr-only">{entry.organisation}</span>
        </a>
      </CardContent>
    </Card>
  )
}
