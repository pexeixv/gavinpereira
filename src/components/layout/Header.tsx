import { MenuIcon } from 'lucide-react'
import { useMemo } from 'react'

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
import { getFooterLinks } from '@/content/data/site'
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/ui-store'
import { SocialIconLink } from '@/components/sections/shared/SocialIconLink'

/**
 * Sticky site header. It slides out of the way while scrolling down and
 * returns on the first upward scroll, matching the previous site.
 */
export function Header() {
  const footerLinks = useMemo(() => getFooterLinks(), [])
  const { isHidden, isScrolled } = useHideOnScroll()
  const isNavOpen = useUiStore((state) => state.isNavOpen)
  const setNavOpen = useUiStore((state) => state.setNavOpen)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[4.375rem] transition-transform duration-300',
        'bg-background/85 supports-backdrop-filter:backdrop-blur-md',
        isScrolled && 'border-b shadow-sm',
        // `focus-within` brings the bar back when a keyboard user tabs into
        // it. Without it, focus can land on a control that has been
        // translated out of the viewport, and because the header is fixed the
        // browser cannot scroll it into view.
        isHidden &&
          !isNavOpen &&
          '-translate-y-full focus-within:translate-y-0',
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
                {/*
                  The logo navigates home like any other link in the sheet, so
                  it has to close it too — otherwise the overlay stays over the
                  page the visitor just landed on.
                */}
                <Logo
                  className="w-fit"
                  onNavigate={() => {
                    setNavOpen(false)
                  }}
                />
              </SheetHeader>
              <Separator />
              {/*
                A plain div: `Nav` renders Radix's NavigationMenu root, which
                is already a labelled <nav>. Wrapping it in another one would
                nest two identically named navigation landmarks.
              */}
              <div className="p-4">
                <Nav
                  orientation="vertical"
                  onNavigate={() => {
                    setNavOpen(false)
                  }}
                />
              </div>
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
