import { useEffect, useRef, useState } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { env } from '@/lib/env'
import { isRecaptchaEnabled, loadRecaptcha } from '@/lib/recaptcha'
import { useThemeStore } from '@/store/theme-store'

interface RecaptchaProps {
  /** Receives the response token, or `null` when it expires or errors. */
  onChange: (token: string | null) => void
}

/**
 * Google reCAPTCHA v2 checkbox.
 *
 * Renders nothing when `VITE_RECAPTCHA_SITE_KEY` is unset so local development
 * does not require a key; the form then submits without a token and the server
 * decides whether to accept it.
 */
export function Recaptcha({ onChange }: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'ready' | 'error'>('idle')
  const mode = useThemeStore((state) => state.mode)

  // `onChange` is read through a ref so a new callback identity on every render
  // never forces the widget to be torn down and re-rendered.
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!isRecaptchaEnabled()) return

    let cancelled = false

    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !containerRef.current) return
        // Guard against a double render in React's strict mode.
        if (containerRef.current.childElementCount > 0) return

        widgetId.current = grecaptcha.render(containerRef.current, {
          sitekey: env.recaptchaSiteKey,
          theme: mode,
          callback: (token) => {
            onChangeRef.current(token)
          },
          'expired-callback': () => {
            onChangeRef.current(null)
          },
          'error-callback': () => {
            onChangeRef.current(null)
          },
        })
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
    // `mode` is deliberately excluded: reCAPTCHA cannot re-theme an existing
    // widget, and re-rendering it would discard a token the visitor already
    // solved. The widget keeps the theme it was created with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isRecaptchaEnabled()) return null

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} />
      {status === 'idle' && <Skeleton className="h-[78px] w-[304px]" />}
      {status === 'error' && (
        <Alert variant="destructive">
          <AlertDescription>
            The verification widget could not load. Please check your connection
            and refresh the page.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
