import { PaymentMethods } from '@/components/sections/pay/PaymentMethods'
import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function PayPage() {
  usePageMeta({
    title: 'Pay',
    description:
      'Payment details for invoices — UPI, PayPal and bank transfer.',
    path: '/pay',
  })

  return (
    <Section tone="surface" aria-labelledby="pay-title">
      <SectionHeading
        id="pay-title"
        title="Pay"
        as="h1"
        description="Settle an invoice by UPI, PayPal or bank transfer."
      />

      <div className="mx-auto mt-12 w-full max-w-4xl">
        <PaymentMethods />
      </div>
    </Section>
  )
}
