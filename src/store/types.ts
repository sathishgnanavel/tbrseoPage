import type { DeviceId, StoreId } from '../data/app'

export type Platform = StoreId | 'desktop'

export interface PlatformSlice {
  /** null until the client has mounted, so server and first client render match. */
  platform: Platform | null
  setPlatform: (platform: Platform, device?: DeviceId) => void
}

export interface CompareSlice {
  activeStore: StoreId
  setActiveStore: (store: StoreId) => void
}

export interface GallerySlice {
  /** Which device's screenshots are on show. The server renders the default; the client updates it after detection. */
  activeDevice: DeviceId
  setDevice: (device: DeviceId) => void
  lightboxIndex: number | null
  openLightbox: (index: number) => void
  closeLightbox: () => void
  stepLightbox: (delta: number, total: number) => void
}

export interface FaqSlice {
  openFaqId: string | null
  toggleFaq: (id: string) => void
}

export interface UiSlice {
  menuOpen: boolean
  showStickyCta: boolean
  toggleMenu: () => void
  closeMenu: () => void
  setShowStickyCta: (show: boolean) => void
}

export interface AnalyticsSlice {
  lastDownload: { store: StoreId; placement: string } | null
  trackDownload: (store: StoreId, placement: string) => void
}

export type AppState = PlatformSlice & CompareSlice & GallerySlice & FaqSlice & UiSlice & AnalyticsSlice
