import { useEffect, useRef, lazy, Suspense } from 'react'
import Nav from './components/Nav'
import StickyTag from './components/StickyTag'
import StickyBookingButton from './components/StickyBookingButton'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route, matchRoutes } from 'react-router-dom'
import { TransitionProvider } from './context/TransitionContext'

/**
 * Route-level code splitting with a preload hook.
 * - Browser: main.jsx preloads the current route's chunk before the first render,
 *   so React can replace the prerendered HTML in one commit (no blank flash).
 * - Build: entry-server.jsx preloads every page so renderToString never suspends.
 * Once a page module is loaded it is rendered directly instead of through React.lazy.
 */
function lazyPage(factory) {
  let Loaded = null
  const load = () => factory().then((m) => { Loaded = m.default; return m })
  const Lazy = lazy(load)
  function Page(props) {
    // Pick the component type once per mount so it never flips from Lazy -> Loaded mid-life.
    const Comp = useRef(Loaded || Lazy).current
    return <Comp {...props} />
  }
  Page.preload = load
  return Page
}

const Home          = lazyPage(() => import('./pages/Home'))
const About         = lazyPage(() => import('./pages/About'))
const ServicesHub   = lazyPage(() => import('./pages/ServicesHub'))
const UiUxDesign    = lazyPage(() => import('./pages/UiUxDesign'))
const GraphicDesign = lazyPage(() => import('./pages/GraphicDesign'))
const AppDevelopment= lazyPage(() => import('./pages/AppDevelopment'))
const WebDevelopment= lazyPage(() => import('./pages/WebDevelopment'))
const DevOps        = lazyPage(() => import('./pages/DevOps'))
const ServiceLanding= lazyPage(() => import('./pages/ServiceLanding'))
const Contact       = lazyPage(() => import('./pages/Contact'))
const Blog          = lazyPage(() => import('./pages/Blog'))
const BlogPost      = lazyPage(() => import('./pages/BlogPost'))
const Work          = lazyPage(() => import('./pages/Work'))
const CaseStudy     = lazyPage(() => import('./pages/CaseStudy'))
const NotFound      = lazyPage(() => import('./pages/NotFound'))

export const ROUTES = [
  { path: '/', Page: Home, file: 'src/pages/Home.jsx' },
  { path: '/about', Page: About, file: 'src/pages/About.jsx' },
  { path: '/services', Page: ServicesHub, file: 'src/pages/ServicesHub.jsx' },
  { path: '/ui-ux-design-noida', Page: UiUxDesign, file: 'src/pages/UiUxDesign.jsx' },
  { path: '/graphic-design-noida', Page: GraphicDesign, file: 'src/pages/GraphicDesign.jsx' },
  { path: '/app-development-noida', Page: AppDevelopment, file: 'src/pages/AppDevelopment.jsx' },
  { path: '/web-development-noida', Page: WebDevelopment, file: 'src/pages/WebDevelopment.jsx' },
  { path: '/devops-noida', Page: DevOps, file: 'src/pages/DevOps.jsx' },
  { path: '/saas-development-noida', Page: ServiceLanding, file: 'src/pages/ServiceLanding.jsx' },
  { path: '/ai-automation-noida', Page: ServiceLanding, file: 'src/pages/ServiceLanding.jsx' },
  { path: '/custom-software-development-noida', Page: ServiceLanding, file: 'src/pages/ServiceLanding.jsx' },
  { path: '/contact', Page: Contact, file: 'src/pages/Contact.jsx' },
  { path: '/blog', Page: Blog, file: 'src/pages/Blog.jsx' },
  { path: '/blog/:slug', Page: BlogPost, file: 'src/pages/BlogPost.jsx' },
  { path: '/work', Page: Work, file: 'src/pages/Work.jsx' },
  { path: '/work/:slug', Page: CaseStudy, file: 'src/pages/CaseStudy.jsx' },
  { path: '*', Page: NotFound, file: 'src/pages/NotFound.jsx' },
]

export function matchRoute(pathname) {
  const match = matchRoutes(ROUTES, pathname)
  return match ? match[match.length - 1].route : ROUTES[ROUTES.length - 1]
}

export const preloadRoute = (pathname) => matchRoute(pathname).Page.preload()

export const preloadAllRoutes = () => Promise.all(ROUTES.map((r) => r.Page.preload()))

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
    <TransitionProvider>
      <ScrollToTop />
      <Nav />
      <StickyTag />
      <StickyBookingButton />
      <main>
        <Suspense fallback={null}>
          <Routes>
            {ROUTES.map(({ path, Page }) => (
              <Route key={path} path={path} element={<Page />} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </TransitionProvider>
  )
}
