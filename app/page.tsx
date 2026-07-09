import SmoothScroll from '@/components/SmoothScroll';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';
import StickyBuyBar from '@/components/StickyBuyBar';
import HeroSection from '@/components/HeroSection';
import ScrollVideoSection from '@/components/ScrollVideoSection';
import IngredientCards from '@/components/IngredientCards';
import PowderSplash from '@/components/PowderSplash';
import SupplementFacts from '@/components/SupplementFacts';
import TitanBeastSection from '@/components/TitanBeastSection';
import BuySection from '@/components/BuySection';
import Footer from '@/components/Footer';

/**
 * „SESTUP DO LEDU" – jeden souvislý scroll příběh:
 * vesmír → materializace dózy → scroll-video → rozklad složení →
 * powder splash → světlý zlom (fakta) → TitanBeast → nákup → footer.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <StarField />
      <Navbar />
      <StickyBuyBar />
      <main className="relative">
        <HeroSection />
        <ScrollVideoSection />
        <IngredientCards />
        <PowderSplash />
        <SupplementFacts />
        <TitanBeastSection />
        <BuySection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
