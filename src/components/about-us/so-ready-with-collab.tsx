"use client";
import React, { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";

const TEXT = "SO Ready to collaborate with Let’s Redefine Technology Together.";

export default function GSAPHorizontalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Track Scroll Progress (The "Pin" duration)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. The "Scrub" effect (Smoothness)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Lower = Slower/Heavier feel
    damping: 20,
    restDelta: 0.001,
  });

  // 3. Autoplay logic
  const autoXNum = useMotionValue(0);
  const autoplaySpeed = -2.3; // Very slow drift to the left

  useAnimationFrame(() => {
    autoXNum.set(autoXNum.get() + autoplaySpeed);
  });

  // 4. Horizontal Movement
  // Move from right side (100vw) to off-screen left (-100%)
  const scrollX = useTransform(smoothProgress, [0, 1], ["0vw", "-150vw"]);
  
  // Combine Scroll + Autoplay
  const autoX = useTransform(autoXNum, (value) => `${value}px`);
  const x = useTransform([scrollX, autoX], ([latestScroll, latestAuto]) => {
    return `calc(${latestScroll} + ${latestAuto})`;
  });

  const words = useMemo(() => TEXT.split(" "), []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-black" // height = scroll speed (800vh is even slower)
    >
      {/* Sticky Pinning */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div 
          style={{ x }} 
          className="flex whitespace-nowrap pl-[60vw]" // Start at the right edge
        >
          <h3 className="flex gap-6 text-[clamp(2rem,8vw,10rem)] font-bold text-white uppercase leading-[1.1] tracking-tighter">
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="flex">
                {word.split("").map((char, charIdx) => (
                  <Character 
                    key={charIdx} 
                    char={char} 
                    progress={smoothProgress} 
                    // This index determines when the letter "drops"
                    index={wordIdx * 4 + charIdx} 
                    totalCharacters={TEXT.length}
                  />
                ))}
                <span className="inline-block w-[2vw]">&nbsp;</span>
              </span>
            ))}
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

function Character({ char, progress, index, totalCharacters }: { char: string, progress: any, index: number, totalCharacters: number }) {
  
  // We calculate a range for each character. 
  // As the whole text moves, letters trigger in sequence.
  const start = index / (totalCharacters * 1.5); 
  const end = start + 0.1; // Animation duration for one letter

  // Physics: Random starting positions (GSAP SplitText style)
  const randomY = useMemo(() => (index % 2 === 0 ? 1 : -1) * (150 + (index % 10) * 20), [index]);
  const randomRotate = useMemo(() => (index % 2 === 0 ? 1 : -1) * (20 + (index % 5) * 5), [index]);

  // Map the smooth scroll progress to character movement
  const y = useTransform(progress, [start, end], [randomY, 0], { clamp: true });
  const rotate = useTransform(progress, [start, end], [randomRotate, 0], { clamp: true });
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <motion.span
      style={{ y, rotate, opacity }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}