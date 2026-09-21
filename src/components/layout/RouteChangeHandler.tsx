import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Housekeeping that has to happen on every client-side navigation.
 *
 * The browser keeps the scroll position, which lands visitors mid-page when
 * they follow a nav link, and nothing is announced — a screen-reader user
 * activates a link, the content swaps, and they hear silence. Resetting the
 * scroll and moving focus to `<main>` fixes both: the next Tab starts inside
 * the new page, and assistive technology reads it from the top.
 */
export function RouteChangeHandler() {
  const { pathname } = useLocation()

  /*
    Seeded with the path we mounted on, so the first commit is a no-op. A
    boolean flag would not do: React's strict mode runs effects twice on
    mount, and the second pass would sail past it and steal focus on load.
  */
  const handledPath = useRef(pathname)

  useEffect(() => {
    if (handledPath.current === pathname) return
    handledPath.current = pathname

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // `preventScroll` matters: <main> sits below the fixed header's spacer, so
    // focusing it normally would scroll the page back down — far enough for
    // the auto-hiding header to read it as a downward scroll and slide away.
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
