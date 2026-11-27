import Hero from '../components/Hero'
import VideoSection from '../components/VideoSection'
import Logos from '../components/Logos'
import Pricing from '../components/Pricing'
import Projects from '../components/Projects'
import StatsSection from '../components/StatsSection'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Testimonial from '../components/Testimonial'
import HomeFaq from '../components/HomeFaq'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'
import { useSeo, SITE_URL } from '../hooks/useSeo'
import { ORG_ID } from '../lib/site'
import { webPage, faqPage } from '../lib/schema'
import { HOME_FAQS } from '../data/homeFaqs'

const TITLE = 'Newral: App & Web Development Company in Noida, India'
const DESCRIPTION =
  'Newral is an app and web development company in Noida, Delhi NCR. We design, build and scale mobile apps, websites, SaaS and AI chatbots for startups across India. Free call.'

const HOME_JSONLD = [
  webPage({ path: '/', title: TITLE, description: DESCRIPTION }),
  faqPage(HOME_FAQS),
  {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Newral — UI/UX Design & Development Agency in Noida',
    description:
      "A showcase of Newral's design and development work — UI/UX design, app development, web development and DevOps for startups and growing businesses in Noida and Delhi NCR.",
    thumbnailUrl: `${SITE_URL}/og-cover.jpg`,
    contentUrl: `${SITE_URL}/assets/hero_video.mp4`,
    uploadDate: '2025-01-01',
    publisher: { '@id': ORG_ID },
  },
]

export default function Home() {
  useSeo({
    title: TITLE,
    description: DESCRIPTION,
    path: '/',
    jsonLd: HOME_JSONLD,
  })

  return (
    <>
      <Hero />
      <VideoSection />
      <Logos />
      {/* <Pricing /> */}
      <Projects />
      <StatsSection />
      <Services />
      <HowWeWork />
      <Testimonial />
      <HomeFaq />
      <FooterCTA />
      <Footer />
    </>
  )
}
