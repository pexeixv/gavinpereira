import { FeaturedTestimonial } from '@/components/sections/home/FeaturedTestimonial'
import { TestimonialCard } from '@/components/sections/home/TestimonialCard'
import { Section, SectionHeading } from '@/components/sections/shared/Section'
import {
  featuredTestimonial,
  gridTestimonials,
} from '@/content/data/testimonials'

/** Client testimonials: one featured quote followed by the grid. */
export function Testimonials() {
  return (
    <Section tone="surface" aria-labelledby="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        title="Hear from my clients"
        description="The people I have built brands, websites and motion pieces for."
      />

      {featuredTestimonial && (
        <div className="mt-12">
          <FeaturedTestimonial testimonial={featuredTestimonial} />
        </div>
      )}

      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {gridTestimonials.map((testimonial) => (
          <li key={testimonial.id} className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
