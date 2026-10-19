import AboutHero from '../components/AboutHero'
import CoreValues from '../components/CoreValues'
import DreamTeam from '../components/DreamTeam'
import FounderNote from '../components/FounderNote'
import Mission from '../components/Mission'
import AboutFooterCTA from '../components/AboutFooterCTA'
import Footer from '../components/Footer'
import { useSeo } from '../hooks/useSeo'
import { webPage, breadcrumbs, founderPerson } from '../lib/schema'

export default function About() {
  useSeo({
    title: 'About Newral — UI/UX & Tech Agency in Noida, Sector 62',
    description:
      'Meet the team behind Newral — a Noida, Sector 62-based design and development agency helping startups across Delhi NCR build great digital products. Our values, mission and people.',
    path: '/about',
    jsonLd: [
      webPage({
        type: 'AboutPage',
        path: '/about',
        title: 'About Newral',
        description:
          'Newral is a Noida-based tech agency specialising in UI/UX design, app development, web development and DevOps for startups across Delhi NCR.',
      }),
      breadcrumbs([['Home', '/'], ['About', '/about']]),
      { '@context': 'https://schema.org', ...founderPerson() },
    ],
  })

  return (
    <>
      <AboutHero />
      <CoreValues />
      <DreamTeam />
      <FounderNote />
      <Mission />
      <AboutFooterCTA />
      <Footer />
    </>
  )
}
