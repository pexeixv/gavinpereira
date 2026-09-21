import * as React from "react"
import { cn } from "cn"

/** Matches the restyled `Input`: same fill, focus treatment and radius. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-36 w-full rounded-lg border border-input bg-muted/40 px-3.5 py-3 text-base leading-relaxed transition-colors outline-none placeholder:text-muted-foreground hover:bg-muted/60 focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:hover:bg-input/40 dark:focus-visible:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
