import Hero from '../components/Hero'
import VideoSection from '../components/VideoSection'
import Logos from '../components/Logos'
import Pricing from '../components/Pricing'
import Projects from '../components/Projects'
import StatsSection from '../components/StatsSection'
import Services from '../components/Services'
import HowWeWork from '../components/HowWeWork'
import Testimonial from '../components/Testimonial'
import FooterCTA from '../components/FooterCTA'
import Footer from '../components/Footer'
import { useSeo } from '../hooks/useSeo'

export default function Home() {
  useSeo({
    title: 'Newral — UI/UX Design & App Development Agency in Noida, Delhi NCR',
    description:
      'Newral is a Noida & Delhi NCR based tech agency offering UI/UX design, graphic design, app development, web development and DevOps for startups and growing businesses.',
    path: '/',
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
      <FooterCTA />
      <Footer />
    </>
  )
}
