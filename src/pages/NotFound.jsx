import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import Footer from '../components/Footer'

export default function NotFound() {
  useSeo({
    title: '404 — Page Not Found | Newral',
    description: 'The page you are looking for does not exist. Return to Newral, a UI/UX design and development agency in Noida.',
    path: '/404',
  })

  return (
    <>
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
        <span style={{ fontSize: '96px', fontWeight: 800, color: 'var(--text-primary)', opacity: 0.08, lineHeight: 1 }}>404</span>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginTop: '-20px', marginBottom: '16px' }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
          The page you are looking for has moved or doesn't exist. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn-dark btn-lg">Back to Home</Link>
          <Link to="/contact" className="btn-whatsapp">Contact Us</Link>
        </div>
      </section>
      <Footer />
    </>
  )
}
