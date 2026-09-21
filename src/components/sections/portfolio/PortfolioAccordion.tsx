import { useState } from 'react'

import { PortfolioSection } from '@/components/sections/portfolio/PortfolioSection'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { projectCategories, projects } from '@/content/data/projects'
import type { ProjectCategoryId } from '@/types'

/**
 * Every category starts open, matching the previous site where all four were
 * rendered with their first three items already on screen. Collapsing is still
 * available, it is just not the default.
 */
const DEFAULT_OPEN: ProjectCategoryId[] = projectCategories.map(
  (category) => category.id,
)

/** How many entries appear before the first "More", and per press after it. */
export const PAGE_SIZE = 3

function countFor(categoryId: ProjectCategoryId) {
  return projects.filter((project) => project.category === categoryId).length
}

/** The four portfolio categories as expandable panels. */
export function PortfolioAccordion() {
  /*
    How far each category has been revealed. This lives here rather than in
    `PortfolioSection` because collapsing a panel unmounts its contents — with
    the count held locally, reopening a panel would throw away everything the
    visitor had already paged through.
  */
  const [visibleByCategory, setVisibleByCategory] = useState<
    Record<string, number>
  >({})

  const showMore = (categoryId: ProjectCategoryId) => {
    setVisibleByCategory((current) => ({
      ...current,
      [categoryId]: (current[categoryId] ?? PAGE_SIZE) + PAGE_SIZE,
    }))
  }

  return (
    <Accordion type="multiple" defaultValue={DEFAULT_OPEN}>
      {projectCategories.map((category) => (
        <AccordionItem key={category.id} value={category.id}>
          {/* The page heading is the h1, so these sit at h2. */}
          <AccordionTrigger headingLevel={2}>
            <span className="flex items-center gap-3">
              {category.name}
              <Badge variant="secondary">{countFor(category.id)}</Badge>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <PortfolioSection
              category={category}
              visible={visibleByCategory[category.id] ?? PAGE_SIZE}
              onShowMore={() => {
                showMore(category.id)
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
