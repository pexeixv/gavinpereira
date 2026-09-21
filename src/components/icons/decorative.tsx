import type { SVGProps } from 'react'

/**
 * Decorative artwork carried over from the previous design, inlined so the
 * fills can follow `currentColor` and respond to the theme.
 */

/** Overlapping blocks that sit behind the hero portrait. */
export function HeroShapes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 962 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M609.846 850.462L310.596 1023.32L138.201 724.726L399.496 573.791C420.458 561.682 447.262 568.858 459.364 589.818L609.846 850.462ZM323.149 352.861C370.754 435.316 342.496 540.774 260.033 588.408L259.408 588.769C176.945 636.404 71.5035 608.176 23.8979 525.72C-23.7077 443.265 4.55095 337.807 87.0138 290.173L87.6382 289.812C170.102 242.178 275.543 270.406 323.149 352.861ZM760.722 298.596L499.428 449.531C478.465 461.64 451.662 454.464 439.56 433.504L289.077 172.86L588.328 0L760.722 298.596ZM961.924 647.088L662.674 819.948L512.191 559.303C500.089 538.343 507.272 511.535 528.235 499.426L789.529 348.491L961.924 647.088Z"
      />
    </svg>
  )
}

/** The rounded plinth behind the hero's scroll-down affordance. */
export function ScrollPlinth(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 124 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22.3788 29.8627C25.0982 13.5189 38.3711 0 54.9396 0H66.1954C82.764 0 96.0368 13.5189 98.7562 29.8627C101.664 47.3392 107.874 66 121.135 66C146.074 66 0 66 0 66C13.2612 66 19.471 47.3392 22.3788 29.8627Z"
      />
    </svg>
  )
}
