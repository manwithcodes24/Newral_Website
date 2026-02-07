// app/page.tsx
import BlogSection from "@/components/Landingpage/BlogSection";
import CardHeroSection from "@/components/Landingpage/TeglineSection";
import HeroSection from "@/components/Landingpage/HeroSection";
import ReviewSection from "@/components/Landingpage/Reviews";
import ReviewSection2 from "@/components/Landingpage/CompetishunReviewSection";
import ServicesSection from "@/components/Landingpage/ServicesSection";
import FAQSection from "@/components/Landingpage/wegotanswered";

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