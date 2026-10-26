import { WHATS_NEW } from '../data/content'
import { CheckIcon } from './Icons'

export function WhatsNew() {
  return (
    <section className="section" aria-labelledby="new-title">
      <div className="wrap new">
        <div>
          <h2 id="new-title">What&rsquo;s new in the latest update</h2>
          <p className="section-lede">Updated on Google Play on October 14, 2026.</p>
        </div>
        <ul className="ticks">
          {WHATS_NEW.map((item) => (
            <li key={item}>
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
