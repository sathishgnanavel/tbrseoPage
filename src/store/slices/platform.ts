import type { StateCreator } from 'zustand'
import type { AppState, PlatformSlice } from '../types'

export const createPlatformSlice: StateCreator<AppState, [], [], PlatformSlice> = (set) => ({
  platform: null,
  // Cross-slice update: the store tab and the screenshot gallery both follow the visitor's device.
  setPlatform: (platform, device) =>
    set((s) => ({
      platform,
      activeStore: platform === 'desktop' ? s.activeStore : platform,
      activeDevice: device ?? s.activeDevice,
    })),
})
