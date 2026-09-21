import type { SVGProps } from 'react'

/**
 * Brand marks for the social links.
 *
 * Lucide no longer ships third-party logos, so these six glyphs are drawn here
 * in the same 24×24 / 2px-stroke / round-cap style as the rest of the Lucide
 * set, which keeps a row of mixed icons visually consistent. Every non-brand
 * icon in the app comes from `lucide-react`.
 */

export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  size?: number | string
}

function BrandIcon({ size = 24, children, ...props }: BrandIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function FacebookIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandIcon>
  )
}

export function InstagramIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </BrandIcon>
  )
}

export function GithubIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </BrandIcon>
  )
}

export function LinkedinIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </BrandIcon>
  )
}

export function CodepenIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" y1="22" x2="12" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" y1="2" x2="12" y2="8.5" />
    </BrandIcon>
  )
}

export function WhatsappIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 21l1.7-3.9A9 9 0 1 1 8.1 20L3 21z" />
      <path d="M9 10a1 1 0 0 1 1-1h.6a.5.5 0 0 1 .5.4l.3 1.2a.5.5 0 0 1-.15.5l-.55.45a5.2 5.2 0 0 0 2.3 2.3l.45-.55a.5.5 0 0 1 .5-.15l1.2.3a.5.5 0 0 1 .4.5V15a1 1 0 0 1-1 1 6 6 0 0 1-6-6z" />
    </BrandIcon>
  )
}
