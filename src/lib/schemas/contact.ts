import { z } from 'zod'

/**
 * Contact form schema. Consumed by Formik through `zod-formik-adapter`, so the
 * messages here are what the visitor actually reads under each field.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters.')
    .max(80, 'That name is a little too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'An email address is required.')
    .email('Please enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a bit more — at least 10 characters.')
    .max(2000, 'Please keep the message under 2000 characters.'),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>

export const contactFormInitialValues: ContactFormSchema = {
  name: '',
  email: '',
  message: '',
}
