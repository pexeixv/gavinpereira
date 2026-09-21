import { ChevronDownIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { HeroShapes, ScrollPlinth } from '@/components/icons/decorative'
import { Button } from '@/components/ui/button'
import { site } from '@/content/data/site'

const NEXT_SECTION_ID = 'timeline'

/** Opening screen: headline, calls to action and the portrait. */
export function Hero() {
  const scrollToNext = () => {
    document
      .getElementById(NEXT_SECTION_ID)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background"
    >
      <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col items-start gap-5">
          <h1
            id="hero-title"
            className="font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance text-primary sm:text-5xl lg:text-6xl"
          >
            {site.tagline}
          </h1>

          <p className="max-w-[50ch] text-lg text-pretty text-muted-foreground">
            {site.intro}
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button asChild variant="brand" size="xl">
              <Link to="/portfolio">View work</Link>
            </Button>
            <Button asChild variant="brandOutline" size="xl">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        <div className="relative isolate flex items-end justify-center">
          <HeroShapes className="absolute inset-0 z-0 size-full translate-y-6 scale-110 text-brand-100 dark:text-brand-950" />
          <img
            src="/img/gavin.png"
            alt={`${site.name}, ${site.role}`}
            width={560}
            height={700}
            fetchPriority="high"
            className="relative z-10 max-h-104 w-auto object-contain lg:max-h-128"
          />
        </div>
      </div>

      {/* Scroll affordance — decorative on small screens, hidden entirely. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center lg:flex">
        <button
          type="button"
          onClick={scrollToNext}
          aria-label="Scroll to the next section"
          className="group pointer-events-auto relative grid h-16.5 w-31 cursor-pointer items-end justify-center rounded-t-full text-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ScrollPlinth className="absolute inset-0 h-full w-full" />
          <ChevronDownIcon
            className="relative mb-3 size-6 text-primary transition-transform duration-300 group-hover:translate-y-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  )
}
