import { A } from '../lib/assets'
import styles from './AboutFooter.module.css'

export default function AboutFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topRow}>
          {/* Column 1: Info */}
          <div className={styles.colInfo}>
            <img src={A.footerLogo} alt="Newral" className={styles.logo} />
            <p className={styles.address}>
              412, 4th Floor, Tower-B, i-thum Building, Sector 62 (Near Electronic City Metro Station), Noida, Uttar Pradesh, India
            </p>
            <div className={styles.contactInfo}>
              <p>Contact us</p>
              <p>+91 700422422</p>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className={styles.colNav}>
            <h4>Navigation</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Clients</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className={styles.colNav}>
            <h4>Services</h4>
            <ul>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Projects</a></li>
              <li><a href="#">Clients</a></li>
            </ul>
          </div>

          {/* Column 4: Products */}
          <div className={styles.colNav}>
            <h4>Products</h4>
            <ul>
              <li><a href="#">LMS</a></li>
              <li><a href="#">OMS</a></li>
              <li><a href="#">HRMS</a></li>
              <li><a href="#">Lead Management</a></li>
              <li><a href="#">University Management</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Right */}
          <div className={styles.colContact}>
            <div className={styles.touch}>
              <h4>- Let's get in touch</h4>
              <a href="mailto:tech@newral.in" className={styles.email}>tech@newral.in</a>
            </div>
            <div className={styles.socials}>
              <span>Follow us</span>
              <div className={styles.icons}>
                <a href="https://www.instagram.com/newralofficial" target="_blank" rel="noopener noreferrer"><img src={A.instagram} alt="Instagram" /></a>
                <a href="https://www.linkedin.com/company/newraloffical/" target="_blank" rel="noopener noreferrer"><img src={A.linkedin} alt="LinkedIn" /></a>
                <a href="https://dribbble.com/newral" target="_blank" rel="noopener noreferrer"><img src={A.dribbble} alt="Dribbble" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.watermarkContainer}>
        <div className={styles.watermark}>Newral</div>
      </div>
    </footer>
  )
}
