import HomeSection from './components/HomeSection';
import AboutMeSection from './components/AboutMeSection';
import PortfolioSection from './components/PortfolioSection';
import HireMeSection from './components/HireMeSection';

export default function Home() {
  return (
    <div className="bg-college-ruled">
      <HomeSection />
      <AboutMeSection />
      <PortfolioSection />
      <HireMeSection />
    </div>
  );
}
