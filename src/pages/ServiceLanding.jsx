// Generic, data-driven service landing page (used for services in data/moreServices.js).
// Visual language matches the bespoke service pages via ServicePage.module.css.
import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { A } from '../lib/assets'
import { getService, SERVICES } from '../data/services'
import { useSeo } from '../hooks/useSeo'
import { serviceJsonLd } from '../lib/schema'
import { WHATSAPP_URL, BUSINESS } from '../lib/site'
import { TextAnimate } from '../components/TextAnimate'
import FadeText from '../components/FadeText'
import Logos from '../components/Logos'
import Testimonial from '../components/Testimonial'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'
import NotFound from './NotFound'
import styles from './ServicePage.module.css'

function HighlightsCard({ service }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--surface, #fff)',
        border: '1px solid var(--border-default)',
        borderRadius: 24,
        padding: 'clamp(24px, 3vw, 36px)',
        boxShadow: '0 24px 60px -24px rgba(15, 23, 42, 0.18)',
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: service.color, marginBottom: 20 }}>
        What we deliver
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {service.highlights.map((h) => (
          <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 'var(--body-md)', color: 'var(--text-primary)' }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: service.color, flexShrink: 0 }} />
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProcessSection({ processSteps, serviceColor, processHeading }) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className={styles.processSection}>
      <div className="container">
        <div className={styles.processContainer}>
          <div className={styles.processStickyLeft}>
            <span className={styles.processEyebrow} style={{ color: serviceColor }}>Our Workflow</span>
            <h2 className={styles.processHeading}>
              Our comprehensive <br />
              <span className="serif">{processHeading}</span>
            </h2>

            <div className={styles.stepCounterWrapper}>
              <div className={styles.stepCounterCurrent}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeStep}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.stepCounterNum}
                    style={{ color: serviceColor }}
                  >
                    {`0${activeStep + 1}`}
                  </motion.span>
                </AnimatePresence>
                <span className={styles.stepCounterTotal}>{` / 0${processSteps.length}`}</span>
              </div>

              <div className={styles.processTimeline}>
                <div className={styles.processTimelineBg} />
                <motion.div
                  className={styles.processTimelineFill}
                  style={{ background: serviceColor }}
                  animate={{ height: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className={styles.activeStepTitle} style={{ color: serviceColor }}>
              {processSteps[activeStep].title}
            </div>
          </div>

          <div className={styles.processScrollRight}>
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                className={styles.processStepCard}
                onViewportEnter={() => setActiveStep(idx)}
                viewport={{ amount: 0.6, margin: '-10% 0px -20% 0px' }}
              >
                <div
                  className={styles.stepCardContent}
                  style={{
                    borderLeftColor: activeStep === idx ? serviceColor : 'var(--border-default)',
                    opacity: activeStep === idx ? 1 : 0.4,
                    transition: 'border-color 0.4s, opacity 0.4s',
                  }}
                >
                  <span className={styles.stepCardIndex}>{`Step 0${idx + 1}`}</span>
                  <h3 className={styles.stepCardTitle}>{step.title}</h3>
                  <p className={styles.stepCardDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection({ faqs, serviceColor }) {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <section className={`${styles.block} ${styles.blockAlt}`}>
      <div className="container">
        <h2 className={`section-heading ${styles.left} reveal`}>
          Frequently asked <span className="serif">questions</span>
        </h2>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => {
            const open = openFaq === i
            return (
              <div key={faq.q} className={`${styles.faq} ${open ? styles.faqOpen : ''} reveal`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                  <span style={{ color: open ? 'var(--text-primary)' : 'inherit', transition: 'color 0.3s' }}>{faq.q}</span>
                  <motion.span
                    className={styles.faqIcon}
                    animate={{ rotate: open ? 45 : 0 }}
                    style={{ color: open ? serviceColor : 'var(--text-secondary)' }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                {/* Answer stays in the DOM when collapsed so crawlers / AI engines can read every FAQ */}
                <motion.div
                  initial={false}
                  animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={styles.faqA}>{faq.a}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ServiceLanding() {
  const { pathname } = useLocation()
  const service = getService(pathname.replace(/^\/+|\/+$/g, ''))

  useSeo(
    service
      ? { title: service.metaTitle, description: service.metaDescription, path: `/${service.slug}`, jsonLd: serviceJsonLd(service) }
      : { title: '404 — Page Not Found | Newral', description: '', path: pathname, noindex: true }
  )

  if (!service) return <NotFound />

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGridBg} />

        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroContentLeft}>
              <span className={`${styles.eyebrow} reveal`}>
                <span className={styles.dot} style={{ background: service.color }} aria-hidden="true" />
                {service.eyebrow}
              </span>

              <h1 className={styles.h1}>
                <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
                  {service.h1}
                </TextAnimate>{' '}
                <TextAnimate as="span" className="serif" animation="blurIn" by="word" once duration={0.5} delay={0.4} style={{ color: service.color }}>
                  {service.h1Serif}
                </TextAnimate>
              </h1>

              <FadeText as="p" className={styles.intro} text={service.intro} />

              <div className={`${styles.ctaRow} reveal`}>
                <a href={BUSINESS.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-dark btn-lg">
                  Book a free call
                  <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
                </a>
                <button onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')} className="btn-whatsapp">
                  <img src={A.whatsapp} alt="" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>

            <div className={`${styles.heroShowcaseRight} reveal`}>
              <HighlightsCard service={service} />
            </div>
          </div>
        </div>
      </section>

      <Logos />

      <section className={styles.block}>
        <div className="container">
          <div className={styles.centerHeadingWrapper}>
            <span className={`${styles.eyebrow} reveal`}>
              <span className={styles.dot} style={{ background: service.color }} />
              Capabilities
            </span>
            <h2 className="section-heading reveal">
              What our {service.nav} <span className="serif">services include</span>
            </h2>
          </div>
          <div className={styles.grid}>
            {service.included.map((item) => (
              <div key={item.title} className={`${styles.card} reveal`}>
                <div className={styles.cardTextContentOnly}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stickySection}>
        <div className="container">
          <div className={styles.stickyContainer}>
            <div className={styles.stickyLeft}>
              <span className={styles.eyebrow}>
                <span className={styles.dot} style={{ background: service.color }} />
                Why Newral
              </span>
              <h2 className={styles.stickyHeading}>
                {service.whyHeading} <br />
                <span className="serif">{service.whyHeadingSerif}</span>
              </h2>
              <p className={styles.stickyText}>{service.whyText}</p>
              <div className={styles.ctaRow} style={{ marginTop: '32px' }}>
                <a href={BUSINESS.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-dark btn-sm">
                  Book a Discovery Call
                  <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>
                </a>
              </div>
            </div>

            <div className={styles.stickyRight}>
              {service.why.map((item, idx) => (
                <div key={item.title} className={`${styles.whyCard} reveal`}>
                  <span className={styles.whyNum} style={{ color: service.color }}>{`0${idx + 1}`}</span>
                  <h3 className={styles.whyCardTitle}>{item.title}</h3>
                  <p className={styles.whyCardDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessSection processSteps={service.process} serviceColor={service.color} processHeading={service.processHeading} />

      <Testimonial />

      <FaqSection faqs={service.faqs} serviceColor={service.color} />

      <section className={styles.block}>
        <div className="container">
          <p className={`${styles.related} reveal`}>
            Explore more:{' '}
            {SERVICES.filter((s) => s.slug !== service.slug).map((s, idx, arr) => (
              <span key={s.slug}>
                <Link to={`/${s.slug}`} className={styles.relatedLink} style={{ '--accent-color': service.color }}>
                  {s.nav} in Noida
                </Link>
                {idx < arr.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </>
  )
}
