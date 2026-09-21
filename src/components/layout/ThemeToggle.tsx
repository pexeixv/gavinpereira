import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useThemeStore } from '@/store/theme-store'

/** Light/dark switch. The choice is persisted by the theme store. */
export function ThemeToggle() {
  const mode = useThemeStore((state) => state.mode)
  const toggle = useThemeStore((state) => state.toggle)
  const isDark = mode === 'dark'
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          onClick={toggle}
          aria-label={label}
          className="relative rounded-full"
        >
          <SunIcon
            className="size-5 scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90"
            aria-hidden="true"
          />
          <MoonIcon
            className="absolute size-5 scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0"
            aria-hidden="true"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
