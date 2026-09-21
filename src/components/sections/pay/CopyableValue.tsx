import { CheckIcon, CopyIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyableValueProps {
  value: string
  /** Announced to assistive technology, e.g. "IFSC code". */
  label: string
  className?: string
}

/**
 * A payment detail with a copy button.
 *
 * The old page turned the value itself into a click target with only a CSS
 * tooltip to hint at it; the action lives on a real button here so it is
 * reachable by keyboard and announced properly.
 */
export function CopyableValue({ value, label, className }: CopyableValueProps) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(timeout.current)
    },
    [],
  )

  const copy = () => {
    void navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true)
        window.clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          setCopied(false)
        }, 2000)
      },
      () => {
        // Clipboard access can be denied; the value stays selectable on screen.
      },
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className="font-mono text-sm break-all">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={copy}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className="shrink-0 rounded-full"
      >
        {copied ? (
          <CheckIcon className="size-3.5 text-primary" aria-hidden="true" />
        ) : (
          <CopyIcon className="size-3.5" aria-hidden="true" />
        )}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? `${label} copied to clipboard` : ''}
      </span>
    </span>
  )
}
