import { MenuIcon } from 'lucide-react'

import { Logo } from '@/components/layout/Logo'
import { Nav } from '@/components/layout/Nav'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { footerLinks } from '@/content/data/site'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/ui-store'
import { SocialIconLink } from '@/components/sections/shared/SocialIconLink'

/**
 * Sticky site header. It slides out of the way while scrolling down and
 * returns on the first upward scroll, matching the previous site.
 */
export function Header() {
  const { isHidden, isScrolled } = useHideOnScroll()
  const isNavOpen = useUiStore((state) => state.isNavOpen)
  const setNavOpen = useUiStore((state) => state.setNavOpen)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[70px] transition-transform duration-300',
        'bg-background/85 supports-backdrop-filter:backdrop-blur-md',
        isScrolled && 'border-b shadow-sm',
        isHidden && !isNavOpen && '-translate-y-full',
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <Logo />

        <Nav className="hidden md:flex" />

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Sheet open={isNavOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-full md:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm gap-0 p-0">
              <SheetHeader className="p-6 pb-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Logo className="w-fit" />
              </SheetHeader>
              <Separator />
              <nav className="p-4" aria-label="Main">
                <Nav
                  orientation="vertical"
                  onNavigate={() => {
                    setNavOpen(false)
                  }}
                />
              </nav>
              <Separator className="mt-auto" />
              <div className="flex items-center gap-2 p-6">
                {footerLinks.map((link) => (
                  <SocialIconLink key={link.platform} link={link} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
