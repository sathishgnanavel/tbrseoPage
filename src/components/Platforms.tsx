import { STORES, type StoreId } from '../data/app'
import { useAppStore } from '../store'
import { StarRow } from './Icons'
import { StoreButton } from './StoreButton'

const ORDER: StoreId[] = ['android', 'ios']

export function Platforms() {
  const active = useAppStore((s) => s.activeStore)
  const setActive = useAppStore((s) => s.setActiveStore)
  const platform = useAppStore((s) => s.platform)

  return (
    <section id="platforms" className="section section--tint" aria-labelledby="platforms-title">
      <div className="wrap">
        <h2 id="platforms-title">ThreeBestRated for Android and iPhone</h2>
        <p className="section-lede">The same top-three results on both platforms. Here is what each store listing says.</p>

        <div className="tabs" role="tablist" aria-label="Choose a platform">
          {ORDER.map((id) => (
            <button
              key={id}
              role="tab"
              type="button"
              id={`tab-${id}`}
              aria-selected={active === id}
              aria-controls={`panel-${id}`}
              tabIndex={active === id ? 0 : -1}
              className={active === id ? 'is-active' : ''}
              onClick={() => setActive(id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') setActive(id === 'android' ? 'ios' : 'android')
              }}
            >
              {STORES[id].label}
            </button>
          ))}
        </div>

        {ORDER.map((id) => {
          const s = STORES[id]
          return (
            <div
              key={id}
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              className="panel"
              hidden={active !== id}
            >
              <div className="panel__head">
                <div>
                  <h3>{s.storeName}</h3>
                  <p className="panel__rating">
                    <StarRow value={s.rating} /> <strong>{s.rating.toFixed(1)}</strong> from {s.ratingCount}{' '}
                    {s.ratingNoun}
                  </p>
                </div>
                <StoreButton store={id} placement="platforms" tone="dark" featured={platform === id} />
              </div>
              <dl className="specs">
                {s.specs.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
      </div>
    </section>
  )
}
