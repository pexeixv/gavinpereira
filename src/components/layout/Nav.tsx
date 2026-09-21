import { NavLink } from 'react-router-dom'

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

/**
 * Primary navigation. The active route keeps the dot marker from the previous
 * design, moved beside the label in the stacked (mobile) orientation.
 */
export function Nav({
  orientation = 'horizontal',
  onNavigate,
  className,
}: NavProps) {
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
        {navLinks.map((link) => (
          <NavigationMenuItem
            key={link.to}
            className={cn(isVertical && 'w-full')}
          >
            <NavigationMenuLink asChild>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'relative flex items-center rounded-lg px-3 py-2 text-sm font-bold tracking-wide transition-colors',
                    'text-muted-foreground hover:bg-muted hover:text-foreground',
                    'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    isVertical && 'w-full justify-between py-3 text-base',
                    isActive &&
                      'bg-transparent text-primary hover:bg-transparent hover:text-primary',
                  )
                }
              >
                {({ isActive }) => (
                  <>
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
                  </>
                )}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
