import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer'
import { TextAnimate } from '../components/TextAnimate'
import { A } from '../lib/assets'
import { useSeo } from '../hooks/useSeo'
import styles from './Contact.module.css'

const CONTACT_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Newral',
  url: 'https://newral.in/contact',
  description:
    'Contact Newral — a UI/UX design, app and web development agency in Sector 62, Noida, Delhi NCR.',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'Newral',
    '@id': 'https://newral.in/#organization',
    email: 'tech@newral.in',
    telephone: '+91-700422422',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '412, 4th Floor, Tower-B, i-thum Building, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
  },
}

export default function Contact() {
  useSeo({
    title: 'Contact Newral — UI/UX, App & Web Development Agency in Noida',
    description:
      'Get in touch with Newral, a UI/UX design and development agency in Sector 62, Noida, Delhi NCR. Tell us about your product and book a free consultation.',
    path: '/contact',
    jsonLd: CONTACT_JSONLD,
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
    stage: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className={styles.contactPage}>
        <div className={styles.glow} aria-hidden="true" />
        
        <div className="container relative z-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.grid}
              >
                {/* Left Content Column */}
                <div className={styles.leftSection}>
                  <div>
                    <h1 className={styles.title}>
                      <TextAnimate as="span" animation="blurIn" by="word" once duration={0.6}>
                        Let’s Talk
                      </TextAnimate>
                    </h1>
                    <p className={styles.subtitle}>
                      Not sure where to start? Tell us about your product, your timeline, how you heard about us, and where you’re located.
                    </p>
                  </div>

                  <div className={styles.infoBlock}>
                    <div className={styles.infoGroup}>
                      <h4>Opening Hours</h4>
                      <p>Mon to Sat : 10:00 AM - 7:00 PM</p>
                    </div>
                    <div className={styles.infoGroup}>
                      <h4>Office Address</h4>
                      <p>Tower-B, i-thum Building, Sector 62, Noida, India</p>
                    </div>
                  </div>
                </div>

                {/* Right Form Column */}
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Name*</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name" 
                        className={styles.input} 
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Email*</label>
                      <input 
                        required 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your e-mail" 
                        className={styles.input} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>How did you hear of us?</label>
                      <input 
                        type="text" 
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        placeholder="Google, LinkedIn, etc." 
                        className={styles.input} 
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Company Stage</label>
                      <div className={styles.selectWrapper}>
                        <select 
                          name="stage"
                          value={formData.stage}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="">Select Stage</option>
                          <option value="early">Early Stage</option>
                          <option value="scaleup">Scale-up</option>
                          <option value="enterprise">Enterprise</option>
                        </select>
                        <span className={styles.selectIcon} aria-hidden="true">▼</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Message*</label>
                    <textarea 
                      required 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6" 
                      placeholder="Write your message" 
                      className={styles.textarea} 
                    />
                  </div>

                  {submitError && (
                    <p style={{ color: '#EF4444', fontFamily: 'var(--satoshi, sans-serif)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {submitError}
                    </p>
                  )}
                  <button type="submit" className="btn-dark btn-lg" style={{ marginLeft: 'auto' }} disabled={submitting}>
                    {submitting ? 'Sending…' : 'Submit'}
                    {!submitting && <span className="arrow-circle"><img src={A.arrowLg} alt="" /></span>}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={styles.successMessage}
              >
                <div className={styles.successIcon}>✓</div>
                <h2 className={styles.successTitle}>Message Sent!</h2>
                <p className={styles.successText}>
                  Thank you for reaching out, {formData.name}. Our team will review your message and get back to you shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className={styles.btnSubmit} style={{ marginTop: '24px' }}>
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </>
  )
}
