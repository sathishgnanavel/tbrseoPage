import { APP } from '../data/app'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Logo />
          <p className="footer__blurb">Three selected local businesses and professionals near you across {APP.stats.countries} countries.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            <li><a href={APP.website}>ThreeBestRated website</a></li>
            <li><a href={APP.privacyUrl}>Privacy policy</a></li>
            <li><a href={`mailto:${APP.supportEmail}`}>{APP.supportEmail}</a></li>
            <li><a href={`tel:${APP.phone.replace(/[^+\d]/g, '')}`}>{APP.phone}</a></li>
          </ul>
        </nav>
        <address>
          {APP.developer}
          <br />
          {APP.address}
        </address>
      </div>
      <div className="wrap footer__legal">
        <p>
          &copy; {new Date().getFullYear()} Three Best Rated&reg;. Google Play and the Google Play logo are trademarks of Google LLC. Apple and
          the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries.
        </p>
      </div>
    </footer>
  )
}
