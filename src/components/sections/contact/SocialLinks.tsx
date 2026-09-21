import { SocialIconLink } from '@/components/sections/shared/SocialIconLink'
import { socialLinks } from '@/content/data/site'

/** Row of social profile buttons. */
export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {socialLinks.map((link) => (
        <li key={link.platform}>
          <SocialIconLink link={link} />
        </li>
      ))}
    </ul>
  )
}
