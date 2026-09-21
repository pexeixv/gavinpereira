/**
 * The single HTTP client for the whole application.
 *
 * Nothing else in `src/` may import `axios` directly or call `fetch` — every
 * network request goes through `axiosInstance` so base URL, timeouts, headers
 * and error normalisation stay in one place.
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

import { ApiError, isApiError } from '@/lib/api-error'
import { env } from '@/lib/env'

const DEFAULT_TIMEOUT_MS = 15_000

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/** Dev-only request log; a no-op in production builds. */
function debugLog(message: string) {
  if (env.isDev) console.debug(message)
}

/**
 * Request interceptor.
 *
 * Placeholder for future auth: attach the token here and it applies to every
 * call in the app.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    debugLog(
      `[api] → ${config.method?.toUpperCase() ?? 'GET'} ${config.url ?? ''}`,
    )
    return config
  },
  (error: unknown) => Promise.reject(normaliseError(error)),
)

/**
 * Response interceptor.
 *
 * Rejects with a stable {@link ApiError} so callers never have to introspect
 * raw axios internals, and gives a single hook for future global handling
 * (401 refresh, offline banners, error reporting).
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = normaliseError(error)
    debugLog(
      `[api] ✕ ${apiError.status?.toString() ?? '—'} ${apiError.message}`,
    )
    return Promise.reject(apiError)
  },
)

/** Longest response body that could plausibly be a human-readable message. */
const MAX_MESSAGE_LENGTH = 200

/**
 * Only accept a bare string body when it looks like a message rather than a
 * document: a proxy answering with an HTML error page would otherwise put the
 * whole page into a toast.
 */
function messageFromString(value: string): string | undefined {
  const trimmed = value.trim()
  if (trimmed === '' || trimmed.length > MAX_MESSAGE_LENGTH) return undefined
  if (/^\s*[<{[]/.test(trimmed)) return undefined
  return trimmed
}

/** Best-effort message extraction from an arbitrary error payload. */
function messageFromPayload(payload: unknown): string | undefined {
  if (typeof payload === 'string') return messageFromString(payload)
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    for (const key of ['message', 'error', 'detail'] as const) {
      const value = record[key]
      if (typeof value === 'string') {
        const message = messageFromString(value)
        if (message) return message
      }
    }
  }
  return undefined
}

/** Converts anything thrown by axios into the app-wide {@link ApiError}. */
export function normaliseError(error: unknown): ApiError {
  if (isApiError(error)) return error

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const payload: unknown = error.response?.data
    const fallback =
      error.code === 'ECONNABORTED'
        ? 'The request timed out. Please try again.'
        : status
          ? `Request failed with status ${status.toString()}.`
          : 'Network error — please check your connection and try again.'

    return new ApiError(messageFromPayload(payload) ?? fallback, {
      status,
      code: error.code,
      details: payload,
    })
  }

  if (error instanceof Error) {
    return new ApiError(error.message, { details: error })
  }

  return new ApiError('Something went wrong. Please try again.', {
    details: error,
  })
}

export { ApiError, isApiError }
