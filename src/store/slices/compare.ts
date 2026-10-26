import type { StateCreator } from 'zustand'
import type { AppState, CompareSlice } from '../types'

export const createCompareSlice: StateCreator<AppState, [], [], CompareSlice> = (set) => ({
  activeStore: 'android',
  setActiveStore: (activeStore) => set({ activeStore }),
})
