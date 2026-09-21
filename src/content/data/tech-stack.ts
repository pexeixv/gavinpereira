import type { Client, TechSkill } from '@/types'

/**
 * Tools shown in the "Tech Knowledge" grid on the About page.
 * `slug` matches a file under `public/img/tech/<slug>.svg`.
 */
export const techStack: TechSkill[] = [
  { name: 'HTML5', slug: 'HTML5' },
  { name: 'CSS3', slug: 'CSS3' },
  { name: 'JavaScript', slug: 'JavaScript' },
  { name: 'Sass', slug: 'sass' },
  { name: 'Tailwind CSS', slug: 'tailwind-css' },
  { name: '11ty', slug: '11ty' },
  { name: 'Git', slug: 'git' },
  { name: 'Adobe Illustrator', slug: 'adobe-illustrator' },
  { name: 'Photoshop', slug: 'photoshop' },
  { name: 'After Effects', slug: 'after-effects' },
  { name: 'Figma', slug: 'figma' },
  { name: 'GSAP', slug: 'gsap' },
  { name: 'Python', slug: 'Python' },
  { name: 'Contentful CMS', slug: 'contentful-cms' },
  { name: 'Next JS', slug: 'next-js' },
  { name: 'Sanity CMS', slug: 'sanity-cms' },
  { name: 'Astro.build', slug: 'astro.build' },
  { name: 'React', slug: 'react.js' },
  { name: 'Vite', slug: 'vitejs' },
]

/** Client logos. Currently unused on a page but kept with the rest of the data. */
export const clients: Client[] = [
  { name: 'ADR Pro System', logo: '/img/clients/adrpro.png' },
  { name: 'Four Lensmen', logo: '/img/clients/4L.png' },
  { name: 'SALTŤ Kitchen', logo: '/img/clients/saltt.png' },
  { name: 'TAB Nation', logo: '/img/clients/tabnation.png' },
]
