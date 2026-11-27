# Authority plan: newral.in and synappses.in

27 Nov 2026. The technical base is solid (SEO-AUDIT.md); the gap is authority:
neither brand ranks for its own name plus its category. These steps build it.
**Every step marked YOU needs your login, account creation or a client's
permission.** Nothing here has been done yet.

Use the exact entity details from `NEWRAL-SYNAPPSES-KNOWLEDGE.md` everywhere
(name, address with 201309, phone +91 88265 74478, founder "Yash Rajan
Shukla"). Settle conflicts C1 (email) and C2 (phone) first.

## Week 1: measurement (YOU)
1. **Google Search Console**: add `https://www.newral.in` and `https://synappses.in` as Domain properties (DNS TXT record), submit `/sitemap.xml` for each. Request indexing for the new pages: `/fix-ai-built-app`, `/ai-chatbot-development`, `/white-label-app-development`, `/white-label-lms`, `/edtech`.
2. **Bing Webmaster Tools**: import both sites from Search Console (one click), submit sitemaps. Bing also feeds ChatGPT search and Copilot.
3. Fix the `newral.in` → `www` redirect to a permanent 308 in Vercel → Domains (audit item, still open).
4. Send me (or the next session) Search Console access after 8–12 weeks so the keyword plan can be re-ranked on real data.

## Week 1–2: Google Business Profile (YOU)
- Newral: the listing exists ("Newral Softwares"). Make the name, category ("Software company"; secondary "Website designer", "Mobile app developer"), hours and phone match `src/lib/site.js`. Add services matching the service pages, photos of the office and team, and a post per published article.
- Ask **real clients** for reviews: Competishun, Bansal Classes, FIZZ, OTT Bharat / NEET Kaka JEE. Never write reviews yourselves or offer incentives.
- Synappses: only create a separate GBP if Synappses has its own staffed presence at the address; otherwise list it as a product on Newral's profile. Two listings at one address with one phone can be merged or suspended.

## Week 2–4: listings (YOU create accounts; add each URL to `sameAs`)
Newral (agency directories; add each to `BUSINESS.sameAs` in `src/lib/site.js`):
- Clutch, GoodFirms, DesignRush, TechBehemoths, Sortlist: full profile, portfolio with the four case studies, ask clients for verified reviews.
- Crunchbase, LinkedIn company page (complete "About" with the one-line definition), Justdial, Sulekha, IndiaMART (services).
- GitHub organisation and Behance if they exist.

Synappses (SaaS directories; add each to `company.social` in `content/company.ts`):
- G2, Capterra / GetApp / Software Advice (one Gartner Digital Markets listing covers all three), SaaSworthy, Product Hunt launch, Crunchbase, TechJockey and SoftwareSuggest (India).
- Category on each: "Learning Management System" + "White-label LMS". Paste the definition sentence word for word.
- Ask Competishun and Bansal Classes for a G2/Capterra review.

## Month 2–3: backlinks that fit
- **Customer stories with numbers** (biggest gap for both brands): one Competishun or Bansal Classes story on `synappses.in/customers/<name>` and expanded case studies on newral.in, with figures the client approves in writing.
- **Data asset**: Synappses' "what course platforms really charge" comparison (`/blog/course-platform-fees-india`) is linkable. Pitch it to edtech newsletters and creator-economy writers (Inc42, YourStory, Entrackr, The Ken's edtech coverage; creator newsletters).
- **Founder content**: Yash posting on LinkedIn the problems from the new pages (fixing AI-built apps, scaling for exam-day traffic) and linking to the articles. Podcast/guest slots on Indian startup and edtech shows.
- **Partner pages**: tools you build on (e.g. Supabase/Vercel agency directories, AWS partner network once eligible) list agencies with links.
- Avoid paid link packages, PBNs and mass guest-post networks: they risk a manual action and do not move answer engines.

## Ongoing
- 2 articles a month per site through the blog pipeline (review every draft).
- Re-verify competitor pricing in `content/compare.ts` every quarter.
- Keep entity facts identical across both sites, GBP and every directory.
