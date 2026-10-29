import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { preloadRoute } from './App'
import { initAnalytics } from './lib/analytics'
import './styles/globals.css'
import './styles/tokens.css'

const container = document.getElementById('root')

function mount() {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

initAnalytics()

// Load the current page's chunk first so the prerendered HTML is swapped for the
// live app in a single commit. Never block the app if the preload fails.
preloadRoute(window.location.pathname).then(mount, mount)
