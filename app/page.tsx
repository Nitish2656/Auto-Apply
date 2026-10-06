import { Nav } from "@/components/marketing/Nav";
import { Preloader } from "@/components/marketing/Preloader";
import { Hero } from "@/components/marketing/Hero";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { CreatorMarquee } from "@/components/marketing/CreatorMarquee";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { CategoryShowcase } from "@/components/marketing/CategoryShowcase";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { Footer } from "@/components/marketing/Footer";
import { SmoothScroll } from "@/components/marketing/SmoothScroll";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans">
      <Preloader />
      <SmoothScroll />
      <Nav />

      {/* Main Content */}
      <main className="flex-1 relative z-10 bg-black">
        <Hero />
        <StatsStrip />
        <CreatorMarquee />
        <HowItWorks />
        <CategoryShowcase />
        <PricingPreview />
      </main>

      <Footer />
    </div>
  );
}
