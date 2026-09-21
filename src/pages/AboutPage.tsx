import { AboutIntro } from '@/components/sections/about/AboutIntro'
import { TechKnowledge } from '@/components/sections/about/TechKnowledge'
import { CallToActionBanner } from '@/components/sections/shared/CallToActionBanner'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function AboutPage() {
  usePageMeta({
    title: 'About',
    description:
      'Gavin Pereira is a graphic designer and frontend developer from Goa, working at the intersection of visual design and implementation.',
    path: '/about',
  })

  return (
    <>
      <AboutIntro />
      <TechKnowledge />
      <CallToActionBanner
        tone="plain"
        title="Can’t find what you’re looking for?"
        description="I always look forward to learning new technologies."
      />
    </>
  )
}
