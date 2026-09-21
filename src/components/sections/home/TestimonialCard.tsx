import { QuoteIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Compact testimonial used in the three-up grid. */
export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        'h-full transition-colors hover:border-primary/40',
        className,
      )}
    >
      <CardContent className="flex h-full flex-col items-center gap-4 py-2 text-center">
        <Avatar className="size-28 ring-4 ring-primary/20">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback className="text-lg font-bold">
            {initials(testimonial.name)}
          </AvatarFallback>
        </Avatar>

        <QuoteIcon
          className="size-5 shrink-0 text-primary/40"
          aria-hidden="true"
        />

        <blockquote className="flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
          {testimonial.quote}
        </blockquote>

        <footer className="flex flex-col gap-0.5">
          <p className="font-heading text-base font-bold tracking-wide uppercase">
            {testimonial.name}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {testimonial.role}
          </p>
        </footer>
      </CardContent>
    </Card>
  )
}
