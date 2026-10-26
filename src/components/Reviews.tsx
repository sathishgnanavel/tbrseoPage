import { COMBINED_RATING, STORES } from '../data/app'
import { REVIEWS } from '../data/content'
import { StarRow } from './Icons'

export function Reviews() {
  const [lead, ...rest] = REVIEWS
  return (
    <section id="reviews" className="section section--tint" aria-labelledby="reviews-title">
      <div className="wrap">
        <h2 id="reviews-title">What users say in the stores</h2>
        <p className="reviews__summary">
          <StarRow value={COMBINED_RATING.value} />
          <span>
            Rated {STORES.android.rating.toFixed(1)} on Google Play and {STORES.ios.rating.toFixed(1)} on the App Store.
          </span>
        </p>
        <div className="quotes">
          <figure className="quote quote--lead">
            <blockquote>
              <p>{lead.quote}</p>
            </blockquote>
            <figcaption>
              {lead.name}, {lead.store}, {lead.date}
            </figcaption>
          </figure>
          {rest.map((r) => (
            <figure className="quote" key={r.name}>
              <blockquote>
                <p>{r.quote}</p>
              </blockquote>
              <figcaption>
                {r.name}, {r.store}, {r.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
