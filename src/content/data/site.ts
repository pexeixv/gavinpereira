import type { SocialLink } from '@/types'
import { decodeBase64 } from '@/lib/utils'

/** Site-wide identity and copy. */
export const site = {
  name: 'Gavin Pereira',
  role: 'Graphic Designer & Frontend Developer',
  tagline: 'I craft beautiful web experiences.',
  intro:
    "I'm Gavin Pereira, a graphic designer and frontend developer from Goa.",
  description:
    'Gavin Pereira is a Graphic Designer & Frontend Developer from Goa.',
  address: ['Vasco-da-Gama', 'Goa, India', '403802'],
  /** Shown in the footer. */
  publicEmail: 'connect@gavn.in',
} as const

/**
 * Direct contact details are stored base64-encoded and decoded at runtime, the
 * same light anti-scraping measure the previous site used. This is obfuscation,
 * not secrecy — both values are public.
 */
const ENCODED_PHONE = 'OTE4ODg4MjUzOTky'
const ENCODED_EMAIL = 'aGlAZ2F2bi5pbg=='

/** Returns the WhatsApp number and contact email, decoded in the browser. */
export function getDirectContact() {
  const phone = decodeBase64(ENCODED_PHONE)
  const email = decodeBase64(ENCODED_EMAIL)
  return {
    phone,
    email,
    whatsappUrl: `https://wa.me/${phone}`,
    mailtoUrl: `mailto:${email}`,
  }
}

/** Social profiles shown on the contact page. */
export const socialLinks: SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/pexeixv',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://instagr.am/pexeixv',
  },
  { platform: 'codepen', label: 'CodePen', href: 'https://codepen.io/pexeixv' },
  { platform: 'github', label: 'GitHub', href: 'https://github.com/pexeixv' },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gavinpereirain',
  },
]

/**
 * Quick contact shortcuts shown in the footer.
 *
 * Built from {@link getDirectContact} rather than written out: the footer is on
 * every page, so a literal `wa.me/<number>` here would publish in plain markup
 * the very number the encoding above exists to keep out of it.
 */
export function getFooterLinks(): SocialLink[] {
  const { whatsappUrl } = getDirectContact()
  return [
    { platform: 'whatsapp', label: 'WhatsApp', href: whatsappUrl },
    { platform: 'email', label: 'Email', href: `mailto:${site.publicEmail}` },
  ]
}

/** Primary navigation. */
export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
] as const
