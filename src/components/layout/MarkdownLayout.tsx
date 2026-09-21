import { ArrowLeftIcon } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SeasonOverlay } from '@/components/layout/SeasonOverlay'
import { Button } from '@/components/ui/button'

/**
 * Layout for markdown-backed documents.
 *
 * Same chrome as `BaseLayout`, but the content sits in a single reading column
 * tuned for long-form text, with a way back to the home page at both ends.
 */
export function MarkdownLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />

      <a
        href="#main"
        className="focus-ring sr-only z-100 rounded-lg bg-primary px-4 py-2 font-bold text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <Header />
      <div aria-hidden="true" className="h-[70px] shrink-0" />

      <main id="main" className="flex-1 bg-surface">
        <div className="mx-auto w-[90%] max-w-[70ch] py-12 md:py-16">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-8 -ml-2.5 text-muted-foreground hover:text-foreground"
          >
            <Link to="/">
              <ArrowLeftIcon aria-hidden="true" />
              Back to home
            </Link>
          </Button>

          <Outlet />
        </div>
      </main>

      <Footer />
      <SeasonOverlay />
    </div>
  )
}
