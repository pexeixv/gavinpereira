import { Section } from '@/components/sections/shared/Section'
import { TimelineItem } from '@/components/sections/home/TimelineItem'
import { timeline } from '@/content/data/timeline'

/** Work and education history. */
export function Timeline() {
  return (
    <Section id="timeline" tone="surface" aria-labelledby="timeline-title">
      <h2 id="timeline-title" className="sr-only">
        Experience and education
      </h2>

      <ul className="grid gap-6 md:grid-cols-3">
        {timeline.map((entry) => (
          <li key={entry.id} className="h-full">
            <TimelineItem entry={entry} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
