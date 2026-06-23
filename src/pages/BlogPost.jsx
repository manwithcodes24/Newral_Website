import { useParams, Link, Navigate } from 'react-router-dom'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { getBlogPost, BLOG_POSTS } from '../data/blog'
import Footer from '../components/Footer'
import { A } from '../lib/assets'
import styles from './BlogPost.module.css'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatDateShort(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Render one content block
function Block({ block }) {
  switch (block.type) {
    case 'intro':
      return <p className={styles.intro}>{block.text}</p>
    case 'h2':
      return <h2 className={styles.h2}>{block.text}</h2>
    case 'p':
      return <p className={styles.p}>{block.text}</p>
    case 'cta':
      return (
        <div className={styles.ctaBlock}>
          <Link to={block.href} className="btn-dark btn-sm">
            {block.text}
            <span className="arrow-circle"><img src={A.arrowSm} alt="" /></span>
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)

  useSeo(
    post
      ? {
          title: post.metaTitle,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.metaDescription,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: post.date,
            dateModified: post.date,
            image: `${SITE_URL}/og-cover.jpg`,
            author: {
              '@type': 'Organization',
              name: 'Newral',
              url: SITE_URL,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Newral',
              '@id': `${SITE_URL}/#organization`,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/og-cover.jpg`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${SITE_URL}/blog/${post.slug}`,
            },
          },
        }
      : { title: 'Post Not Found | Newral', description: '', path: `/blog/${slug}` }
  )

  if (!post) return <Navigate to="/blog" replace />

  // App.jsx handles .reveal globally — no local observer needed.

  // Related posts: same category, excluding current (max 2)
  const related = BLOG_POSTS.filter(
    p => p.slug !== post.slug && p.categorySlug === post.categorySlug
  ).slice(0, 2)

  return (
    <>
      {/* ── Top zone: breadcrumb + header share one full-width bg ── */}
      <div className={styles.topZone}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <Link to="/blog">Blog</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>{post.category}</span>
          </nav>

          <header className={`${styles.header} reveal`}>
            <div className={styles.headerMeta}>
              <span className={styles.headerCategory}>{post.category}</span>
              <span className={styles.headerDot} aria-hidden="true" />
              <time className={styles.headerDate} dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <span className={styles.headerDot} aria-hidden="true" />
              <span className={styles.headerRead}>{post.readTime}</span>
            </div>
            <h1 className={styles.headerTitle}>{post.title}</h1>
            <p className={styles.headerExcerpt}>{post.excerpt}</p>
          </header>
        </div>
      </div>

      {/* ── Article Body ── */}
      <section className={styles.body}>
        <div className="container">
          <div className={styles.bodyInner}>
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Posts ── */}
      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <h2 className={`${styles.relatedHeading} reveal`}>More from the blog</h2>
            <div className={styles.relatedGrid}>
              {related.map((p, i) => (
                <Link
                  to={`/blog/${p.slug}`}
                  key={p.slug}
                  className={`${styles.card} reveal`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  aria-label={p.title}
                >
                  <p className={styles.cardCategory}>{p.category}</p>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardExcerpt}>{p.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{formatDateShort(p.date)}</span>
                      <span className={styles.cardRead}>{p.readTime}</span>
                    </div>
                    <span className={styles.cardArrow} aria-hidden="true">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <h2 className={`${styles.ctaHeading} reveal`}>
          Ready to work with Newral?
        </h2>
        <p className={`${styles.ctaSub} reveal`}>
          We're a design and tech agency in Noida, Sector 62 — UI/UX design, app development,
          web development and DevOps.
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
