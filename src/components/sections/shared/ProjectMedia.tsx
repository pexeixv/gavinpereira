import { ExpandIcon } from 'lucide-react'

import { imagekitSrcSet, imagekitUrl } from '@/lib/imagekit'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectMediaProps {
  project: Project
  /** Called when the visitor asks to see the media full screen. */
  onExpand?: (project: Project) => void
  className?: string
  /** Skip lazy loading for media that is above the fold. */
  eager?: boolean
}

/**
 * Thumbnail for a project — a still or a silent looping video — with an
 * "expand" affordance that opens the shared lightbox.
 */
export function ProjectMedia({
  project,
  onExpand,
  className,
  eager = false,
}: ProjectMediaProps) {
  const hasMedia = Boolean(project.image ?? project.video)
  if (!hasMedia) return null

  const content = (
    <>
      {project.image && (
        <img
          src={imagekitUrl(project.image, {
            width: 450,
            progressive: true,
            quality: 70,
          })}
          srcSet={imagekitSrcSet(project.image, [450, 800])}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          alt={`${project.name} — ${project.type}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      {project.video && (
        <video
          src={imagekitUrl(project.video, { width: 450 })}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.name} — ${project.type}`}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        >
          {/* Silent showreel loop — nothing to caption. */}
          <track kind="captions" />
        </video>
      )}

      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-3 bottom-3 grid size-9 place-items-center rounded-full',
          'bg-background/85 text-foreground shadow-md backdrop-blur-sm',
          'translate-y-2 opacity-0 transition-all duration-300',
          'group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
          'max-md:translate-y-0 max-md:opacity-100',
        )}
      >
        <ExpandIcon className="size-4" />
      </span>
    </>
  )

  const wrapperClass = cn(
    'group relative block w-full overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-foreground/10',
    className,
  )

  if (!onExpand) {
    return <div className={wrapperClass}>{content}</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        onExpand(project)
      }}
      aria-label={`View ${project.name} full screen`}
      className={cn(
        wrapperClass,
        'cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
      )}
    >
      {content}
    </button>
  )
}
