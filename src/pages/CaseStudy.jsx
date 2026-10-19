import { useParams, Link } from 'react-router-dom'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { ORG_ID } from '../lib/site'
import { breadcrumbs } from '../lib/schema'
import { getCaseStudy, CASE_STUDIES } from '../data/caseStudies'
import Footer from '../components/Footer'
import NotFound from './NotFound'
import { A } from '../lib/assets'
import styles from './BlogPost.module.css'
import cs from './CaseStudy.module.css'

function caseStudyJsonLd(c) {
  const url = `${SITE_URL}/work/${c.slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: c.title,
      description: c.metaDescription,
      url,
      inLanguage: 'en-IN',
      articleSection: 'Case study',
      image: `${SITE_URL}/og-cover.jpg`,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      about: { '@type': 'Organization', name: c.client },
      mentions: c.sources.map((s) => ({ '@type': 'WebPage', name: s.label, url: s.url })),
      review: {
        '@type': 'Review',
        itemReviewed: { '@id': ORG_ID },
        author: { '@type': 'Person', name: c.quote.name, jobTitle: c.quote.role },
        reviewBody: c.quote.text,
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    breadcrumbs([['Home', '/'], ['Work', '/work'], [c.client, `/work/${c.slug}`]]),
  ]
}

export default function CaseStudy() {
  const { slug } = useParams()
  const c = getCaseStudy(slug)

  useSeo(
    c
      ? { title: c.metaTitle, description: c.metaDescription, path: `/work/${c.slug}`, ogType: 'article', jsonLd: caseStudyJsonLd(c) }
      : { title: '404 — Page Not Found | Newral', description: '', path: `/work/${slug}`, noindex: true }
  )

  if (!c) return <NotFound />

  const others = CASE_STUDIES.filter((o) => o.slug !== c.slug).slice(0, 2)

  return (
    <>
      <div className={styles.topZone}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <Link to="/work">Work</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
            <span className={styles.breadcrumbCurrent}>{c.client}</span>
          </nav>

          <header className={`${styles.header} reveal`}>
            <div className={styles.headerMeta}>
              <span className={styles.headerCategory}>Case study</span>
              <span className={styles.headerDot} aria-hidden="true" />
              <span className={styles.headerRead}>{c.industry}</span>
            </div>
            <h1 className={styles.headerTitle}>{c.title}</h1>
            <p className={styles.headerExcerpt}>{c.summary}</p>
          </header>
        </div>
      </div>

      <section className={styles.body}>
        <div className="container">
          <article className={styles.bodyInner}>
            <img className={cs.logo} src={c.logo} alt={`${c.client} logo`} loading="lazy" />

            <dl className={cs.facts}>
              <div>
                <dt className={cs.factLabel}>Client</dt>
                <dd className={cs.factValue} style={{ margin: 0 }}>{c.client}</dd>
              </div>
              <div>
                <dt className={cs.factLabel}>Industry</dt>
                <dd className={cs.factValue} style={{ margin: 0 }}>{c.industry}</dd>
              </div>
              <div>
                <dt className={cs.factLabel}>Location</dt>
                <dd className={cs.factValue} style={{ margin: 0 }}>{c.location}</dd>
              </div>
              <div>
                <dt className={cs.factLabel}>Services</dt>
                <dd className={cs.factValue} style={{ margin: 0 }}>
                  {c.services.map((s, i) => (
                    <span key={s}>
                      <Link to={c.serviceLinks[i]}>{s}</Link>
                      {i < c.services.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <h2 className={styles.h2}>About {c.client}</h2>
            <p className={styles.p}>{c.about}</p>

            <h2 className={styles.h2}>The challenge</h2>
            {c.challenge.map((t) => <p key={t} className={styles.p}>{t}</p>)}

            <h2 className={styles.h2}>What Newral did</h2>
            {c.solution.map((t) => <p key={t} className={styles.p}>{t}</p>)}

            <h2 className={styles.h2}>Results</h2>
            <ul className={cs.list}>
              {c.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>

            <figure className={cs.quote}>
              <blockquote className={cs.quoteText}>“{c.quote.text}”</blockquote>
              <figcaption className={cs.quoteAuthor}>
                <strong>{c.quote.name}</strong> — {c.quote.role}
              </figcaption>
            </figure>

            <div className={cs.sources}>
              Public information about {c.client} referenced on this page:
              <ul>
                {c.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.related}>
        <div className="container">
          <h2 className={`${styles.relatedHeading} reveal`}>More client stories</h2>
          <div className={styles.relatedGrid}>
            {others.map((o, i) => (
              <Link
                to={`/work/${o.slug}`}
                key={o.slug}
                className={`${styles.card} reveal`}
                style={{ transitionDelay: `${i * 80}ms` }}
                aria-label={o.title}
              >
                <p className={styles.cardCategory}>{o.industry}</p>
                <h3 className={styles.cardTitle}>{o.title}</h3>
                <p className={styles.cardExcerpt}>{o.summary}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardRead}>{o.services.join(' · ')}</span>
                  </div>
                  <span className={styles.cardArrow} aria-hidden="true">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={`${styles.ctaHeading} reveal`}>Want results like these?</h2>
        <p className={`${styles.ctaSub} reveal`}>
          Newral is a product design and development agency in Sector 62, Noida — UI/UX, web and app development,
          SaaS, AI automation and DevOps.
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
