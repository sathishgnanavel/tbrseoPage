import type { StateCreator } from 'zustand'
import type { AppState, FaqSlice } from '../types'

export const createFaqSlice: StateCreator<AppState, [], [], FaqSlice> = (set) => ({
  openFaqId: 'free',
  toggleFaq: (id) => set((s) => ({ openFaqId: s.openFaqId === id ? null : id })),
})
