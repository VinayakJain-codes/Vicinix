import Navbar from "@/components/Navbar";
import HeroText from "@/components/Hero/HeroText";

import DNACanvasWrapper from "@/components/Hero/DNACanvasWrapper";
import HeroPin from "@/components/Hero/HeroPin";
import ServicesSection from "@/components/Services/ServicesSection";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen">
        
        {/* Hero Section (Pinned) */}
        <HeroPin>
          <div className="relative h-screen w-full flex overflow-hidden">
            
            {/* Left 50% - Text Stack */}
            <div className="w-full md:w-1/2 h-full flex items-center pt-16 relative z-10 hero-fade-target">
              <HeroText />
            </div>

            {/* DNA Canvas - Full Screen (Animations handled in WebGL) */}
            <div className="absolute inset-0 w-full h-full z-0 dna-wrapper pointer-events-none">
              <DNACanvasWrapper />
            </div>
            
          </div>
        </HeroPin>

        {/* Services Section */}
        <ServicesSection />

        {/* Portfolio Section */}
        <PortfolioSection />

        {/* Footer */}
        <Footer />

      </main>
    </>
  );
}
