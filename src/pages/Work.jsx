import { Link } from 'react-router-dom'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { breadcrumbs } from '../lib/schema'
import { CASE_STUDIES } from '../data/caseStudies'
import Footer from '../components/Footer'
import { A } from '../lib/assets'
import styles from './Blog.module.css'

const TITLE = 'Our Work — Client Case Studies | Newral, Noida'
const DESCRIPTION =
  'Case studies from Newral, a Noida product design & development agency: Competishun, FIZZ, Bansal Classes, OTT Bharat and NEET Kaka JEE — platform scaling, DevOps and app development.'

export default function Work() {
  useSeo({
    title: TITLE,
    description: DESCRIPTION,
    path: '/work',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Newral case studies',
        url: `${SITE_URL}/work`,
        description: DESCRIPTION,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: CASE_STUDIES.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/work/${c.slug}`,
            name: c.title,
          })),
        },
      },
      breadcrumbs([['Home', '/'], ['Work', '/work']]),
    ],
  })

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="reveal">
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Client stories
            </p>
            <h1 className={styles.heroHeading}>
              Our
              <br />
              <em>Work.</em>
            </h1>
            <p className={styles.heroSub}>
              How Newral helps founders and growing businesses design, build, scale and run their products —
              from EdTech platforms serving thousands of students to venture-backed consumer apps.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {CASE_STUDIES.map((c, i) => (
              <Link
                to={`/work/${c.slug}`}
                key={c.slug}
                className={`${styles.card} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
                aria-label={c.title}
              >
                <p className={styles.cardCategory}>{c.industry}</p>
                <h2 className={styles.cardTitle}>{c.title}</h2>
                <p className={styles.cardExcerpt}>{c.summary}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardRead}>{c.services.join(' · ')}</span>
                  </div>
                  <span className={styles.cardArrow} aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={`${styles.ctaHeading} reveal`}>Let’s build yours next</h2>
        <p className={`${styles.ctaSub} reveal`}>
          Tell us about your product — we reply with a scope and fixed-fee proposal.
        </p>
        <Link to="/contact" className="btn-dark btn-lg reveal">
          Book a Free Call
          <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
        </Link>
      </section>

      <Footer />
    </>
  )
}
