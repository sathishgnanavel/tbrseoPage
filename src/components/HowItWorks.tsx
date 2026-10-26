import { APP } from '../data/app'
import { STEPS } from '../data/content'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="wrap how">
        <div className="how__intro">
          <h2 id="how-title">Find a local expert in three steps</h2>
          <p>
            Searching for &ldquo;best services near me&rdquo; returns thousands of results. ThreeBestRated returns three,
            and each one has been checked against ten areas of the inspection, including{' '}
            {APP.inspectionAreas.slice(0, 5).join(', ').toLowerCase()} and more.
          </p>
          <ul className="tags" aria-label="Areas covered by the 50-point inspection">
            {APP.inspectionAreas.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="steps__n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
