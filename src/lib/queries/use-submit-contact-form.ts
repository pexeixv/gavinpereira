import { useMutation } from '@tanstack/react-query'

import { ApiError } from '@/lib/api-error'
import { axiosInstance } from '@/lib/axios'
import { env } from '@/lib/env'
import { queryKeys } from '@/lib/queries/keys'
import type { ContactSubmission, ContactSubmissionResponse } from '@/types'

async function submitContactForm(
  payload: ContactSubmission,
): Promise<ContactSubmissionResponse> {
  const { data } = await axiosInstance.post<unknown>(
    env.contactEndpoint,
    payload,
  )

  // A misconfigured host answers an unknown path with the app shell rather
  // than a 404, which arrives here as an HTML string with a 200. Without this
  // guard the visitor would be told the message was sent when nothing received
  // it, so anything that is not a JSON object is treated as a failure.
  if (typeof data !== 'object' || data === null) {
    throw new ApiError(
      'The contact endpoint returned an unexpected response. Your message was not sent.',
      { details: data },
    )
  }

  const result = data as ContactSubmissionResponse
  if (result.success === false) {
    throw new ApiError(result.message ?? 'Your message could not be sent.', {
      details: result,
    })
  }

  return result
}

/**
 * Sends the contact form.
 *
 * The request goes through `axiosInstance`, so the reCAPTCHA token travels with
 * the message and the backend verifies it server-side — the secret key must
 * never reach the browser.
 */
export function useSubmitContactForm() {
  return useMutation<ContactSubmissionResponse, ApiError, ContactSubmission>({
    mutationKey: queryKeys.contact.submit,
    mutationFn: submitContactForm,
    retry: false,
  })
}
