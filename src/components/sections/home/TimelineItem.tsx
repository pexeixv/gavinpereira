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
          className="focus-ring group/logo mt-auto inline-block"
        >
          {/*
            The logos are dark-ink artwork on transparent backgrounds. Rather
            than inverting them in the dark theme — which flattens the detail
            in the crest-style marks — they sit on a light plate that keeps
            every one legible.
          */}
          <span className="inline-flex items-center justify-center rounded-lg p-2 transition-colors dark:bg-white">
            <img
              src={entry.logo}
              alt={entry.organisation}
              loading="lazy"
              decoding="async"
              className="max-h-10 w-auto max-w-45 object-contain grayscale transition-all duration-300 group-hover/logo:grayscale-0"
            />
          </span>
          <span className="sr-only">{entry.organisation}</span>
        </a>
      </CardContent>
    </Card>
  )
}
