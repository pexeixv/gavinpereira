import { PortfolioAccordion } from '@/components/sections/portfolio/PortfolioAccordion'
import { CallToActionBanner } from '@/components/sections/shared/CallToActionBanner'
import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function PortfolioPage() {
  usePageMeta({
    title: 'Portfolio',
    description:
      'Frontend, logo design, motion design and graphic design work by Gavin Pereira.',
    path: '/portfolio',
  })

  return (
    <>
      <Section tone="surface" aria-labelledby="portfolio-title">
        <SectionHeading
          id="portfolio-title"
          title="Portfolio"
          as="h1"
          description="Frontend builds, brand identities, motion pieces and graphics — expand a category to browse."
        />

        <div className="mt-12">
          <PortfolioAccordion />
        </div>
      </Section>

      <CallToActionBanner
        title="Can’t find what you’re looking for?"
        description="I might be offering it anyways."
      />
    </>
  )
}
