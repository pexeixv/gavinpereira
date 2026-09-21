import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

import { queryClient } from '@/app/query-client'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

/**
 * Application-wide providers.
 *
 * Mounted above the router so every route — including the error boundary —
 * has data fetching, theming, tooltips and toasts available.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
