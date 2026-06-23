import AboutHero from '../components/AboutHero'
import CoreValues from '../components/CoreValues'
import DreamTeam from '../components/DreamTeam'
import Mission from '../components/Mission'
import AboutFooterCTA from '../components/AboutFooterCTA'
import Footer from '../components/Footer'
import { useSeo } from '../hooks/useSeo'

export default function About() {
  useSeo({
    title: 'About Newral — UI/UX & Tech Agency in Noida, Sector 62',
    description:
      'Meet the team behind Newral — a Noida, Sector 62-based design and development agency helping startups across Delhi NCR build great digital products. Our values, mission and people.',
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Newral',
      url: 'https://newral.in/about',
      description:
        'Newral is a Noida-based tech agency specialising in UI/UX design, app development, web development and DevOps for startups across Delhi NCR.',
      mainEntity: {
        '@type': 'ProfessionalService',
        name: 'Newral',
        '@id': 'https://newral.in/#organization',
      },
    },
  })

  return (
    <>
      <AboutHero />
      <CoreValues />
      <DreamTeam />
      <Mission />
      <AboutFooterCTA />
      <Footer />
    </>
  )
}
