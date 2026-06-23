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

        {/* Terminal Console Mockup Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupDashboard}`}
          style={{ background: '#0F172A', color: '#38BDF8', border: '1px solid rgba(255,255,255,0.08)' }}
          animate={{ y: [-7, 7] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.6, ease: "easeInOut" }}
        >
          <div className={styles.mockupHeader} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span className={styles.mockupDotRed} />
            <span className={styles.mockupDotYellow} />
            <span className={styles.mockupDotGreen} />
            <span className={styles.mockupTitle} style={{ color: '#94A3B8' }}>deploy_pipeline.sh</span>
          </div>
          <div className={styles.mockupBody} style={{ fontFamily: 'monospace', fontSize: '10px', lineHeight: 1.4, color: '#38BDF8' }}>
            <div><span style={{ color: '#94A3B8' }}>$</span> npm run deploy --prod</div>
            <div style={{ color: '#34D399', marginTop: '4px' }}>✔ Building assets (1.2s)</div>
            <div style={{ color: '#34D399' }}>✔ Syncing S3 Bucket...</div>
            <div style={{ color: '#34D399' }}>✔ CloudFront CDN Cache Invalidation</div>
            <div style={{ color: '#F472B6', marginTop: '4px', fontWeight: 'bold' }}>🚀 Deployed successfully! [v1.4.2]</div>
          </div>
        </motion.div>

        {/* Active Cloud Status Mobile Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupMobile}`}
          animate={{ y: [7, -7] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.9, ease: "easeInOut" }}
        >
          <div className={styles.mockupMobileScreen}>
            <div className={styles.mockupMobileHeader}>
              <span className={styles.mockupMobileTime}>09:41</span>
              <div className={styles.mockupMobileNotch} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: 'var(--bg)', padding: '10px', borderRadius: '12px', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '8px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '600' }}>System Uptime</span>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10B981', marginTop: '2px' }}>99.99%</div>
                </div>
                {/* Glowing status pulse */}
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ flex: 1, background: 'var(--bg)', padding: '8px', borderRadius: '10px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <span style={{ fontSize: '8px', color: 'var(--text-secondary)' }}>AWS Nodes</span>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0F172A', marginTop: '2px' }}>14 Active</div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg)', padding: '8px', borderRadius: '10px', border: '1px solid var(--border-default)', textAlign: 'center' }}>
                  <span style={{ fontSize: '8px', color: 'var(--text-secondary)' }}>K8s Pods</span>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0F172A', marginTop: '2px' }}>Healthy</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kubernetes Cluster Nodes Card */}
        <motion.div 
          className={`${styles.mockupCard} ${styles.mockupTokens}`}
          animate={{ y: [-5, 5] }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.1, ease: "easeInOut" }}
        >
          <span className={styles.tokenTitle}>Infrastructure Nodes</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={styles.dot} style={{ width: '6px', height: '6px', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', color: '#475569' }}>k8s-pod-auth-1</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={styles.dot} style={{ width: '6px', height: '6px', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
              <span style={{ fontSize: '10px', fontWeight: '500', color: '#475569' }}>k8s-pod-api-3</span>
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
              
              <div className={styles.pipelineContainer}>
                <div className={styles.pipelineStage}>
                  <span className={styles.stageIcon} style={{ background: '#10B981' }}>✓</span>
                  <span className={styles.stageName}>Lint</span>
                  <span className={styles.stageTime}>12s</span>
                </div>
                <div className={styles.pipelineLine} style={{ background: serviceColor }} />
                <div className={styles.pipelineStage}>
                  <span className={styles.stageIcon} style={{ background: '#10B981' }}>✓</span>
                  <span className={styles.stageName}>Test</span>
                  <span className={styles.stageTime}>45s</span>
                </div>
                <div className={styles.pipelineLine} style={{ background: serviceColor }} />
                <div className={styles.pipelineStage} style={{ borderColor: `${serviceColor}3D` }}>
                  <span className={styles.stageIcon} style={{ background: serviceColor }}>✓</span>
                  <span className={styles.stageName} style={{ color: serviceColor }}>Deploy</span>
                  <span className={styles.stageTime}>18s</span>
                </div>
              </div>
            </div>
          )}

          {m2 && (
            <div className={`${styles.metricsCard} reveal`}>
              <h3 className={styles.metricsCardTitle}>{m2.title}</h3>
              <p className={styles.metricsCardDesc}>{m2.desc}</p>
              
              <div className={styles.podGrid}>
                {Array.from({ length: 18 }).map((_, idx) => {
                  let bg = 'var(--border-default)'
                  let boxShadow = 'none'
                  if (idx < 6) {
                    bg = '#10B981'
                    boxShadow = '0 0 8px rgba(16, 185, 129, 0.3)'
                  } else if (idx >= 6 && idx < 10) {
                    bg = serviceColor
                    boxShadow = `0 0 8px ${serviceColor}55`
                  } else if (idx === 10) {
                    bg = '#F59E0B'
                    boxShadow = '0 0 8px rgba(245, 158, 11, 0.3)'
                  }
                  return (
                    <div 
                      key={idx} 
                      className={styles.podNode} 
                      style={{ background: bg, boxShadow: boxShadow }} 
                    />
                  )
                })}
              </div>
            </div>
          )}

          {m3 && (
            <div className={`${styles.metricsCard} reveal`}>
              <h3 className={styles.metricsCardTitle}>{m3.title}</h3>
              <p className={styles.metricsCardDesc}>{m3.desc}</p>
              
              <div>
                <div className={styles.uptimeGrid}>
                  {Array.from({ length: 30 }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={styles.uptimeDay} 
                      style={{ background: idx === 18 ? '#34D399' : '#10B981' }} 
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Last 30 Days</span>
                  <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#10B981', background: '#E6F4EA', padding: '2px 8px', borderRadius: '100px' }}>99.99% UPTIME</span>
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

export default function DevOps() {
  const service = getService('devops-noida')
  
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
