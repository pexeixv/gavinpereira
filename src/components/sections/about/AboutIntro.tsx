import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { aboutParagraphs } from '@/content/data/about'

/** Biography copy. */
export function AboutIntro() {
  return (
    <Section tone="surface" aria-labelledby="about-title">
      <SectionHeading id="about-title" title="About me" as="h1" />

      <div className="mx-auto mt-10 flex max-w-[70ch] flex-col gap-6">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  )
}
