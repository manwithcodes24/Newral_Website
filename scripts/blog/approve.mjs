#!/usr/bin/env node
// Publish a reviewed draft: content/blog-drafts/<slug>.json → src/data/posts/<slug>.json
// (which src/data/blog.js loads). Run this only after a person has read and
// fact-checked the draft. It does not commit, push or deploy anything.
//
//   npm run blog:approve -- <slug> [--author founder] [--force]
//
// --author founder  credit Yash Rajan Shukla (only if he has reviewed it)
// --force           approve despite linter errors (you have checked them)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { lintPost } from './lint.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const args = process.argv.slice(2)
const slug = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--author')
if (!slug) {
  console.error('Usage: npm run blog:approve -- <slug> [--author founder] [--force]')
  process.exit(1)
}
const src = path.join(ROOT, 'content/blog-drafts', `${slug}.json`)
const dest = path.join(ROOT, 'src/data/posts', `${slug}.json`)
if (!fs.existsSync(src)) {
  console.error(`No draft at content/blog-drafts/${slug}.json`)
  process.exit(1)
}
if (fs.existsSync(dest)) {
  console.error(`src/data/posts/${slug}.json already exists; edit it there instead.`)
  process.exit(1)
}

const post = JSON.parse(fs.readFileSync(src, 'utf8'))
const { errors } = lintPost(post, ROOT)
if (errors.length && !args.includes('--force')) {
  console.error(`✖ ${errors.length} linter error(s); fix the draft or pass --force:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

delete post.draftedAt
delete post.targetKeyword
post.date = new Date().toISOString().slice(0, 10)
const ai = args.indexOf('--author')
if (ai >= 0 && args[ai + 1] === 'founder') post.author = 'founder'

fs.mkdirSync(path.dirname(dest), { recursive: true })
fs.writeFileSync(dest, `${JSON.stringify(post, null, 2)}\n`)
fs.rmSync(src)
fs.rmSync(path.join(ROOT, 'content/blog-drafts', `${slug}.review.md`), { force: true })

const qPath = path.join(ROOT, 'docs/seo/blog-queue.json')
const queue = JSON.parse(fs.readFileSync(qPath, 'utf8'))
const topic = queue.topics.find((t) => t.slug === slug)
if (topic) {
  topic.status = 'published'
  topic.publishedAt = post.date
  fs.writeFileSync(qPath, `${JSON.stringify(queue, null, 2)}\n`)
}

console.log(`✓ Approved: src/data/posts/${slug}.json (date ${post.date}).`)
console.log('  Next: npm run build to check it, then commit and deploy as usual.')
