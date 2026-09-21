import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { techStack } from '@/content/data/tech-stack'

/**
 * Grid of tools. The previous site revealed each name in a caption on hover;
 * a tooltip does the same job and works for keyboard and touch users too.
 */
export function TechKnowledge() {
  return (
    <Section aria-labelledby="tech-title">
      <SectionHeading
        id="tech-title"
        title="Tech Knowledge"
        description="The tools I reach for across design, motion and frontend work."
      />

      <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {techStack.map((skill) => (
          <li key={skill.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xl"
                  aria-label={skill.name}
                  className="group size-16 rounded-xl p-3"
                >
                  <img
                    src={`/img/tech/${skill.slug}.svg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="size-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{skill.name}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </Section>
  )
}
