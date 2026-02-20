import { NoiseBackground } from "@/components/ui/noise-background"; // Adjust path accordingly
import { cn } from "@/lib/utils";

interface PremiumAceternityButtonProps {
  size?: "sm" | "md";
  label?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PremiumAceternityButton({
  size = "md",
  label = "Get in touch",
  href,
  target,
  rel,
}: PremiumAceternityButtonProps) {
  const isSmall = size === "sm";
  const buttonClassName = cn(
    "relative rounded-full text-white font-medium",
    "bg-[linear-gradient(180deg,#0066FF_18.75%,#0DA2FF_100%)]",
    "shadow-[0_4px_5px_rgba(87,177,255,0.15),0_10px_14px_rgba(87,177,255,0.22),0_25px_32px_rgba(87,177,255,0.18),0_42px_107px_rgba(87,177,255,0.55),inset_0_1px_4px_rgba(210,234,255,0.9),inset_0_1px_18px_rgba(210,234,255,0.65)]",
    isSmall ? "px-6 py-3 text-[13px]" : "px-8 py-4 text-[15px]",
  );

  const content = (
    <>
      {/* Inner highlight */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),rgba(255,255,255,0)_45%)]
            pointer-events-none"
      />

      {/* Inner border shine */}
      <span
        aria-hidden
        className="absolute inset-px rounded-full
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]"
      />

      <span className="relative z-10">{label}</span>
    </>
  );

  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Bottom-only glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-1/2 h-8 w-[90%] -translate-x-1/2 rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(90,170,255,0.6)_0%,rgba(50,120,255,0.35)_45%,rgba(0,0,0,0)_70%)]
          blur-2xl"
        />

        {href ? (
          <a href={href} target={target} rel={rel} className={buttonClassName}>
            {content}
          </a>
        ) : (
          <button type="button" className={buttonClassName}>
            {content}
          </button>
        )}
      </div>
    </div>
  );
}
