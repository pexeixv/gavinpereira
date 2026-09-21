import { HomeIcon, RotateCcwIcon } from 'lucide-react'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { env } from '@/lib/env'

/** Router-level error boundary for the layout routes. */
export function RouteError() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${String(error.status)} — ${error.statusText}`
    : 'Something went wrong'

  const detail =
    env.isDev && error instanceof Error
      ? error.message
      : 'That page could not be loaded. Try again, or head back home.'

  return (
    <div className="container-page flex min-h-dvh flex-col items-center justify-center gap-8 py-20 text-center">
      <Alert variant="destructive" className="max-w-lg text-left">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{detail}</AlertDescription>
      </Alert>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="brand"
          size="xl"
          onClick={() => {
            window.location.reload()
          }}
        >
          <RotateCcwIcon aria-hidden="true" />
          Try again
        </Button>
        <Button asChild variant="brandOutline" size="xl">
          <Link to="/">
            <HomeIcon aria-hidden="true" />
            Back home
          </Link>
        </Button>
      </div>
    </div>
  )
}
