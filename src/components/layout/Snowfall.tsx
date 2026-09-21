import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

interface Flake {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  phase: number
  opacity: number
}

const FLAKE_COUNT = 60
const MAX_DPR = 2

/**
 * Christmas snowfall overlay.
 *
 * Drawn on a single canvas (one composited layer, no per-flake DOM nodes) and
 * driven by `requestAnimationFrame`, so it pauses automatically in a
 * background tab. It renders nothing at all when the visitor prefers reduced
 * motion.
 */
export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let flakes: Flake[] = []
    let frame = 0

    const random = (min: number, max: number) =>
      min + Math.random() * (max - min)

    const createFlake = (initial: boolean): Flake => ({
      x: random(0, width),
      y: initial ? random(0, height) : -10,
      radius: random(1, 3.2),
      speed: random(18, 55),
      drift: random(8, 26),
      phase: random(0, Math.PI * 2),
      opacity: random(0.35, 0.85),
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${String(width)}px`
      canvas.style.height = `${String(height)}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    flakes = Array.from({ length: FLAKE_COUNT }, () => createFlake(true))

    // The accent colour is theme- and season-aware; read it once per frame so
    // toggling the theme recolours the snow without a remount.
    const styles = getComputedStyle(document.documentElement)

    let last = performance.now()

    const draw = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05)
      last = now

      context.clearRect(0, 0, width, height)
      context.fillStyle = styles.getPropertyValue('--snow').trim() || '#fff'

      for (const flake of flakes) {
        flake.y += flake.speed * delta
        flake.phase += delta
        const x = flake.x + Math.sin(flake.phase) * flake.drift

        context.globalAlpha = flake.opacity
        context.beginPath()
        context.arc(x, flake.y, flake.radius, 0, Math.PI * 2)
        context.fill()

        if (flake.y - flake.radius > height) {
          Object.assign(flake, createFlake(false))
        }
      }

      context.globalAlpha = 1
      frame = window.requestAnimationFrame(draw)
    }

    frame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  )
}
