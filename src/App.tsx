import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Lightbox } from './components/Lightbox'
import { Platforms } from './components/Platforms'
import { Reviews } from './components/Reviews'
import { Screenshots } from './components/Screenshots'
import { StickyCta } from './components/StickyCta'
import { WhatsNew } from './components/WhatsNew'
import { usePlatformDetection, useStickyCtaTrigger } from './store/hooks'

export default function App() {
  usePlatformDetection()
  useStickyCtaTrigger()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Features />
        <Screenshots />
        <Platforms />
        <WhatsNew />
        <Reviews />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <Lightbox />
    </>
  )
}
