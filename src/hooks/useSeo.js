import { createContext, useContext, useEffect } from 'react'
import { SITE_URL, absUrl } from '../lib/site'

export { SITE_URL }

// During build-time prerendering (src/entry-server.jsx) a collector object is
// provided here; pages write their SEO data into it while rendering so the
// prerender script can bake title / meta / canonical / JSON-LD into static HTML.
// In the browser there is no provider and the effect below manages <head>.
export const SeoContext = createContext(null)

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route head manager.
 * Sets title, description, canonical, robots, Open Graph, Twitter Card and route JSON-LD.
 */
export function useSeo({ title, description, path = '/', image, jsonLd, noindex = false, ogType = 'website' }) {
  const collector = useContext(SeoContext)
  if (collector) {
    Object.assign(collector, { title, description, path, image, jsonLd, noindex, ogType })
  }

  useEffect(() => {
    const prevTitle = document.title
    const url = absUrl(path)
    const ogImage = image || `${SITE_URL}/og-cover.jpg`

    if (title) {
      document.title = title
      upsertMeta('property', 'og:title', title)
      upsertMeta('name', 'twitter:title', title)
    }
    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1')
    upsertLink('canonical', url)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('name', 'twitter:image', ogImage)

    // Replace (never duplicate) route JSON-LD — including the copy baked in by the prerenderer.
    document.head.querySelectorAll('script[data-route-jsonld]').forEach((s) => s.remove())
    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-route-jsonld', 'true')
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = prevTitle
      if (script) script.remove()
    }
    // path is unique per page; deps kept minimal to avoid re-running on object identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])
}
