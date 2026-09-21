import type { Testimonial } from '@/types'

/**
 * Client testimonials. Exactly one entry may carry `featured: true` — it is
 * rendered in the wide card above the grid on the home page.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'thomas-beech',
    name: 'Thomas Beech',
    role: 'TAB Nation Coding',
    quote:
      "Gavin updated my website in a huge way. He was so fast, and so clean. I know basic web development, but I look like an idiot compared to him. I learned so much from him in the course of just a simple redesign of my website. Great person to see if you're looking for a new website, or wish to redesign an existing one.",
    image: '/img/testimonials/thomas-beech.png',
    featured: true,
    source: 'youtube.com/watch?v=-xiK-qZ1m8I',
    sourceTitle: 'TAB Nation website redesign',
    logo: '/img/clients/tabnation.png',
  },
  {
    id: 'stanley-thomas',
    name: 'Stanley Thomas',
    role: 'Systems Administrator',
    quote:
      'Working with a developer who follows best practices and has a finer eye for detail is always a great experience. Gavin is just that sort of a person. Always looking forward to working with him.',
    image: '/img/testimonials/stanley-thomas.png',
  },
  {
    id: 'chris-morgan',
    name: 'Chris Morgan',
    role: 'Owner, Macmostore',
    quote:
      'Gavin creates minimalistic designs that bring out the best of his work which is simple & elegant. He is prompt has a great eye for design & is patient. He can really help your business in developing an identity. I appreciate his craft, transparency & would definitely recommend him.',
    image: '/img/testimonials/chris-morgan.png',
  },
  {
    id: 'aaron-rodrigues',
    name: 'Aaron Rodrigues',
    role: 'Owner, ADR Pro System',
    quote:
      "Gavin is an amazing & creative graphic designer. I'm glad to be associated with him & the quality he delivers. Highly recommend his service.",
    image: '/img/testimonials/aaron-rodrigues.png',
  },
]

export const featuredTestimonial = testimonials.find(
  (testimonial) => testimonial.featured,
)

export const gridTestimonials = testimonials.filter(
  (testimonial) => !testimonial.featured,
)
