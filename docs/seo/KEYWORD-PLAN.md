# newral.in keyword plan

Written 27 Nov 2026. One page owns each keyword, so pages do not compete with
each other. Search volumes are **not known** (no Ahrefs/Semrush/Search Console
data yet); priorities come from commercial fit and where Newral has proof.
Revisit after 8–12 weeks of Search Console data.

Rules: no city or country clones of the same service page (Google treats them as
doorway pages). Synappses and LMS terms belong to synappses.in, never here.

## Money pages

| Page | Primary keyword (owns) | Secondary / variants | Status |
|---|---|---|---|
| `/` | app and web development company in Noida | software development company Noida, product agency Delhi NCR | Title + H1 retargeted |
| `/app-development-noida` | app development company in Noida | mobile app development company India, iOS/Android/React Native app development | Title + meta retargeted to add India |
| `/web-development-noida` | web development company in Noida | web development company India, website development company Noida, Next.js development | Title + meta retargeted to add India |
| `/fix-ai-built-app` | fix AI-built app | vibe-coded app rescue, Lovable/Bolt/Cursor/Replit app not working, AI-generated app security | **New page** |
| `/ai-chatbot-development` | AI chatbot development company | WhatsApp AI chatbot, website chatbot, custom chatbot India | **New page** |
| `/white-label-app-development` | white-label app development | white-label development partner for agencies, outsource app development | **New page** (confirm the offer, see report) |
| `/ai-automation-noida` | AI automation company | AI agent development, workflow automation, LLM integration | Title adds India; chatbot FAQ now points to the chatbot page |
| `/saas-development-noida` | SaaS development company | SaaS MVP development | unchanged |
| `/custom-software-development-noida` | custom software development company Noida | MVP development company | unchanged |
| `/devops-noida` | DevOps services company Noida | cloud cost optimisation, CI/CD setup | unchanged |
| `/ui-ux-design-noida` | UI/UX design agency in Noida | UX audit, design system | unchanged |
| `/graphic-design-noida` | graphic design agency in Noida | branding agency Noida | unchanged |
| `/services` | app and web development services | hub: links every service page | Title/meta retargeted |
| `/work/*` | "<client> case study" | proof for the service pages they link to | unchanged |

### Deliberately not built
- **Edtech app development page.** The SEO audit recommends it (Newral's proof is in EdTech), but the 24 Nov 2026 brand rule says coaching institutes are Synappses leads. A page aimed at *edtech product companies* (not institutes) would be defensible; it needs your decision.
- **Grow (marketing) service pages.** No case studies yet; product notes forbid claiming results. Add pages when there is proof.
- **City pages** (Delhi, Gurgaon…): doorway-page risk.

## Blog topics (queue: `docs/seo/blog-queue.json`)

Each post supports one money page and links to it with a CTA.

| Slug | Keyword | Supports |
|---|---|---|
| fix-ai-built-app-before-launch | fix AI built app | /fix-ai-built-app (**drafted**, awaiting review) |
| ai-built-app-security-checklist | is my AI generated app secure | /fix-ai-built-app |
| ai-chatbot-development-cost-india | AI chatbot development cost India | /ai-chatbot-development |
| whatsapp-ai-chatbot-for-business | WhatsApp AI chatbot for business | /ai-chatbot-development |
| ai-agent-vs-chatbot-vs-automation | AI agent vs chatbot | /ai-automation-noida |
| how-to-choose-app-development-company-india | app development company India | /app-development-noida |
| app-development-cost-factors | app development cost India | /app-development-noida |
| white-label-app-development-for-agencies | white label app development | /white-label-app-development |
| scale-app-for-traffic-spikes | scale app for high traffic | /devops-noida |
| reduce-video-streaming-costs | reduce video streaming cost | /devops-noida |
| nextjs-vs-react-business-website | Next.js vs React for business website | /web-development-noida |
| mvp-development-guide-startups | MVP development for startups | /custom-software-development-noida |

Existing posts keep their keywords: UI/UX design cost Noida, how to choose a web
development agency in Noida, UX audit signs, React Native vs Flutter, design systems.

## On-page and AEO changes in this branch
- New service pages render Service + FAQPage + BreadcrumbList JSON-LD (via `serviceJsonLd`), are prerendered, and appear in `sitemap.xml`, `llms.txt` and `llms-full.txt` automatically.
- Organization `knowsAbout` adds AI chatbot development, AI agent development, fixing AI-generated apps and white-label app development.
- Every FAQ answer is written answer-first so assistants can quote it alone.
- Internal links: footer, services hub, every service page's "Explore more" row and the AI automation FAQ link to the new pages; non-local pages are not labelled "in Noida".
- Blog: posts can now have `h3`, `ul` blocks and a visible FAQ (with FAQPage JSON-LD), and `author: 'founder'` credits Yash Rajan Shukla as a Person.
