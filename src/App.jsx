import { useEffect, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import StickyTag from './components/StickyTag'
import StickyBookingButton from './components/StickyBookingButton'
import ScrollToTop from './components/ScrollToTop'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionContext'

// Route-level code splitting — each page loads only when navigated to,
// cutting the initial JS bundle significantly.
const Home          = lazy(() => import('./pages/Home'))
const About         = lazy(() => import('./pages/About'))
const ServicesHub   = lazy(() => import('./pages/ServicesHub'))
const UiUxDesign    = lazy(() => import('./pages/UiUxDesign'))
const GraphicDesign = lazy(() => import('./pages/GraphicDesign'))
const AppDevelopment= lazy(() => import('./pages/AppDevelopment'))
const WebDevelopment= lazy(() => import('./pages/WebDevelopment'))
const DevOps        = lazy(() => import('./pages/DevOps'))
const Contact       = lazy(() => import('./pages/Contact'))
const Blog          = lazy(() => import('./pages/Blog'))
const BlogPost      = lazy(() => import('./pages/BlogPost'))
const NotFound      = lazy(() => import('./pages/NotFound'))


export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Promote the layer just before animating, then clean up after
            entry.target.classList.add('animating')
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
            // Remove will-change after the animation finishes (~1.1s)
            entry.target.addEventListener(
              'transitionend',
              () => entry.target.classList.remove('animating'),
              { once: true }
            )
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const observeNewElements = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
      document.querySelectorAll('.fade-text:not(.visible)').forEach(el => observer.observe(el))
    }
    
    observeNewElements()
    const mutObserver = new MutationObserver(observeNewElements)
    mutObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutObserver.disconnect()
    }
  }, [])

  return (
    <Router>
      <TransitionProvider>
        <ScrollToTop />
        <Nav />
        <StickyTag />
        <StickyBookingButton />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesHub />} />
              <Route path="/ui-ux-design-noida" element={<UiUxDesign />} />
              <Route path="/graphic-design-noida" element={<GraphicDesign />} />
              <Route path="/app-development-noida" element={<AppDevelopment />} />
              <Route path="/web-development-noida" element={<WebDevelopment />} />
              <Route path="/devops-noida" element={<DevOps />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </TransitionProvider>
    </Router>
  )
}
