import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { TextAnimate } from '../components/TextAnimate'
import FadeText from '../components/FadeText'
import Logos from '../components/Logos'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'
import { A } from '../lib/assets'
import styles from './ServicesHub.module.css'

export default function ServicesHub() {
  useSeo({
    title: 'Services — UI/UX, Graphic Design, App & Web Development, DevOps | Newral',
    description:
      'Newral is a Noida, Delhi NCR tech agency. Explore our services: UI/UX design, graphic design, app development, web development and DevOps for startups and businesses.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/${s.slug}`,
        name: s.h1,
      })),
    },
  })

  return (
    <>
      <section className={styles.hero}>
        <img className={styles.bg} src="/assets/services_hero_bg.webp" alt="" />
        <div className={styles.heroGridBg} />
        
        <div className="container">
          <div className={styles.heroContent}>
            <span className={`${styles.eyebrow} reveal`}>
              <span className={styles.dot} aria-hidden="true" />
              Services · Noida, Delhi NCR
            </span>
            <h1 className={`${styles.h1} reveal`}>
              <span className={styles.display}>UI/UX Design, App &amp; Web Development</span>
            </h1>
            <FadeText
              as="p"
              className={styles.intro}
              text="From product design to development and DevOps, Newral is a Noida-based agency that helps startups and growing businesses across Delhi NCR ship better products, faster."
            />
            
            <div className={`${styles.ctaRow} reveal`}>
              <button className="btn-dark btn-lg">
                Check the services
                <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
              </button>
              <button className="btn-whatsapp">
                <img src={A.whatsapp} alt="" />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <Logos />

      {/* Development Bento Grid */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Development</h2>
            <p className={styles.sectionDesc}>
              Most partners slow teams down with handoffs and delays. We work as an extension of your team, combining strategy, design, and development support to help you move faster.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Tall Card 1: Full-Stack Web Apps */}
            <Link to="/web-development-noida" className={`${styles.card} ${styles.tallCard} ${styles.card1} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_web.webp" alt="Full Stack Development Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 01 }`}</span>
                <h3 className={styles.cardTitle}>Full Stack Development</h3>
                <p className={styles.cardDesc}>
                  Robust, scalable, and responsive web applications optimized for speed, security, and search engine visibility.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Custom Web Apps & SaaS</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Corporate Websites</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Headless CMS Implementations</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> E-commerce Platforms</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 2: Mobile Apps */}
            <Link to="/app-development-noida" className={`${styles.card} ${styles.smallCard} ${styles.card2} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 02 }`}</span>
                <h3 className={styles.cardTitle}>Mobile Apps</h3>
                <p className={styles.cardDesc}>
                  High-performance iOS and Android apps built with React Native and Flutter. Native-quality feel and App Store ready.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> iOS & Android Apps</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> React Native & Flutter</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> App Store & Play Store Submissions</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 3: Custom SaaS & APIs */}
            <Link to="/web-development-noida" className={`${styles.card} ${styles.smallCard} ${styles.card3} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 04 }`}</span>
                <h3 className={styles.cardTitle}>Custom SaaS & APIs</h3>
                <p className={styles.cardDesc}>
                  Secure backend architectures, database design, and third-party API integrations that scale with your user base.
                </p>
              </div>
            </Link>

            {/* Tall Card 4: E-Commerce */}
            <Link to="/web-development-noida" className={`${styles.card} ${styles.tallCard} ${styles.card4} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_saas.webp" alt="E-Commerce Development Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 03 }`}</span>
                <h3 className={styles.cardTitle}>E-Commerce Platforms</h3>
                <p className={styles.cardDesc}>
                  Secure, highly scalable online stores built on Shopify, WooCommerce, or custom tech stacks optimized for conversion.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Custom Shopify & WooCommerce</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Headless E-commerce</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Payment Gateway Integrations</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> ERP & CRM Sync</li>
                </ul>
              </div>
            </Link>
          </div>

          <div className={styles.bottomCtaWrapper}>
            <Link to="/web-development-noida" className="btn-dark btn-lg">
              Check the services
              <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Design Bento Grid */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Design</h2>
            <p className={styles.sectionDesc}>
              Most partners slow teams down with handoffs and delays. We work as an extension of your team, combining strategy, design, and development support to help you move faster.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Tall Card 1: UI/UX Design */}
            <Link to="/ui-ux-design-noida" className={`${styles.card} ${styles.tallCard} ${styles.card1} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_uiux.webp" alt="UI/UX Design Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 01 }`}</span>
                <h3 className={styles.cardTitle}>UI/UX Design</h3>
                <p className={styles.cardDesc}>
                  Intuitive, clean, and user-centric interfaces for websites, SaaS products, and mobile apps grounded in research.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> UX Research & Personas</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> High-Fidelity Wireframes</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> SaaS & Dashboard Interfaces</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Interactive Prototypes</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 2: Branding */}
            <Link to="/graphic-design-noida" className={`${styles.card} ${styles.smallCard} ${styles.card2} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 02 }`}</span>
                <h3 className={styles.cardTitle}>Branding & Identity</h3>
                <p className={styles.cardDesc}>
                  Distinctive logos, cohesive color palettes, professional typography systems, and style guidelines that build instant brand trust.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Custom Logo Systems</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Complete Visual Identity Guides</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Social & Marketing Creatives</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 3: Interaction Design */}
            <Link to="/ui-ux-design-noida" className={`${styles.card} ${styles.smallCard} ${styles.card3} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 04 }`}</span>
                <h3 className={styles.cardTitle}>Interaction Design</h3>
                <p className={styles.cardDesc}>
                  Seamless animations and transitions that map out effortless user journeys and validate product logic.
                </p>
              </div>
            </Link>

            {/* Tall Card 4: Design Systems */}
            <Link to="/ui-ux-design-noida" className={`${styles.card} ${styles.tallCard} ${styles.card4} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_ds.webp" alt="Design Systems Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 03 }`}</span>
                <h3 className={styles.cardTitle}>Design Systems</h3>
                <p className={styles.cardDesc}>
                  Comprehensive component libraries (Figma & code) that streamline designer-developer collaboration and ensure visual consistency.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Figma Component Libraries</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Developer-Ready Design Tokens</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Iconography & Asset Libraries</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Reusable Code Components</li>
                </ul>
              </div>
            </Link>
          </div>


          <div className={styles.bottomCtaWrapper}>
            <Link to="/ui-ux-design-noida" className="btn-dark btn-lg">
              Check the services
              <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* DevOps Bento Grid */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>DevOps & Cloud</h2>
            <p className={styles.sectionDesc}>
              We engineer 99.99% uptime and continuously optimize your cloud spend. Deploy infrastructure as code, build automated CI/CD pipelines, and monitor production in real time.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Tall Card 1: CI/CD Pipeline Setup */}
            <Link to="/devops-noida" className={`${styles.card} ${styles.tallCard} ${styles.card1} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_devops.webp" alt="CI/CD Pipeline Setup Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 01 }`}</span>
                <h3 className={styles.cardTitle}>CI/CD Pipeline Setup</h3>
                <p className={styles.cardDesc}>
                  Fully automated build, test, and deploy pipelines that let you ship code with confidence multiple times a day.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> GitHub Actions & GitLab CI</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Automated Rollbacks</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Zero-Downtime Deployments</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Branch Protection Rules</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 2: Cloud Infrastructure */}
            <Link to="/devops-noida" className={`${styles.card} ${styles.smallCard} ${styles.card2} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 02 }`}</span>
                <h3 className={styles.cardTitle}>Cloud Infrastructure</h3>
                <p className={styles.cardDesc}>
                  Scalable, highly available environments built with Terraform infrastructure as code on AWS, GCP, or Azure.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> AWS, GCP & Azure</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Terraform & Pulumi</li>
                </ul>
              </div>
            </Link>

            {/* Small Card 3: Cloud Cost Optimisation */}
            <Link to="/devops-noida" className={`${styles.card} ${styles.smallCard} ${styles.card3} reveal`}>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 04 }`}</span>
                <h3 className={styles.cardTitle}>Cloud Cost Optimisation</h3>
                <p className={styles.cardDesc}>
                  Rightsize compute, eliminate idle resources, and implement spot instance strategies to cut cloud spend by up to 50%.
                </p>
              </div>
            </Link>

            {/* Tall Card 4: Monitoring & Security */}
            <Link to="/devops-noida" className={`${styles.card} ${styles.tallCard} ${styles.card4} reveal`}>
              <div className={styles.cardVisual}>
                <img className={styles.cardVisualImg} src="/assets/services_bento_saas.webp" alt="Monitoring & Security Illustration" />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardMeta}>{`{ 03 }`}</span>
                <h3 className={styles.cardTitle}>Monitoring & Security</h3>
                <p className={styles.cardDesc}>
                  End-to-end observability and security hardening so your team knows about issues before your users do.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Datadog, Grafana & ELK</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Custom Dashboards & Alerts</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> SOC 2 & ISO 27001 Compliance</li>
                  <li className={styles.bulletItem}><span className={styles.bulletDot} /> Secrets Management (Vault)</li>
                </ul>
              </div>
            </Link>
          </div>

          <div className={styles.bottomCtaWrapper}>
            <Link to="/devops-noida" className="btn-dark btn-lg">
              Check the services
              <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
            </Link>
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </>
  )
}
