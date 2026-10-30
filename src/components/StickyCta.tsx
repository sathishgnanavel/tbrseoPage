import { STORES } from '../data/app'
import { useAppStore } from '../store'
import { selectIsMobile, selectPrimaryStore } from '../store/selectors'

/** A bottom bar for phone visitors once they scroll past the hero. */


// function detectStore(fallback: keyof typeof STORES): keyof typeof STORES {
//   if (typeof navigator === 'undefined') return fallback
//   const ua = navigator.userAgent
//   if (/Android|Windows/i.test(ua)) return 'android'
//   if (/Mac|iPhone|iPad|iPod/i.test(ua)) return 'ios'
//   return fallback
// }

export function StickyCta() {
  const show = useAppStore((s) => s.showStickyCta)
  const mobile = useAppStore(selectIsMobile)
  // const storePrimary = useAppStore(selectPrimaryStore)
  const primary = useAppStore(selectPrimaryStore)
  const track = useAppStore((s) => s.trackDownload)
  const visible = show && mobile

  return (
    <div className={`sticky-cta${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <p>
        <strong>ThreeBestRated</strong>
        <span>Top three near you. Free.</span>
      </p>
      <a
        className="btn btn--gold"
        href={STORES[primary].url}
        target="_blank"
        rel="noopener"
        tabIndex={visible ? 0 : -1}
        onClick={() => track(primary, 'sticky')}
      >
        {primary === 'ios' ? 'Get on App Store' : 'Install'}
      </a>
    </div>
  )
}
