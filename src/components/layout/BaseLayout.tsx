import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SeasonOverlay } from '@/components/layout/SeasonOverlay'
import { Lightbox } from '@/components/sections/shared/Lightbox'

/**
 * Default layout for the primary site pages.
 *
 * Supplies the shared chrome — skip link, sticky header, footer, seasonal
 * ornaments and the shared project lightbox — so pages only render content.
 */
export function BaseLayout() {
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

      {/* Spacer for the fixed header. */}
      <div aria-hidden="true" className="h-[70px] shrink-0" />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <SeasonOverlay />
      <Lightbox />
    </div>
  )
}
