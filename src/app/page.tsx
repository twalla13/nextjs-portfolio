import Image from 'next/image'
import PortfolioSection from './components/PortfolioSection'
import HireMeSection from './components/HireMeSection'
import HomeSection from './components/HomeSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-college-ruled">
       <main className="p-4 mx-8"> {/* Use mx-8 to align content with the vertical line */}
        <HomeSection />
        <PortfolioSection />
        <HireMeSection />
        </main>

    </div>
    
  )
}
