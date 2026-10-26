import { useEffect, useRef, type TouchEvent } from 'react'
import { DEVICES, SCREENSHOT_SETS, shotSrcSet, shotUrl } from '../data/app'
import { useAppStore } from '../store'
import { ChevronIcon, CloseIcon } from './Icons'

export function Lightbox() {
  const index = useAppStore((s) => s.lightboxIndex)
  const device = useAppStore((s) => s.activeDevice)
  const close = useAppStore((s) => s.closeLightbox)
  const step = useAppStore((s) => s.stepLightbox)
  const dialog = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)

  const set = DEVICES[device].set
  const shots = SCREENSHOT_SETS[set]
  const total = shots.length
  const isOpen = index !== null

  useEffect(() => {
    if (!isOpen) return
    const previous = document.activeElement as HTMLElement | null
    closeBtn.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1, total)
      else if (e.key === 'ArrowLeft') step(-1, total)
      else if (e.key === 'Tab' && dialog.current) {
        // Keep keyboard focus inside the viewer while it is open.
        const items = Array.from(dialog.current.querySelectorAll<HTMLElement>('button'))
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [isOpen, close, step, total])

  // Warm the cache for the neighbours so paging feels instant.
  useEffect(() => {
    if (index === null) return
    for (const n of [index + 1, index - 1]) {
      const shot = shots[(n + total) % total]
      new Image().src = shotUrl(set, shot.n, 810)
    }
  }, [index, set, shots, total])

  if (index === null) return null
  const shot = shots[index]

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1, total)
  }

  return (
    <div
      ref={dialog}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${DEVICES[device].label} screenshot viewer`}
      onClick={close}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__body" onClick={(e) => e.stopPropagation()}>
        <img
          key={`${set}-${shot.n}`}
          src={shotUrl(set, shot.n, 810)}
          srcSet={shotSrcSet(set, shot.n)}
          sizes="(min-aspect-ratio: 9/16) 48vh, 92vw"
          width={1125}
          height={2000}
          alt={shot.alt}
        />
        <p className="lightbox__count" aria-live="polite">
          {index + 1} of {total}
        </p>
      </div>
      <button ref={closeBtn} className="icon-btn lightbox__close" type="button" onClick={close} aria-label="Close">
        <CloseIcon />
      </button>
      <button
        className="icon-btn lightbox__nav lightbox__nav--prev"
        type="button"
        aria-label="Previous screenshot"
        onClick={(e) => {
          e.stopPropagation()
          step(-1, total)
        }}
      >
        <ChevronIcon />
      </button>
      <button
        className="icon-btn lightbox__nav lightbox__nav--next"
        type="button"
        aria-label="Next screenshot"
        onClick={(e) => {
          e.stopPropagation()
          step(1, total)
        }}
      >
        <ChevronIcon />
      </button>
    </div>
  )
}
