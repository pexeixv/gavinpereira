import { MailIcon, MapPinIcon } from 'lucide-react'
import { useMemo } from 'react'

import { WhatsappIcon } from '@/components/icons/brand-icons'
import { SocialLinks } from '@/components/sections/contact/SocialLinks'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getDirectContact, site } from '@/content/data/site'

/**
 * Direct contact routes, social profiles and the postal address.
 *
 * The phone number and email are decoded in the browser rather than sitting in
 * the markup, the same light anti-scraping measure the previous site used.
 */
export function ContactInfo() {
  const { email, whatsappUrl, mailtoUrl } = useMemo(
    () => getDirectContact(),
    [],
  )

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Button asChild variant="brand" size="xl">
          <a href={whatsappUrl} target="_blank" rel="noreferrer noopener">
            <WhatsappIcon aria-hidden="true" />
            Text me on WhatsApp
          </a>
        </Button>

        <Button asChild variant="brandOutline" size="xl">
          <a href={mailtoUrl}>
            <MailIcon aria-hidden="true" />
            {email || site.publicEmail}
          </a>
        </Button>
      </div>

      <Separator className="max-w-xs" />

      <SocialLinks />

      <address className="flex flex-col items-center gap-1 text-center text-muted-foreground not-italic">
        <MapPinIcon className="mb-1 size-5 text-primary" aria-hidden="true" />
        {site.address.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </address>
    </div>
  )
}
