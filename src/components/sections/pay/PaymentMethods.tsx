import { useMemo } from 'react'

import { CopyableValue } from '@/components/sections/pay/CopyableValue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPaymentMethods } from '@/content/data/payment'
import { cn } from '@/lib/utils'

/** UPI, PayPal and bank transfer details, each copyable. */
export function PaymentMethods() {
  const { upiId, upiQrCode, paypalEmail, bankDetails } = useMemo(
    () => getPaymentMethods(),
    [],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Pay via
            <img
              src="/img/pay/upi.svg"
              alt="UPI"
              className="h-5 w-auto dark:brightness-0 dark:invert"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <img
            src={upiQrCode}
            alt={`UPI QR code for ${upiId}`}
            className="h-48 w-auto dark:invert"
          />
          <CopyableValue value={upiId} label="UPI ID" />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              Pay via
              <img
                src="/img/pay/paypal.svg"
                alt="PayPal"
                className="h-5 w-auto dark:brightness-0 dark:invert"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CopyableValue value={paypalEmail} label="PayPal email" />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg">Transfer to bank account</CardTitle>
          </CardHeader>
          <CardContent>
            {/*
              The dividers are borders rather than <Separator> elements: a <dl>
              may only contain dt/dd pairs and div wrappers around them, so a
              presentational element inside one is invalid.
            */}
            <dl className="flex flex-col">
              {bankDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className={cn(
                    'flex flex-col gap-1 py-3',
                    index > 0 && 'border-t',
                  )}
                >
                  <dt className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                    {detail.label}
                  </dt>
                  <dd>
                    <CopyableValue
                      value={detail.value}
                      label={detail.label.toLowerCase()}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
