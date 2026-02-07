// app/page.tsx
import BlogSection from "@/components/landingpage/BlogSection";
import CardHeroSection from "@/components/landingpage/TeglineSection";
import HeroSection from "@/components/landingpage/HeroSection";
import ReviewSection from "@/components/landingpage/Reviews";
import ReviewSection2 from "@/components/landingpage/CompetishunReviewSection";
import ServicesSection from "@/components/landingpage/ServicesSection";
import FAQSection from "@/components/landingpage/wegotanswered";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CardHeroSection />
      <ReviewSection />
      <ReviewSection2 />
      <ServicesSection />
      <BlogSection />
      <FAQSection />
    </main>
  );
}