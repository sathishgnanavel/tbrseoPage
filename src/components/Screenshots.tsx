import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react'
import { DEVICES, DEVICE_ORDER, SCREENSHOT_SETS, type DeviceId } from '../data/app'
import { useAppStore } from '../store'
import { ChevronIcon, PhoneIcon, TabletIcon } from './Icons'
import { ScreenImage } from './ScreenImage'
import { StoreButton } from './StoreButton'

const CARD_SIZES = '(min-width: 700px) 280px, 62vw'

export function Screenshots() {
  const device = useAppStore((s) => s.activeDevice)
  const setDevice = useAppStore((s) => s.setDevice)
  const open = useAppStore((s) => s.openLightbox)

  const current = DEVICES[device]
  const shots = SCREENSHOT_SETS[current.set]

  const list = useRef<HTMLUListElement>(null)
  const thumb = useRef<HTMLSpanElement>(null)

  // Keeps the progress thumb in step with the scroll position without re-rendering React.
  const syncProgress = useCallback(() => {
    const el = list.current
    if (!el || !thumb.current) return
    const max = el.scrollWidth - el.clientWidth
    thumb.current.style.setProperty('--p', String(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0))
  }, [])

  useEffect(() => {
    list.current?.scrollTo({ left: 0 })
    syncProgress()
  }, [current.set, syncProgress])

  const page = (dir: 1 | -1) => {
    const el = list.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap) * 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, id: DeviceId) => {
    const i = DEVICE_ORDER.indexOf(id)
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % DEVICE_ORDER.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + DEVICE_ORDER.length) % DEVICE_ORDER.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = DEVICE_ORDER.length - 1
    else return
    e.preventDefault()
    setDevice(DEVICE_ORDER[next])
    document.getElementById(`device-${DEVICE_ORDER[next]}`)?.focus()
  }

  return (
    <section id="screenshots" className="section section--dark" aria-labelledby="shots-title">
      <div className="wrap">
        <h2 id="shots-title">See the app on your iPhone, iPad or Android</h2>
        <p className="section-lede">
          Six screens from the store listings, shown the way they look on phones and tablets. Pick your device,
          then tap a screen to enlarge it.
        </p>

        <div className="devices" role="tablist" aria-label="Choose your device">
          {DEVICE_ORDER.map((id) => {
            const d = DEVICES[id]
            const selected = id === device
            return (
              <button
                key={id}
                role="tab"
                type="button"
                id={`device-${id}`}
                aria-selected={selected}
                aria-controls="shots-panel"
                tabIndex={selected ? 0 : -1}
                className={selected ? 'is-active' : ''}
                onClick={() => setDevice(id)}
                onKeyDown={(e) => onTabKey(e, id)}
              >
                {d.kind === 'phone' ? <PhoneIcon /> : <TabletIcon />}
                {d.label}
              </button>
            )
          })}
        </div>
      </div>

      <div id="shots-panel" role="tabpanel" aria-labelledby={`device-${device}`}>
        <ul
          key={current.set}
          ref={list}
          className={`gallery gallery--${current.set}`}
          aria-label={`${current.label} screenshots`}
          onScroll={syncProgress}
        >
          {shots.map((s, i) => (
            <li key={s.n}>
              <button type="button" onClick={() => open(i)} aria-label={`Enlarge screenshot ${i + 1} of ${shots.length}: ${s.caption}`}>
                <ScreenImage set={current.set} shot={s} sizes={CARD_SIZES} />
              </button>
            </li>
          ))}
        </ul>

        <div className="wrap shots-foot">
          <div className="shots-foot__left">
            <p className="shots-foot__note">{current.note}</p>
            <span className="progress" aria-hidden="true">
              <span ref={thumb} />
            </span>
          </div>
          <div className="shots-foot__right">
            <div className="gallery-nav">
              <button type="button" className="icon-btn" aria-label="Scroll screenshots back" onClick={() => page(-1)}>
                <ChevronIcon className="rot-l" />
              </button>
              <button type="button" className="icon-btn" aria-label="Scroll screenshots forward" onClick={() => page(1)}>
                <ChevronIcon className="rot-r" />
              </button>
            </div>
            <StoreButton store={current.store} placement={`gallery-${current.id}`} tone="light" />
          </div>
        </div>
      </div>
    </section>
  )
}
