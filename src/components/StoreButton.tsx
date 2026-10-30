import { STORES, type StoreId } from '../data/app'
import { useAppStore } from '../store'
import { AppleIcon, PlayIcon } from './Icons'
import { selectPrimaryStore } from '../store/selectors'
interface Props {
  store: StoreId
  placement: string
  /** Highlights the button that matches the visitor's device. */
  featured?: boolean
  tone?: 'light' | 'dark'
}

export function StoreButton({ store, placement, featured = false, tone = 'light' }: Props) {
  const trackDownload = useAppStore((s) => s.trackDownload)
  const listing = STORES[store]
  const isIos = store === 'ios'

  return (
    <a
      className={`store-btn store-btn--${tone}${featured ? ' is-featured' : ''}`}
      href={listing.url}
      target="_blank"
      rel="noopener"
      onClick={() => trackDownload(store, placement)}
      aria-label={`${isIos ? 'Download ThreeBestRated on the App Store' : 'Get ThreeBestRated on Google Play'}`}
    >
      {isIos ? <AppleIcon className="store-btn__icon" /> : <PlayIcon className="store-btn__icon" />}
      <span className="store-btn__text">
        <small>{isIos ? 'Download on the' : 'Get it on'}</small>
        <strong>{listing.storeName}</strong>
      </span>
    </a>
  )
}

export function StoreButtons({ placement, tone = 'light' }: { placement: string; tone?: 'light' | 'dark' }) {
  // const platform = useAppStore((s) => s.platform)
  const platform = useAppStore(selectPrimaryStore)
  const order: StoreId[] = platform === 'ios' ? ['ios', 'android'] : ['android', 'ios']
  return (
    <div className="store-row">
      {order.map((id) => (
        <StoreButton key={id} store={id} placement={placement} tone={tone} featured={platform === id} />
      ))}
    </div>
  )
}
