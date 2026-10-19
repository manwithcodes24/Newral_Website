import { Link } from 'react-router-dom'
import { A } from '../lib/assets'
import styles from './Footer.module.css'
import { useReveal } from '../hooks/useReveal'
import { SOCIAL } from '../lib/site'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
const SERVICES = [
  { label: 'UI/UX Design', href: '/ui-ux-design-noida' },
  { label: 'Graphic Design', href: '/graphic-design-noida' },
  { label: 'App Development', href: '/app-development-noida' },
  { label: 'Web Development', href: '/web-development-noida' },
  { label: 'DevOps', href: '/devops-noida' },
  { label: 'SaaS Development', href: '/saas-development-noida' },
  { label: 'AI Automation', href: '/ai-automation-noida' },
  { label: 'Custom Software & MVP', href: '/custom-software-development-noida' },
]

export default function Footer() {
  const r1 = useReveal()
  const r2 = useReveal()
  const r3 = useReveal()
  const r4 = useReveal()

  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <p className={styles.watermark}>Newral</p>
        <div className={styles.cols}>

          <div ref={r1} className={`${styles.col} ${styles.brand} reveal`}>
            <img className={styles.logo} src={A.footerLogo} alt="Newral" />
            <div className={styles.contact}>
              <p>HQ Office Address ↓ </p>
            </div>
            <p className={styles.addr}>
              412, 4th Floor, Tower-B, i-thum Building, Sector 62
              (Near Electronic City Metro Station), Noida, Uttar Pradesh 201309, India
            </p>
            <div className={styles.contact}>
              <p>Representative Office Address ↓ </p>
            </div>
            <p className={styles.addr}>
              2333 Matthews Ave, Bronx, NY 10467
            </p>
            <div className={styles.contact}>
              <p>Contact us</p>
              <p><a href="tel:+918826574478" style={{ color: 'inherit', textDecoration: 'none' }}>+91 8826574478</a></p>
            </div>
          </div>

          <div ref={r2} className={`${styles.col} reveal d1`}>
            <h3>Navigation</h3>
            <ul>{NAV.map(n => <li key={n.label}><Link to={n.href}>{n.label}</Link></li>)}</ul>
          </div>

          <div ref={r3} className={`${styles.col} reveal d2`}>
            <h3>Products</h3>
            <ul>
              <li>
                <a href="https://synappses.in" target="_blank" rel="noopener noreferrer">LMS</a>
              </li>
            </ul>
          </div>

          <div ref={r4} className={`${styles.col} reveal d3`}>
            <h3>Services</h3>
            <ul>{SERVICES.map(s => <li key={s.label}><Link to={s.href}>{s.label}</Link></li>)}</ul>
          </div>

          <div className={`${styles.col} ${styles.touch} reveal d3`}>
            <div>
              <p className={styles.touchLabel}>- Let's get in touch</p>
              <p className={styles.email}><a href="mailto:tech@newral.in" style={{ color: 'inherit', textDecoration: 'none' }}>tech@newral.in</a></p>
            </div>
            <div className={styles.socialRow}>
              <p className={styles.follow}>Follow us</p>
              <div className={styles.social}>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"><img src={A.instagram} alt="Newral on Instagram" /></a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer"><img src={A.linkedin} alt="Newral on LinkedIn" /></a>
                <a href={SOCIAL.dribbble} target="_blank" rel="noopener noreferrer"><img src={A.dribbble} alt="Newral on Dribbble" /></a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
