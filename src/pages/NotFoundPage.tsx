import { ArrowRightIcon, HomeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { navLinks } from '@/content/data/site'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'That page does not exist on gavn.in.',
  })

  return (
    <section className="container-page flex flex-col items-center gap-6 py-24 text-center">
      <p className="font-heading text-6xl font-bold tracking-tight text-primary">
        404
      </p>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-balance text-heading">
        That page doesn’t exist
      </h1>
      <p className="max-w-prose text-pretty text-muted-foreground">
        The link may be out of date, or the page may have moved. Here is
        everything else on the site.
      </p>

      <Button asChild variant="brand" size="xl" className="mt-2">
        <Link to="/">
          <HomeIcon aria-hidden="true" />
          Back home
        </Link>
      </Button>

      <nav aria-label="All pages" className="mt-4">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {navLinks
            .filter((link) => link.to !== '/')
            .map((link) => (
              <li key={link.to}>
                <Button asChild variant="ghost" size="lg">
                  <Link to={link.to}>
                    {link.label}
                    <ArrowRightIcon aria-hidden="true" />
                  </Link>
                </Button>
              </li>
            ))}
        </ul>
      </nav>
    </section>
  )
}
