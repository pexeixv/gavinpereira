import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { imagekitSrcSet, imagekitUrl } from '@/lib/imagekit'
import { useUiStore } from '@/store/ui-store'

/**
 * Full-screen view of a project's media.
 *
 * Mounted once by `BaseLayout` and driven by the UI store, so any grid on any
 * page can open it without threading props around. Escape and the backdrop
 * close it, and focus returns to the thumbnail — all handled by the dialog
 * primitive.
 */
export function Lightbox() {
  const project = useUiStore((state) => state.lightboxProject)
  const closeLightbox = useUiStore((state) => state.closeLightbox)

  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) closeLightbox()
      }}
    >
      {/*
        The surface is transparent so the media sits directly on the backdrop.
        That leaves the inherited close button floating over the artwork, so it
        gets a solid pill of its own — a ghost button over a dark screenshot is
        invisible, and it is the only visible way out of the dialog.
      */}
      <DialogContent className="max-w-[min(1000px,92vw)] border-none bg-transparent p-0 shadow-none **:data-[slot=button]:bg-background **:data-[slot=button]:text-foreground **:data-[slot=button]:shadow-md **:data-[slot=button]:hover:bg-background/90 *:data-[slot=dialog-close]:top-3 *:data-[slot=dialog-close]:right-3 sm:max-w-[min(1000px,92vw)]">
        <DialogHeader className="sr-only">
          <DialogTitle>{project?.name ?? 'Project preview'}</DialogTitle>
          <DialogDescription>
            {project ? `${project.name} — ${project.type}` : ''}
          </DialogDescription>
        </DialogHeader>

        {project?.image && (
          <img
            src={imagekitUrl(project.image, { width: 1000, progressive: true })}
            srcSet={imagekitSrcSet(project.image)}
            sizes="(min-width: 1024px) 1000px, 92vw"
            alt={`${project.name} — ${project.type}`}
            className="max-h-[85vh] w-full rounded-xl object-contain"
          />
        )}

        {project?.video && (
          <video
            src={imagekitUrl(project.video, { width: 800 })}
            controls
            autoPlay
            loop
            playsInline
            aria-label={`${project.name} — ${project.type}`}
            className="max-h-[85vh] w-full rounded-xl"
          >
            {/* Motion-design pieces carry no dialogue, so there is nothing to
                caption; the empty track keeps assistive tech from announcing
                missing captions. */}
            <track kind="captions" />
          </video>
        )}
      </DialogContent>
    </Dialog>
  )
}
