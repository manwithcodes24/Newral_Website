// Service landing-page content. Each entry drives one of the individual SEO pages.
// Keep titles short (display font), descriptions keyword-rich + Noida/Delhi NCR local.

export const SERVICES = [
  {
    slug: 'ui-ux-design-noida',
    nav: 'UI/UX Design',
    color: '#176FF3',
    metaTitle: 'UI/UX Design Agency in Noida, Sector 62 | Newral',
    metaDescription:
      'Top UI/UX design agency in Noida, Sector 62. Newral designs intuitive websites, web apps & mobile apps for startups across Delhi NCR. Research-led, conversion-focused. Book a free call.',
    eyebrow: 'UI/UX Design Agency · Noida, Sector 62',
    h1: 'UI/UX Design Agency in Noida',
    h1Serif: 'that users love',
    intro:
      'Newral is a UI/UX design agency in Noida, Sector 62, helping startups and growing businesses across Delhi NCR turn complex products into clean, intuitive experiences. From user research and UX audits to Figma prototypes and pixel-perfect mobile app interfaces, we design digital products that reduce friction, boost engagement and convert visitors into loyal customers.',
    whyHeading: 'Own a design team',
    whyHeadingSerif: 'for the price of one mid hire',
    whyText: 'No handoff delays. No communication gaps. We operate as a direct extension of your product team to ship pixel-perfect layouts — verified by user metrics — directly to code.',
    processHeading: 'design process',
    metricsSubtitle: 'Aesthetic Design, Measurable Results',
    metricsTitle: 'Design that drives',
    metricsTitleSerif: 'business outcomes',
    metrics: [
      {
        type: 'funnel',
        title: 'Conversion Funnel Lift',
        desc: 'A cleaner information architecture and intuitive flow cut drop-offs. Typical signup and checkout improvement after a Newral redesign.',
        data: [
          { label: 'Visits', percent: '100%', width: '100%', bg: '#E2E8F0' },
          { label: 'Signups', percent: '78% (+22% lift)', width: '78%', bg: 'accent' },
          { label: 'Activation', percent: '56% (2x increase)', width: '56%', bg: '#0F172A' }
        ]
      },
      {
        type: 'chart',
        title: 'Day-30 User Retention',
        desc: 'Intuitive onboarding flows and clear navigation directly improve day-30 retention and reduce churn for SaaS and mobile apps.',
        legendAfter: 'After Newral UI/UX',
        legendBefore: 'Before Redesign'
      },
      {
        type: 'radial',
        title: 'Lighthouse & Accessibility',
        desc: 'WCAG-compliant, semantic markup and optimized assets — every interface we ship scores high on performance and accessibility audits.',
        items: [
          { label: 'Performance', val: 98, color: '#10B981' },
          { label: 'Accessibility', val: 100, color: 'accent' }
        ]
      }
    ],
    included: [
      {
        title: 'UI/UX Consulting',
        desc: 'Get expert guidance to untangle complex product challenges. Our Noida-based UX consultants audit your current experience, map user journeys and recommend prioritized design changes that directly move your key metrics.',
        image: '/assets/services_bento_web.webp'
      },
      {
        title: 'UX Research',
        desc: 'Make design decisions backed by real data, not assumptions. We conduct interviews, surveys, heatmap analysis and competitive benchmarking to uncover what your Delhi NCR and global users actually need.',
        image: '/assets/services_bento_ds.webp'
      },
      {
        title: 'Usability Testing',
        desc: 'Catch friction before it costs you users. We run moderated and unmoderated usability tests on your website, web app or mobile app, then deliver a clear report with ranked issues and design fixes.',
        image: '/assets/services_bento_devops.webp'
      },
      {
        title: 'Wireframing & Prototyping',
        desc: 'Validate ideas fast and cheaply. We build low-fi wireframes and click-through Figma prototypes that let you test user journeys, gather stakeholder feedback and align the team before a single line of code is written.',
        image: '/assets/services_bento_mobile.webp'
      },
      {
        title: 'UX Audit',
        desc: 'Discover exactly why users drop off. We analyse your product\'s flows, visual hierarchy and usability heuristics to identify friction points, then deliver a prioritized action plan to lift engagement and conversion rates.',
        image: '/assets/services_bento_saas.webp'
      },
      {
        title: 'Design System Audit',
        desc: 'Eliminate inconsistency across your product. We evaluate your component library, token structure and style guidelines, then align everything so designer-developer handoff is faster, cheaper and error-free.',
        image: '/assets/services_bento_uiux.webp'
      },
    ],
    why: [
      { title: 'Startup-first mindset', desc: 'We embed in your product team — fast iterations, async-friendly collaboration and zero hand-off delays between design and code.' },
      { title: 'Research-led decisions', desc: 'Every layout, flow and micro-interaction is grounded in user behaviour data and your business goals, not gut feel.' },
      { title: 'Local to Sector 62, Noida', desc: 'Walk-in meetings, same-timezone sprints, and on-site workshops — easy when we\'re 10 minutes away across Delhi NCR.' },
      { title: 'Design that ships to code', desc: 'Developer-ready Figma files, documented design tokens and direct collaboration with our dev team so the live product matches the mockup.' },
    ],
    process: [
      { title: 'Discover', desc: 'A deep-dive kickoff: we audit your product, interview stakeholders, and map user goals to business objectives before touching Figma.' },
      { title: 'Design', desc: 'Wireframes evolve into polished, on-brand high-fidelity interfaces — shared in Figma with structured feedback rounds at every milestone.' },
      { title: 'Prototype & Test', desc: 'Interactive prototypes are tested with real users from your target segment. We iterate until every flow feels effortless and conversion-ready.' },
      { title: 'Handoff', desc: 'Developer-ready specs, annotated Figma files, an asset library and a living design system — plus hands-on support through the build phase.' },
    ],
    faqs: [
      { q: 'How much does UI/UX design cost in Noida?', a: 'Pricing depends on scope — a single landing page redesign is very different from a full SaaS product. After a short discovery call we share a fixed-fee quote with clear milestones, so there are no billing surprises.' },
      { q: 'How long does a UI/UX design project take?', a: 'Most projects run 2–8 weeks depending on the number of screens and the depth of research required. We share a sprint-by-sprint timeline once we understand your requirements.' },
      { q: 'Do you redesign existing websites and apps?', a: 'Yes, this is a big part of what we do. We start with a UX audit and usability testing to pinpoint what is holding your product back, then redesign for clarity, conversions and brand consistency.' },
      { q: 'Do you also build the designs you create?', a: 'Yes — Newral offers web and app development under the same roof, so your Figma designs go directly into a live, production-ready product without any re-interpretation.' },
      { q: 'What tools do you use for UI/UX design?', a: 'We work primarily in Figma for UI design and prototyping, Maze or UserTesting for usability research, and Lottie or Rive for motion design. We can adapt to your existing toolchain.' },
      { q: 'Do you work with clients outside Noida and Delhi NCR?', a: 'Absolutely. We are headquartered in Sector 62, Noida, but collaborate with startups and product teams across India, the US, UK and Southeast Asia through regular video syncs and async Figma reviews.' },
    ],
  },
  {
    slug: 'graphic-design-noida',
    nav: 'Graphic Design',
    color: '#0077FF',
    metaTitle: 'Graphic Design & Branding Agency in Noida | Newral',
    metaDescription:
      'Graphic design & branding agency in Noida, Sector 62. Newral crafts logos, brand identities, pitch decks & marketing creatives for startups across Delhi NCR. Book a call.',
    eyebrow: 'Graphic Design & Branding · Noida, Sector 62',
    h1: 'Graphic Design Agency in Noida',
    h1Serif: 'that builds brands',
    intro:
      'Newral is a graphic design and branding agency in Noida, Sector 62, helping startups and businesses across Delhi NCR stand out with sharp, consistent and memorable visuals. From logo design and complete brand identity systems to investor pitch decks, social creatives and print collateral — we craft every asset with strategy and craft so your brand earns trust from the very first impression.',
    whyHeading: 'Get elite branding',
    whyHeadingSerif: 'without the big agency fee',
    whyText: 'Stand out from day one. We craft distinctive logo systems, social media assets and sales materials that build instant credibility with clients, customers and investors.',
    processHeading: 'creative process',
    metricsSubtitle: 'Impactful Assets, Consistent Identity',
    metricsTitle: 'Branding that commands',
    metricsTitleSerif: 'attention',
    metrics: [
      {
        type: 'funnel',
        title: 'Ad CTR Lift with On-Brand Creatives',
        desc: 'Consistent, eye-catching brand visuals increase click-through rates across paid and organic campaigns — and lower your cost per acquisition.',
        data: [
          { label: 'Impressions', percent: '100%', width: '100%', bg: '#E2E8F0' },
          { label: 'Clicks', percent: '4.8% CTR (3x lift)', width: '75%', bg: 'accent' },
          { label: 'Conversions', percent: '1.2% Conversion', width: '45%', bg: '#0F172A' }
        ]
      },
      {
        type: 'chart',
        title: 'Brand Consistency Score',
        desc: 'A single style guide eliminates brand dilution across channels. Consistent typography, colour and tone build recognition faster than ad spend alone.',
        legendAfter: 'Unified Brand System',
        legendBefore: 'Ad-hoc Creatives'
      },
      {
        type: 'radial',
        title: 'Brand Trust & Recall',
        desc: 'A professionally designed brand identity measurably increases customer trust and purchase confidence, especially for early-stage startups.',
        items: [
          { label: 'Trust Index', val: 95, color: '#10B981' },
          { label: 'Recall Rate', val: 92, color: 'accent' }
        ]
      }
    ],
    included: [
      { title: 'Logo Design', desc: 'A distinctive, versatile logo system that captures your brand\'s personality and works flawlessly across digital, print and environmental applications — from favicons to hoardings.', image: '/assets/services_bento_web.webp' },
      { title: 'Brand Identity System', desc: 'A complete visual identity: primary and secondary colour palettes, typography hierarchy, iconography, imagery style and grid system — all documented in a brand book your team can actually use.', image: '/assets/services_bento_ds.webp' },
      { title: 'Marketing & Social Creatives', desc: 'Thumb-stopping creatives for Instagram, LinkedIn, Google Display and Meta Ads. We design templates and campaign assets that stay on-brand at scale across all your Delhi NCR and national marketing.', image: '/assets/services_bento_devops.webp' },
      { title: 'Pitch & Sales Decks', desc: 'Investor decks and sales presentations that make your business story clear, visually compelling and impossible to forget — designed to help you close funding rounds and enterprise deals.', image: '/assets/services_bento_mobile.webp' },
      { title: 'Packaging & Print', desc: 'Premium packaging design, product labels, brochures and trade show collateral crafted to look high-end on shelf, in hand and in front of buyers.', image: '/assets/services_bento_saas.webp' },
      { title: 'Brand Guidelines', desc: 'A clear, comprehensive brand playbook covering logo usage, colour, type, tone of voice and do\'s and don\'ts — so every teammate, vendor and agency applies your brand correctly every time.', image: '/assets/services_bento_uiux.webp' },
    ],
    why: [
      { title: 'Strategy before aesthetics', desc: 'We start with your positioning, audience and competitive landscape so every creative decision is grounded in what will actually make your brand win.' },
      { title: 'Consistency at scale', desc: 'We build systems and guidelines, not just one-off files — so your brand stays cohesive as you grow across channels, markets and team members.' },
      { title: 'Local to Sector 62, Noida', desc: 'Same timezone, fast turnarounds and easy walk-in collaboration for teams across Noida, Greater Noida and Delhi NCR.' },
      { title: 'Design that converts', desc: 'Beautiful isn\'t enough — every creative we ship is built to earn attention, communicate value and drive the action you need from your audience.' },
    ],
    process: [
      { title: 'Brief & Discover', desc: 'We deep-dive into your brand story, target audience, competitors and communication goals before any concept work begins.' },
      { title: 'Explore', desc: 'We present 2–3 distinct creative directions — each a deliberate strategic choice — so you select with confidence, not compromise.' },
      { title: 'Refine', desc: 'We develop and polish the chosen direction through structured feedback rounds until every detail is exactly right.' },
      { title: 'Deliver', desc: 'Final production files, brand guidelines, usage examples and exports in every format you need — ready to roll out immediately.' },
    ],
    faqs: [
      { q: 'What graphic design services does Newral offer in Noida?', a: 'Logo design, full brand identity systems, social and marketing creatives, investor pitch decks, sales presentations, packaging design, print collateral and comprehensive brand guidelines — all under one roof in Sector 62, Noida.' },
      { q: 'How much does a logo or brand identity cost in Noida?', a: 'A standalone logo starts at a different price point than a complete brand identity system with guidelines. We share a transparent, fixed-fee quote based on your specific scope after a short discovery call.' },
      { q: 'How many design revisions are included?', a: 'We work iteratively with structured feedback rounds. You can request refinements within the agreed scope at each stage, and we continue until you are genuinely satisfied with the direction.' },
      { q: 'Will I receive editable source files?', a: 'Yes — you get full ownership of all source files (AI, EPS, PSD, Figma) plus exports in every format you need: SVG, PNG, PDF and more. No lock-in.' },
      { q: 'Can you extend or refresh our existing brand?', a: 'Absolutely. Whether you need a full rebrand, a brand refresh or just to add new assets that align with your existing guidelines, we can audit what you have and take it forward.' },
      { q: 'Do you create social media content on an ongoing basis?', a: 'Yes. Beyond one-off brand projects, we offer monthly creative retainers for social media design, ad creatives and content templates for startups and growing teams.' },
    ],
  },
  {
    slug: 'app-development-noida',
    nav: 'App Development',
    color: '#2563EB',
    metaTitle: 'Mobile App Development Company in Noida, Delhi NCR | Newral',
    metaDescription:
      'Mobile app development company in Noida, Sector 62. Newral builds fast, scalable iOS, Android & React Native apps for startups across Delhi NCR. Book a free consultation.',
    eyebrow: 'Mobile App Development · Noida, Sector 62',
    h1: 'App Development Company in Noida',
    h1Serif: 'built to scale',
    intro:
      'Newral is a mobile app development company in Noida, Sector 62, building fast, scalable and design-polished iOS, Android and cross-platform apps for startups and businesses across Delhi NCR. From scoping your MVP to App Store and Play Store submission, our engineering and design teams work together so your product launches strong, performs reliably and grows smoothly from your first user to your millionth.',
    whyHeading: 'Own a mobile engineering team',
    whyHeadingSerif: 'at a fraction of in-house costs',
    whyText: 'We design and build native-quality apps with clean, modular architecture. Our integrated engineering and UI/UX team handles everything from API design to App Store submission.',
    processHeading: 'engineering process',
    metricsSubtitle: 'Reliable Architecture, Fluid Interactions',
    metricsTitle: 'Apps engineered for',
    metricsTitleSerif: 'high performance',
    metrics: [
      {
        type: 'funnel',
        title: 'First-Open Onboarding Rate',
        desc: 'Optimised splash screens, progressive onboarding and fast API calls keep users moving from install to activated — with minimal drop-off in the critical first session.',
        data: [
          { label: 'Installs', percent: '100%', width: '100%', bg: '#E2E8F0' },
          { label: 'Onboarding', percent: '92% completed', width: '92%', bg: 'accent' },
          { label: 'Active Users', percent: '84% Retained (Day 7)', width: '84%', bg: '#0F172A' }
        ]
      },
      {
        type: 'chart',
        title: 'Crash-Free Session Rate',
        desc: 'Rigorous automated testing, memory optimization and CI-gated builds keep apps stable and error-free from beta through high-traffic production.',
        legendAfter: 'Production Build',
        legendBefore: 'Initial Beta'
      },
      {
        type: 'radial',
        title: 'App Store Approval Score',
        desc: 'Clean code, guideline compliance and thorough QA mean our apps clear iOS App Store and Google Play Store review on the first submission, every time.',
        items: [
          { label: 'Crash-Free %', val: 99, color: '#10B981' },
          { label: 'Speed Score', val: 96, color: 'accent' }
        ]
      }
    ],
    included: [
      { title: 'iOS App Development', desc: 'Native Swift apps for iPhone and iPad — built to Apple\'s Human Interface Guidelines with smooth 120fps animations, deep OS integrations and App Store-ready architecture.', image: '/assets/services_bento_web.webp' },
      { title: 'Android App Development', desc: 'Robust, performant Android apps built with Kotlin and Jetpack Compose, optimised for the full fragmented device landscape from budget phones to flagship tablets.', image: '/assets/services_bento_ds.webp' },
      { title: 'Cross-Platform Apps (React Native / Flutter)', desc: 'One high-quality codebase that ships to both iOS and Android. React Native and Flutter let us move 40–60% faster than two separate native builds, without sacrificing feel or performance.', image: '/assets/services_bento_devops.webp' },
      { title: 'API Design & Backend Development', desc: 'Secure, scalable REST or GraphQL APIs and backends — built on Node.js, Python or cloud-native services — that power your app reliably from MVP through hypergrowth.', image: '/assets/services_bento_mobile.webp' },
      { title: 'MVP Development', desc: 'Go from idea to a lean, investor-ready mobile MVP in 6–10 weeks. We scope ruthlessly, build fast and instrument everything so you get real user feedback on day one.', image: '/assets/services_bento_saas.webp' },
      { title: 'App Maintenance & Support', desc: 'OS updates, dependency patches, performance monitoring and new feature rollouts — we keep your app current, secure and five-star rated after launch.', image: '/assets/services_bento_uiux.webp' },
    ],
    why: [
      { title: 'Design + engineering as one team', desc: 'Our UI/UX designers and mobile engineers collaborate from day one — no handoff gap, no re-interpretation. The app you test in Figma is the app that ships.' },
      { title: 'Scalable, maintainable architecture', desc: 'Clean module boundaries, typed APIs and automated test suites mean your codebase is easy to extend, hand over or scale from 100 to 1 million users.' },
      { title: 'Local to Sector 62, Noida', desc: 'Same timezone, walk-in available and close to tech hubs across Noida and Delhi NCR — fast sprints with direct communication and zero async lag.' },
      { title: 'End-to-end ownership', desc: 'We handle design, development, QA, store submission and post-launch support — so you have one accountable partner, not a fragmented vendor list.' },
    ],
    process: [
      { title: 'Scope & Roadmap', desc: 'We map your must-have features, choose the right platform and tech stack, and build a realistic sprint roadmap before any code is written.' },
      { title: 'Design & Prototype', desc: 'Wireframes and high-fidelity Figma prototypes bring every key flow to life — tested and approved by you before engineering begins.' },
      { title: 'Build', desc: 'Agile two-week sprints with live demo access every fortnight. You see real progress, test on device and give feedback in real time throughout the build.' },
      { title: 'Launch & Grow', desc: 'End-to-end QA, App Store and Play Store submission, staged rollout and post-launch monitoring — with ongoing support as you add features and users.' },
    ],
    faqs: [
      { q: 'How much does mobile app development cost in Noida?', a: 'Cost depends on the number of features, platforms and backend complexity. A focused MVP typically costs less than a feature-rich production app. After a discovery call we provide a detailed, fixed-fee estimate with a clear scope and sprint breakdown.' },
      { q: 'Should I build native iOS and Android, or cross-platform?', a: 'For most startups and product companies, cross-platform (React Native or Flutter) delivers 80–90% of native performance at significantly lower cost and time-to-market. We recommend native only when you need deep OS integrations like AR, advanced camera pipelines or hardware Bluetooth.' },
      { q: 'How long does it take to build a mobile app?', a: 'A focused MVP typically takes 6–10 weeks; a fully featured production app takes 12–20 weeks or more depending on scope. We share a sprint-based timeline and milestone map once requirements are finalised.' },
      { q: 'Do you handle UI/UX design as well as development?', a: 'Yes. Design and engineering are the same team at Newral — there is no handoff friction. Your app is designed and built with the same people, ensuring the live product matches the prototype exactly.' },
      { q: 'Can you build the backend and API for the app too?', a: 'Yes. We design and build secure, scalable backends and APIs alongside the app, ensuring the architecture is aligned from day one rather than stitched together later.' },
      { q: 'Do you provide maintenance and support after the app launches?', a: 'Yes — we offer monthly maintenance retainers covering OS compatibility updates, bug fixes, dependency patches and feature additions, keeping your app performant and highly rated on the stores.' },
    ],
  },
  {
    slug: 'web-development-noida',
    nav: 'Web Development',
    color: '#3B82F6',
    metaTitle: 'Web Development Company in Noida, Delhi NCR | Newral',
    metaDescription:
      'Web development company in Noida, Sector 62. Newral builds fast, responsive, SEO-optimized websites & web apps for startups across Delhi NCR. Book a free consultation.',
    eyebrow: 'Web Development · Noida, Sector 62',
    h1: 'Web Development Company in Noida',
    h1Serif: 'fast & SEO-ready',
    intro:
      'Newral is a web development company in Noida, Sector 62, building conversion-focused websites and web applications for startups and businesses across Delhi NCR. Every site we build is responsive, lightning-fast on mobile and desktop, and SEO-optimized from the first line of code — so you rank on Google, load in under a second and turn visitors into paying customers.',
    whyHeading: 'Hire elite web developers',
    whyHeadingSerif: 'without recruitment overhead',
    whyText: 'We build lightning-fast websites and web apps optimized for conversions and search engines. Our code is clean, semantic and architected to scale with your business.',
    processHeading: 'development process',
    metricsSubtitle: 'Lightning Fast Loads, SEO-Ready Core',
    metricsTitle: 'Websites optimized for',
    metricsTitleSerif: 'growth & speed',
    metrics: [
      {
        type: 'funnel',
        title: 'Google Lighthouse Performance',
        desc: 'Modern bundling, image optimization, lazy loading and CDN delivery keep every page we build scoring 95+ on Google Lighthouse — straight out of the box.',
        data: [
          { label: 'FCP (First Paint)', percent: '0.4s', width: '100%', bg: '#E2E8F0' },
          { label: 'Speed Index', percent: '0.8s (Under limit)', width: '90%', bg: 'accent' },
          { label: 'Time to Interactive', percent: '1.1s (Fast)', width: '85%', bg: '#0F172A' }
        ]
      },
      {
        type: 'chart',
        title: 'Organic Search Traffic Growth',
        desc: 'Semantic HTML5, structured data markup, fast page speeds and on-page SEO built into every page translate directly into higher rankings and more organic visitors.',
        legendAfter: 'Newral-Built SEO Site',
        legendBefore: 'Legacy Website'
      },
      {
        type: 'radial',
        title: 'Core Web Vitals Score',
        desc: 'LCP, CLS and INP all green. Every website we ship passes Google\'s Core Web Vitals thresholds, a direct ranking signal in search results.',
        items: [
          { label: 'Performance', val: 100, color: '#10B981' },
          { label: 'SEO Score', val: 100, color: 'accent' }
        ]
      }
    ],
    included: [
      { title: 'Business & Marketing Websites', desc: 'Modern, fully responsive marketing websites built on React, Next.js or Webflow — designed to load fast, rank on Google and convert visitors into leads and sales for your Noida or Delhi NCR business.', image: '/assets/services_bento_web.webp' },
      { title: 'Web Apps & SaaS Platforms', desc: 'Scalable, secure web applications with clean architecture, real-time features and smooth UX — built for SaaS products, internal tools, dashboards and customer-facing platforms.', image: '/assets/services_bento_ds.webp' },
      { title: 'High-Converting Landing Pages', desc: 'Performance-optimized landing pages for product launches, ad campaigns and lead generation — built for speed, A/B testing and maximum conversion rate from day one.', image: '/assets/services_bento_devops.webp' },
      { title: 'E-Commerce Development', desc: 'Secure, scalable online stores on Shopify, WooCommerce or custom-built — optimized for fast checkout, mobile UX and search visibility to maximize average order value.', image: '/assets/services_bento_mobile.webp' },
      { title: 'Headless CMS & Content Sites', desc: 'Edit your own content without touching code. We build on modern CMS platforms — Sanity, Contentful or WordPress headless — giving you full control and developers clean APIs.', image: '/assets/services_bento_saas.webp' },
      { title: 'Performance & Technical SEO', desc: 'Core Web Vitals optimization, semantic HTML, schema markup, clean URL structures and on-page SEO implemented from day one — not as an afterthought.', image: '/assets/services_bento_uiux.webp' },
    ],
    why: [
      { title: 'Speed is a feature', desc: 'We obsess over Core Web Vitals, bundle size and time-to-interactive — because a fast site outranks slow competitors and keeps users from bouncing.' },
      { title: 'SEO baked in from line one', desc: 'Semantic HTML5, structured data, meta tags, sitemaps and clean architecture so your site is Google-ready the day it launches.' },
      { title: 'Local to Sector 62, Noida', desc: 'Close enough for in-person sprint reviews and design walkthroughs — covering the full Delhi NCR corridor including Greater Noida, Gurugram and Delhi.' },
      { title: 'Design and development as one', desc: 'Our designers and engineers build together, not in sequence — so the site that goes live looks exactly like the approved design, with no handoff surprises.' },
    ],
    process: [
      { title: 'Plan & Architect', desc: 'We map your pages, user journeys and technical requirements — choosing the right stack and CMS for your goals before any design or code begins.' },
      { title: 'Design', desc: 'On-brand, responsive layouts built in Figma, reviewed and approved by you — covering desktop, tablet and mobile breakpoints before development starts.' },
      { title: 'Build & Test', desc: 'Clean, performant, SEO-ready code delivered in fortnightly sprint demos. We test across browsers and devices and hit green on every Core Web Vital before launch.' },
      { title: 'Launch & Support', desc: 'Staged go-live, redirect audits, analytics setup, Google Search Console verification and post-launch performance monitoring to make sure everything is running perfectly.' },
    ],
    faqs: [
      { q: 'How much does website development cost in Noida?', a: 'A brochure or landing page website costs significantly less than a full web application or e-commerce platform. Every project gets a transparent, fixed-fee quote with a clear scope — no hourly surprises — after a short discovery call.' },
      { q: 'Will my new website be SEO-friendly?', a: 'Yes, without exception. We build every site with semantic HTML5, structured data (schema.org), fast load times, optimised metadata and a clean URL structure — so it\'s ready to rank from launch day without additional SEO work.' },
      { q: 'How long does a website build take in Noida?', a: 'A focused marketing website typically takes 3–5 weeks; a web app or e-commerce site takes 6–12 weeks depending on features. We share a detailed milestone plan upfront so you know exactly when to expect each deliverable.' },
      { q: 'Can my team update the website content themselves?', a: 'Yes. We can build your site on a headless or traditional CMS — Sanity, Contentful or WordPress — so your team can publish blogs, update pages and manage content without developer help.' },
      { q: 'Do you redesign and rebuild existing websites?', a: 'Yes, and we go deeper than a visual facelift. We audit your current site for speed, SEO, UX and conversion rate first, then rebuild it with targeted improvements to make it genuinely perform better.' },
      { q: 'What technologies do you use for web development?', a: 'We primarily build with React, Next.js, TypeScript and Tailwind CSS for frontend, Node.js or Python for backends, and deploy on Vercel, AWS or Netlify. We choose the stack that best fits your project goals and long-term maintainability.' },
    ],
  },
  {
    slug: 'devops-noida',
    nav: 'DevOps',
    color: '#1D4ED8',
    metaTitle: 'DevOps Services Company in Noida, Delhi NCR | Newral',
    metaDescription:
      'DevOps services company in Noida, Sector 62. Newral builds CI/CD pipelines, cloud infrastructure (AWS/GCP/Azure) & automated deployments for startups across Delhi NCR.',
    eyebrow: 'DevOps & Cloud Infrastructure · Noida',
    h1: 'DevOps Services in Noida',
    h1Serif: 'reliable & scalable',
    intro:
      'Newral provides DevOps and cloud infrastructure services in Noida, Sector 62, helping startups and product teams across Delhi NCR ship software faster, cheaper and with far greater reliability. From CI/CD pipeline setup and Kubernetes orchestration to AWS/GCP/Azure infrastructure as code and 24x7 monitoring — we engineer the infrastructure backbone that lets your developers focus on features, not firefighting.',
    whyHeading: 'Deploy a cloud infrastructure team',
    whyHeadingSerif: 'on demand',
    whyText: 'Deploy infrastructure as code, build automated CI/CD pipelines, and monitor production in real time. We engineer 99.99% uptime and continuously optimize your cloud spend.',
    processHeading: 'deployment process',
    metricsSubtitle: 'Zero-Downtime Deployments, Hardened Security',
    metricsTitle: 'Infrastructure engineered for',
    metricsTitleSerif: 'reliability',
    metrics: [
      {
        type: 'funnel',
        title: 'Deployment Lead Time Reduction',
        desc: 'Replacing manual deploy scripts with automated CI/CD pipelines slashes lead time from hours to minutes — letting teams ship multiple times a day with confidence.',
        data: [
          { label: 'Manual Build', percent: '45 mins', width: '100%', bg: '#E2E8F0' },
          { label: 'CI/CD Pipeline', percent: '4.5 mins (10x faster)', width: '85%', bg: 'accent' },
          { label: 'Hotfix Deploy', percent: '2 mins (instant rollout)', width: '95%', bg: '#0F172A' }
        ]
      },
      {
        type: 'chart',
        title: 'Cloud Cost Trend',
        desc: 'Auto-scaling, resource right-sizing and cleanup of orphaned assets can reduce monthly cloud bills by 30–50% without touching performance or availability.',
        legendAfter: 'Newral-Optimized Infrastructure',
        legendBefore: 'Legacy / Over-provisioned Setup'
      },
      {
        type: 'radial',
        title: 'Uptime & Security Score',
        desc: 'Proactive monitoring, automated alerts and hardened access controls keep your services online and secure — with fast incident response when the unexpected happens.',
        items: [
          { label: 'Uptime %', val: 99, color: '#10B981' },
          { label: 'Security Score', val: 94, color: 'accent' }
        ]
      }
    ],
    included: [
      { title: 'CI/CD Pipeline Setup', desc: 'Fully automated build, test and deploy pipelines using GitHub Actions, GitLab CI or CircleCI — with branch protection, automated rollbacks and environment promotion baked in so you ship with confidence multiple times a day.', image: '/assets/services_bento_web.webp' },
      { title: 'Cloud Infrastructure (AWS / GCP / Azure)', desc: 'Scalable, cost-optimised cloud environments built with Terraform or Pulumi infrastructure as code — reproducible, version-controlled and easy to audit or modify as your product grows.', image: '/assets/services_bento_ds.webp' },
      { title: 'Containerisation & Kubernetes', desc: 'Docker containerisation and Kubernetes orchestration that auto-scale under traffic spikes, self-heal on failures and enable zero-downtime blue-green or canary deployments.', image: '/assets/services_bento_devops.webp' },
      { title: 'Monitoring, Logging & Alerting', desc: 'End-to-end observability with Datadog, Grafana, Prometheus or ELK Stack — custom dashboards, SLO tracking and on-call alert routing so your team knows about issues before users do.', image: '/assets/services_bento_mobile.webp' },
      { title: 'Security Hardening & Compliance', desc: 'IAM policy audits, secrets management with Vault or AWS Secrets Manager, network segmentation, vulnerability scanning and compliance controls for SOC 2, ISO 27001 and GDPR requirements.', image: '/assets/services_bento_saas.webp' },
      { title: 'Cloud Cost Optimisation', desc: 'Rightsizing compute, eliminating idle resources, implementing reserved and spot instance strategies and setting up cost dashboards — typically cutting cloud spend by 25–50% without sacrificing SLAs.', image: '/assets/services_bento_uiux.webp' },
    ],
    why: [
      { title: 'Reliability by design', desc: 'We engineer for uptime from the architecture phase — multi-AZ deployments, automated failover and chaos-tested runbooks — so reliability is built in, not bolted on.' },
      { title: 'Automation-first culture', desc: 'Every manual step we automate is one fewer source of human error. Faster releases, repeatable environments and zero-drift infrastructure by default.' },
      { title: 'Local to Sector 62, Noida', desc: 'On-site audits, war room sessions and same-timezone incident response — we\'re close to your team across the full Delhi NCR corridor when it matters most.' },
      { title: 'Knowledge transfer included', desc: 'We document everything, run internal workshops and upskill your engineers so you own your infrastructure and are never dependent on a single vendor.' },
    ],
    process: [
      { title: 'Assess', desc: 'We audit your existing stack, deployment workflows, cloud spend and security posture — identifying quick wins and systemic risks before making any changes.' },
      { title: 'Architect', desc: 'We design your target infrastructure: CI/CD pipeline stages, cloud topology, networking, monitoring strategy and disaster recovery — tailored to your product and team size.' },
      { title: 'Implement', desc: 'We build pipelines, provision infrastructure as code, configure observability and onboard your team — with change windows planned to minimize disruption to production.' },
      { title: 'Operate & Optimise', desc: 'Ongoing monitoring, incident response, cost reviews and quarterly architecture checks to keep your infrastructure lean, secure and evolving with your product.' },
    ],
    faqs: [
      { q: 'What DevOps services does Newral offer in Noida?', a: 'We cover the full DevOps spectrum: CI/CD pipeline design and setup, cloud infrastructure on AWS, GCP and Azure, Docker and Kubernetes, observability and monitoring, security hardening, and cloud cost optimisation — all from our Sector 62, Noida office.' },
      { q: 'Can Newral work with our existing cloud and CI/CD setup?', a: 'Yes. We start with a thorough audit of what you already have, identify what is working and what is blocking your team, and improve it incrementally — no big-bang migrations that risk production stability.' },
      { q: 'Will DevOps services reduce our AWS or cloud bill?', a: 'Almost always, yes. Right-sizing over-provisioned instances, eliminating idle resources, switching to reserved or spot instances and implementing proper auto-scaling typically cuts cloud spend by 25–50% within the first quarter.' },
      { q: 'Do you offer ongoing DevOps support and on-call coverage?', a: 'Yes. We offer monthly DevOps retainers covering proactive monitoring, incident response, security patching, pipeline maintenance and quarterly infrastructure reviews — or we can upskill your internal team to own it themselves.' },
      { q: 'How quickly can we see improvements after engaging Newral?', a: 'Quick wins like CI/CD setup, monitoring dashboards and automated alert routing typically go live within the first two to three weeks. Larger architecture changes are phased across 4–8 weeks to minimize risk.' },
      { q: 'Do you handle security and compliance (SOC 2, ISO 27001, GDPR)?', a: 'Yes. We implement IAM best practices, secrets management, network segmentation, vulnerability scanning and audit logging aligned with SOC 2, ISO 27001 and GDPR requirements — and can support you through formal certification audits.' },
    ],
  },
]

export const getService = (slug) => SERVICES.find((s) => s.slug === slug)
