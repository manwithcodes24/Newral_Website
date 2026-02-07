import { NoiseBackground } from "@/components/ui/noise-background"; // Adjust path accordingly

export default function PremiumAceternityButton() {
  return (
    <div className="flex justify-center ">
      <NoiseBackground
        // 1. Dynamic Blue Gradients for the moving bubbles
        gradientColors={[
          "rgb(62, 177, 255)", // Light Blue (#3EB1FF)
          "rgb(19, 112, 245)", // Deep Blue (#1370F5)
          "rgb(0, 40, 255)",   // Electric Blue
        ]}
        noiseIntensity={0.3}
        speed={0.05} // Slower speed for a premium "liquid" feel
        containerClassName={`
          w-fit p-1 rounded-full mx-auto
          /* The Blue Base Gradient */
          bg-linear-to-b from-[#3EB1FF] to-[#1370F5]
          
          /* THE MAGIC: Your specific shadow & rim logic */
          shadow-[
            0_20px_40px_rgba(19,112,245,0.3),            /* Outer Glow */
            inset_0_0_0_1.5px_rgba(255,255,255,0.4),    /* White Inner Border */
            inset_0_0_20px_rgba(0,40,255,0.3)           /* Inner Blue Depth */
          ]
          
          /* Smooth interactions */
          transition-all duration-300 hover:scale-105 active:scale-95
          hover:shadow-[0_25px_50px_rgba(19,112,245,0.5),inset_0_0_0_1.5px_rgba(255,255,255,0.6)]
        `}
      >
        <button className={`
          relative h-full w-full cursor-pointer rounded-full 
          px-6 py-2 
          text-white font-medium text-sm tracking-tight
          /* Keep background transparent to see Aceternity gradients */
          bg-transparent 
          flex items-center gap-2
        `}>
          <span className="drop-shadow-md">Book a call</span>
          <span className="opacity group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </button>
      </NoiseBackground>
    </div>
  );
}