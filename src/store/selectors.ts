import type { StoreId } from '../data/app'
import type { useAppStore } from '.'

// import type { AppState } from './types'
// import { detectStoreFromDevice } from '../data/app'

type AppState = ReturnType<typeof useAppStore.getState>

export const selectPrimaryStore = (s: AppState): StoreId =>
  s.platform === 'ios' ? 'ios' : s.platform === 'android' ? 'android' : s.activeStore
export const selectSecondaryStore = (s: AppState): StoreId => (s.platform === 'ios' ? 'android' : 'ios')
export const selectIsMobile = (s: AppState): boolean => s.platform === 'ios' || s.platform === 'android'
