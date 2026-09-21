import { MailIcon } from 'lucide-react'
import type { ComponentType } from 'react'

import {
  CodepenIcon,
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
  type BrandIconProps,
} from '@/components/icons/brand-icons'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { SocialLink, SocialPlatform } from '@/types'

const ICONS: Record<SocialPlatform, ComponentType<BrandIconProps>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  codepen: CodepenIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  email: MailIcon,
}

interface SocialIconLinkProps {
  link: SocialLink
  className?: string
}

/** Round icon button for a social profile, with the platform name on hover. */
export function SocialIconLink({ link, className }: SocialIconLinkProps) {
  const Icon = ICONS[link.platform]
  const isExternal = link.href.startsWith('http')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="secondary"
          size="icon-lg"
          className={cn(
            'rounded-full text-foreground transition-colors hover:bg-primary hover:text-primary-foreground',
            className,
          )}
        >
          <a
            href={link.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer noopener' : undefined}
          >
            <Icon className="size-4" />
            <span className="sr-only">{link.label}</span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{link.label}</TooltipContent>
    </Tooltip>
  )
}
