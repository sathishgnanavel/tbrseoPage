import type { StateCreator } from 'zustand'
import type { AnalyticsSlice, AppState } from '../types'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export const createAnalyticsSlice: StateCreator<AppState, [], [], AnalyticsSlice> = (set) => ({
  lastDownload: null,
  trackDownload: (store, placement) => {
    set({ lastDownload: { store, placement } })
    // Works with Google Tag Manager out of the box; ignored when no dataLayer exists.
    if (typeof window !== 'undefined') {
      window.dataLayer?.push({ event: 'download_click', store, placement })
    }
  },
})
