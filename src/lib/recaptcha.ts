/**
 * Minimal loader for the Google reCAPTCHA v2 checkbox widget.
 *
 * Only the public site key is used here. Verification of the returned token
 * happens on the server that receives the contact submission.
 */

import { env } from '@/lib/env'

interface GrecaptchaRenderOptions {
  sitekey: string
  theme?: 'light' | 'dark'
  size?: 'normal' | 'compact'
  callback?: (token: string) => void
  'expired-callback'?: () => void
  'error-callback'?: () => void
}

interface Grecaptcha {
  ready: (callback: () => void) => void
  render: (
    container: HTMLElement | string,
    options: GrecaptchaRenderOptions,
  ) => number
  reset: (widgetId?: number) => void
  getResponse: (widgetId?: number) => string
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

const SCRIPT_ID = 'recaptcha-api'
const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit'

let loader: Promise<Grecaptcha> | null = null

/** True when a site key is configured and the widget should be rendered. */
export function isRecaptchaEnabled(): boolean {
  return env.recaptchaSiteKey.trim() !== ''
}

/** Loads the reCAPTCHA script once and resolves with the global API. */
export function loadRecaptcha(): Promise<Grecaptcha> {
  if (loader) return loader

  loader = new Promise<Grecaptcha>((resolve, reject) => {
    if (window.grecaptcha?.render) {
      resolve(window.grecaptcha)
      return
    }

    const onReady = () => {
      const api = window.grecaptcha
      if (!api) {
        reject(new Error('reCAPTCHA loaded but the API is unavailable.'))
        return
      }
      api.ready(() => {
        resolve(api)
      })
    }

    // A script element that failed earlier has already fired its load/error
    // events, so subscribing to them again would leave this promise pending
    // for ever. Drop it and insert a fresh one instead.
    document.getElementById(SCRIPT_ID)?.remove()

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener('load', onReady, { once: true })
    script.addEventListener(
      'error',
      () => {
        // Clearing the memo lets a later mount retry; the dead element is
        // removed above on that next attempt.
        loader = null
        reject(new Error('Failed to load reCAPTCHA.'))
      },
      { once: true },
    )
    document.head.appendChild(script)
  })

  return loader
}

export type { Grecaptcha, GrecaptchaRenderOptions }
