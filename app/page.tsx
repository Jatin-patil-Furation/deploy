import Explore from '@/components/landing-page/Explore';
import Faq from '@/components/landing-page/Faq';
import Footer from '@/components/landing-page/Footer';
import Game from '@/components/landing-page/Game';
import GameFeatures from '@/components/landing-page/GameFeatures';
import Hero from '@/components/landing-page/Hero';
import Offer from '@/components/landing-page/Offer';
import Champions from '@/components/landing-page/champions/Champions';

export default function Home() {
  return (
    <main className="overflow-hidden max-w-8xl bg-[#0C0C0C]">
      <Hero />
      <Game />
      <Explore />
      <Offer />
      <Champions />
      <Faq />
      <GameFeatures />
      <Footer />
    </main>
  );
}
