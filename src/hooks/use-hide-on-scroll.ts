import { useEffect, useRef, useState } from 'react'

/**
 * Reproduces the old header behaviour: the bar slides away while scrolling
 * down and comes back as soon as the visitor scrolls up.
 */
export function useHideOnScroll(threshold = 8) {
  const [isHidden, setIsHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    lastScroll.current = window.scrollY

    const onScroll = () => {
      const current = window.scrollY
      const delta = current - lastScroll.current

      setIsScrolled(current > 0)

      if (current <= 0) {
        setIsHidden(false)
      } else if (Math.abs(delta) > threshold) {
        setIsHidden(delta > 0)
      }

      lastScroll.current = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return { isHidden, isScrolled }
}
