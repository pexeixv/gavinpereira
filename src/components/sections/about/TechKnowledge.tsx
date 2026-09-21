import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { techStack } from '@/content/data/tech-stack'

/**
 * Grid of tools.
 *
 * The previous site revealed each name in a caption on hover. The names are
 * captions here instead: the tiles do nothing when activated, so making them
 * buttons just to hang a tooltip on would put nineteen dead stops in the tab
 * order for no benefit.
 */
export function TechKnowledge() {
  return (
    <Section aria-labelledby="tech-title">
      <SectionHeading
        id="tech-title"
        title="Tech Knowledge"
        description="The tools I reach for across design, motion and frontend work."
      />

      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap items-start justify-center gap-x-4 gap-y-6">
        {techStack.map((skill) => (
          <li
            key={skill.name}
            className="group flex w-24 flex-col items-center gap-2 text-center"
          >
            <img
              src={`/img/tech/${skill.slug}.svg`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="size-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span className="text-xs leading-tight text-muted-foreground">
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
