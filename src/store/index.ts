import { create } from 'zustand'
import { createAnalyticsSlice } from './slices/analytics'
import { createCompareSlice } from './slices/compare'
import { createFaqSlice } from './slices/faq'
import { createGallerySlice } from './slices/gallery'
import { createPlatformSlice } from './slices/platform'
import { createUiSlice } from './slices/ui'
import type { AppState } from './types'

export const useAppStore = create<AppState>()((...a) => ({
  ...createPlatformSlice(...a),
  ...createCompareSlice(...a),
  ...createGallerySlice(...a),
  ...createFaqSlice(...a),
  ...createUiSlice(...a),
  ...createAnalyticsSlice(...a),
}))

export type { AppState, Platform } from './types'
