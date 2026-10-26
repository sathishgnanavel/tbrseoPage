import { PODIUM_SIZES, SCREENSHOT_SETS } from '../data/app'
import { ScreenImage } from './ScreenImage'

const phone = SCREENSHOT_SETS.phone
const byN = (n: number) => phone.find((s) => s.n === n)!

/**
 * Three real app screens on a podium, laid out like the logo: silver on the left, gold in the middle, bronze on
 * the right. On load they rise in the order 3, 2, 1. This is the one animated moment in the hero.
 */
const PLACES = [
  { rank: 2, shot: byN(3), tone: 'silver' },
  { rank: 1, shot: byN(2), tone: 'gold' },
  { rank: 3, shot: byN(1), tone: 'bronze' },
] as const

export function Podium() {
  return (
    <div className="stage">
      <ul className="podium" aria-label="Three screens from the ThreeBestRated app">
        {PLACES.map((p) => (
          <li key={p.rank} className={`podium__item podium__item--${p.rank}`}>
            <div className="podium__shot">
              <ScreenImage set="phone" shot={p.shot} sizes={PODIUM_SIZES} priority={p.rank === 1} eager />
            </div>
            <span className={`podium__step podium__step--${p.tone}`} aria-hidden="true">
              {p.rank}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
