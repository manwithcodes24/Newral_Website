/**
 * Build-time static rendering for SEO / AEO / GEO.
 *
 * Runs after `vite build` (client, with manifest) and `vite build --ssr` (server entry).
 * For every route it writes a fully rendered HTML file with route-specific
 * <title>, meta description, canonical, Open Graph, robots and JSON-LD, so that
 * Google, Bing and AI crawlers (GPTBot, PerplexityBot, ClaudeBot…) that do not
 * execute JavaScript still see the real page content.
 *
 * Also generates: 404.html, sitemap.xml, llms.txt, llms-full.txt.
 * Any failure exits non-zero so a broken build never gets deployed.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SSR_DIST = path.join(ROOT, 'dist-ssr')
const MANIFEST = path.join(DIST, '.vite', 'manifest.json')

const fail = (msg) => {
  console.error(`\n✖ prerender: ${msg}\n`)
  process.exit(1)
}

if (!fs.existsSync(path.join(DIST, 'index.html'))) fail('dist/index.html missing — run `vite build` first')
if (!fs.existsSync(MANIFEST)) fail('dist/.vite/manifest.json missing — build.manifest must be enabled')

const ssrEntry = ['entry-server.js', 'entry-server.mjs']
  .map((f) => path.join(SSR_DIST, f))
  .find((f) => fs.existsSync(f))
if (!ssrEntry) fail('dist-ssr/entry-server.js missing — run `vite build --ssr src/entry-server.jsx --outDir dist-ssr`')

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
const { render, routeFile, ROUTE_LIST, preloadAllRoutes, siteData } = await import(pathToFileURL(ssrEntry).href)
const { SITE_URL, CONTENT_UPDATED, BUSINESS, FOUNDER, PRODUCT, TESTIMONIALS, CLIENTS, SERVICES, BLOG_POSTS, CASE_STUDIES, organizationGraph } = siteData

await preloadAllRoutes()

if (!template.includes('<!--seo:start-->') || !template.includes('<!--seo:end-->')) fail('SEO markers missing in index.html')
if (!template.includes('<div id="root"></div>')) fail('<div id="root"></div> missing in index.html')

// ── helpers ──────────────────────────────────────────────────────────────
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// JSON inside <script> must not be able to close the tag
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')
const absUrl = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`)

// CSS + JS chunks a page needs (page chunk plus its static imports), excluding the
// entry chunk whose assets index.html already references.
function chunkAssets(file) {
  const css = new Set()
  const js = new Set()
  const seen = new Set()
  const walk = (key) => {
    if (seen.has(key) || !manifest[key]) return
    seen.add(key)
    const chunk = manifest[key]
    if (chunk.isEntry) return
    js.add(`/${chunk.file}`)
    ;(chunk.css || []).forEach((c) => css.add(`/${c}`))
    ;(chunk.imports || []).forEach(walk)
  }
  if (!manifest[file]) fail(`no manifest entry for ${file}`)
  walk(file)
  return { css: [...css], js: [...js] }
}

function buildHead(seo, url) {
  const title = seo.title || 'Newral'
  const description = seo.description || BUSINESS.description
  const canonical = absUrl(seo.path || url)
  const image = seo.image || `${SITE_URL}/og-cover.jpg`
  const robots = seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'
  const routeLd = seo.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : []

  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="${esc(seo.ogType || 'website')}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<script type="application/ld+json">${jsonForScript(organizationGraph())}</script>`,
    // data-route-jsonld lets useSeo replace (not duplicate) these after the app mounts
    ...routeLd.map((ld) => `<script type="application/ld+json" data-route-jsonld="true">${jsonForScript(ld)}</script>`),
  ].join('\n    ')
}

function renderPage(url, { is404 = false } = {}) {
  const { html, seo } = render(url)
  if (!seo.title) fail(`route ${url} rendered without calling useSeo()`)
  if (!html || html.length < 1000) fail(`route ${url} rendered suspiciously little HTML (${html.length} chars)`)
  if (!is404 && seo.noindex) fail(`route ${url} rendered a noindex page — is the slug / data missing?`)

  const { css, js } = chunkAssets(routeFile(url))
  const assetTags = [
    ...css.map((h) => `<link rel="stylesheet" crossorigin href="${h}">`),
    ...js.map((h) => `<link rel="modulepreload" crossorigin href="${h}">`),
  ].join('\n    ')

  const start = template.indexOf('<!--seo:start-->')
  const end = template.indexOf('<!--seo:end-->') + '<!--seo:end-->'.length
  let out = template.slice(0, start) + buildHead(seo, url) + template.slice(end)
  out = out.replace('</head>', `  ${assetTags}\n  </head>`)
  out = out.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
  return { out, seo }
}

function writeFile(rel, content) {
  const file = path.join(DIST, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content, 'utf8')
}

// ── 1. Route HTML ────────────────────────────────────────────────────────
const pages = []
for (const url of ROUTE_LIST) {
  const { out, seo } = renderPage(url)
  // Vercel cleanUrls: /about -> about.html, /blog/x -> blog/x.html
  writeFile(url === '/' ? 'index.html' : `${url.slice(1)}.html`, out)
  pages.push({ url, seo })
  console.log(`  ✓ ${url.padEnd(50)} ${seo.title}`)
}

// ── 2. 404 page (Vercel serves it with a real 404 status) ────────────────
writeFile('404.html', renderPage('/404', { is404: true }).out)
console.log('  ✓ 404.html')

// ── 3. sitemap.xml ───────────────────────────────────────────────────────
{
  const blogDate = Object.fromEntries(BLOG_POSTS.map((p) => [`/blog/${p.slug}`, p.updated || p.date]))
  const isService = (u) => SERVICES.some((s) => `/${s.slug}` === u)
  const priority = (u) => (u === '/' ? '1.0' : isService(u) ? '0.9' : u.startsWith('/blog/') || u.startsWith('/work/') ? '0.7' : '0.8')
  const entries = pages
    .filter((p) => !p.seo.noindex)
    .map(
      ({ url }) =>
        `  <url>\n    <loc>${absUrl(url)}</loc>\n    <lastmod>${blogDate[url] || CONTENT_UPDATED}</lastmod>\n    <priority>${priority(url)}</priority>\n  </url>`
    )
  writeFile(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
  )
  console.log(`  ✓ sitemap.xml (${entries.length} urls)`)
}

// ── 4. llms.txt + llms-full.txt (https://llmstxt.org) ───────────────────
{
  const a = BUSINESS.address
  const addr = `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`
  const facts = [
    `- Company: ${BUSINESS.name} — ${BUSINESS.tagline}`,
    `- Founded: ${BUSINESS.foundingDate} by ${FOUNDER.name} (${FOUNDER.linkedin})`,
    `- Product: ${PRODUCT.name} (${PRODUCT.url}): ${PRODUCT.description}, built and run by Newral`,
    `- Availability: open 24/7`,
    `- Headquarters: ${addr}`,
    `- Serves: ${BUSINESS.areaServed.join(', ')}, plus remote clients in the US, UK and Southeast Asia`,
    `- Email: ${BUSINESS.email}`,
    `- Phone: ${BUSINESS.telephone}`,
    `- Book a call: ${BUSINESS.bookingUrl}`,
    `- Website: ${SITE_URL}/`,
    `- Clients include: ${CLIENTS.join(', ')}`,
    `- Profiles: ${BUSINESS.sameAs.join(', ')}`,
  ]

  const llms = [
    `# ${BUSINESS.name}`,
    '',
    `> ${BUSINESS.description}`,
    '',
    ...facts,
    '',
    '## Services',
    '',
    ...SERVICES.map((s) => `- [${s.nav}](${absUrl(`/${s.slug}`)}): ${s.metaDescription}`),
    `- [All services](${absUrl('/services')})`,
    '',
    '## Company',
    '',
    `- [About Newral](${absUrl('/about')}): Team, mission and values`,
    `- [Contact](${absUrl('/contact')}): Enquiry form, address, phone and email`,
    '',
    '## Case studies',
    '',
    ...CASE_STUDIES.map((c) => `- [${c.title}](${absUrl(`/work/${c.slug}`)}): ${c.summary}`),
    '',
    '## Guides',
    '',
    ...BLOG_POSTS.map((p) => `- [${p.title}](${absUrl(`/blog/${p.slug}`)}): ${p.excerpt}`),
    '',
    '## Optional',
    '',
    `- [Full text of services and guides](${absUrl('/llms-full.txt')})`,
    `- [Sitemap](${absUrl('/sitemap.xml')})`,
    '',
  ].join('\n')
  writeFile('llms.txt', llms)

  const full = [
    `# ${BUSINESS.name} — full reference`,
    '',
    `> ${BUSINESS.description}`,
    '',
    ...facts,
    '',
    '## What clients say',
    '',
    ...TESTIMONIALS.map((t) => `> "${t.quote}"\n> — ${t.name}, ${t.role}\n`),
    ...SERVICES.flatMap((s) => [
      `## ${s.nav}: ${s.h1} ${s.h1Serif || ''}`.trim(),
      '',
      `URL: ${absUrl(`/${s.slug}`)}`,
      '',
      s.intro,
      '',
      '### What is included',
      '',
      ...s.included.map((i) => `- **${i.title}**: ${i.desc}`),
      '',
      '### Why Newral',
      '',
      ...s.why.map((w) => `- **${w.title}**: ${w.desc}`),
      '',
      '### Process',
      '',
      ...s.process.map((p, i) => `${i + 1}. **${p.title}**: ${p.desc}`),
      '',
      '### FAQ',
      '',
      ...s.faqs.flatMap((f) => [`**Q: ${f.q}**`, '', f.a, '']),
    ]),
    ...CASE_STUDIES.flatMap((c) => [
      `## Case study: ${c.title}`,
      '',
      `URL: ${absUrl(`/work/${c.slug}`)} · Industry: ${c.industry} · Services: ${c.services.join(', ')}`,
      '',
      c.about,
      '',
      '### Challenge',
      '',
      ...c.challenge.map((t) => `${t}
`),
      '### What Newral did',
      '',
      ...c.solution.map((t) => `${t}
`),
      '### Results',
      '',
      ...c.outcomes.map((o) => `- ${o}`),
      '',
      `> "${c.quote.text}"
> — ${c.quote.name}, ${c.quote.role}
`,
    ]),
    ...BLOG_POSTS.flatMap((p) => [
      `## ${p.title}`,
      '',
      `URL: ${absUrl(`/blog/${p.slug}`)} · Published ${p.date}${p.updated ? ` · Updated ${p.updated}` : ''}`,
      '',
      ...p.content.filter((b) => b.type !== 'cta').map((b) => (b.type === 'h2' ? `### ${b.text}\n` : `${b.text}\n`)),
    ]),
  ].join('\n')
  writeFile('llms-full.txt', full)
  console.log('  ✓ llms.txt, llms-full.txt')
}

// ── 5. Remove build-only artifacts (never deploy the manifest) ──────────
fs.rmSync(path.join(DIST, '.vite'), { recursive: true, force: true })
fs.rmSync(SSR_DIST, { recursive: true, force: true })

console.log(`\n✔ Prerendered ${pages.length} routes + 404 into dist/`)
