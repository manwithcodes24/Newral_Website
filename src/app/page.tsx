// app/page.tsx
import BlogSection from "@/components/landingpage/BlogSection";
import CardHeroSection from "@/components/landingpage/TaglineSection";
import HeroSection from "@/components/landingpage/HeroSection";
import ReviewSection from "@/components/landingpage/Reviews";
import CompetishunReviewSection from "@/components/landingpage/CompetishunReviewSection";
import ServicesSection from "@/components/landingpage/ServicesSection";
import FAQSection from "@/components/landingpage/WeGotAnswered";

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