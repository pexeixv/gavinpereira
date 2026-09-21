import { PortfolioItem } from '@/components/sections/portfolio/PortfolioItem'
import { ProjectCardSkeleton } from '@/components/sections/shared/ProjectCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useProjectsByCategory } from '@/lib/queries/use-projects'
import type { ProjectCategory } from '@/types'

const SKELETON_COUNT = 3

interface PortfolioSectionProps {
  category: ProjectCategory
  /** How many entries to show. Owned by the parent so it survives collapsing. */
  visible: number
  onShowMore: () => void
}

/**
 * The projects for one category, revealed a few at a time — the behaviour of
 * the old "MORE" button, now with a live count and a skeleton while loading.
 */
export function PortfolioSection({
  category,
  visible,
  onShowMore,
}: PortfolioSectionProps) {
  const {
    data: projects = [],
    isPending,
    isError,
    error,
  } = useProjectsByCategory(category.id)

  const shown = projects.slice(0, visible)
  const remaining = projects.length - shown.length

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Could not load {category.name.toLowerCase()}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {category.description && (
        <p className="max-w-2xl text-muted-foreground">
          {category.description}
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isPending &&
          Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}

        {shown.map((project) => (
          <PortfolioItem key={project.id} project={project} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="flex justify-center">
          <Button variant="brandOutline" size="xl" onClick={onShowMore}>
            More
            <Badge variant="secondary" className="ml-1">
              {remaining}
            </Badge>
          </Button>
        </div>
      )}
    </div>
  )
}
