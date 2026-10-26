import { FAQS } from '../data/content'
import { useAppStore } from '../store'
import { ChevronIcon } from './Icons'

export function Faq() {
  const openId = useAppStore((s) => s.openFaqId)
  const toggle = useAppStore((s) => s.toggleFaq)

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="wrap faq">
        <h2 id="faq-title">Questions about the ThreeBestRated app</h2>
        <div className="faq__list">
          {FAQS.map((f) => {
            const open = openId === f.id
            return (
              <div className={`faq__item${open ? ' is-open' : ''}`} key={f.id}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${f.id}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${f.id}`}
                    onClick={() => toggle(f.id)}
                  >
                    <span>{f.q}</span>
                    <ChevronIcon />
                  </button>
                </h3>
                {/* Answers stay in the DOM when collapsed so crawlers always read them. */}
                <div className="faq__a" id={`faq-a-${f.id}`} role="region" aria-labelledby={`faq-q-${f.id}`}>
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
