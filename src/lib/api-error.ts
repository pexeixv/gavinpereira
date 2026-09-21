/**
 * The single error type every failed request rejects with.
 *
 * It is a real `Error` subclass so stack traces, `instanceof` checks and error
 * reporting all behave normally, while still carrying the HTTP details callers
 * need.
 */
export class ApiError extends Error {
  readonly status?: number
  readonly code?: string
  readonly details?: unknown

  constructor(
    message: string,
    options: { status?: number; code?: string; details?: unknown } = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = options.status
    this.code = options.code
    this.details = options.details
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError
}
