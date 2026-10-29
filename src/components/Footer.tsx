import { APP } from '../data/app'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <Logo />
          <p className="footer__blurb">
            You deserve only the best in life. Three Best Rated&reg; was created with a simple goal: to find you the top 3
            local businesses, professionals, restaurants and healthcare providers in any city. Our employees handpick top
            local businesses in {APP.countries.join(', ')}.
          </p>        </div>
        <nav aria-label="Footer">
          <ul>
            <li><a href={APP.website}>ThreeBestRated website</a></li>
            <li><a href={APP.privacyUrl}>Privacy policy</a></li>
            <li><a href={`mailto:${APP.supportEmail}`}>{APP.supportEmail}</a></li>
            <li><a href={`tel:${APP.phone.replace(/[^+\d]/g, '')}`}>{APP.phone}</a></li>
            <li><a href={APP.termsUrl}>Terms</a></li>
            <li><a href={`mailto:${APP.pressEmail}`}>Press: {APP.pressEmail}</a></li>
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
          &copy; {APP.since}&ndash;{new Date().getFullYear()}, U.S. Three Best Rated&reg;, All Rights Reserved. Google Play
        </p>
      </div>
    </footer>
  )
}
