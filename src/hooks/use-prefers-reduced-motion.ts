import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => {
    media.removeEventListener('change', onChange)
  }
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

/** Server snapshot: assume reduced motion so nothing animates before hydration. */
function getServerSnapshot() {
  return true
}

/** True when the visitor asked the OS to minimise animation. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
