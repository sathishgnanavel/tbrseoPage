import type { StoreId } from '../data/app'
import type { AppState } from './types'

/** The store to feature first: iPhone visitors see the App Store, everyone else sees Google Play. */
export const selectPrimaryStore = (s: AppState): StoreId => (s.platform === 'ios' ? 'ios' : 'android')
export const selectSecondaryStore = (s: AppState): StoreId => (s.platform === 'ios' ? 'android' : 'ios')
export const selectIsMobile = (s: AppState): boolean => s.platform === 'ios' || s.platform === 'android'
