import fs from 'node:fs'
import {
  siFacebook,
  siInstagram,
  siCodepen,
  siGithub,
  siLinkedin,
  siWhatsapp,
} from 'simple-icons'

const icons = [
  ['FacebookIcon', siFacebook],
  ['InstagramIcon', siInstagram],
  ['CodepenIcon', siCodepen],
  ['GithubIcon', siGithub],
  ['LinkedinIcon', siLinkedin],
  ['WhatsappIcon', siWhatsapp],
]

const header = `import type { SVGProps } from 'react'

/**
 * Brand marks for the social links.
 *
 * Lucide deliberately does not ship third-party logos, so these six glyphs are
 * generated from Simple Icons and exposed with the same props as a Lucide icon
 * (\`className\`, \`size\`, \`currentColor\` fill). Every other icon in the app comes
 * from \`lucide-react\`.
 */
export interface BrandIconProps extends Omit<SVGProps<SVGSVGElement>, 'size'> {
  size?: number | string
}

function BrandIcon({
  path,
  title,
  size = 24,
  ...props
}: BrandIconProps & { path: string; title: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  )
}
`

const body = icons
  .map(
    ([name, icon]) => `
export function ${name}(props: BrandIconProps) {
  return (
    <BrandIcon
      title=${JSON.stringify(icon.title)}
      path=${JSON.stringify(icon.path)}
      {...props}
    />
  )
}
`,
  )
  .join('')

fs.writeFileSync(
  '/Users/zml-mac-gavinp-01/Dev/gavinpereira/src/components/icons/brand-icons.tsx',
  header + body,
)
console.log('wrote brand icons:', icons.map(([n]) => n).join(', '))
