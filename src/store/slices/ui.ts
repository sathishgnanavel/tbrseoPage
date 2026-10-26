import type { StateCreator } from 'zustand'
import type { AppState, UiSlice } from '../types'

export const createUiSlice: StateCreator<AppState, [], [], UiSlice> = (set) => ({
  menuOpen: false,
  showStickyCta: false,
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  setShowStickyCta: (showStickyCta) => set((s) => (s.showStickyCta === showStickyCta ? s : { showStickyCta })),
})
