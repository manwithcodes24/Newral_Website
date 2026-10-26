// Build-time renderer used by scripts/prerender.mjs (never shipped to the browser).
// Renders each route to static HTML and collects its SEO data via SeoContext.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App, { preloadAllRoutes, matchRoute } from './App'
import { SeoContext } from './hooks/useSeo'
import { SERVICES } from './data/services'
import { BLOG_POSTS } from './data/blog'
import { CASE_STUDIES } from './data/caseStudies'
import { organizationGraph } from './lib/schema'
import { SITE_URL, BUSINESS, TESTIMONIALS, CLIENTS, WHATSAPP_URL, CONTENT_UPDATED, FOUNDER, PRODUCT } from './lib/site'

export { preloadAllRoutes }

// Source file of the page component for a URL — used to link its CSS chunk.
export const routeFile = (url) => matchRoute(url).file

export const STATIC_ROUTES = ['/', '/about', '/services', '/work', '/contact', '/blog']

export const ROUTE_LIST = [
  ...STATIC_ROUTES,
  ...SERVICES.map((s) => `/${s.slug}`),
  ...CASE_STUDIES.map((c) => `/work/${c.slug}`),
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
]

export function render(url) {
  const seo = {}
  const html = renderToString(
    <SeoContext.Provider value={seo}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoContext.Provider>
  )
  return { html, seo }
}

// Data used to generate sitemap.xml, llms.txt and llms-full.txt
export const siteData = { SITE_URL, CONTENT_UPDATED, BUSINESS, FOUNDER, PRODUCT, TESTIMONIALS, CLIENTS, WHATSAPP_URL, SERVICES, BLOG_POSTS, CASE_STUDIES, organizationGraph }
