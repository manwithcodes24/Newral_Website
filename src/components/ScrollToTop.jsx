import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset scroll to the top on every route change so a new page always opens at
// its top, rather than inheriting the previous page's scroll position.
// Also supports smooth scrolling to elements when a hash is present in the URL.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Wait a brief moment for the page render/transition to finish
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
