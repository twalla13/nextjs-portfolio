import Image from 'next/image'
import PortfolioSection from './components/PortfolioSection'
import HireMeSection from './components/HireMeSection'
import HomeSection from './components/HomeSection'

export default function Home() {
  return (
    <main>
      <HomeSection />
      <PortfolioSection />
      <HireMeSection />
    </main>
    
  )
}
