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

/** Frontend work is open on arrival; the rest expand on demand. */
const DEFAULT_OPEN: ProjectCategoryId[] = ['frontend']

function countFor(categoryId: ProjectCategoryId) {
  return projects.filter((project) => project.category === categoryId).length
}

/** The four portfolio categories as expandable panels. */
export function PortfolioAccordion() {
  return (
    <Accordion type="multiple" defaultValue={DEFAULT_OPEN}>
      {projectCategories.map((category) => (
        <AccordionItem key={category.id} value={category.id}>
          <AccordionTrigger>
            <span className="flex items-center gap-3">
              {category.name}
              <Badge variant="secondary">{countFor(category.id)}</Badge>
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <PortfolioSection category={category} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
