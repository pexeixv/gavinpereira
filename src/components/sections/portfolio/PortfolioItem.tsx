import { ProjectCard } from '@/components/sections/shared/ProjectCard'
import type { Project } from '@/types'

interface PortfolioItemProps {
  project: Project
}

/**
 * A single portfolio entry. Thin wrapper over the shared card so the portfolio
 * grid can evolve independently of the home page grid.
 */
export function PortfolioItem({ project }: PortfolioItemProps) {
  return <ProjectCard project={project} showTags />
}
