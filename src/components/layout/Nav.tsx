import { NavLink, useLocation } from 'react-router-dom'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { navLinks } from '@/content/data/site'
import { cn } from '@/lib/utils'

interface NavProps {
  /** Stacked layout for the mobile sheet. */
  orientation?: 'horizontal' | 'vertical'
  onNavigate?: () => void
  className?: string
}

function isRouteActive(pathname: string, to: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

/**
 * Primary navigation. The active route keeps the dot marker from the previous
 * design, moved beside the label in the stacked (mobile) orientation.
 *
 * The active state is derived from the location rather than taken from
 * `NavLink`'s render props: these links are rendered through
 * `NavigationMenuLink asChild`, and Radix's slot merges `className` by
 * concatenating strings — handing it `NavLink`'s function form would stringify
 * the function into the class attribute instead of calling it.
 */
export function Nav({
  orientation = 'horizontal',
  onNavigate,
  className,
}: NavProps) {
  const { pathname } = useLocation()
  const isVertical = orientation === 'vertical'

  return (
    <NavigationMenu
      viewport={false}
      orientation={orientation}
      className={cn('max-w-none', isVertical && 'w-full', className)}
    >
      <NavigationMenuList
        className={cn(
          'gap-1',
          isVertical && 'w-full flex-col items-stretch gap-2',
        )}
      >
        {navLinks.map((link) => {
          const isActive = isRouteActive(pathname, link.to)

          return (
            <NavigationMenuItem
              key={link.to}
              className={cn(isVertical && 'w-full')}
            >
              <NavigationMenuLink
                asChild
                active={isActive}
                className={cn(
                  'relative flex items-center rounded-lg px-3 py-2 text-sm font-bold tracking-wide transition-colors',
                  'text-muted-foreground hover:bg-muted hover:text-foreground',
                  // Opaque ring: these links clear the UA outline and have no
                  // border to fall back on, so the ring is the whole focus
                  // indicator and must reach 3:1 on its own.
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  isVertical && 'w-full justify-between py-3 text-base',
                  isActive &&
                    'bg-transparent text-primary hover:bg-transparent hover:text-primary data-active:bg-transparent data-active:hover:bg-transparent',
                )}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onNavigate}
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'rounded-full bg-primary transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0',
                      isVertical
                        ? 'ml-3 size-1.5'
                        : 'absolute bottom-0.5 left-1/2 size-1.5 -translate-x-1/2',
                    )}
                  />
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
