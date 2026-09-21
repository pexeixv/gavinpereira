/** Shared domain types for the portfolio site. */

export type ProjectCategoryId = 'frontend' | 'logo' | 'motion' | 'graphic'

/**
 * A portfolio entry. Media is referenced by its ImageKit path fragment rather
 * than a full URL so transformations can be applied at render time.
 */
export interface Project {
  /** Stable identifier — several projects share a client name. */
  id: string
  name: string
  category: ProjectCategoryId
  /** Human readable discipline, e.g. "JAMstack Web Development". */
  type: string
  tags: string[]
  description?: string
  /** Bare host name, rendered as an outbound link. */
  link?: string
  /** ImageKit path fragment for a still image. */
  image?: string
  /** ImageKit path fragment for a looping video. */
  video?: string
}

export interface ProjectCategory {
  id: ProjectCategoryId
  name: string
  description?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  image: string
  /** Set on the single featured testimonial shown above the grid. */
  featured?: boolean
  /** Bare host name of the public source for the quote. */
  source?: string
  sourceTitle?: string
  /** Client logo watermark, featured testimonial only. */
  logo?: string
}

export interface TimelineEntry {
  id: string
  organisation: string
  position: string
  duration: string
  logo: string
  link: string
}

export interface TechSkill {
  name: string
  /** File name (without extension) under /img/tech. */
  slug: string
}

export interface Client {
  name: string
  logo: string
}

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'codepen'
  | 'github'
  | 'linkedin'
  | 'whatsapp'
  | 'email'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  href: string
}

export type Season = 'default' | 'xmas' | 'halloween' | 'diwali'

export type ThemeMode = 'light' | 'dark'

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export interface ContactSubmission extends ContactFormValues {
  /** reCAPTCHA response token, omitted when reCAPTCHA is not configured. */
  recaptchaToken?: string
}

export interface ContactSubmissionResponse {
  success: boolean
  message?: string
}
