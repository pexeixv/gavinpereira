import { ExternalLinkIcon, QuoteIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/types'

interface FeaturedTestimonialProps {
  testimonial: Testimonial
}

/** Wide testimonial card shown above the grid, with a link to the source. */
export function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  return (
    <Card className="relative overflow-hidden bg-card">
      {testimonial.logo && (
        <img
          src={testimonial.logo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute right-6 bottom-6 hidden max-h-24 w-auto opacity-10 lg:block"
        />
      )}

      <CardContent className="flex flex-col items-center gap-8 py-6 md:flex-row md:items-start md:gap-10">
        <Avatar className="size-40 shrink-0 ring-4 ring-primary/20 md:size-48">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback className="text-2xl font-bold">
            {testimonial.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <QuoteIcon
            className="mx-auto size-6 shrink-0 text-primary/40 md:mx-0"
            aria-hidden="true"
          />

          <blockquote className="text-base leading-relaxed text-pretty md:text-lg">
            {testimonial.quote}
          </blockquote>

          <footer className="flex flex-col gap-1">
            <p className="font-heading text-lg font-bold tracking-wide uppercase">
              {testimonial.name}
            </p>
            <p className="text-sm text-muted-foreground italic">
              {testimonial.role}
            </p>

            {testimonial.source && (
              <p className="mt-2 text-sm text-muted-foreground">
                Source:{' '}
                <a
                  href={`https://${testimonial.source}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  title={testimonial.sourceTitle}
                  className="focus-ring inline-flex items-center gap-1 text-primary hover:underline"
                >
                  {testimonial.sourceTitle ?? testimonial.source}
                  <ExternalLinkIcon className="size-3.5" aria-hidden="true" />
                </a>
              </p>
            )}
          </footer>
        </div>
      </CardContent>
    </Card>
  )
}
