// Single source of truth for business facts used in meta tags, JSON-LD,
// sitemap and llms.txt. Keep NAP (name / address / phone) identical to the
// Google Business Profile and every directory listing.

export const SITE_URL = 'https://www.newral.in'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const BUSINESS = {
  name: 'Newral',
  legalName: 'Newral',
  // Google Business Profile is currently listed as 'Newral Softwares'
  alternateName: 'Newral Softwares',
  googleMaps: 'https://www.google.com/maps?cid=6361634767920352795',
  tagline: 'Product design, development and DevOps agency in Noida, Delhi NCR',
  description:
    'Newral is a product design and software development agency in Sector 62, Noida (Delhi NCR) that helps startups and growing businesses design, build and scale digital products — UI/UX design, branding, web and mobile app development, SaaS and custom software, AI automation and DevOps.',
  email: 'tech@newral.in',
  telephone: '+91-8826574478',
  whatsapp: '+918826574478',
  bookingUrl: 'https://cal.com/newralfounder',
  logo: `${SITE_URL}/newral-favicon.png`,
  image: `${SITE_URL}/og-cover.jpg`,
  foundingDate: '2024',
  // Open 24/7 — keep identical to the Google Business Profile hours.
  hours247: true,
  address: {
    streetAddress: '412, 4th Floor, Tower-B, i-thum Building, Sector 62',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201309',
    addressCountry: 'IN',
  },
  geo: { latitude: 28.628, longitude: 77.3649 },
  areaServed: ['Noida', 'Greater Noida', 'Delhi', 'New Delhi', 'Gurugram', 'Ghaziabad', 'Faridabad', 'Delhi NCR', 'India'],
  // Official profiles. Add Clutch, GoodFirms, Google Business Profile, Crunchbase
  // and Justdial URLs here as soon as they exist — they power entity recognition.
  sameAs: [
    'https://www.instagram.com/newral.in',
    'https://www.linkedin.com/company/newraloffical/',
    'https://dribbble.com/newral',
    'https://www.google.com/maps?cid=6361634767920352795',
  ],
}

// Founder — name must match LinkedIn / X / Cal.com spelling exactly for entity matching.
export const FOUNDER = {
  name: 'Yash Rajan Shukla',
  jobTitle: 'Founder',
  image: `${SITE_URL}/assets/dreamTeam_5.webp`,
  linkedin: 'https://www.linkedin.com/in/yashrajanshukla',
  sameAs: ['https://www.linkedin.com/in/yashrajanshukla', 'https://x.com/manwithcodes'],
}

// Newral's own product. `id` must match the Organization @id on synappses.in,
// which points back here via parentOrganization.
export const PRODUCT = {
  name: 'Synappses',
  url: 'https://synappses.in',
  id: 'https://synappses.in/#organization',
  description: 'White-label LMS and creator commerce platform',
}

export const SOCIAL = {
  instagram: 'https://www.instagram.com/newral.in',
  linkedin: 'https://www.linkedin.com/company/newraloffical/',
  dribbble: 'https://dribbble.com/newral',
}

const WHATSAPP_TEXT = 'Hi Newral, I am interested in working with you on a web / app project.'
export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(WHATSAPP_TEXT)}`

// Real client testimonials (shown on the site). Only add reviews that are
// genuine and verifiable — fabricated review markup risks a Google manual action.
export const TESTIMONIALS = [
  {
    name: 'Mohit Tyagi',
    role: 'Founder, Competishun',
    quote:
      "Newral is handling complete tech with top most efficiency, they helped us completely transform our platform's performance and scalability. From major cost optimization to faster video delivery and a smoother user experience, their execution was exceptional. The platform is now more stable, efficient, and growth-ready.",
  },
  {
    name: 'Ashton Cofer',
    role: 'Co-Founder & CTO of FIZZ | Forbes 30U30',
    quote:
      'Newral has been a valuable partner in our growth journey. Their scalable monitoring solutions and efficient DevOps workflows brought stability and clarity to our operations. We highly recommend their services.',
  },
  {
    name: 'Sameer Bansal',
    role: 'Founder, Bansal Classes',
    quote:
      'Newral helped us upgrade our technology at Bansal Classes with ease. Their strong software development support improved our operational efficiency and enhanced the overall student experience.',
  },
  {
    name: 'Abhimanyu Kumawat',
    role: 'Founder, OTT Bharat, Neetkakajee',
    quote:
      'Yash and his team built our OTT Bharat app with precision and professionalism. Their team delivered a user-friendly platform. And now they are handling tech of NeetKakaJEE (the parent company).',
  },
]

export const CLIENTS = ['Competishun', 'Bansal Classes', 'FIZZ', 'NEET Kaka JEE', 'OTT Bharat', 'Omega Elevators', 'Up-to']

export const absUrl = (path = '/') => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)

// Bump when page copy changes meaningfully — used as <lastmod> in sitemap.xml
// for non-blog pages. Blog posts use their own `updated` / `date` fields.
export const CONTENT_UPDATED = '2026-10-19'
