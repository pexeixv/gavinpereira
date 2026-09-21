import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets the scroll position on navigation — the browser keeps it otherwise,
 * which lands visitors mid-page when they follow a nav link.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
