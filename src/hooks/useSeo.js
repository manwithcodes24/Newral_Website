import { useEffect } from 'react'

export const SITE_URL = 'https://newral.in'

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
 * Client-side SEO head manager for route pages (SPA — no SSR).
 * Sets title, description, canonical, Open Graph, Twitter Card, and an optional JSON-LD block,
 * then restores the title and removes the JSON-LD on unmount.
 */
export function useSeo({ title, description, path = '/', image, jsonLd }) {
  useEffect(() => {
    const prevTitle = document.title
    const url = `${SITE_URL}${path}`
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
    upsertLink('canonical', url)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('name', 'twitter:image', ogImage)

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
