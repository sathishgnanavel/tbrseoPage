import { NAV } from '../data/content'
import { useAppStore } from '../store'
import { selectPrimaryStore } from '../store/selectors'
import { STORES } from '../data/app'
import { MenuIcon, CloseIcon } from './Icons'
import { Logo } from './Logo'

export function Header() {
  const menuOpen = useAppStore((s) => s.menuOpen)
  const toggleMenu = useAppStore((s) => s.toggleMenu)
  const closeMenu = useAppStore((s) => s.closeMenu)
  const primary = useAppStore(selectPrimaryStore)
  const trackDownload = useAppStore((s) => s.trackDownload)

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Logo />
        <nav id="site-nav" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={closeMenu}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="btn btn--gold site-header__cta"
          href={STORES[primary].url}
          target="_blank"
          rel="noopener"
          onClick={() => trackDownload(primary, 'header')}
        >
          Download the app
        </a>
        <button
          className="icon-btn site-header__menu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
