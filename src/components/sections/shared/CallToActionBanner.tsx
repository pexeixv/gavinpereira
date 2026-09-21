import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

interface CallToActionBannerProps {
  title: string
  description?: string
  actionLabel?: string
  to?: string
}

/**
 * The recurring "get in touch" banner that closes every page.
 */
export function CallToActionBanner({
  title,
  description,
  actionLabel = 'Get in touch',
  to = '/contact',
}: CallToActionBannerProps) {
  return (
    <section className="bg-surface pb-16 md:pb-24">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-sm sm:px-10 sm:py-10 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="text-pretty text-primary-foreground/80">
                {description}
              </p>
            )}
          </div>

          <Button asChild variant="brandInverse" size="xl" className="shrink-0">
            <Link to={to}>{actionLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
