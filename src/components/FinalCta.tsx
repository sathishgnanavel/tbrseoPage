import { STORES } from '../data/app'
import { StoreButtons } from './StoreButton'

export function FinalCta() {
  return (
    <section id="download" className="cta" aria-labelledby="cta-title">
      <div className="wrap cta__grid">
        <div>
          <h2 id="cta-title">Stop searching. Start choosing the best.</h2>
          <p className="lede">Download ThreeBestRated free and see the top three near you in under a minute.</p>
          <StoreButtons placement="final-cta" tone="light" />
        </div>
        <div className="qr" aria-label="Scan to download">
          <figure>
            <img src="/qr-android.svg" alt={`QR code for ${STORES.android.storeName}`} width={132} height={132} />
            <figcaption>Android</figcaption>
          </figure>
          <figure>
            <img src="/qr-ios.svg" alt={`QR code for the ${STORES.ios.storeName}`} width={132} height={132} />
            <figcaption>IOS</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
