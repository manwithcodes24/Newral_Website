// app/page.tsx
import HeroSection from "@/components/Landingpage/herosection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="h-screen bg-white">
        <h2>This content only appears after the video shrinks to zero</h2>
      </div>
    </main>
  );
}