// app/page.tsx
import BlogSection from "@/components/Landingpage/BlogSection";
import CardHeroSection from "@/components/Landingpage/TaglineSection";
import HeroSection from "@/components/Landingpage/HeroSection";
import ReviewSection from "@/components/Landingpage/Reviews";
import CompetishunReviewSection from "@/components/Landingpage/CompetishunReviewSection";
import ServicesSection from "@/components/Landingpage/ServicesSection";
import FAQSection from "@/components/Landingpage/WeGotAnswered";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CardHeroSection />
      <ReviewSection />
      <CompetishunReviewSection />
      <ServicesSection />
      <BlogSection />
      <FAQSection />
    </main>
  );
}