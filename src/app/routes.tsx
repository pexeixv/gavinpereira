import { lazy, Suspense } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { BaseLayout } from '@/components/layout/BaseLayout'
import { MarkdownLayout } from '@/components/layout/MarkdownLayout'
import { PageFallback } from '@/components/layout/PageFallback'
import { RouteError } from '@/components/layout/RouteError'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const LegalPage = lazy(() => import('@/pages/LegalPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageFallback />}>{element}</Suspense>
}

/**
 * Route table.
 *
 * Primary site pages nest under `BaseLayout` (header, footer, seasonal
 * ornaments); markdown-backed documents nest under `MarkdownLayout`, which
 * keeps the same chrome but constrains the content to a reading column.
 */
export const routes: RouteObject[] = [
  {
    element: <BaseLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'about', element: withSuspense(<AboutPage />) },
      { path: 'portfolio', element: withSuspense(<PortfolioPage />) },
      { path: 'contact', element: withSuspense(<ContactPage />) },
    ],
  },
  {
    element: <MarkdownLayout />,
    errorElement: <RouteError />,
    children: [
      { path: 'privacy-policy', element: withSuspense(<LegalPage />) },
      { path: 'terms', element: withSuspense(<LegalPage />) },
      { path: 'uses', element: withSuspense(<LegalPage />) },
    ],
  },
  {
    element: <BaseLayout />,
    errorElement: <RouteError />,
    children: [{ path: '*', element: withSuspense(<NotFoundPage />) }],
  },
]

export const router = createBrowserRouter(routes)
