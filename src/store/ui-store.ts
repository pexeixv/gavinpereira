import { create } from 'zustand'

import type { Project } from '@/types'

interface UiState {
  /** Mobile navigation sheet. */
  isNavOpen: boolean
  setNavOpen: (open: boolean) => void

  /** Project currently shown full-screen in the lightbox, if any. */
  lightboxProject: Project | null
  openLightbox: (project: Project) => void
  closeLightbox: () => void
}

export const useUiStore = create<UiState>()((set) => ({
  isNavOpen: false,
  setNavOpen: (open) => {
    set({ isNavOpen: open })
  },

  lightboxProject: null,
  openLightbox: (project) => {
    set({ lightboxProject: project })
  },
  closeLightbox: () => {
    set({ lightboxProject: null })
  },
}))
