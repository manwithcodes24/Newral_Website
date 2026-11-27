#!/usr/bin/env node
// Draft blog articles for newral.in from the topic queue, using Claude through
// the operator's own Claude Code login (no API key). Drafts are written to
// content/blog-drafts/<slug>.json with review notes in <slug>.review.md. They
// are outside src/, so they are never built or deployed. Publishing is a
// separate, human step: read the draft, edit it, then
//   npm run blog:approve -- <slug>
//
// Usage:
//   npm run blog:draft                     # next queued topic
//   npm run blog:draft -- --count 2        # next two
//   npm run blog:draft -- --slug <slug>    # a specific topic
//   npm run blog:draft -- --dry-run        # print the prompt, call nothing
//   npm run blog:draft -- --model <name>   # pass a model to the CLI
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { askClaude, extractJson } from './claude.mjs'
import { lintPost, knownPaths } from './lint.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const QUEUE = path.join(ROOT, 'docs/seo/blog-queue.json')
const DRAFTS = path.join(ROOT, 'content/blog-drafts')
const BRIEF = fs.readFileSync(path.join(ROOT, 'scripts/blog/brief.md'), 'utf8')

const args = process.argv.slice(2)
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : def
}
const flag = (name) => args.includes(`--${name}`)

const today = () => new Date().toISOString().slice(0, 10)
const readQueue = () => JSON.parse(fs.readFileSync(QUEUE, 'utf8'))
const writeQueue = (q) => fs.writeFileSync(QUEUE, `${JSON.stringify(q, null, 2)}\n`)

function existingContent() {
  const blog = fs.readFileSync(path.join(ROOT, 'src/data/blog.js'), 'utf8')
  const titles = [...blog.matchAll(/slug: '([^']+)',\s*title: '([^']+)'/g)].map((m) => `- /blog/${m[1]}: ${m[2]}`)
  const postsDir = path.join(ROOT, 'src/data/posts')
  for (const f of fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : []) {
    if (!f.endsWith('.json')) continue
    const p = JSON.parse(fs.readFileSync(path.join(postsDir, f), 'utf8'))
    titles.push(`- /blog/${p.slug}: ${p.title}`)
  }
  return titles.join('\n')
}

function buildPrompt(topic) {
  const pages = [...knownPaths(ROOT)].filter((p) => !p.startsWith('/blog/')).sort()
  return `You are drafting one blog article for newral.in, the website of Newral, a software development agency in Noida, India. A human editor will review and fact-check it before anything is published.

<brief>
${BRIEF}
</brief>

<topic>
Target keyword (use it in the title, the first sentence and one h2): ${topic.keyword}
Secondary phrases (use naturally where they fit): ${(topic.secondary || []).join('; ')}
Angle: ${topic.angle}
The article supports this service page, which the closing cta must link to: ${topic.supports}
</topic>

<existing_posts>
${existingContent()}
</existing_posts>

<site_pages>
${pages.join('\n')}
</site_pages>

Write the article as ONE JSON object and output nothing else (no prose, no code fence). Shape:
{
  "slug": "${topic.slug}",
  "title": "H1, under 70 characters, contains the target keyword",
  "metaTitle": "under 62 characters including the suffix ' | Newral'",
  "metaDescription": "140-160 characters, answers the query and invites the click",
  "readTime": "N min read",
  "category": "${topic.category}",
  "categorySlug": "${topic.categorySlug}",
  "excerpt": "one or two sentences for the blog card",
  "coverAlt": "short descriptive alt text",
  "content": [
    { "type": "intro", "text": "two to four sentences; the first two answer the query directly" },
    { "type": "h2", "text": "..." },
    { "type": "p", "text": "..." },
    { "type": "h3", "text": "..." },
    { "type": "ul", "items": ["...", "..."] },
    { "type": "cta", "text": "button label", "href": "${topic.supports}" }
  ],
  "faq": [ { "q": "a question people search", "a": "a 2-3 sentence self-contained answer" } ]
}

Rules for the JSON:
- Allowed block types: intro, h2, h3, p, ul, cta. Text is plain: no markdown, no HTML, no links inside text.
- 1,100 to 1,600 words of body. 5 to 8 h2 sections phrased the way people search. 3 to 5 FAQ items.
- At most two cta blocks; every cta href must be one of the site_pages above.
- Do not repeat the topic of an existing post; refer to the reader's next step instead.
- Obey every hard rule in the brief. If you are unsure a fact is true, leave it out.`
}

async function draftTopic(topic, queue) {
  const prompt = buildPrompt(topic)
  if (flag('dry-run')) {
    console.log(prompt)
    return
  }
  console.log(`→ drafting "${topic.slug}" (${topic.keyword}) …`)
  const answer = await askClaude(prompt, { model: opt('model', '') })
  const post = extractJson(answer)
  post.slug = topic.slug
  post.draftedAt = today()
  post.targetKeyword = topic.keyword

  const { errors, warnings, checks } = lintPost(post, ROOT)
  fs.mkdirSync(DRAFTS, { recursive: true })
  fs.writeFileSync(path.join(DRAFTS, `${topic.slug}.json`), `${JSON.stringify(post, null, 2)}\n`)
  const words = post.content.reduce((n, b) => n + (b.items ? b.items.join(' ') : b.text || '').split(/\s+/).length, 0)
  const review = [
    `# Review: ${post.title}`,
    '',
    `- Draft: content/blog-drafts/${topic.slug}.json`,
    `- Target keyword: ${topic.keyword} → supports ${topic.supports}`,
    `- Drafted: ${post.draftedAt} by Claude. About ${words} words.`,
    `- Publish after review: \`npm run blog:approve -- ${topic.slug}\` (add \`--author founder\` if Yash has reviewed it and it should carry his name).`,
    '',
    '## Blocking problems (fix in the JSON before approving)',
    '',
    ...(errors.length ? errors.map((e) => `- [ ] ${e}`) : ['None found by the linter.']),
    '',
    '## Warnings',
    '',
    ...(warnings.length ? warnings.map((w) => `- ${w}`) : ['None.']),
    '',
    '## Claims to verify by hand',
    '',
    'The linter cannot judge truth. Check every sentence below, and read the whole article for claims about Newral, clients or third-party tools that are not in scripts/blog/brief.md.',
    '',
    ...(checks.length ? checks.map((c) => `- [ ] ${c}`) : ['- [ ] No numbers found. Still read the whole article.']),
    '',
  ].join('\n')
  fs.writeFileSync(path.join(DRAFTS, `${topic.slug}.review.md`), review)

  topic.status = 'drafted'
  topic.draftedAt = post.draftedAt
  writeQueue(queue)
  console.log(`  ✓ content/blog-drafts/${topic.slug}.json (${words} words, ${errors.length} errors, ${checks.length} claims to verify)`)
}

const queue = readQueue()
const slug = opt('slug')
const count = Number(opt('count', '1'))
const picked = slug
  ? queue.topics.filter((t) => t.slug === slug)
  : queue.topics.filter((t) => t.status === 'queued').slice(0, count)
if (!picked.length) {
  console.log(slug ? `No topic "${slug}" in docs/seo/blog-queue.json` : 'Nothing queued in docs/seo/blog-queue.json')
  process.exit(slug ? 1 : 0)
}
for (const topic of picked) {
  try {
    await draftTopic(topic, queue)
  } catch (e) {
    console.error(`  ✖ ${topic.slug}: ${e.message}`)
    process.exitCode = 1
  }
}
