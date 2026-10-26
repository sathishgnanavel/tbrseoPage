import type { StateCreator } from 'zustand'
import type { AppState, GallerySlice } from '../types'

export const createGallerySlice: StateCreator<AppState, [], [], GallerySlice> = (set) => ({
  activeDevice: 'iphone',
  // Switching device closes any open lightbox so its index never points at a different set.
  setDevice: (activeDevice) => set((s) => (s.activeDevice === activeDevice ? s : { activeDevice, lightboxIndex: null })),
  lightboxIndex: null,
  openLightbox: (lightboxIndex) => set({ lightboxIndex }),
  closeLightbox: () => set({ lightboxIndex: null }),
  stepLightbox: (delta, total) =>
    set((s) =>
      s.lightboxIndex === null ? s : { lightboxIndex: (s.lightboxIndex + delta + total) % total },
    ),
})
