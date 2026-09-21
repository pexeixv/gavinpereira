import { useMutation } from '@tanstack/react-query'

import type { ApiError } from '@/lib/api-error'
import { axiosInstance } from '@/lib/axios'
import { env } from '@/lib/env'
import { queryKeys } from '@/lib/queries/keys'
import type { ContactSubmission, ContactSubmissionResponse } from '@/types'

async function submitContactForm(
  payload: ContactSubmission,
): Promise<ContactSubmissionResponse> {
  const { data } = await axiosInstance.post<ContactSubmissionResponse>(
    env.contactEndpoint,
    payload,
  )
  return data
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
