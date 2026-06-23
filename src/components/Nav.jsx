import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTransitionNavigate } from '../context/TransitionContext'
import { A } from '../lib/assets'
import styles from './Nav.module.css'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useTransitionNavigate()

  const handleLinkClick = (e, href) => {
    const isAnchor = href.includes('#')
    if (!isAnchor) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <>
      <div className={styles.wrap}>
        <nav className={styles.nav}>
          <Link to="/" onClick={(e) => handleLinkClick(e, '/')}>
            <img className={styles.logo} src={A.logo} alt="Newral" width="70" height="35" />
          </Link>
          <div className={styles.links}>
            {links.map((l) => {
              const isActive = location.pathname === l.href || (location.pathname === '/' && l.href === '/')
              return (
                <Link 
                  key={l.label} 
                  to={l.href} 
                  className={isActive ? styles.active : ''}
                  onClick={(e) => handleLinkClick(e, l.href)}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
          <a
            className={`btn-dark btn-sm ${styles.cta}`}
            href="https://cal.com/newralfounder"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
            <span className="arrow-circle"><img src={A.arrowSm} alt="" /></span>
          </a>
          <button className={styles.burger} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <img src={A.menuIcon} alt="" width="24" height="24" />
          </button>
        </nav>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {links.map(l => (
            <Link 
              key={l.label} 
              to={l.href} 
              onClick={(e) => {
                setOpen(false)
                handleLinkClick(e, l.href)
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
