import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { A } from '../lib/assets'
import { getService } from '../data/services'
import { useSeo } from '../hooks/useSeo'
import { TextAnimate } from '../components/TextAnimate'
import FadeText from '../components/FadeText'
import Logos from '../components/Logos'
import Testimonial from '../components/Testimonial'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'
import styles from './ServicePage.module.css'

function buildJsonLd(s) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.h1,
      serviceType: s.nav,
      url: `https://newral.in/${s.slug}`,
      provider: { '@type': 'ProfessionalService', name: 'Newral', '@id': 'https://newral.in/#organization' },
      areaServed: ['Noida', 'Delhi NCR', 'Greater Noida', 'Gurugram', 'Delhi', 'India'],
      description: s.metaDescription,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://newral.in/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://newral.in/services' },
        { '@type': 'ListItem', position: 3, name: s.nav, item: `https://newral.in/${s.slug}` },
      ],
    },
  ]
}

function HeroShowcase({ serviceColor }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    const rX = -(mouseY / height) * 20
    const rY = (mouseX / width) * 20
    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div 
      className={styles.showcaseWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={styles.showcaseContainer}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className={styles.showcaseGlow} style={{ '--glow-color': serviceColor }} />

        {/* Brand Book Mockup Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupDashboard}`}
          animate={{ y: [-6, 6] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.8, ease: "easeInOut" }}
        >
          <div className={styles.mockupHeader}>
            <span className={styles.mockupDotRed} />
            <span className={styles.mockupDotYellow} />
            <span className={styles.mockupDotGreen} />
            <span className={styles.mockupTitle}>Brand Guidelines V1</span>
          </div>
          <div className={styles.mockupBody}>
            <div className={styles.mockupStatRow}>
              <div>
                <span className={styles.mockupLabel}>Brand Assets</span>
                <span className={styles.mockupValue}>Active</span>
              </div>
              <span className={styles.mockupBadgeGreen} style={{ color: serviceColor, background: `${serviceColor}1A` }}>Design Guide</span>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <div style={{ flex: 1, height: '36px', borderRadius: '6px', background: serviceColor }} />
              <div style={{ flex: 1, height: '36px', borderRadius: '6px', background: '#0F172A' }} />
              <div style={{ flex: 1, height: '36px', borderRadius: '6px', background: '#475569' }} />
            </div>
          </div>
        </motion.div>

        {/* Typography Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupMobile}`}
          animate={{ y: [6, -6] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 5.2, ease: "easeInOut" }}
          style={{ background: '#0F172A', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className={styles.mockupMobileScreen} style={{ padding: '20px' }}>
            <span className={styles.tokenTitle} style={{ color: '#94A3B8' }}>Typography Stack</span>
            
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontFamily: 'var(--aeonik)', fontSize: '24px', fontWeight: '500', lineHeight: 1 }}>Aeonik</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>Sans-Serif / Modern & Clean</div>
              </div>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontStyle: 'italic', lineHeight: 1 }}>Instrument Serif</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>Serif / Elegant & Creative</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collateral/Deck Mockup Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupTokens}`}
          animate={{ y: [-4, 4] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.2, ease: "easeInOut" }}
        >
          <span className={styles.tokenTitle}>Marketing Assets</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: serviceColor }} />
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-primary)' }}>Pitch Deck.pdf</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid #E2E8F0' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--text-primary)' }}>Social Creatives</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ServiceCard({ item, index, serviceColor }) {
  return (
    <div className={`${styles.card} ${item.image ? styles.cardWithImage : ''} reveal`}>
      {item.image && (
        <div className={styles.cardImageWrapper}>
          <img src={item.image} alt={`${item.title} — Newral, Noida`} loading="lazy" className={styles.cardImage} />
        </div>
      )}
      <div className={item.image ? styles.cardTextContent : styles.cardTextContentOnly}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardDesc}>{item.desc}</p>
      </div>
    </div>
  )
}

function MetricsDashboard({ service }) {
  const serviceColor = service.color
  const metrics = service.metrics || []
  const m1 = metrics[0]
  const m2 = metrics[1]
  const m3 = metrics[2]

  return (
    <section className={`${styles.block} ${styles.blockAlt}`}>
      <div className="container">
        <div className={styles.centerHeadingWrapper}>
          <span className={`${styles.eyebrow} reveal`}>
            <span className={styles.dot} style={{ background: serviceColor, boxShadow: `0 0 0 4px ${serviceColor}2D` }} />
            {service.metricsSubtitle}
          </span>
          <h2 className={`section-heading reveal`}>
            {service.metricsTitle} <span className="serif">{service.metricsTitleSerif}</span>
          </h2>
        </div>
        
        <div className={styles.metricsGrid}>
          {m1 && (
            <div className={`${styles.metricsCard} reveal`}>
              <h3 className={styles.metricsCardTitle}>{m1.title}</h3>
              <p className={styles.metricsCardDesc}>{m1.desc}</p>
              
              <div className={styles.ctrCompare}>
                <div className={styles.adCard}>
                  <span className={styles.tokenTitle} style={{ fontSize: '8px', marginBottom: '4px' }}>Ad A (Generic)</span>
                  <div className={styles.adPreview}>
                    <div style={{ padding: '6px', textAlign: 'center' }}>
                      <div style={{ background: 'var(--border-default)', height: '5px', width: '30px', margin: '0 auto 4px' }} />
                      <div style={{ background: '#CBD5E1', height: '12px', width: '50px', borderRadius: '3px' }} />
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <span className={styles.adCTRLabel}>Avg. CTR</span>
                    <div className={styles.adCTRValue} style={{ color: 'var(--text-secondary)' }}>1.2%</div>
                    <div className={styles.adCTRBar} style={{ width: '25%', background: '#CBD5E1' }} />
                  </div>
                </div>
                
                <div className={styles.adCard} style={{ borderColor: `${serviceColor}3D` }}>
                  <span className={styles.tokenTitle} style={{ fontSize: '8px', marginBottom: '4px', color: serviceColor }}>Ad B (Newral)</span>
                  <div className={styles.adPreview} style={{ borderColor: `${serviceColor}2D`, background: `${serviceColor}0B` }}>
                    <div style={{ padding: '6px', textAlign: 'center' }}>
                      <div style={{ background: serviceColor, height: '5px', width: '25px', margin: '0 auto 4px' }} />
                      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: serviceColor, fontSize: '10px', fontWeight: 'bold' }}>Brand Story</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <span className={styles.adCTRLabel} style={{ color: serviceColor }}>Avg. CTR</span>
                    <div className={styles.adCTRValue} style={{ color: serviceColor }}>4.8% <span style={{ fontSize: '9px', color: '#10B981', marginLeft: '2px', fontWeight: 'bold' }}>▲ 3x</span></div>
                    <div className={styles.adCTRBar} style={{ width: '100%', background: serviceColor }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {m2 && (
            <div className={`${styles.metricsCard} reveal`}>
              <h3 className={styles.metricsCardTitle}>{m2.title}</h3>
              <p className={styles.metricsCardDesc}>{m2.desc}</p>
              
              <div className={styles.brandChecklist}>
                <div className={styles.checkRow}>
                  <span className={styles.checkLabel}>Logo Versatility</span>
                  <span className={styles.checkStatus} style={{ color: '#10B981' }}>100% Match</span>
                </div>
                <div style={{ background: 'var(--border-default)', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
                  <div style={{ background: '#10B981', height: '100%', width: '100%' }} />
                </div>
                
                <div className={styles.checkRow}>
                  <span className={styles.checkLabel}>Color Swatch Uniformity</span>
                  <span className={styles.checkStatus} style={{ color: serviceColor }}>98% Consistent</span>
                </div>
                <div style={{ background: 'var(--border-default)', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '4px' }}>
                  <div style={{ background: serviceColor, height: '100%', width: '98%' }} />
                </div>
                
                <div className={styles.checkRow}>
                  <span className={styles.checkLabel}>Typography Hierarchies</span>
                  <span className={styles.checkStatus} style={{ color: 'var(--text-primary)' }}>Approved</span>
                </div>
                <div style={{ background: 'var(--border-default)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ background: '#0F172A', height: '100%', width: '100%' }} />
                </div>
              </div>
            </div>
          )}

          {m3 && (
            <div className={`${styles.metricsCard} reveal`}>
              <h3 className={styles.metricsCardTitle}>{m3.title}</h3>
              <p className={styles.metricsCardDesc}>{m3.desc}</p>
              
              <div className={styles.specimenContainer}>
                <div className={styles.specimenSheet}>
                  <div className={styles.specimenFontRow}>
                    <span style={{ fontFamily: 'var(--aeonik)', fontSize: '12px', fontWeight: '500' }}>Aeonik Sans</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Aa Bb Cc</span>
                  </div>
                  <div className={styles.specimenFontRow} style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                    <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '13px' }}>Instrument Serif</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Aa Bb Cc</span>
                  </div>
                </div>
                <div className={styles.swatchGrid}>
                  <div className={styles.swatchItem} style={{ background: serviceColor }} />
                  <div className={styles.swatchItem} style={{ background: '#0F172A' }} />
                  <div className={styles.swatchItem} style={{ background: '#475569' }} />
                  <div className={styles.swatchItem} style={{ background: 'var(--border-default)' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
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
              <span className="serif">{processHeading || 'design process'}</span>
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
                className={`${styles.processStepCard}`}
                onViewportEnter={() => setActiveStep(idx)}
                viewport={{ amount: 0.6, margin: "-10% 0px -20% 0px" }}
              >
                <div 
                  className={styles.stepCardContent} 
                  style={{ 
                    borderLeftColor: activeStep === idx ? serviceColor : 'var(--border-default)',
                    opacity: activeStep === idx ? 1 : 0.4,
                    transition: 'border-color 0.4s, opacity 0.4s'
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
                <button 
                  className={styles.faqQ} 
                  onClick={() => setOpenFaq(open ? -1 : i)} 
                  aria-expanded={open}
                >
                  <span style={{ color: open ? 'var(--text-primary)' : 'inherit', transition: 'color 0.3s' }}>
                    {faq.q}
                  </span>
                  <motion.span 
                    className={styles.faqIcon} 
                    animate={{ rotate: open ? 45 : 0 }}
                    style={{ color: open ? serviceColor : 'var(--text-secondary)' }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={styles.faqA}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function GraphicDesign() {
  const service = getService('graphic-design-noida')
  
  useSeo({
    title: service?.metaTitle,
    description: service?.metaDescription,
    path: `/${service?.slug}`,
    jsonLd: service ? buildJsonLd(service) : null,
  })

  if (!service) return <Navigate to="/" replace />

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

            <div className={`${styles.heroShowcaseRight} reveal`}>
              <HeroShowcase serviceColor={service.color} />
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
            <h2 className={`section-heading reveal`}>
              What our {service.nav} <span className="serif">services include</span>
            </h2>
          </div>
          <div className={styles.grid}>
            {service.included.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} serviceColor={service.color} />
            ))}
          </div>
        </div>
      </section>

      <MetricsDashboard service={service} />

      <section className={styles.stickySection}>
        <div className="container">
          <div className={styles.stickyContainer}>
            <div className={styles.stickyLeft}>
              <span className={styles.eyebrow}>
                <span className={styles.dot} style={{ background: service.color }} />
                Why Newral
              </span>
              <h2 className={styles.stickyHeading}>
                {service.whyHeading || 'Own a design team'} <br />
                for the <span className="serif">{service.whyHeadingSerif || 'price of one mid hire'}</span>
              </h2>
              <p className={styles.stickyText}>
                {service.whyText || 'No handoff delays. No communication gaps. We operate as a direct extension of your product team to ship pixel-perfect layouts, verified by user metrics, directly to code.'}
              </p>
              <div className={styles.ctaRow} style={{ marginTop: '32px' }}>
                <a
                  href="https://cal.com/newralfounder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark btn-sm"
                >
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
            {[
              ['ui-ux-design-noida', 'UI/UX Design'],
              ['graphic-design-noida', 'Graphic Design'],
              ['app-development-noida', 'App Development'],
              ['web-development-noida', 'Web Development'],
              ['devops-noida', 'DevOps'],
            ]
              .filter(([sl]) => sl !== service.slug)
              .map(([sl, label], idx, arr) => (
                <span key={sl}>
                  <Link to={`/${sl}`} className={styles.relatedLink} style={{ '--accent-color': service.color }}>{label} in Noida</Link>
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
