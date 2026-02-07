// app/page.tsx
import BlogSection from "@/components/landing-page/blog-section";
import CardHeroSection from "@/components/landing-page/tagline-section";
import HeroSection from "@/components/landing-page/hero-section";
import ReviewSection from "@/components/landing-page/reviews";
import CompetishunReviewSection from "@/components/landing-page/competishun-review-section";
import ServicesSection from "@/components/landing-page/services-section";
import WeGotAnswered from "@/components/landing-page/we-got-answered";
import { getAllBlogs } from "@/lib/blog";

export default async function Home() {

    // This runs on the server (safe for fs/path)
    const allPosts = await getAllBlogs();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CardHeroSection />
      <ReviewSection />
      <CompetishunReviewSection />
      <ServicesSection />
      <BlogSection posts={allPosts} />
      <WeGotAnswered />
    </main>
  );
}