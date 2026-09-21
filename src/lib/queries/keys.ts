/** Central registry of TanStack Query cache keys. */
export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    byCategory: (category: string) => ['projects', category] as const,
  },
  contact: {
    submit: ['contact', 'submit'] as const,
  },
} as const
