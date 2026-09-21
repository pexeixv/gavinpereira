import { decodeBase64 } from '@/lib/utils'

/**
 * Payment details for invoicing clients.
 *
 * Every value is stored base64-encoded and decoded in the browser, the same
 * light anti-scraping measure the previous site used on this page. It is
 * obfuscation, not secrecy — these are the details handed to clients.
 */
const ENCODED = {
  upiId: 'cGV4QHVwaQ==',
  paypalEmail: 'cGV4ZWl4dkBnbWFpbC5jb20=',
  accountHolder: 'R2F2aW4gSHVtYmVydCBQZXJlaXJh',
  accountNumber: 'Nzc3NzAxMDMwMTg2MzI=',
  bankName: 'RmVkZXJhbCBCYW5r',
  ifscCode: 'RkRSTDAwMDc3Nzc=',
  swiftCode: 'RkRSTElOQkJJQkQ=',
} as const

export interface PaymentDetail {
  label: string
  value: string
}

export interface PaymentMethods {
  upiId: string
  upiQrCode: string
  paypalEmail: string
  bankDetails: PaymentDetail[]
}

/** Decodes the payment details. Call this from a component, not at module scope. */
export function getPaymentMethods(): PaymentMethods {
  return {
    upiId: decodeBase64(ENCODED.upiId),
    upiQrCode: '/img/pay/qr.svg',
    paypalEmail: decodeBase64(ENCODED.paypalEmail),
    bankDetails: [
      { label: 'Account holder', value: decodeBase64(ENCODED.accountHolder) },
      { label: 'Account number', value: decodeBase64(ENCODED.accountNumber) },
      { label: 'Bank name', value: decodeBase64(ENCODED.bankName) },
      { label: 'IFSC code', value: decodeBase64(ENCODED.ifscCode) },
      { label: 'SWIFT code', value: decodeBase64(ENCODED.swiftCode) },
    ],
  }
}
