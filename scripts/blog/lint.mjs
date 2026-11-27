// Checks a Newral blog draft before a human reviews it, and again before it
// is approved. Errors block approval; warnings go into the review notes.
import fs from 'node:fs'
import path from 'node:path'

const BLOCK_TYPES = new Set(['intro', 'h2', 'h3', 'p', 'ul', 'cta'])

// Brand boundary and claims rules (scripts/blog/brief.md).
const FORBIDDEN = [
  [/synappses?/i, 'mentions Synappses (separate brand; never on newral.in)'],
  [/\bLMS\b|learning management system/i, 'mentions an LMS (Synappses territory)'],
  // Up-to, Shark Tank India and Y Combinator claims were confirmed real on 27 Nov 2026
  // (see brief.md); they are listed for a wording check below instead of blocked.
  [/\b(rapido|synphony)\b/i, 'names a client the product notes do not allow'],
  [/\b(#1|number one|best (agency|company)|leading (agency|company))\b/i, 'superlative claim about Newral'],
  [/\b(5|five)[- ]star|rated \d/i, 'rating/review claim'],
  [/in business (for )?(5|five)\+? years/i, 'Newral was founded in 2024'],
]
const PRICE = /(₹|rs\.?\s?\d|inr\s?\d|\$\s?\d|\blakh\b|\bcrore\b|per hour)/i
const NUMBER = /\d/
const CLIENTS = /\b(competishun|fizz|bansal classes|ott bharat|neet kaka jee|omega elevators|shark tank|y ?combinator)\b|(?<![\w-])Up-to(?![\w-])/i

export function knownPaths(root) {
  const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
  const paths = new Set()
  for (const m of read('src/App.jsx').matchAll(/path: '([^'*:]+)'/g)) paths.add(m[1])
  for (const m of read('src/data/blog.js').matchAll(/slug: '([^']+)'/g)) paths.add(`/blog/${m[1]}`)
  for (const m of read('src/data/caseStudies.js').matchAll(/slug: '([^']+)'/g)) paths.add(`/work/${m[1]}`)
  const postsDir = path.join(root, 'src/data/posts')
  if (fs.existsSync(postsDir)) {
    for (const f of fs.readdirSync(postsDir)) if (f.endsWith('.json')) paths.add(`/blog/${f.replace(/\.json$/, '')}`)
  }
  return paths
}

const textOf = (b) => (b.items ? b.items.join(' ') : b.text || '')

export function lintPost(post, root) {
  const errors = []
  const warnings = []
  const checks = [] // sentences a human must verify

  for (const k of ['slug', 'title', 'metaTitle', 'metaDescription', 'readTime', 'category', 'categorySlug', 'excerpt', 'coverAlt', 'content']) {
    if (!post[k] || (typeof post[k] === 'string' && !post[k].trim())) errors.push(`missing field: ${k}`)
  }
  if (post.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug)) errors.push(`slug is not kebab-case: ${post.slug}`)
  if (post.metaTitle && post.metaTitle.length > 70) warnings.push(`metaTitle is ${post.metaTitle.length} chars (aim for <= 65)`)
  if (post.metaDescription && (post.metaDescription.length < 110 || post.metaDescription.length > 165)) {
    warnings.push(`metaDescription is ${post.metaDescription.length} chars (aim for 140-160)`)
  }

  const paths = knownPaths(root)
  const blocks = Array.isArray(post.content) ? post.content : []
  if (blocks[0]?.type !== 'intro') errors.push('first block must be type "intro"')
  if (!blocks.some((b) => b.type === 'cta')) warnings.push('no cta block linking to a service page')
  blocks.forEach((b, i) => {
    if (!BLOCK_TYPES.has(b.type)) errors.push(`block ${i}: unknown type "${b.type}"`)
    if (b.type === 'ul' ? !Array.isArray(b.items) || !b.items.length : !b.text) errors.push(`block ${i} (${b.type}) is empty`)
    if (b.type === 'cta' && !paths.has(b.href)) errors.push(`block ${i}: cta links to unknown page ${b.href}`)
    if (/\]\(|<a |https?:\/\//.test(textOf(b))) warnings.push(`block ${i}: contains link markup; newral.in renders text only (use a cta block)`)
  })

  const all = [
    post.title, post.metaTitle, post.metaDescription, post.excerpt,
    ...blocks.map(textOf),
    ...(post.faq || []).flatMap((f) => [f.q, f.a]),
  ].filter(Boolean)

  for (const t of all) {
    for (const [re, why] of FORBIDDEN) if (re.test(t)) errors.push(`${why}: "${t.slice(0, 140)}"`)
    for (const s of t.split(/(?<=[.!?])\s+/)) {
      if (PRICE.test(s)) errors.push(`price or rate (Newral never quotes prices): "${s.slice(0, 160)}"`)
      else if (NUMBER.test(s.replace(/\bv0\b/gi, ''))) checks.push(`Number to verify: "${s}"`)
      if (CLIENTS.test(s)) checks.push(`Client mention, check against brief.md wording: "${s}"`)
    }
  }
  return { errors: [...new Set(errors)], warnings, checks: [...new Set(checks)] }
}
