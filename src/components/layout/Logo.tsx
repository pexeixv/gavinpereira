import { Link } from 'react-router-dom'

import { site } from '@/content/data/site'
import { useSeason } from '@/hooks/use-season'
import { cn } from '@/lib/utils'

interface LogoProps {
  /** Hides the wordmark, e.g. in tight footers on small screens. */
  showWordmark?: boolean
  className?: string
  imageClassName?: string
}

/**
 * The site mark. The glyph follows the active season and the current theme —
 * see `useSeason` for how the file name is resolved.
 */
export function Logo({
  showWordmark = true,
  className,
  imageClassName,
}: LogoProps) {
  const { logoSrc, season } = useSeason()

  return (
    <Link
      to="/"
      className={cn(
        'focus-ring group flex items-center gap-2 rounded-lg',
        className,
      )}
    >
      <img
        // Re-mounts the element when the season or theme changes so the browser
        // never shows the previous glyph while the new file loads.
        key={logoSrc}
        src={logoSrc}
        alt={`${site.name} logo`}
        width={40}
        height={40}
        className={cn(
          'h-10 w-auto transition-transform duration-300 group-hover:scale-105',
          imageClassName,
        )}
        data-season={season}
      />
      {showWordmark && (
        <span className="font-heading text-lg leading-none font-bold tracking-tight sm:text-xl">
          {site.name}
        </span>
      )}
    </Link>
  )
}
