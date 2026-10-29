// Visitor and lead tracking: Google Analytics 4 + Microsoft Clarity.
//
// Both are off until their IDs are set as Vercel env vars (VITE_GA_ID = "G-…",
// VITE_CLARITY_ID = the Clarity project id) and the site is rebuilt. Use
// Newral's own GA4 property and Clarity project, never Synappses' ones.
//
// GA4's enhanced measurement records page views on client-side route changes,
// so nothing has to be wired into the router. Browser-only: call from main.jsx,
// never from the prerender (entry-server.jsx).

const GA_ID = import.meta.env.VITE_GA_ID
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID
const ATTRIBUTION_KEY = 'newral_first_touch'

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

// First touch: where this visitor came from the first time they landed. Kept so a
// lead submitted days later is still credited to the ad, post or referrer that
// brought them.
function captureAttribution() {
  try {
    if (localStorage.getItem(ATTRIBUTION_KEY)) return
    const params = new URLSearchParams(window.location.search)
    const referrer = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : ''
    localStorage.setItem(
      ATTRIBUTION_KEY,
      JSON.stringify({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        referrer: referrer || '(direct)',
        landing_page: window.location.pathname,
        first_seen: new Date().toISOString(),
      })
    )
  } catch {
    // Storage blocked (private mode): the lead just goes in without a source.
  }
}

export function getAttribution() {
  try {
    return JSON.parse(localStorage.getItem(ATTRIBUTION_KEY)) || {}
  } catch {
    return {}
  }
}

export function track(event, params = {}) {
  try {
    window.gtag?.('event', event, params)
    window.clarity?.('event', event)
  } catch {
    // Analytics must never break the page.
  }
}

// Every contact link on the site, counted from one listener instead of 28 call sites.
const CONTACT_LINKS = [
  [/wa\.me|whatsapp\.com/i, 'click_whatsapp'],
  [/cal\.com/i, 'click_booking'],
  [/^tel:/i, 'click_phone'],
  [/^mailto:/i, 'click_email'],
]

function trackContactClicks(e) {
  const link = e.target.closest?.('a[href]')
  if (!link) return
  const href = link.getAttribute('href')
  const match = CONTACT_LINKS.find(([pattern]) => pattern.test(href))
  if (match) track(match[1], { link_url: href, page: window.location.pathname })
}

export function initAnalytics() {
  if (typeof window === 'undefined') return
  captureAttribution()

  if (GA_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  }

  if (CLARITY_ID) {
    window.clarity =
      window.clarity ||
      function clarity() {
        ;(window.clarity.q = window.clarity.q || []).push(arguments)
      }
    loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
  }

  document.addEventListener('click', trackContactClicks, { capture: true })
}
