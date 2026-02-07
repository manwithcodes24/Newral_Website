"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

const text = "We Build Technology That Accelerates Product Development And Drives Real Business Impact";

const FinalCardExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // --- AUTO SCROLL LOGIC ---
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let animationFrameId: number;

    const startAutoScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerBottom = window.scrollY + rect.bottom;
      const currentScroll = window.scrollY;

      // Only scroll if we haven't reached the bottom of this component
      if (currentScroll < containerBottom - window.innerHeight) {
        window.scrollBy({ top: 1.5, behavior: "auto" }); // Adjust speed here (1.5 is slow/smooth)
        animationFrameId = requestAnimationFrame(startAutoScroll);
      }
    };

    const resetTimer = () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      // Wait 2 seconds of inactivity before starting auto-scroll
      scrollTimeout = setTimeout(startAutoScroll, 2000);
    };

    // Listen for any user interaction
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("wheel", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("mousemove", resetTimer);

    resetTimer(); // Start timer on mount

    return () => {
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("wheel", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- ANIMATIONS ---
  const textOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const textY = useTransform(smoothProgress, [0, 0.3], [50, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black pt-12 font-sans overflow-clip">
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">

        {/* 1. WRAPPER: Consistency for 16" and 21" screens */}
        <div className="flex flex-col h-screen justify-center items-center w-full max-w-7xl mx-auto">

          {/* TEXT SECTION */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="w-full text-center z-20"
          >
            {/* 2. TEXT SCALING: Responsive text for different monitor sizes */}
            <p className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-4xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter">
              {words.map((word, i) => {
                const start = 0.1 + (i / words.length) * 0.8;
                const end = start + (1 / words.length) * 0.8;

                return (
                  <Word key={i} progress={smoothProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  // We use a dark grey to white transition
  const color = useTransform(progress, range, ["#1A1A1A", "#FFFFFF"]);

  return (
    <motion.span style={{ color }} className="relative inline-block">
      {children}
    </motion.span>
  );
};

export default FinalCardExperience;