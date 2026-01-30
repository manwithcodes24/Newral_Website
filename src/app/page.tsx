// app/page.tsx
import CardHeroSection from "@/components/Landingpage/CardHeroSection";
import HeroSection from "@/components/Landingpage/herosection";
import ReviewSection from "@/components/Landingpage/Reviews";
import ReviewSection2 from "@/components/Landingpage/Reviewsectionbottem";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CardHeroSection />
      <ReviewSection />
      <ReviewSection2 />
      
    </main>
  );
}