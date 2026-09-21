import { ContactForm } from '@/components/sections/contact/ContactForm'
import { ContactInfo } from '@/components/sections/contact/ContactInfo'
import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Get in touch with Gavin Pereira — graphic designer and frontend developer based in Goa, India.',
    path: '/contact',
  })

  return (
    <>
      <Section tone="surface" aria-labelledby="contact-title">
        <SectionHeading
          id="contact-title"
          title="Drop me a line"
          as="h1"
          description="Tell me about the project and I’ll get back to you shortly."
        />

        <div className="mx-auto mt-12 w-full max-w-2xl">
          <ContactForm />
        </div>
      </Section>

      <Section aria-labelledby="contact-other-title">
        <h2 id="contact-other-title" className="sr-only">
          Other ways to reach me
        </h2>
        <ContactInfo />
      </Section>
    </>
  )
}
