import { Formik, Form, Field as FormikField, type FieldProps } from 'formik'
import { SendIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { Recaptcha } from '@/components/sections/contact/Recaptcha'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { isApiError } from '@/lib/api-error'
import { useSubmitContactForm } from '@/lib/queries/use-submit-contact-form'
import {
  contactFormInitialValues,
  contactFormSchema,
  type ContactFormSchema,
} from '@/lib/schemas/contact'
import { isRecaptchaEnabled } from '@/lib/recaptcha'
import { cn } from '@/lib/utils'

interface TextFieldProps {
  name: keyof ContactFormSchema
  label: string
  type?: 'text' | 'email'
  autoComplete?: string
  multiline?: boolean
  placeholder?: string
}

/** One labelled control wired to Formik, with its validation message. */
function TextField({
  name,
  label,
  type = 'text',
  autoComplete,
  multiline = false,
  placeholder,
}: TextFieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`

  return (
    <FormikField name={name}>
      {({ field, meta }: FieldProps<string>) => {
        const hasError = Boolean(meta.touched && meta.error)
        const Control = multiline ? Textarea : Input

        return (
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor={id} className="font-bold">
              {label}
            </Label>
            <Control
              {...field}
              id={id}
              // `type` is meaningless on a textarea, so only pass it through
              // for the single-line inputs.
              {...(multiline ? {} : { type })}
              autoComplete={autoComplete}
              placeholder={placeholder}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            />
            <p
              id={errorId}
              role={hasError ? 'alert' : undefined}
              className={cn(
                'min-h-5 text-sm text-destructive',
                !hasError && 'sr-only',
              )}
            >
              {hasError ? meta.error : ''}
            </p>
          </div>
        )
      }}
    </FormikField>
  )
}

/**
 * Contact form.
 *
 * Formik owns the field state, Zod owns validation (through the Formik
 * adapter), and the submission itself is a TanStack Query mutation that posts
 * through `axiosInstance`.
 */
export function ContactForm() {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const { mutateAsync, isPending } = useSubmitContactForm()
  const recaptchaRequired = isRecaptchaEnabled()

  return (
    <Formik<ContactFormSchema>
      initialValues={contactFormInitialValues}
      validationSchema={toFormikValidationSchema(contactFormSchema)}
      onSubmit={async (values, helpers) => {
        if (recaptchaRequired && !recaptchaToken) {
          toast.error('Please complete the verification first.')
          return
        }

        try {
          const result = await mutateAsync({
            ...values,
            ...(recaptchaToken ? { recaptchaToken } : {}),
          })
          toast.success(result.message ?? 'Thanks! Your message is on its way.')
          helpers.resetForm()
          setRecaptchaToken(null)
        } catch (error) {
          toast.error(
            isApiError(error)
              ? error.message
              : 'Your message could not be sent. Please try again.',
          )
        }
      }}
    >
      {({ isValid, dirty }) => (
        <Form noValidate className="flex w-full flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              name="name"
              label="Name"
              autoComplete="name"
              placeholder="Your name"
            />
            <TextField
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <TextField
            name="message"
            label="Message"
            multiline
            placeholder="Tell me about your project…"
          />

          <Recaptcha onChange={setRecaptchaToken} />

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="brand"
              size="xl"
              disabled={isPending || !dirty || !isValid}
              className="min-w-40"
            >
              {isPending ? (
                <>
                  <Spinner aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <SendIcon aria-hidden="true" />
                  Send
                </>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
