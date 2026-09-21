import { Link } from 'react-router-dom'

import { Logo } from '@/components/layout/Logo'
import { SocialIconLink } from '@/components/sections/shared/SocialIconLink'
import { Separator } from '@/components/ui/separator'
import { footerLinks, site } from '@/content/data/site'

const legalLinks = [
  { label: 'Privacy', to: '/privacy-policy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Uses', to: '/uses' },
]

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container-page flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
        <Logo />

        <p className="text-center text-xs leading-relaxed font-bold tracking-wide text-muted-foreground uppercase">
          This website is made with{' '}
          <span className="relative inline-block">
            love
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px bg-foreground"
            />
          </span>
          <br />a keyboard by {site.name}
        </p>

        <div className="flex items-center gap-2">
          {footerLinks.map((link) => (
            <SocialIconLink key={link.platform} link={link} />
          ))}
        </div>

        {/*
          Hidden discovery links for crawlers and language models. These are
          intentionally not shown to visitors — the same arrangement the
          previous site used.
        */}
        <a href="/ai.txt" hidden>
          AI Info
        </a>
        <a href="/llms.txt" hidden>
          LLM Info
        </a>
        <a href="/humans.txt" hidden>
          Human Info
        </a>
      </div>

      <Separator />

      <div className="container-page flex flex-col items-center gap-3 py-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <nav aria-label="Legal">
          <ul className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="focus-ring text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
