import HomeSection from './components/HomeSection';
import SkillsTechSection from './components/SkillsTechSection';
import PortfolioSection from './components/PortfolioSection';
import HireMeSection from './components/HireMeSection';

export default function Home() {
  return (
    <div className="bg-college-ruled">
      <HomeSection />
      <SkillsTechSection />
      <PortfolioSection />
      <HireMeSection />
    </div>
  );
}
