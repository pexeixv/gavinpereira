import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '@/lib/queries/keys'
import { projects, projectCategories } from '@/content/data/projects'
import type { Project, ProjectCategoryId } from '@/types'

/**
 * Portfolio data currently ships with the bundle, but it is served through
 * TanStack Query so the loading and error states in the UI are real. Swapping
 * the resolver for an `axiosInstance` call is the only change needed to move
 * the catalogue to a CMS.
 */
async function fetchProjects(): Promise<Project[]> {
  return Promise.resolve(projects)
}

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: fetchProjects,
    staleTime: Number.POSITIVE_INFINITY,
  })
}

/** Projects for one category, filtered from the shared cache entry. */
export function useProjectsByCategory(category: ProjectCategoryId) {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: fetchProjects,
    staleTime: Number.POSITIVE_INFINITY,
    select: (all) => all.filter((project) => project.category === category),
  })
}

/** The first `count` projects, shown as "recent work" on the home page. */
export function useRecentProjects(count = 6) {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: fetchProjects,
    staleTime: Number.POSITIVE_INFINITY,
    select: (all) => all.slice(0, count),
  })
}

export { projectCategories }
