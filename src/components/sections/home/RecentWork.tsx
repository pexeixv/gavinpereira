import { Link } from 'react-router-dom'

import {
  ProjectCard,
  ProjectCardSkeleton,
} from '@/components/sections/shared/ProjectCard'
import { Section, SectionHeading } from '@/components/sections/shared/Section'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useRecentProjects } from '@/lib/queries/use-projects'

const RECENT_COUNT = 6

/** The six most recent projects, with a route through to the full portfolio. */
export function RecentWork() {
  const {
    data: projects,
    isPending,
    isError,
    error,
  } = useRecentProjects(RECENT_COUNT)

  return (
    <Section aria-labelledby="recent-work-title">
      <SectionHeading
        id="recent-work-title"
        title="Check out my recent work"
        description="A selection of recent websites, brands and motion pieces."
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {isPending &&
          Array.from({ length: RECENT_COUNT }, (_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}

        {projects?.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            showTags={false}
            eager={index < 3}
          />
        ))}
      </div>

      {isError && (
        <Alert variant="destructive" className="mt-8">
          <AlertTitle>Could not load recent work</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="mt-12 flex justify-center">
        <Button asChild variant="brand" size="xl">
          <Link to="/portfolio">View more</Link>
        </Button>
      </div>
    </Section>
  )
}
