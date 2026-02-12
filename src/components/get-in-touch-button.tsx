import { NoiseBackground } from "@/components/ui/noise-background"; // Adjust path accordingly

export default function PremiumAceternityButton() {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        gradientColors={[
          "rgba(255,255,255,0.8)",
          "rgba(200,235,255,0.5)",
          "rgba(120,200,255,0.25)",
        ]}
        noiseIntensity={0.35}
        speed={0.02}
        containerClassName={`
          w-fit mx-auto rounded-full p-[2px]
          bg-transparent
          shadow-[0_30px_70px_rgba(37,115,255,0.35),0_6px_30px_rgba(30,85,200,0.45)]
        `}
      >
        <button
          className="
            rounded-full
            px-12 py-5
            text-white text-2xl tracking-tight
            bg-linear-to-b from-[#3EB1FF] to-[#1370F5]
            shadow-[inset_0_0_0_1px_rgba(200,235,255,0.8),inset_0_-6px_16px_rgba(0,30,120,0.25)]
            drop-shadow-[0_10px_30px_rgba(80,160,255,0.55)]
            transition-transform duration-300
            hover:scale-[1.02] active:scale-[0.98]
          "
        >
          <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">Book a call</span>
        </button>
      </NoiseBackground>
    </div>
  );
}
