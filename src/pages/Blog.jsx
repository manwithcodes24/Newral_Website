import { Link } from 'react-router-dom'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { ORG_ID } from '../lib/site'
import { breadcrumbs } from '../lib/schema'
import { BLOG_POSTS } from '../data/blog'
import Footer from '../components/Footer'
import { A } from '../lib/assets'
import styles from './Blog.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Blog() {
  useSeo({
    title: 'Blog — UI/UX Design & Dev Insights | Newral Noida',
    description:
      'Expert articles on UI/UX design, app development, web development and design systems from Newral — a design and tech agency based in Noida, Delhi NCR.',
    path: '/blog',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'Newral Blog',
        url: `${SITE_URL}/blog`,
        inLanguage: 'en-IN',
        description:
          'Expert articles on UI/UX design, app development and web development from Newral, Noida.',
        publisher: { '@id': ORG_ID },
        blogPost: BLOG_POSTS.map(p => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
          dateModified: p.updated || p.date,
          description: p.excerpt,
        })),
      },
      breadcrumbs([['Home', '/'], ['Blog', '/blog']]),
    ],
  })

  // App.jsx handles all .reveal elements globally — no local observer needed.

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className="container">
          <div className="reveal">
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              From the desk of Newral
            </p>
            <h1 className={styles.heroHeading}>
              Design &amp; Dev
              <br />
              <em>Insights.</em>
            </h1>
            <p className={styles.heroSub}>
              Practical articles on UI/UX design, app development, web development and design
              systems — written by the Newral team in Noida.
            </p>
          </div>
        </div>
      </section>

      {/* ── Post Grid ── */}
      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.grid}>
            {BLOG_POSTS.map((post, i) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className={`${styles.card} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
                aria-label={post.title}
              >
                <p className={styles.cardCategory}>{post.category}</p>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>{formatDate(post.date)}</span>
                    <span className={styles.cardRead}>{post.readTime}</span>
                  </div>
                  <span className={styles.cardArrow} aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={`${styles.ctaHeading} reveal`}>
          Ready to work with us?
        </h2>
        <p className={`${styles.ctaSub} reveal`}>
          We're a design and tech agency in Noida, Sector 62. Let's talk about your product.
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
