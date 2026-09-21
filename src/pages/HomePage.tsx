import { Hero } from '@/components/sections/home/Hero'
import { RecentWork } from '@/components/sections/home/RecentWork'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { Timeline } from '@/components/sections/home/Timeline'
import { CallToActionBanner } from '@/components/sections/shared/CallToActionBanner'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function HomePage() {
  usePageMeta({ path: '/' })

  return (
    <>
      <Hero />
      <Timeline />
      <RecentWork />
      <Testimonials />
      <CallToActionBanner title="Have some work for me?" />
    </>
  )
}
