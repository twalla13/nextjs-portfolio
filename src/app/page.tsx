import Image from 'next/image'
import PortfolioSection from './components/PortfolioSection'
import HireMeSection from './components/HireMeSection'
import HomeSection from './components/HomeSection'
import AboutMeSection from './components/AboutMeSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-college-ruled">
       <main className="container mx-auto px-4 lg:px-2" > {/* Use mx-8 to align content with the vertical line */}
        <HomeSection />
        <AboutMeSection />
        <PortfolioSection />
        <HireMeSection />
        </main>

    </div>
    
  )
}
