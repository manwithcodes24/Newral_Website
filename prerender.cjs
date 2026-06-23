/**
 * prerender.cjs — Static HTML pre-renderer using Puppeteer
 *
 * Run AFTER `vite build`:
 *   node prerender.cjs
 *
 * For each route, this script:
 *   1. Serves the Vite build output from /dist via a local HTTP server
 *   2. Opens each URL in headless Chrome
 *   3. Waits for the page to settle (network idle + no pending React renders)
 *   4. Writes the final HTML to dist/<path>/index.html
 *
 * The resulting /dist folder contains pre-rendered HTML files that Vercel
 * will serve directly to crawlers, dramatically improving Googlebot indexing.
 *
 * Puppeteer is already in package.json — no new installs needed.
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ─── Config ───────────────────────────────────────────────────────────────
const DIST = path.resolve(__dirname, 'dist')
const PORT = 5199

// All routes to pre-render
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/blog/ui-ux-design-cost-noida-2025',
  '/blog/how-to-choose-web-development-agency-noida',
  '/blog/signs-your-app-needs-ux-audit',
  '/blog/react-native-vs-flutter-2025',
  '/blog/what-is-design-system-startup',
  '/ui-ux-design-noida',
  '/graphic-design-noida',
  '/app-development-noida',
  '/web-development-noida',
  '/devops-noida',
]

// ─── Simple static file server ────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.mp4':  'video/mp4',
  '.otf':  'font/otf',
  '.ttf':  'font/ttf',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.ico':  'image/x-icon',
}

function createServer() {
  return http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0]

    // Direct file request
    let filePath = path.join(DIST, urlPath)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath)
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      return fs.createReadStream(filePath).pipe(res)
    }

    // SPA fallback → index.html
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.createReadStream(path.join(DIST, 'index.html')).pipe(res)
  })
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('❌  /dist not found. Run `npm run build` first.')
    process.exit(1)
  }

  // Dynamic import — puppeteer ships as ESM in newer versions but the package
  // also exposes a CJS entry point.
  const puppeteer = require('puppeteer')

  const server = createServer()
  await new Promise(resolve => server.listen(PORT, resolve))
  console.log(`🌐  Static server running on http://localhost:${PORT}`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()

  // Enable request interception to block third-party embeds/scripts (like Cal.com) from timing out the build
  await page.setRequestInterception(true)
  page.on('request', req => {
    const url = req.url()
    if (url.includes('cal.com') || url.includes('google-analytics') || url.includes('googletagmanager')) {
      req.abort()
    } else {
      req.continue()
    }
  })

  // Suppress non-essential console noise from the page
  page.on('console', () => {})
  page.on('pageerror', err => console.warn(`  ⚠️  Page error: ${err.message}`))

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`
    console.log(`  ⏳  Rendering ${route}`)

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

      // Wait for React hydration — poll until #root has children
      await page.waitForFunction(
        () => document.querySelector('#root') && document.querySelector('#root').children.length > 0,
        { timeout: 15000 }
      )

      // Extra settle time for animations / lazy loads
      await new Promise(r => setTimeout(r, 800))

      const html = await page.content()

      // Write to dist/<route>/index.html (creates nested dirs as needed)
      const outDir = path.join(DIST, route === '/' ? '' : route)
      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
      console.log(`  ✅  ${route} → dist${route === '/' ? '/index.html' : route + '/index.html'}`)
    } catch (err) {
      console.error(`  ❌  Failed to render ${route}: ${err.message}`)
    }
  }

  await browser.close()
  server.close()
  console.log('\n🎉  Pre-rendering complete.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
