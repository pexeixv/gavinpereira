import { ArrowUpRightIcon } from 'lucide-react'

import { ProjectMedia } from '@/components/sections/shared/ProjectMedia'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/ui-store'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  /** Hide the tag badges — the home page grid stays quieter than the portfolio. */
  showTags?: boolean
  eager?: boolean
  className?: string
}

/** One entry in a project grid. */
export function ProjectCard({
  project,
  showTags = true,
  eager = false,
  className,
}: ProjectCardProps) {
  const openLightbox = useUiStore((state) => state.openLightbox)

  return (
    <article className={cn('flex w-full flex-col gap-3', className)}>
      <ProjectMedia project={project} onExpand={openLightbox} eager={eager} />

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl leading-tight font-bold">
          {project.name}
        </h3>

        {showTags && project.tags.length > 0 && (
          <ul className="flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-muted-foreground">
          {project.description ?? project.type}
        </p>

        {project.link && (
          <a
            href={`https://${project.link}`}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {project.link}
            <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

/** Placeholder with the same silhouette, shown while the catalogue loads. */
export function ProjectCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="aspect-[1380/1080] w-full rounded-xl" />
      <Skeleton className="h-6 w-3/5" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-2/5" />
    </div>
  )
}
