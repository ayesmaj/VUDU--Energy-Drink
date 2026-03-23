import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollStory from "@/components/ScrollStory";
import FlavorExperience from "@/components/FlavorExperience";
import WhyVudu from "@/components/WhyVudu";
import ProductSpotlight from "@/components/ProductSpotlight";
import LifestyleSection from "@/components/LifestyleSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Sticky Navigation */}
      <Navbar />

      <main>
        {/* 1. HERO — Fullscreen launch campaign hero */}
        <Hero />

        {/* 2. SCROLL STORY — Layered overlapping panels */}
        <ScrollStory />

        {/* 3. FLAVOR EXPERIENCE — Interactive flavor world */}
        <FlavorExperience />

        {/* 4. WHY VUDU — Benefits bento grid */}
        <WhyVudu />

        {/* 5. PRODUCT SPOTLIGHT — Cinematic can close-up */}
        <ProductSpotlight />

        {/* 6. LIFESTYLE — Brand mosaic + testimonials */}
        <LifestyleSection />

        {/* 7. VIDEO / SCROLL EXPERIENCE — Sticky scroll cinematic */}
        <VideoScrollSection />

        {/* 8. FINAL CTA — Premium close */}
        <FinalCTA />
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </SmoothScroll>
  );
}
