import { FEATURES } from '../data/content'

export function Features() {
  return (
    <section id="features" className="section section--tint" aria-labelledby="features-title">
      <div className="wrap">
        <h2 id="features-title">Why people choose the ThreeBestRated app</h2>
        <ul className="feature-list">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
