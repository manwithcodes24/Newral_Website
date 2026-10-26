// JSON-LD builders. Every entity references the one Organization node by @id so
// search engines and LLMs resolve all pages to a single "Newral" entity.
import { SITE_URL, ORG_ID, WEBSITE_ID, BUSINESS, FOUNDER, PRODUCT, absUrl } from './site'
import { SERVICES } from '../data/services'

const orgRef = { '@id': ORG_ID }
export const FOUNDER_ID = `${SITE_URL}/#founder`

export function founderPerson() {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    image: FOUNDER.image,
    url: FOUNDER.linkedin,
    sameAs: FOUNDER.sameAs,
    worksFor: orgRef,
  }
}

export function organizationGraph() {
  const a = BUSINESS.address
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        alternateName: BUSINESS.alternateName,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: BUSINESS.logo },
        image: BUSINESS.image,
        description: BUSINESS.description,
        slogan: BUSINESS.tagline,
        email: BUSINESS.email,
        telephone: BUSINESS.telephone,
        foundingDate: BUSINESS.foundingDate,
        founder: { '@id': FOUNDER_ID },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        priceRange: '₹₹',
        currenciesAccepted: 'INR, USD',
        address: { '@type': 'PostalAddress', ...a },
        geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
        hasMap: BUSINESS.googleMaps,
        areaServed: BUSINESS.areaServed.map((name) =>
          name === 'India' ? { '@type': 'Country', name } : { '@type': 'City', name }
        ),
        sameAs: BUSINESS.sameAs,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: BUSINESS.telephone,
            email: BUSINESS.email,
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          },
        ],
        knowsAbout: [
          'UI/UX design', 'Product design', 'Design systems', 'Branding', 'Graphic design',
          'Web development', 'Mobile app development', 'React', 'React Native', 'Flutter', 'Next.js',
          'SaaS development', 'Custom software development', 'MVP development',
          'AI automation', 'DevOps', 'Cloud infrastructure', 'AWS', 'CI/CD',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Newral services',
          itemListElement: SERVICES.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.nav, url: absUrl(`/${s.slug}`) },
          })),
        },
        // No `review` here: reviews a business publishes about itself are not
        // eligible for review rich results and count as self-serving markup.
        // Testimonials stay as visible text on the page instead.
        subOrganization: {
          '@type': 'Organization',
          '@id': PRODUCT.id,
          name: PRODUCT.name,
          url: PRODUCT.url,
          description: PRODUCT.description,
        },
      },
      founderPerson(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: 'Newral',
        inLanguage: 'en-IN',
        publisher: orgRef,
      },
    ],
  }
}

export function webPage({ path, title, description, type = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${absUrl(path)}#webpage`,
    url: absUrl(path),
    name: title,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: orgRef,
  }
}

export function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absUrl(path),
    })),
  }
}

export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Service landing page: Service + FAQPage + BreadcrumbList
export function serviceJsonLd(s) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${absUrl(`/${s.slug}`)}#service`,
      name: s.h1,
      serviceType: s.nav,
      url: absUrl(`/${s.slug}`),
      description: s.metaDescription,
      provider: orgRef,
      areaServed: BUSINESS.areaServed,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${s.nav} services`,
        itemListElement: s.included.map((i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: i.title, description: i.desc },
        })),
      },
    },
    faqPage(s.faqs),
    breadcrumbs([['Home', '/'], ['Services', '/services'], [s.nav, `/${s.slug}`]]),
  ]
}
