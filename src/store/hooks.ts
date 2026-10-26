import { useEffect } from 'react'
import { useAppStore } from '.'
import type { DeviceId } from '../data/app'
import type { Platform } from './types'

function detectDevice(): { platform: Platform; device?: DeviceId } {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) {
    // Android Chrome drops the word "Mobile" from the user agent on tablets.
    return { platform: 'android', device: /mobile/i.test(ua) ? 'android-phone' : 'android-tablet' }
  }
  // iPadOS 13+ reports itself as a Mac, so check for touch support too.
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) {
    return { platform: 'ios', device: 'ipad' }
  }
  if (/iPhone|iPod/i.test(ua)) return { platform: 'ios', device: 'iphone' }
  return { platform: 'desktop' }
}

export function usePlatformDetection() {
  const setPlatform = useAppStore((s) => s.setPlatform)
  useEffect(() => {
    const { platform, device } = detectDevice()
    setPlatform(platform, device)
  }, [setPlatform])
}

export function useStickyCtaTrigger(offset = 640) {
  const setShow = useAppStore((s) => s.setShowStickyCta)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset, setShow])
}
