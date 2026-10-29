import { APP, STORES } from '../data/app'
import { StarRow } from './Icons'
import { Podium } from './Podium'
import { StoreButtons } from './StoreButton'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title">ThreeBestRated app: only the top three local businesses near you</h1>
          <p className="lede">
            Discover the top three local businesses, professionals, restaurants and healthcare providers in your city.
            ThreeBestRated&rsquo;s team selects businesses using a 50-Point Inspection, helping you explore trusted local
            options with less searching. Free to download for iPhone, iPad, and Android phones and tablets.
          </p>
          <StoreButtons placement="hero" tone="light" />
          <ul className="ratings" aria-label="Store ratings">
            {(['android', 'ios'] as const).map((id) => (
              <li key={id}>
                <StarRow value={STORES[id].rating} />
                <span>
                  <strong>{STORES[id].rating.toFixed(1)}</strong> on {STORES[id].storeName}
                  <span className="muted-on-dark">
                    {' '}
                    from {STORES[id].ratingCount} {STORES[id].ratingNoun}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Podium />
      </div>
      <div className="wrap">
        <dl className="facts">
          <div>
            <dt>{APP.stats.monthlyUsers}</dt>
            <dd>people use it every month</dd>
          </div>
          <div>
            <dt>{APP.stats.businesses}</dt>
            <dd>verified businesses</dd>
          </div>
          <div>
            <dt>{APP.stats.cities}</dt>
            <dd>cities</dd>
          </div>
          <div>
            <dt>{APP.stats.countries}</dt>
            <dd>countries, since {APP.since}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
